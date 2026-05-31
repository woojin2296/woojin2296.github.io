import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "네트워크 계층별 프로토콜 정리 | Blog",
  description:
    "OSI 7계층과 TCP/IP 관점에서 각 네트워크 계층에 어떤 프로토콜이 있는지, 실제 웹 요청에서 DNS, TCP, TLS, HTTP, IP, Ethernet이 어떻게 이어지는지 정리한 글",
};

const references = [
  {
    label: "RFC 791 - Internet Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc791",
  },
  {
    label: "RFC 8200 - IPv6 Specification",
    href: "https://www.rfc-editor.org/rfc/rfc8200",
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
    label: "RFC 8446 - TLS 1.3",
    href: "https://www.rfc-editor.org/rfc/rfc8446",
  },
  {
    label: "RFC 9110 - HTTP Semantics",
    href: "https://www.rfc-editor.org/rfc/rfc9110",
  },
  {
    label: "RFC 1035 - Domain Names",
    href: "https://www.rfc-editor.org/rfc/rfc1035",
  },
  {
    label: "RFC 826 - Ethernet ARP",
    href: "https://www.rfc-editor.org/rfc/rfc826",
  },
  {
    label: "IANA - Protocol Numbers",
    href: "https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml",
  },
  {
    label: "IANA - Service Name and Transport Protocol Port Number Registry",
    href: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml",
  },
];

export default function NetworkProtocolLayersBlogPostPage() {
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
              Network / Protocol · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              네트워크 계층별 프로토콜 정리
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              네트워크 프로토콜을 외울 때 가장 많이 헷갈리는 이유는 계층이 섞여서
              설명되기 때문입니다. HTTP, TLS, TCP, IP, Ethernet은 모두 통신에 쓰이지만
              같은 위치에서 같은 일을 하지 않습니다. 이 글에서는 OSI 7계층을 기준으로
              각 계층의 대표 프로토콜과 실무에서 보는 관점을 정리합니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              먼저 기준을 잡자
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                OSI 7계층은 학습과 장애 분석을 위한 모델입니다. 실제 인터넷 프로토콜
                스택은 보통 Link, Internet, Transport, Application처럼 더 적은 계층으로
                설명합니다. 그래서 OSI의 5계층 Session, 6계층 Presentation, 7계층
                Application은 실제 구현에서는 Application 영역 안에 함께 묶이는 경우가
                많습니다.
              </p>
              <p>
                그래도 OSI 모델은 유용합니다. 장애가 났을 때 “DNS가 안 되나”, “TCP
                연결이 안 되나”, “TLS 인증서가 틀렸나”, “HTTP route가 잘못됐나”처럼
                어느 계층의 문제인지 나눠서 볼 수 있기 때문입니다.
              </p>
              <p>
                여기서 말하는 프로토콜은 엄밀한 RFC 프로토콜뿐 아니라 계층에서 반복적으로
                등장하는 표준, 메시지 형식, 제어 프로토콜까지 포함해 설명합니다. 예를
                들어 JSON은 네트워크 프로토콜이라기보다 데이터 표현 형식이지만,
                Presentation 계층을 설명할 때 함께 이해하면 좋습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-protocol-layer-map.png"
              alt="OSI 7계층별 대표 네트워크 프로토콜을 Application, Presentation, Session, Transport, Network, Data Link, Physical로 정리한 다이어그램"
              width={1440}
              height={900}
              caption="OSI 7계층은 학습 모델이고, 실제 인터넷 스택에서는 L5~L7이 Application 계층으로 합쳐지는 경우가 많습니다. 그래도 계층별 역할을 분리하면 장애 원인을 훨씬 빠르게 좁힐 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              한눈에 보는 계층별 프로토콜
            </h2>
            <div className="mt-6">
              <ProtocolRow
                title="L1 Physical"
                protocols="Ethernet PHY, Wi-Fi PHY, DSL, DOCSIS, Bluetooth PHY, optical fiber standards"
                body="bit를 전기 신호, 무선 신호, 광 신호로 어떻게 표현하고 전송할지 다룹니다. frame, IP, port 같은 논리 주소를 해석하지 않습니다."
              />
              <ProtocolRow
                title="L2 Data Link"
                protocols="Ethernet, Wi-Fi MAC, ARP, VLAN(802.1Q), PPP, STP, LLDP, LACP"
                body="같은 link 또는 broadcast domain 안에서 frame을 전달합니다. MAC address, frame, VLAN, switching, ARP가 이 계층에서 자주 등장합니다."
              />
              <ProtocolRow
                title="L3 Network"
                protocols="IPv4, IPv6, ICMP, ICMPv6, IPsec, IGMP, OSPF, BGP, RIP, IS-IS"
                body="서로 다른 network 사이에서 packet을 목적지 IP까지 보내는 계층입니다. routing, subnet, gateway, TTL, hop limit, ICMP error를 이해해야 합니다."
              />
              <ProtocolRow
                title="L4 Transport"
                protocols="TCP, UDP, QUIC, SCTP, DCCP"
                body="host 안의 process나 service endpoint를 구분하고, 데이터 전달 방식을 정의합니다. TCP는 연결과 신뢰성을 제공하고, UDP는 connectionless datagram을 전달합니다."
              />
              <ProtocolRow
                title="L5 Session"
                protocols="RPC, NetBIOS Session Service, SMB session, SIP, TLS session/resumption"
                body="통신 흐름의 시작, 유지, 재개, 종료 같은 session 개념을 다룹니다. 현대 웹 개발에서는 독립 계층으로 드러나기보다 application protocol 안에 섞여 있습니다."
              />
              <ProtocolRow
                title="L6 Presentation"
                protocols="TLS, MIME, JSON, XML, ASN.1, XDR, UTF-8, compression formats"
                body="데이터 표현, 직렬화, 암호화, 압축처럼 application data를 어떤 형태로 주고받을지 다룹니다. TLS는 OSI 모델에 딱 맞게 떨어지지는 않지만 이 계층 설명에서 자주 함께 다룹니다."
              />
              <ProtocolRow
                title="L7 Application"
                protocols="HTTP, DNS, SMTP, IMAP, POP3, FTP, SSH, DHCP, NTP, SNMP, MQTT, AMQP, gRPC, WebSocket"
                body="사용자 기능과 가장 가까운 계층입니다. 브라우저 요청, API 호출, 이름 해석, 메일, 파일 전송, 원격 접속, 메시징 같은 업무 의미를 담은 protocol이 여기에 있습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L1 Physical: bit를 신호로 바꾸는 계층
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Physical 계층은 bit를 물리 매체 위에서 어떻게 표현할지 다룹니다. 전압,
                주파수, 변조 방식, 케이블, 커넥터, 광 신호, 무선 채널 같은 영역입니다.
                개발자가 애플리케이션 로그에서 직접 마주칠 일은 적지만, 실제 장애에서는
                케이블 불량, 링크 down, duplex mismatch, 무선 간섭, 광 모듈 문제처럼
                L1 문제가 먼저 발생할 수 있습니다.
              </p>
              <p>
                Ethernet이라고 말할 때는 L1과 L2가 함께 묶이는 경우가 많습니다. 예를 들어
                1000BASE-T 같은 표현은 copper cable 위에서 gigabit 신호를 주고받는
                물리 계층 표준이고, Ethernet frame과 MAC address는 L2 영역입니다.
              </p>
            </div>
            <CodeBlock
              code={`L1에서 보는 것
- Link up/down
- cable, radio, optical signal
- speed, duplex, modulation
- bit error, signal loss`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L2 Data Link: 같은 망 안에서 frame을 전달한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L2의 대표는 Ethernet과 Wi-Fi입니다. 이 계층의 단위는 frame이고,
                주소는 MAC address입니다. switch는 frame의 destination MAC address와
                VLAN 정보를 보고 어느 port로 내보낼지 결정합니다.
              </p>
              <p>
                ARP는 IPv4 주소를 Ethernet MAC address로 해석하는 protocol입니다.
                엄밀하게는 L2와 L3 사이에 걸쳐 있는 protocol로 보는 편이 자연스럽습니다.
                IPv6에서는 ARP 대신 ICMPv6 기반 Neighbor Discovery를 사용합니다.
              </p>
              <p>
                VLAN은 하나의 물리 switch를 여러 broadcast domain으로 나누는 표준입니다.
                STP는 switch loop를 막고, LLDP는 인접 장비 정보를 교환하고, LACP는 여러
                물리 link를 하나의 논리 link처럼 묶을 때 사용됩니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L3 Network: IP packet을 목적지 network로 보낸다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L3의 핵심은 IP입니다. IPv4와 IPv6는 source IP, destination IP,
                TTL 또는 hop limit 같은 정보를 담고 packet을 여러 network를 지나
                목적지까지 보내는 역할을 합니다. router는 destination IP를 route table과
                비교해 next hop을 고릅니다.
              </p>
              <p>
                ICMP는 IP 통신을 보조하는 제어 protocol입니다. ping에 쓰이는 echo
                request/response만 있는 것이 아니라 destination unreachable, time
                exceeded처럼 장애 분석에 중요한 메시지도 ICMP로 전달됩니다.
              </p>
              <p>
                OSPF, BGP, RIP, IS-IS 같은 routing protocol은 실제 사용자 packet을
                운반하는 data plane protocol이라기보다 route 정보를 교환하는 control
                plane protocol입니다. BGP는 TCP 위에서 동작하지만, 목적은 L3 routing
                table을 구성하는 것입니다. 그래서 “몇 계층인가”를 말할 때 transport
                방식과 역할을 분리해서 봐야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`L3에서 자주 보는 질문
- 목적지 IP가 같은 subnet인가?
- default gateway가 맞는가?
- route table에 prefix가 있는가?
- ICMP unreachable 또는 time exceeded가 오는가?
- NAT, firewall, routing policy가 경로를 바꾸는가?`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L4 Transport: process endpoint와 전달 방식을 정한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L4에서는 TCP와 UDP가 가장 중요합니다. TCP는 connection-oriented
                protocol이고, reliable, in-order byte stream을 제공합니다. sequence
                number, acknowledgement, retransmission, flow control, congestion
                control 같은 기능이 여기에 속합니다.
              </p>
              <p>
                UDP는 connectionless datagram protocol입니다. 연결 수립, 재전송, 순서
                보장, 혼잡 제어를 기본 제공하지 않습니다. 대신 header가 단순하고 지연이
                낮아 DNS, DHCP, VoIP, 게임, QUIC 같은 protocol의 기반으로 자주 쓰입니다.
              </p>
              <p>
                QUIC은 UDP 위에서 동작하지만, TLS 기반 보안, stream multiplexing,
                connection migration 같은 transport 성격의 기능을 application space에서
                구현합니다. 그래서 OSI 관점으로 딱 잘라 넣기보다 “UDP 위에서 동작하는
                modern transport protocol”로 이해하는 편이 실무적으로 맞습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-protocol-encapsulation.png"
              alt="Application data가 TCP UDP header, IP header, Data Link header 안에 캡슐화되는 구조 다이어그램"
              width={1440}
              height={900}
              caption="각 계층은 자기 header를 붙입니다. 수신자는 반대로 L2 frame, L3 packet, L4 segment/datagram을 해석해 application data까지 올립니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L5 Session: 연결 흐름을 유지하는 개념
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Session 계층은 통신의 시작, 유지, 재개, 종료를 관리하는 개념입니다.
                전통적으로 NetBIOS Session Service, RPC, SMB session 같은 예시가
                언급됩니다. SIP도 음성/영상 통화의 session을 설정하고 제어하는 protocol로
                자주 설명됩니다.
              </p>
              <p>
                다만 현대 웹에서는 L5가 독립적으로 보이는 경우가 많지 않습니다. HTTP
                cookie, JWT, WebSocket connection, TLS session resumption, gRPC stream처럼
                application protocol과 security protocol 내부에 session 개념이 섞여
                나타나는 경우가 일반적입니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L6 Presentation: 표현, 암호화, 직렬화
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Presentation 계층은 데이터를 어떤 형식으로 표현할지 다룹니다. JSON,
                XML, MIME, ASN.1, XDR, UTF-8, Protocol Buffers 같은 format이나 encoding이
                이 설명에 자주 등장합니다. 압축도 이 계층 관점에서 함께 볼 수 있습니다.
              </p>
              <p>
                TLS는 OSI 모델에 완벽히 맞아 떨어지는 protocol은 아니지만, 실무에서는
                Presentation 또는 Application과 Transport 사이의 보안 계층으로 설명하는
                경우가 많습니다. TLS는 인증서 검증, key exchange, 암호화, 무결성 보호를
                제공하고, HTTP가 HTTPS가 되는 경계에서 핵심 역할을 합니다.
              </p>
              <p>
                중요한 점은 Presentation 문제가 application bug처럼 보일 수 있다는
                것입니다. 예를 들어 charset이 틀리면 글자가 깨지고, JSON schema가 맞지
                않으면 parsing error가 나고, TLS 인증서가 만료되면 HTTP 요청이 서버
                application까지 도달하지 못할 수 있습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              L7 Application: 사용자의 의미가 담기는 계층
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Application 계층은 사용자가 실제로 원하는 기능과 가장 가깝습니다. HTTP는
                웹 문서와 API 요청을 다루고, DNS는 domain name을 IP 주소로 해석하고,
                SMTP/IMAP/POP3는 메일을 다룹니다. SSH는 원격 접속, FTP/SFTP는 파일 전송,
                DHCP는 host network 설정 자동 할당에 사용됩니다.
              </p>
              <p>
                운영에서 가장 많이 보는 것도 L7입니다. HTTP status code, header, cookie,
                method, path, host, body, content type, CORS, authentication, authorization
                같은 문제가 모두 이 계층에 가깝습니다. 하지만 L7 에러처럼 보여도 실제로는
                DNS, TCP, TLS, routing 문제일 수 있으므로 아래 계층 확인이 필요합니다.
              </p>
              <p>
                gRPC는 HTTP/2 위에서 동작하는 RPC framework이고, WebSocket은 HTTP handshake
                이후 양방향 message channel을 만드는 방식입니다. MQTT와 AMQP는 message
                broker와 통신할 때 자주 쓰입니다. SNMP는 network 장비 상태 수집, NTP는
                시간 동기화에 사용됩니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              실제 웹 요청에서는 이렇게 이어진다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                브라우저에서 <InlineCode>https://api.example.com</InlineCode>을 열면
                먼저 DNS로 domain name을 IP 주소로 해석합니다. 그 다음 서버의 443번
                port로 TCP connection을 만들고, TLS handshake로 인증서와 암호화 key를
                협상합니다. 그 뒤에야 HTTP request가 전송됩니다.
              </p>
              <p>
                이 모든 과정 아래에는 Ethernet 또는 Wi-Fi frame, ARP 또는 IPv6 Neighbor
                Discovery, IP routing, ICMP error 같은 lower-layer protocol이 깔려
                있습니다. 그래서 브라우저에는 “network error” 하나로 보이는 장애도 실제로는
                DNS 실패, TCP timeout, TLS 인증서 오류, HTTP 404, CORS 차단처럼 서로 다른
                계층에서 발생할 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-protocol-web-request.png"
              alt="브라우저가 HTTPS API를 열 때 DNS TCP TLS HTTP와 하위 계층 프로토콜이 함께 사용되는 흐름 다이어그램"
              width={1440}
              height={900}
              caption="간단한 HTTPS API 호출 하나에도 DNS, TCP, TLS, HTTP가 순서대로 참여하고, 그 아래에는 Ethernet/Wi-Fi, ARP/ND, IPv4/IPv6, ICMP, routing이 깔립니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              헷갈리기 쉬운 분류
            </h2>
            <div className="mt-6">
              <NoteRow
                title="ARP는 L2인가 L3인가"
                body="ARP는 IPv4 주소를 MAC 주소로 바꾸기 위해 쓰이므로 L3 주소와 L2 주소를 연결합니다. Ethernet frame으로 전달되고 같은 broadcast domain 안에서 동작하므로 실무에서는 L2 주변 protocol로 보는 경우가 많습니다."
              />
              <NoteRow
                title="ICMP는 L4가 아니다"
                body="ICMP는 port를 쓰는 transport protocol이 아닙니다. IP 계층의 제어와 오류 전달에 가까운 protocol입니다. ping이 된다고 TCP 443 연결이나 HTTP 요청이 된다는 뜻은 아닙니다."
              />
              <NoteRow
                title="BGP는 TCP 위에서 동작하지만 역할은 routing이다"
                body="BGP session은 TCP 179번 port를 사용합니다. 하지만 BGP의 목적은 application data 전달이 아니라 network 간 route 정보를 교환하는 것입니다. 계층을 볼 때는 운반 방식과 역할을 함께 봐야 합니다."
              />
              <NoteRow
                title="TLS는 어느 계층인가"
                body="TLS는 OSI 7계층에 딱 맞게 들어맞지 않습니다. HTTP와 TCP 사이에서 동작하며 암호화, 인증, 무결성을 제공합니다. 실무에서는 Presentation 또는 Application과 Transport 사이의 보안 계층으로 설명하는 것이 자연스럽습니다."
              />
              <NoteRow
                title="QUIC은 UDP인데 TCP를 대체한다"
                body="QUIC packet은 UDP datagram 안에 실립니다. 하지만 QUIC 자체는 연결, stream multiplexing, TLS 기반 보안, 손실 복구 같은 transport 기능을 제공합니다. 그래서 단순히 UDP application protocol이라고만 보면 부족합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 분석할 때 계층별로 묻는 질문
            </h2>
            <CodeBlock
              code={`L1 Physical
  - link가 up 상태인가?
  - cable, wireless signal, NIC, duplex 문제가 있는가?

L2 Data Link
  - 같은 VLAN인가?
  - ARP 또는 Neighbor Discovery가 되는가?
  - switch MAC table과 VLAN tagging이 맞는가?

L3 Network
  - IP, subnet, gateway, route table이 맞는가?
  - ICMP error가 오는가?
  - NAT, firewall, security group이 막는가?

L4 Transport
  - TCP handshake가 되는가?
  - port가 listen 중인가?
  - UDP datagram이 도달하는가?

L5-L6 Session / Presentation
  - TLS handshake와 certificate validation이 통과하는가?
  - encoding, serialization, compression이 맞는가?

L7 Application
  - HTTP method, path, host, header, auth, CORS, body가 맞는가?
  - application log에 요청이 남는가?`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                L1은 bit를 신호로 바꾸고, L2는 같은 link 안에서 frame을 전달합니다.
                L3는 IP packet을 network 사이에서 routing하고, L4는 TCP/UDP 같은
                transport protocol로 process endpoint와 전달 방식을 정합니다. L5~L7은
                session, 표현, application 의미를 다루지만 실제 인터넷에서는 Application
                영역으로 함께 묶이는 경우가 많습니다.
              </p>
              <p>
                프로토콜을 외울 때는 이름만 외우면 금방 섞입니다. 이 protocol이 어떤
                주소를 보는지, 어떤 header를 추가하는지, 어떤 장비나 로그에서 관측되는지,
                장애가 나면 어떤 증상으로 나타나는지까지 같이 봐야 합니다.
              </p>
              <p>
                실무에서 중요한 것은 계층을 완벽히 암기하는 것이 아니라 문제를 좁히는
                것입니다. “HTTP가 안 된다”는 말을 들었을 때 DNS, TCP, TLS, HTTP, routing,
                firewall 중 어디까지 통과했는지 순서대로 확인할 수 있으면 됩니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}



function ProtocolRow({
  title,
  protocols,
  body,
}: {
  title: string;
  protocols: string;
  body: string;
}) {
  return (
    <section className="border-t border-[#e5e5e5] py-5 first:border-t-0">
      <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
        {title}
      </h3>
      <p className="mt-2 font-mono text-sm leading-relaxed tracking-normal text-black">
        {protocols}
      </p>
      <p className="mt-2 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
        {body}
      </p>
    </section>
  );
}
