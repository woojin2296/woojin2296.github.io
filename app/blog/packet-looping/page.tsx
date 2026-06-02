import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "패킷 루핑은 같은 트래픽이 네트워크 안에서 계속 도는 현상이다 | Blog",
  description:
    "패킷 루핑을 L2 switching loop와 L3 routing loop로 나누고 broadcast storm, MAC flapping, STP/RSTP, TTL, Hop Limit, ICMP Time Exceeded, traceroute 기반 장애 분석 흐름을 정리한 글",
};

const references = [
  {
    label: "RFC 791 - Internet Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc791",
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
    label: "RFC 792 - Internet Control Message Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc792",
  },
  {
    label: "RFC 4443 - ICMPv6 for IPv6",
    href: "https://www.rfc-editor.org/rfc/rfc4443",
  },
  {
    label: "IEEE 802.1D - MAC Bridges",
    href: "https://www.ieee802.org/1/pages/802.1D-2003.html",
  },
  {
    label: "IEEE 802.1w - Rapid Spanning Tree",
    href: "https://www.ieee802.org/1/pages/802.1w.html",
  },
  {
    label: "Cisco - Troubleshooting Spanning Tree Protocol",
    href: "https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/28943-170.html",
  },
];

export default function PacketLoopingBlogPostPage() {
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
              Network / Troubleshooting · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              패킷 루핑은 같은 트래픽이 네트워크 안에서 계속 도는 현상이다
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              네트워크에서 루프가 생기면 같은 프레임이나 패킷이 의도한 목적지로
              사라지지 않고 장비 사이를 반복해서 돕니다. 이때 중요한 구분은 L2
              switching loop와 L3 routing loop입니다. 둘 다 트래픽이 반복된다는
              점은 같지만, 증상과 방어 장치가 완전히 다릅니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              먼저 L2 루프와 L3 루프를 나눠야 한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                패킷 루핑이라는 말은 넓게 쓰입니다. 엄밀히 말하면 L2에서는 Ethernet
                frame이 루프를 돌고, L3에서는 IP packet이 루프를 돕니다. 운영 대화에서는
                둘 다 패킷 루핑이라고 부르는 경우가 많지만, 장애 분석에서는 반드시
                계층을 나눠야 합니다.
              </p>
              <p>
                L2 switching loop는 같은 broadcast domain 안에서 중복 경로가 생겼을 때
                발생합니다. Ethernet frame에는 TTL 같은 수명 제한 값이 없습니다. 그래서
                broadcast, multicast, unknown unicast frame이 switch 사이를 계속 복제하며
                돌 수 있습니다.
              </p>
              <p>
                L3 routing loop는 router의 route table이 서로 맞지 않아 같은 IP packet이
                router 사이를 반복해서 forwarding되는 상황입니다. 이 경우에는 IPv4의{" "}
                <InlineCode>TTL</InlineCode>, IPv6의{" "}
                <InlineCode>Hop Limit</InlineCode>이 hop마다 감소하고, 0이 되면 packet이
                폐기됩니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/packet-looping-troubleshooting-path.png"
              alt="패킷 루핑 장애를 L2 signal과 L3 signal로 나누어 switch side와 router side를 점검하는 흐름"
              width={1440}
              height={900}
              caption="루핑 장애의 첫 분기점은 계층입니다. L2 루프는 storm과 MAC flapping으로 보이고, L3 루프는 반복 hop, TTL 만료, route table 불일치로 보입니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L2 switching loop는 TTL로 막히지 않는다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                가장 위험한 루프는 L2에서 자주 발생합니다. 예를 들어 switch A, B, C가
                삼각형으로 연결되어 있고 loop prevention이 제대로 동작하지 않는다고
                해보겠습니다. 어떤 host가 ARP request를 broadcast하면 switch는 그 frame을
                여러 port로 flood합니다.
              </p>
              <p>
                문제는 같은 frame의 복사본이 다시 다른 port로 들어온다는 점입니다. switch는
                source MAC address를 보고 MAC table을 갱신하는데, 같은 MAC이 여러 port에서
                반복해서 보이면 MAC table이 계속 흔들립니다. 이를 MAC flapping 또는
                constant relearning이라고 부릅니다.
              </p>
              <p>
                이더넷 프레임에는 IP packet의 TTL 같은 필드가 없습니다. 따라서 “어차피
                TTL이 줄어들다가 사라지지 않나?”라는 생각은 L2 루프에는 적용되지 않습니다.
                L2 loop가 방치되면 broadcast storm이 발생하고, switch CPU와 uplink 대역폭이
                급격히 소모됩니다. 심하면 같은 VLAN 안의 정상 통신까지 같이 무너집니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/packet-looping-l2-switching-loop.png"
              alt="중복 Ethernet 경로에서 broadcast frame이 switch A, B, C 사이를 계속 복제하며 도는 L2 switching loop 다이어그램"
              width={1440}
              height={900}
              caption="L2 루프에서는 broadcast와 unknown frame이 계속 복제될 수 있습니다. TTL은 IP 계층의 개념이므로 Ethernet frame 루프를 자연스럽게 멈추지 못합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              STP와 RSTP는 중복 경로를 없애는 것이 아니라 막아둔다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Ethernet망에서 중복 링크를 완전히 금지하면 장애 대응이 어려워집니다. 그래서
                물리적으로는 중복 경로를 두되, 논리적으로는 loop-free topology가 되도록
                일부 port를 blocking 상태로 두는 방식이 필요합니다. 대표적인 기술이 STP와
                RSTP입니다.
              </p>
              <p>
                STP는 bridge끼리 BPDU를 주고받아 root bridge를 정하고, loop를 만들 수 있는
                일부 port를 forwarding하지 않도록 막습니다. RSTP는 같은 목적을 더 빠른
                수렴 시간으로 달성하기 위한 개선입니다. 핵심은 “중복 경로를 사용할 수
                있지만 동시에 모두 forwarding하지 않는다”입니다.
              </p>
              <p>
                단, STP가 켜져 있다고 모든 L2 loop가 사라지는 것은 아닙니다. BPDU filter,
                잘못된 portfast 설정, 비관리형 switch, VLAN별 STP instance 불일치, NIC
                teaming 설정 오류가 있으면 여전히 loop가 생길 수 있습니다. 그래서 운영에서는
                STP만 믿는 것이 아니라 BPDU guard, loop guard, root guard, storm-control 같은
                안전장치를 함께 봅니다.
              </p>
            </div>
            <CodeBlock
              code={`# 장비별 명령은 다르지만 확인 방향은 비슷하다.
show spanning-tree vlan <vlan-id>
show spanning-tree detail
show interfaces counters errors
show mac address-table dynamic
show logging | include MAC|FLAP|STP|TOPOLOGY`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L3 routing loop는 TTL과 Hop Limit이 피해를 제한한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L3 routing loop는 라우터들이 같은 destination prefix에 대해 서로를 다음
                hop으로 가리키는 상황에서 발생합니다. 예를 들어 Router A는{" "}
                <InlineCode>10.20.0.0/16</InlineCode>을 Router B로 보내고, Router B는
                Router C로 보내고, Router C는 다시 Router A로 보내는 식입니다.
              </p>
              <p>
                이 경우 IP packet은 router를 지날 때마다 수명 값이 줄어듭니다. IPv4에서는
                TTL이, IPv6에서는 Hop Limit이 그 역할을 합니다. 값이 0이 되면 router는
                packet을 폐기하고, 상황에 따라 송신자에게 ICMP Time Exceeded 메시지를
                돌려보냅니다.
              </p>
              <p>
                그래서 L3 loop는 L2 loop와 다르게 무한히 같은 packet이 살아남지는 않습니다.
                하지만 안전하다는 뜻은 아닙니다. TTL이 64인 packet이 여러 router를 돌며
                사라지는 동안에도 link bandwidth와 router CPU를 사용합니다. routing loop가
                대량 트래픽에 걸리면 장애 영향은 충분히 큽니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/packet-looping-l3-routing-loop.png"
              alt="Router A, B, C의 잘못된 route table 때문에 IP packet이 반복 forwarding되고 TTL이 0이 되어 ICMP Time Exceeded가 발생하는 다이어그램"
              width={1440}
              height={900}
              caption="L3 routing loop에서는 router를 지날 때마다 TTL 또는 Hop Limit이 감소합니다. 0이 되면 packet은 폐기되고 ICMP Time Exceeded가 루프의 단서가 될 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              traceroute는 TTL 만료를 이용해 경로를 본다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                traceroute는 루프 분석에서 자주 쓰는 도구입니다. 원리는 단순합니다. TTL
                또는 Hop Limit을 1부터 시작해 조금씩 늘리면서 packet을 보내고, 중간
                router가 TTL 만료로 보내는 ICMP Time Exceeded 응답을 수집해 hop을
                추정합니다.
              </p>
              <p>
                routing loop가 있으면 traceroute 결과에서 같은 router IP가 반복되거나,
                특정 구간에서 hop이 왕복하는 것처럼 보일 수 있습니다. 다만{" "}
                <InlineCode>* * *</InlineCode>가 보인다고 항상 루프는 아닙니다. ICMP
                rate limit, firewall, ACL, router policy 때문에 응답하지 않는 장비도
                많습니다.
              </p>
              <p>
                따라서 traceroute는 단독 판정 도구가 아니라 방향을 좁히는 도구입니다.
                반복 hop이 보이면 해당 구간의 route table, next hop, 동적 라우팅 인접
                상태, 최근 배포된 static route나 route redistribution 변경을 함께 봐야
                합니다.
              </p>
            </div>
            <CodeBlock
              code={`$ traceroute 10.20.1.25
 1  10.0.0.1
 2  10.0.1.1
 3  10.0.2.1
 4  10.0.1.1
 5  10.0.2.1
 6  10.0.1.1

# 같은 hop 쌍이 반복되면 L3 routing loop 가능성을 의심한다.`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영에서 보이는 신호
            </h2>
            <div className="mt-6">
              <NoteRow
                title="L2 루프 신호"
                body="여러 switch port에서 broadcast 또는 multicast PPS가 동시에 급증합니다. MAC flapping, STP topology change, address relearning 로그가 반복되고, switch CPU가 급등하거나 관리 접속이 느려질 수 있습니다."
              />
              <NoteRow
                title="L3 루프 신호"
                body="traceroute에서 같은 hop이 반복되거나 ICMP Time Exceeded가 많이 보입니다. 특정 prefix에 대한 route table의 next hop이 서로 맞물려 있거나, 동적 라우팅 수렴 중 stale route가 남아 있을 수 있습니다."
              />
              <NoteRow
                title="애플리케이션 관점"
                body="사용자는 단순히 timeout, latency spike, 간헐적 연결 실패로 봅니다. 루프가 하위 계층에서 발생하면 애플리케이션 로그에는 원인이 직접 남지 않고, 네트워크 장비 counter와 경로 추적에서 단서가 더 많이 나옵니다."
              />
              <NoteRow
                title="위험한 오해"
                body="TTL이 있으니 루프가 큰 문제가 아니라는 말은 절반만 맞습니다. TTL은 IP packet에만 적용됩니다. L2 switching loop의 Ethernet frame에는 TTL이 없고, broadcast storm은 매우 빠르게 전체 VLAN을 마비시킬 수 있습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 대응 순서
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                루핑 장애는 먼저 영향 범위를 좁혀야 합니다. 특정 VLAN 전체가 느려지고
                broadcast counter가 폭증한다면 L2를 먼저 봅니다. 특정 목적지 prefix만
                이상하고 traceroute에서 hop 반복이 보이면 L3를 먼저 봅니다.
              </p>
              <p>
                L2가 의심되면 MAC flapping 로그에 나온 MAC address를 기준으로 어떤 port에서
                반복 학습되는지 추적합니다. loop를 지탱하는 uplink나 access port를 찾으면
                긴급하게 하나의 경로를 차단해 storm을 멈추고, 이후 STP/BPDU guard/배선/비관리형
                switch 연결을 확인합니다.
              </p>
              <p>
                L3가 의심되면 목적지 prefix를 기준으로 각 router의 route table과 FIB를 봅니다.
                static route, route redistribution, VRF, policy based routing, tunnel route,
                cloud route table이 최근에 바뀌었는지도 확인해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`# L2 쪽 단서
show logging | include FLAP|MAC|STP
show mac address-table address <mac-address>
show interfaces <interface> counters
show spanning-tree vlan <vlan-id>

# L3 쪽 단서
traceroute <destination-ip>
show ip route <destination-ip>
show ip cef <destination-ip>
show ip protocols
show logging | include OSPF|BGP|ROUTE`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              예방 체크리스트
            </h2>
            <div className="mt-6">
              <NoteRow
                title="L2 redundancy는 STP/RSTP 또는 LAG로 설계한다"
                body="중복 물리 링크를 그냥 꽂아두지 않습니다. 여러 링크를 동시에 forwarding해야 한다면 LACP 같은 link aggregation으로 하나의 논리 링크로 만들고, 그렇지 않으면 STP/RSTP가 하나의 경로를 막도록 둡니다."
              />
              <NoteRow
                title="Access port에는 guardrail을 둔다"
                body="사용자 또는 서버 access port에서 BPDU가 들어오면 topology가 흔들릴 수 있습니다. 환경에 따라 portfast, BPDU guard, loop guard, storm-control을 정책으로 관리합니다."
              />
              <NoteRow
                title="Route 변경은 prefix 단위로 검증한다"
                body="static route, BGP/OSPF redistribution, cloud route table 변경은 특정 prefix에 대해 어느 next hop으로 가는지 사전 검증해야 합니다. rollback route도 미리 준비하는 편이 안전합니다."
              />
              <NoteRow
                title="Loop 증상 metric을 모니터링한다"
                body="broadcast PPS, multicast PPS, interface utilization, output drops, MAC flapping count, STP topology change count, ICMP Time Exceeded 증가는 루프를 빠르게 의심할 수 있는 지표입니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                패킷 루핑은 같은 트래픽이 네트워크 안에서 반복 전달되는 현상입니다. 하지만
                L2 switching loop와 L3 routing loop는 다르게 봐야 합니다. L2에서는 Ethernet
                frame이 돌고, L3에서는 IP packet이 돕니다.
              </p>
              <p>
                L2 루프는 TTL로 막히지 않습니다. broadcast storm, MAC flapping, STP topology
                change가 핵심 단서입니다. L3 루프는 TTL 또는 Hop Limit 때문에 결국 packet이
                폐기되지만, 그 과정에서 link와 router 리소스를 소비하고 ICMP Time Exceeded와
                traceroute 반복 hop이 단서가 됩니다.
              </p>
              <p>
                루핑 장애를 빨리 좁히려면 “어떤 계층에서 무엇이 반복되고 있는가”를 먼저
                물어야 합니다. 그 답이 L2라면 switch와 STP를, L3라면 route table과 next hop을
                보게 됩니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
