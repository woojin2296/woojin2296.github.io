import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "X-Forwarded-For를 믿고 IP 화이트리스트를 만들면 뚫리는 이유 | Blog",
  description:
    "관리자 페이지 IP 화이트리스트가 X-Forwarded-For 헤더 spoofing으로 우회될 수 있는 이유와 Spring/Tomcat의 신뢰 프록시 설정을 정리한 글",
};

const references = [
  {
    label: "MDN - X-Forwarded-For header",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-For",
  },
  {
    label: "RFC 7239 - Forwarded HTTP Extension",
    href: "https://www.rfc-editor.org/rfc/rfc7239",
  },
  {
    label: "Spring Boot - Running Behind a Front-end Proxy Server",
    href: "https://docs.spring.io/spring-boot/how-to/webserver.html",
  },
  {
    label: "Apache Tomcat - RemoteIpValve",
    href: "https://tomcat.apache.org/tomcat-11.0-doc/api/org/apache/catalina/valves/RemoteIpValve.html",
  },
];

export default function XffIpWhitelistBlogPostPage() {
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
              Security / Network · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              X-Forwarded-For를 믿고 IP 화이트리스트를 만들면 뚫리는 이유
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              관리자 페이지를 회사 IP에서만 접근할 수 있게 막았는데 외부 접근이
              성공해 있었습니다. 화이트리스트 비교 로직 자체에는 문제가 없었습니다.
              문제는 우리가 비교한 IP가 패킷의 출발지가 아니라 HTTP 헤더에서 온 값일
              수 있다는 점이었습니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              코드에는 버그가 없는데 왜 뚫렸을까?
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                관리자 페이지 앞에는 load balancer가 있었습니다. 애플리케이션 서버
                입장에서는 모든 요청의 TCP peer가 load balancer 사설 IP로 보입니다.
                그래서 진짜 클라이언트 IP를 알기 위해 load balancer가{" "}
                <InlineCode>X-Forwarded-For</InlineCode> 헤더에 원래 IP를 적어
                backend로 넘겨줍니다.
              </p>
              <p>
                여기까지는 흔한 구조입니다. 문제는{" "}
                <InlineCode>X-Forwarded-For</InlineCode>가 특별한 보안 채널이 아니라
                그냥 HTTP request header라는 점입니다. 클라이언트도 같은 이름의 헤더를
                직접 보낼 수 있습니다. MDN 문서에서도 이 헤더는 de-facto standard일
                뿐이고, 보안 목적으로 사용할 때는 신뢰 가능한 proxy가 추가한 값만
                사용해야 한다고 설명합니다.
              </p>
              <p>
                만약 애플리케이션이 이 헤더의 첫 번째 값을 그대로 클라이언트 IP로
                믿는다면 공격자는 회사 IP를 첫 칸에 써 넣을 수 있습니다. load
                balancer가 기존 값을 지우지 않고 뒤에 덧붙이는 방식이면 backend는
                공격자가 만든 값을 먼저 보게 됩니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/xff-spoofing-flow.png"
              alt="공격자가 X-Forwarded-For 첫 값을 회사 IP로 위조하고 backend가 첫 값을 신뢰해 관리자 페이지 접근을 허용하는 흐름 다이어그램"
              width={1440}
              height={900}
              caption="X-Forwarded-For의 왼쪽 값은 항상 진실이 아닙니다. 애플리케이션이 첫 번째 값을 바로 신뢰하면 공격자가 보낸 가짜 IP가 화이트리스트를 통과할 수 있습니다."
            />
            <CodeBlock
              code={`// 위험한 예: 헤더의 첫 번째 값을 그대로 신뢰한다.
String xff = request.getHeader("X-Forwarded-For");
String clientIp = xff.split(",")[0].trim();

if (companyIps.contains(clientIp)) {
  allowAdminPage();
}`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              X-Forwarded-For는 IP 목록이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>X-Forwarded-For</InlineCode>는 단일 IP라기보다 proxy를
                지나며 누적되는 IP 목록에 가깝습니다. 일반적으로 왼쪽에는 최초
                클라이언트로 알려진 값이, 오른쪽에는 backend에 더 가까운 proxy 값이
                놓입니다.
              </p>
              <p>
                하지만 “왼쪽이 원래 클라이언트”라는 설명은 모든 hop이 정상적으로
                동작하고 신뢰 가능할 때만 의미가 있습니다. 클라이언트가 임의 값을
                넣을 수 있고, 중간 proxy가 기존 값을 보존할 수도 있으며, 여러 개의
                같은 헤더가 합쳐질 수도 있습니다. 그래서 보안 판단에서는 “몇 번째
                값인가”보다 “어느 proxy가 추가한 값인가”가 더 중요합니다.
              </p>
              <p>
                RFC 7239의 표준 <InlineCode>Forwarded</InlineCode> 헤더도 같은
                경고를 갖고 있습니다. 헤더는 client를 포함한 중간 노드에 의해
                잘못되거나 악의적으로 수정될 수 있으므로, proxy를 검증하고 신뢰
                boundary를 정해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`X-Forwarded-For: 198.51.100.45, 203.0.113.80, 10.0.12.34

# 왼쪽부터
# 198.51.100.45  최초 클라이언트로 주장되는 값
# 203.0.113.80   CDN 또는 중간 proxy
# 10.0.12.34     backend에 가장 가까운 load balancer`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              해결의 핵심은 신뢰할 hop을 명시하는 것이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                해결은 “헤더를 쓰지 말자”가 아니라 “아무 헤더나 믿지 말자”입니다.
                backend에 직접 들어오는 요청을 막고, load balancer나 CDN처럼 우리가
                통제하는 proxy에서 온 요청만 신뢰해야 합니다. 그 다음 header chain을
                backend에 가까운 오른쪽에서 왼쪽으로 읽으면서 신뢰 가능한 proxy를
                제외하고, 처음 만나는 신뢰되지 않은 IP를 클라이언트 후보로 봐야
                합니다.
              </p>
              <p>
                Spring Boot가 내장 Tomcat을 쓴다면 일반적으로{" "}
                <InlineCode>server.forward-headers-strategy=NATIVE</InlineCode>를 통해
                컨테이너의 forwarded header 처리를 사용할 수 있습니다. Tomcat에서는
                이 역할을 <InlineCode>RemoteIpValve</InlineCode>가 맡습니다. Tomcat
                문서에 따르면 이 valve는 <InlineCode>remoteIpHeader</InlineCode> 값을
                오른쪽에서 왼쪽으로 처리하고, <InlineCode>internalProxies</InlineCode>
                와 <InlineCode>trustedProxies</InlineCode>에 따라 실제{" "}
                <InlineCode>request.remoteAddr</InlineCode>를 재설정합니다.
              </p>
              <p>
                특히 <InlineCode>internal-proxies</InlineCode>를 비워 모든 proxy를
                신뢰하는 설정은 운영에서 피해야 합니다. 신뢰할 수 있는 사설 대역,
                load balancer subnet, CDN egress 대역을 명시적으로 관리해야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/xff-trusted-proxy-selection.png"
              alt="Client, CDN, Load Balancer, Spring/Tomcat 사이에서 X-Forwarded-For를 오른쪽에서 왼쪽으로 읽어 신뢰 proxy를 제외하고 클라이언트 IP를 결정하는 다이어그램"
              width={1440}
              height={900}
              caption="신뢰 boundary는 backend에 가까운 hop부터 계산해야 합니다. load balancer만 신뢰하면 CDN IP가 클라이언트로 보일 수 있고, CDN까지 신뢰하려면 CDN egress 대역까지 함께 관리해야 합니다."
            />
            <CodeBlock
              code={`# Spring Boot + Tomcat 예시
server.forward-headers-strategy=native
server.tomcat.remoteip.remote-ip-header=x-forwarded-for
server.tomcat.remoteip.protocol-header=x-forwarded-proto

# 예시일 뿐입니다. 실제 운영 subnet에 맞게 좁혀야 합니다.
server.tomcat.remoteip.internal-proxies=10\\.0\\.\\d{1,3}\\.\\d{1,3}`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              CDN을 추가하면 신뢰 hop도 바뀐다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                처음에는 구조가 단순할 수 있습니다. Internet에서 load balancer로
                들어오고, load balancer가 backend로 넘기는 구조라면 신뢰할 hop은 load
                balancer 하나입니다. 그런데 중간에 CDN이나 WAF를 추가하면 hop이 하나
                더 늘어납니다.
              </p>
              <p>
                이때 애플리케이션이 load balancer만 신뢰하도록 설정되어 있으면,
                오른쪽에서 왼쪽으로 읽었을 때 처음 만나는 신뢰되지 않은 IP가 CDN IP가
                됩니다. 그래서 진짜 사용자 IP가 아니라 CDN edge IP를 사용자처럼
                기록하거나 차단하게 됩니다.
              </p>
              <p>
                반대로 CDN까지 신뢰하려면 CDN egress IP 대역을 정확히 관리해야 하고,
                CDN 또는 edge proxy에서 외부 클라이언트가 보낸 기존 forwarding header를
                어떻게 처리하는지도 정해야 합니다. 가능하면 edge에서 기존 값을
                sanitize하고, provider-specific client IP header를 쓸 때도 해당
                provider IP 대역에서 온 요청에만 믿어야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              IP는 사용자가 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                proxy 처리를 올바르게 해도 IP 기반 접근 제어에는 한계가 있습니다.
                이동통신망이나 일부 NAT 환경에서는 수많은 사용자가 같은 public IP를
                공유합니다. 한 명을 차단했는데 무관한 사용자까지 같이 막히는 일이
                생깁니다.
              </p>
              <p>
                반대로 공격자는 VPN, proxy, cloud instance를 통해 IP를 바꿀 수
                있습니다. 그래서 관리자 페이지 보안에서 IP는 “네트워크 노출을 줄이는
                보조 신호”로 보는 것이 맞습니다. 인증 토큰, 관리자 권한, device/session
                context, VPN 또는 private ingress, audit log, 이상 행동 탐지를 함께
                봐야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/xff-ip-signal-limits.png"
              alt="IP 기반 접근 제어가 NAT 공유 IP, HTTP 헤더 신뢰 문제, 인증 및 이상 행동 탐지 같은 추가 신호와 함께 설계되어야 함을 보여주는 다이어그램"
              width={1440}
              height={900}
              caption="정규화된 client IP도 사용자 그 자체는 아닙니다. IP allowlist는 노출면을 줄이는 장치이고, 관리자 접근은 인증과 권한, 세션, 장치, 행위 기반 신호까지 함께 봐야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              점검 순서
            </h2>
            <div className="mt-6">
              <NoteRow
                title="backend 직접 접근을 막는다"
                body="애플리케이션 서버가 인터넷에서 직접 접근 가능하면 어떤 forwarding header도 보안 판단에 사용할 수 없습니다. security group, firewall, private subnet으로 load balancer나 proxy에서 오는 요청만 받게 해야 합니다."
              />
              <NoteRow
                title="X-Forwarded-For 첫 값을 직접 읽지 않는다"
                body={'request.getHeader("X-Forwarded-For")의 첫 값을 client IP로 쓰는 코드는 우회될 수 있습니다. container나 framework의 trusted proxy 처리를 거친 request.remoteAddr를 기준으로 봅니다.'}
              />
              <NoteRow
                title="신뢰 proxy 대역을 명시한다"
                body="load balancer, CDN, WAF가 추가될 때마다 internalProxies 또는 trustedProxies 설정을 갱신해야 합니다. 운영에서 모든 proxy를 신뢰하는 설정은 피합니다."
              />
              <NoteRow
                title="edge에서 forwarding header를 정리한다"
                body="외부 클라이언트가 보낸 기존 X-Forwarded-For를 그대로 보존할지, 덮어쓸지, sanitize할지 edge 정책을 명확히 합니다. provider-specific header도 provider IP에서 온 요청에만 신뢰합니다."
              />
              <NoteRow
                title="IP allowlist를 단독 인증 수단으로 두지 않는다"
                body="관리자 페이지는 IP 제한과 별개로 강한 인증, 권한 검증, 세션 보호, 감사 로그, 이상 행동 탐지를 같이 둬야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                IP 화이트리스트 코드가 정확해도, 비교 대상 IP를 잘못 가져오면 보안은
                깨집니다. <InlineCode>X-Forwarded-For</InlineCode>는 패킷의 출발지가
                아니라 proxy들이 전달하기로 약속한 HTTP 헤더입니다. 클라이언트가
                보낸 값을 그대로 믿으면 공격자가 회사 IP를 흉내 낼 수 있습니다.
              </p>
              <p>
                운영 환경에서 필요한 것은 신뢰할 수 있는 proxy boundary를 명시하고,
                header chain을 backend에 가까운 쪽부터 해석하는 것입니다. Spring/Tomcat
                환경에서는 <InlineCode>RemoteIpValve</InlineCode>와{" "}
                <InlineCode>server.forward-headers-strategy</InlineCode> 설정을
                실제 load balancer/CDN 구조에 맞게 관리해야 합니다.
              </p>
              <p>
                마지막으로 IP는 사용자 식별자가 아니라 하나의 신호입니다. 네트워크
                접근면을 줄이는 데는 유용하지만, 관리자 페이지의 최종 보안 판단은
                인증, 권한, 세션, 장치, 행동 신호와 함께 설계해야 합니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
