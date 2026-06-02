import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "제로 트러스트 시스템은 위치가 아니라 매 요청의 신뢰를 검증하는 구조다 | Blog",
  description:
    "제로 트러스트를 NIST Zero Trust Architecture의 Policy Engine, Policy Administrator, Policy Enforcement Point, identity, device posture, least privilege, continuous monitoring 관점에서 정리한 글",
};

const references = [
  {
    label: "NIST SP 800-207 - Zero Trust Architecture",
    href: "https://www.nist.gov/publications/zero-trust-architecture-0",
  },
  {
    label: "CISA - Zero Trust Maturity Model",
    href: "https://www.cisa.gov/zero-trust-maturity-model",
  },
  {
    label: "NSA - Zero Trust Cybersecurity Information Sheets",
    href: "https://www.nsa.gov/Cybersecurity/ZIG/CSIs/",
  },
  {
    label: "Google Research - BeyondCorp: A New Approach to Enterprise Security",
    href: "https://research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security/",
  },
];

export default function ZeroTrustSystemBlogPostPage() {
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
              Security / Architecture · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              제로 트러스트 시스템은 위치가 아니라 매 요청의 신뢰를 검증하는 구조다
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              제로 트러스트는 특정 제품 이름이 아닙니다. 사내망에 들어왔다는 이유만으로
              사용자를 믿지 않고, 매 요청마다 identity, device 상태, resource 민감도, 행위,
              위험도, 정책을 함께 평가해 접근을 허용하는 보안 아키텍처입니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              왜 기존 경계 보안만으로 부족해졌을까?
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                과거의 보안 모델은 회사 네트워크 안쪽과 바깥쪽을 강하게 나눴습니다. 사내망,
                VPN, 방화벽 안쪽은 상대적으로 신뢰하고, 인터넷은 신뢰하지 않는 구조였습니다.
                이 방식은 데이터센터 중심의 환경에서는 꽤 자연스러웠습니다.
              </p>
              <p>
                하지만 지금은 사용자가 사무실 밖에서 일하고, 서비스는 SaaS와 cloud 위에
                흩어져 있고, backend는 Kubernetes, API gateway, managed database, third-party
                API를 함께 사용합니다. 내부망에 들어온 요청이라고 해서 정상 요청이라고
                단정하기 어렵습니다. 계정 탈취, 감염된 노트북, 과도한 VPN 권한, 잘못 열린
                내부 API는 모두 “안쪽”에서 사고를 만듭니다.
              </p>
              <p>
                제로 트러스트의 출발점은 단순합니다. 네트워크 위치를 신뢰의 근거로 삼지
                말고, 접근하려는 순간마다 필요한 근거를 다시 확인하자는 것입니다. 그래서
                핵심 문장은 <InlineCode>never trust, always verify</InlineCode>로 자주
                표현됩니다. 더 정확히 말하면 “암묵적 신뢰를 없애고, 명시적 검증과 최소
                권한으로 접근을 허용한다”에 가깝습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              제로 트러스트는 매 요청의 접근 결정이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                제로 트러스트 시스템은 사용자가 한 번 로그인했다고 세션 전체를 무조건 믿지
                않습니다. 사용자가 누구인지, 어떤 기기에서 왔는지, 어떤 resource에 어떤
                action을 하려는지, 지금 위험도가 어떤지, 정책상 허용 가능한지 계속 평가합니다.
              </p>
              <p>
                예를 들어 같은 개발자라도 평소 관리되는 회사 노트북에서 staging dashboard를
                조회하는 요청과, 새벽에 낯선 지역에서 개인 기기로 production database export를
                요청하는 상황은 다르게 다뤄야 합니다. 둘 다 같은 계정일 수 있지만 risk와
                resource 민감도가 다릅니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/zero-trust-request-flow.png"
              alt="Subject, Policy Enforcement Point, Policy Engine, Policy Administrator, Resource와 policy information point가 연결된 제로 트러스트 요청 흐름 다이어그램"
              width={1440}
              height={900}
              caption="제로 트러스트에서는 PEP가 요청 경로를 지키고, Policy Engine이 여러 신호와 정책을 평가합니다. 허용된 경우에만 session path가 열리고, 접근 중에도 상태가 다시 평가될 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              NIST 모델의 핵심 구성요소
            </h2>
            <div className="mt-6">
              <NoteRow
                bordered
                title="PEP: Policy Enforcement Point"
                body="요청 경로에서 실제로 접근을 허용하거나 차단하는 지점입니다. reverse proxy, API gateway, sidecar proxy, service mesh, ZTNA gateway, database proxy처럼 resource 앞에 놓일 수 있습니다."
              />
              <NoteRow
                bordered
                title="Policy Engine"
                body="정책과 신호를 평가해 allow, deny, step-up, revoke 같은 결정을 내리는 논리적 구성요소입니다. identity, device posture, threat intelligence, activity log 같은 정보를 받아 risk를 계산합니다."
              />
              <NoteRow
                bordered
                title="Policy Administrator"
                body="Policy Engine의 결정을 실제 세션 제어로 바꿉니다. 접근 경로를 열거나 닫고, token 발급, proxy 설정, session 종료 같은 control plane 동작을 수행합니다."
              />
              <NoteRow
                bordered
                title="Policy Information Point"
                body="정책 판단에 필요한 정보를 제공하는 주변 시스템입니다. IdP, MDM, EDR, asset inventory, CMDB, SIEM, log pipeline, vulnerability scanner가 여기에 해당합니다."
              />
            </div>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                여기서 중요한 점은 이 구성요소가 반드시 각각의 제품 하나로 존재해야 한다는
                뜻이 아니라는 점입니다. 작은 조직에서는 IdP의 conditional access와 reverse
                proxy가 일부 역할을 함께 맡을 수 있고, 대규모 환경에서는 gateway, service mesh,
                SIEM, posture management, IAM이 여러 계층으로 나뉘어 동작할 수 있습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              접근 판단에 들어가는 신호
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                제로 트러스트에서 “신뢰”는 감정적인 표현이 아니라 정책 판단에 필요한
                signal의 조합입니다. 한 가지 신호만으로 결정하지 않고 여러 신호를 합쳐
                지금 이 요청을 허용해도 되는지 판단합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/zero-trust-decision-signals.png"
              alt="Identity, Device, Application, Network and Environment, Data, Telemetry 신호가 Policy Decision으로 모이는 제로 트러스트 판단 신호 다이어그램"
              width={1440}
              height={900}
              caption="CISA와 NSA의 Zero Trust 자료도 identity, device, application/workload, data, network/environment, visibility/analytics 같은 축을 반복해서 다룹니다. 구현은 제품보다 신호의 품질과 연결성이 중요합니다."
            />
            <div className="mt-6">
              <SignalRow
                title="Identity"
                body="사용자나 workload가 누구인지 확인합니다. SSO, MFA, group, role, service account, risk score, impossible travel 같은 정보가 들어갑니다."
              />
              <SignalRow
                title="Device posture"
                body="요청한 기기가 관리 대상인지, disk encryption이 켜져 있는지, OS와 browser가 최신인지, EDR이 정상인지 확인합니다."
              />
              <SignalRow
                title="Application and workload"
                body="사용자가 접근하는 app, API, workload의 민감도와 service identity를 봅니다. Kubernetes에서는 service account, workload identity, namespace, network policy가 함께 연결됩니다."
              />
              <SignalRow
                title="Data"
                body="조회하려는 데이터가 일반 문서인지, 개인정보인지, production credential인지에 따라 요구되는 인증 강도와 권한 범위가 달라집니다."
              />
              <SignalRow
                title="Telemetry"
                body="접근 결과와 이상 행동을 계속 수집합니다. 로그가 없으면 정책은 정교해질 수 없고, 자동화도 안전하게 작동하기 어렵습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              VPN과 제로 트러스트의 차이
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                VPN은 외부 사용자를 내부 네트워크에 붙여주는 기술에 가깝습니다. 사용자가 VPN에
                연결되면 특정 subnet, route, port에 도달할 수 있게 됩니다. 그래서 VPN의 기본
                단위는 “네트워크 도달성”입니다.
              </p>
              <p>
                제로 트러스트의 단위는 더 작습니다. “이 사용자가 이 기기에서 이 app의 이
                기능을 지금 호출해도 되는가?”를 묻습니다. 즉, 사내망에 들어왔는지가 아니라
                resource 앞에서 접근 결정을 내립니다. VPN을 완전히 없애야 제로 트러스트인 것은
                아니지만, VPN 접속 자체를 신뢰의 충분조건으로 두면 제로 트러스트와 멀어집니다.
              </p>
            </div>
            <div className="mt-6">
              <CompareRow
                leftTitle="VPN 중심 사고"
                leftBody="연결되면 내부망 resource에 넓게 도달할 수 있다. 접근 제어는 subnet, route, firewall rule 중심으로 잡히기 쉽다."
                rightTitle="Zero Trust 중심 사고"
                rightBody="resource마다 PEP를 두고 identity, device, action, data sensitivity, risk에 따라 access를 좁게 허용한다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              실무 구현 패턴
            </h2>
            <div className="mt-6">
              <PatternRow
                title="사용자 접근"
                body="IdP를 중심으로 SSO, MFA, conditional access, device posture를 연결합니다. 관리자 페이지나 사내 도구는 VPN만 믿지 말고 identity-aware proxy나 ZTNA gateway 뒤에 둡니다."
              />
              <PatternRow
                title="API 접근"
                body="OAuth2/OIDC, JWT signature 검증, audience, issuer, scope, claim 검증을 명확히 합니다. API gateway는 token을 검사하고, backend는 중요한 권한 판단을 다시 수행합니다."
              />
              <PatternRow
                title="서비스 간 통신"
                body="서버끼리 통신한다고 자동 신뢰하지 않습니다. service identity, short-lived credential, mTLS, service mesh policy, namespace boundary를 사용해 호출 가능한 대상을 줄입니다."
              />
              <PatternRow
                title="Cloud와 Kubernetes"
                body="IAM role을 workload 단위로 나누고, Kubernetes service account와 cloud IAM을 연결합니다. network policy, admission control, secret management, audit log도 함께 봐야 합니다."
              />
              <PatternRow
                title="Database와 운영 접근"
                body="Bastion host 하나로 끝내지 않습니다. short-lived credential, approval, query audit, least privilege, break-glass 절차를 함께 둡니다."
              />
            </div>
            <CodeBlock
              code={`// 개념적인 접근 정책 예시
allow request when
  identity.mfa == true
  and device.managed == true
  and resource.sensitivity <= identity.clearance
  and action in identity.allowedActions
  and risk.score < policy.maxRisk

step_up when
  resource.sensitivity == \"high\"
  or risk.score >= policy.maxRisk`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              한 번에 바꾸는 프로젝트가 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                제로 트러스트는 “솔루션 도입”보다 “운영 모델 전환”에 가깝습니다. 모든 시스템을
                한 번에 바꾸려고 하면 장애와 예외 처리에 막힙니다. 먼저 보호면을 작게 잡고,
                접근 경로와 권한을 inventory로 정리한 뒤, 가장 위험한 resource부터 정책을
                적용하는 편이 현실적입니다.
              </p>
              <p>
                좋은 시작점은 identity입니다. 계정을 통합하고 MFA를 강제하고 관리자 권한을
                줄이면 바로 효과가 납니다. 그 다음 device posture, app-level PEP, workload
                identity, microsegmentation, telemetry feedback으로 확장합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/zero-trust-migration-roadmap.png"
              alt="Inventory, Identity First, Device Posture, App Access, Segmentation, Feedback 순서의 제로 트러스트 전환 로드맵 다이어그램"
              width={1440}
              height={900}
              caption="제로 트러스트 전환은 작은 보호면에서 시작하는 것이 안전합니다. 정책은 monitor mode, exception, break-glass, rollback 경로를 갖춘 상태로 단계적으로 강화해야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              자주 하는 오해
            </h2>
            <div className="mt-6">
              <NoteRow
                bordered
                title="제로 트러스트는 모든 것을 막는다는 뜻이 아니다"
                body="목표는 업무를 멈추는 것이 아니라 필요한 접근만 정확히 허용하는 것입니다. 좋은 제로 트러스트는 사용자에게 무조건 불편한 시스템이 아니라 위험한 접근만 더 강하게 검증하는 시스템입니다."
              />
              <NoteRow
                bordered
                title="MFA만 켜면 제로 트러스트가 아니다"
                body="MFA는 중요한 출발점이지만 identity signal 하나일 뿐입니다. device, resource, action, data, telemetry와 연결되지 않으면 여전히 넓은 권한이 남습니다."
              />
              <NoteRow
                bordered
                title="네트워크 보안이 필요 없다는 뜻도 아니다"
                body="제로 트러스트는 firewall, subnet, network policy를 버리라는 말이 아닙니다. 네트워크 경계만으로 충분하다는 생각을 버리고, app과 data 앞에서도 접근 결정을 하라는 뜻입니다."
              />
              <NoteRow
                bordered
                title="한 번 허용된 세션을 끝까지 믿지 않는다"
                body="계정 risk가 올라가거나 기기 posture가 나빠지거나 비정상 행위가 발견되면 session을 제한하거나 종료할 수 있어야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영에서 특히 조심할 점
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                접근 정책은 장애를 만들 수 있습니다. 그래서 처음부터 강제 차단으로 시작하기보다
                log-only 또는 monitor mode로 실제 영향을 관측하고, 예외가 필요한 legacy app과
                service account를 먼저 찾아야 합니다.
              </p>
              <p>
                또한 break-glass 계정과 복구 절차가 필요합니다. IdP 장애, MDM 장애, policy
                engine 장애가 발생했을 때 운영자가 아무것도 할 수 없으면 보안 시스템이 전체
                장애의 원인이 됩니다. 제로 트러스트는 엄격해야 하지만 복구 경로까지 설계되어야
                합니다.
              </p>
              <p>
                마지막으로 telemetry가 없으면 제로 트러스트는 오래 유지되지 않습니다. 누가 어떤
                resource에 접근했고, 어떤 정책으로 허용되었고, 어떤 이상 신호가 있었는지 남아야
                정책을 개선할 수 있습니다. 결국 제로 트러스트의 품질은 정책 문구보다 관측과
                피드백 루프에 크게 좌우됩니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                제로 트러스트는 “아무도 믿지 않는다”는 구호가 아니라 “위치 기반의 암묵적
                신뢰를 제거하고, 매 요청마다 필요한 근거로 접근을 결정한다”는 구조입니다.
              </p>
              <p>
                핵심은 identity, device, resource, action, data, risk, telemetry를 연결해
                최소 권한을 만들고, 접근 중에도 계속 평가하는 것입니다. VPN, firewall, subnet은
                여전히 필요하지만 그것만으로 충분하지 않습니다. resource 앞에서 판단하고,
                작은 보호면부터 정책을 강화할 때 제로 트러스트는 실제 운영 가능한 시스템이
                됩니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}

function SignalRow({ title, body }: { title: string; body: string }) {
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

function PatternRow({ title, body }: { title: string; body: string }) {
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

function CompareRow({
  leftTitle,
  leftBody,
  rightTitle,
  rightBody,
}: {
  leftTitle: string;
  leftBody: string;
  rightTitle: string;
  rightBody: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <section className="rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-5">
        <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
          {leftTitle}
        </h3>
        <p className="mt-2 text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
          {leftBody}
        </p>
      </section>
      <section className="rounded-xl border border-[#e5e5e5] bg-white p-5">
        <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
          {rightTitle}
        </h3>
        <p className="mt-2 text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
          {rightBody}
        </p>
      </section>
    </div>
  );
}
