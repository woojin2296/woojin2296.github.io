import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "자주 보이는 네트워크 포트 정리 | Blog",
  description:
    "DevOps, Infra, Security 관점에서 HTTP, HTTPS, SSH, FTP, SMTP, SMB, Kerberos, LDAP, DB, Redis, MongoDB, SNMP, Syslog, NTP 포트와 노출 범위, 보안 포인트를 정리한 글",
};

const references = [
  {
    label: "IANA - Service Name and Transport Protocol Port Number Registry",
    href: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml",
  },
  {
    label: "RFC 9293 - Transmission Control Protocol",
    href: "https://www.rfc-editor.org/rfc/rfc9293",
  },
  {
    label: "RFC 9110 - HTTP Semantics",
    href: "https://www.rfc-editor.org/rfc/rfc9110",
  },
  {
    label: "RFC 8446 - TLS 1.3",
    href: "https://www.rfc-editor.org/rfc/rfc8446",
  },
  {
    label: "NIST SP 800-52 Rev. 2 - TLS Guidelines",
    href: "https://csrc.nist.gov/Pubs/sp/800/52/r2/Final",
  },
  {
    label: "Microsoft Learn - Detect, enable, and disable SMBv1, SMBv2, and SMBv3",
    href: "https://learn.microsoft.com/en-us/windows-server/storage/file-server/troubleshoot/detect-enable-and-disable-smbv1-v2-v3",
  },
  {
    label: "CISA - Bad Practices",
    href: "https://www.cisa.gov/stopransomware/bad-practices",
  },
];

export default function NetworkCommonPortsBlogPostPage() {
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
              Network / Security · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              자주 보이는 네트워크 포트 정리
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              웹 서버, 데이터베이스, 원격 접속, Active Directory, 메일 서버까지 대부분의
              인프라는 결국 port 위에서 동작합니다. 하지만 실무에서 중요한 것은 “443은
              HTTPS”처럼 외우는 것이 아니라, 그 port가 어디에 노출되어 있고 어떤 방식으로
              보호되는지를 함께 보는 것입니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              포트는 서비스의 힌트일 뿐이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                port는 TCP나 UDP header 안에 있는 16bit 번호입니다. host 안에서 어느
                transport endpoint로 전달할지 구분하는 값이지, 그 자체가 보안을 보장하거나
                서비스의 정체를 확정하지는 않습니다.
              </p>
              <p>
                예를 들어 443번 port는 보통 HTTPS에 쓰입니다. 하지만 어떤 process가 443번에
                떠 있는지, TLS 설정이 안전한지, 인증이 필요한지, 외부에 공개되어도 되는지는
                별개의 문제입니다. 반대로 3306번 port가 닫혀 있다고 해서 MySQL이 안전하게
                운영된다는 뜻도 아닙니다. 내부망에서 과도하게 열려 있으면 lateral movement
                경로가 될 수 있습니다.
              </p>
              <p>
                그래서 port를 볼 때는 번호보다 운영 경계를 먼저 봐야 합니다. 이 port가
                Application 계층의 어떤 protocol을 싣는지, 인터넷에 공개 가능한지, 암호화가
                기본인지, 인증이 강제되는지, 내부 침해 이후 이동 경로가 될 수 있는지를 함께
                판단해야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-common-ports-map.png"
              alt="Web edge, remote access, Directory and Active Directory, mail, file transfer, databases, cache, NoSQL, operations 계층별 대표 네트워크 포트 다이어그램"
              width={1440}
              height={900}
              caption="포트 번호는 운영 판단의 출발점입니다. 실제 정책은 서비스의 소유자, 노출 범위, 암호화 여부, 인증 방식, 신뢰 경계까지 함께 보고 정해야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              포트를 볼 때의 기준
            </h2>
            <div className="mt-6">
              <DecisionRow
                title="Transport protocol"
                body="TCP인지 UDP인지 먼저 봅니다. 같은 443이라도 TCP 443의 HTTPS와 UDP 443의 QUIC/HTTP/3는 동작 방식과 관측 포인트가 다릅니다."
              />
              <DecisionRow
                title="Exposure"
                body="인터넷 공개, 사내망 전용, VPC 내부 전용, 관리자 경로 전용을 구분합니다. 같은 port라도 노출 위치가 바뀌면 위험도가 완전히 달라집니다."
              />
              <DecisionRow
                title="Encryption"
                body="평문인지, STARTTLS처럼 업그레이드되는지, 처음부터 TLS로 감싸지는지 확인합니다. 암호화가 있어도 인증서 만료나 약한 protocol version 문제는 따로 봐야 합니다."
              />
              <DecisionRow
                title="Authentication"
                body="port가 열려 있는 것과 인증이 강제되는 것은 다릅니다. Redis, MongoDB, LDAP, SMB처럼 내부망 서비스도 인증과 권한 분리가 필요합니다."
              />
              <DecisionRow
                title="Lateral movement"
                body="인터넷에 안 열려 있어도 내부 침해 후 이동 경로가 될 수 있습니다. SMB, LDAP, Kerberos, DB, Redis 같은 port는 내부망에서도 최소 허용 원칙이 필요합니다."
              />
            </div>
            <BlogDiagram
              src="/blog/network-port-exposure-matrix.png"
              alt="인터넷 공개, 관리자 접근, 내부 서비스, 레거시 프로토콜, 모니터링 plane별 포트 노출 판단 매트릭스"
              width={1440}
              height={900}
              caption="실무에서는 포트를 공개/비공개로만 나누지 않습니다. 인터넷 공개, 관리자 접근, 내부 서비스, 레거시 프로토콜, 운영 plane을 분리해서 기본 자세를 다르게 잡습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Web 계층: 80, 443
            </h2>
            <div className="mt-6">
              <PortSection
                port="80"
                name="HTTP"
                layer="Application over TCP"
                exposure="인터넷 공개 가능하지만 운영 서비스는 보통 443으로 redirect"
                risk="평문 통신, 세션 탈취, 관리자 페이지 노출, HTTPS downgrade"
                operation="외부 서비스에서는 HTTPS 강제, ALB/Nginx/Ingress에서 301/308 redirect, health check 경로와 challenge 경로를 분리합니다."
              />
              <PortSection
                port="443"
                name="HTTPS"
                layer="HTTP over TLS over TCP"
                exposure="현재 웹 서비스의 표준 public entry"
                risk="인증서 만료, TLS 1.0/1.1 활성화, 약한 cipher, mixed content, HSTS 누락"
                operation="TLS 1.2 이상을 기본으로 두고, 가능하면 TLS 1.3을 지원합니다. ACM, Let's Encrypt, cert-manager 같은 자동 갱신 경로를 검증합니다."
              />
            </div>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                80번 port는 아직도 필요할 때가 많습니다. 사용자가 직접 http URL로 들어오는
                경우를 443으로 redirect해야 하고, Let&apos;s Encrypt HTTP-01 challenge처럼
                80번 경로를 쓰는 자동화도 있습니다. 다만 로그인, API, 관리자 페이지를 80번
                평문으로 운영하는 것은 피해야 합니다.
              </p>
              <p>
                443번 port는 단순히 “암호화된 HTTP”가 아닙니다. TLS handshake, certificate,
                SNI, cipher suite, HSTS, certificate renewal까지 운영 요소가 붙습니다. 인증서
                만료나 SNI 설정 오류는 HTTP request가 애플리케이션까지 도달하기 전 단계에서
                장애를 만들 수 있습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              원격 접속 계층: 22, 23
            </h2>
            <div className="mt-6">
              <PortSection
                port="22"
                name="SSH"
                layer="Application over TCP"
                exposure="관리자 접속용. 인터넷 직접 공개보다 bastion, VPN, SSM, Zero Trust 뒤 배치"
                risk="brute force, root login, password auth, 오래된 key exchange와 cipher"
                operation="SSH key 기반 인증, password auth 비활성화, root login 제한, fail2ban 또는 rate limit, Security Group source 제한을 적용합니다."
              />
              <PortSection
                port="23"
                name="Telnet"
                layer="Application over TCP"
                exposure="레거시 장비 외에는 신규 운영에서 피해야 하는 port"
                risk="인증 정보와 명령이 평문으로 노출"
                operation="SSH로 대체하고, 불가피한 산업 장비나 네트워크 장비는 별도 관리망에 격리합니다."
              />
            </div>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                SSH는 운영자에게 가장 강한 권한을 주는 통로입니다. 따라서 “접속이 편해야
                한다”보다 “누가, 어디서, 어떤 인증으로 들어왔는지 추적 가능해야 한다”가 더
                중요합니다. 클라우드에서는 public SSH를 줄이고 Session Manager나 bastion,
                VPN, Zero Trust access로 이동하는 구성이 흔합니다.
              </p>
              <p>
                Telnet은 평문 원격 접속입니다. 오래된 네트워크 장비, IoT, 산업 장비에서
                남아 있을 수 있지만 인터넷에 노출해서는 안 됩니다. 제거가 어렵다면 일반
                업무망과 분리된 관리망에서 source를 강하게 제한해야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              파일 전송 계층: 21, 69
            </h2>
            <div className="mt-6">
              <PortSection
                port="21"
                name="FTP"
                layer="Application over TCP"
                exposure="신규 외부 서비스에서는 거의 피하고 SFTP 또는 HTTPS upload로 대체"
                risk="계정과 password 평문 전송, passive port 범위 관리 복잡도, anonymous login"
                operation="가능하면 비활성화합니다. 꼭 필요하면 FTPS/SFTP 전환, 계정별 chroot, source 제한, 감사 로그를 적용합니다."
              />
              <PortSection
                port="69"
                name="TFTP"
                layer="Application over UDP"
                exposure="PXE boot, firmware, 네트워크 장비 config 전송처럼 제한된 내부망 용도"
                risk="인증 없음, config 유출, 임의 파일 다운로드/업로드 위험"
                operation="인터넷 공개는 금지에 가깝게 보고, 별도 provisioning network에서만 허용합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              메일 계층: 25, 587, 993
            </h2>
            <div className="mt-6">
              <PortSection
                port="25"
                name="SMTP"
                layer="Application over TCP"
                exposure="메일 서버 간 MTA 통신. 일반 애플리케이션 발송용과 구분"
                risk="open relay, spam relay, user enumeration, outbound abuse"
                operation="클라우드에서는 outbound 25 제한이 흔합니다. 직접 MTA를 운영한다면 relay 정책과 reputation, reverse DNS를 함께 봅니다."
              />
              <PortSection
                port="587"
                name="Submission"
                layer="Application over TCP"
                exposure="사용자나 애플리케이션이 메일을 제출하는 표준 경로"
                risk="인증 없는 발송, STARTTLS 미적용, credential stuffing"
                operation="인증과 STARTTLS를 강제하고, SPF/DKIM/DMARC를 함께 구성해 발송 신뢰도를 관리합니다."
              />
              <PortSection
                port="993"
                name="IMAPS"
                layer="IMAP over TLS over TCP"
                exposure="메일 client가 mailbox를 읽는 TLS 기반 경로"
                risk="계정 탈취, 오래된 client 설정, 약한 password"
                operation="MFA, app password 정책, TLS 설정, 비정상 로그인 탐지를 함께 둡니다."
              />
            </div>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                메일 port는 “메일이 나간다” 하나로 묶으면 안 됩니다. 25번은 서버 간 전달,
                587번은 인증된 제출, 993번은 mailbox 조회에 가깝습니다. 역할이 다르기 때문에
                firewall 정책과 인증 정책도 다르게 잡아야 합니다.
              </p>
              <p>
                110번 POP3와 143번 IMAP처럼 평문으로 쓸 수 있는 legacy 경로는 운영에서 점점
                줄어드는 편입니다. 남아 있다면 TLS 강제 여부와 client 호환성 때문에 유지되는
                것인지 확인해야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Windows와 AD 계층: 445, 88, 389, 636
            </h2>
            <div className="mt-6">
              <PortSection
                port="445"
                name="SMB"
                layer="Application over TCP"
                exposure="Windows 파일 공유와 AD 환경 내부 통신. 인터넷 공개 금지"
                risk="SMBv1, EternalBlue 계열 취약점, pass-the-hash, NTLM relay, 파일 공유 권한 오남용"
                operation="SMBv1 제거, 내부망 최소 허용, SMB signing/encryption 정책, endpoint hardening을 적용합니다."
              />
              <PortSection
                port="88"
                name="Kerberos"
                layer="Application over TCP/UDP"
                exposure="Active Directory 인증의 핵심 경로"
                risk="Kerberoasting, golden ticket, silver ticket, 약한 service account password"
                operation="service account password와 SPN 관리, 티켓 수명 정책, AD audit, privileged account 분리를 함께 봅니다."
              />
              <PortSection
                port="389 / 636"
                name="LDAP / LDAPS"
                layer="Application over TCP/UDP"
                exposure="사용자, 그룹, 디렉터리 조회. 636은 TLS 기반 LDAPS"
                risk="anonymous bind, 평문 credential, LDAP injection, 과도한 directory read 권한"
                operation="LDAPS 사용, anonymous bind 비활성화, bind account 최소 권한, query 입력 검증을 적용합니다."
              />
            </div>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                AD 관련 port는 외부 공개 여부보다 내부 침해 이후의 이동 경로 관점이 중요합니다.
                한 대가 뚫린 뒤 SMB, LDAP, Kerberos가 넓게 열려 있으면 credential 탈취와
                권한 상승, lateral movement가 쉬워집니다.
              </p>
              <p>
                특히 SMB는 내부 파일 공유라서 가볍게 취급하기 쉽지만, 실제 운영에서는
                인터넷 공개 금지, SMBv1 제거, 공유 권한 점검, endpoint patch가 기본입니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              데이터베이스 계층: 3306, 5432, 1433
            </h2>
            <div className="mt-6">
              <PortSection
                port="3306"
                name="MySQL"
                layer="Application over TCP"
                exposure="대부분 private subnet 내부 전용"
                risk="인터넷 직접 공개, 약한 계정, root 원격 접속, 백업 데이터 유출"
                operation="private subnet, Security Group 최소 허용, TLS 옵션, 계정별 최소 권한, audit log를 구성합니다."
              />
              <PortSection
                port="5432"
                name="PostgreSQL"
                layer="Application over TCP"
                exposure="대부분 application subnet 또는 bastion/VPN 경유"
                risk="pg_hba.conf 오설정, password auth 남용, extension 권한 오남용"
                operation="source CIDR를 좁히고, role 권한을 분리하며, 운영 접근은 bastion/VPN/SSM 경로로 제한합니다."
              />
              <PortSection
                port="1433"
                name="MSSQL"
                layer="Application over TCP"
                exposure="사내/클라우드 private network 중심"
                risk="기본 계정, 약한 password, 과도한 linked server 권한, 직접 인터넷 공개"
                operation="Windows/SQL 인증 정책, TLS, 방화벽 source 제한, privileged role 점검을 함께 봅니다."
              />
            </div>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                데이터베이스 port는 보통 인터넷에 직접 열지 않습니다. public subnet의 web
                service가 private subnet의 DB로 접근하거나, 운영자가 VPN 또는 bastion을 통해
                제한적으로 접근하는 구조가 일반적입니다.
              </p>
              <p>
                중요한 것은 “내부망이니까 괜찮다”가 아닙니다. application server 한 대가
                침해되면 DB port는 바로 다음 목표가 됩니다. 따라서 network ACL뿐 아니라 DB
                계정 권한, query audit, backup 접근 권한까지 함께 봐야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              NoSQL과 Cache 계층: 6379, 27017
            </h2>
            <div className="mt-6">
              <PortSection
                port="6379"
                name="Redis"
                layer="Application over TCP"
                exposure="localhost 또는 private subnet 내부 전용이 기본"
                risk="인증 없는 노출, SSRF 이후 pivot, 데이터 유출, 위험한 command 사용"
                operation="bind address 제한, ACL 또는 password, command 제한, managed service private endpoint를 사용합니다."
              />
              <PortSection
                port="27017"
                name="MongoDB"
                layer="Application over TCP"
                exposure="private network 내부 전용"
                risk="인증 미설정 공개, dump 유출, 과도한 role 권한"
                operation="authentication 필수, bindIp 제한, TLS, role 기반 권한, backup 접근 제어를 적용합니다."
              />
            </div>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Redis는 cache라서 데이터베이스보다 가볍게 보는 경우가 있지만, 실제로는 session,
                token, queue, rate limit, lock 정보가 들어갈 수 있습니다. 인증 없이 6379가
                열려 있으면 애플리케이션의 제어 흐름 자체가 흔들릴 수 있습니다.
              </p>
              <p>
                MongoDB도 마찬가지입니다. 예전에는 인증 없이 인터넷에 노출된 instance에서
                사고가 많이 났습니다. 지금은 managed database를 쓰더라도 public access와
                allowed source, database user 권한을 별도로 확인해야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              네트워크 관리와 모니터링: 161, 514, 123
            </h2>
            <div className="mt-6">
              <PortSection
                port="161"
                name="SNMP"
                layer="Application over UDP"
                exposure="네트워크 장비 모니터링용. source를 모니터링 서버로 제한"
                risk="기본 community string, 장비 정보 유출, UDP reflection"
                operation="SNMPv3, strong auth/privacy, source 제한, default public/private community 제거를 적용합니다."
              />
              <PortSection
                port="514"
                name="Syslog"
                layer="Application over UDP/TCP"
                exposure="중앙 로그 수집 경로. 내부망 전용"
                risk="UDP spoofing, 로그 위조, 민감 정보 평문 전송"
                operation="가능하면 TCP/TLS syslog, source 제한, log integrity, 수집 서버 접근 제어를 둡니다."
              />
              <PortSection
                port="123"
                name="NTP"
                layer="Application over UDP"
                exposure="시간 동기화. 내부 NTP 서버 또는 허용된 upstream만 사용"
                risk="UDP amplification, unrestricted query, 시간 불일치로 인한 인증/로그 장애"
                operation="내부 NTP 계층을 구성하고 외부 query를 제한합니다. Kubernetes, 인증 토큰, DB replication은 시간 동기화에 민감합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              포트 보호는 경로 설계다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                운영 보안은 port 하나를 열고 닫는 작업으로 끝나지 않습니다. 외부 사용자의
                packet이 service까지 오기 전에 DNS, CDN, WAF, load balancer, ingress, security
                group, network ACL, subnet routing, service mesh, application auth 같은 경계를
                통과합니다.
              </p>
              <p>
                public port는 적을수록 좋습니다. 보통 80과 443만 edge에 열고, admin port는
                VPN, bastion, SSO, MFA 뒤로 숨깁니다. DB, Redis, MongoDB, LDAP, SMB 같은 data
                plane port는 private subnet 안에서 필요한 source에만 허용합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/network-port-defense-boundaries.png"
              alt="Internet, Edge, Public subnet, Private subnet, Admin path, Policy controls를 지나 서비스 포트가 보호되는 경계 구조 다이어그램"
              width={1440}
              height={900}
              caption="포트 보안은 단일 방화벽 규칙보다 경로 설계에 가깝습니다. public entry는 줄이고, admin path는 별도로 통제하고, data port는 private boundary 안에 둡니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영에서 확인하는 명령
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                port 점검은 “열려 있다”와 “외부에서 닿는다”를 구분해야 합니다. 서버 내부에서
                process가 listen 중인지 보는 것과, 실제 client 위치에서 방화벽과 routing을
                지나 접속되는지 보는 것은 다른 확인입니다.
              </p>
              <p>
                운영에서는 내부 listen 상태, 로컬 firewall, cloud security group, NACL,
                load balancer listener, target health, 실제 외부 접속 테스트를 나눠서 봅니다.
              </p>
            </div>
            <CodeBlock
              code={`Linux listen 상태
ss -tulpen
sudo lsof -iTCP -sTCP:LISTEN -P -n

원격 연결 확인
nc -vz example.com 443
curl -vk https://example.com/
openssl s_client -connect example.com:443 -servername example.com

스캔은 허가된 범위에서만 수행
nmap -sS -p 22,80,443,3306 10.0.0.0/24`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                포트 번호를 외우는 것은 시작일 뿐입니다. 80, 443, 22, 3306 같은 숫자는
                서비스의 힌트이지 운영 정책 자체가 아닙니다. 같은 port라도 인터넷에 열려
                있는지, private subnet에만 있는지, 관리자 경로인지에 따라 위험도가 달라집니다.
              </p>
              <p>
                DevOps와 Infra 관점에서는 Security Group, NACL, Bastion, VPN, Zero Trust,
                Private Subnet, TLS Automation과 연결해서 봐야 합니다. Security 관점에서는
                암호화, 인증, 취약한 legacy protocol, lateral movement 가능성을 함께 봐야
                합니다.
              </p>
              <p>
                결국 중요한 질문은 “몇 번 port인가”가 아니라 “누가, 어디서, 어떤 인증과
                암호화로, 어떤 경계를 지나 이 service에 도달할 수 있는가”입니다. 이 질문에
                답할 수 있어야 port 목록이 실제 운영 판단으로 이어집니다.
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

function DecisionRow({ title, body }: { title: string; body: string }) {
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

function PortSection({
  port,
  name,
  layer,
  exposure,
  risk,
  operation,
}: {
  port: string;
  name: string;
  layer: string;
  exposure: string;
  risk: string;
  operation: string;
}) {
  return (
    <section className="border-t border-[#e5e5e5] py-6 first:border-t-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-[22px] font-semibold leading-[1.36] tracking-normal text-black">
          {port} — {name}
        </h3>
        <span className="font-mono text-sm leading-relaxed tracking-normal text-[#737373]">
          {layer}
        </span>
      </div>
      <InfoBlock title="노출 기준">{exposure}</InfoBlock>
      <InfoBlock title="대표 위험">{risk}</InfoBlock>
      <InfoBlock title="운영 포인트">{operation}</InfoBlock>
    </section>
  );
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <p className="mt-3 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
      <strong className="font-medium text-black">{title}: </strong>
      {children}
    </p>
  );
}
