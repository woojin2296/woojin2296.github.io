import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "RDS connection exhaustion으로 readiness가 올라오지 않은 장애 분석 | Blog",
  description:
    "백엔드 서비스 기동 중 datasource 설정 누락처럼 보였던 장애를 Hibernate JDBC metadata 조회 실패, MySQL Too many connections, Hikari pool 설정 관점에서 분석한 글",
};

const references = [
  {
    label: "HikariCP - Configuration",
    href: "https://github.com/brettwooldridge/HikariCP",
  },
  {
    label: "MySQL Reference Manual - Too many connections",
    href: "https://dev.mysql.com/doc/refman/8.4/en/too-many-connections.html",
  },
  {
    label: "AWS re:Post - Resolve Too Many Connections in RDS MySQL",
    href: "https://repost.aws/knowledge-center/rds-mysql-too-many-connections",
  },
  {
    label: "Spring Boot - Common Application Properties",
    href: "https://docs.spring.io/spring-boot/docs/3.2.3/reference/html/application-properties.html",
  },
  {
    label: "Hibernate ORM User Guide - Database Dialect",
    href: "https://docs.hibernate.org/orm/6.1/userguide/html_single/Hibernate_User_Guide.html",
  },
];

export default function RdsConnectionExhaustionBlogPostPage() {
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
              Incident / RDS · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              RDS connection exhaustion으로 readiness가 올라오지 않은 장애 분석
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              일부 백엔드 서비스가 기동 과정에서 datasource 설정이 빠진 것처럼
              실패했고 readiness가 정상 상태로 올라오지 않았습니다. 실제 원인은
              설정 누락이 아니라, 여러 서비스의 Hikari connection pool이 동시에
              만들어지며 dev RDS의 connection limit을 초과한 문제였습니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 요약
            </h2>
            <div className="mt-6">
              <NoteRow
                title="장애 상황"
                body="백엔드 서비스 일부가 새로 기동되는 과정에서 Spring Boot 애플리케이션이 정상적으로 올라오지 않았습니다. Kubernetes readiness도 true로 전환되지 않아 Service endpoint에 안정적으로 붙지 못했습니다."
              />
              <NoteRow
                title="초기 오해"
                body="로그 첫인상은 datasource URL, username, password, dialect 같은 설정이 빠진 것처럼 보였습니다. Hibernate가 DB metadata를 읽지 못했다는 메시지가 먼저 보였기 때문입니다."
              />
              <NoteRow
                title="원인 재분류"
                body="같은 시점 MySQL에서 ERROR 1040 Too many connections가 확인되면서, 문제를 datasource 설정 누락이 아니라 connection exhaustion으로 재분류했습니다."
              />
              <NoteRow
                title="직접 원인"
                body="서비스별 기본 Hikari pool이 동시에 생성되면서 여러 Pod가 시작 시점에 DB 연결을 확보하려 했고, dev RDS의 max_connections 한도를 초과했습니다."
              />
              <NoteRow
                title="조치"
                body="서비스별 maximum pool size와 minimum idle 값을 dev RDS 용량에 맞게 낮췄고, 재기동 시 DB connection metric과 pod logs를 함께 확인해 연결 수가 과도하게 튀지 않는지 검증했습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              datasource 누락처럼 보였던 이유
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                장애 초기에 가장 먼저 보인 메시지는{" "}
                <InlineCode>Unable to determine Dialect without JDBC metadata</InlineCode>
                였습니다. 이 문구만 보면 Hibernate가 어떤 DB dialect를 써야 하는지
                모르고 있고, 그래서 datasource 설정이 빠진 것처럼 느껴집니다.
              </p>
              <p>
                하지만 Hibernate가 dialect를 자동 판별하려면 기동 중 실제 JDBC
                connection을 얻고, 그 connection으로 DB metadata를 조회해야 합니다.
                즉 이 단계는 단순한 설정 파싱이 아니라 DB에 접속할 수 있어야
                통과됩니다.
              </p>
              <p>
                따라서 같은 에러라도 원인은 여러 가지일 수 있습니다. 정말로 JDBC URL이
                비어 있을 수도 있고, username/password가 틀렸을 수도 있습니다. 이번
                장애처럼 설정은 존재하지만 DB가 더 이상 connection을 받아주지 못해
                metadata 조회가 실패할 수도 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/rds-connection-exhaustion-startup-flow.png"
              alt="백엔드 서비스 재기동 중 Hikari pool이 동시에 생성되고 dev RDS connection limit을 초과해 Hibernate metadata 조회와 readiness가 실패하는 흐름"
              width={1440}
              height={900}
              caption="겉으로는 datasource 설정 오류처럼 보였지만, 실제 실패 지점은 Hibernate가 JDBC metadata를 읽으려고 connection을 얻는 단계였습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              로그를 함께 보니 원인이 바뀌었다
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              먼저 실패한 Pod의 로그를 확인했습니다. 애플리케이션은 datasource
              bean 생성 이후 Hibernate 초기화 단계로 들어갔지만, JDBC metadata를
              얻지 못해 EntityManagerFactory 초기화에 실패했습니다.
            </p>
            <CodeBlock
              code={`$ kubectl logs deploy/<service-name> -n backend-dev
org.hibernate.HibernateException:
Unable to determine Dialect without JDBC metadata

Caused by: java.sql.SQLTransientConnectionException:
HikariPool-1 - Connection is not available, request timed out`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              같은 시간대에 RDS에 직접 접속하거나 운영 계정으로 확인하면 MySQL 쪽에서는
              connection 한도 초과가 보였습니다. 이 메시지는 애플리케이션 설정 파일이
              빠졌다는 뜻이 아니라, MySQL 서버 입장에서 더 이상 새 client connection을
              받을 수 없다는 뜻입니다.
            </p>
            <CodeBlock
              code={`$ mysql -h <rds-endpoint> -u <user> -p
ERROR 1040 (08004): Too many connections`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이 두 로그가 같은 시점에 겹치면서 원인 분류가 바뀌었습니다. Pod 입장에서는
              Hibernate metadata 조회 실패이고, DB 입장에서는{" "}
              <InlineCode>Too many connections</InlineCode>입니다. 둘을 연결하면
              “datasource가 없어서 실패한 것”이 아니라 “datasource는 있지만 connection을
              얻지 못해 실패한 것”이 됩니다.
            </p>
            <BlogDiagram
              src="/blog/rds-connection-exhaustion-debug-path.png"
              alt="Pod logs, MySQL Too many connections, RDS connection metric을 함께 확인해 connection exhaustion으로 결론 내리는 증거 흐름"
              width={1440}
              height={900}
              caption="Pod 로그 하나만 보면 설정 문제처럼 보입니다. DB 에러와 RDS connection metric을 같은 시간축에 올려야 connection exhaustion이라는 결론이 나옵니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              pool size는 서비스 하나만 보고 정하면 안 된다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                HikariCP에서 <InlineCode>maximumPoolSize</InlineCode>는 pool이
                도달할 수 있는 최대 DB connection 수입니다. 이 값은 idle connection과
                in-use connection을 모두 포함합니다. 기본값만 놓고 보면 작아 보일 수
                있지만, Kubernetes에서는 Pod 수와 서비스 수가 곱해집니다.
              </p>
              <p>
                예를 들어 서비스 6개가 있고 각 서비스가 Pod 2개씩 떠 있으며, 각 Pod의
                pool 최대값이 10이면 이론상 애플리케이션만으로도 120개의 DB connection을
                요구할 수 있습니다. 여기에 migration job, admin 접속, 모니터링, batch
                작업까지 더해집니다.
              </p>
              <p>
                dev RDS는 운영 RDS보다 작은 instance class를 쓰는 경우가 많습니다.
                그래서 운영과 같은 pool 설정을 그대로 가져오면 dev 환경에서만 기동
                시점에 connection이 터질 수 있습니다. 이 장애도 트래픽 peak 문제가
                아니라 여러 pool이 동시에 warm-up되는 기동 peak 문제였습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/rds-connection-exhaustion-pool-budget.png"
              alt="서비스별 Hikari pool size와 Pod replicas가 합산되어 RDS max_connections와 비교되는 connection budget 다이어그램"
              width={1440}
              height={900}
              caption="DB connection budget은 서비스 단위가 아니라 클러스터 단위로 봐야 합니다. 각 Pod의 pool이 작아 보여도 서비스 수와 replicas가 곱해지면 dev RDS 한도를 쉽게 넘습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              조치: dev RDS 용량에 맞게 pool을 줄였다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                조치는 RDS 한도를 무작정 올리는 쪽이 아니라, dev 환경에서 실제로 필요한
                connection budget을 먼저 낮추는 방향으로 잡았습니다. 서비스별 traffic이
                낮은 dev 환경에서는 <InlineCode>maximum-pool-size</InlineCode>를 작게
                잡고, <InlineCode>minimum-idle</InlineCode>도 낮춰 기동 직후 불필요한
                idle connection을 많이 만들지 않도록 했습니다.
              </p>
              <p>
                중요한 점은 이 설정을 모든 환경에 복사하면 안 된다는 것입니다. 운영에서는
                traffic, latency, DB instance class, query time, transaction duration을
                보고 별도 산정해야 합니다. 이번 조치는 dev RDS의 제한된 용량과 동시에
                뜨는 서비스 수에 맞춘 환경별 조정입니다.
              </p>
            </div>
            <CodeBlock
              code={`spring:
  datasource:
    hikari:
      maximum-pool-size: 3
      minimum-idle: 0
      connection-timeout: 30000`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              설정 변경 후에는 단순히 Pod가 Running이 되는지만 보지 않았습니다.
              rollout 중 RDS의 <InlineCode>DatabaseConnections</InlineCode> metric이
              어떻게 움직이는지 확인했고, 재기동 순간에도 connection 수가 한도 근처까지
              치솟지 않는지 봤습니다.
            </p>
            <CodeBlock
              code={`$ kubectl rollout restart deploy/<service-name> -n backend-dev
$ kubectl get pods -n backend-dev -w
$ kubectl logs deploy/<service-name> -n backend-dev

# DB side
mysql> SHOW VARIABLES LIKE 'max_connections';
mysql> SHOW STATUS LIKE 'Threads_connected';`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              readiness 실패를 어떻게 해석해야 했나
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                readiness가 올라오지 않는다는 사실만으로는 원인을 알 수 없습니다.
                애플리케이션 설정이 틀렸을 수도 있고, DB가 죽었을 수도 있고, DB가
                살아 있지만 연결 한도를 넘었을 수도 있습니다. readiness는 결과일 뿐,
                원인은 startup log와 외부 dependency 상태를 함께 봐야 드러납니다.
              </p>
              <p>
                이번 경우 readiness 실패는 애플리케이션이 정상적으로 HTTP 요청을 받을
                준비가 되지 않았다는 신호였습니다. 더 깊게 보면 JPA/Hibernate 초기화
                단계에서 DB metadata 조회에 실패했고, 그 실패의 외부 원인은 RDS
                connection exhaustion이었습니다.
              </p>
              <p>
                그래서 Kubernetes 이벤트, Pod 로그, DB 에러, RDS metric을 한 화면에
                놓는 것이 중요합니다. 한 계층의 로그만 보면 설정 누락처럼 보이지만,
                여러 계층을 같은 시간축으로 보면 리소스 한도 초과가 보입니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              재발 방지 체크리스트
            </h2>
            <div className="mt-6">
              <NoteRow
                title="서비스별 pool budget 표를 둔다"
                body="서비스별 maximum pool size, replicas, 예상 최대 connection 수를 표로 관리합니다. DB 한도에서 운영자 접속, migration, 모니터링, 긴급 대응용 여유 connection을 빼고 계산해야 합니다."
              />
              <NoteRow
                title="환경별 datasource 설정을 분리한다"
                body="dev, staging, production의 RDS instance class와 트래픽이 다르면 Hikari 설정도 달라야 합니다. 운영값을 dev에 그대로 복사하면 작은 RDS에서 기동 peak가 장애가 될 수 있습니다."
              />
              <NoteRow
                title="rollout 중 DBConnections를 본다"
                body="평상시 connection 수만 보면 기동 순간의 spike를 놓칩니다. 배포나 재기동 중 RDS DatabaseConnections, Threads_connected, Hikari active/idle metric을 같이 봐야 합니다."
              />
              <NoteRow
                title="startup failure 로그를 설정 문제로 단정하지 않는다"
                body="Unable to determine Dialect without JDBC metadata는 datasource 누락뿐 아니라 DB 접속 실패, 인증 실패, network failure, connection exhaustion에서도 발생할 수 있습니다."
              />
              <NoteRow
                title="필요하면 기동 순서를 분산한다"
                body="모든 서비스를 동시에 재기동하면 pool warm-up이 한 번에 몰립니다. dev 환경에서는 rollout 순서, maxUnavailable, batch/migration 실행 시점을 조정해 connection peak를 낮출 수 있습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                이 장애의 핵심은 에러 메시지의 첫인상에 끌려가지 않는 것입니다.
                datasource 설정이 빠진 것처럼 보였지만, 실제로는 DB connection을
                확보하지 못해 Hibernate metadata 조회가 실패한 상황이었습니다.
              </p>
              <p>
                connection pool은 애플리케이션 내부 설정처럼 보이지만 운영에서는
                공유 DB 리소스를 소비하는 인프라 설정입니다. 서비스 하나의 pool이
                아니라 전체 서비스, 전체 Pod, 전체 rollout 시점의 connection 합계를
                봐야 합니다.
              </p>
              <p>
                readiness 실패는 애플리케이션의 최종 증상이고, 원인은 그 아래 계층에
                있었습니다. Pod log와 DB error, RDS metric을 같은 시간축에 놓고 본
                순간 장애는 설정 누락이 아니라 connection exhaustion으로 정리되었습니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
