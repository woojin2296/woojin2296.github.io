import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "DNS 플로우와 레코드를 운영 관점에서 이해하기 | Blog",
  description:
    "DNS resolution flow, resolver, authoritative zone, DNS message, TTL, delegation, 주요 레코드 타입과 장애 분석 방법 정리",
};

const references = [
  {
    label: "RFC 1034 - Domain Names: Concepts and Facilities",
    href: "https://datatracker.ietf.org/doc/html/rfc1034",
  },
  {
    label: "RFC 1035 - Domain Names: Implementation and Specification",
    href: "https://datatracker.ietf.org/doc/html/rfc1035",
  },
  {
    label: "RFC 2308 - Negative Caching of DNS Queries",
    href: "https://datatracker.ietf.org/doc/html/rfc2308",
  },
  {
    label: "RFC 3596 - DNS Extensions to Support IPv6",
    href: "https://datatracker.ietf.org/doc/html/rfc3596",
  },
  {
    label: "RFC 4033 - DNS Security Introduction and Requirements",
    href: "https://datatracker.ietf.org/doc/html/rfc4033",
  },
  {
    label: "RFC 8659 - DNS CAA Resource Record",
    href: "https://datatracker.ietf.org/doc/html/rfc8659",
  },
  {
    label: "RFC 2782 - DNS SRV Resource Record",
    href: "https://datatracker.ietf.org/doc/html/rfc2782",
  },
  {
    label: "RFC 8484 - DNS Queries over HTTPS",
    href: "https://datatracker.ietf.org/doc/html/rfc8484",
  },
];

export default function DnsBlogPostPage() {
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
              Network / DNS · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[680px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              DNS 플로우와 레코드를 운영 관점에서 이해하기
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              DNS는 도메인을 IP로 바꾸는 기능만 하는 단일 서버가 아니라, 계층적
              namespace, 위임, 캐시, resolver, authoritative zone, resource record가
              함께 동작하는 분산 데이터베이스입니다. 실제 장애 분석에서 필요한
              resolution flow와 record 타입을 중심으로 정리합니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              DNS가 해결하는 문제
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                애플리케이션은 보통{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  api.example.com
                </code>
                같은 이름으로 외부 서비스나 내부 서비스를 호출합니다. 하지만 TCP,
                UDP, TLS 연결이 실제로 도달하려면 최종적으로 IP 주소와 포트가
                필요합니다. DNS는 이 이름을 주소 또는 다른 이름, 메일 서버,
                인증서 발급 정책, 서비스 위치 같은{" "}
                <strong className="font-medium text-black">
                  typed resource data
                </strong>
                로 해석하는 체계입니다.
              </p>
              <p>
                중요한 점은 DNS가 하나의 중앙 테이블이 아니라는 것입니다. root
                zone은 TLD를 위임하고, TLD는 각 도메인의 authoritative name server를
                위임하며, authoritative name server가 해당 zone의 실제 record를
                응답합니다. recursive resolver는 이 과정을 사용자 대신 수행하고,
                결과를 TTL 동안 캐시해 다음 요청을 빠르게 처리합니다.
              </p>
              <p>
                그래서 DNS 장애는 단순히 “도메인이 안 된다”로 끝나지 않습니다.
                local cache 문제인지, recursive resolver 문제인지, delegation
                문제인지, authoritative zone record 문제인지, DNSSEC 검증 실패인지,
                내부망 split-horizon DNS 문제인지에 따라 확인 지점이 완전히
                달라집니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              구성 요소
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              DNS flow를 이해하려면 “누가 질의하는가”와 “누가 권한 있는 답을
              가지고 있는가”를 분리해야 합니다. resolver와 name server는 같은 DNS
              프로토콜을 쓰지만 역할이 다릅니다.
            </p>
            <div className="mt-6">
              <NoteRow
                title="Stub Resolver"
                body="애플리케이션 또는 OS가 사용하는 얇은 resolver입니다. 보통 직접 root, TLD, authoritative server를 순회하지 않고, 설정된 recursive resolver에 질의를 넘깁니다. Linux에서는 glibc resolver, systemd-resolved, nscd, /etc/resolv.conf 같은 요소와 연결됩니다."
              />
              <NoteRow
                title="Recursive Resolver"
                body="클라이언트를 대신해 최종 답을 찾는 resolver입니다. ISP DNS, 회사 내부 DNS, 1.1.1.1, 8.8.8.8 같은 public resolver가 이 역할을 합니다. RD flag가 켜진 query를 받고, root부터 authoritative server까지 순회한 뒤 최종 answer를 반환합니다."
              />
              <NoteRow
                title="Root Name Server"
                body="DNS hierarchy의 최상단 zone인 root zone을 담당합니다. 특정 TLD의 authoritative name server 정보를 referral로 알려줍니다. 예를 들어 example.com 질의라면 .com TLD name server로 가야 한다는 정보를 반환합니다."
              />
              <NoteRow
                title="TLD Name Server"
                body=".com, .net, .kr 같은 top-level domain zone을 담당합니다. 특정 second-level domain의 authoritative name server를 알려주는 delegation 정보를 반환합니다."
              />
              <NoteRow
                title="Authoritative Name Server"
                body="특정 zone의 원본 record를 보유하고 권한 있는 응답을 반환하는 서버입니다. A, AAAA, CNAME, MX, TXT, CAA, SOA, NS 같은 record는 최종적으로 authoritative zone에서 관리됩니다."
              />
              <NoteRow
                title="Zone"
                body="관리 책임이 위임된 DNS namespace 범위입니다. example.com zone은 example.com과 그 하위 이름의 record를 가질 수 있고, 필요하면 sub.example.com을 다른 name server로 다시 위임할 수 있습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              DNS Resolution Flow
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                사용자가 브라우저에서{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  www.example.com
                </code>
                을 입력하면 브라우저가 곧바로 authoritative server에 접근하는 것이
                아닙니다. 브라우저, OS, local resolver, recursive resolver의 캐시를
                먼저 확인하고, cache miss일 때 recursive resolver가 root, TLD,
                authoritative server를 순차적으로 조회합니다.
              </p>
              <p>
                client와 recursive resolver 사이에서는 일반적으로 recursion을
                요청합니다. 반면 recursive resolver가 root, TLD, authoritative server를
                따라가는 과정은 referral을 받아 다음 name server로 이동하는 iterative
                resolution에 가깝습니다. 이 차이를 알면{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  dig +trace
                </code>
                결과를 읽을 때 어느 단계에서 멈췄는지 판단하기 쉽습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/dns-flow.png"
              alt="DNS resolution flow와 주요 DNS record 타입을 정리한 다이어그램"
              width={1672}
              height={1120}
              caption="Recursive resolver는 root, TLD, authoritative name server를 따라가며 최종 RRset을 얻고, TTL 기준으로 positive answer와 negative answer를 캐시합니다."
            />
            <ol className="mt-8 grid gap-3 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <li>
                브라우저 또는 애플리케이션이 이름 해석을 요청합니다. 이때
                브라우저 자체 DNS cache, OS cache, hosts file, local resolver 설정이
                먼저 영향을 줄 수 있습니다.
              </li>
              <li>
                stub resolver가 설정된 recursive resolver로 query를 보냅니다. 내부망
                서버라면 외부 public resolver가 아니라 조직 내부 DNS를 사용해야 하는
                경우가 있습니다.
              </li>
              <li>
                recursive resolver에 cache hit가 있으면 바로 응답합니다. cache miss면
                root name server에 질의해 해당 TLD의 name server를 받습니다.
              </li>
              <li>
                recursive resolver는 TLD name server에 다시 질의하고, 도메인 zone의
                authoritative name server와 필요 시 glue address를 받습니다.
              </li>
              <li>
                authoritative name server에 최종 이름과 record type을 질의합니다.
                응답은 A, AAAA, CNAME, MX, TXT 같은 RRset일 수 있고, 이름이 없으면
                NXDOMAIN, record type만 없으면 NODATA 형태가 될 수 있습니다.
              </li>
              <li>
                recursive resolver는 응답을 TTL 기준으로 캐시하고 stub resolver에
                반환합니다. 클라이언트는 반환된 IP 또는 CNAME chain을 따라 최종
                주소를 얻고 TCP/TLS 연결을 시작합니다.
              </li>
            </ol>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              DNS Message와 Packet 구조
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DNS는 보통 UDP/53으로 query와 response를 주고받습니다. 응답이
                커지거나 TC(truncated) bit가 설정된 경우, zone transfer처럼 신뢰성
                있는 전송이 필요한 경우에는 TCP/53이 사용됩니다. 현대 DNS에서는
                EDNS(Extension Mechanisms for DNS)로 UDP payload 크기, DNSSEC 관련
                flag, 추가 옵션을 확장해 쓰는 경우도 많습니다.
              </p>
              <p>
                DNS message는 header, question, answer, authority, additional
                section으로 나뉩니다. query에는 보통 question section만 있고,
                response에는 answer section에 실제 RRset이 들어가며, delegation
                상황에서는 authority section에 NS record가, additional section에
                glue address가 들어갈 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/dns-message-structure.png"
              alt="DNS query와 response message를 header, question, answer, authority, additional section으로 나눠 보여주는 구조 다이어그램"
              width={1440}
              height={900}
              caption="DNS response를 section 단위로 나누면 answer가 없는 NOERROR, delegation referral, glue address, EDNS OPT 같은 응답 차이를 더 명확히 읽을 수 있습니다."
            />
            <div className="mt-6">
              <NoteRow
                title="Header"
                body="ID, QR, Opcode, AA, TC, RD, RA, RCODE, QDCOUNT, ANCOUNT, NSCOUNT, ARCOUNT 같은 필드가 들어갑니다. RD는 recursion desired, RA는 recursion available, AA는 authoritative answer, RCODE는 NOERROR, NXDOMAIN, SERVFAIL 같은 결과를 표현합니다."
              />
              <NoteRow
                title="Question Section"
                body="QNAME, QTYPE, QCLASS가 들어갑니다. 예를 들어 www.example.com의 IPv4 주소를 묻는다면 QNAME은 www.example.com, QTYPE은 A, QCLASS는 IN이 됩니다."
              />
              <NoteRow
                title="Answer Section"
                body="질의에 대한 직접 answer RRset이 들어갑니다. A query에 A record가 들어갈 수도 있고, 먼저 CNAME이 들어간 뒤 canonical name에 대한 A/AAAA record가 함께 들어갈 수도 있습니다."
              />
              <NoteRow
                title="Authority Section"
                body="응답을 직접 제공하지 못하고 다른 authoritative server로 위임할 때 NS record가 담깁니다. negative response에서는 SOA record가 들어가 negative caching TTL 계산에 사용될 수 있습니다."
              />
              <NoteRow
                title="Additional Section"
                body="응답 처리에 필요한 보조 record가 들어갑니다. 대표적으로 delegation 응답의 glue A/AAAA record, EDNS OPT pseudo-record, 일부 MX/NS/SRV 처리에 필요한 address record가 들어갈 수 있습니다."
              />
            </div>
            <CodeBlock
              code={`DNS response message

Header
  ID=0x4a31 QR=1 Opcode=QUERY AA=0 TC=0 RD=1 RA=1 RCODE=NOERROR
  QDCOUNT=1 ANCOUNT=1 NSCOUNT=0 ARCOUNT=1

Question
  www.example.com. IN A

Answer
  www.example.com. 300 IN A 93.184.216.34

Additional
  EDNS OPT UDPSize=1232 DO=0`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Resource Record의 기본 구조
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              DNS record는 단순한 key-value가 아닙니다. 하나의 record는 owner name,
              TTL, class, type, RDATA를 가집니다. 같은 owner name, class, type을 가진
              record 집합은 RRset으로 취급되며, resolver는 RRset 단위로 캐시하고
              반환합니다.
            </p>
            <CodeBlock
              code={`; owner name        TTL   class  type   RDATA
www.example.com.    300   IN     A      93.184.216.34
www.example.com.    300   IN     AAAA   2606:2800:220:1:248:1893:25c8:1946
example.com.        300   IN     MX     10 mail.example.com.
example.com.        300   IN     TXT    "v=spf1 include:_spf.example.net ~all"`}
            />
            <div className="mt-6">
              <NoteRow
                title="Owner Name"
                body="record가 붙어 있는 이름입니다. www.example.com과 example.com은 서로 다른 owner name입니다. zone apex는 example.com 자체를 의미합니다."
              />
              <NoteRow
                title="TTL"
                body="resolver가 해당 RRset을 캐시할 수 있는 최대 시간입니다. TTL을 낮추면 변경 전파가 빨라질 수 있지만 query 부하가 늘고, 이미 캐시된 기존 응답은 기존 TTL이 끝날 때까지 남을 수 있습니다."
              />
              <NoteRow
                title="Class"
                body="현대 인터넷 DNS에서는 대부분 IN class를 사용합니다. DNS 표준은 class 개념을 가지고 있지만 일반적인 웹/메일 운영에서는 IN만 보게 되는 경우가 많습니다."
              />
              <NoteRow
                title="Type"
                body="RDATA가 어떤 의미인지 정의합니다. A는 IPv4 주소, AAAA는 IPv6 주소, MX는 메일 exchanger, TXT는 텍스트 metadata, CAA는 인증서 발급 권한 정책을 나타냅니다."
              />
              <NoteRow
                title="RDATA"
                body="type별 실제 데이터입니다. A record의 RDATA는 IPv4 주소이고, MX record의 RDATA는 preference와 mail exchanger name이며, SOA record의 RDATA는 primary name server, responsible mailbox, serial, refresh, retry, expire, minimum 값을 포함합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              주요 Record 타입
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              DNS record는 목적에 따라 해석 방식이 다릅니다. 특히 CNAME, MX, NS,
              CAA처럼 다른 이름을 가리키는 record는 추가 lookup, delegation, 인증서
              발급 정책과 연결되므로 단순 주소 record처럼 다루면 장애를 만들 수
              있습니다.
            </p>
            <div className="mt-6">
              <NoteRow
                title="SOA"
                body="Start of Authority record입니다. zone의 primary name server, responsible mailbox, serial, refresh, retry, expire, minimum 값을 담습니다. secondary DNS의 zone transfer 판단과 negative caching에 중요한 기준이 됩니다."
              />
              <NoteRow
                title="NS"
                body="zone을 담당하는 authoritative name server를 나타냅니다. parent zone에 있는 NS delegation과 child zone apex의 NS record가 서로 일관되어야 합니다. parent delegation이 틀리면 authoritative zone 안의 record가 맞아도 외부에서 도달하지 못합니다."
              />
              <NoteRow
                title="A"
                body="이름을 IPv4 주소로 매핑합니다. 웹 서비스에서 가장 흔히 확인하는 record입니다. 여러 A record를 같은 name에 둘 수 있으며 resolver는 RRset으로 반환합니다."
              />
              <NoteRow
                title="AAAA"
                body="이름을 IPv6 주소로 매핑합니다. IPv6 연결성이 불완전한 환경에서 AAAA만 있거나 잘못된 AAAA가 있으면 클라이언트의 Happy Eyeballs 동작과 timeout 양상에 영향을 줄 수 있습니다."
              />
              <NoteRow
                title="CNAME"
                body="하나의 이름을 canonical name으로 alias 처리합니다. CNAME owner name에는 일반적으로 다른 data record를 함께 둘 수 없으므로, zone apex에 CNAME을 직접 두는 것은 표준 DNS 모델과 충돌합니다. 일부 DNS provider의 ALIAS/ANAME은 provider가 제공하는 별도 기능입니다."
              />
              <NoteRow
                title="MX"
                body="메일을 받을 mail exchanger를 preference와 함께 지정합니다. MX의 target은 다시 A/AAAA record로 해석되어야 하며, CNAME을 target으로 두는 구성은 피하는 것이 안전합니다."
              />
              <NoteRow
                title="TXT"
                body="임의 텍스트 metadata를 담습니다. SPF, DKIM, DMARC, 서비스 소유권 검증, SaaS 연동 검증에 자주 사용됩니다. TXT는 의미를 DNS가 해석하는 것이 아니라 사용하는 애플리케이션 프로토콜이 해석합니다."
              />
              <NoteRow
                title="CAA"
                body="해당 도메인의 인증서를 발급할 수 있는 Certificate Authority를 제한합니다. 예를 들어 Let's Encrypt만 허용하도록 CAA를 설정하면 다른 CA의 발급 시도가 실패할 수 있습니다."
              />
              <NoteRow
                title="SRV"
                body="서비스 이름과 프로토콜에 대해 target host와 port, priority, weight를 제공합니다. _service._proto.name 형식으로 사용되며, LDAP, SIP, XMPP, Kubernetes headless service 등에서 볼 수 있습니다."
              />
              <NoteRow
                title="PTR"
                body="IP 주소를 이름으로 역방향 조회할 때 사용합니다. IPv4는 in-addr.arpa, IPv6는 ip6.arpa namespace를 사용합니다. 메일 서버 운영에서는 reverse DNS와 forward DNS 일관성이 평판과 수신 정책에 영향을 줄 수 있습니다."
              />
              <NoteRow
                title="DNSSEC Records"
                body="DNSKEY, DS, RRSIG, NSEC, NSEC3 같은 record는 DNSSEC 검증에 사용됩니다. 데이터의 기밀성을 제공하지는 않지만, 응답이 zone owner가 서명한 데이터인지와 중간에서 변조되지 않았는지를 검증하는 데 사용됩니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Delegation과 Glue Record
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                delegation은 DNS hierarchy에서 특정 namespace의 권한을 다른 name
                server로 넘기는 동작입니다. 예를 들어 root zone은{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  .com
                </code>
                을 .com TLD name server로 위임하고, .com TLD zone은{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  example.com
                </code>
                을 example.com의 authoritative name server로 위임합니다.
              </p>
              <p>
                glue record는 위임된 name server 이름을 해석하기 위해 필요한 주소
                record입니다. 만약 example.com의 authoritative name server가{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  ns1.example.com
                </code>
                처럼 같은 child zone 안에 있다면, resolver는 ns1.example.com의 주소를
                알기 위해 다시 example.com zone이 필요해지는 순환 의존에 빠집니다.
                parent zone은 이 문제를 피하기 위해 additional section에 glue A/AAAA를
                제공할 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/dns-delegation-glue.png"
              alt="parent zone delegation과 in-bailiwick name server의 glue record가 recursive resolver의 순환 의존을 끊는 구조 다이어그램"
              width={1440}
              height={900}
              caption="in-bailiwick name server를 위임할 때 parent zone의 glue record는 resolver가 child zone에 처음 도달하기 위해 필요한 주소 힌트가 됩니다."
            />
            <CodeBlock
              code={`; parent zone delegation example
example.com.      172800 IN NS ns1.example.com.
example.com.      172800 IN NS ns2.example.net.

; glue address for in-bailiwick name server
ns1.example.com.  172800 IN A  192.0.2.10
ns1.example.com.  172800 IN AAAA 2001:db8::10`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              TTL과 Cache의 실제 의미
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                TTL은 “전 세계 DNS가 이 시간 안에 반드시 바뀐다”는 뜻이 아닙니다.
                authoritative server가 RRset에 제시하는 최대 cache lifetime이고,
                recursive resolver와 일부 client cache가 그 값을 기준으로 응답을
                재사용합니다. record를 바꾸기 전에 TTL을 낮췄더라도, 이미 기존 높은
                TTL로 캐시된 응답은 그 TTL이 끝날 때까지 남을 수 있습니다.
              </p>
              <p>
                negative caching도 중요합니다. NXDOMAIN이나 NODATA 응답은 “없음”도
                일정 시간 캐시될 수 있음을 의미합니다. 새 record를 만들었는데 일부
                환경에서 계속 없다고 나오는 경우, 이전 negative response가 resolver에
                남아 있을 수 있습니다.
              </p>
              <p>
                운영에서 TTL은 변경 속도와 resolver 부하 사이의 trade-off입니다.
                장애 전환이나 migration 전에는 TTL을 미리 낮추고, 안정화 이후 다시
                적절한 값으로 올리는 방식이 일반적입니다. 다만 너무 낮은 TTL은 모든
                resolver가 그대로 존중하지 않을 수 있고, query 비용과 authoritative
                server 부하를 늘립니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              DNSSEC, DoT, DoH의 위치
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DNSSEC는 DNS 응답의 출처와 무결성을 검증하기 위한 확장입니다.
                zone은 record에 RRSIG를 붙이고, 상위 zone은 DS record를 통해 하위
                zone의 DNSKEY를 연결합니다. validating resolver는 root trust anchor부터
                TLD, domain zone으로 이어지는 chain of trust를 검증합니다.
              </p>
              <p>
                DNSSEC는 DNS 데이터를 암호화하지 않습니다. 누가 어떤 이름을 질의하는지
                숨기는 기능은 DoT(DNS over TLS), DoH(DNS over HTTPS), DoQ(DNS over
                QUIC) 같은 전송 계층 보안 확장과 관련됩니다. 즉 DNSSEC는 data
                authentication과 integrity, DoT/DoH는 resolver 통신 구간의 privacy와
                transport security에 더 가깝습니다.
              </p>
              <p>
                DNSSEC 장애는 종종 SERVFAIL로 보입니다. record 자체는 authoritative
                server에 있어도 DS/DNSKEY/RRSIG/NSEC chain이 맞지 않으면 validating
                resolver가 응답을 거절할 수 있습니다. 이때 DNSSEC 검증을 하지 않는
                resolver에서는 정상이고, 검증 resolver에서만 실패하는 차이가 생깁니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 분석 흐름
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              DNS 문제를 볼 때는 “어떤 resolver에서”, “어떤 type을”, “어떤 이름으로”,
              “어떤 RCODE와 section을 받았는지”를 분리해야 합니다. 단순히 ping이
              실패했다는 사실만으로는 DNS 문제와 ICMP 차단, 네트워크 라우팅 문제를
              구분할 수 없습니다.
            </p>
            <CodeBlock
              code={`# 1. OS가 사용하는 resolver 확인
cat /etc/resolv.conf
resolvectl status

# 2. 기본 resolver와 public resolver 결과 비교
dig www.example.com A
dig @1.1.1.1 www.example.com A
dig @8.8.8.8 www.example.com A

# 3. delegation 흐름 추적
dig +trace www.example.com A

# 4. authoritative name server에 직접 질의
dig @ns1.example.com www.example.com A +norecurse

# 5. 응답 코드와 section 확인
dig www.example.com A +noall +answer +authority +additional +comments`}
            />
            <div className="mt-6">
              <NoteRow
                title="NOERROR with answer"
                body="질의한 이름과 type에 대한 RRset이 존재합니다. 값이 기대와 다르면 authoritative zone record 또는 stale cache를 확인합니다."
              />
              <NoteRow
                title="NOERROR with no answer"
                body="이름은 존재하지만 질의한 type의 record가 없을 때 나타날 수 있습니다. 예를 들어 A는 없고 AAAA만 있거나, MX는 없지만 SOA는 있는 경우입니다."
              />
              <NoteRow
                title="NXDOMAIN"
                body="질의한 이름이 존재하지 않는다는 응답입니다. 오타, zone 미생성, record 생성 전 negative cache, 잘못된 search domain 확장을 확인합니다."
              />
              <NoteRow
                title="SERVFAIL"
                body="resolver가 정상 답을 만들지 못했습니다. authoritative server 장애, DNSSEC validation 실패, timeout, lame delegation, resolver 정책 문제를 의심합니다."
              />
              <NoteRow
                title="Timeout"
                body="응답 자체가 오지 않는 상황입니다. 방화벽, UDP/53 차단, TCP fallback 실패, 내부 DNS 접근 경로, 라우팅, resolver 주소 설정을 확인합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영 체크리스트
            </h2>
            <div className="mt-6">
              <NoteRow
                title="내부망은 내부 DNS 요구사항을 먼저 확인한다"
                body="회사, 학교, VPC, VPN 환경에서는 public DNS가 내부 도메인을 알지 못하거나 외부로 나가는 DNS가 차단될 수 있습니다. IP 직접 통신은 되는데 도메인만 실패하면 /etc/resolv.conf, DHCP DNS option, split-horizon DNS를 먼저 확인합니다."
              />
              <NoteRow
                title="record 변경 전 TTL을 미리 낮춘다"
                body="migration 당일에 TTL을 낮추면 이미 캐시된 resolver에는 효과가 없습니다. 기존 TTL이 충분히 지나기 전에 미리 낮추고, 전환 후 안정화되면 다시 조정합니다."
              />
              <NoteRow
                title="CNAME chain을 짧게 유지한다"
                body="CNAME이 여러 단계를 거치면 lookup 횟수와 장애 지점이 늘어납니다. CDN, SaaS, load balancer 연동에서는 최종 A/AAAA까지 정상적으로 따라갈 수 있는지 확인합니다."
              />
              <NoteRow
                title="apex record 제약을 이해한다"
                body="example.com 같은 zone apex에는 SOA와 NS가 필요하므로 표준 CNAME과 충돌합니다. provider가 제공하는 ALIAS/ANAME/flattening 기능은 DNS 표준 CNAME이 아니라 provider가 응답 생성 시 처리하는 기능입니다."
              />
              <NoteRow
                title="메일 관련 record는 함께 본다"
                body="MX만 있다고 메일이 정상 동작하지 않습니다. MX target의 A/AAAA, PTR, SPF TXT, DKIM TXT, DMARC TXT, TLS 인증서, 수신 서버 정책이 함께 맞아야 합니다."
              />
              <NoteRow
                title="인증서 발급 실패 시 CAA를 확인한다"
                body="CAA record가 특정 CA만 허용하면 다른 CA에서 인증서 발급이 거절될 수 있습니다. Let's Encrypt, AWS ACM, Cloudflare 같은 발급 주체가 실제 CAA 정책에 포함되어 있는지 확인합니다."
              />
              <NoteRow
                title="DNSSEC 변경은 chain 전체를 검증한다"
                body="DNSSEC를 켠 zone에서 registrar DS record와 authoritative DNSKEY가 어긋나면 validating resolver에서 SERVFAIL이 발생할 수 있습니다. DNS provider 이전 시 DS를 먼저 정리해야 하는 경우가 있습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DNS는 browser에서 authoritative server로 한 번에 질의하는 구조가
                아니라, stub resolver와 recursive resolver, root, TLD, authoritative
                server, cache가 함께 만드는 흐름입니다. 장애를 분석할 때는 이 흐름의
                어느 지점에서 실패했는지 먼저 분리해야 합니다.
              </p>
              <p>
                record 측면에서는 A/AAAA만 보는 것으로 충분하지 않습니다. NS와 SOA는
                zone 권한과 negative caching에 영향을 주고, CNAME은 이름 alias와 추가
                lookup을 만들며, MX/TXT/CAA/SRV/PTR/DNSSEC record는 메일, 인증서,
                서비스 발견, 보안 검증 같은 운영 기능과 직접 연결됩니다. DNS를
                정확히 보려면 “이름”, “type”, “resolver”, “authoritative source”,
                “TTL”을 항상 함께 봐야 합니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
