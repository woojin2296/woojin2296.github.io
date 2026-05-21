import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "네트워크 계층별 라우터와 라우팅 개념 이해하기 | Blog",
  description:
    "L2 switching, L3 IP routing, L4/L7 traffic routing을 계층별로 분리하고 router, forwarding, route table, next hop 개념을 운영 관점에서 정리한 글",
};

const references = [
  {
    label: "RFC 1122 - Requirements for Internet Hosts",
    href: "https://www.rfc-editor.org/rfc/rfc1122",
  },
  {
    label: "RFC 1812 - Requirements for IP Version 4 Routers",
    href: "https://www.rfc-editor.org/rfc/rfc1812",
  },
  {
    label: "RFC 8200 - IPv6 Specification",
    href: "https://www.rfc-editor.org/rfc/rfc8200",
  },
  {
    label: "RFC 2328 - OSPF Version 2",
    href: "https://www.rfc-editor.org/rfc/rfc2328",
  },
  {
    label: "RFC 4271 - BGP-4",
    href: "https://www.rfc-editor.org/rfc/rfc4271",
  },
];

export default function NetworkRoutingLayersBlogPostPage() {
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
              Network / Routing · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              네트워크 계층별 라우터와 라우팅 개념 이해하기
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              라우팅이라는 말은 운영 환경에서 여러 계층에 걸쳐 사용됩니다. L3
              router가 destination IP를 보고 next hop을 고르는 일과, L4 load
              balancer가 backend를 고르는 일, L7 reverse proxy가 path를 보고
              upstream을 고르는 일은 모두 트래픽 방향을 결정하지만 같은 계층의
              동작은 아닙니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              먼저 라우팅이라는 말을 계층별로 분리하기
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                네트워크 장애를 볼 때 “라우팅 문제”라고 말하면 범위가 너무 넓습니다.
                같은 표현 안에 MAC address 기반 switching, IP prefix 기반 routing,
                port 기반 load balancing, HTTP host/path 기반 request routing이 모두
                섞일 수 있기 때문입니다.
              </p>
              <p>
                실무에서 먼저 분리해야 할 기준은 “어떤 header를 보고 결정을 내리는가”
                입니다. L2 장비는 Ethernet frame의 MAC address와 VLAN을 봅니다. L3
                router는 IP packet의 destination IP를 보고 route table에서 next hop을
                선택합니다. L4 load balancer나 firewall은 protocol과 port, connection
                tuple을 기준으로 처리합니다. L7 reverse proxy나 API gateway는 HTTP
                host, path, header 같은 application 정보를 기준으로 upstream을 고릅니다.
              </p>
              <p>
                따라서 계층을 나누면 장애 분석도 좁아집니다. 같은 “연결 불가”라도
                ARP가 안 되는 문제인지, default gateway가 틀린 문제인지, route table에
                prefix가 없는 문제인지, load balancer target health가 빠진 문제인지,
                reverse proxy rule이 잘못된 문제인지가 달라집니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-routing-layer-map.png"
              alt="L1부터 L7까지 계층별 routing과 switching의 판단 기준을 정리한 다이어그램"
              width={1440}
              height={900}
              caption="라우팅이라는 표현은 여러 계층에서 쓰이지만, L3 IP routing은 destination IP prefix, next hop, output interface를 기준으로 동작합니다. L4/L7의 traffic routing은 IP router의 forwarding과 구분해서 봐야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L2: 스위치는 라우팅보다 switching에 가깝다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L2 switch는 IP network 사이를 연결하는 장비라기보다, 같은 broadcast
                domain 안에서 Ethernet frame을 어느 port로 내보낼지 결정하는 장비입니다.
                판단 기준은 destination MAC address입니다. switch는 들어온 frame의
                source MAC을 보고 MAC table을 학습하고, destination MAC에 해당하는
                port로 frame을 전달합니다.
              </p>
              <p>
                같은 subnet 안의 host끼리는 router를 거치지 않고 L2 switching으로
                통신합니다. 이때 IP 주소는 최종 목적지를 식별하지만, 실제 Ethernet
                frame이 전달될 때는 ARP 또는 IPv6 Neighbor Discovery로 찾은 MAC
                address가 필요합니다. destination MAC을 모르면 broadcast 또는 multicast
                기반 주소 해석이 먼저 일어납니다.
              </p>
              <p>
                VLAN은 L2 broadcast domain을 나누는 대표적인 방식입니다. 같은 물리
                switch 위에 있어도 VLAN이 다르면 L2로 바로 통신하지 못하고, L3 gateway
                또는 router를 거쳐야 합니다. 그래서 “같은 switch에 꽂혀 있는데 왜 통신이
                안 되지?”라는 문제는 VLAN, subnet, gateway를 함께 봐야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L3: router는 destination IP로 next hop을 고른다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                router의 기본 역할은 서로 다른 IP network 사이에서 packet을 전달하는
                것입니다. RFC 1812는 router가 둘 이상의 logical interface를 연결하고,
                IP datagram을 forwarding할 때 next-hop router 또는 최종 destination
                host의 address와 output interface를 선택한다고 설명합니다.
              </p>
              <p>
                이 결정은 route table 또는 forwarding table을 보고 이루어집니다.
                destination IP가 <InlineCode>10.20.1.25</InlineCode>일 때{" "}
                <InlineCode>10.20.1.0/24</InlineCode>,{" "}
                <InlineCode>10.20.0.0/16</InlineCode>,{" "}
                <InlineCode>0.0.0.0/0</InlineCode>이 모두 후보라면 가장 구체적인
                prefix인 <InlineCode>10.20.1.0/24</InlineCode>가 먼저 선택됩니다.
                이것을 longest prefix match라고 부릅니다.
              </p>
              <p>
                router는 packet을 다음 hop으로 넘길 때 L3 destination IP를 매번
                바꾸지는 않습니다. 일반적인 forwarding에서는 source IP와 destination
                IP는 end-to-end로 유지되고, 각 hop에서 새 L2 frame을 만들어 다음
                장비의 MAC address로 보냅니다. 단, NAT처럼 주소 변환 기능이 개입하면
                IP나 port가 바뀔 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-routing-forwarding-path.png"
              alt="Host A에서 Host B까지 router를 거칠 때 IP packet과 L2 frame이 어떻게 달라지는지 보여주는 forwarding 다이어그램"
              width={1440}
              height={900}
              caption="Router를 지날 때 L3 목적지 주소는 최종 host를 가리킨 채 유지되지만, 각 link에서 사용하는 L2 source/destination MAC은 hop마다 새로 만들어집니다. TTL 또는 IPv6 Hop Limit은 forwarding node를 지날 때 감소합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              routing과 forwarding은 같은 말이 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                운영 문서에서 routing과 forwarding을 구분하면 설명이 명확해집니다.
                routing은 어떤 경로가 좋은지 계산하고 route table을 만드는 control
                plane의 일입니다. forwarding은 들어온 packet 하나하나에 대해 이미
                만들어진 forwarding table을 조회하고 output interface로 내보내는 data
                plane의 일입니다.
              </p>
              <p>
                static route는 운영자가 직접 경로를 넣는 방식입니다. 단순하고 예측하기
                쉽지만 link 장애나 topology 변화에 자동으로 적응하지 않습니다. dynamic
                routing protocol은 router끼리 reachability 정보를 교환해 route table을
                자동으로 갱신합니다. 내부망에서는 OSPF, IS-IS 같은 IGP가 쓰이고,
                autonomous system 사이에서는 BGP가 대표적입니다.
              </p>
              <p>
                route table을 만들 때는 protocol별 metric, administrative distance,
                policy, prefix length 등이 영향을 줍니다. 하지만 packet을 실제로
                forwarding하는 순간에는 “이 destination IP에 대해 어떤 next hop과
                interface를 쓸 것인가”가 핵심입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-routing-decision-table.png"
              alt="Control plane에서 route table을 만들고 data plane에서 longest prefix match로 forwarding하는 과정을 보여주는 다이어그램"
              width={1440}
              height={900}
              caption="Routing protocol이나 static configuration은 route table을 만들고, forwarding path는 destination IP에 대해 가장 구체적인 prefix를 찾아 next hop과 output interface를 선택합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L4: load balancer와 NAT는 flow를 기준으로 본다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L4 load balancer는 일반적인 IP router처럼 단순히 destination prefix만
                보고 다음 hop을 고르는 장비가 아닙니다. TCP/UDP protocol, source IP,
                source port, destination IP, destination port로 이루어진 connection
                tuple을 보고 backend target을 선택하고, connection tracking 상태를
                유지합니다.
              </p>
              <p>
                NAT도 L4와 강하게 연결됩니다. SNAT는 source address 또는 source port를
                바꿔 외부에서 하나의 공인 IP처럼 보이게 하고, DNAT는 destination
                address 또는 port를 바꿔 내부 backend로 전달합니다. 이때 운영자가 보는
                packet의 source/destination은 관찰 위치에 따라 달라질 수 있습니다.
              </p>
              <p>
                그래서 L4 장비 앞뒤에서 tcpdump를 뜨면 같은 요청도 서로 다른 5-tuple로
                보일 수 있습니다. “라우팅은 맞는데 backend가 못 받는다”는 상황에서는
                route table뿐 아니라 target health, security group, NAT table, conntrack
                table, source IP preservation 여부를 같이 봐야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L7: reverse proxy의 라우팅은 HTTP request routing이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L7 reverse proxy나 API gateway가 말하는 routing은 IP packet forwarding이
                아니라 application request routing입니다. Nginx, Envoy, Ingress
                controller, API Gateway는 HTTP host, path, method, header, cookie 같은
                정보를 읽고 어떤 upstream service로 요청을 보낼지 결정합니다.
              </p>
              <p>
                예를 들어 <InlineCode>api.example.com/users</InlineCode>는 user-service로,
                <InlineCode>api.example.com/orders</InlineCode>는 order-service로 보낼 수
                있습니다. 이 결정은 TCP connection이 성립되고 TLS termination까지
                끝난 뒤에야 가능할 수 있습니다. 특히 HTTPS 환경에서는 TLS를 어디서
                종료하는지가 L7 routing 가능 여부를 결정합니다.
              </p>
              <p>
                따라서 L7 routing 문제는 <InlineCode>ip route</InlineCode>만 봐서는
                해결되지 않습니다. DNS가 올바른 endpoint를 가리키는지, load balancer가
                올바른 listener rule을 가지고 있는지, proxy의 host/path rule이 맞는지,
                upstream service name과 port가 실제 backend와 일치하는지까지 이어서
                확인해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`# L3에서 보는 질문
ip route get 10.20.1.25
traceroute 10.20.1.25

# L4에서 보는 질문
ss -tn state established '( sport = :443 or dport = :443 )'
conntrack -L | grep 10.20.1.25

# L7에서 보는 질문
curl -H 'Host: api.example.com' https://lb.example.com/users
nginx -T | grep -A20 'server_name api.example.com'`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 분석은 hop과 계층을 나눠서 본다
            </h2>
            <div className="mt-6">
              <NoteRow
                title="같은 subnet인지 먼저 확인한다"
                body="source와 destination이 같은 subnet이면 기본적으로 L2 switching과 ARP/ND가 핵심입니다. 다른 subnet이면 default gateway 또는 router가 반드시 개입합니다."
              />
              <NoteRow
                title="route table은 destination 기준으로 읽는다"
                body="source IP가 아니라 destination IP에 대해 어떤 prefix가 match되는지 봅니다. 가장 구체적인 route, next hop, output interface, default route 순서로 확인합니다."
              />
              <NoteRow
                title="hop마다 L2 frame은 바뀐다고 가정한다"
                body="router를 지날 때 IP packet의 최종 목적지는 유지되지만 Ethernet source/destination MAC은 다음 link에 맞게 바뀝니다. 이 차이를 모르면 tcpdump 위치에 따라 결과가 다르게 보이는 이유를 놓치기 쉽습니다."
              />
              <NoteRow
                title="NAT과 load balancer는 관찰 위치를 명시한다"
                body="SNAT/DNAT 또는 L4 load balancing이 들어가면 packet의 source, destination, port가 위치별로 달라질 수 있습니다. 로그와 packet capture를 비교할 때 앞단/뒷단 위치를 분리해야 합니다."
              />
              <NoteRow
                title="L7 문제를 L3 명령으로만 해결하려고 하지 않는다"
                body="ping과 traceroute가 정상이어도 Host header, path rule, TLS termination, upstream 설정이 틀리면 HTTP 요청은 실패할 수 있습니다. 계층별 성공을 따로 확인해야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                라우터는 주로 L3에서 IP network 사이를 연결하고, destination IP를 기준으로
                next hop과 output interface를 선택하는 장비 또는 기능입니다. route table을
                만드는 일은 routing, packet을 실제로 내보내는 일은 forwarding으로 구분할 수
                있습니다.
              </p>
              <p>
                다만 운영 환경에서는 L2 switching, L4 load balancing/NAT, L7 reverse proxy
                routing까지 모두 “트래픽을 어디로 보낼지 결정하는 일”로 묶여 표현됩니다.
                그래서 문제를 해결할 때는 먼저 계층을 정하고, 그 계층의 header와 상태
                정보를 기준으로 확인해야 합니다.
              </p>
              <p>
                좋은 네트워크 분석은 한 번에 모든 것을 보려 하지 않습니다. 같은 subnet인지,
                route table에서 어떤 prefix가 match되는지, hop마다 L2 address가 어떻게
                바뀌는지, NAT이나 load balancer가 flow를 어떻게 바꾸는지, 마지막으로 L7
                rule이 요청을 올바른 service로 보내는지를 순서대로 좁혀가는 과정입니다.
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
