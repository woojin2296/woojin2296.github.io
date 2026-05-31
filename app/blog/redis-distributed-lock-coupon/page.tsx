import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "synchronized가 있는데도 쿠폰이 초과 발급되는 이유 | Blog",
  description:
    "서버를 두 대로 늘린 뒤 쿠폰이 초과 발급되는 원인을 JVM local lock, Redis distributed lock, TTL, UUID token, watchdog, DB unique constraint 관점에서 정리한 글",
};

const references = [
  {
    label: "Java Language Specification - synchronized Statement",
    href: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-14.html#jls-14.19",
  },
  {
    label: "Redis - SET command",
    href: "https://redis.io/docs/latest/commands/set/",
  },
  {
    label: "Redis - Distributed Locks with Redis",
    href: "https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/",
  },
  {
    label: "Redisson - Locks and Synchronizers",
    href: "https://redisson.pro/docs/data-and-services/locks-and-synchronizers/index.html",
  },
  {
    label: "PostgreSQL - Unique Constraints",
    href: "https://www.postgresql.org/docs/18/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS",
  },
];

export default function RedisDistributedLockCouponBlogPostPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-[760px] px-5 pb-28 pt-10 sm:px-6">
        <Link
          href="/blog/"
          className="inline-flex h-9 items-center gap-2 text-sm font-medium text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          글 목록
        </Link>

        <article className="pt-[88px]">
          <header className="text-center">
            <p className="text-xs font-normal uppercase leading-[1.33] tracking-normal text-[#a3a3a3]">
              Concurrency / Redis · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              synchronized가 있는데도 쿠폰이 초과 발급되는 이유
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              서버를 두 대로 늘렸더니 쿠폰이 초과 발급되는 일이 생겼습니다.
              코드에는 <InlineCode>synchronized</InlineCode>가 붙어 있었습니다. 문제는
              코드의 문법이 아니라 잠금의 범위였습니다.{" "}
              <InlineCode>synchronized</InlineCode>는 같은 JVM 안에서만 잠금입니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              synchronized는 서버 두 대를 함께 잠그지 못한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                JVM은 Java 프로그램이 실행되는 가상 머신입니다. 서버 한 대에
                애플리케이션 프로세스가 하나 떠 있다면 보통 JVM도 하나입니다. 서버를
                두 대로 늘리면 JVM도 두 개가 됩니다.
              </p>
              <p>
                Java Language Specification 기준으로{" "}
                <InlineCode>synchronized</InlineCode>는 특정 객체의 monitor lock을
                획득하고 block을 실행한 뒤 release합니다. 이 monitor는 그 JVM 안의
                객체에 붙어 있습니다. 다른 서버의 JVM에 있는 객체 monitor와는 아무
                관계가 없습니다.
              </p>
              <p>
                그래서 서버 A와 서버 B가 동시에 쿠폰 발급 요청을 받으면 둘 다 각자
                자기 JVM의 lock을 잡고 critical section에 들어갈 수 있습니다. 두
                서버가 동시에 남은 수량을 읽고, 둘 다 “아직 발급 가능하다”고 판단하면
                초과 발급이 발생합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/redis-lock-jvm-synchronized-limit.png"
              alt="서버 A와 서버 B가 각각 다른 JVM의 synchronized lock을 잡고 같은 쿠폰 수량을 읽어 초과 발급이 발생하는 다이어그램"
              width={1440}
              height={900}
              caption="synchronized는 JVM 내부 monitor를 잠급니다. 서버가 두 대가 되면 monitor도 두 개가 되므로, 같은 쿠폰이라는 논리 자원을 클러스터 전체에서 하나만 처리하게 만들 수 없습니다."
            />
            <CodeBlock
              code={`// 서버 한 대에서는 괜찮아 보일 수 있다.
public synchronized void issueCoupon(Long couponId, Long userId) {
  Coupon coupon = couponRepository.findById(couponId);
  if (coupon.remainingCount() <= 0) {
    throw new SoldOutException();
  }

  coupon.decrease();
  couponIssueRepository.save(new CouponIssue(couponId, userId));
}`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              이게 race condition이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                race condition은 여러 thread나 process가 같은 자원을 동시에 읽고
                쓰면서 결과가 실행 순서에 따라 달라지는 문제입니다. 쿠폰 발급에서는
                남은 수량, 발급 이력, 사용자별 발급 여부가 공유 자원입니다.
              </p>
              <p>
                단일 JVM 안에서는 <InlineCode>synchronized</InlineCode>가 동시에
                들어오는 thread를 줄 세울 수 있습니다. 하지만 scale-out된 서버들은
                서로의 memory와 monitor를 모릅니다. 각 서버가 “나는 lock을 잡았다”고
                생각해도, 실제로는 자기 프로세스 안에서만 잡은 것입니다.
              </p>
              <p>
                해결하려면 모든 서버가 공통으로 바라보는 외부 저장소에 잠금 상태를
                둬야 합니다. 이것이 distributed lock입니다. Redis가 이 역할에 자주
                쓰이는 이유는 단일 명령 처리 모델과 빠른 응답, TTL 지원 때문입니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Redis lock의 기본은 SET NX PX다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Redis lock의 기본 아이디어는 단순합니다. 쿠폰 발급 전에 Redis에{" "}
                <InlineCode>coupon:lock:123</InlineCode> 같은 key를 만들려고 시도합니다.
                key가 없을 때만 만들어지면 내가 lock을 선점한 것입니다. 이미 있으면
                다른 서버가 처리 중이므로 기다리거나 포기합니다.
              </p>
              <p>
                Redis <InlineCode>SET</InlineCode> 명령은 <InlineCode>NX</InlineCode>와{" "}
                <InlineCode>PX</InlineCode> 옵션을 함께 지원합니다.{" "}
                <InlineCode>NX</InlineCode>는 key가 없을 때만 set하고,{" "}
                <InlineCode>PX</InlineCode>는 millisecond 단위 만료 시간을 겁니다. 이
                두 옵션을 하나의 명령으로 보내야 lock 생성과 TTL 설정이 원자적으로
                묶입니다.
              </p>
              <p>
                <InlineCode>SETNX</InlineCode> 후에 별도 <InlineCode>EXPIRE</InlineCode>
                를 호출하는 방식은 위험합니다. 두 명령 사이에서 서버가 죽으면 TTL이
                없는 lock이 남을 수 있습니다. lock 생성은 하나의{" "}
                <InlineCode>SET key value NX PX timeout</InlineCode>로 처리해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`SET coupon:lock:123 3f2c7c4e-... NX PX 3000

# 성공: OK
# 실패: nil, 이미 다른 서버가 lock 보유 중`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              TTL은 생명줄이자 사고 원인이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                TTL이 없으면 서버가 죽는 순간 lock을 해제할 코드가 실행되지 않습니다.
                Redis key는 계속 남고, 다른 서버는 영원히 대기합니다. 그래서 lock에는
                반드시 만료 시간이 필요합니다. 서버가 죽어도 일정 시간이 지나면 lock이
                자동으로 풀려야 합니다.
              </p>
              <p>
                그런데 TTL은 너무 짧아도 문제입니다. 서버 A가 lock을 잡고 쿠폰 발급을
                처리하는 중에 stop-the-world GC나 외부 API 지연으로 4초 멈췄다고
                가정합니다. TTL을 3초로 잡았다면 Redis lock은 서버 A가 살아 있는데도
                만료됩니다. 그 틈에 서버 B가 lock을 잡고 같은 쿠폰을 발급할 수
                있습니다.
              </p>
              <p>
                짧게 잡으면 정상 작업 중 lock이 풀리고, 길게 잡으면 서버가 죽었을 때
                복구가 느립니다. TTL은 대충 정하는 값이 아닙니다. 실제 처리 시간,
                tail latency, GC pause, Redis/network 지연, retry 정책을 보고 정해야
                합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/redis-lock-ttl-dilemma.png"
              alt="Redis distributed lock에서 TTL이 없으면 deadlock이 되고 TTL이 너무 짧으면 GC pause 중 lock이 풀려 double issue가 발생하는 딜레마 다이어그램"
              width={1440}
              height={900}
              caption="TTL은 서버 crash 이후 lock을 회수하기 위한 안전장치입니다. 하지만 작업 시간보다 짧으면 살아 있는 owner의 lock이 만료되어 다른 서버가 critical section에 들어올 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              UUID 없이 DEL 하면 남의 lock을 지울 수 있다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                TTL이 만료된 뒤에는 더 미묘한 문제가 생깁니다. 서버 A가 lock을 잡고
                작업하다가 오래 멈췄습니다. TTL이 만료되고 서버 B가 같은 key로 새 lock을
                잡았습니다. 그 뒤 서버 A가 다시 깨어나 <InlineCode>finally</InlineCode>
                에서 <InlineCode>DEL coupon:lock:123</InlineCode>를 실행하면 어떻게
                될까요?
              </p>
              <p>
                이 시점의 lock은 서버 A의 것이 아니라 서버 B의 것입니다. 그런데 단순{" "}
                <InlineCode>DEL</InlineCode>은 주인을 확인하지 않습니다. 서버 A가 서버
                B의 lock을 지워 버리고, 서버 C까지 들어올 수 있습니다.
              </p>
              <p>
                그래서 lock value에는 UUID 같은 고유 token을 저장해야 합니다. 해제할
                때는 Redis에 저장된 값이 내가 가진 token과 같은지 확인하고, 같을 때만
                삭제해야 합니다. 이 비교와 삭제도 하나의 Lua script로 원자적으로
                실행해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`-- unlock.lua
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Watchdog은 작업 중 TTL을 연장한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                TTL을 너무 길게 잡고 싶지 않지만, 정상 작업 중에는 lock이 풀리지 않게
                하고 싶습니다. 이때 쓰는 방식이 watchdog입니다. lock owner가 살아 있고
                작업이 진행 중이면 별도 thread가 TTL을 계속 연장합니다. owner가 죽으면
                연장이 멈추고 TTL이 자연스럽게 만료됩니다.
              </p>
              <p>
                Redisson의 <InlineCode>RLock</InlineCode>은 이 패턴을 제공합니다.
                Redisson 문서에 따르면 lock을 보유한 Redisson instance가 살아 있는 동안
                watchdog이 lock expiration을 연장하고, 기본{" "}
                <InlineCode>lockWatchdogTimeout</InlineCode>은 30초입니다.
              </p>
              <p>
                다만 <InlineCode>leaseTime</InlineCode>을 직접 지정하면 그 시간이 지나
                자동 release되는 고정 TTL lock이 됩니다. watchdog을 기대하는 코드인지,
                명시적 lease time을 기대하는 코드인지 팀 안에서 명확히 해야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/redis-lock-token-watchdog-db.png"
              alt="Redis lock value에 UUID token을 저장하고 Watchdog으로 TTL을 연장하며 DB unique constraint를 최종 방어선으로 두는 구조 다이어그램"
              width={1440}
              height={900}
              caption="UUID token은 남의 lock 삭제를 막고, watchdog은 정상 작업 중 TTL 만료를 줄입니다. 그래도 Redis와 network는 실패할 수 있으므로, 최종 uniqueness는 DB가 막아야 합니다."
            />
            <CodeBlock
              code={`RLock lock = redissonClient.getLock("coupon:lock:" + couponId);

boolean acquired = lock.tryLock(1, TimeUnit.SECONDS);
if (!acquired) {
  throw new TooManyRequestsException();
}

try {
  issueCoupon(couponId, userId);
} finally {
  if (lock.isHeldByCurrentThread()) {
    lock.unlock();
  }
}`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              분산락은 최종 보장이 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                UUID와 watchdog을 쓰면 훨씬 안전해집니다. 하지만 distributed lock은
                동시 접근 확률을 줄이는 coordination 도구입니다. Redis 자체 장애,
                failover, network partition, client pause가 겹치면 lock만으로 모든
                정합성을 보장한다고 말하기 어렵습니다.
              </p>
              <p>
                Redis 공식 문서에는 단일 Redis instance lock의 한계와 Redlock 알고리즘이
                함께 설명되어 있습니다. Redlock은 여러 독립 Redis instance에서 majority
                lock을 얻는 방식이지만, clock drift와 network 지연이 있는 분산 환경에서
                어느 수준의 보장을 기대할지 신중히 판단해야 합니다. Redisson 문서에서도
                RedLock object는 deprecated로 표시되고 RLock이나 RFencedLock을 보라고
                안내합니다.
              </p>
              <p>
                정말 중요한 데이터라면 DB가 마지막 방어선을 가져야 합니다. 쿠폰은{" "}
                <InlineCode>coupon_id</InlineCode>와 <InlineCode>user_id</InlineCode>
                조합에 unique constraint를 걸어 중복 발급을 막고, 전체 발급량은 DB
                row lock, optimistic locking, atomic update 조건 같은 저장소 수준의
                제약으로 보호해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`ALTER TABLE coupon_issues
ADD CONSTRAINT uk_coupon_issue_coupon_user
UNIQUE (coupon_id, user_id);

-- 전체 수량 차감은 DB 조건으로도 막는다.
UPDATE coupons
SET remaining_count = remaining_count - 1
WHERE id = :couponId
  AND remaining_count > 0;`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              점검 순서
            </h2>
            <div className="mt-6">
              <NoteRow
                title="synchronized의 범위를 JVM 안으로 제한해서 이해한다"
                body="단일 서버에서만 통하던 lock은 scale-out 이후 cluster 전체 lock이 아닙니다. 여러 서버가 같은 자원을 다룬다면 외부 저장소나 DB 수준의 조정이 필요합니다."
              />
              <NoteRow
                title="Redis lock은 SET NX PX 한 명령으로 잡는다"
                body="SETNX 후 EXPIRE처럼 나누지 말고 SET key value NX PX timeout으로 lock 생성과 만료 설정을 원자적으로 처리합니다."
              />
              <NoteRow
                title="lock value에는 UUID token을 넣는다"
                body="unlock 시 저장된 token이 내가 가진 token과 같을 때만 삭제해야 합니다. 비교와 삭제는 Lua script로 원자적으로 실행합니다."
              />
              <NoteRow
                title="TTL은 실제 지연을 기준으로 산정한다"
                body="평균 처리 시간이 아니라 tail latency, GC pause, Redis/network 지연, retry 정책을 보고 정합니다. 너무 짧으면 정상 작업 중 lock이 풀립니다."
              />
              <NoteRow
                title="Watchdog과 leaseTime의 차이를 팀 규칙으로 정한다"
                body="Redisson에서 watchdog 기반으로 운용할지, 명시 leaseTime 기반으로 운용할지 혼용하지 않도록 코드 패턴과 review 기준을 정합니다."
              />
              <NoteRow
                title="DB unique constraint를 최종 방어선으로 둔다"
                body="분산락이 있어도 coupon_issues 같은 최종 테이블에는 중복을 막는 unique constraint와 수량 차감 조건을 둬야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>synchronized</InlineCode>는 같은 JVM 안에서만 유효한 local
                lock입니다. 서버를 두 대로 늘리면 각 서버가 자기 JVM의 monitor만
                잠그므로 쿠폰이라는 공통 자원을 하나로 보호하지 못합니다.
              </p>
              <p>
                Redis distributed lock은 모든 서버가 공통으로 바라보는 lock key를 만들어
                이 문제를 줄여 줍니다. 하지만 TTL이 없으면 deadlock이 되고, TTL이 너무
                짧으면 정상 작업 중 lock이 풀리며, 단순 <InlineCode>DEL</InlineCode>은
                남의 lock을 지울 수 있습니다. 그래서 UUID token, Lua unlock, watchdog이
                필요합니다.
              </p>
              <p>
                그래도 distributed lock은 최종 진실이 아닙니다. 쿠폰 중복 발급처럼
                데이터 정합성이 중요한 문제는 DB unique constraint와 조건부 update를
                마지막 방어선으로 둬야 합니다. 분산락은 충돌 확률을 낮추고, DB 제약은
                깨지면 안 되는 불변식을 막습니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
