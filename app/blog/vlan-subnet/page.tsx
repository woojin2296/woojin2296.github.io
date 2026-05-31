import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "VLAN과 Subnet은 네트워크를 나누는 계층이 다르다 | Blog",
  description:
    "VLAN은 L2 broadcast domain을 나누고 Subnet은 L3 IP 주소 범위를 나눈다는 차이를 access/trunk, CIDR, gateway, inter-VLAN routing 관점에서 정리한 글",
};

const references = [
  {
    label: "IEEE 802.1Q - Virtual LANs",
    href: "https://www.ieee802.org/1/pages/802.1Q.html",
  },
  {
    label: "IEEE SA - IEEE 802.1Q-2022",
    href: "https://standards.ieee.org/ieee/802.1Q/10323/",
  },
  {
    label: "RFC 950 - Internet Standard Subnetting Procedure",
    href: "https://www.rfc-editor.org/rfc/rfc950",
  },
  {
    label: "RFC 4632 - Classless Inter-domain Routing",
    href: "https://www.rfc-editor.org/rfc/rfc4632",
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
    label: "AWS Direct Connect - Virtual interfaces",
    href: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html",
  },
  {
    label: "Azure ExpressRoute - Configure peering",
    href: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-howto-routing-arm",
  },
  {
    label: "Google Cloud Interconnect - VLAN attachments",
    href: "https://docs.cloud.google.com/network-connectivity/docs/interconnect/how-to/dedicated/creating-vlan-attachments",
  },
];

export default function VlanSubnetBlogPostPage() {
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
              Network / LAN · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              VLAN과 Subnet은 네트워크를 나누는 계층이 다르다
            </h1>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              왜 VLAN과 Subnet을 같이 헷갈릴까?
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                VLAN과 subnet은 둘 다 네트워크를 나누는 데 사용됩니다. 그래서 실무에서는{" "}
                <InlineCode>VLAN 10 = 192.168.10.0/24</InlineCode>,{" "}
                <InlineCode>VLAN 20 = 192.168.20.0/24</InlineCode>처럼 함께 설계되는
                경우가 많습니다. 이 때문에 두 개념이 같은 것처럼 보입니다.
              </p>
              <p>
                하지만 기준이 다릅니다. <strong className="font-medium text-black">VLAN</strong>
                은 L2에서 broadcast domain을 나눕니다. 같은 switch에 연결되어 있어도
                VLAN이 다르면 Ethernet frame이 바로 넘어가지 않습니다.{" "}
                <strong className="font-medium text-black">Subnet</strong>은 L3에서 IP
                address range를 나눕니다. host는 subnet mask 또는 prefix를 보고 목적지가
                같은 IP network인지 판단합니다.
              </p>
              <p>
                정리하면 VLAN은 “같은 L2 공간인가”의 문제이고, subnet은 “같은 IP 주소
                범위인가”의 문제입니다. 통신 장애를 볼 때 이 둘을 구분하지 않으면 switch
                설정 문제를 IP route 문제로 보거나, 반대로 gateway 문제를 VLAN 문제로
                오해하기 쉽습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/vlan-subnet-layer-separation.png"
              alt="VLAN은 L2 broadcast domain을 나누고 subnet은 L3 IP address range를 나누는 차이를 보여주는 다이어그램"
              width={1440}
              height={900}
              caption="VLAN과 subnet은 보통 함께 설계되지만 같은 개념은 아닙니다. VLAN은 L2 경계를 만들고, subnet은 L3 주소 범위를 만듭니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              어느 영역의 개념인가?
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                결론부터 말하면 VLAN과 subnet은 모두{" "}
                <strong className="font-medium text-black">인프라 중에서도 네트워크 인프라</strong>
                에서 쓰이는 개념입니다. 서버 코드나 데이터베이스 내부 구조의 개념이 아니라,
                서버와 PC와 네트워크 장비가 서로 통신할 수 있도록 망을 나누고 연결하는
                설계 단위입니다.
              </p>
              <p>
                더 좁히면 VLAN은 네트워크 인프라 안에서도{" "}
                <strong className="font-medium text-black">L2 LAN 분리</strong>에
                가깝습니다. switch, access point, hypervisor virtual switch, firewall
                trunk port에서 “이 Ethernet frame을 어느 논리적 LAN에 넣을 것인가”를
                결정할 때 등장합니다. 사내망과 게스트망을 같은 물리 switch 위에서 분리하는
                작업이 VLAN의 대표적인 사용처입니다.
              </p>
              <p>
                Subnet은 네트워크 인프라 안에서도{" "}
                <strong className="font-medium text-black">L3 IP 주소 설계와 routing</strong>
                에 가깝습니다. OS, router, firewall, DHCP 서버, cloud VPC에서 “이 IP가
                어느 주소 범위에 속하는가”, “같은 subnet인가”, “gateway로 보내야 하는가”를
                판단할 때 등장합니다. AWS 같은 cloud의 public subnet, private subnet도
                이 L3 주소 범위와 routing 정책을 다루는 개념입니다.
              </p>
              <p>
                클라우드에서는 VLAN을 일반 사용자가 직접 다루는 경우가 많지 않습니다.
                AWS VPC, Azure VNet, Google Cloud VPC 같은 퍼블릭 클라우드 네트워크에서는
                사용자가 보통 <InlineCode>VLAN ID</InlineCode>를 설정하지 않고, VPC/VNet,
                subnet, route table, security group, firewall rule 같은 L3와 정책 기반
                추상화로 네트워크를 설계합니다. 물리 switch와 VLAN에 가까운 내부 구현은
                클라우드 사업자가 SDN과 overlay network로 감춥니다.
              </p>
              <p>
                다만 온프레미스와 클라우드를 전용 회선으로 연결하는 영역에서는 VLAN이
                다시 등장합니다. AWS Direct Connect의 virtual interface, Azure
                ExpressRoute peering, Google Cloud Interconnect의 VLAN attachment처럼
                전용 회선 위에서 트래픽을 구분하고 BGP peering을 구성할 때 VLAN ID나
                VLAN attachment를 설정합니다. 즉 클라우드 안의 일반 VPC 설계는 subnet
                중심이고, 온프레미스와 클라우드 경계의 전용 연결에서는 VLAN이 보일 수
                있습니다.
              </p>
              <p>
                데이터 전송 과정에서도 둘은 실제로 사용됩니다. 애플리케이션이 데이터를
                보내면 OS는 destination IP를 보고 같은 subnet인지 먼저 판단합니다. 같은
                subnet이면 상대 host의 MAC을 찾아 직접 보내고, 다른 subnet이면 gateway의
                MAC으로 보냅니다. 그 frame이 switch를 지날 때는 access port나 802.1Q tag를
                기준으로 어떤 VLAN 안에서만 전달될지 결정됩니다.
              </p>
            </div>
            <div className="mt-6">
              <NoteRow
                title="큰 분류"
                body="둘 다 인프라 영역의 개념이고, 그중에서도 네트워크 인프라를 설계하고 운영할 때 사용됩니다."
              />
              <NoteRow
                title="VLAN의 위치"
                body="L2 데이터 링크 계층에서 LAN을 논리적으로 나누는 개념입니다. switch, trunk, access port, Wi-Fi SSID 분리, 가상 switch 설정에서 주로 등장합니다."
              />
              <NoteRow
                title="Subnet의 위치"
                body="L3 네트워크 계층에서 IP 주소 범위와 routing 판단을 나누는 개념입니다. IP 할당, route table, default gateway, DHCP scope, firewall rule, cloud VPC subnet에서 주로 등장합니다."
              />
              <NoteRow
                title="클라우드에서의 위치"
                body="일반 VPC/VNet 설계에서는 VLAN보다 subnet, route table, security group, firewall rule을 직접 다룹니다. VLAN은 Direct Connect, ExpressRoute, Cloud Interconnect 같은 전용 회선 연결에서 사용자 설정으로 다시 등장할 수 있습니다."
              />
              <NoteRow
                title="데이터 전송 과정에서의 역할"
                body="Subnet은 host가 packet을 직접 보낼지 gateway로 보낼지 판단하는 기준이고, VLAN은 switch가 frame을 어느 L2 영역 안에서 전달할지 판단하는 기준입니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              VLAN은 L2 broadcast domain을 나눈다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L2 switch는 Ethernet frame을 전달합니다. 기본적으로 같은 broadcast
                domain 안에서는 broadcast frame이 퍼질 수 있고, ARP 같은 L2/L3 경계의
                주소 해석도 같은 domain 안에서 일어납니다.
              </p>
              <p>
                VLAN은 이 broadcast domain을 논리적으로 나누는 방식입니다. 물리적으로는
                같은 switch를 쓰더라도 VLAN 10에 속한 port와 VLAN 20에 속한 port는 서로
                다른 L2 network처럼 동작합니다. VLAN 10의 broadcast가 VLAN 20으로
                자동으로 퍼지지 않습니다.
              </p>
              <p>
                host가 연결된 port는 보통 <InlineCode>access port</InlineCode>입니다.
                access port는 하나의 VLAN에 속하고, host는 대개 VLAN tag를 직접 보지
                않습니다. switch와 switch 사이 또는 switch와 router/firewall 사이에서
                여러 VLAN을 한 link에 실어야 할 때는 <InlineCode>trunk port</InlineCode>
                를 사용합니다. trunk 구간에서는 802.1Q tag로 frame이 어떤 VLAN에 속하는지
                구분합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/vlan-subnet-access-trunk.png"
              alt="Access port는 untagged frame을 하나의 VLAN에 넣고 trunk port는 802.1Q tag로 여러 VLAN을 전달하는 구조"
              width={1440}
              height={900}
              caption="Access port는 host가 붙는 단일 VLAN 포트이고, trunk port는 여러 VLAN을 switch 간 link에 싣는 포트입니다. VLAN ID는 trunk 구간에서 frame을 구분하는 표식으로 쓰입니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Subnet은 L3 IP 주소 범위를 나눈다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                subnet은 IP 주소를 network prefix와 host 영역으로 나눈 범위입니다.{" "}
                <InlineCode>192.168.10.0/24</InlineCode>에서 <InlineCode>/24</InlineCode>
                는 앞 24bit가 network prefix라는 뜻입니다. 나머지 8bit가 host 주소
                영역입니다.
              </p>
              <p>
                IPv4에서 <InlineCode>192.168.10.0/24</InlineCode>라면 network address는{" "}
                <InlineCode>192.168.10.0</InlineCode>, 일반적인 usable host 범위는{" "}
                <InlineCode>192.168.10.1</InlineCode>부터{" "}
                <InlineCode>192.168.10.254</InlineCode>까지입니다.{" "}
                <InlineCode>192.168.10.255</InlineCode>는 directed broadcast address로
                해석됩니다.
              </p>
              <p>
                host는 자신의 IP와 subnet mask를 기준으로 목적지가 같은 subnet인지
                계산합니다. 같은 subnet이면 ARP로 목적지 MAC address를 찾고 직접 L2
                frame을 보냅니다. 다른 subnet이면 목적지 host의 MAC을 찾는 것이 아니라
                default gateway의 MAC을 찾아 gateway로 보냅니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/vlan-subnet-cidr-range.png"
              alt="192.168.10.0/24 subnet의 network address, usable host range, gateway 예시, broadcast address를 보여주는 다이어그램"
              width={1440}
              height={900}
              caption="Subnet은 IP 주소를 prefix 기준으로 나눈 범위입니다. Gateway 주소는 보통 usable host range 안의 한 주소를 사용합니다."
            />
            <CodeBlock
              code={`# 192.168.10.11/24 host가 판단하는 방식
source:      192.168.10.11/24
destination: 192.168.10.22
result:      같은 subnet -> ARP로 destination MAC 조회

source:      192.168.10.11/24
destination: 192.168.20.21
result:      다른 subnet -> default gateway MAC 조회`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              VLAN과 Subnet은 보통 1:1로 맞추지만 필수는 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                운영에서는 VLAN 하나에 subnet 하나를 붙이는 구성이 가장 흔합니다. 예를
                들어 사내 PC망은 VLAN 10과 <InlineCode>10.10.10.0/24</InlineCode>,
                서버망은 VLAN 20과 <InlineCode>10.10.20.0/24</InlineCode>로 나누는
                식입니다. 이렇게 하면 L2 경계와 L3 주소 경계가 일치해서 운영자가
                이해하기 쉽습니다.
              </p>
              <p>
                하지만 두 개념이 항상 1:1로 강제되는 것은 아닙니다. 하나의 VLAN 위에
                여러 IP subnet을 얹을 수도 있고, 특수한 bridging이나 overlay를 통해
                같은 IP subnet이 여러 물리 구간에 걸쳐 보이게 만들 수도 있습니다.
                다만 이런 구성은 장애 분석과 보안 경계가 복잡해지므로 명확한 이유가
                있을 때만 사용해야 합니다.
              </p>
              <p>
                일반적인 서버/사무실/클라우드 네트워크에서는 “VLAN 하나는 하나의 subnet
                을 가진다”는 운영 규칙을 두는 편이 안전합니다. 그래야 ACL, firewall,
                DHCP scope, gateway, monitoring label을 같은 단위로 묶을 수 있습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              VLAN 사이 통신은 routing이 필요하다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                VLAN 10의 PC가 VLAN 20의 서버로 요청을 보내려면 L2 switching만으로는
                부족합니다. VLAN이 다르다는 것은 broadcast domain이 다르다는 뜻이기
                때문입니다. 중간에 router, L3 switch의 SVI, firewall 같은 L3 gateway가
                있어야 합니다.
              </p>
              <p>
                예를 들어 PC-A가 <InlineCode>192.168.20.21</InlineCode>로 보내려 할 때,
                자신의 subnet이 <InlineCode>192.168.10.0/24</InlineCode>라면 목적지가
                다른 subnet임을 판단합니다. 그래서 PC-A는 서버의 MAC이 아니라 gateway인{" "}
                <InlineCode>192.168.10.1</InlineCode>의 MAC을 ARP로 찾고, 그 MAC을
                destination MAC으로 해서 frame을 보냅니다.
              </p>
              <p>
                gateway는 IP packet을 받은 뒤 route table 또는 connected route를 보고
                VLAN 20 쪽 interface로 forwarding합니다. 이때 L3 packet의 destination
                IP는 여전히 서버 IP지만, VLAN 20 구간으로 나갈 때는 서버 MAC을 향한 새
                L2 frame으로 다시 캡슐화됩니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/vlan-subnet-inter-vlan-routing.png"
              alt="VLAN 10에서 VLAN 20으로 통신할 때 L3 gateway가 inter-VLAN routing을 수행하는 구조"
              width={1440}
              height={900}
              caption="다른 VLAN/Subnet으로 가는 트래픽은 gateway를 거칩니다. Host는 목적지가 다른 subnet임을 판단하면 최종 서버가 아니라 gateway MAC으로 frame을 보냅니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              자주 생기는 실무 오해
            </h2>
            <div className="mt-6">
              <NoteRow
                title="IP가 같은 대역처럼 보여도 VLAN이 다르면 통신이 안 될 수 있다"
                body="L3 주소만 보고 같은 subnet이라고 판단해도 실제 L2 frame이 지나갈 VLAN 경로가 끊겨 있으면 ARP가 실패합니다."
              />
              <NoteRow
                title="VLAN이 같아도 subnet mask가 다르면 host 판단이 갈린다"
                body="한 host는 같은 subnet이라고 보고 ARP를 보내는데, 다른 host는 gateway로 보내는 비대칭 상황이 생길 수 있습니다."
              />
              <NoteRow
                title="Gateway IP는 subnet 안에 있어야 한다"
                body="일반적인 구성에서 default gateway는 host가 직접 ARP로 찾을 수 있는 같은 L2/VLAN과 같은 subnet 안의 주소여야 합니다."
              />
              <NoteRow
                title="Trunk 허용 VLAN 누락은 IP 설정만 봐서는 안 보인다"
                body="switch 사이 trunk에서 특정 VLAN이 allow되지 않으면 해당 VLAN의 frame이 반대편으로 가지 않습니다. IP route가 맞아도 L2 경로가 막힌 것입니다."
              />
              <NoteRow
                title="VLAN은 보안 장치이지만 firewall을 대체하지 않는다"
                body="VLAN은 L2 분리 경계를 만들지만, VLAN 사이 통신을 허용하거나 차단하는 정책은 L3 gateway, ACL, firewall에서 명확히 관리해야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애를 볼 때 확인 순서
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                VLAN과 subnet 문제는 한 번에 보려고 하면 헷갈립니다. 먼저 source와
                destination이 같은 subnet인지 계산합니다. 같은 subnet이라면 ARP, MAC
                table, access VLAN, trunk 허용 VLAN을 봅니다. 다른 subnet이라면 host의
                default gateway, gateway interface, route table, firewall policy를
                봅니다.
              </p>
              <p>
                중요한 것은 “어느 계층에서 막혔는가”를 나누는 것입니다. ARP가 안 되면
                L2/VLAN 쪽 가능성이 높고, ARP는 되는데 gateway 이후가 안 되면 L3 routing
                또는 firewall 가능성이 커집니다. ping 하나만으로 결론을 내리기보다
                같은 subnet 통신, gateway ping, 반대 subnet ping을 나눠서 봐야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`# Linux host 기준 확인 예시
ip addr
ip route
ip neigh

# 같은 subnet host로 테스트
ping 192.168.10.22
arp -an | grep 192.168.10.22

# 다른 subnet이면 gateway부터 확인
ping 192.168.10.1
traceroute 192.168.20.21`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                VLAN은 L2 broadcast domain을 나누고, subnet은 L3 IP address range를
                나눕니다. 둘은 보통 같이 설계되지만 같은 개념은 아닙니다.
              </p>
              <p>
                같은 VLAN과 같은 subnet 안에서는 host가 ARP로 상대 MAC을 찾아 직접
                frame을 보냅니다. 다른 subnet으로 갈 때는 default gateway의 MAC을 찾아
                gateway로 보내고, gateway가 routing을 수행합니다.
              </p>
              <p>
                그래서 네트워크 문제를 볼 때는 먼저 같은 subnet인지, 같은 VLAN인지,
                trunk에 VLAN이 지나가는지, gateway가 같은 subnet 안에 있는지, gateway
                이후 route와 firewall이 맞는지를 순서대로 좁혀야 합니다. 이 순서를
                지키면 “IP는 맞는데 왜 안 되지?”라는 문제를 훨씬 빠르게 분리할 수
                있습니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
