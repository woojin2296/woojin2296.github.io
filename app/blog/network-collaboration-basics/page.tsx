import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "협업을 위한 최소한의 네트워크 지식 | Blog",
  description:
    "인바운드 포트, 로컬과 서버 차이, 내부망과 외부망, DNS, IP, Port, NAT, DHCP, VPN, Proxy를 협업 관점에서 연결해 정리한 글",
};

const references = [
  {
    label: "RFC 1034 - Domain Names: Concepts and Facilities",
    href: "https://www.rfc-editor.org/rfc/rfc1034",
  },
  {
    label: "RFC 1918 - Address Allocation for Private Internets",
    href: "https://www.rfc-editor.org/rfc/rfc1918",
  },
  {
    label: "RFC 2131 - Dynamic Host Configuration Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc2131",
  },
  {
    label: "RFC 3022 - Traditional IP Network Address Translator",
    href: "https://www.rfc-editor.org/rfc/rfc3022",
  },
  {
    label: "RFC 9110 - HTTP Semantics",
    href: "https://www.rfc-editor.org/rfc/rfc9110",
  },
  {
    label: "RFC 8446 - The Transport Layer Security Protocol Version 1.3",
    href: "https://www.rfc-editor.org/rfc/rfc8446",
  },
  {
    label: "IANA - Service Name and Transport Protocol Port Number Registry",
    href: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml",
  },
];

export default function NetworkCollaborationBasicsBlogPostPage() {
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
              Network / Collaboration · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              협업을 위한 최소한의 네트워크 지식
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              “인바운드 포트가 안 열려 있어요”, “로컬에서는 되는데 서버에서는
              안 돼요”, “네트워크가 달라서 접근이 안 될 거예요”라는 말을 들었을 때
              멈추지 않기 위한 글입니다. 목표는 네트워크 전문가가 되는 것이 아니라,
              협업 중 문제 위치를 함께 좁힐 수 있는 공통 언어를 갖는 것입니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              들어가며 - 왜 네트워크를 알아야 하는가
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                프로젝트를 하다 보면 혼자 코드를 잘 짜는 것만으로는 충분하지 않습니다.
                프론트엔드, 백엔드, 인프라, 보안, 데이터베이스 담당자가 같은 문제를
                각자의 언어로 설명합니다. 협업은 소통이고, 소통에는 상대 분야의
                최소한의 단어와 구조가 필요합니다.
              </p>
              <p>
                네트워크 지식이 부족하면 장애 상황에서 모든 말이 비슷하게 들립니다.
                DNS 문제인지, 방화벽 문제인지, 서버 프로세스가 안 떠 있는 문제인지,
                회사 VPN을 켜지 않은 문제인지 구분하지 못합니다. 그러면 문제 해결은
                “누군가 봐 주세요”에서 멈추고, 대화가 진전되지 않습니다.
              </p>
              <p>
                이 글은 OSI 7계층을 암기시키기 위한 글이 아닙니다. 대신 웹 서비스가
                실제로 어떤 경로로 요청을 주고받는지, 그리고 협업 중 자주 듣는 표현이
                그 흐름의 어느 지점을 가리키는지 연결해 보려 합니다. 전체 그림을 알고
                있으면 세부 지식은 나중에 붙습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              네트워크란 무엇인가
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                네트워크는 간단히 말하면 내 컴퓨터와 다른 컴퓨터가 데이터를 주고받을 수
                있도록 연결된 구조입니다. 누군가에게 “이 데이터를 보내 줘”라고 요청하고,
                상대가 “여기 응답이야”라고 돌려줄 수 있다면 그 사이에는 네트워크가
                있습니다.
              </p>
              <p>
                우리가 매일 쓰는 인터넷은 전 세계 컴퓨터가 연결된 거대한 네트워크입니다.
                회사 내부망, 학교 전산망, 클라우드 VPC, 집 공유기 안의 와이파이도 모두
                네트워크입니다. 규모와 접근 범위는 다르지만 핵심은 같습니다. 어떤
                컴퓨터가 어떤 경로를 통해 어떤 컴퓨터와 통신할 수 있는가입니다.
              </p>
              <p>
                그래서 협업에서 “접근 가능하다”는 말은 항상 출발지와 목적지를 함께
                말해야 합니다. 내 노트북에서 되는지, 같은 사무실 와이파이에서 되는지,
                외부 인터넷에서 되는지, 서버 내부에서 되는지에 따라 완전히 다른
                이야기입니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              웹 서비스는 요청과 응답으로 움직인다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                일반적인 웹 서비스는 클라이언트, 프론트 서버, 백엔드 서버,
                데이터베이스로 나누어 볼 수 있습니다. 클라이언트는 브라우저나 모바일
                앱입니다. 프론트 서버는 화면을 구성할 HTML, CSS, JavaScript를 제공합니다.
                백엔드 서버는 API로 데이터를 처리하고, 데이터베이스는 영구 데이터를
                저장합니다.
              </p>
              <p>
                예를 들어 사용자가 회원 목록 화면을 열면 브라우저가 프론트 서버에서
                화면 파일을 받고, 화면 코드가 백엔드 API에 회원 데이터를 요청합니다.
                백엔드는 데이터베이스에서 회원을 조회하고 JSON 응답을 돌려줍니다. 프론트는
                그 응답으로 화면을 그립니다.
              </p>
              <p>
                여기서 중요한 점은 웹이 기본적으로 요청과 응답이라는 점입니다. HTTP는
                이 요청과 응답의 의미를 정하고, HTTPS는 그 통신을 TLS로 암호화합니다.
                네트워크 문제를 본다는 것은 결국 이 요청이 어디까지 갔고, 어디서 응답을
                받지 못했는지 확인하는 일입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-collaboration-service-map.png"
              alt="클라이언트, 프론트 서버, 백엔드 서버, 데이터베이스가 요청과 응답으로 연결되는 웹 서비스 구조"
              width={1440}
              height={900}
              caption="웹 서비스는 하나의 프로그램이 아니라 여러 컴퓨터와 프로세스가 요청과 응답으로 이어진 구조입니다. 협업 중 네트워크 문제는 이 흐름 중 어느 지점에서 끊겼는지 찾는 일에 가깝습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              브라우저에 URL을 입력하면 무슨 일이 일어나는가
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                브라우저에{" "}
                <InlineCode>https://api.example.com/users</InlineCode>를 입력하면
                브라우저는 곧바로 서버 코드로 뛰어가지 않습니다. 먼저 도메인 이름을 IP
                주소로 바꿔야 합니다. 이 과정을 DNS 조회라고 합니다. 도메인은 사람이
                읽기 쉬운 이름이고, 실제 패킷이 도착하려면 IP 주소가 필요합니다.
              </p>
              <p>
                IP를 알게 되면 브라우저는 해당 서버의 포트로 연결을 만듭니다. HTTPS는
                보통 443번 포트를 사용합니다. 연결이 만들어지면 TLS 협상으로 암호화된
                통로를 만들고, 그 위에 HTTP 요청을 보냅니다. 서버는 요청의 method, path,
                header, body를 읽고 응답을 돌려줍니다.
              </p>
              <p>
                이 흐름을 알면 문제를 단계별로 나눌 수 있습니다. 도메인이 틀렸는지,
                IP까지는 맞는데 포트가 막혔는지, TLS 인증서에서 실패했는지, HTTP 요청은
                도착했지만 애플리케이션에서 500을 낸 것인지가 서로 다른 문제라는 것을
                이해할 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-collaboration-request-path.png"
              alt="브라우저 요청이 DNS 조회, TCP 연결, TLS 협상, HTTP 요청을 거쳐 서버 내부 호출로 이어지는 흐름"
              width={1440}
              height={900}
              caption="브라우저 요청은 DNS, TCP, TLS, HTTP, 서버 내부 호출을 차례로 거칩니다. 같은 “접속 안 됨”이라도 어느 단계에서 실패했는지에 따라 담당자와 해결 방법이 달라집니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              IP, DNS, Port를 한 번에 연결해서 보기
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                IP 주소는 네트워크에서 목적지를 찾기 위한 주소입니다. 같은 건물 안에도
                여러 방이 있듯이, 하나의 서버 안에도 여러 서비스가 떠 있을 수 있습니다.
                그 서비스를 구분하는 문 번호가 포트입니다. 웹 서버는 80 또는 443, 개발
                서버는 3000, 백엔드 API는 8080처럼 포트가 다를 수 있습니다.
              </p>
              <p>
                DNS는 사람이 읽기 쉬운 도메인을 IP 주소로 바꿔 줍니다. 사용자는
                <InlineCode>api.example.com</InlineCode>을 기억하지만, 네트워크는 결국
                <InlineCode>203.0.113.10</InlineCode> 같은 주소로 패킷을 보냅니다.
                그리고 <InlineCode>:443</InlineCode> 같은 포트를 통해 그 서버 안의 어떤
                서비스로 들어갈지 결정합니다.
              </p>
              <p>
                그래서 “서버 주소 알려 주세요”라는 말에는 사실 세 가지가 들어 있습니다.
                도메인 또는 IP가 무엇인지, 포트가 무엇인지, HTTP인지 HTTPS인지입니다.
                하나라도 다르면 같은 서버를 바라보고 있어도 요청은 실패할 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-collaboration-address-port.png"
              alt="DNS, IP 주소, Port가 각각 이름, 목적지, 서비스 문을 의미함을 설명하는 다이어그램"
              width={1440}
              height={900}
              caption="DNS는 이름을 주소로 바꾸고, IP는 네트워크상의 목적지를 가리키며, 포트는 그 목적지 안의 서비스 입구를 가리킵니다. URL을 읽을 때 이 셋을 분리하면 대화가 훨씬 정확해집니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              localhost는 내 컴퓨터 자신이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                협업에서 가장 자주 나오는 말 중 하나가 “로컬에서는 되는데 서버에서는 안
                돼요”입니다. 이때 먼저 봐야 할 주소가 <InlineCode>localhost</InlineCode>와
                <InlineCode>127.0.0.1</InlineCode>입니다. 이 주소는 내 컴퓨터 자신을
                가리키는 루프백 주소입니다. 내 노트북에서 열면 내 노트북을 보고, 서버에서
                열면 그 서버 자신을 봅니다.
              </p>
              <p>
                서버 프로세스가 <InlineCode>127.0.0.1:8080</InlineCode>에만 떠 있으면
                같은 서버 안에서 실행한 <InlineCode>curl localhost:8080</InlineCode>은
                성공할 수 있습니다. 하지만 외부 사용자가 서버 IP로 접근하면 실패합니다.
                애플리케이션이 외부 네트워크 인터페이스에서 요청을 받도록 바인딩되어 있지
                않기 때문입니다.
              </p>
              <p>
                외부에서 접근해야 하는 개발 서버라면 앱이 <InlineCode>0.0.0.0</InlineCode>
                또는 서버의 실제 IP에 바인딩되어 있어야 하고, 방화벽과 포트 설정도 열려
                있어야 합니다. 로컬 성공은 필요한 단서지만, 외부 접근 성공을 보장하지
                않습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-collaboration-localhost-binding.png"
              alt="localhost와 0.0.0.0 바인딩의 접근 범위 차이를 보여주는 다이어그램"
              width={1440}
              height={900}
              caption="localhost는 현재 컴퓨터 자신에게만 연결됩니다. 외부 접근이 필요하면 앱 바인딩 주소, 서버 IP, 방화벽, 포트 허용을 함께 확인해야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              내부 네트워크와 외부 네트워크
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                집, 회사, 학교 와이파이에 연결된 기기들은 보통 내부 네트워크에 있습니다.
                이때 기기들은 <InlineCode>10.x.x.x</InlineCode>,{" "}
                <InlineCode>172.16.x.x</InlineCode>부터{" "}
                <InlineCode>172.31.x.x</InlineCode>,{" "}
                <InlineCode>192.168.x.x</InlineCode> 같은 사설 IP를 받습니다. 사설
                IP는 내부망에서만 의미가 있으며, 외부 인터넷에서 바로 찾아갈 수 있는
                주소가 아닙니다.
              </p>
              <p>
                내부 기기가 외부 인터넷에 나갈 때는 보통 공유기나 NAT Gateway가 주소를
                바꿔 줍니다. 내부에서는 내 노트북이 <InlineCode>192.168.0.23</InlineCode>
                이어도, 외부 서비스 입장에서는 공유기의 공인 IP에서 요청이 온 것처럼
                보입니다. 이것이 NAT입니다.
              </p>
              <p>
                반대로 외부 사용자가 내부 서버로 들어오려면 추가 설정이 필요합니다.
                공유기 포트포워딩, 클라우드 보안 그룹, 서버 방화벽, 로드 밸런서 listener가
                모두 요청을 통과시켜야 합니다. “같은 와이파이에서는 되는데 외부에서는
                안 됨”은 대부분 이 경계에서 시작됩니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-collaboration-nat-boundary.png"
              alt="내부 네트워크의 사설 IP와 외부 인터넷의 공인 IP 사이에서 NAT가 주소와 포트를 변환하는 구조"
              width={1440}
              height={900}
              caption="사설 IP는 내부망에서만 직접 접근됩니다. 외부 인터넷과 통신할 때는 NAT이 주소와 포트를 변환하므로, 관찰 위치에 따라 보이는 IP가 달라질 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              인바운드 포트가 안 열렸다는 말
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                인바운드는 밖에서 서버 안으로 들어오는 방향입니다. 아웃바운드는 서버가
                밖으로 나가는 방향입니다. “인바운드 포트가 안 열려 있다”는 말은 외부
                요청이 서버의 특정 포트까지 들어오는 경로 어딘가에서 차단되고 있다는
                뜻입니다.
              </p>
              <p>
                클라우드에서는 보안 그룹이나 네트워크 ACL이 이 역할을 합니다. 리눅스
                서버에서는 <InlineCode>ufw</InlineCode>, <InlineCode>iptables</InlineCode>,
                <InlineCode>nftables</InlineCode> 같은 방화벽이 관여할 수 있습니다.
                회사나 학교 네트워크에서는 상위 방화벽이 특정 포트만 허용할 수도 있습니다.
              </p>
              <p>
                포트가 열려 있다는 말도 두 가지로 나누어야 합니다. 네트워크 장비가 그
                포트를 통과시켜야 하고, 서버 안에서 실제 애플리케이션이 그 포트로
                <InlineCode>LISTEN</InlineCode> 중이어야 합니다. 방화벽은 열려 있는데
                앱이 죽어 있으면 연결은 실패합니다. 앱은 떠 있는데 방화벽이 막으면
                외부에서는 보이지 않습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-collaboration-inbound-firewall.png"
              alt="외부 요청이 NAT, 방화벽, 서버 OS, 애플리케이션 포트를 통과해야 앱에 도착하는 구조"
              width={1440}
              height={900}
              caption="인바운드 접근은 외부 사용자에서 앱 프로세스까지 여러 문을 통과해야 합니다. 어느 문에서 막혔는지 나누어 확인해야 같은 말을 반복하지 않습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              DHCP, 고정 IP, 그리고 갑자기 바뀌는 주소
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                내부망에서 노트북이나 휴대폰이 와이파이에 연결되면 대부분 IP를 직접
                입력하지 않습니다. DHCP가 자동으로 IP, gateway, DNS 서버 같은 설정을
                내려 줍니다. 그래서 재접속하거나 시간이 지나면 같은 기기의 내부 IP가
                바뀔 수 있습니다.
              </p>
              <p>
                협업 중 “같은 공유기에 있는데도 접속이 안 된다”면 상대방의 IP가 바뀌었을
                수 있습니다. 어제는 <InlineCode>192.168.0.24</InlineCode>였지만 오늘은
                <InlineCode>192.168.0.31</InlineCode>일 수 있습니다. 이 상태에서 어제
                주소로 접속하면 당연히 실패합니다.
              </p>
              <p>
                서버처럼 다른 사람이 계속 접근해야 하는 장비에는 고정 IP나 DHCP 예약을
                설정하는 경우가 많습니다. 반대로 노트북처럼 이동하는 장비는 동적 IP가
                자연스럽습니다. 이 차이를 모르고 로컬 IP를 문서에 고정해 두면 협업 중
                혼란이 생깁니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              VPN과 프록시는 경유지를 만든다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                VPN은 외부에 있는 내 컴퓨터를 회사 내부망에 들어온 것처럼 만들어 주는
                암호화된 통로입니다. 회사 Git, 관리자 페이지, 내부 API가 VPN을 켜야만
                접근되는 이유는 그 자원이 공용 인터넷에 열려 있지 않고 내부망 또는 특정
                경로에서만 접근되도록 제한되어 있기 때문입니다.
              </p>
              <p>
                VPN을 켜면 내 컴퓨터의 routing table에 회사 내부 대역으로 가는 경로가
                추가됩니다. 그래서 같은 URL이라도 VPN을 끄면 경로가 없어서 실패하고,
                VPN을 켜면 내부 DNS나 내부 라우팅을 통해 접근될 수 있습니다. “네트워크가
                달라서 접근이 안 된다”는 말은 대부분 이 경로 문제를 뜻합니다.
              </p>
              <p>
                프록시는 내 요청을 중간 서버가 대신 보내는 구조입니다. 회사 보안 정책,
                SSO, 감사 로그, 외부망 접근 제어가 프록시를 통해 동작할 수 있습니다.
                프록시 설정이 빠져 있으면 인터넷은 되는데 특정 사내 서비스 로그인만
                실패하는 식의 문제가 생깁니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-collaboration-dhcp-vpn-proxy.png"
              alt="DHCP, VPN, Proxy가 각각 자동 IP 할당, 내부망 경로 추가, 중간 서버 경유를 담당하는 구조"
              width={1440}
              height={900}
              caption="DHCP는 내 IP를 바꿀 수 있고, VPN은 내부망으로 가는 경로를 추가하며, Proxy는 요청의 중간 경유지가 됩니다. 세 요소 모두 “내가 어디서 요청하는가”를 바꿉니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              협업 실무에서 자주 마주치는 상황
            </h2>
            <div className="mt-6">
              <SituationRow
                situation="웹사이트가 갑자기 안 열린다"
                cause="DNS 캐시, 도메인 레코드 변경, TLS 인증서, 서버 장애를 나누어 확인해야 합니다. 브라우저 오류만 보고 결론 내리면 범위가 너무 넓습니다."
              />
              <SituationRow
                situation="로컬 서버는 되는데 외부에서 안 된다"
                cause="localhost 바인딩, 서버 방화벽, 보안 그룹, NAT/포트포워딩, 애플리케이션 LISTEN 상태를 순서대로 확인합니다."
              />
              <SituationRow
                situation="VPN 없이는 사내 자원에 접근할 수 없다"
                cause="해당 자원이 공용 인터넷에 열려 있지 않고 내부망 또는 VPN 경로에서만 접근되도록 제한되어 있다는 뜻입니다."
              />
              <SituationRow
                situation="특정 포트만 접근된다"
                cause="방화벽이나 보안 그룹이 허용한 포트만 열려 있거나, 서버 앱이 특정 포트에서만 LISTEN 중일 수 있습니다."
              />
              <SituationRow
                situation="같은 공유기에 있는데도 접속이 안 된다"
                cause="DHCP로 상대 IP가 바뀌었거나, OS 방화벽이 막고 있거나, 같은 와이파이처럼 보여도 게스트망 격리 기능으로 서로 통신하지 못할 수 있습니다."
              />
              <SituationRow
                situation="서버에서는 외부 API가 되는데 내 노트북에서는 안 된다"
                cause="출발지 IP 화이트리스트, 회사 프록시, VPN 경로, DNS 설정이 서로 다를 수 있습니다. 접근 가능 여부는 항상 출발지를 포함해 말해야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              문제를 좁히는 질문
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                네트워크 문제를 잘 해결하는 사람은 처음부터 정답을 맞히지 않습니다.
                대신 출발지, 목적지, 이름, 주소, 포트, 경유지, 애플리케이션 상태를
                분리해서 질문합니다. 이 질문이 협업의 속도를 결정합니다.
              </p>
              <p>
                가장 먼저 “어디에서 어디로 접근 중인가?”를 물어야 합니다. 내 노트북에서
                서버로 가는 것인지, 서버에서 외부 API로 나가는 것인지, 브라우저에서 로드
                밸런서로 가는 것인지에 따라 확인 명령이 달라집니다. 그다음 DNS, IP,
                포트, 방화벽, 서버 로그 순서로 좁혀 갑니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-collaboration-debug-checklist.png"
              alt="네트워크 문제를 이름, 주소, 포트, 경유지, 애플리케이션 단계로 좁히는 체크리스트"
              width={1440}
              height={900}
              caption="네트워크 문제는 한 번에 맞히는 문제가 아니라 확인 범위를 줄이는 문제입니다. 이름, 주소, 포트, 경유지, 애플리케이션 순서로 나누면 대화가 구체화됩니다."
            />
            <CodeBlock
              code={`# 1. 도메인이 어떤 IP로 해석되는지 확인
dig +short api.example.com

# 2. 목적지까지 기본 경로가 있는지 확인
ip route get 203.0.113.10

# 3. 포트가 열려 있는지 확인
nc -vz api.example.com 443
curl -v https://api.example.com/users

# 4. 서버 안에서 앱이 해당 포트로 떠 있는지 확인
ss -ltnp | grep ':8080'

# 5. HTTP 요청이 앱까지 도착했는지 확인
tail -f /var/log/nginx/access.log
tail -f /var/log/app/error.log`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                이 글의 목적은 네트워크 전문가를 만드는 것이 아닙니다. 협업 중 네트워크
                이야기가 나왔을 때 “어디서 막혔을까?”를 함께 생각할 수 있게 만드는
                것입니다. 그 정도만 되어도 대화는 훨씬 빨라집니다.
              </p>
              <p>
                웹 요청은 DNS로 이름을 주소로 바꾸고, IP와 포트로 목적지에 연결하고,
                TLS와 HTTP를 거쳐 애플리케이션에 도착합니다. 내부망과 외부망 사이에는
                NAT, 방화벽, VPN, 프록시 같은 경계가 있습니다. 각 경계는 요청이 보이는
                방식과 통과 조건을 바꿉니다.
              </p>
              <p>
                결국 중요한 것은 단어를 외우는 것이 아니라 연결해서 보는 것입니다.
                출발지와 목적지를 명확히 말하고, 이름, 주소, 포트, 경유지, 애플리케이션
                상태를 나누어 확인하면 “안 돼요”라는 말은 “여기까지는 되고 여기서부터
                막혀요”라는 대화로 바뀝니다.
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

function SituationRow({
  situation,
  cause,
}: {
  situation: string;
  cause: string;
}) {
  return (
    <section className="border-t border-[#e5e5e5] py-5 first:border-t-0">
      <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
        {situation}
      </h3>
      <p className="mt-2 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
        {cause}
      </p>
    </section>
  );
}
