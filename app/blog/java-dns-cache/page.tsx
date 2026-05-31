import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "DNS TTL이 지났는데도 Java 서버가 옛날 IP를 보는 이유 | Blog",
  description:
    "DNS 레코드와 TTL은 정상인데 특정 Java 서버만 옛날 IP로 요청하던 원인을 InetAddress DNS 캐시와 JVM 프로세스 관점에서 정리한 글",
};

const references = [
  {
    label: "Oracle Java SE 21 - Networking Properties",
    href: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/doc-files/net-properties.html",
  },
  {
    label: "Oracle Java SE 24 - InetAddress",
    href: "https://docs.oracle.com/en/java/javase/24/docs/api/java.base/java/net/InetAddress.html",
  },
  {
    label: "OpenJDK JEP 411 - Deprecate the Security Manager for Removal",
    href: "https://openjdk.org/jeps/411",
  },
];

export default function JavaDnsCacheBlogPostPage() {
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
              Network / Java · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              DNS TTL이 지났는데도 Java 서버가 옛날 IP를 보는 이유
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              서버 IP를 바꾸고 DNS 레코드와 TTL까지 확인했는데 특정 Java 서버만
              계속 옛날 IP로 요청을 보내는 일이 있습니다. 이때 문제는 DNS 서버가
              아니라 이미 실행 중인 JVM 내부의 DNS 캐시일 수 있습니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              TTL 300초인데 30분 뒤에도 옛날 IP로 간다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                새벽 배포가 끝난 뒤 서버 IP를 변경했습니다. DNS A 레코드도 새 IP로
                바꿨고 TTL은 <InlineCode>300</InlineCode>초였습니다. 보통 이
                상황에서는 최대 5분 정도 지나면 resolver가 다시 authoritative DNS에
                물어보고 새 IP를 받아갈 것으로 기대합니다.
              </p>
              <p>
                실제로 대부분의 서버는 정상적으로 새 IP를 사용했습니다. 그런데 특정
                서버 하나만 5분이 지나도, 30분이 지나도 계속 옛날 IP로 요청을 보내고
                있었습니다. 애플리케이션 로그에는 분명히 구 IP로 연결을 시도한 흔적이
                남아 있었습니다.
              </p>
              <p>
                그래서 해당 서버에서 직접 <InlineCode>dig</InlineCode>를 실행했습니다.
                결과는 정상이었습니다. 같은 서버의 셸에서는 새 IP가 보이는데, 같은
                서버에서 떠 있는 애플리케이션은 옛날 IP를 보고 있었습니다. 이 지점에서
                문제를 DNS 서버나 레코드 전파만으로 보면 길을 잃습니다.
              </p>
            </div>
            <CodeBlock
              code={`$ dig api.example.com

api.example.com. 300 IN A 203.0.113.20

# 그런데 애플리케이션 로그
connect to api.example.com/198.51.100.10:443 timed out`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              dig와 Java 애플리케이션은 같은 캐시를 보지 않는다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>dig</InlineCode>는 지금 이 순간 DNS 질의를 보내 결과를
                확인하는 도구입니다. 반면 Java 애플리케이션은 네트워크 연결 전에
                <InlineCode>InetAddress</InlineCode>를 통해 host name을 IP 주소로
                해석하고, 그 결과를 JVM 프로세스 안에 캐시할 수 있습니다.
              </p>
              <p>
                Oracle의 <InlineCode>InetAddress</InlineCode> 문서도 성공한 host name
                해석과 실패한 해석 모두를 캐시한다고 설명합니다. 즉 운영자가 셸에서
                확인한 DNS 결과와 이미 실행 중인 Java 프로세스가 들고 있는 주소가
                서로 다를 수 있습니다.
              </p>
              <p>
                그래서 <InlineCode>dig</InlineCode>가 정상이라는 사실은 “DNS 레코드가
                지금 정상이다”는 증거이지, “애플리케이션이 지금 같은 IP를 쓰고
                있다”는 증거가 아닙니다. 둘 사이에는 OS resolver, JVM 캐시, HTTP
                client connection pool 같은 레이어가 더 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/java-dns-cache-layer-mismatch.png"
              alt="DNS 레코드는 새 IP를 반환하지만 이미 실행 중인 Java 프로세스는 InetAddress 캐시에서 옛날 IP를 볼 수 있는 구조 다이어그램"
              width={1440}
              height={900}
              caption="같은 서버에서도 셸에서 실행한 dig 결과와 Java 프로세스가 사용하는 주소가 다를 수 있습니다. dig는 현재 DNS 결과를 확인하지만, JVM은 이전 조회 결과를 프로세스 내부 캐시에서 꺼낼 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              문제의 핵심은 networkaddress.cache.ttl이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Java의 DNS 캐시 정책은 <InlineCode>networkaddress.cache.ttl</InlineCode>
                이라는 Java security property로 제어합니다. 이 값은 성공한 DNS
                조회 결과를 JVM 안에서 몇 초 동안 캐시할지 정합니다.
              </p>
              <p>
                값이 <InlineCode>30</InlineCode>이면 성공한 조회 결과를 30초 동안
                캐시합니다. 값이 <InlineCode>0</InlineCode>이면 성공 결과를 캐시하지
                않습니다. 값이 <InlineCode>-1</InlineCode>이면 cache forever, 즉 JVM
                프로세스가 살아 있는 동안 계속 들고 갈 수 있습니다.
              </p>
              <p>
                공식 문서 기준으로 security manager가 설치된 경우 기본값은
                <InlineCode>-1</InlineCode>이고, security manager가 없으면 기본값은
                구현체별로 달라질 수 있습니다. Java 17부터 Security Manager는 제거
                예정으로 deprecated 되었지만, 오래된 서버나 레거시{" "}
                <InlineCode>java.security</InlineCode> 설정에는 이 캐시 정책이 그대로
                남아 있을 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/java-dns-cache-ttl-values.png"
              alt="networkaddress.cache.ttl 값 -1, 0, 양수 초 단위가 Java DNS 캐시 동작에 미치는 영향을 비교한 다이어그램"
              width={1440}
              height={900}
              caption="DNS 레코드의 TTL과 JVM 내부 캐시 TTL은 별개의 레이어입니다. Java의 positive cache TTL이 무한이면 DNS TTL이 끝나도 이미 실행 중인 JVM은 같은 주소를 계속 사용할 수 있습니다."
            />
            <CodeBlock
              code={`# Java security property
networkaddress.cache.ttl=30
networkaddress.cache.negative.ttl=10`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              설정 위치를 잘못 잡으면 바꿔도 적용되지 않는다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                여기서 자주 나오는 실수는{" "}
                <InlineCode>-Dnetworkaddress.cache.ttl=30</InlineCode>처럼 일반
                system property로 넘기는 것입니다. Oracle 문서는 이 값들이 security
                policy의 일부라서 <InlineCode>-D</InlineCode> 옵션이나{" "}
                <InlineCode>System.setProperty()</InlineCode>로 설정되는 값이 아니라
                Java security property로 설정되어야 한다고 설명합니다.
              </p>
              <p>
                운영에서는 <InlineCode>$JAVA_HOME/conf/security/java.security</InlineCode>
                에 명시하거나, 별도 security properties 파일을 두고{" "}
                <InlineCode>-Djava.security.properties</InlineCode>로 추가하는 방식을
                검토할 수 있습니다. 애플리케이션 코드에서{" "}
                <InlineCode>Security.setProperty</InlineCode>를 호출하는 방법도 있지만,
                첫 DNS 조회가 발생하기 전에 아주 이른 시점에서 실행되어야 합니다.
              </p>
              <p>
                이미 구 IP를 캐시한 JVM은 DNS 레코드를 바꿨다고 자동으로 잊지
                않습니다. TTL이 무한이거나 길게 잡혀 있으면 결국 프로세스를 재시작해
                캐시를 비워야 합니다. 롤링 배포도 각 인스턴스가 실제로 새 JVM
                프로세스로 교체될 때만 의미가 있습니다.
              </p>
            </div>
            <CodeBlock
              code={`# 예: 별도 security properties 파일을 추가로 읽게 한다.
java -Djava.security.properties=/etc/myapp/java-dns-cache.security \\
  -jar myapp.jar

# /etc/myapp/java-dns-cache.security
networkaddress.cache.ttl=30
networkaddress.cache.negative.ttl=10`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              너무 짧은 TTL도 정답은 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>networkaddress.cache.ttl=30</InlineCode>처럼 유한한 값을
                두면 IP 변경 상황에서는 훨씬 안전해집니다. 하지만 무조건 짧게 잡는
                것도 좋은 선택은 아닙니다. TTL이 짧을수록 애플리케이션은 더 자주 DNS
                조회를 해야 합니다.
              </p>
              <p>
                DNS resolver 응답이 느려지거나 장애가 나면 HTTP 요청의 앞단에서 주소
                해석 단계가 함께 느려질 수 있습니다. 애플리케이션 로그에는 “DNS
                캐시가 문제였다”는 친절한 힌트가 남지 않고 단순 connect timeout,
                read timeout, unknown host처럼 보일 때가 많습니다.
              </p>
              <p>
                HTTP client connection pool도 같이 봐야 합니다. DNS 캐시가 갱신되어도
                이미 열린 TCP connection을 계속 재사용하면 한동안 옛 서버로 트래픽이
                갈 수 있습니다. IP 전환 직후에는 DNS 캐시, connection pool, 배포 방식
                세 가지를 함께 점검해야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              점검 순서
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                이 문제는 “DNS가 맞는지”만 보면 확인이 끝나지 않습니다. 같은 host
                name을 OS, JVM, 애플리케이션 client가 각각 어느 레이어에서 해석하고
                있는지 나눠 봐야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/java-dns-cache-debug-flow.png"
              alt="Java 서버가 DNS 변경 후에도 옛날 IP를 사용하는 상황에서 DNS, OS resolver, JVM 캐시, HTTP connection pool 순서로 점검하는 흐름 다이어그램"
              width={1440}
              height={900}
              caption="DNS 변경 장애는 레코드 확인만으로 끝내기 어렵습니다. 현재 DNS 결과, OS resolver, JVM InetAddress 캐시, HTTP connection pool을 순서대로 나누면 어느 레이어가 옛 주소를 들고 있는지 좁힐 수 있습니다."
            />
            <CodeBlock
              code={`# 1. 현재 DNS 레코드 확인
dig api.example.com

# 2. OS/NSS 경로 확인
getent hosts api.example.com

# 3. 같은 JVM 계열에서 InetAddress 결과 확인
jshell <<'EOF'
import java.net.*;
System.out.println(java.util.Arrays.toString(
  InetAddress.getAllByName("api.example.com")
));
EOF

# 4. 실행 중인 애플리케이션의 security property 확인
java.security.Security.getProperty("networkaddress.cache.ttl")`}
            />
            <div className="mt-6">
              <NoteRow
                title="dig가 정상이어도 JVM이 정상이라는 뜻은 아니다"
                body="dig는 현재 DNS 질의를 확인합니다. 이미 실행 중인 Java 프로세스가 과거 조회 결과를 캐시하고 있으면 애플리케이션은 다른 IP를 사용할 수 있습니다."
              />
              <NoteRow
                title="TTL 설정은 security property로 본다"
                body="networkaddress.cache.ttl은 일반 애플리케이션 설정이나 system property처럼 다루면 적용을 놓치기 쉽습니다. 실제 java.security 또는 추가 security properties 파일을 확인해야 합니다."
              />
              <NoteRow
                title="재시작 범위를 JVM 프로세스 기준으로 잡는다"
                body="설정 reload나 일부 rolling 절차가 프로세스를 유지한다면 InetAddress 캐시가 그대로 남을 수 있습니다. IP 전환 장애에서는 어떤 JVM이 실제로 내려갔다 올라왔는지 확인해야 합니다."
              />
              <NoteRow
                title="connection pool을 같이 비운다"
                body="DNS 캐시가 해결되어도 기존 keep-alive connection이 남아 있으면 트래픽이 옛 서버로 보일 수 있습니다. client pool idle timeout과 drain 전략도 같이 봐야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DNS TTL은 resolver가 DNS 응답을 얼마나 오래 캐시해도 되는지 알려주는
                값입니다. 하지만 Java 애플리케이션이 실제로 사용하는 주소는 그 위에
                있는 <InlineCode>InetAddress</InlineCode> 캐시 정책의 영향을 받습니다.
              </p>
              <p>
                그래서 서버에서 <InlineCode>dig</InlineCode>를 쳤을 때 새 IP가
                나온다고 해서, 이미 실행 중인 Java 프로세스도 새 IP를 쓴다고 단정할 수
                없습니다. <InlineCode>networkaddress.cache.ttl</InlineCode>이
                <InlineCode>-1</InlineCode>이거나 매우 길게 잡혀 있으면 JVM이 종료될
                때까지 옛 주소를 계속 사용할 수 있습니다.
              </p>
              <p>
                운영에서 필요한 것은 DNS TTL과 JVM DNS 캐시 TTL을 구분하고, 변경에
                맞는 유한 TTL을 설정하며, IP 전환 시에는 JVM 프로세스와 HTTP connection
                pool까지 함께 교체하거나 비우는 것입니다. 네트워크 문제를 코드 로그만
                보고 찾기 어려운 이유가 여기에 있습니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
