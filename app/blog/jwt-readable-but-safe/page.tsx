import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "JWT는 모두가 열어볼 수 있는데 왜 안전할까? | Blog",
  description:
    "JWT가 Base64URL로 열어볼 수 있는데도 인증에 쓰이는 이유를 JWS 서명, 변조 탐지, claim 검증, JWE와의 차이, 운영 보안 관점에서 정리한 글",
};

const references = [
  {
    label: "RFC 7519 - JSON Web Token (JWT)",
    href: "https://www.rfc-editor.org/rfc/rfc7519",
  },
  {
    label: "RFC 7515 - JSON Web Signature (JWS)",
    href: "https://www.rfc-editor.org/rfc/rfc7515",
  },
  {
    label: "RFC 7516 - JSON Web Encryption (JWE)",
    href: "https://www.rfc-editor.org/rfc/rfc7516",
  },
  {
    label: "RFC 8725 - JSON Web Token Best Current Practices",
    href: "https://www.rfc-editor.org/rfc/rfc8725",
  },
  {
    label: "RFC 6750 - OAuth 2.0 Bearer Token Usage",
    href: "https://www.rfc-editor.org/rfc/rfc6750",
  },
];

export default function JwtReadableButSafeBlogPostPage() {
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
              Auth / JWT · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              JWT는 모두가 열어볼 수 있는데 왜 안전할까?
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              JWT를 처음 보면 이상합니다. 토큰을 복사해서 디코딩하면 사용자 ID,
              권한, 만료 시간 같은 값이 그대로 보입니다. 그런데도 인증과 인가에 많이
              쓰입니다. 이유는 JWT의 안전성이 “내용을 숨기는 것”이 아니라 “발급자가 만든
              그대로인지 검증하는 것”에 있기 때문입니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              JWT는 암호문이 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                JWT는 보통 점으로 구분된 세 부분으로 보입니다.{" "}
                <InlineCode>header.payload.signature</InlineCode> 형태입니다. 앞의 두
                부분인 header와 payload는 Base64URL로 인코딩되어 있습니다. 인코딩은
                암호화가 아닙니다. 누구나 디코딩해서 JSON을 읽을 수 있습니다.
              </p>
              <p>
                header에는 어떤 알고리즘으로 서명했는지 같은 메타데이터가 들어갑니다.
                payload에는 <InlineCode>sub</InlineCode>, <InlineCode>role</InlineCode>,{" "}
                <InlineCode>exp</InlineCode>, <InlineCode>iss</InlineCode>,{" "}
                <InlineCode>aud</InlineCode> 같은 claim이 들어갑니다. 이 값은 애플리케이션이
                사용자를 식별하거나 권한을 판단하는 데 사용할 수 있습니다.
              </p>
              <p>
                그래서 JWT payload에는 비밀번호, 주민등록번호, 결제 카드 번호, 내부
                secret 같은 민감 정보를 넣으면 안 됩니다. JWT를 안전하게 쓴다는 말은
                payload를 비밀스럽게 숨긴다는 뜻이 아닙니다. payload가 공개되어도 문제가
                없는 정보만 넣고, 그 정보가 변조되지 않았는지 검증한다는 뜻입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/jwt-readable-structure.png"
              alt="JWT가 header, payload, signature 세 부분으로 나뉘고 header와 payload는 누구나 읽을 수 있음을 보여주는 다이어그램"
              width={1440}
              height={900}
              caption="JWT의 header와 payload는 Base64URL 인코딩이라 누구나 읽을 수 있습니다. JWT의 핵심은 숨김이 아니라 signature로 변조를 탐지하는 것입니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              안전성은 signature에서 나온다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                JWT가 인증에 쓰일 수 있는 이유는 세 번째 부분인 signature 때문입니다.
                발급자는 header와 payload를 합친 값에 secret key 또는 private key를 사용해
                서명을 만듭니다. API 서버는 토큰을 받을 때 같은 규칙으로 서명을 다시
                검증합니다.
              </p>
              <p>
                대칭키 방식인 <InlineCode>HS256</InlineCode>은 발급자와 검증자가 같은
                secret을 공유합니다. 비대칭키 방식인 <InlineCode>RS256</InlineCode>이나{" "}
                <InlineCode>ES256</InlineCode>은 발급자가 private key로 서명하고, 검증자는
                public key로 검증합니다. 어느 방식이든 공격자가 key 없이 유효한 서명을
                새로 만들 수 없어야 합니다.
              </p>
              <p>
                따라서 JWT를 검증한다는 것은 “payload를 믿는다”가 아닙니다. “이 payload는
                우리가 신뢰하는 발급자가 만들었고, 전송 중 바뀌지 않았으며, 아직 유효한
                정책 안에 있다”를 확인하는 과정입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/jwt-signature-verification-flow.png"
              alt="인증 서버가 JWT를 서명해 발급하고 API 서버가 signature와 claim을 검증하는 흐름"
              width={1440}
              height={900}
              caption="API 서버는 signature를 검증한 뒤 exp, iss, aud 같은 claim도 함께 검증해야 합니다. 서명이 맞아도 만료됐거나 다른 audience용이면 거부해야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              읽을 수 있어도 마음대로 바꿀 수는 없다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                공격자가 payload를 열어보고 <InlineCode>{`"role": "user"`}</InlineCode>를{" "}
                <InlineCode>{`"role": "admin"`}</InlineCode>으로 바꾸는 것은 어렵지
                않습니다. Base64URL로 다시 인코딩하면 겉보기에는 그럴듯한 JWT 문자열을
                만들 수 있습니다.
              </p>
              <p>
                하지만 payload가 바뀌면 기존 signature는 더 이상 맞지 않습니다. signature는
                header와 payload를 입력으로 만들어졌기 때문입니다. 공격자가 key를 모르면
                변경된 payload에 맞는 유효한 signature를 다시 만들 수 없습니다.
              </p>
              <p>
                서버가 signature 검증을 제대로 하면 이 토큰은 거부됩니다. 반대로 signature
                검증을 생략하거나, 클라이언트가 디코딩한 payload만 보고 권한을 판단하면
                JWT를 쓰는 의미가 사라집니다. JWT는 “읽으면 믿어도 되는 문자열”이 아니라
                “검증한 뒤에만 믿을 수 있는 문자열”입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/jwt-tamper-detection.png"
              alt="JWT payload의 role을 user에서 admin으로 바꾸면 signature 검증이 실패하는 구조"
              width={1440}
              height={900}
              caption="payload를 바꾸는 순간 signature가 깨집니다. key 없이 새 signature를 만들 수 없다는 점이 JWT 변조 방지의 핵심입니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              JWS와 JWE를 구분해야 한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                우리가 흔히 보는 JWT는 대부분 JWS, 즉 JSON Web Signature 형태입니다.
                JWS의 목적은 payload를 숨기는 것이 아니라 payload가 변조되지 않았음을
                보장하는 것입니다. 그래서 payload는 읽힙니다.
              </p>
              <p>
                payload 자체를 숨겨야 한다면 JWE, 즉 JSON Web Encryption을 사용해야 합니다.
                JWE는 encrypted key, initialization vector, ciphertext, authentication tag
                등을 포함하는 다른 구조를 사용합니다. 목적은 기밀성입니다.
              </p>
              <p>
                하지만 실무에서는 JWE보다 “민감한 값은 토큰에 넣지 않고 서버 저장소에
                둔다”는 선택이 더 단순할 때도 많습니다. JWT에 무엇을 넣을지 결정할 때는
                먼저 이 값이 사용자나 제3자에게 보여도 되는지부터 판단해야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/jwt-jws-vs-jwe.png"
              alt="JWS는 보이지만 변조를 막고 JWE는 payload를 암호화해 기밀성을 제공한다는 차이"
              width={1440}
              height={900}
              caption="Signed JWT와 Encrypted JWT는 목적이 다릅니다. 일반적인 JWT는 JWS라서 읽을 수 있고, 숨겨야 하는 정보는 JWE나 서버 저장소를 고려해야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              claim 검증이 빠지면 서명만으로는 부족하다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                signature가 맞는다는 것은 토큰이 변조되지 않았다는 뜻입니다. 하지만 그
                토큰이 지금 이 API에서 받아도 되는 토큰이라는 뜻까지 자동으로 보장하지는
                않습니다. 그래서 서버는 signature 검증과 함께 claim을 검증해야 합니다.
              </p>
              <p>
                <InlineCode>exp</InlineCode>는 만료 시간입니다. 만료된 토큰은 거부해야
                합니다. <InlineCode>nbf</InlineCode>는 이 시간 전에는 쓰지 말라는 뜻입니다.
                <InlineCode>iss</InlineCode>는 발급자이고, <InlineCode>aud</InlineCode>는
                이 토큰이 어느 대상 서비스를 위한 것인지 나타냅니다.
              </p>
              <p>
                예를 들어 admin 서비스용 token과 user API용 token을 같은 검증 키로 처리할
                수 있다면 <InlineCode>aud</InlineCode> 검증이 중요해집니다. 서명이 맞아도
                이 API를 위한 token이 아니면 거부해야 합니다. JWT 검증은 암호 검증과
                애플리케이션 정책 검증이 함께 있어야 완성됩니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              JWT를 안전하지 않게 만드는 실수
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                JWT는 형식 자체가 안전한 마법 상자가 아닙니다. 안전성은 검증 코드와 운영
                규칙에서 나옵니다. RFC 8725가 별도의 Best Current Practices로 존재하는
                이유도 JWT를 잘못 쓰는 방식이 많기 때문입니다.
              </p>
              <p>
                첫 번째 실수는 token header의 <InlineCode>alg</InlineCode>를 그대로 믿는
                것입니다. 서버는 “우리는 RS256만 받는다”처럼 허용 알고리즘을 고정해야
                합니다. 토큰이 말하는 알고리즘을 보고 검증 방식을 느슨하게 바꾸면 algorithm
                confusion 문제가 생길 수 있습니다.
              </p>
              <p>
                두 번째 실수는 secret key를 짧거나 예측 가능하게 만드는 것입니다.
                <InlineCode>HS256</InlineCode>은 secret이 약하면 brute force나 유출에
                취약합니다. 세 번째 실수는 access token의 수명을 길게 잡는 것입니다. JWT는
                기본적으로 만료 전까지 상태 없이 검증되기 때문에 탈취됐을 때 즉시 폐기하기
                어렵습니다.
              </p>
              <p>
                네 번째 실수는 저장 위치를 가볍게 보는 것입니다. 브라우저 localStorage에
                저장하면 XSS에 노출될 수 있습니다. HttpOnly cookie는 JavaScript 접근을
                막는 데 도움이 되지만 CSRF와 SameSite 정책을 함께 봐야 합니다. 어느 저장소가
                항상 정답인 것이 아니라 위협 모델에 맞춰 선택해야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/jwt-operational-guardrails.png"
              alt="JWT 운영 시 알고리즘 허용 목록, 키 관리, claim 검증, 짧은 수명, 탈취 대응이 필요하다는 체크리스트"
              width={1440}
              height={900}
              caption="JWT가 안전하려면 서명 검증만이 아니라 알고리즘 고정, 키 관리, claim 검증, 짧은 만료 시간, 탈취 대응 전략이 함께 필요합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              토큰을 훔치면 끝이라는 점도 알아야 한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                JWT가 변조에 강하다는 말은 JWT를 훔쳐도 안전하다는 뜻이 아닙니다. Bearer
                token은 이름 그대로 “가진 사람이 제시하면” 권한을 행사할 수 있는 토큰입니다.
                공격자가 유효한 access token을 탈취하면, 서버 입장에서는 정상 사용자와
                구분하기 어렵습니다.
              </p>
              <p>
                그래서 HTTPS는 기본이고, token 저장소와 수명 관리가 중요합니다. access
                token은 짧게 가져가고, refresh token은 더 강하게 보호하며, refresh token
                rotation이나 denylist, token version 같은 폐기 전략을 상황에 맞게 둡니다.
              </p>
              <p>
                JWT의 장점은 서버가 매 요청마다 세션 저장소를 조회하지 않아도 독립적으로
                검증할 수 있다는 점입니다. 반대로 그 장점 때문에 즉시 폐기와 강제 로그아웃은
                별도 설계가 필요합니다. 이 trade-off를 알고 써야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                JWT는 모두가 열어볼 수 있습니다. 그래서 안전하지 않은 것이 아니라, 애초에
                내용을 숨기는 도구가 아닙니다. 일반적인 Signed JWT의 목적은 payload의
                기밀성이 아니라 무결성과 발급자 검증입니다.
              </p>
              <p>
                안전성은 signature에서 나옵니다. payload를 바꾸면 signature가 깨지고,
                key 없이 유효한 signature를 다시 만들 수 없습니다. 하지만 서버가 반드시
                signature와 claim을 검증해야만 이 성질이 의미가 있습니다.
              </p>
              <p>
                따라서 JWT를 쓸 때의 원칙은 단순합니다. payload에는 공개되어도 되는 claim만
                넣고, 알고리즘과 키를 안전하게 관리하고, exp/iss/aud/scope를 검증하고,
                탈취와 폐기 전략을 별도로 설계해야 합니다. JWT는 비밀 상자가 아니라 검증
                가능한 주장입니다.
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

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
      {children}
    </code>
  );
}
