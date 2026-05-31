import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "OIDC는 OAuth 2.0 위에서 인증을 어떻게 완성하는가 | Blog",
  description:
    "OpenID Connect의 Authorization Code Flow, ID Token 검증, Discovery, JWKS, PKCE, state와 nonce를 기술적으로 정리한 글",
};

const references = [
  {
    label: "OpenID Connect Core 1.0",
    href: "https://openid.net/specs/openid-connect-core-1_0.html",
  },
  {
    label: "OpenID Connect Discovery 1.0",
    href: "https://openid.net/specs/openid-connect-discovery-1_0.html",
  },
  {
    label: "RFC 6749 - The OAuth 2.0 Authorization Framework",
    href: "https://datatracker.ietf.org/doc/html/rfc6749",
  },
  {
    label: "RFC 7519 - JSON Web Token (JWT)",
    href: "https://datatracker.ietf.org/doc/html/rfc7519",
  },
  {
    label: "RFC 7517 - JSON Web Key (JWK)",
    href: "https://datatracker.ietf.org/doc/html/rfc7517",
  },
  {
    label: "RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients",
    href: "https://datatracker.ietf.org/doc/html/rfc7636",
  },
];

export default function OidcBlogPostPage() {
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
              Identity / Auth · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[680px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              OIDC는 OAuth 2.0 위에서 인증을 어떻게 완성하는가
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              OpenID Connect는 OAuth 2.0의 권한 위임 흐름에 사용자 인증 결과를
              표준화해서 얹은 프로토콜입니다. Authorization Code Flow, ID Token,
              Discovery, JWKS, PKCE, state와 nonce가 각각 어떤 보안 문제를
              담당하는지 기술적으로 분리해 정리합니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              OIDC의 정확한 위치
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                OAuth 2.0은 기본적으로{" "}
                <strong className="font-medium text-black">
                  클라이언트가 보호 리소스에 접근할 수 있는 권한을 얻는
                  authorization framework
                </strong>
                입니다. OAuth 2.0 access token은 API 호출 권한을 표현하지만,
                그 자체만으로 “현재 사용자가 누구인지”, “어떤 인증 방식으로 언제
                인증됐는지”, “이 인증 결과를 어떤 클라이언트가 받아야 하는지”를
                표준화된 방식으로 말하지 않습니다.
              </p>
              <p>
                OpenID Connect(OIDC)는 이 빈 부분에 인증 계층을 추가합니다. OIDC를
                사용하는 클라이언트는 authorization request에{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  openid
                </code>{" "}
                scope를 포함하고, OpenID Provider는 사용자 인증 결과를{" "}
                <strong className="font-medium text-black">ID Token</strong>
                이라는 JWT로 반환합니다. 따라서 OIDC의 핵심은 “OAuth 2.0을 로그인
                용도로 쓴다”가 아니라, OAuth 2.0 흐름 위에 ID Token과 검증 규칙을
                추가해 인증 결과를 상호 운용 가능한 형태로 만든다는 점입니다.
              </p>
              <p>
                실무에서 가장 중요한 구분은{" "}
                <strong className="font-medium text-black">
                  ID Token은 클라이언트가 사용자를 인증하기 위한 토큰이고, access
                  token은 Resource Server가 API 접근 권한을 판단하기 위한 토큰
                </strong>
                이라는 점입니다. 두 토큰은 함께 발급될 수 있지만 검증 주체, 사용
                위치, 포함해야 하는 정보가 다릅니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              OIDC가 추가하는 핵심 산출물
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              OIDC는 OAuth 2.0의 authorization endpoint와 token endpoint를 그대로
              활용하면서, 인증 결과를 해석하기 위한 표준 산출물을 추가합니다.
              아래 요소를 분리해서 보면 OIDC 구현과 장애 분석이 훨씬 명확해집니다.
            </p>
            <div className="mt-6">
              <NoteRow
                title="ID Token"
                body="OpenID Provider가 Relying Party에게 발급하는 JWT입니다. iss, sub, aud, exp, iat 같은 필수 claim과 nonce, auth_time, acr, amr, email, name 같은 선택 claim을 통해 사용자 인증 결과와 토큰 수신 대상을 표현합니다."
              />
              <NoteRow
                title="UserInfo Endpoint"
                body="클라이언트가 access token을 제시하고 인증된 사용자에 대한 profile, email, phone, address 같은 claim을 조회할 수 있는 endpoint입니다. 모든 사용자 속성을 ID Token에 담을 필요가 없을 때 사용합니다."
              />
              <NoteRow
                title="Discovery Document"
                body=".well-known/openid-configuration 경로에서 얻는 JSON metadata입니다. issuer, authorization_endpoint, token_endpoint, userinfo_endpoint, jwks_uri, 지원 scope, response type, signing algorithm 등을 클라이언트가 동적으로 확인할 수 있습니다."
              />
              <NoteRow
                title="JWKS"
                body="JSON Web Key Set입니다. OpenID Provider가 ID Token 서명 검증에 필요한 공개키 집합을 jwks_uri에 게시합니다. 클라이언트는 JWT header의 kid와 alg를 기준으로 적절한 공개키를 선택합니다."
              />
              <NoteRow
                title="Claims"
                body="ID Token 또는 UserInfo 응답에 포함되는 사용자와 인증 결과에 대한 name/value 정보입니다. sub는 issuer 안에서 사용자를 식별하는 안정적인 subject이고, aud는 토큰을 받아야 하는 client_id를 나타냅니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              등장 요소
            </h2>
            <div className="mt-6">
              <NoteRow
                title="End-User"
                body="인증되는 사용자입니다. 브라우저나 앱을 통해 Relying Party에 접근하고, OpenID Provider에서 인증과 동의 절차를 수행합니다."
              />
              <NoteRow
                title="Relying Party / Client"
                body="사용자 인증 결과를 필요로 하는 애플리케이션입니다. Authorization Code Flow에서는 authorization code를 받은 뒤 token endpoint에 교환 요청을 보내 ID Token과 access token을 받습니다."
              />
              <NoteRow
                title="OpenID Provider"
                body="사용자를 인증하고 ID Token을 발급하는 OAuth 2.0 Authorization Server입니다. Google, Microsoft Entra ID, Keycloak, Auth0, Cognito 같은 시스템이 이 역할을 수행할 수 있습니다."
              />
              <NoteRow
                title="Authorization Endpoint"
                body="사용자 브라우저가 이동하는 endpoint입니다. client_id, redirect_uri, response_type, scope, state, nonce, code_challenge 같은 parameter가 포함됩니다."
              />
              <NoteRow
                title="Token Endpoint"
                body="클라이언트가 authorization code를 ID Token, access token, optional refresh token으로 교환하는 endpoint입니다. Confidential client는 client authentication을 수행하고, public client는 PKCE 검증에 의존합니다."
              />
              <NoteRow
                title="Resource Server"
                body="access token을 검증하고 보호 API 접근을 허용하거나 거절하는 서버입니다. ID Token이 아니라 access token을 기준으로 API 권한을 판단해야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Authorization Code Flow
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                현재 웹 애플리케이션과 모바일 앱에서 OIDC를 구현할 때 기본으로
                선택하는 흐름은 Authorization Code Flow입니다. 사용자의 브라우저는
                authorization endpoint를 거쳐 authorization code만 프론트 채널로
                전달받고, 실제 토큰은 클라이언트가 token endpoint와 직접 통신해
                얻습니다. 이 구조는 access token과 ID Token이 URL fragment나
                브라우저 history에 노출되는 위험을 줄입니다.
              </p>
              <p>
                Public client에서는 authorization code를 가로챈 공격자가 token
                endpoint에서 토큰으로 교환하지 못하도록 PKCE를 함께 사용해야 합니다.
                Confidential server-side client도 최신 구현에서는 PKCE를 함께 쓰는
                편이 일반적입니다. client secret은 클라이언트 인증 수단이고, PKCE는
                authorization request와 token request가 같은 클라이언트 인스턴스에서
                이어졌는지를 확인하는 수단입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/oidc-flow.png"
              alt="OIDC Authorization Code Flow에서 브라우저, Relying Party, OpenID Provider, JWKS, UserInfo, Resource API가 연결되는 흐름"
              width={1672}
              height={941}
              caption="Authorization Code Flow는 authorization code를 먼저 받고, token endpoint에서 ID Token과 access token으로 교환하는 흐름입니다."
            />
            <ol className="mt-8 grid gap-3 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <li>
                클라이언트는 discovery document에서 authorization endpoint, token
                endpoint, jwks_uri, 지원 알고리즘과 scope를 확인합니다.
              </li>
              <li>
                클라이언트는 state, nonce, PKCE code verifier와 code challenge를
                만들고 사용자를 authorization endpoint로 redirect합니다.
              </li>
              <li>
                OpenID Provider는 사용자를 인증하고 필요한 동의를 받은 뒤,
                redirect_uri로 authorization code와 state를 반환합니다.
              </li>
              <li>
                클라이언트는 반환된 state가 세션에 저장한 값과 같은지 확인합니다.
                이 검증은 authorization response가 자신이 시작한 요청에 대한
                응답인지 확인하는 최소 조건입니다.
              </li>
              <li>
                클라이언트는 authorization code, redirect_uri, code verifier를
                token endpoint에 보내고, 필요하면 client secret 또는 private key
                JWT 같은 client authentication을 수행합니다.
              </li>
              <li>
                OpenID Provider는 code와 PKCE를 검증한 뒤 ID Token, access token,
                optional refresh token을 반환합니다.
              </li>
              <li>
                클라이언트는 ID Token의 서명과 claim을 검증한 뒤 사용자 세션을
                생성합니다. API 호출이 필요하면 access token을 Resource Server에
                전달합니다.
              </li>
            </ol>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              요청과 응답 예시
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              OIDC authorization request는 OAuth 2.0 authorization request에 OIDC
              scope와 nonce를 추가한 형태입니다. 아래 예시는 Authorization Code
              Flow와 PKCE를 함께 사용하는 일반적인 형태입니다.
            </p>
            <CodeBlock
              code={`GET /authorize?
  response_type=code&
  client_id=web-client&
  redirect_uri=https%3A%2F%2Fapp.example.com%2Fcallback&
  scope=openid%20profile%20email&
  state=V4t8o6BzQm0c2vM9&
  nonce=n-0S6_WzA2Mj&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256 HTTP/1.1
Host: idp.example.com`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              token endpoint 응답은 provider와 설정에 따라 달라지지만, OIDC
              Authorization Code Flow에서는 ID Token이 핵심 산출물로 포함됩니다.
              refresh token은 offline access 권한, provider 정책, client type에
              따라 발급되지 않을 수 있습니다.
            </p>
            <CodeBlock
              code={`{
  "token_type": "Bearer",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwMjYtMDUifQ...",
  "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFwaS1rZXkifQ...",
  "refresh_token": "def50200b6a4..."
}`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              ID Token의 payload는 claim 집합입니다. 실제 JWT는 base64url로 인코딩된
              header, payload, signature로 구성되지만, 검증 시에는 아래와 같은 claim
              값을 해석합니다.
            </p>
            <CodeBlock
              code={`{
  "iss": "https://idp.example.com",
  "sub": "248289761001",
  "aud": "web-client",
  "exp": 1779168000,
  "iat": 1779164400,
  "auth_time": 1779164380,
  "nonce": "n-0S6_WzA2Mj",
  "email": "user@example.com",
  "email_verified": true,
  "name": "Lim Woojin"
}`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              ID Token 검증 체크리스트
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              OIDC 구현에서 가장 위험한 실수는 ID Token을 단순히 decode만 하고
              로그인 성공으로 처리하는 것입니다. JWT payload를 읽는 것과 토큰을
              신뢰할 수 있는 상태로 검증하는 것은 완전히 다른 작업입니다.
            </p>
            <BlogDiagram
              src="/blog/oidc-id-token-validation.png"
              alt="OIDC ID Token을 discovery, JWKS key 선택, signature 검증, claim 검증, session 생성 순서로 처리하는 검증 파이프라인 다이어그램"
              width={1440}
              height={900}
              caption="ID Token은 payload를 읽는 것만으로 신뢰할 수 없고, issuer 기준 discovery와 JWKS를 통해 서명과 claim을 모두 검증한 뒤에만 세션 생성에 사용할 수 있습니다."
            />
            <div className="mt-6">
              <NoteRow
                title="iss"
                body="ID Token을 발급한 issuer입니다. discovery document에서 확인한 issuer와 완전히 일치해야 합니다. 문자열 normalization을 임의로 적용하거나 tenant 경로를 대충 비교하면 다른 issuer의 토큰을 받아들일 수 있습니다."
              />
              <NoteRow
                title="aud"
                body="ID Token의 수신 대상입니다. 자신의 client_id가 audience에 포함되어야 합니다. audience가 여러 개라면 azp claim 검증까지 함께 봐야 합니다."
              />
              <NoteRow
                title="exp, iat, nbf"
                body="만료 시간, 발급 시간, not-before 시간입니다. 서버 clock skew를 소폭 허용할 수는 있지만, 만료된 ID Token으로 새 세션을 만들거나 지나치게 미래의 iat를 허용하면 안 됩니다."
              />
              <NoteRow
                title="nonce"
                body="authorization request에서 보낸 nonce가 ID Token에 그대로 돌아왔는지 확인합니다. nonce는 인증 응답 재사용과 token substitution 위험을 줄이는 데 사용됩니다."
              />
              <NoteRow
                title="signature"
                body="JWT header의 alg와 kid를 확인하고, issuer의 jwks_uri에서 가져온 공개키로 서명을 검증합니다. alg=none을 허용하거나, 토큰이 지정한 alg를 무비판적으로 신뢰하면 안 됩니다."
              />
              <NoteRow
                title="sub"
                body="issuer 안에서 사용자를 나타내는 subject identifier입니다. 계정 식별자는 iss와 sub의 조합으로 저장하는 편이 안전합니다. 서로 다른 issuer의 같은 sub 값은 같은 사용자를 의미하지 않습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Access Token과 ID Token 분리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                ID Token은 클라이언트가 사용자 인증 결과를 검증하는 데 사용합니다.
                따라서 audience는 보통 client_id이고, 토큰 안에는 사용자를 식별하기
                위한 claim과 인증 시각, nonce, 인증 컨텍스트가 들어갑니다. ID Token을
                API 권한 판단에 사용하면 Resource Server가 클라이언트용 토큰을
                잘못 받아들이는 구조가 됩니다.
              </p>
              <p>
                access token은 Resource Server가 API 접근을 판단하는 데 사용합니다.
                audience는 API 또는 resource identifier가 되는 경우가 많고, scope나
                permission, subject, issuer, 만료 시간 같은 정보가 포함될 수
                있습니다. access token이 JWT일 수도 있고 opaque token일 수도 있으며,
                opaque token이라면 Resource Server는 introspection endpoint나 provider
                SDK를 통해 유효성을 확인합니다.
              </p>
              <p>
                이 분리가 중요한 이유는 토큰의 수신자와 검증 기준이 다르기
                때문입니다. 클라이언트는 ID Token을 검증해 애플리케이션 세션을
                만들고, Resource Server는 access token을 검증해 API 호출을 허용합니다.
                같은 로그인 과정에서 함께 발급되더라도 두 토큰을 서로 대체해서 쓰면
                trust boundary가 흐려집니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/oidc-token-boundary.png"
              alt="Relying Party는 ID Token으로 사용자 세션을 만들고 Resource Server는 Access Token으로 API 권한을 판단하는 토큰 경계 다이어그램"
              width={1440}
              height={900}
              caption="ID Token은 클라이언트가 사용자 인증 결과를 검증하는 토큰이고, Resource Server는 API 호출에 전달된 access token의 audience와 scope를 기준으로 권한을 판단해야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Discovery와 JWKS가 필요한 이유
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Discovery는 OpenID Provider의 endpoint와 지원 기능을 수동 문서가
                아니라 기계가 읽을 수 있는 metadata로 배포합니다. 클라이언트는
                issuer를 기준으로{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  /.well-known/openid-configuration
                </code>
                을 조회하고, 그 응답에서 authorization endpoint, token endpoint,
                userinfo endpoint, jwks_uri, 지원 scope와 signing algorithm을 얻습니다.
              </p>
              <p>
                JWKS는 공개키 회전을 가능하게 합니다. OpenID Provider는 새 key pair를
                추가하고 JWT header의{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  kid
                </code>
                로 어떤 키가 사용됐는지 표시합니다. 클라이언트는 jwks_uri에서 JWK
                Set을 가져와 kid가 일치하는 공개키로 서명을 검증합니다. 이 구조 덕분에
                provider는 클라이언트 배포 없이 signing key를 교체할 수 있습니다.
              </p>
              <p>
                운영 구현에서는 JWKS를 매 요청마다 가져오지 않고 캐시합니다. 다만
                캐시된 키로 검증할 수 없는 kid가 나타나면 jwks_uri를 다시 조회해야
                합니다. 키 회전 직후에는 기존 토큰과 새 토큰이 동시에 검증될 수
                있어야 하므로 provider가 이전 키를 충분히 오래 게시하는지도 중요합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              PKCE, state, nonce
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              세 값은 모두 무작위 문자열처럼 보이지만 담당하는 공격면이 다릅니다.
              구현할 때 하나로 합치거나 생략하지 말고, 생성 위치와 저장 위치,
              검증 시점을 분리해야 합니다.
            </p>
            <div className="mt-6">
              <NoteRow
                title="PKCE"
                body="클라이언트가 code verifier를 만들고, 그 해시인 code challenge를 authorization request에 보냅니다. token request에서는 원본 code verifier를 제출합니다. 서버는 저장된 code challenge와 code verifier의 S256 계산 결과를 비교해 authorization code 탈취를 완화합니다."
              />
              <NoteRow
                title="state"
                body="클라이언트가 authorization response를 자신이 시작한 요청과 연결하기 위한 값입니다. 보통 CSRF 방어와 redirect 후 원래 위치 복원에 사용합니다. response로 돌아온 state가 세션에 저장된 값과 다르면 처리를 중단해야 합니다."
              />
              <NoteRow
                title="nonce"
                body="OIDC 인증 요청과 ID Token을 연결하는 값입니다. 클라이언트가 authorization request에 nonce를 포함하고, 이후 받은 ID Token claim의 nonce와 비교합니다. token replay와 substitution 방어에서 중요합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영 보안 체크리스트
            </h2>
            <div className="mt-6">
              <NoteRow
                title="redirect_uri는 정확히 등록한다"
                body="Provider에는 허용할 redirect_uri를 정확한 문자열로 등록해야 합니다. wildcard나 넓은 prefix matching은 authorization code가 의도하지 않은 endpoint로 전달될 가능성을 키웁니다."
              />
              <NoteRow
                title="Confidential client와 public client를 구분한다"
                body="서버에서 secret을 안전하게 보관할 수 있으면 confidential client로 client authentication을 수행합니다. SPA, 모바일 앱, 데스크톱 앱처럼 secret을 숨길 수 없는 환경은 public client로 보고 PKCE와 redirect URI 제약을 강하게 둡니다."
              />
              <NoteRow
                title="브라우저 저장소에 토큰을 무비판적으로 저장하지 않는다"
                body="access token과 refresh token을 localStorage에 장기 보관하면 XSS에 취약합니다. 서버 사이드 세션, HttpOnly Secure SameSite cookie, 짧은 access token 수명, refresh token rotation을 조합해 노출 시간을 줄입니다."
              />
              <NoteRow
                title="scope와 claim 요청을 최소화한다"
                body="openid는 OIDC 인증에 필요하지만 profile, email, phone, address, offline_access는 모두 별도의 정보 노출 또는 장기 권한과 연결됩니다. 실제 기능에 필요한 scope만 요청해야 합니다."
              />
              <NoteRow
                title="로그아웃은 애플리케이션 세션과 provider 세션을 분리해서 설계한다"
                body="로컬 애플리케이션 세션을 삭제하는 것과 OpenID Provider의 SSO 세션을 종료하는 것은 다릅니다. RP-Initiated Logout 지원 여부, post_logout_redirect_uri 등록, 여러 클라이언트의 세션 영향을 별도로 검토해야 합니다."
              />
              <NoteRow
                title="clock skew와 key rotation을 관측한다"
                body="exp, iat, nbf 검증은 서버 시간에 민감합니다. NTP 동기화, 허용 skew, JWKS cache TTL, kid 미스 발생 시 재조회 로직을 로그로 확인할 수 있어야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              자주 헷갈리는 지점
            </h2>
            <div className="mt-6">
              <NoteRow
                title="OAuth 2.0 access token으로 로그인 처리"
                body="access token은 API 접근 권한을 위한 토큰입니다. 표준 OIDC 로그인은 ID Token 검증을 통해 사용자를 인증합니다. access token만으로 로그인하려면 provider별 UserInfo 호출이나 별도 프로파일링에 의존하게 됩니다."
              />
              <NoteRow
                title="JWT decode를 검증으로 착각"
                body="JWT payload는 누구나 base64url decode할 수 있습니다. 신뢰하려면 issuer, audience, expiration, nonce, signature, signing key, algorithm을 모두 검증해야 합니다."
              />
              <NoteRow
                title="email을 사용자 primary key로 사용"
                body="email은 변경될 수 있고, provider 정책에 따라 검증되지 않았을 수 있습니다. 계정 식별자는 issuer와 subject 조합을 기준으로 두고, email은 표시 또는 연락 claim으로 취급하는 편이 안전합니다."
              />
              <NoteRow
                title="ID Token을 API Bearer token으로 전달"
                body="Resource Server가 ID Token을 받아들이면 클라이언트 대상 토큰과 API 대상 토큰의 경계가 무너집니다. API는 access token의 audience, scope, issuer, 만료 시간을 기준으로 판단해야 합니다."
              />
              <NoteRow
                title="Provider 문서만 보고 endpoint를 하드코딩"
                body="Discovery를 사용하면 issuer별 endpoint, JWKS 위치, 지원 algorithm을 자동으로 맞출 수 있습니다. 특히 multi-tenant issuer나 custom domain을 쓰는 환경에서는 discovery document의 issuer와 endpoint를 기준으로 검증해야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                OIDC는 OAuth 2.0의 access delegation 모델 위에 사용자 인증 결과를
                표준화한 identity layer입니다. 핵심 산출물은 ID Token이고, 안전한
                구현은 ID Token의 서명과 claim 검증, state와 nonce 검증, PKCE 검증,
                Discovery와 JWKS 기반 key 관리가 함께 동작할 때 완성됩니다.
              </p>
              <p>
                구현 관점에서는 “로그인 성공 콜백을 받았다”가 완료 조건이
                아닙니다. authorization response의 state를 검증하고, token endpoint의
                응답을 받은 뒤, ID Token의 issuer, audience, 만료 시간, nonce, 서명을
                검증하고, API 호출에는 access token만 사용하도록 경계를 나누어야
                합니다. 이 경계를 지키면 OIDC는 SSO, 소셜 로그인, 엔터프라이즈 IdP
                연동, 내부 서비스 인증 흐름에서 일관된 방식으로 확장됩니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
