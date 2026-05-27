import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "네트워크 계층별 스위치와 라우터 정리 | Blog",
  description:
    "L1 hub/repeater, L2 switch, L3 router/L3 switch, L4 switch/load balancer, L7 reverse proxy를 각 계층의 판단 기준과 데이터 전달 흐름으로 정리한 글",
};

const references = [
  {
    label: "IEEE 802.1Q - Virtual LANs and VLAN Bridges",
    href: "https://www.ieee802.org/1/pages/802.1Q.html",
  },
  {
    label: "RFC 826 - Ethernet Address Resolution Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc826",
  },
  {
    label: "RFC 1812 - Requirements for IP Version 4 Routers",
    href: "https://www.rfc-editor.org/rfc/rfc1812",
  },
  {
    label: "RFC 9293 - Transmission Control Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc9293",
  },
  {
    label: "RFC 768 - User Datagram Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc768",
  },
  {
    label: "RFC 9110 - HTTP Semantics",
    href: "https://www.rfc-editor.org/rfc/rfc9110",
  },
];

export default function NetworkSwitchRouterLayersBlogPostPage() {
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
              Network / Infrastructure · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              네트워크 계층별 스위치와 라우터 정리
            </h1>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장비 이름보다 계층이 먼저다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                네트워크 장비를 볼 때 가장 헷갈리는 지점은 이름입니다. switch라고 해서
                항상 L2 장비만 의미하지 않습니다. L3 switch, L4 switch, L7 switch라는
                표현도 쓰입니다. router도 단순히 인터넷 공유기만 의미하지 않습니다.
              </p>
              <p>
                그래서 장비 이름보다 먼저 봐야 할 것은{" "}
                <strong className="font-medium text-black">어느 계층의 어떤 정보를 보고 전달 결정을 하는가</strong>
                입니다. Ethernet MAC address를 보면 L2 switching이고, destination IP와
                prefix를 보면 L3 routing입니다. TCP/UDP port와 flow를 보면 L4 load
                balancing이고, HTTP host/path/header를 보면 L7 request routing입니다.
              </p>
              <p>
                결국 switch와 router를 계층별로 정리한다는 것은 “이 장비가 packet 또는
                frame의 어느 header를 읽고, 어떤 table을 보고, 어느 쪽으로 내보내는가”를
                구분하는 일입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-devices-layer-map.png"
              alt="L1 hub repeater, L2 bridge switch, L3 router L3 switch, L4 load balancer, L7 reverse proxy가 계층별로 보는 header를 정리한 다이어그램"
              width={1440}
              height={900}
              caption="장비 이름이 아니라 판단 기준을 봐야 합니다. L2는 MAC/VLAN, L3는 IP prefix, L4는 TCP/UDP port와 flow, L7은 HTTP host/path/header를 기준으로 전달 결정을 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              계층별 장비를 한 번에 보기
            </h2>
            <div className="mt-6">
              <LayerRow
                title="L1: Repeater / Hub"
                body="전기적 또는 광학적 신호를 증폭하거나 여러 포트로 반복합니다. MAC, IP, port를 해석하지 않습니다. collision domain까지 공유하는 오래된 hub를 떠올리면 됩니다."
              />
              <LayerRow
                title="L2: Bridge / Switch"
                body="Ethernet frame의 source/destination MAC address와 VLAN membership을 기준으로 frame을 전달합니다. 같은 broadcast domain 안에서 동작하고, MAC table을 학습합니다."
              />
              <LayerRow
                title="L3: Router / L3 Switch"
                body="IP packet의 destination IP를 보고 route table에서 next hop과 output interface를 고릅니다. 서로 다른 subnet 또는 VLAN 사이 통신은 L3 gateway를 거칩니다."
              />
              <LayerRow
                title="L4: L4 Switch / Load Balancer"
                body="source/destination IP, TCP/UDP port, protocol 같은 flow 정보를 보고 backend를 선택합니다. connection tracking, health check, SNAT/DNAT이 함께 등장합니다."
              />
              <LayerRow
                title="L7: L7 Switch / Reverse Proxy / API Gateway"
                body="HTTP host, path, header, method, cookie 같은 application 정보를 보고 upstream을 선택합니다. TLS termination, WAF, 인증, rate limiting과 함께 배치되는 경우가 많습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L2 Switch: MAC table로 frame을 전달한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L2 switch는 IP 주소 범위를 보고 판단하지 않습니다. Ethernet frame의
                source MAC address를 보고 어느 port에 어떤 MAC이 있는지 학습하고,
                destination MAC address를 보고 해당 port로 frame을 전달합니다.
              </p>
              <p>
                destination MAC을 모르면 같은 VLAN 안에서 flood합니다. 하지만 VLAN이
                다르면 그 broadcast domain 밖으로 frame을 넘기지 않습니다. 그래서 같은
                물리 switch에 연결되어 있어도 VLAN이 다르면 L2로 바로 통신하지 못합니다.
              </p>
              <p>
                같은 subnet의 host끼리 통신할 때 ARP가 먼저 필요한 이유도 여기에
                있습니다. IP로 상대를 부르고 싶어도 실제 Ethernet frame을 보내려면
                destination MAC이 필요합니다. ARP는 IP 주소를 MAC 주소로 해석해 L2
                switch가 frame을 전달할 수 있게 만듭니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-devices-l2-switch.png"
              alt="L2 switch가 source MAC을 학습하고 destination MAC으로 frame을 전달하는 MAC table 기반 동작 다이어그램"
              width={1440}
              height={900}
              caption="L2 switch의 핵심은 MAC table입니다. IP route가 아니라 Ethernet frame의 MAC 주소와 VLAN membership을 기준으로 전달합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Router와 L3 Switch: IP prefix로 next hop을 고른다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L3 장비는 IP network 사이를 연결합니다. host가 목적지 IP를 봤을 때
                같은 subnet이 아니면 default gateway로 packet을 보냅니다. 이 gateway
                역할을 하는 장비가 router 또는 L3 switch입니다.
              </p>
              <p>
                router는 destination IP를 route table과 비교합니다. 여러 prefix가
                동시에 match되면 가장 구체적인 prefix가 선택됩니다. 예를 들어{" "}
                <InlineCode>10.10.20.21</InlineCode>에 대해{" "}
                <InlineCode>10.10.20.0/24</InlineCode>와{" "}
                <InlineCode>0.0.0.0/0</InlineCode>이 모두 있다면{" "}
                <InlineCode>10.10.20.0/24</InlineCode>가 선택됩니다. 이것이 longest
                prefix match입니다.
              </p>
              <p>
                L3 switch는 이름에 switch가 붙지만 L3 routing 기능을 가진 장비입니다.
                주로 사내망이나 데이터센터 내부에서 VLAN 사이 routing을 빠르게 처리할 때
                사용됩니다. 반면 router는 WAN edge, NAT, VPN, BGP, 회선 연결처럼 외부망과
                만나는 경계에서 더 자주 등장합니다. 다만 제품마다 기능이 겹치기 때문에
                이름보다 실제 역할을 보는 편이 정확합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-devices-l3-routing.png"
              alt="Router와 L3 switch가 route table의 IP prefix를 보고 next hop과 output interface를 선택하는 다이어그램"
              width={1440}
              height={900}
              caption="L3 장비는 destination IP와 route table을 기준으로 다음 hop을 고릅니다. hop이 바뀔 때 L2 frame은 새로 만들어지지만, 일반적인 forwarding에서 L3 destination IP는 최종 목적지를 유지합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L4 Switch: connection flow를 backend로 분배한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L4 switch 또는 L4 load balancer는 IP router와 다릅니다. destination
                prefix만 보고 다음 router를 고르는 것이 아니라, source IP, source port,
                destination IP, destination port, protocol 같은 flow 정보를 보고 backend
                target을 선택합니다.
              </p>
              <p>
                예를 들어 사용자가 <InlineCode>203.0.113.10:443</InlineCode>으로
                접속하면 L4 load balancer는 그 TCP connection을 backend A로 보낼지
                backend B로 보낼지 결정합니다. 이후 같은 connection의 packet은 같은
                backend로 유지되어야 하므로 connection tracking이 중요합니다.
              </p>
              <p>
                L4 장비는 보통 HTTP 내용을 해석하지 않습니다. path가{" "}
                <InlineCode>/api</InlineCode>인지 <InlineCode>/admin</InlineCode>인지
                보지 않고, port와 flow 중심으로 분배합니다. 그래서 빠르고 단순하지만,
                application rule을 적용하려면 L7 계층이 필요합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L7 Switch: HTTP 요청 내용을 보고 upstream을 고른다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L7 switch라는 표현은 실제로는 reverse proxy, API gateway, ingress
                controller, application load balancer를 가리키는 경우가 많습니다. 이
                계층은 packet의 IP/port만 보는 것이 아니라 HTTP request의 의미를 봅니다.
              </p>
              <p>
                예를 들어 <InlineCode>api.example.com</InlineCode>은 API upstream으로,
                <InlineCode>admin.example.com</InlineCode>은 admin upstream으로 보낼 수
                있습니다. 같은 host라도 <InlineCode>/api</InlineCode>,{" "}
                <InlineCode>/static</InlineCode>, <InlineCode>/auth</InlineCode> path에
                따라 서로 다른 service로 보낼 수도 있습니다.
              </p>
              <p>
                L7 장비는 TLS termination, header 추가, 인증 연동, WAF, rate limiting,
                canary routing 같은 기능과 함께 쓰입니다. 다만 이 장비를 router처럼
                생각하면 안 됩니다. L7 장비는 IP packet forwarding 장비가 아니라,
                application request를 해석하고 새 upstream 요청을 만드는 proxy 계층에
                가깝습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-devices-l4-l7.png"
              alt="L4 switch load balancer와 L7 switch reverse proxy가 각각 보는 정보와 전달 기준을 비교한 다이어그램"
              width={1440}
              height={900}
              caption="L4/L7 장비도 트래픽 방향을 결정하지만 L3 router와 같은 의미의 routing은 아닙니다. L4는 flow, L7은 HTTP request semantics를 기준으로 backend를 선택합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              데이터가 지나갈 때 계층은 이렇게 이어진다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                사용자가 브라우저에서 API를 호출한다고 해보겠습니다. 먼저 OS는 목적지
                IP가 같은 subnet인지 판단합니다. 같은 subnet이 아니면 default gateway의
                MAC을 ARP로 찾고, Ethernet frame을 L2 switch로 보냅니다.
              </p>
              <p>
                L2 switch는 destination MAC과 VLAN을 보고 gateway 쪽 port로 frame을
                전달합니다. gateway 역할을 하는 router 또는 L3 switch는 IP packet의
                destination IP를 보고 route table에서 다음 hop을 고릅니다. 인터넷이나
                다른 subnet으로 넘어갈 때는 이 과정이 hop마다 반복됩니다.
              </p>
              <p>
                서비스 앞단에 load balancer가 있으면 L4 또는 L7 판단이 추가됩니다.
                L4 load balancer는 connection flow를 보고 backend를 선택하고, L7 reverse
                proxy는 HTTP host/path/header를 보고 upstream을 고릅니다. 네트워크는 한
                장비가 모든 것을 처리하는 구조가 아니라, 계층별 판단이 이어지는 구조입니다.
              </p>
            </div>
            <CodeBlock
              code={`# 같은 장애라도 계층별로 질문이 다르다.

L2 switch:
  - 같은 VLAN인가?
  - ARP가 되는가?
  - MAC table에 destination MAC이 학습됐는가?

L3 router / L3 switch:
  - source와 destination이 같은 subnet인가?
  - default gateway가 맞는가?
  - route table에서 어떤 prefix가 match되는가?

L4 load balancer:
  - listener port가 열려 있는가?
  - target health가 정상인가?
  - connection이 같은 backend로 유지되는가?

L7 reverse proxy:
  - Host header와 path rule이 맞는가?
  - TLS termination과 upstream 설정이 맞는가?
  - application route가 의도한 service로 향하는가?`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              자주 하는 오해
            </h2>
            <div className="mt-6">
              <NoteRow
                title="Switch는 무조건 L2 장비라고 생각함"
                body="기본적인 switch는 L2 장비가 맞지만, L3 switch는 routing 기능을 수행합니다. L4/L7 switch라는 표현도 load balancer나 proxy 계층에서 쓰입니다."
              />
              <NoteRow
                title="Router만 VLAN 사이 통신을 처리한다고 생각함"
                body="VLAN 사이 통신은 L3 gateway가 필요합니다. 그 gateway는 전통적인 router일 수도 있고 L3 switch의 SVI일 수도 있고 firewall interface일 수도 있습니다."
              />
              <NoteRow
                title="Load balancer를 router처럼 해석함"
                body="L4/L7 load balancer는 traffic direction을 결정하지만 IP router의 longest prefix match와 같은 방식으로 동작하지 않습니다. flow, health, HTTP rule을 함께 봐야 합니다."
              />
              <NoteRow
                title="ping이 되면 L7도 된다고 판단함"
                body="ICMP reachability와 HTTP route는 다른 계층입니다. ping이 정상이어도 Host header, TLS, path rule, upstream 설정이 틀리면 웹 요청은 실패합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L2 switch는 MAC address와 VLAN을 보고 Ethernet frame을 전달합니다. L3
                router와 L3 switch는 destination IP와 route table을 보고 next hop을
                고릅니다. L4 switch/load balancer는 TCP/UDP flow를 보고 backend를
                선택하고, L7 reverse proxy/API gateway는 HTTP request 내용을 보고
                upstream을 선택합니다.
              </p>
              <p>
                따라서 네트워크 장비를 이해할 때는 이름보다 header와 table을 먼저 봐야
                합니다. 이 장비가 MAC table을 보는지, route table을 보는지, connection
                table을 보는지, HTTP routing rule을 보는지 구분하면 장애 지점도 훨씬
                빠르게 좁혀집니다.
              </p>
              <p>
                실무에서 “라우터 문제”, “스위치 문제”, “LB 문제”라고 말할 때도 먼저
                계층을 붙여 말하는 습관이 좋습니다. L2 switching 문제인지, L3 routing
                문제인지, L4 flow 분배 문제인지, L7 request routing 문제인지가 정리되어야
                다음 확인 명령과 담당 장비가 정해집니다.
              </p>
            </div>
          </section>

          <footer className="pt-[88px]">
            <h2 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
              참고 자료
            </h2>
            <ul className="mt-4 grid gap-2 text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
              {references.map((reference) => (
                <li key={reference.href}>
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-black underline-offset-4 hover:underline"
                  >
                    {reference.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        </article>
      </main>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-6 overflow-x-auto rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-4 text-sm leading-relaxed text-black">
      <code>{code}</code>
    </pre>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
      {children}
    </code>
  );
}

function LayerRow({ title, body }: { title: string; body: string }) {
  return (
    <section className="border-t border-[#e5e5e5] py-5 first:border-t-0">
      <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
        {title}
      </h3>
      <p className="mt-2 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
        {body}
      </p>
    </section>
  );
}

function NoteRow({ title, body }: { title: string; body: string }) {
  return (
    <section className="py-5">
      <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
        {title}
      </h3>
      <p className="mt-2 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
        {body}
      </p>
    </section>
  );
}
