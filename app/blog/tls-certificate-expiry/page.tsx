import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "인증서 만료로 앱 로그인 전체가 막힌 장애 분석 | Blog",
  description:
    "도봉라이프 API 도메인의 TLS 인증서 만료로 앱 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 동시에 실패한 장애를 진단하고 복구한 기록",
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
              도봉라이프 앱에서 일반 로그인, 카카오 로그인, 비밀번호 찾기,
              이메일 인증이 동시에 실패했습니다. 서버는 살아 있었지만 신규
              요청이 서버와 Nginx 로그에 남지 않았고, 최종 원인은 API 도메인의
              TLS 인증서 만료였습니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 요약
            </h2>
            <div className="mt-6">
              <NoteRow
                title="영향 범위"
                body="앱에서 API 호출이 필요한 인증 기능이 전반적으로 실패했습니다. 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 모두 실패했고, 앱에는 네트워크 연결 상태가 원활하지 않다는 형태의 오류가 표시되었습니다."
              />
              <NoteRow
                title="사용자 관점의 증상"
                body="특정 계정이나 특정 인증 방식만 실패한 것이 아니라 로그인과 계정 복구에 필요한 API 연결 자체가 실패했습니다. 사용자는 인증 정보가 틀렸는지, 카카오 연동이 문제인지, 네트워크가 불안정한지 구분하기 어려운 상태였습니다."
              />
              <NoteRow
                title="운영 관점의 이상 징후"
                body="서버 프로세스는 정상적으로 떠 있었지만 새 요청을 보냈을 때 애플리케이션 로그에 아무것도 찍히지 않았습니다. Nginx access log에서도 요청이 감지되지 않아 애플리케이션 내부 오류보다는 요청이 서버 계층에 도달하기 전 단계의 문제를 의심했습니다."
              />
              <NoteRow
                title="판단 포인트"
                body="특정 API의 비즈니스 로직 오류가 아니라 API 도메인, DNS, TCP 연결, TLS 인증서처럼 모든 인증 기능이 공유하는 네트워크 경로를 먼저 의심했습니다. 서버가 살아 있다는 사실과 사용자 요청이 HTTP 처리 단계까지 도달한다는 사실은 분리해서 봐야 합니다."
              />
              <NoteRow
                title="직접 원인"
                body="api.dobonglife.co.kr의 Let's Encrypt 인증서가 2026년 5월 13일 23:55:25 UTC에 만료되어 있었습니다. 한국 시간으로는 2026년 5월 14일 08:55:25 KST이며, 장애가 확인된 날짜와 일치했습니다."
              />
              <NoteRow
                title="복구 방향"
                body="Certbot으로 인증서를 갱신했고, 이후 인증서 만료일이 2026년 8월 12일 04:08:03 UTC로 연장된 것을 확인했습니다. 이후 반복 갱신 실패를 막기 위해 Nginx와 충돌하는 standalone 방식 대신 webroot 방식으로 갱신 구조를 바꾸는 방향으로 정리했습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              첫 증상에서 네트워크 계층까지
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                프론트엔드 동료가 앱 로그인이 되지 않는다고 제보했습니다. 처음에는
                특정 로그인 API나 카카오 로그인 연동 문제일 수 있다고 볼 수
                있었지만, 확인 범위를 넓히자 일반 로그인, 카카오 로그인, 비밀번호
                찾기, 이메일 인증이 모두 실패하고 있었습니다. 서로 다른 기능이
                동시에 실패한다는 점은 개별 비즈니스 로직보다는 공통 의존성 문제에
                가깝습니다.
              </p>
              <p>
                앱에는 “네트워크 연결 상태가 원활하지 않습니다”라는 오류가
                표시되었습니다. 이런 메시지는 실제 사용자의 네트워크 문제일 수도
                있지만, HTTPS 연결 실패, DNS 실패, TLS 검증 실패, 프록시 연결 실패,
                서버 timeout처럼 앱이 정상적인 HTTP 응답을 받지 못한 경우에도 같은
                상위 오류로 묶여 보일 수 있습니다.
              </p>
              <p>
                서버 로그를 확인했을 때 서버 프로세스는 살아 있었고, 서비스가 완전히
                내려간 상태는 아니었습니다. 하지만 새 요청을 시도해도 애플리케이션
                로그에 요청이 찍히지 않았고, Nginx access log에도 요청이 남지
                않았습니다. 이 시점에서 문제는 “서버가 요청을 처리하다 실패했다”가
                아니라 “요청이 서버의 HTTP 처리 단계까지 오지 못했다”에 가까워졌습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/dobonglife-cert-incident-flow.png"
              alt="앱 로그인 장애 진단 흐름"
              width={1672}
              height={941}
              caption="여러 인증 기능이 동시에 실패했고, 서버와 Nginx 로그가 비어 있어 DNS와 TLS 같은 네트워크 계층으로 조사 범위를 옮겼습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              원인 분석 흐름을 순서로 보면
            </h2>
            <div className="mt-6">
              <NoteRow
                title="1. 공통 기능 동시 실패"
                body="일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증은 서로 다른 기능처럼 보이지만 모두 API 서버와 HTTPS로 통신합니다. 그래서 네 기능이 동시에 실패하면 개별 API 코드보다 API 도메인의 공통 연결 경로를 먼저 확인해야 합니다."
              />
              <NoteRow
                title="2. access log 부재 해석"
                body="Nginx access log와 백엔드 application log가 모두 비어 있으면 HTTP 요청이 애플리케이션까지 도달하지 않은 상태일 수 있습니다. TLS 인증서 검증 실패처럼 HTTP 이전 단계에서 연결이 끊기면 path, method, header, body가 서버에 전달되지 않습니다."
              />
              <NoteRow
                title="3. 서버 시간 확인"
                body="서버 시간이 크게 틀어져 있으면 정상 인증서도 만료되었거나 아직 유효하지 않은 것처럼 보일 수 있습니다. 그래서 인증서 자체를 보기 전에 date, timedatectl, NTP 동기화 상태를 먼저 확인했습니다."
              />
              <NoteRow
                title="4. SNI를 포함한 외부 인증서 확인"
                body="openssl s_client에 -servername api.dobonglife.co.kr을 지정해 실제 앱이 보는 인증서를 확인했습니다. SNI를 빼면 Nginx가 기본 인증서를 반환할 수 있어 장애 원인을 잘못 판단할 수 있습니다."
              />
              <NoteRow
                title="5. 로컬 Certbot 상태 확인"
                body="외부 443 포트에서 보이는 인증서와 /etc/letsencrypt/live/...에 있는 로컬 인증서 상태를 둘 다 확인했습니다. certbot certificates의 INVALID: EXPIRED는 로컬 갱신 상태도 실제 장애와 같은 만료일을 가리킨다는 근거였습니다."
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
                다르지만 결국 모두 API 서버와 통신해야 합니다. 일반 로그인은 계정
                검증 API를 호출하고, 카카오 로그인은 외부 인증 이후 서버에서 사용자
                계정을 연결하거나 세션을 만들어야 합니다. 비밀번호 찾기와 이메일
                인증도 메일 발송, 인증 토큰 생성, 사용자 상태 변경 같은 서버 작업을
                필요로 합니다.
              </p>
              <p>
                따라서 API 도메인의 HTTPS 연결 자체가 실패하면 인증 기능 전체가
                같이 멈춥니다. 이 장애에서는 애플리케이션 코드가 요청을 받아 예외를
                던진 것이 아니라, 클라이언트가 API 서버의 인증서를 신뢰하지 못해
                TLS 연결을 완료하지 못한 것이 핵심이었습니다.
              </p>
              <p>
                HTTP 요청은 TLS 핸드셰이크가 끝난 뒤에야 전송됩니다. 인증서가
                만료되어 클라이언트가 연결을 중단하면 HTTP path, method, header,
                body가 Nginx나 백엔드로 전달되지 않습니다. 그래서 access log에
                요청이 없고, 백엔드 로그에도 아무 흔적이 없는 상태가 만들어질 수
                있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/ssl-tls-flow.png"
              alt="클라이언트가 DNS 해석 후 TCP 연결과 TLS 인증서 검증을 통과해야 HTTP 요청이 Nginx와 API 서버에 도달하는 흐름"
              width={1672}
              height={941}
              caption="HTTP 요청은 TLS 핸드셰이크와 인증서 검증이 끝난 뒤 전송됩니다. 인증서가 만료되면 클라이언트가 연결을 중단하므로 Nginx access log와 백엔드 로그가 비어 보일 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              시간 확인과 인증서 만료 확인
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              인증서 장애를 볼 때는 서버 시간이 먼저 맞는지 확인해야 합니다. 서버
              시간이 크게 틀어져 있으면 실제로는 유효한 인증서도 만료되었거나 아직
              유효하지 않은 것처럼 보일 수 있습니다. 이 서버는 UTC 기준 시간이
              동기화되어 있었고, NTP도 활성화되어 있었습니다.
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
              다음으로 도메인에 실제로 제공되는 인증서를 확인했습니다. 여기서
              중요한 옵션은{" "}
              <InlineCode>-servername api.dobonglife.co.kr</InlineCode>입니다.
              SNI를 지정하지 않으면 서버가 기본 인증서를 내보낼 수 있어, 실제 앱이
              보는 인증서와 다른 결과를 확인할 수 있습니다.
            </p>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ openssl s_client \\
  -connect api.dobonglife.co.kr:443 \\
  -servername api.dobonglife.co.kr

depth=0 CN = api.dobonglife.co.kr
verify error:num=10:certificate has expired
notAfter=May 13 23:55:25 2026 GMT
Verification error: certificate has expired
Verify return code: 10 (certificate has expired)`}
            />
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                결과는 명확했습니다. 인증서의{" "}
                <InlineCode>notAfter</InlineCode>가 2026년 5월 13일
                23:55:25 GMT였고, OpenSSL 검증 결과는{" "}
                <InlineCode>certificate has expired</InlineCode>였습니다. 한국
                시간으로 환산하면 2026년 5월 14일 08:55:25 KST에 만료된 것입니다.
              </p>
              <p>
                이후{" "}
                <InlineCode>sudo certbot certificates</InlineCode>로 로컬
                Certbot이 관리하는 인증서 상태도 확인했습니다. 로컬 저장소의 인증서
                역시 같은 만료일을 가리키고 있었고, 상태는{" "}
                <InlineCode>INVALID: EXPIRED</InlineCode>였습니다.
              </p>
            </div>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ sudo certbot certificates
Found the following certs:
  Certificate Name: api.dobonglife.co.kr
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
                했습니다. 이 접근 자체는 방향이 맞지만, HTTPS에서는 IP 직접 접속을
                조심해야 합니다. 인증서는 보통 IP가 아니라 도메인 이름에 대해
                발급되므로, 단순히{" "}
                <InlineCode>https://서버IP</InlineCode>로 접속하면 인증서의
                CN 또는 SAN이 요청한 호스트와 맞지 않아 별도의 인증서 오류가 날 수
                있습니다.
              </p>
              <p>
                DNS 문제와 서버 문제를 분리해서 보려면{" "}
                <InlineCode>curl --resolve</InlineCode>가 더 정확합니다. 이 방식은
                URL과 Host, SNI는 원래 도메인으로 유지하면서, DNS 해석 결과만 원하는
                IP로 강제합니다. 즉 “이 도메인이 이 IP로 향할 때 HTTPS가 정상인지”를
                확인할 수 있습니다.
              </p>
            </div>
            <CodeBlock
              code={`curl -v \\
  --resolve api.dobonglife.co.kr:443:203.0.113.10 \\
  https://api.dobonglife.co.kr/health`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이 장애에서는 도메인 접속 중 인증서 만료 오류가 먼저 드러났기 때문에
              DNS보다 TLS 인증서 상태가 우선 원인으로 좁혀졌습니다.
            </p>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Certbot 갱신 실패 원인
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              인증서 만료를 확인한 뒤{" "}
              <InlineCode>sudo certbot renew</InlineCode>를 실행했지만 첫 시도는
              실패했습니다. 실패 메시지는 Certbot이 80번 포트를 열 수 없다는
              내용이었습니다.
            </p>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ sudo certbot renew
Processing /etc/letsencrypt/renewal/api.dobonglife.co.kr.conf
Renewing an existing certificate for api.dobonglife.co.kr
Failed to renew certificate api.dobonglife.co.kr with error:
Could not bind TCP port 80 because it is already in use by another process
on this system (such as a web server). Please stop the program in question
and then try again.

All renewals failed.
1 renew failure(s), 0 parse failure(s)`}
            />
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                이 메시지는 기존 갱신 설정이{" "}
                <InlineCode>standalone</InlineCode> authenticator를 사용하고
                있었기 때문에 발생했습니다. standalone 방식은 Certbot이 자체 임시
                웹서버를 띄워 HTTP-01 challenge 요청에 응답합니다. 그러려면 80번
                포트가 비어 있어야 합니다.
              </p>
              <p>
                하지만 운영 서버에서는 Nginx가 이미 80번 포트를 사용하고 있었습니다.
                이 상태에서 자동 갱신이 실행되면 Certbot은 포트를 점유하지 못하고
                실패합니다. 장애 당일 수동으로 실행했을 때 드러난 이 오류는, 자동
                갱신도 이전부터 같은 이유로 실패했을 가능성을 강하게 보여줍니다.
              </p>
              <p>
                긴급 복구만 놓고 보면 Nginx를 잠시 중단한 뒤 Certbot을 실행하면
                갱신할 수 있습니다. 실제로 Nginx를 일시 중단한 뒤 재시도하자 갱신은
                성공했습니다. 다만 이 방식은 갱신 때마다 의도적인 서비스 중단을
                만들기 때문에 운영 자동화 방식으로는 적합하지 않습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              복구 확인
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              갱신 후 Certbot이 관리하는 인증서의 만료일이 2026년 8월 12일로
              바뀐 것을 확인했습니다. 로컬 파일 상태와 외부에서 실제 제공되는
              인증서 상태를 둘 다 확인하는 것이 중요합니다. 로컬 인증서는
              갱신됐지만 Nginx가 이전 인증서를 계속 들고 있으면 클라이언트는 여전히
              만료된 인증서를 볼 수 있기 때문입니다.
            </p>
            <CodeBlock
              code={`ubuntu@ip-10-0-1-247:~$ sudo certbot certificates
Found the following certs:
  Certificate Name: api.dobonglife.co.kr
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
              이 확인은 두 가지 의미가 있습니다. 첫째,{" "}
              <InlineCode>/etc/letsencrypt/live/...</InlineCode>의 인증서 파일이
              실제로 갱신되었습니다. 둘째, 443 포트에서 Nginx가 제공하는 인증서도
              새 인증서로 바뀌었습니다. 마지막으로 앱에서 일반 로그인, 카카오 로그인,
              비밀번호 찾기, 이메일 인증처럼 사용자에게 영향을 주던 API 호출이 다시
              성공하는지 확인해야 사용자 영향 복구까지 판단할 수 있습니다.
            </p>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              webroot 방식으로 바꾼 이유
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                HTTP-01 challenge는 Let&apos;s Encrypt가{" "}
                <InlineCode>
                  http://도메인/.well-known/acme-challenge/토큰
                </InlineCode>
                경로로 접근해, 해당 도메인을 제어하고 있는지 확인하는 방식입니다.
                standalone 방식은 이 응답을 Certbot이 직접 띄운 임시 웹서버로
                처리하고, webroot 방식은 이미 실행 중인 웹서버가 특정 디렉터리의
                검증 파일을 서빙하도록 만듭니다.
              </p>
              <p>
                운영 서버에 Nginx가 상시 실행 중이라면 webroot 방식이 더 자연스럽습니다.
                Certbot은 검증 파일을 webroot 아래에 쓰고, Nginx는 기존 80번 포트를
                그대로 사용해 그 파일을 외부에 제공합니다. 이 방식은 인증서 갱신을
                위해 Nginx를 멈출 필요가 없고, 자동 갱신에도 잘 맞습니다.
              </p>
              <p>
                단, renewal 설정에서{" "}
                <InlineCode>authenticator = webroot</InlineCode>만 바꾸는 것으로는
                충분하지 않을 수 있습니다. Certbot이 토큰 파일을 어느 디렉터리에
                써야 하는지 알아야 하므로{" "}
                <InlineCode>webroot_path</InlineCode> 또는 같은 의미의 설정이
                renewal configuration에 남아 있어야 합니다. 운영에서는 수동 편집보다
                Certbot 명령으로 재발급 또는 renewal 설정 변경을 수행하고,
                <InlineCode>--dry-run</InlineCode>으로 다음 갱신까지 검증하는 편이
                안전합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/dobonglife-cert-renewal-flow.png"
              alt="Certbot standalone 방식과 webroot 방식 비교"
              width={1672}
              height={941}
              caption="standalone은 80번 포트를 직접 점유해야 하므로 Nginx와 충돌했습니다. webroot 방식은 Nginx가 계속 요청을 받고 Certbot은 검증 파일만 배치합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Nginx와 Certbot 설정 예시
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              API 서버 앞단의 Nginx가 대부분의 요청을 백엔드로 프록시하더라도,
              ACME challenge 경로만큼은 정적 파일로 응답할 수 있어야 합니다. 아래는
              webroot를 <InlineCode>/var/www/html</InlineCode>로 둔 경우의 예시입니다.
              실제 운영에서는 서버 블록, root 경로, 배포 구조에 맞게 조정해야 합니다.
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
              인증서를 webroot 방식으로 다시 발급하거나 renewal 설정을 명확히
              남길 때는 다음처럼 실행할 수 있습니다. 이미 같은 certificate name을
              쓰고 있다면 실제 명령은 운영 상태에 맞춰 조정해야 합니다.
            </p>
            <CodeBlock
              code={`sudo certbot certonly \\
  --webroot \\
  -w /var/www/html \\
  -d api.dobonglife.co.kr \\
  --cert-name api.dobonglife.co.kr`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              갱신 후 Nginx가 새 인증서를 읽도록 reload hook도 함께 두는 것이 좋습니다.
              Certbot의 deploy hook은 실제 갱신이 성공했을 때만 실행되는 용도로
              사용할 수 있습니다.
            </p>
            <CodeBlock
              code={`sudo certbot renew --dry-run
sudo certbot renew --deploy-hook "systemctl reload nginx"`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영 점검 체크리스트
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이 장애의 핵심은 인증서가 만료된 것 자체보다, 만료 전에 갱신 실패를
              발견하지 못했다는 점입니다. 같은 유형의 장애를 막으려면 갱신 경로,
              자동 실행, reload, 외부 관측을 모두 확인해야 합니다.
            </p>
            <div className="mt-6">
              <NoteRow
                title="1. 자동 갱신 스케줄 확인"
                body="Certbot이 systemd timer 또는 cron으로 주기 실행되는지 확인합니다. timer가 없다면 인증서가 만료되기 전까지 아무 일도 일어나지 않습니다."
              />
              <CodeBlock
                code={`systemctl list-timers | grep certbot
systemctl status certbot.timer
grep -R "certbot renew" /etc/cron.* /etc/crontab 2>/dev/null`}
              />
              <NoteRow
                title="2. dry-run을 배포 체크에 포함"
                body="인증서가 아직 넉넉히 남아 있어도 certbot renew --dry-run은 갱신 경로가 동작하는지 검증하는 데 유용합니다. Nginx 설정 변경, 보안 그룹 변경, 웹루트 변경 후에는 반드시 다시 확인해야 합니다."
              />
              <CodeBlock code={`sudo certbot renew --dry-run`} />
              <NoteRow
                title="3. 80번 포트와 challenge 경로 확인"
                body="HTTP-01 challenge는 80번 포트로 들어옵니다. 보안 그룹, 방화벽, Nginx server block, 리다이렉트 설정이 /.well-known/acme-challenge 경로를 막지 않는지 확인해야 합니다."
              />
              <CodeBlock
                code={`curl -i http://api.dobonglife.co.kr/.well-known/acme-challenge/health-check-file`}
              />
              <NoteRow
                title="4. Nginx reload 자동화"
                body="인증서 파일이 갱신되어도 Nginx가 새 파일을 읽지 않으면 클라이언트는 이전 인증서를 계속 볼 수 있습니다. 갱신 성공 후 reload hook 또는 별도 배포 절차를 둬야 합니다."
              />
              <CodeBlock code={`sudo nginx -t && sudo systemctl reload nginx`} />
              <NoteRow
                title="5. 외부 관측 기반 만료일 모니터링"
                body="서버 내부 파일 상태만 보지 말고, 외부에서 443 포트로 접속했을 때 제공되는 인증서의 notAfter를 주기적으로 확인해야 합니다. 이 값이 사용자가 실제로 보는 인증서입니다."
              />
              <CodeBlock
                code={`echo | openssl s_client \\
  -connect api.dobonglife.co.kr:443 \\
  -servername api.dobonglife.co.kr 2>/dev/null | \\
  openssl x509 -noout -dates`}
              />
              <NoteRow
                title="6. 만료 알림 단계화"
                body="Let's Encrypt 인증서는 유효기간이 짧기 때문에 만료 직전에만 알림을 받으면 대응 시간이 부족할 수 있습니다. 만료 30일, 14일, 7일, 3일 전처럼 여러 단계로 알림을 두고, 알림에는 도메인, 현재 notAfter, 갱신 실패 로그 위치를 함께 남기는 편이 안전합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 분석에서 배운 점
            </h2>
            <div className="mt-6">
              <NoteRow
                title="공통 기능이 동시에 실패하면 공통 의존성을 먼저 본다"
                body="로그인, 소셜 로그인, 비밀번호 찾기, 이메일 인증이 모두 실패했다면 각 API의 비즈니스 로직보다 공통 네트워크 경로, API 도메인, TLS, 인증 미들웨어, 데이터베이스 같은 shared dependency를 먼저 보는 것이 빠릅니다."
              />
              <NoteRow
                title="서버가 살아 있다는 것과 요청이 도달한다는 것은 다르다"
                body="프로세스가 정상이고 health check가 내부에서 통과하더라도, 사용자의 HTTPS 요청이 DNS, 보안 그룹, 로드밸런서, Nginx, TLS 검증을 통과하지 못하면 애플리케이션에는 아무 요청도 들어오지 않습니다."
              />
              <NoteRow
                title="access log가 없으면 더 바깥 계층을 본다"
                body="백엔드 로그에 없고 Nginx access log에도 없다면 HTTP 요청 이전의 단계일 수 있습니다. DNS 해석, TCP 연결, TLS 핸드셰이크, SNI, 인증서 유효기간을 확인해야 합니다."
              />
              <NoteRow
                title="긴급 복구와 운영 자동화는 분리한다"
                body="장애 중에는 Nginx를 잠시 중단하고 standalone 갱신으로 복구할 수 있습니다. 하지만 이 방식이 다시 자동 갱신에 실패한다면 같은 장애가 반복됩니다. 복구 후에는 webroot, nginx plugin, DNS-01 같은 운영 가능한 갱신 경로로 바꿔야 합니다."
              />
              <NoteRow
                title="만료일은 알림으로 관리한다"
                body="Let's Encrypt 인증서는 유효기간이 짧기 때문에 자동 갱신 실패를 사람이 만료 당일 발견하는 구조는 위험합니다. 만료 30일, 14일, 7일, 3일 전처럼 여러 단계로 알림을 두는 편이 안전합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              포트폴리오에서 강조할 기술 포인트
            </h2>
            <div className="mt-6">
              <NoteRow
                title="로그가 없다는 신호를 계층 문제로 해석"
                body="Spring Boot 로그와 Nginx access log가 모두 비어 있는 상황을 애플리케이션 예외가 아니라 DNS, TCP, TLS handshake, SNI, certificate validation 같은 HTTP 이전 계층의 문제로 좁혔다는 점을 강조할 수 있습니다."
              />
              <NoteRow
                title="Host와 SNI를 유지한 검증"
                body="DNS와 서버 문제를 분리할 때 단순 IP 접속은 인증서 hostname 검증을 깨뜨릴 수 있습니다. curl --resolve와 openssl s_client -servername을 사용해 Host, SNI, 실제 인증서 체인을 유지한 채 확인한 점이 중요합니다."
              />
              <NoteRow
                title="긴급 복구와 재발 방지 분리"
                body="장애 중에는 Certbot으로 인증서를 갱신해 빠르게 복구했고, 이후에는 standalone 방식의 80번 포트 충돌을 webroot, certbot renew --dry-run, Nginx reload hook, 외부 만료일 모니터링으로 이어지는 운영 개선으로 분리했습니다."
              />
              <NoteRow
                title="운영 기술 키워드"
                body="Nginx SSL termination, Let's Encrypt, Certbot standalone/webroot authenticator, HTTP-01 challenge, OpenSSL, systemd timer, cron, deploy hook, TLS expiration monitoring을 함께 언급하면 단순 장애 회고가 아니라 운영 자동화 개선 사례로 보입니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                이번 장애는 서버 애플리케이션이 죽어서 발생한 문제가 아니었습니다.
                API 도메인의 TLS 인증서가 만료되면서 앱이 HTTPS 연결을 신뢰하지
                못했고, 그 결과 인증 관련 API 호출이 모두 실패했습니다. 요청은
                HTTP 계층까지 올라오지 못했기 때문에 백엔드 로그와 Nginx access log가
                비어 보였습니다.
              </p>
              <p>
                직접 복구는 인증서 갱신으로 끝났지만, 근본적인 개선은 Certbot 갱신
                방식을 운영 구조에 맞게 바꾸는 것입니다. Nginx가 80번 포트를 상시
                사용하는 서버에서 standalone 갱신은 충돌 가능성이 큽니다. webroot
                방식으로 challenge 파일을 Nginx가 서빙하게 만들고, dry-run, reload
                hook, 만료일 모니터링까지 연결해야 같은 장애를 막을 수 있습니다.
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
