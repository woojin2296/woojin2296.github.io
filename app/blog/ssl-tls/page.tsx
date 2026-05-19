import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "SSL/TLS 플로우와 패킷 구조 이해하기 | Blog",
  description:
    "TLS 1.3 handshake, certificate validation, TLS record layer, packet fragmentation/coalescing, 운영 장애 분석 관점 정리",
};

const references = [
  {
    label: "RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3",
    href: "https://datatracker.ietf.org/doc/html/rfc8446",
  },
  {
    label: "RFC 5246 - The Transport Layer Security (TLS) Protocol Version 1.2",
    href: "https://datatracker.ietf.org/doc/html/rfc5246",
  },
  {
    label: "RFC 5280 - Internet X.509 Public Key Infrastructure Certificate Profile",
    href: "https://datatracker.ietf.org/doc/html/rfc5280",
  },
  {
    label: "RFC 6066 - TLS Extensions: Server Name Indication",
    href: "https://datatracker.ietf.org/doc/html/rfc6066",
  },
  {
    label: "RFC 7301 - TLS Application-Layer Protocol Negotiation Extension",
    href: "https://datatracker.ietf.org/doc/html/rfc7301",
  },
  {
    label: "RFC 9325 - Recommendations for Secure Use of TLS and DTLS",
    href: "https://datatracker.ietf.org/doc/html/rfc9325",
  },
  {
    label: "RFC 9001 - Using TLS to Secure QUIC",
    href: "https://datatracker.ietf.org/doc/html/rfc9001",
  },
];

export default function SslTlsBlogPostPage() {
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
              Network / TLS · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[680px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              SSL/TLS 플로우와 패킷 구조 이해하기
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              HTTPS 연결에서 TLS는 TCP 위에 올라가 서버 인증, 키 교환, 암호화,
              무결성 검증을 담당합니다. TLS 1.3 handshake 흐름과 인증서 검증,
              record layer, 실제 packet 관찰 포인트를 운영 관점에서 정리합니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              SSL과 TLS의 관계
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                실무에서는 관성적으로 “SSL 인증서”, “SSL 설정”이라는 표현을 쓰지만,
                현재 HTTPS에서 실제로 사용하는 프로토콜은 TLS입니다. SSL 2.0과 SSL
                3.0은 오래전에 폐기된 프로토콜이고, TLS 1.0/1.1도 현대 보안 기준에서는
                사용하지 않는 방향입니다. 서버 운영에서는 보통 TLS 1.2와 TLS 1.3만
                허용하도록 구성합니다.
              </p>
              <p>
                TLS가 제공하는 핵심 속성은 세 가지입니다. 첫째, 통신 내용을 제3자가
                읽기 어렵게 하는 기밀성입니다. 둘째, 중간에서 데이터가 변조되면
                탐지할 수 있는 무결성입니다. 셋째, 클라이언트가 접속한 서버가 해당
                도메인의 인증서를 가진 주체인지 확인하는 서버 인증입니다. 필요하면
                mTLS를 통해 클라이언트 인증까지 수행할 수 있습니다.
              </p>
              <p>
                HTTPS는 HTTP가 TLS 위에서 동작하는 형태입니다. 네트워크 계층으로 보면
                일반적인 HTTPS 연결은 IP, TCP, TLS, HTTP 순서로 쌓입니다. TLS는 HTTP
                request와 response를 직접 이해하는 계층이 아니라, application data를
                암호화된 TLS record로 감싸서 TCP stream 위에 실어 보냅니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              TLS가 연결에서 담당하는 일
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              TLS 연결은 단순히 인증서 파일을 읽는 과정이 아닙니다. 클라이언트와
              서버는 protocol version, cipher suite, key share, application protocol,
              인증서 chain, transcript hash를 교환하고 검증해 같은 traffic secret을
              계산합니다.
            </p>
            <div className="mt-6">
              <NoteRow
                title="Protocol Negotiation"
                body="클라이언트는 지원 가능한 TLS 버전, cipher suite, key exchange group, signature algorithm, ALPN 목록을 ClientHello에 담습니다. 서버는 이 중 하나를 선택해 ServerHello와 EncryptedExtensions에서 확정합니다."
              />
              <NoteRow
                title="Key Exchange"
                body="TLS 1.3은 기본적으로 (EC)DHE 기반 ephemeral key exchange를 사용합니다. 클라이언트와 서버는 key_share를 교환하고 같은 shared secret을 계산하지만, private key 자체는 네트워크로 보내지 않습니다."
              />
              <NoteRow
                title="Authentication"
                body="서버는 certificate chain과 CertificateVerify 메시지를 통해 자신이 인증서 private key를 가지고 있음을 증명합니다. 클라이언트는 hostname, 신뢰 체인, 유효 기간, key usage, revocation policy 등을 검증합니다."
              />
              <NoteRow
                title="Record Protection"
                body="Handshake가 끝나면 application data는 TLS record 단위로 암호화되고 인증됩니다. TLS 1.3에서는 handshake 후 대부분의 handshake message도 암호화되어 패킷 캡처에서 평문으로 보이지 않습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              TLS 1.3 Handshake Flow
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                TLS 1.3은 일반적인 full handshake에서 1-RTT로 application data를 보낼
                수 있게 설계되었습니다. TLS 1.2에서는 ServerHello 이후 서버 인증서,
                key exchange, ServerHelloDone, 클라이언트 key exchange, Finished가 더
                길게 이어졌지만, TLS 1.3은 key schedule과 handshake message를 정리해
                round trip을 줄이고 오래된 cipher suite 구조를 제거했습니다.
              </p>
              <p>
                아래 흐름은 HTTPS over TCP 기준입니다. QUIC에서는 TLS 1.3 handshake를
                사용하지만 TCP가 아니라 QUIC transport 안에 통합되어 동작하므로 packet
                관찰 방식이 달라집니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/ssl-tls-flow.png"
              alt="TLS 1.3 handshake, record layer, certificate validation, packet view를 정리한 다이어그램"
              width={1672}
              height={941}
              caption="TLS 1.3은 TCP 연결 위에서 ClientHello와 ServerHello로 보안 파라미터와 key share를 협상하고, 이후 certificate validation과 Finished 검증을 거쳐 암호화된 application data를 교환합니다."
            />
            <ol className="mt-8 grid gap-3 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <li>
                TCP 3-way handshake가 먼저 완료됩니다. 클라이언트 ephemeral port와 서버
                443 포트 사이에 신뢰성 있는 byte stream이 만들어집니다.
              </li>
              <li>
                클라이언트가 ClientHello를 보냅니다. SNI, ALPN, supported_versions,
                cipher_suites, supported_groups, signature_algorithms, key_share 같은
                extension이 들어갑니다.
              </li>
              <li>
                서버가 ServerHello로 TLS version, cipher suite, key share를 선택합니다.
                이 시점 이후 양쪽은 handshake traffic secret을 계산할 수 있습니다.
              </li>
              <li>
                서버는 EncryptedExtensions, Certificate, CertificateVerify, Finished를
                보냅니다. TLS 1.3에서는 Certificate 이후 메시지들이 handshake traffic
                key로 보호됩니다.
              </li>
              <li>
                클라이언트는 certificate chain과 hostname을 검증하고, CertificateVerify
                서명과 Finished MAC을 검증합니다. 검증이 실패하면 연결을 중단합니다.
              </li>
              <li>
                클라이언트가 Finished를 보내면 handshake가 완료되고, 양쪽은 application
                traffic secret으로 HTTP 데이터를 암호화해 교환합니다.
              </li>
            </ol>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              ClientHello와 ServerHello
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              TLS 장애를 분석할 때 ClientHello와 ServerHello는 가장 먼저 봐야 하는
              handshake message입니다. 여기서 서버 이름, 지원 TLS 버전, cipher suite,
              ALPN, key share가 맞지 않으면 인증서 검증 단계까지 가지 못하고 handshake가
              실패할 수 있습니다.
            </p>
            <div className="mt-6">
              <NoteRow
                title="SNI"
                body="Server Name Indication입니다. 하나의 IP와 포트에서 여러 도메인의 인증서를 제공할 때 서버가 어떤 인증서를 선택해야 하는지 알려줍니다. SNI가 없거나 틀리면 기본 인증서가 내려와 hostname mismatch가 발생할 수 있습니다."
              />
              <NoteRow
                title="ALPN"
                body="Application-Layer Protocol Negotiation입니다. 클라이언트가 h2, http/1.1 같은 application protocol 목록을 보내고 서버가 하나를 선택합니다. HTTP/2 지원 여부를 판단할 때 중요한 extension입니다."
              />
              <NoteRow
                title="supported_versions"
                body="TLS 1.3에서는 legacy_version 필드만 보고 버전을 판단하지 않고 supported_versions extension으로 실제 지원 버전을 협상합니다. TLS 1.3 ClientHello의 legacy_version은 호환성 때문에 0x0303으로 보일 수 있습니다."
              />
              <NoteRow
                title="cipher_suites"
                body="TLS 1.3 cipher suite는 AEAD algorithm과 hash를 중심으로 정의됩니다. TLS 1.2의 cipher suite처럼 key exchange, authentication, bulk cipher, MAC을 모두 한 이름에 묶는 방식과 다릅니다."
              />
              <NoteRow
                title="key_share"
                body="클라이언트가 X25519, secp256r1 같은 group에 대한 ephemeral public key를 보냅니다. 서버가 적절한 key share를 선택하면 추가 왕복 없이 shared secret을 계산할 수 있습니다. 맞는 group이 없으면 HelloRetryRequest가 발생할 수 있습니다."
              />
            </div>
            <CodeBlock
              code={`ClientHello
  legacy_version: 0x0303
  random: ...
  cipher_suites:
    TLS_AES_128_GCM_SHA256
    TLS_AES_256_GCM_SHA384
    TLS_CHACHA20_POLY1305_SHA256
  extensions:
    server_name: api.example.com
    supported_versions: TLS 1.3, TLS 1.2
    application_layer_protocol_negotiation: h2, http/1.1
    supported_groups: x25519, secp256r1
    signature_algorithms: ecdsa_secp256r1_sha256, rsa_pss_rsae_sha256
    key_share: x25519 public key`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              인증서 검증
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                TLS 인증서는 서버가 특정 도메인 이름에 대한 public key를 사용해도
                된다는 사실을 CA가 서명한 X.509 구조입니다. 클라이언트는 인증서가
                존재한다는 사실만으로 연결을 신뢰하지 않고, 여러 조건을 모두
                검증합니다.
              </p>
              <p>
                가장 흔한 운영 장애는 hostname mismatch, 만료된 인증서, 누락된 중간
                인증서, 잘못된 private key 매칭, trust store에 없는 CA, 잘못된 SNI,
                key usage 부적합입니다. 서버 로그에는 요청이 찍히지 않을 수 있습니다.
                TLS handshake가 HTTP 요청 전에 실패하면 애플리케이션까지 도달하지
                않기 때문입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/tls-certificate-validation.png"
              alt="TLS 인증서 검증에서 hostname, validity period, trust chain, key usage, revocation policy를 확인한 뒤 HTTP request가 전송되는 구조 다이어그램"
              width={1440}
              height={900}
              caption="클라이언트는 SAN hostname, 유효 기간, trust chain, key usage, 폐기 정책 등을 검증한 뒤에야 HTTP 요청을 보냅니다. 어느 조건에서든 실패하면 요청은 애플리케이션 로그까지 도달하지 못할 수 있습니다."
            />
            <div className="mt-6">
              <NoteRow
                title="Subject Alternative Name"
                body="현대 TLS hostname 검증은 CN보다 SAN을 기준으로 봅니다. 접속한 hostname이 인증서 SAN의 dNSName 또는 IPAddress와 일치해야 합니다."
              />
              <NoteRow
                title="Validity Period"
                body="Not Before와 Not After 범위 안에 현재 시간이 들어와야 합니다. 서버나 클라이언트 시간이 틀리면 아직 유효하지 않거나 만료된 인증서로 판단될 수 있습니다."
              />
              <NoteRow
                title="Trust Chain"
                body="leaf certificate부터 intermediate CA, root CA까지 chain이 이어져야 하고, root CA는 클라이언트 trust store에 있어야 합니다. 서버는 보통 leaf와 intermediate chain을 함께 제공해야 합니다."
              />
              <NoteRow
                title="Key Usage"
                body="인증서의 Key Usage와 Extended Key Usage가 서버 인증 용도에 맞아야 합니다. 예를 들어 serverAuth EKU가 없거나 서명/키 교환 용도와 맞지 않으면 거절될 수 있습니다."
              />
              <NoteRow
                title="Revocation Policy"
                body="클라이언트 정책에 따라 CRL, OCSP, OCSP stapling으로 폐기 여부를 확인할 수 있습니다. 환경에 따라 revocation check 실패가 hard fail 또는 soft fail로 처리될 수 있습니다."
              />
            </div>
            <CodeBlock
              code={`# SNI를 포함해 서버 인증서와 handshake 확인
openssl s_client \\
  -connect api.example.com:443 \\
  -servername api.example.com \\
  -tls1_3 \\
  -showcerts

# 인증서 유효 기간만 빠르게 확인
echo | openssl s_client \\
  -connect api.example.com:443 \\
  -servername api.example.com 2>/dev/null \\
  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              TLS Record Layer와 Packet
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                TLS는 handshake message와 application data를 그대로 TCP에 쓰지 않고
                record layer를 통해 전송합니다. TLS record는 content type, legacy
                version, length, fragment를 가지며, handshake 이후 application data는
                AEAD로 암호화되고 인증 tag를 포함합니다.
              </p>
              <p>
                packet capture에서 중요한 점은{" "}
                <strong className="font-medium text-black">
                  TCP segment와 TLS record가 1:1로 대응하지 않는다는 것
                </strong>
                입니다. 하나의 TLS record가 여러 TCP segment로 나뉠 수 있고, 여러 TLS
                record가 하나의 TCP segment에 함께 들어갈 수도 있습니다. 따라서
                “패킷 하나 = TLS 메시지 하나”로 보면 분석이 틀어집니다.
              </p>
              <p>
                TLS 1.3에서는 middlebox 호환성을 위해 record header의 legacy_version이
                0x0303처럼 보일 수 있습니다. 실제 TLS 버전 협상은 supported_versions
                extension에서 이루어집니다. 또한 handshake가 진행되면 많은 메시지가
                encrypted application_data record처럼 보이므로, Wireshark에서 평문
                handshake 이름이 제한적으로만 보일 수 있습니다.
              </p>
            </div>
            <CodeBlock
              code={`TLSPlaintext {
  ContentType type;          // handshake(22), application_data(23), alert(21)
  ProtocolVersion legacy_record_version;
  uint16 length;
  opaque fragment[TLSPlaintext.length];
}

TLSCiphertext {
  ContentType opaque_type = application_data;
  ProtocolVersion legacy_record_version = 0x0303;
  uint16 length;
  opaque encrypted_record[TLSCiphertext.length];
}`}
            />
            <BlogDiagram
              src="/blog/tls-record-packet-structure.png"
              alt="하나의 TLS record가 여러 TCP segment로 분할되거나 여러 TLS record가 하나의 TCP segment에 합쳐질 수 있음을 보여주는 패킷 구조 다이어그램"
              width={1440}
              height={900}
              caption="TLS record는 TCP byte stream 위에 실리므로 record와 packet이 1:1로 대응하지 않습니다. packet capture를 볼 때는 fragmentation, coalescing, stream reassembly를 함께 고려해야 합니다."
            />
            <div className="mt-6">
              <NoteRow
                title="Fragmentation"
                body="큰 TLS record는 TCP MSS에 맞춰 여러 TCP segment로 나뉠 수 있습니다. 이 경우 중간 segment만 보면 TLS header가 보이지 않을 수 있고, stream reassembly가 필요합니다."
              />
              <NoteRow
                title="Coalescing"
                body="작은 TLS record 여러 개가 하나의 TCP segment에 함께 들어갈 수 있습니다. handshake 초반에는 여러 record가 연속해서 붙어 보일 수 있습니다."
              />
              <NoteRow
                title="Record Size"
                body="TLS record payload에는 크기 제한이 있습니다. 큰 HTTP response는 여러 TLS record로 나뉘고, 각 record는 별도로 암호화와 무결성 보호를 받습니다."
              />
              <NoteRow
                title="Alert"
                body="인증서 오류, protocol version mismatch, handshake failure, bad record MAC 같은 문제는 TLS alert로 표현될 수 있습니다. 다만 일부 구현은 alert를 보내지 않고 TCP 연결을 닫기도 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              TLS 1.2와 TLS 1.3 차이
            </h2>
            <div className="mt-6">
              <NoteRow
                title="Round Trip"
                body="TLS 1.2 full handshake는 보통 더 많은 메시지와 왕복을 필요로 합니다. TLS 1.3은 full handshake를 1-RTT로 줄이고, PSK resumption과 0-RTT early data도 정의합니다."
              />
              <NoteRow
                title="Cipher Suite 의미"
                body="TLS 1.2 cipher suite는 key exchange, authentication, bulk encryption, MAC을 함께 표현합니다. TLS 1.3 cipher suite는 AEAD와 hash 중심이고, key exchange group과 signature algorithm은 extension에서 별도로 협상합니다."
              />
              <NoteRow
                title="Forward Secrecy"
                body="TLS 1.3은 static RSA key exchange를 제거하고 ephemeral Diffie-Hellman 계열을 기본으로 합니다. 서버 private key가 나중에 유출되어도 과거 세션 키를 바로 복구하기 어렵게 만드는 방향입니다."
              />
              <NoteRow
                title="Handshake Encryption"
                body="TLS 1.3은 ServerHello 이후 많은 handshake message를 암호화합니다. TLS 1.2보다 packet capture에서 certificate 이후의 세부 handshake가 덜 노출됩니다."
              />
              <NoteRow
                title="Legacy Feature 제거"
                body="TLS 1.3은 오래된 cipher, compression, renegotiation 같은 위험한 기능을 제거하거나 구조를 바꿨습니다. 운영에서는 TLS 1.2를 남기더라도 취약 cipher suite와 낮은 protocol version을 비활성화해야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Session Resumption과 0-RTT
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                TLS는 매 연결마다 full handshake를 수행하지 않도록 session resumption을
                지원합니다. TLS 1.3에서는 서버가 NewSessionTicket을 보내고, 클라이언트는
                이후 연결에서 PSK를 사용해 더 짧은 handshake를 수행할 수 있습니다.
              </p>
              <p>
                0-RTT early data는 resumption 정보를 가진 클라이언트가 handshake 완료
                전에 application data를 보낼 수 있게 합니다. 지연 시간은 줄일 수 있지만
                replay 위험이 있으므로, 멱등성이 없는 POST, 결제, 상태 변경 API에는
                신중하게 사용해야 합니다. 운영에서는 0-RTT 허용 여부를 load balancer,
                CDN, origin server 정책과 함께 봐야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 분석 흐름
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              TLS 장애는 애플리케이션 로그에 남지 않는 경우가 많습니다. HTTP request가
              만들어지기 전에 handshake가 실패하면 nginx access log나 backend log에
              요청이 보이지 않을 수 있습니다. 이때는 네트워크 연결, TLS handshake,
              인증서 검증, HTTP layer를 분리해서 확인해야 합니다.
            </p>
            <CodeBlock
              code={`# 1. DNS와 TCP 연결 확인
dig api.example.com A
nc -vz api.example.com 443

# 2. TLS handshake와 인증서 chain 확인
openssl s_client -connect api.example.com:443 -servername api.example.com -showcerts

# 3. TLS 버전별 협상 확인
openssl s_client -connect api.example.com:443 -servername api.example.com -tls1_2
openssl s_client -connect api.example.com:443 -servername api.example.com -tls1_3

# 4. HTTP layer까지 확인
curl -v --http2 https://api.example.com/health

# 5. Packet capture
sudo tcpdump -i any -nn -s 0 -w tls-debug.pcap host api.example.com and port 443`}
            />
            <div className="mt-6">
              <NoteRow
                title="certificate has expired"
                body="서버가 제공한 leaf certificate의 Not After가 지났습니다. certbot, ACM, Kubernetes cert-manager, load balancer certificate attachment 상태를 확인합니다."
              />
              <NoteRow
                title="hostname mismatch"
                body="접속 hostname과 인증서 SAN이 맞지 않습니다. SNI 없이 IP로 직접 접속했거나, reverse proxy가 기본 인증서를 내려주거나, 잘못된 인증서가 배포된 경우가 많습니다."
              />
              <NoteRow
                title="unable to get local issuer certificate"
                body="클라이언트가 신뢰 체인을 만들지 못했습니다. 서버가 intermediate certificate을 누락했거나, 클라이언트 trust store가 오래됐거나, 사설 CA가 등록되지 않은 경우입니다."
              />
              <NoteRow
                title="handshake failure"
                body="서로 지원하는 TLS 버전, cipher suite, signature algorithm, client certificate 요구사항이 맞지 않을 때 발생할 수 있습니다. 서버와 클라이언트의 지원 목록을 같이 확인해야 합니다."
              />
              <NoteRow
                title="no application protocol"
                body="ALPN 협상에 실패한 경우입니다. 클라이언트가 h2만 요구하는데 서버가 http/1.1만 지원하거나, proxy 계층에서 ALPN 설정이 누락된 경우가 있습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영 체크리스트
            </h2>
            <div className="mt-6">
              <NoteRow
                title="TLS 1.2와 TLS 1.3만 허용한다"
                body="가능하면 TLS 1.3을 우선 사용하고, 호환성을 위해 TLS 1.2를 제한적으로 남깁니다. SSLv3, TLS 1.0, TLS 1.1은 비활성화하는 구성이 일반적입니다."
              />
              <NoteRow
                title="인증서 만료 모니터링을 별도로 둔다"
                body="인증서 만료는 애플리케이션 health check와 별개로 감지해야 합니다. openssl, blackbox exporter, cloud monitoring, cert-manager metric 등으로 Not After를 추적합니다."
              />
              <NoteRow
                title="SNI 기준 인증서 선택을 확인한다"
                body="하나의 nginx, ALB, CDN, ingress에서 여러 hostname을 처리하면 SNI에 따라 다른 인증서를 내려줍니다. IP 직접 접속 테스트와 도메인 접속 테스트의 결과가 다를 수 있습니다."
              />
              <NoteRow
                title="중간 인증서 chain을 함께 배포한다"
                body="서버에는 leaf certificate만이 아니라 intermediate chain이 포함된 fullchain을 설정해야 합니다. 일부 클라이언트는 intermediate를 자동으로 가져오지 못합니다."
              />
              <NoteRow
                title="Private key 권한과 매칭을 확인한다"
                body="인증서와 private key가 서로 맞아야 하고, nginx나 애플리케이션 프로세스가 key 파일을 읽을 수 있어야 합니다. 잘못된 key를 배포하면 서비스 시작 또는 handshake가 실패합니다."
              />
              <NoteRow
                title="Proxy 구간별 TLS 종료 위치를 문서화한다"
                body="CDN, load balancer, ingress, nginx, application 중 어디에서 TLS가 종료되는지 명확히 해야 합니다. 외부 인증서는 정상이어도 내부 upstream TLS가 별도로 실패할 수 있습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                SSL/TLS를 이해할 때는 인증서 파일만 보지 말고, TCP 연결, TLS handshake,
                certificate validation, record layer, HTTP application data를 단계별로
                나누어 봐야 합니다. 특히 handshake가 실패하면 애플리케이션 요청은
                만들어지지 않으므로 서버 애플리케이션 로그에 아무것도 남지 않는 것이
                정상일 수 있습니다.
              </p>
              <p>
                패킷 관점에서는 TCP segment와 TLS record가 1:1로 대응하지 않는다는 점이
                중요합니다. TLS record는 TCP stream 위에서 분할되거나 합쳐질 수 있고,
                TLS 1.3에서는 ServerHello 이후 많은 handshake message와 application
                data가 암호화됩니다. 따라서 장애 분석은 DNS, TCP, TLS, HTTP를 순서대로
                분리하고, 각 계층에서 관찰 가능한 신호를 정확히 읽는 방식으로 접근해야
                합니다.
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
