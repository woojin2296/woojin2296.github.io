import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "포트와 소켓은 같은 게 아니다 | Blog",
  description:
    "네트워크 관점에서 port와 socket의 차이, TCP listener와 established socket, 4-tuple 기반 demultiplexing, 하나의 포트에 여러 사용자가 동시에 접속할 수 있는 이유를 정리한 글",
};

const references = [
  {
    label: "RFC 9293 - Transmission Control Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc9293",
  },
  {
    label: "RFC 768 - User Datagram Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc768",
  },
  {
    label: "RFC 791 - Internet Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc791",
  },
  {
    label: "IANA - Service Name and Transport Protocol Port Number Registry",
    href: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml",
  },
];

export default function NetworkPortSocketBlogPostPage() {
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
              Network / TCP · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              포트와 소켓은 같은 게 아니다
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              서버가 443번 포트 하나만 열어두었는데 어떻게 수백 명이 동시에
              접속할 수 있을까요. 답은 포트가 연결 자체가 아니라 transport header의
              번호이고, 실제 연결 상태는 커널의 socket table에서 더 넓은 key로
              관리된다는 데 있습니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              포트는 문이 아니라 번호다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                포트를 설명할 때 흔히 “서버의 문”이라고 표현합니다. 입문 단계에서는
                괜찮은 비유지만 내부 동작을 이해하려면 조금 더 정확히 봐야 합니다.
                포트는 TCP나 UDP header 안에 들어있는 16bit 숫자입니다. 범위는{" "}
                <InlineCode>0</InlineCode>부터 <InlineCode>65535</InlineCode>까지이고,
                이 숫자는 같은 IP 주소 안에서 어느 application endpoint로 전달할지
                구분하는 데 사용됩니다.
              </p>
              <p>
                IP 주소가 “어느 host인가”를 가리킨다면, 포트는 그 host 안에서 “어느
                transport endpoint인가”를 가리킵니다. 그래서{" "}
                <InlineCode>203.0.113.10:443</InlineCode>이라는 표현은
                203.0.113.10이라는 IP를 가진 host의 TCP 또는 UDP 443번 endpoint를
                의미합니다.
              </p>
              <p>
                중요한 점은 TCP 443과 UDP 443은 서로 다른 공간이라는 것입니다. 둘 다
                숫자는 443이지만 protocol이 다릅니다. HTTP/1.1과 HTTP/2는 보통 TCP
                443 위에서 동작하고, HTTP/3는 UDP 443 위에서 QUIC을 사용합니다. 포트
                번호만 보지 말고 항상 protocol과 함께 봐야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              소켓은 커널이 가진 통신 endpoint다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                socket은 포트 번호 자체가 아니라 운영체제 커널이 관리하는 통신 객체입니다.
                애플리케이션은 <InlineCode>socket()</InlineCode>으로 socket을 만들고,
                <InlineCode>bind()</InlineCode>로 local IP와 local port를 붙인 뒤,
                TCP 서버라면 <InlineCode>listen()</InlineCode>과{" "}
                <InlineCode>accept()</InlineCode>로 연결을 받습니다.
              </p>
              <p>
                프로세스 입장에서는 socket이 file descriptor처럼 보입니다. 하지만
                커널 내부에서는 protocol, local address, local port, remote address,
                remote port, TCP state, receive buffer, send buffer, retransmission
                timer, sequence number 같은 상태가 함께 묶여 있습니다.
              </p>
              <p>
                따라서 socket을 “포트”라고 부르면 핵심을 놓칩니다. 포트는 socket을
                찾기 위한 key의 일부이고, socket은 실제 통신 상태와 buffer를 가진
                커널 객체입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/port-socket-demux.png"
              alt="IP layer와 TCP UDP transport layer가 protocol, IP, port를 보고 kernel socket을 찾는 demultiplexing 다이어그램"
              width={1440}
              height={900}
              caption="패킷이 들어오면 커널은 IP 계층에서 local IP를 확인하고, TCP/UDP 계층에서 port와 socket table을 조회합니다. 포트는 socket lookup key의 일부일 뿐입니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              하나의 포트에 여러 사용자가 붙는 이유
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                TCP 연결은 서버의 local port 하나만으로 식별되지 않습니다. TCP 연결을
                구분하는 대표적인 key는{" "}
                <strong className="font-medium text-black">
                  source IP, source port, destination IP, destination port
                </strong>
                입니다. 여기에 protocol까지 붙여 생각하면 더 정확합니다. 이 조합을
                보통 4-tuple이라고 부릅니다.
              </p>
              <p>
                예를 들어 서버가 <InlineCode>203.0.113.10:443</InlineCode>에서
                listen하고 있다고 해보겠습니다. 사용자 A는{" "}
                <InlineCode>10.0.0.21:53144</InlineCode>에서 접속하고, 사용자 B는{" "}
                <InlineCode>10.0.0.22:53145</InlineCode>에서 접속합니다. 서버 입장에서는
                둘 다 destination port가 443이지만 source IP와 source port가 다르기
                때문에 서로 다른 TCP connection으로 구분됩니다.
              </p>
              <p>
                같은 사용자 한 명이 같은 서버에 여러 connection을 열 수도 있습니다.
                이때도 client OS가 보통 ephemeral port를 다르게 할당합니다. 하나는{" "}
                <InlineCode>53144</InlineCode>, 다른 하나는{" "}
                <InlineCode>53145</InlineCode>처럼 source port가 달라지면 같은 서버
                443번 포트로 향해도 connection tuple은 달라집니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/port-socket-connection-table.png"
              alt="여러 client가 같은 server local port 443으로 접속하지만 source IP와 source port가 달라 kernel connection table에서 서로 다른 4-tuple로 관리되는 다이어그램"
              width={1440}
              height={900}
              caption="서버 포트 443은 반복됩니다. 하지만 TCP connection은 local port 하나가 아니라 source IP, source port, destination IP, destination port의 조합으로 구분됩니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              listen socket과 established socket은 다르다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                TCP 서버에는 먼저 listen socket이 있습니다. 이 socket은{" "}
                <InlineCode>0.0.0.0:443</InlineCode> 또는 특정 IP의{" "}
                <InlineCode>:443</InlineCode>에 bind되어 “이 endpoint로 들어오는
                연결 요청을 받겠다”는 상태입니다. 이 socket 하나가 포트를 열어두는
                역할을 합니다.
              </p>
              <p>
                클라이언트가 SYN을 보내면 커널은 해당 패킷의 destination IP와
                destination port를 보고 listen socket을 찾습니다. TCP handshake가
                진행되고 연결이 수립되면, 커널은 listen socket 자체를 클라이언트와
                통신하는 데 쓰지 않습니다. 대신 그 client와 server의 4-tuple을 가진
                새로운 established socket을 만듭니다.
              </p>
              <p>
                애플리케이션이 <InlineCode>accept()</InlineCode>를 호출하면 커널은
                이 established socket을 새로운 file descriptor로 넘겨줍니다. 그래서
                서버 프로세스 하나가 listener fd 하나를 가지고 있으면서도, 동시에
                수백 개의 accepted socket fd를 처리할 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/port-socket-listen-accept.png"
              alt="bind listen accept 흐름에서 listener socket과 accepted socket이 분리되는 TCP 서버 내부 구조 다이어그램"
              width={1440}
              height={900}
              caption="listen socket은 포트를 열어두고, accept 이후에는 연결마다 별도의 established socket이 생깁니다. 하나의 포트에 여러 사용자가 붙을 수 있는 핵심 구조입니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              커널은 들어온 패킷을 어떻게 나누는가
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                패킷이 NIC를 통해 들어오면 IP 계층은 destination IP가 이 host의 주소인지
                확인합니다. 그 다음 IP header의 protocol field를 보고 TCP인지 UDP인지
                구분합니다. TCP라면 TCP header의 destination port를 읽고 socket table을
                조회합니다.
              </p>
              <p>
                이미 수립된 TCP connection의 packet이라면 커널은 4-tuple과 TCP state를
                기준으로 established socket을 찾습니다. 아직 연결을 시작하는 SYN이라면
                local IP와 local port에 맞는 listen socket을 찾습니다. 이 과정이
                demultiplexing입니다. 하나의 물리 NIC와 하나의 IP, 하나의 port로 들어온
                traffic이 커널 내부에서 각 socket으로 나뉘는 것입니다.
              </p>
              <p>
                애플리케이션 구조는 다양합니다. 요청마다 thread를 붙일 수도 있고,
                worker pool을 둘 수도 있고, Nginx나 Node.js처럼 event loop 기반으로
                많은 socket을 multiplexing할 수도 있습니다. 중요한 것은 “포트가
                사용자 수만큼 늘어나는 것”이 아니라 “socket과 connection state가
                사용자 수만큼 늘어나는 것”입니다.
              </p>
            </div>
            <CodeBlock
              code={`# 개념적으로 보면 커널에는 이런 table이 있다.

LISTEN:
  TCP 0.0.0.0:443 -> nginx listener socket fd=3

ESTABLISHED:
  TCP 10.0.0.21:53144 -> 203.0.113.10:443 -> socket fd=18
  TCP 10.0.0.22:53145 -> 203.0.113.10:443 -> socket fd=19
  TCP 10.0.0.23:53146 -> 203.0.113.10:443 -> socket fd=20

# local port는 모두 443이지만 connection tuple은 다르다.`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              UDP 소켓은 TCP와 다르게 봐야 한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                UDP에도 port는 있지만 TCP처럼 connection을 수립하지 않습니다. UDP 서버가
                <InlineCode>0.0.0.0:53</InlineCode>에 bind되어 있으면, 해당 port로
                들어오는 datagram을 socket으로 받습니다. TCP의 established socket처럼
                handshake 이후 connection socket이 자동으로 생기는 구조는 아닙니다.
              </p>
              <p>
                다만 운영체제는 UDP에서도 protocol, local IP, local port, remote IP,
                remote port를 기준으로 더 구체적인 socket matching을 할 수 있습니다.
                UDP socket에 <InlineCode>connect()</InlineCode>를 호출하면 실제 연결을
                맺는 것이 아니라, 기본 remote endpoint를 저장하고 다른 peer의 datagram을
                필터링하는 방식으로 동작합니다.
              </p>
              <p>
                그래서 “포트 하나에 여러 사용자가 붙는다”는 말은 TCP에서는 여러
                established connection이 생긴다는 뜻이고, UDP에서는 여러 remote endpoint의
                datagram을 같은 bound socket이 받을 수 있다는 뜻에 가깝습니다. QUIC처럼
                UDP 위에서 connection 개념을 다시 구현하는 protocol도 있습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              NAT와 로드밸런서가 있어도 원리는 같다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                실제 운영 환경에서는 클라이언트가 바로 서버에 붙지 않고 NAT, firewall,
                load balancer를 거치는 경우가 많습니다. 이때 중간 장비가 source IP나
                source port를 바꿀 수 있습니다. 그래도 핵심은 같습니다. 각 장비는 자신이
                보는 tuple을 기준으로 connection table 또는 NAT table을 만들고, 돌아오는
                packet을 원래 흐름으로 되돌립니다.
              </p>
              <p>
                예를 들어 여러 사용자가 같은 공유기 뒤에 있으면 서버는 같은 공인 IP에서
                온 요청을 볼 수 있습니다. 그래도 공유기나 NAT gateway가 외부 source port를
                다르게 잡아 tuple을 구분합니다. 그래서 서버나 중간 장비는 “같은 IP에서
                왔다”만으로 connection을 구분하지 않고 port까지 함께 봅니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              무한정 가능한 것은 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                하나의 포트에 수백 명이 접속할 수 있다고 해서 제한이 없는 것은 아닙니다.
                연결마다 established socket, receive buffer, send buffer, TCP state,
                file descriptor가 필요합니다. 그래서 동시에 처리 가능한 연결 수는 포트
                번호가 아니라 OS resource와 애플리케이션 구조에 의해 제한됩니다.
              </p>
              <p>
                자주 만나는 제한은 file descriptor limit, listen backlog, SYN backlog,
                worker thread 수, event loop 처리량, memory, CPU, 네트워크 대역폭입니다.
                클라이언트 쪽에서는 ephemeral port range와 TIME_WAIT도 병목이 될 수
                있습니다. 같은 client가 같은 server로 너무 많은 TCP connection을 만들면
                사용 가능한 source port가 먼저 부족해질 수 있습니다.
              </p>
              <p>
                HTTP/2나 HTTP/3에서는 하나의 transport connection 안에 여러 request stream을
                multiplexing할 수도 있습니다. 이 경우 사용자 요청 수와 TCP connection 수가
                1:1로 대응하지 않습니다. 하지만 이 역시 포트가 여러 개 생기는 것이 아니라,
                하나의 connection 위에서 protocol이 stream을 나누는 구조입니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영에서 확인하는 방법
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              Linux에서는 <InlineCode>ss</InlineCode>로 listen socket과 established
              connection을 분리해서 볼 수 있습니다. 여기서 중요한 것은 같은{" "}
              <InlineCode>:443</InlineCode>이 반복되어도 peer 주소와 port가 다르면
              서로 다른 connection이라는 점입니다.
            </p>
            <CodeBlock
              code={`# listen socket 확인
ss -ltnp

# 443번 port로 수립된 TCP connection 확인
ss -tn sport = :443

# 특정 process가 열고 있는 socket 확인
lsof -iTCP:443 -sTCP:LISTEN`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              자주 하는 오해
            </h2>
            <div className="mt-6">
              <NoteRow
                title="포트 하나에는 사용자 한 명만 접속한다고 생각함"
                body="서버 port는 listener가 사용하는 local endpoint입니다. 실제 TCP connection은 source IP, source port, destination IP, destination port 조합으로 구분되므로 같은 서버 port에 많은 client가 동시에 붙을 수 있습니다."
              />
              <NoteRow
                title="accept가 listener socket을 없앤다고 생각함"
                body="accept는 listener socket을 대체하지 않습니다. listener socket은 계속 새 연결을 받고, accept는 연결마다 별도의 established socket file descriptor를 반환합니다."
              />
              <NoteRow
                title="프로세스 여러 개가 같은 port를 마음대로 listen할 수 있다고 생각함"
                body="일반적으로 같은 protocol, 같은 local IP, 같은 local port에는 하나의 listener만 bind할 수 있습니다. SO_REUSEPORT 같은 옵션을 쓰면 여러 process가 같은 port를 공유하도록 만들 수 있지만, 이것은 커널이 load distribution을 도와주는 별도 설정입니다."
              />
              <NoteRow
                title="UDP도 TCP처럼 connection socket이 생긴다고 생각함"
                body="UDP는 connectionless입니다. 같은 bound socket이 여러 remote endpoint의 datagram을 받을 수 있고, connect된 UDP socket은 peer 정보를 저장해 filtering과 기본 전송 대상을 정하는 쪽에 가깝습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                포트는 TCP/UDP header에 있는 endpoint 번호입니다. 소켓은 운영체제 커널이
                관리하는 통신 객체이고, 애플리케이션은 file descriptor를 통해 그 socket을
                읽고 씁니다. 둘은 연결되어 있지만 같은 개념은 아닙니다.
              </p>
              <p>
                서버가 443번 포트 하나로 수백 명을 받는 이유는 listen socket 하나가
                포트를 열어두고, 각 client connection마다 별도의 established socket이
                만들어지기 때문입니다. 커널은 source IP, source port, destination IP,
                destination port, protocol 조합으로 packet을 올바른 socket에 전달합니다.
              </p>
              <p>
                그래서 운영에서 port 문제를 볼 때는 “포트가 열려 있나”에서 멈추면
                부족합니다. listen socket이 있는지, established connection이 쌓이는지,
                backlog가 넘치는지, file descriptor와 memory가 충분한지, NAT나 load
                balancer가 tuple을 어떻게 바꾸는지까지 같이 봐야 합니다.
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
