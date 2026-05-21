import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "CORS는 서버 에러가 아니라 브라우저의 차단이다 | Blog",
  description:
    "Origin, Access-Control-Allow-Origin, Preflight, Credentials, WebView, 모바일 앱, 실제 API 보안과 CORS의 경계를 정리한 글",
};

const references = [
  {
    label: "RFC 6454 - The Web Origin Concept",
    href: "https://www.rfc-editor.org/rfc/rfc6454",
  },
  {
    label: "WHATWG Fetch Standard - CORS protocol",
    href: "https://fetch.spec.whatwg.org/#cors-protocol",
  },
  {
    label: "MDN - Cross-Origin Resource Sharing (CORS)",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
  },
  {
    label: "MDN - Preflight request",
    href: "https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request",
  },
  {
    label: "RFC 9110 - HTTP Semantics",
    href: "https://www.rfc-editor.org/rfc/rfc9110",
  },
];

export default function CorsBrowserPolicyBlogPostPage() {
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
              Web Security / Browser · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              CORS는 서버 에러가 아니라 브라우저의 차단이다
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              CORS 에러는 백엔드가 무조건 500을 낸다는 뜻이 아닙니다. 서버가 응답을
              했더라도 브라우저가 그 응답을 프론트 코드에 넘겨주지 않을 수 있습니다.
              이 차이를 모르면 Network 탭에는 200이 보이는데 화면에서는 실패하는 상황을
              이해하기 어렵습니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              CORS가 해결하려는 문제
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                CORS는 Cross-Origin Resource Sharing의 약자입니다. 이름만 보면 리소스를
                공유하게 해 주는 기능처럼 보이지만, 실제로는 브라우저가 다른 Origin 간
                HTTP 요청의 응답 사용을 제한하는 보안 정책입니다.
              </p>
              <p>
                브라우저는 사용자를 대신해 쿠키, 세션, 인증 정보가 붙은 요청을 보낼 수
                있습니다. 아무 웹사이트의 JavaScript나 다른 서비스의 응답을 마음대로 읽을
                수 있다면, 악성 사이트가 사용자의 세션을 이용해 민감한 API 응답을 가져갈
                수 있습니다. CORS는 이런 상황에서 브라우저가 응답을 프론트 코드에 넘겨도
                되는지 확인하는 절차입니다.
              </p>
              <p>
                그래서 CORS는 서버 하나만의 설정 문제가 아니라 브라우저, 프론트 Origin,
                API 서버의 응답 헤더가 함께 만드는 규칙입니다. 서버는 “이 Origin에는
                응답을 공유해도 된다”라고 헤더로 말하고, 브라우저가 그 말을 검사해
                허용하거나 차단합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Origin은 protocol, host, port의 조합이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Origin은 세 값의 조합입니다. <InlineCode>protocol</InlineCode>,{" "}
                <InlineCode>host</InlineCode>, <InlineCode>port</InlineCode>가 모두 같아야
                같은 Origin입니다. 셋 중 하나라도 다르면 브라우저는 Cross-Origin 요청으로
                봅니다.
              </p>
              <p>
                예를 들어 <InlineCode>http://localhost:3000</InlineCode>에서 실행 중인
                React 앱이 <InlineCode>http://localhost:8080</InlineCode>의 Spring Boot
                API를 호출하면 host는 같아도 port가 다르므로 Cross-Origin 요청입니다.
                <InlineCode>localhost</InlineCode>와 <InlineCode>127.0.0.1</InlineCode>도
                문자열상 host가 다르기 때문에 다른 Origin으로 취급됩니다.
              </p>
              <p>
                HTTPS 혼합도 별개로 봐야 합니다. 프론트가{" "}
                <InlineCode>https://myapp.com</InlineCode>인데 API가{" "}
                <InlineCode>http://api.myapp.com</InlineCode>이면 protocol이 다릅니다.
                이 경우 CORS 문제와 mixed content 문제가 동시에 보일 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/cors-origin-tuple.png"
              alt="Origin이 protocol, host, port의 조합이며 포트가 다르면 다른 Origin이 되는 구조"
              width={1440}
              height={900}
              caption="Origin은 protocol, host, port의 조합입니다. localhost라도 3000과 8080은 서로 다른 Origin입니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              서버가 허용하고 브라우저가 차단한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                브라우저는 Cross-Origin 요청을 보낼 때 <InlineCode>Origin</InlineCode>
                헤더를 함께 보냅니다. 이 헤더는 “이 요청은 어느 Origin에서 시작됐는가”를
                서버에 알려 줍니다.
              </p>
              <CodeBlock
                code={`Origin: http://localhost:3000`}
              />
              <p>
                서버는 응답에 <InlineCode>Access-Control-Allow-Origin</InlineCode>을 넣어
                허용할 Origin을 알려 줍니다. 브라우저는 이 값을 보고 현재 프론트 Origin과
                맞는지 검사합니다.
              </p>
              <CodeBlock
                code={`Access-Control-Allow-Origin: http://localhost:3000`}
              />
              <p>
                핵심은 차단 주체가 브라우저라는 점입니다. API 서버가 정상적으로 JSON을
                만들고 200 OK로 응답했더라도, 브라우저가 CORS 헤더를 보고 응답을 JavaScript
                코드에 넘기지 않을 수 있습니다. 그래서 Network 탭에는 200이 보이는데
                프론트 콘솔에는 CORS 에러가 뜨는 상황이 가능합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/cors-browser-enforcement-flow.png"
              alt="브라우저가 Origin 헤더를 보내고 서버가 Access-Control-Allow-Origin을 응답한 뒤 브라우저가 응답 사용 여부를 판단하는 흐름"
              width={1440}
              height={900}
              caption="CORS에서 서버는 정책을 응답 헤더로 전달하고, 브라우저가 그 정책을 검사해 프론트 코드에 응답을 넘길지 결정합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              가장 흔한 에러 메시지
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                CORS에서 가장 자주 보는 메시지는 다음과 같습니다.
              </p>
              <CodeBlock
                code={`No 'Access-Control-Allow-Origin' header is present on the requested resource.`}
              />
              <p>
                의미는 단순합니다. 브라우저가 API 응답을 받았지만, 그 응답에 현재 Origin을
                허용한다는 <InlineCode>Access-Control-Allow-Origin</InlineCode> 헤더가
                없었다는 뜻입니다. 서버가 죽었다는 뜻이 아니라, 응답 공유 정책이 없거나
                현재 Origin과 맞지 않았다는 뜻입니다.
              </p>
              <p>
                따라서 첫 질문은 “API가 실제로 실패했는가?”가 아니라 “브라우저가 응답을
                프론트 코드에 넘겨도 된다고 판단할 수 있는 헤더가 있었는가?”입니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Simple Request와 Preflight Request
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                모든 CORS 요청이 같은 방식으로 동작하지는 않습니다. 브라우저가 비교적
                단순하다고 보는 요청은 바로 실제 요청을 보냅니다. 대표적으로 특정 조건을
                만족하는 <InlineCode>GET</InlineCode>, <InlineCode>HEAD</InlineCode>,{" "}
                <InlineCode>POST</InlineCode> 요청이 여기에 들어갑니다.
              </p>
              <p>
                반대로 브라우저가 더 조심해야 한다고 판단하는 요청은 실제 요청 전에
                <InlineCode>OPTIONS</InlineCode> 선요청을 보냅니다. 이것을 Preflight
                Request라고 합니다. <InlineCode>PUT</InlineCode>,{" "}
                <InlineCode>DELETE</InlineCode>, <InlineCode>Authorization</InlineCode>
                헤더, <InlineCode>application/json</InlineCode> 요청은 실무에서 preflight를
                자주 발생시키는 조건입니다.
              </p>
              <p>
                Preflight 요청에는 실제 데이터를 바꾸는 body가 없습니다. 브라우저가
                “이 method와 header를 사용해도 되는가?”를 먼저 묻는 절차입니다. 서버가
                <InlineCode>Access-Control-Allow-Methods</InlineCode>,{" "}
                <InlineCode>Access-Control-Allow-Headers</InlineCode> 등으로 허용한다고
                응답하면 그때 실제 요청이 진행됩니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/cors-simple-preflight-sequence.png"
              alt="Simple Request는 바로 실제 요청을 보내고 Preflight Request는 OPTIONS 요청 후 실제 요청을 보내는 흐름"
              width={1440}
              height={900}
              caption="Preflight는 브라우저가 실제 요청 전에 서버의 허용 정책을 확인하는 OPTIONS 요청입니다. OPTIONS가 프록시나 게이트웨이에서 막히면 실제 요청은 시작되지 않습니다."
            />
            <CodeBlock
              code={`OPTIONS /api/user
Origin: http://localhost:3000
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: authorization, content-type

HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: authorization, content-type`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              모든 Origin 허용과 credentials의 충돌
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>Access-Control-Allow-Origin: *</InlineCode>은 모든 Origin에
                응답을 공유해도 된다는 뜻입니다. 공개 이미지, 공개 폰트, 누구에게나
                열려 있는 public API처럼 사용자별 권한이 없는 리소스에서는 사용할 수
                있습니다.
              </p>
              <p>
                하지만 쿠키나 세션을 사용하는 요청에서는 이야기가 달라집니다. 아래 조합은
                브라우저가 차단합니다.
              </p>
              <CodeBlock
                code={`Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true`}
              />
              <p>
                이유는 명확합니다. 아무 Origin이나 허용하면서 사용자의 쿠키까지 함께
                쓰게 하면, 악성 사이트가 사용자의 로그인 세션을 이용해 민감한 응답을 읽을
                수 있습니다. 그래서 credentials를 포함하려면 서버는 wildcard가 아니라
                명시적인 Origin을 반환해야 합니다.
              </p>
              <CodeBlock
                code={`Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Credentials: true`}
              />
              <p>
                프론트 코드도 쿠키를 보낼 의도를 명시해야 합니다. <InlineCode>fetch</InlineCode>
                를 쓴다면 <InlineCode>{`credentials: "include"`}</InlineCode>가
                필요합니다.
              </p>
              <CodeBlock
                code={`fetch(url, {
  credentials: "include"
})`}
              />
            </div>
            <BlogDiagram
              src="/blog/cors-credentials-wildcard.png"
              alt="Access-Control-Allow-Origin wildcard와 Allow-Credentials true 조합은 차단되고 명시 Origin은 허용되는 구조"
              width={1440}
              height={900}
              caption="쿠키/세션 인증을 쓰는 CORS 요청은 명시적인 Origin과 Access-Control-Allow-Credentials가 함께 필요합니다. wildcard와 credentials 조합은 브라우저가 차단합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              React와 Spring Boot에서 자주 보는 구조
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                개발 환경에서는 프론트와 백엔드가 서로 다른 포트에서 실행되는 경우가
                많습니다.
              </p>
              <CodeBlock
                code={`Frontend: http://localhost:3000
Backend:  http://localhost:8080`}
              />
              <p>
                이 둘은 port가 다르므로 다른 Origin입니다. 따라서 백엔드는 적어도 개발
                환경에서 <InlineCode>http://localhost:3000</InlineCode>을 허용해야 합니다.
                운영 환경에서는 <InlineCode>https://myapp.com</InlineCode>처럼 실제 프론트
                도메인을 허용합니다.
              </p>
              <p>
                실무에서는 이 값을 코드에 박아두기보다 환경변수로 관리합니다. 개발,
                스테이징, 운영마다 허용 Origin이 다르기 때문입니다.
              </p>
              <CodeBlock
                code={`CORS_ALLOWED_ORIGINS=https://myapp.com,https://admin.myapp.com`}
              />
              <p>
                또 하나 자주 빠지는 지점이 있습니다. 백엔드 CORS 설정은 맞는데 Nginx,
                ALB, API Gateway가 <InlineCode>OPTIONS</InlineCode> 요청을 막으면
                preflight에서 실패합니다. 이 경우 백엔드 로그에는 실제 API 요청이 보이지
                않을 수 있습니다. 브라우저가 실제 요청을 보내기 전에 멈췄기 때문입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/cors-env-proxy-preflight.png"
              alt="프론트, Nginx 또는 ALB, Spring API, 환경변수 허용 Origin 설정과 OPTIONS 처리 경로"
              width={1440}
              height={900}
              caption="CORS 설정은 백엔드 코드만 보면 끝나지 않습니다. 프론트 Origin, 경유 프록시의 OPTIONS 처리, 환경별 허용 Origin 목록이 함께 맞아야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              설치형 앱과 CORS
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                중요한 점은 CORS가 브라우저 보안 정책이라는 것입니다. 일반적인 모바일
                네이티브 앱, 데스크탑 앱, 서버 프로그램은 브라우저가 아니므로 보통 CORS
                검사를 하지 않습니다. React Native, Flutter, Android Native, iOS Native
                앱이 API를 호출할 때 <InlineCode>Access-Control-Allow-Origin</InlineCode>
                헤더가 없어도 동작할 수 있는 이유가 여기에 있습니다.
              </p>
              <p>
                예외는 WebView입니다. Android WebView, WKWebView, React Native WebView는
                내부적으로 브라우저 엔진을 사용합니다. 그래서 <InlineCode>file://</InlineCode>,
                <InlineCode>capacitor://</InlineCode>, <InlineCode>ionic://</InlineCode>
                같은 특수 Origin이 등장하고, 이 Origin을 서버가 어떻게 허용할지 문제가
                될 수 있습니다.
              </p>
              <p>
                따라서 “앱에서는 되는데 웹에서는 안 된다” 또는 “Postman에서는 되는데
                브라우저에서는 안 된다”는 말은 CORS 문제의 강한 신호입니다. API 서버가
                완전히 막힌 것이 아니라, 브라우저 보안 정책에서 응답 사용이 차단됐을
                가능성이 큽니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/cors-browser-only-security-boundary.png"
              alt="브라우저와 WebView는 CORS 검사 대상이고 curl, Postman, 모바일 네이티브, 서버 간 통신은 일반적으로 CORS 영향을 받지 않는 구조"
              width={1440}
              height={900}
              caption="CORS는 브라우저 계층의 정책입니다. API 자체를 보호하려면 인증, 인가, Rate Limiting, WAF, 방화벽 같은 별도 보안 장치가 필요합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              CORS는 API 보안 장치가 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                CORS는 “브라우저가 이 응답을 프론트 코드에 넘겨도 되는가”를 결정하는
                정책입니다. API 서버 자체를 보호하는 인증 장치가 아닙니다.{" "}
                <InlineCode>curl</InlineCode>, Postman, 모바일 앱, 서버 간 통신은 일반적으로
                CORS를 따르지 않습니다.
              </p>
              <p>
                그래서 운영 API를 보호하려면 CORS만 믿으면 안 됩니다. 실제 보안은
                Authentication, Authorization, JWT, OAuth, API Key, Session Validation,
                Rate Limiting, WAF, Firewall 같은 장치로 설계해야 합니다.
              </p>
              <p>
                CORS 설정은 프론트가 API 응답을 사용할 수 있게 하는 브라우저 정책의
                선언입니다. 보안의 출발점일 수는 있지만, API 접근 제어의 최종 방어선은
                아닙니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              실무 체크리스트
            </h2>
            <div className="mt-6">
              <NoteRow
                title="현재 프론트 Origin을 정확히 확인한다"
                body="localhost와 127.0.0.1, http와 https, 3000과 8080은 모두 다를 수 있습니다. 브라우저 개발자 도구의 Request Headers에서 Origin 값을 먼저 확인합니다."
              />
              <NoteRow
                title="서버 응답의 Access-Control-Allow-Origin을 본다"
                body="응답에 헤더가 없는지, wildcard인지, 현재 Origin과 정확히 일치하는지 확인합니다. credentials 요청이면 wildcard를 사용할 수 없습니다."
              />
              <NoteRow
                title="Preflight가 발생하는 요청인지 본다"
                body="PUT, DELETE, Authorization, application/json 등이 있으면 OPTIONS 선요청이 나갈 수 있습니다. 프록시, ALB, API Gateway가 OPTIONS를 통과시키는지 확인합니다."
              />
              <NoteRow
                title="쿠키/세션이면 프론트와 서버를 같이 본다"
                body="서버에는 Access-Control-Allow-Credentials: true와 명시 Origin이 필요하고, 프론트 fetch에는 credentials: include가 필요합니다. SameSite 쿠키 정책도 함께 확인해야 합니다."
              />
              <NoteRow
                title="CORS와 API 보안을 혼동하지 않는다"
                body="브라우저에서 막힌다고 API가 안전한 것은 아닙니다. curl, Postman, 서버 프로그램은 CORS를 우회할 수 있으므로 인증과 인가는 반드시 별도로 설계합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                CORS는 브라우저가 Cross-Origin 응답을 프론트 코드에 넘겨도 되는지 판단하는
                정책입니다. 서버는 허용 정책을 헤더로 말하고, 브라우저가 실제 차단을
                수행합니다.
              </p>
              <p>
                그래서 CORS 문제를 볼 때는 “서버가 죽었나?”보다 “요청 Origin은 무엇이고,
                응답의 CORS 헤더는 무엇이며, preflight가 통과했는가?”를 먼저 봐야 합니다.
                특히 쿠키/세션 인증에서는 wildcard를 쓰지 못하고 명시 Origin과 credentials
                설정이 함께 맞아야 합니다.
              </p>
              <p>
                마지막으로 CORS는 API 보안의 전부가 아닙니다. 브라우저 밖의 호출자는 CORS
                영향을 받지 않을 수 있습니다. CORS는 브라우저와 프론트 앱을 위한 응답 공유
                정책이고, 실제 API 보호는 인증과 인가로 완성해야 합니다.
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
