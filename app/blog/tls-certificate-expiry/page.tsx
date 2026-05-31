import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "인증서 만료로 앱 로그인 전체가 막힌 장애 분석 | Blog",
  description:
    "도봉라이프 API 도메인의 TLS 인증서 만료로 앱 인증 기능이 동시에 실패한 장애를 실제 로그를 따라 진단하고 복구한 기록",
};

const references = [
  {
    label: "Let's Encrypt - Challenge Types",
    href: "https://letsencrypt.org/docs/challenge-types/",
  },
  {
    label: "Certbot User Guide - Webroot",
    href: "https://eff-certbot.readthedocs.io/en/stable/using.html#webroot",
  },
  {
    label: "Certbot User Guide - Automated Renewals",
    href: "https://eff-certbot.readthedocs.io/en/stable/using.html#automated-renewals",
  },
  {
    label: "Certbot User Guide - Pre and Post Validation Hooks",
    href: "https://eff-certbot.readthedocs.io/en/stable/using.html#pre-and-post-validation-hooks",
  },
];

export default function TlsCertificateExpiryBlogPostPage() {
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
              Incident / TLS · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              인증서 만료로 앱 로그인 전체가 막힌 장애 분석
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              프론트엔드 동료가 앱 로그인이 되지 않는다고 알려왔다. 확인해보니
              일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 같이
              실패하고 있었다. 서버는 떠 있었지만 새 요청은 애플리케이션과
              Nginx 로그에 남지 않았고, 실제 원인은 API 도메인의 TLS 인증서
              만료였다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 요약
            </h2>
            <div className="mt-6">
              <NoteRow
                title="처음 보인 증상"
                body="앱에서 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 모두 실패했다. 화면에는 네트워크 연결 상태가 원활하지 않다는 오류가 표시되어 사용자는 계정 문제인지, 카카오 연동 문제인지, 실제 네트워크 문제인지 구분하기 어려운 상태였다."
              />
              <NoteRow
                title="처음 확인한 것"
                body="서버 프로세스는 살아 있었지만 새 요청을 보내도 애플리케이션 로그에 찍히지 않았다. Nginx access log에서도 요청이 감지되지 않아, 애플리케이션 내부 예외보다 HTTP 요청 이전 계층을 먼저 의심했다."
              />
              <NoteRow
                title="직접 원인"
                body="openssl s_client로 api.dobonglife.co.kr의 443 포트에서 실제 제공되는 인증서를 확인하자 certificate has expired가 나왔다. 인증서의 notAfter는 2026년 5월 13일 23:55:25 GMT였고, 장애를 확인한 5월 14일에는 이미 만료된 상태였다."
              />
              <NoteRow
                title="복구"
                body="Certbot으로 갱신을 시도했지만 처음에는 80번 포트를 Nginx가 점유하고 있어 실패했다. Nginx를 일시 중단한 뒤 renew를 다시 실행해 인증서를 갱신했고, 이후 외부 443 포트에서 새 notAfter가 보이는지 확인했다."
              />
              <NoteRow
                title="재발 방지 방향"
                body="갱신 실패 로그와 renewal 설정을 보니 기존 방식은 standalone이었다. 운영 서버에서는 Nginx가 80번 포트를 계속 사용하므로, 이후 갱신 구조는 webroot 방식과 dry-run 검증, reload hook, 만료일 모니터링으로 정리해야 한다고 판단했다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              처음에는 로그인 API 문제처럼 보였다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                처음 제보는 단순했다. 앱 로그인이 되지 않는다는 이야기였다.
                이런 제보를 받으면 먼저 로그인 API, 토큰 처리, 카카오 로그인 연동
                같은 애플리케이션 문제를 떠올리기 쉽다. 그런데 확인 범위를
                넓히자 일반 로그인만 실패한 것이 아니었다. 카카오 로그인,
                비밀번호 찾기, 이메일 인증까지 모두 실패하고 있었다.
              </p>
              <p>
                앱에는 “네트워크 연결 상태가 원활하지 않다”는 오류가
                표시되었다. 이 메시지는 사용자 입장에서는 그냥 인터넷이 불안정한
                것처럼 보인다. 하지만 운영자 입장에서는 조금 다르게 봐야 한다.
                앱이 정상적인 HTTP 응답을 받지 못하면 DNS 실패, TLS 검증 실패,
                프록시 연결 실패, 서버 timeout이 모두 비슷한 상위 오류로 묶여
                보일 수 있다.
              </p>
              <p>
                서버에 들어가 보니 프로세스 자체는 살아 있었다. 문제는 새 요청을
                보내도 애플리케이션 로그에 아무것도 찍히지 않았다는 점이었다. Nginx
                access log에서도 요청이 보이지 않았다. 이때부터는 “서버가 요청을
                처리하다가 실패했다”보다 “요청이 HTTP 처리 단계까지 도달하지 못했다”에
                가깝다고 봤다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/dobonglife-cert-incident-flow.png"
              alt="앱 로그인 장애 진단 흐름"
              width={1672}
              height={941}
              caption="여러 인증 기능이 동시에 실패했고, 서버와 Nginx 로그가 비어 있어 DNS와 TLS 같은 네트워크 계층으로 조사 범위를 옮겼다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              실제 대응 흐름
            </h2>
            <div className="mt-6">
              <NoteRow
                title="1. 인증 기능 전체 실패 확인"
                body="처음에는 로그인 장애로 들어왔지만, 확인 결과 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 모두 실패했다. 서로 다른 기능이 동시에 멈췄다면 각 API의 비즈니스 로직보다 공통 연결 경로를 먼저 봐야 한다."
              />
              <NoteRow
                title="2. 서버는 살아 있지만 새 요청 로그가 없음"
                body="서버 프로세스는 떠 있었지만 새 요청을 시도해도 애플리케이션 로그에 찍히지 않았다. Nginx access log에서도 요청이 감지되지 않아 HTTP 이전 단계의 문제를 의심했다."
              />
              <NoteRow
                title="3. DNS를 보기 전에 인증서 오류가 먼저 보임"
                body="처음에는 도메인 접속과 IP 직접 접속을 비교해 DNS 문제를 나누어 보려 했다. 그런데 도메인 접속 과정에서 인증서 만료 오류가 먼저 확인됐고, 조사 초점이 TLS 인증서로 좁혀졌다."
              />
              <NoteRow
                title="4. 외부 443 포트와 로컬 Certbot 상태 비교"
                body="openssl s_client -servername으로 외부에서 보이는 인증서를 확인했고, sudo certbot certificates로 로컬 인증서 저장소도 확인했다. 둘 다 같은 만료일을 가리켰다."
              />
              <NoteRow
                title="5. renew 실패 후 갱신 방식 문제 확인"
                body="sudo certbot renew는 80번 포트를 bind할 수 없다는 이유로 실패했다. 이후 renewal 설정을 확인해보니 authenticator가 standalone이었고, 운영 중인 Nginx와 충돌하는 구조였다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              왜 인증 기능이 한꺼번에 실패했나
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증은 기능 이름은
                다르지만 결국 모두 API 서버와 통신해야 한다. 일반 로그인은 계정
                검증 API를 호출하고, 카카오 로그인은 외부 인증 이후 서버에서 사용자
                계정을 연결하거나 세션을 만들어야 한다. 비밀번호 찾기와 이메일
                인증도 메일 발송, 인증 토큰 생성, 사용자 상태 변경 같은 서버 작업을
                필요로 한다.
              </p>
              <p>
                따라서 API 도메인의 HTTPS 연결 자체가 실패하면 인증 기능 전체가
                같이 멈춘다. 이 장애에서는 애플리케이션 코드가 요청을 받아 예외를
                던진 것이 아니라, 클라이언트가 API 서버의 인증서를 신뢰하지 못해
                TLS 연결을 완료하지 못한 것이 핵심이었다.
              </p>
              <p>
                HTTP 요청은 TLS 핸드셰이크가 끝난 뒤에야 전송된다. 인증서가
                만료되어 클라이언트가 연결을 중단하면 HTTP path, method, header,
                body가 Nginx나 백엔드로 전달되지 않는다. 그래서 access log에
                요청이 없고, 백엔드 로그에도 아무 흔적이 없는 상태가 만들어질 수
                있다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/ssl-tls-flow.png"
              alt="클라이언트가 DNS 해석 후 TCP 연결과 TLS 인증서 검증을 통과해야 HTTP 요청이 Nginx와 API 서버에 도달하는 흐름"
              width={1672}
              height={941}
              caption="HTTP 요청은 TLS 핸드셰이크와 인증서 검증이 끝난 뒤 전송된다. 인증서가 만료되면 클라이언트가 연결을 중단하므로 Nginx access log와 백엔드 로그가 비어 보일 수 있다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              시간과 인증서 로그로 원인을 좁혔다
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              인증서 오류를 볼 때 바로 만료라고 단정하면 안 된다. 서버 시간이
              크게 틀어져 있으면 실제로는 유효한 인증서도 만료되었거나 아직 유효하지
              않은 것처럼 보일 수 있다. 그래서 먼저 서버 시간과 NTP 상태를
              확인했다.
            </p>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ date
timedatectl
Thu May 14 04:59:19 UTC 2026
               Local time: Thu 2026-05-14 04:59:19 UTC
           Universal time: Thu 2026-05-14 04:59:19 UTC
                 RTC time: Thu 2026-05-14 04:59:18
                Time zone: Etc/UTC (UTC, +0000)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              다음으로 도메인에 실제로 제공되는 인증서를 확인했다. 여기서
              중요한 옵션은{" "}
              <InlineCode>-servername api.dobonglife.co.kr</InlineCode>이다.
              SNI를 지정하지 않으면 서버가 기본 인증서를 내보낼 수 있어, 실제 앱이
              보는 인증서와 다른 결과를 확인할 수 있다.
            </p>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ openssl s_client \\
  -connect api.dobonglife.co.kr:443 \\
  -servername api.dobonglife.co.kr

CONNECTED(00000003)
depth=2 C = US, O = Internet Security Research Group, CN = ISRG Root X1
verify return:1
depth=1 C = US, O = Let's Encrypt, CN = E7
verify return:1
depth=0 CN = api.dobonglife.co.kr
verify error:num=10:certificate has expired
notAfter=May 13 23:55:25 2026 GMT

Certificate chain
 0 s:CN = api.dobonglife.co.kr
   i:C = US, O = Let's Encrypt, CN = E7
   v:NotBefore: Feb 12 23:55:26 2026 GMT; NotAfter: May 13 23:55:25 2026 GMT

Verification error: certificate has expired
Verify return code: 10 (certificate has expired)`}
            />
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                결과는 명확했다. 인증서의{" "}
                <InlineCode>notAfter</InlineCode>가 2026년 5월 13일
                23:55:25 GMT였고, OpenSSL 검증 결과는{" "}
                <InlineCode>certificate has expired</InlineCode>였다. 한국
                시간으로 환산하면 2026년 5월 14일 08:55:25 KST에 만료된 것이다.
              </p>
              <p>
                이후{" "}
                <InlineCode>sudo certbot certificates</InlineCode>로 로컬
                Certbot이 관리하는 인증서 상태도 확인했다. 로컬 저장소의 인증서
                역시 같은 만료일을 가리키고 있었고, 상태는{" "}
                <InlineCode>INVALID: EXPIRED</InlineCode>였다.
              </p>
            </div>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ sudo certbot certificates
Saving debug log to /var/log/letsencrypt/letsencrypt.log

Found the following certs:
  Certificate Name: api.dobonglife.co.kr
    Serial Number: 5f7f7260590ee52bba6d706f5ae72895519
    Key Type: ECDSA
    Domains: api.dobonglife.co.kr
    Expiry Date: 2026-05-13 23:55:25+00:00 (INVALID: EXPIRED)
    Certificate Path: /etc/letsencrypt/live/api.dobonglife.co.kr/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/api.dobonglife.co.kr/privkey.pem`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              DNS를 의심할 때의 주의점
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                처음에는 DNS 점검을 위해 도메인 접속과 IP 직접 접속을 비교하려고
                했다. 이 접근 자체는 방향이 맞지만, HTTPS에서는 IP 직접 접속을
                조심해야 한다. 인증서는 보통 IP가 아니라 도메인 이름에 대해
                발급되므로, 단순히{" "}
                <InlineCode>https://서버IP</InlineCode>로 접속하면 인증서의
                CN 또는 SAN이 요청한 호스트와 맞지 않아 별도의 인증서 오류가 날 수
                있다.
              </p>
              <p>
                DNS 문제와 서버 문제를 분리해서 보려면{" "}
                <InlineCode>curl --resolve</InlineCode>가 더 정확하다. 이 방식은
                URL과 Host, SNI는 원래 도메인으로 유지하면서, DNS 해석 결과만 원하는
                IP로 강제한다. 즉 “이 도메인이 이 IP로 향할 때 HTTPS가 정상인지”를
                확인할 수 있다.
              </p>
            </div>
            <CodeBlock
              code={`curl -v \\
  --resolve api.dobonglife.co.kr:443:203.0.113.10 \\
  https://api.dobonglife.co.kr/health`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이번 장애에서는 이 비교까지 깊게 들어가기 전에 인증서 만료가 먼저
              드러났다. 그래서 DNS 자체보다는 TLS 인증서 상태를 우선 원인으로
              좁혔다.
            </p>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Certbot 갱신 실패 원인
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              인증서 만료를 확인한 뒤{" "}
              <InlineCode>sudo certbot renew</InlineCode>를 실행했지만 첫 시도는
              실패했다. 실패 메시지는 Certbot이 80번 포트를 열 수 없다는
              내용이었다.
            </p>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ sudo certbot renew
Saving debug log to /var/log/letsencrypt/letsencrypt.log

Processing /etc/letsencrypt/renewal/api.dobonglife.co.kr.conf
Renewing an existing certificate for api.dobonglife.co.kr
Failed to renew certificate api.dobonglife.co.kr with error:
Could not bind TCP port 80 because it is already in use by another process
on this system (such as a web server). Please stop the program in question
and then try again.

All renewals failed. The following certificates could not be renewed:
  /etc/letsencrypt/live/api.dobonglife.co.kr/fullchain.pem (failure)

1 renew failure(s), 0 parse failure(s)`}
            />
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                이 메시지는 기존 갱신 설정이{" "}
                <InlineCode>standalone</InlineCode> authenticator를 사용하고
                있었기 때문에 발생했다. standalone 방식은 Certbot이 자체 임시
                웹서버를 띄워 HTTP-01 challenge 요청에 응답한다. 그러려면 80번
                포트가 비어 있어야 한다.
              </p>
              <p>
                하지만 운영 서버에서는 Nginx가 이미 80번 포트를 사용하고 있었다.
                이 상태에서 자동 갱신이 실행되면 Certbot은 포트를 점유하지 못하고
                실패한다. 장애 당일 수동으로 실행했을 때 드러난 이 오류는, 자동
                갱신도 이전부터 같은 이유로 실패했을 가능성을 강하게 보여준다.
              </p>
              <p>
                renewal 설정을 직접 확인했을 때도 같은 방향이 보였다.
                <InlineCode>authenticator = standalone</InlineCode>이 남아 있었고,
                이 설정은 Certbot이 직접 80번 포트를 열어 challenge에 응답해야
                한다는 뜻이다.
              </p>
            </div>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ cat /etc/letsencrypt/renewal/api.dobonglife.co.kr.conf
# renew_before_expiry = 30 days

version = 2.9.0
archive_dir = /etc/letsencrypt/archive/api.dobonglife.co.kr
cert = /etc/letsencrypt/live/api.dobonglife.co.kr/cert.pem
privkey = /etc/letsencrypt/live/api.dobonglife.co.kr/privkey.pem
chain = /etc/letsencrypt/live/api.dobonglife.co.kr/chain.pem
fullchain = /etc/letsencrypt/live/api.dobonglife.co.kr/fullchain.pem

[renewalparams]
account = 902827efde018ec3ba2bf8f67bdc94a6
authenticator = standalone
server = https://acme-v02.api.letsencrypt.org/directory
key_type = ecdsa`}
            />
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                긴급 복구만 놓고 보면 Nginx를 잠시 중단한 뒤 Certbot을 실행하면
                갱신할 수 있다. 실제로 Nginx를 일시 중단한 뒤 재시도하자 갱신은
                성공했다. 다만 이 방식은 갱신 때마다 의도적인 서비스 중단을
                만들기 때문에 운영 자동화 방식으로는 적합하지 않다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              복구 확인
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              Nginx를 잠시 중단한 뒤 다시 실행한 <InlineCode>certbot renew</InlineCode>
              는 성공했다. 여기서 끝내면 안 된다. 로컬 인증서 파일이 바뀐
              것과 실제 443 포트에서 새 인증서가 제공되는 것은 별도로 확인해야
              한다.
            </p>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ sudo certbot renew
Saving debug log to /var/log/letsencrypt/letsencrypt.log

Processing /etc/letsencrypt/renewal/api.dobonglife.co.kr.conf
Renewing an existing certificate for api.dobonglife.co.kr

Congratulations, all renewals succeeded:
  /etc/letsencrypt/live/api.dobonglife.co.kr/fullchain.pem (success)`}
            />
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ sudo certbot certificates
Saving debug log to /var/log/letsencrypt/letsencrypt.log

Found the following certs:
  Certificate Name: api.dobonglife.co.kr
    Serial Number: 626b0b9783d0544cca1a7ea0b248b0c4bfa
    Key Type: ECDSA
    Domains: api.dobonglife.co.kr
    Expiry Date: 2026-08-12 04:08:03+00:00 (VALID: 89 days)
    Certificate Path: /etc/letsencrypt/live/api.dobonglife.co.kr/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/api.dobonglife.co.kr/privkey.pem`}
            />
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ echo | openssl s_client \\
  -connect api.dobonglife.co.kr:443 \\
  -servername api.dobonglife.co.kr 2>/dev/null | \\
  openssl x509 -noout -dates

notBefore=May 14 04:08:04 2026 GMT
notAfter=Aug 12 04:08:03 2026 GMT`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이 확인은 두 가지 의미가 있다. 첫째,{" "}
              <InlineCode>/etc/letsencrypt/live/...</InlineCode>의 인증서 파일이
              실제로 갱신되었다. 둘째, 443 포트에서 Nginx가 제공하는 인증서도
              새 인증서로 바뀌었다. 장애의 사용자 영향은 앱에서 일반 로그인,
              카카오 로그인, 비밀번호 찾기, 이메일 인증 요청이 다시 통과하는 것까지
              확인해야 복구됐다고 볼 수 있다.
            </p>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              standalone에서 webroot로 바꿔야 했던 이유
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                HTTP-01 challenge는 Let&apos;s Encrypt가{" "}
                <InlineCode>
                  http://도메인/.well-known/acme-challenge/토큰
                </InlineCode>
                경로로 접근해, 해당 도메인을 제어하고 있는지 확인하는 방식이다.
                standalone 방식은 이 응답을 Certbot이 직접 띄운 임시 웹서버로
                처리하고, webroot 방식은 이미 실행 중인 웹서버가 특정 디렉터리의
                검증 파일을 서빙하도록 만든다.
              </p>
              <p>
                운영 서버에 Nginx가 상시 실행 중이라면 webroot 방식이 더 자연스럽다.
                Certbot은 검증 파일을 webroot 아래에 쓰고, Nginx는 기존 80번 포트를
                그대로 사용해 그 파일을 외부에 제공한다. 이 방식은 인증서 갱신을
                위해 Nginx를 멈출 필요가 없고, 자동 갱신에도 잘 맞다.
              </p>
              <p>
                실제로 renewal 설정에서 <InlineCode>authenticator</InlineCode> 값을
                standalone에서 webroot로 바꿨다. 다만 이 경험으로 배운 점은
                단순히 설정 파일 한 줄을 고치는 것에서 끝나면 안 된다는 것이다.
                Certbot이 challenge 파일을 어느 디렉터리에 써야 하는지 알아야 하므로
                <InlineCode>webroot_path</InlineCode>까지 명확해야 하고, 마지막에는
                반드시 <InlineCode>certbot renew --dry-run</InlineCode>으로 다음 자동
                갱신 경로를 검증해야 한다.
              </p>
            </div>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ cat /etc/letsencrypt/renewal/api.dobonglife.co.kr.conf
[renewalparams]
account = 902827efde018ec3ba2bf8f67bdc94a6
authenticator = standalone
server = https://acme-v02.api.letsencrypt.org/directory
key_type = ecdsa

ubuntu@ip-10-0-1-247:~$ sudo nano /etc/letsencrypt/renewal/api.dobonglife.co.kr.conf

ubuntu@ip-10-0-1-247:~$ cat /etc/letsencrypt/renewal/api.dobonglife.co.kr.conf
[renewalparams]
account = 902827efde018ec3ba2bf8f67bdc94a6
authenticator = webroot
server = https://acme-v02.api.letsencrypt.org/directory
key_type = ecdsa`}
            />
            <BlogDiagram
              src="/blog/dobonglife-cert-renewal-flow.png"
              alt="Certbot standalone 방식과 webroot 방식 비교"
              width={1672}
              height={941}
              caption="standalone은 80번 포트를 직접 점유해야 하므로 Nginx와 충돌했다. webroot 방식은 Nginx가 계속 요청을 받고 Certbot은 검증 파일만 배치한다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Nginx와 Certbot 설정 예시
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              API 서버 앞단의 Nginx가 대부분의 요청을 백엔드로 프록시하더라도,
              ACME challenge 경로만큼은 정적 파일로 응답할 수 있어야 한다. 아래는
              webroot를 <InlineCode>/var/www/html</InlineCode>로 둔 경우의 예시이다.
              실제 운영에서는 서버 블록, root 경로, 배포 구조에 맞게 조정해야 한다.
            </p>
            <CodeBlock
              code={`server {
    listen 80;
    server_name api.dobonglife.co.kr;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/html;
        default_type "text/plain";
        allow all;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              인증서를 webroot 방식으로 다시 발급하거나 renewal 설정을 명확히 남길
              때는 다음처럼 실행할 수 있다. 이미 같은 certificate name을 쓰고
              있다면 실제 명령은 운영 상태에 맞춰 조정해야 한다. 이번 경험을
              기준으로는 수동 편집보다 Certbot 명령과 dry-run으로 재현 가능한 상태를
              만드는 편이 더 안전하다고 봤다.
            </p>
            <CodeBlock
              code={`sudo certbot certonly \\
  --webroot \\
  -w /var/www/html \\
  -d api.dobonglife.co.kr \\
  --cert-name api.dobonglife.co.kr`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              갱신 후 Nginx가 새 인증서를 읽도록 reload hook도 함께 두는 것이 좋다.
              Certbot의 deploy hook은 실제 갱신이 성공했을 때만 실행되는 용도로
              사용할 수 있다.
            </p>
            <CodeBlock
              code={`sudo certbot renew --dry-run
sudo certbot renew --deploy-hook "systemctl reload nginx"`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              다음부터는 이렇게 확인한다
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이번 장애에서 가장 아쉬운 부분은 인증서가 만료된 사실보다, 만료 전에
              갱신 실패를 발견하지 못했다는 점이다. 다음부터는 인증서 갱신을
              “한 번 설정해두면 끝나는 작업”으로 보지 않고, 실제 외부에서 보이는
              인증서와 자동 갱신 경로를 같이 확인하려고 한다.
            </p>
            <div className="mt-6">
              <NoteRow
                title="1. 자동 갱신 스케줄 확인"
                body="Certbot이 systemd timer 또는 cron으로 주기 실행되는지 확인한다. timer가 없다면 인증서가 만료되기 전까지 아무 일도 일어나지 않는다."
              />
              <CodeBlock
                code={`systemctl list-timers | grep certbot
systemctl status certbot.timer
grep -R "certbot renew" /etc/cron.* /etc/crontab 2>/dev/null`}
              />
              <NoteRow
                title="2. dry-run을 배포 체크에 포함"
                body="인증서가 아직 넉넉히 남아 있어도 certbot renew --dry-run은 갱신 경로가 동작하는지 검증하는 데 유용하다. Nginx 설정 변경, 보안 그룹 변경, 웹루트 변경 후에는 반드시 다시 확인해야 한다."
              />
              <CodeBlock code={`sudo certbot renew --dry-run`} />
              <NoteRow
                title="3. 80번 포트와 challenge 경로 확인"
                body="HTTP-01 challenge는 80번 포트로 들어온다. 보안 그룹, 방화벽, Nginx server block, 리다이렉트 설정이 /.well-known/acme-challenge 경로를 막지 않는지 확인해야 한다."
              />
              <CodeBlock
                code={`curl -i http://api.dobonglife.co.kr/.well-known/acme-challenge/health-check-file`}
              />
              <NoteRow
                title="4. Nginx reload 자동화"
                body="인증서 파일이 갱신되어도 Nginx가 새 파일을 읽지 않으면 클라이언트는 이전 인증서를 계속 볼 수 있다. 갱신 성공 후 reload hook 또는 별도 배포 절차를 둬야 한다."
              />
              <CodeBlock code={`sudo nginx -t && sudo systemctl reload nginx`} />
              <NoteRow
                title="5. 외부 관측 기반 만료일 모니터링"
                body="서버 내부 파일 상태만 보지 말고, 외부에서 443 포트로 접속했을 때 제공되는 인증서의 notAfter를 주기적으로 확인해야 한다. 이 값이 사용자가 실제로 보는 인증서다."
              />
              <CodeBlock
                code={`echo | openssl s_client \\
  -connect api.dobonglife.co.kr:443 \\
  -servername api.dobonglife.co.kr 2>/dev/null | \\
  openssl x509 -noout -dates`}
              />
              <NoteRow
                title="6. 만료 알림 단계화"
                body="Let's Encrypt 인증서는 유효기간이 짧기 때문에 만료 직전에만 알림을 받으면 대응 시간이 부족할 수 있다. 만료 30일, 14일, 7일, 3일 전처럼 여러 단계로 알림을 두고, 알림에는 도메인, 현재 notAfter, 갱신 실패 로그 위치를 함께 남기는 편이 안전하다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              이 장애에서 배운 점
            </h2>
            <div className="mt-6">
              <NoteRow
                title="공통 기능이 동시에 실패하면 공통 의존성을 먼저 본다"
                body="로그인, 소셜 로그인, 비밀번호 찾기, 이메일 인증이 모두 실패한다면 각 API의 비즈니스 로직을 하나씩 보기보다 API 도메인, TLS, 인증 미들웨어, 데이터베이스처럼 같이 쓰는 의존성을 먼저 보는 편이 빠르다."
              />
              <NoteRow
                title="서버가 살아 있다는 것과 요청이 도달한다는 것은 다르다"
                body="프로세스가 정상이고 health check가 내부에서 통과하더라도, 사용자의 HTTPS 요청이 DNS, 보안 그룹, 로드밸런서, Nginx, TLS 검증을 통과하지 못하면 애플리케이션에는 아무 요청도 들어오지 않는다."
              />
              <NoteRow
                title="access log가 없으면 더 바깥 계층을 본다"
                body="백엔드 로그에 없고 Nginx access log에도 없다면 HTTP 요청 이전의 단계일 수 있다. DNS 해석, TCP 연결, TLS 핸드셰이크, SNI, 인증서 유효기간을 확인해야 한다."
              />
              <NoteRow
                title="긴급 복구와 운영 자동화는 분리한다"
                body="장애 중에는 Nginx를 잠시 중단하고 standalone 갱신으로 복구할 수 있다. 하지만 이 방식이 다시 자동 갱신에 실패한다면 같은 장애가 반복된다. 복구 후에는 webroot, nginx plugin, DNS-01 같은 운영 가능한 갱신 경로로 바꿔야 한다."
              />
              <NoteRow
                title="만료일은 알림으로 관리한다"
                body="Let's Encrypt 인증서는 유효기간이 짧다. 자동 갱신 실패를 사람이 만료 당일에야 발견하는 구조는 위험하다. 만료 30일, 14일, 7일, 3일 전처럼 여러 단계로 알림을 두는 편이 안전하다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                이번 장애는 서버 애플리케이션이 죽어서 발생한 문제가 아니었다.
                API 도메인의 TLS 인증서가 만료되면서 앱이 HTTPS 연결을 신뢰하지
                못했고, 그 결과 인증 관련 API 호출이 모두 실패했다. 요청은
                HTTP 계층까지 올라오지 못했기 때문에 백엔드 로그와 Nginx access log가
                비어 보였다.
              </p>
              <p>
                직접 복구는 인증서 갱신으로 끝났지만, 근본적인 개선은 Certbot 갱신
                방식을 운영 구조에 맞게 바꾸는 것이다. Nginx가 80번 포트를 상시
                사용하는 서버에서 standalone 갱신은 충돌 가능성이 크다. webroot
                방식으로 challenge 파일을 Nginx가 서빙하게 만들고, dry-run, reload
                hook, 만료일 모니터링까지 연결해야 같은 장애를 막을 수 있다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
