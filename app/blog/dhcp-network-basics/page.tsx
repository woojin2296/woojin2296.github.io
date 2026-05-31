import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "DHCP는 네트워크 설정을 자동으로 임대해주는 프로토콜이다 | Blog",
  description:
    "DHCP가 IP 주소, subnet mask, default gateway, DNS server를 자동으로 내려주는 방식과 DORA, lease, renewal, relay, 운영 장애 포인트를 정리한 글",
};

const references = [
  {
    label: "RFC 2131 - Dynamic Host Configuration Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc2131",
  },
  {
    label: "RFC 2132 - DHCP Options and BOOTP Vendor Extensions",
    href: "https://www.rfc-editor.org/rfc/rfc2132",
  },
  {
    label: "RFC 8415 - DHCP for IPv6",
    href: "https://www.rfc-editor.org/rfc/rfc8415",
  },
  {
    label: "IANA - BOOTP/DHCP Parameters",
    href: "https://www.iana.org/assignments/bootp-dhcp-parameters/bootp-dhcp-parameters.xhtml",
  },
];

export default function DhcpNetworkBasicsBlogPostPage() {
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
              Network / DHCP · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              DHCP는 네트워크 설정을 자동으로 임대해주는 프로토콜이다
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              노트북을 와이파이에 연결했는데 바로 인터넷이 되는 이유는 기기가 스스로
              적당한 IP를 만들어냈기 때문이 아닙니다. 네트워크 안의 DHCP 서버가 IP 주소,
              subnet mask, default gateway, DNS server 같은 값을 일정 시간 동안
              임대해주기 때문입니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              DHCP가 쓰이는 위치
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DHCP는 네트워크 인프라에서 쓰이는 자동 설정 프로토콜입니다. 웹 요청의
                데이터를 전달하는 프로토콜이라기보다, 기기가 네트워크에 들어왔을 때
                통신에 필요한 주소 정보를 받아오게 하는 제어 흐름에 가깝습니다.
              </p>
              <p>
                계층으로 보면 DHCP 메시지는 UDP 위에서 동작하므로 Application 계층
                프로토콜로 분류할 수 있습니다. 하지만 실무에서 DHCP를 다룰 때는 보통
                switch, VLAN, subnet, router, wireless controller, cloud VPC 같은
                네트워크 인프라 설정과 함께 봅니다.
              </p>
              <p>
                회사 사무실, 집 공유기, 학교 네트워크, 데이터센터, 클라우드 VPC 모두
                같은 문제를 다룹니다. 새 장비가 들어왔을 때 그 장비에 어떤 IP를 줄지,
                어느 gateway로 나가게 할지, 어떤 DNS를 쓰게 할지를 자동으로 정해야
                합니다. DHCP는 이 과정을 사람이 매번 수동으로 입력하지 않게 해줍니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              DHCP가 해결하는 문제
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                네트워크에 붙는 모든 장비는 통신을 위해 최소한의 설정이 필요합니다.
                자신의 IP 주소, 같은 subnet의 범위, 외부로 나갈 default gateway, 도메인을
                IP로 바꿔줄 DNS server를 알아야 합니다. 이 값이 틀리면 케이블이 연결되어
                있어도 통신은 실패합니다.
              </p>
              <p>
                수십 대 정도라면 수동 설정도 가능해 보이지만, 장비가 많아지면 금방
                깨집니다. 같은 IP를 두 장비에 넣으면 IP 충돌이 나고, gateway가 틀리면
                외부망으로 못 나가고, DNS가 틀리면 IP 통신은 되는데 도메인 접속만 실패할
                수 있습니다.
              </p>
              <p>
                DHCP는 이 설정을 중앙에서 관리합니다. 네트워크에 들어온 client가
                “나에게 쓸 수 있는 설정을 달라”고 요청하면 DHCP server가 사용 가능한
                주소와 옵션을 내려줍니다. 여기서 핵심은 IP를 영구 소유하게 하는 것이
                아니라, 일정 시간 동안 임대한다는 점입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/dhcp-lease-config.png"
              alt="DHCP server가 device에 IP address, subnet mask, default gateway, DNS server, lease time 같은 설정 값을 내려주는 다이어그램"
              width={1440}
              height={900}
              caption="DHCP는 IP 주소 하나만 주는 기능이 아닙니다. 장비가 네트워크에서 실제로 통신하기 위해 필요한 기본 설정 묶음을 lease 형태로 내려줍니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              DHCP가 내려주는 값
            </h2>
            <div className="mt-6">
              <NoteRow bordered
                title="IP address"
                body="장비가 사용할 주소입니다. 같은 subnet 안에서 중복되면 안 됩니다."
              />
              <NoteRow bordered
                title="Subnet mask 또는 prefix length"
                body="어디까지가 같은 네트워크인지 판단하는 기준입니다. 예를 들어 192.168.10.34/24라면 보통 192.168.10.0부터 192.168.10.255까지를 같은 subnet으로 봅니다."
              />
              <NoteRow bordered
                title="Default gateway"
                body="목적지가 같은 subnet 밖에 있을 때 packet을 넘길 router 주소입니다. 이 값이 틀리면 내부 장비끼리는 통신되지만 인터넷이나 다른 subnet으로 나가지 못합니다."
              />
              <NoteRow bordered
                title="DNS server"
                body="example.com 같은 도메인을 IP 주소로 바꿔줄 서버입니다. DNS가 틀리면 IP로 직접 접속은 되는데 도메인 접속만 실패하는 증상이 나옵니다."
              />
              <NoteRow bordered
                title="Lease time"
                body="이 설정을 얼마 동안 사용해도 되는지 나타냅니다. DHCP client는 lease가 끝나기 전에 갱신을 시도합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              DORA 흐름으로 주소를 받는다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DHCPv4의 기본 흐름은 보통 DORA라고 부릅니다. Discover, Offer, Request,
                Ack의 앞 글자를 딴 말입니다. client는 아직 쓸 IP가 없으므로 처음에는
                broadcast를 사용합니다. UDP 기준으로 server는 67번 port, client는 68번
                port를 사용합니다.
              </p>
              <p>
                먼저 client가 <InlineCode>DHCPDISCOVER</InlineCode>를 보냅니다. 같은
                broadcast domain 안의 DHCP server가 이를 보고 사용할 수 있는 IP와 옵션을
                담아 <InlineCode>DHCPOFFER</InlineCode>를 보냅니다. client는 그 제안을
                선택하겠다는 <InlineCode>DHCPREQUEST</InlineCode>를 보내고, server가
                <InlineCode>DHCPACK</InlineCode>로 확정하면 lease가 활성화됩니다.
              </p>
              <p>
                이 흐름에서 중요한 점은 DHCP가 HTTP처럼 이미 IP 설정이 끝난 뒤 사용하는
                일반 요청과 다르다는 것입니다. client는 아직 자신의 주소도 모르는 상태에서
                네트워크 설정을 얻어야 하므로 broadcast와 link-local 수준의 동작을 함께
                이해해야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/dhcp-dora-flow.png"
              alt="DHCP client와 DHCP server 사이의 Discover, Offer, Request, Ack 메시지 흐름을 나타낸 시퀀스 다이어그램"
              width={1440}
              height={900}
              caption="DORA는 DHCP가 주소를 임대하는 기본 흐름입니다. client가 아직 주소를 갖기 전이므로 초기 메시지는 local broadcast domain 안에서 시작합니다."
            />
            <CodeBlock
              code={`DHCPv4 DORA
1. DHCPDISCOVER  client -> broadcast
2. DHCPOFFER     server -> client
3. DHCPREQUEST   client -> selected server
4. DHCPACK       server -> client

UDP ports
- DHCP server: 67
- DHCP client: 68`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Lease는 소유가 아니라 임대다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DHCP가 준 IP는 영구적으로 내 장비의 것이 아닙니다. lease time 동안만
                사용할 수 있는 주소입니다. 그래서 client는 lease가 만료되기 전에 갱신을
                시도합니다. 갱신에 성공하면 같은 IP를 계속 쓸 수 있고, 실패하면 일정
                시점 이후 그 주소를 더 이상 사용하면 안 됩니다.
              </p>
              <p>
                lease가 짧으면 장비 이동이나 주소 회수가 빠릅니다. 카페, 행사장, 학교처럼
                사용자가 자주 바뀌는 네트워크에서는 장점이 됩니다. 대신 DHCP 요청이 더
                자주 발생하고, DHCP server나 relay 장애가 사용자에게 빨리 드러납니다.
              </p>
              <p>
                lease가 길면 갱신 트래픽이 줄고 주소가 안정적으로 유지됩니다. 하지만 장비가
                사라져도 주소가 오래 묶여 있을 수 있고, 주소 풀이 부족한 네트워크에서는
                사용 가능한 IP가 빨리 고갈될 수 있습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Broadcast는 router를 넘지 못한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DHCP Discover는 기본적으로 local broadcast입니다. 즉, 같은 L2 broadcast
                domain 안에서는 보이지만 router를 넘어 다른 subnet으로 자동 전달되지는
                않습니다. 그래서 subnet이 여러 개인 회사 네트워크에서 DHCP server를 하나만
                중앙에 두려면 중간 장비가 DHCP relay 역할을 해야 합니다.
              </p>
              <p>
                DHCP relay는 client의 broadcast 요청을 받아 DHCP server로 unicast 전달합니다.
                이때 요청이 어느 interface, 어느 subnet에서 왔는지 알려주는 정보가 함께
                들어갑니다. server는 그 정보를 보고 알맞은 DHCP scope에서 주소를 고릅니다.
              </p>
              <p>
                그래서 VLAN과 subnet을 나누면 DHCP 설정도 같이 나뉩니다. VLAN 10이
                192.168.10.0/24를 쓰고 VLAN 20이 192.168.20.0/24를 쓴다면, DHCP server에는
                보통 각 subnet에 맞는 scope가 따로 있어야 합니다. relay가 빠지면 client는
                DHCP server가 존재해도 주소를 받지 못합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/dhcp-relay-vlan.png"
              alt="VLAN과 subnet이 나뉜 환경에서 router 또는 L3 switch의 DHCP relay가 DHCP server로 요청을 전달하는 구조 다이어그램"
              width={1440}
              height={900}
              caption="DHCP server가 다른 subnet에 있다면 router나 L3 switch가 relay 역할을 해야 합니다. 각 subnet은 보통 별도의 DHCP scope와 연결됩니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              클라우드에서는 어떻게 보이나
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                클라우드에서도 VM이나 container가 IP, DNS, gateway 정보를 자동으로 받는
                구조는 존재합니다. 다만 사용자가 직접 DHCP server를 설치하고 broadcast를
                설계하는 온프레미스 네트워크와 달리, 많은 부분이 cloud provider의 VPC
                control plane에 의해 관리됩니다.
              </p>
              <p>
                예를 들어 EC2 instance의 private IP는 subnet 안에서 할당되고, DNS server나
                domain name 같은 값은 DHCP option set 또는 provider가 제공하는 metadata,
                네트워크 에이전트, CNI 설정과 함께 보입니다. 사용자는 “DHCP 서버 장비”를
                직접 운영하지 않더라도, 결과적으로 instance 내부에는 IP, route, resolver
                설정이 자동으로 들어옵니다.
              </p>
              <p>
                그래서 클라우드에서 DHCP를 볼 때는 “어떤 장비가 broadcast에 응답하나”보다
                “이 subnet의 주소 할당 정책, DNS 옵션, route table, security group, network
                interface 설정이 어떻게 연결되는가”를 보는 편이 더 실무적입니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영에서 자주 터지는 문제
            </h2>
            <div className="mt-6">
              <NoteRow bordered
                title="주소 풀이 고갈됨"
                body="DHCP scope에 남은 주소가 없으면 새 장비가 IP를 받지 못합니다. 사용자가 많은 무선망이나 임시 행사망에서 자주 발생합니다."
              />
              <NoteRow bordered
                title="잘못된 gateway 또는 DNS를 배포함"
                body="DHCP는 중앙에서 값을 뿌리기 때문에 잘못된 옵션 하나가 같은 subnet의 모든 client에 영향을 줍니다."
              />
              <NoteRow bordered
                title="Relay 설정이 빠짐"
                body="DHCP server가 다른 subnet에 있는데 relay가 없으면 Discover가 server까지 가지 못합니다. 장비는 계속 IP를 못 받거나 fallback 주소를 사용합니다."
              />
              <NoteRow bordered
                title="비인가 DHCP server가 응답함"
                body="잘못 연결된 공유기나 테스트 장비가 DHCP 응답을 하면 client가 엉뚱한 gateway와 DNS를 받을 수 있습니다. 사내망에서는 DHCP snooping 같은 보호 기능을 함께 봅니다."
              />
              <NoteRow bordered
                title="Static IP와 DHCP pool이 겹침"
                body="수동으로 고정 IP를 넣은 장비가 DHCP pool 안의 주소를 쓰면 나중에 DHCP가 같은 주소를 다른 장비에 줄 수 있습니다. 예약 주소와 제외 범위를 명확히 나눠야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애를 볼 때 확인할 것
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DHCP 문제는 애플리케이션 로그에 직접 남지 않는 경우가 많습니다. 서버 API가
                느린 것이 아니라, client가 애초에 정상 IP나 DNS를 못 받아 네트워크에
                들어오지 못한 상태일 수 있습니다. 그래서 증상을 볼 때는 주소, route, DNS,
                packet capture를 순서대로 확인하는 편이 좋습니다.
              </p>
              <p>
                macOS에서는 현재 interface가 받은 DHCP packet과 주소를 확인할 수 있고,
                Linux에서는 <InlineCode>ip addr</InlineCode>, <InlineCode>ip route</InlineCode>,
                resolver 상태, network manager 로그를 봅니다. 실제 메시지 흐름을 보려면
                UDP 67, 68번 packet을 capture하면 Discover, Offer, Request, Ack가 보입니다.
              </p>
            </div>
            <CodeBlock
              code={`macOS
ipconfig getifaddr en0
ipconfig getpacket en0
networksetup -getdnsservers Wi-Fi
sudo tcpdump -ni en0 'port 67 or port 68'

Linux
ip addr
ip route
resolvectl status
sudo tcpdump -ni any 'port 67 or port 68'`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DHCP는 장비가 네트워크에 들어올 때 필요한 기본 설정을 자동으로 임대해주는
                프로토콜입니다. IP 주소만 주는 것이 아니라 subnet, gateway, DNS, lease
                time 같은 값을 함께 내려줍니다.
              </p>
              <p>
                흐름은 Discover, Offer, Request, Ack로 이해하면 됩니다. client는 처음에
                쓸 IP가 없으므로 broadcast로 시작하고, DHCP server는 사용 가능한 주소와
                옵션을 lease로 확정합니다.
              </p>
              <p>
                실무에서 DHCP는 VLAN, subnet, router, relay, DNS와 함께 봐야 합니다.
                “인터넷이 안 된다”는 증상 뒤에는 IP를 못 받은 문제, gateway가 틀린 문제,
                DNS 옵션이 잘못된 문제, relay가 빠진 문제가 숨어 있을 수 있습니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
