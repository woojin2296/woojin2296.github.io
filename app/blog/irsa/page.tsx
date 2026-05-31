import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "IRSA로 EKS Pod에 필요한 AWS 권한만 부여하기 | Blog",
  description:
    "Amazon EKS의 IAM Roles for Service Accounts(IRSA) 동작 방식과 구성 포인트",
};

const references = [
  {
    label: "Amazon EKS - IAM roles for service accounts",
    href: "https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html",
  },
  {
    label: "Amazon EKS - Assign IAM roles to Kubernetes service accounts",
    href: "https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html",
  },
  {
    label: "Amazon EKS - Use IRSA with the AWS SDK",
    href: "https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts-minimum-sdk.html",
  },
  {
    label: "Amazon EKS - Configure Pods to use a Kubernetes service account",
    href: "https://docs.aws.amazon.com/eks/latest/userguide/pod-configuration.html",
  },
  {
    label: "Amazon EKS - Grant workloads access using service accounts",
    href: "https://docs.aws.amazon.com/eks/latest/userguide/service-accounts.html",
  },
];

export default function IrsaBlogPostPage() {
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
              AWS / EKS · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[680px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              IRSA로 EKS Pod에 필요한 AWS 권한만 부여하기
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              Kubernetes 위에서 실행되는 애플리케이션이 S3, DynamoDB, SQS 같은
              AWS 리소스에 접근해야 할 때, 노드 전체 권한을 공유하지 않고 Pod가
              사용하는 ServiceAccount 기준으로 IAM Role을 연결하는 방식입니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              IRSA의 정확한 역할
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                IRSA는 Amazon EKS에서 Kubernetes ServiceAccount와 AWS IAM Role을
                연결해, Pod 안의 AWS SDK가{" "}
                <strong className="font-medium text-black">
                  STS AssumeRoleWithWebIdentity
                </strong>
                로 IAM Role의 임시 자격 증명을 받을 수 있게 하는 구성입니다. 이
                방식은 컨테이너 이미지, Kubernetes Secret, 환경 변수에 장기 AWS
                access key를 배포하지 않고도 AWS API 요청에 서명할 수 있게 합니다.
              </p>
              <p>
                IRSA의 신뢰 경계는 Pod 자체가 아니라{" "}
                <strong className="font-medium text-black">
                  Pod가 사용하는 Kubernetes ServiceAccount
                </strong>
                입니다. IAM Role의 trust policy는 EKS 클러스터의 OIDC provider,
                토큰 audience, 그리고 ServiceAccount subject를 검사합니다. 그
                조건을 만족한 Pod만 해당 Role을 assume할 수 있고, 실제 AWS
                리소스 접근 범위는 Role에 붙은 permission policy가 결정합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              IRSA가 해결하는 문제
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                EKS 워커 노드에는 보통 노드 IAM Role이 붙습니다. 문제는 여러
                Pod가 같은 노드 위에 올라가면, 애플리케이션별 권한 경계를 노드
                단위로 나누기 어렵다는 점입니다. 어떤 Pod는 S3 읽기만 필요하고,
                어떤 Pod는 SQS 메시지 전송만 필요해도 노드 Role 하나에 권한을
                몰아넣기 시작하면 권한 범위가 빠르게 커집니다.
              </p>
              <p>
                IRSA(IAM Roles for Service Accounts)는 이 경계를 Kubernetes
                ServiceAccount로 옮깁니다. IAM Role을 특정 ServiceAccount와
                연결하고, 그 ServiceAccount를 사용하는 Pod만 해당 Role의 임시
                자격 증명을 얻도록 구성합니다. 결과적으로 권한을{" "}
                <strong className="font-medium text-black">
                  노드 단위가 아니라 워크로드 단위
                </strong>
                로 좁힐 수 있습니다.
              </p>
              <p>
                중요한 점은 IRSA가 애플리케이션 코드를 크게 바꾸는 기술이
                아니라는 것입니다. AWS SDK가 기본 자격 증명 체인에서 web identity
                token file을 발견하면 STS를 호출해 임시 자격 증명으로 교환합니다.
                따라서 애플리케이션은 평소처럼 S3 client나 DynamoDB client를
                만들고, 권한 연결은 Kubernetes와 IAM 설정으로 해결하는 방식에
                가깝습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              등장인물 정리
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              IRSA가 어렵게 느껴지는 이유는 Kubernetes와 AWS IAM 개념이 한 번에
              나오기 때문입니다. 먼저 각 구성요소가 맡은 역할을 분리해서 보면
              흐름이 단순해집니다.
            </p>
            <div className="mt-6">
              <NoteRow
                title="Pod"
                body="실제 애플리케이션 컨테이너가 실행되는 단위입니다. S3 파일을 읽거나 SQS 메시지를 보내는 주체는 결국 Pod 안의 프로세스입니다."
              />
              <NoteRow
                title="Kubernetes ServiceAccount"
                body="Pod가 Kubernetes 안에서 어떤 신원으로 실행되는지를 나타냅니다. IRSA에서는 ServiceAccount가 AWS IAM Role과 연결되는 기준점이 됩니다."
              />
              <NoteRow
                title="IAM Role"
                body="AWS 리소스에 대해 어떤 작업을 할 수 있는지를 담는 권한 묶음입니다. 예를 들어 S3 특정 bucket 읽기, DynamoDB 특정 table 조회 같은 정책을 붙입니다."
              />
              <NoteRow
                title="IAM OIDC Provider"
                body="EKS 클러스터가 발급한 ServiceAccount 토큰을 AWS IAM이 신뢰할 수 있게 등록한 연결 지점입니다. AWS 입장에서는 이 provider를 통해 토큰 발급자가 진짜 클러스터인지 확인합니다."
              />
              <NoteRow
                title="AWS STS"
                body="토큰을 검증한 뒤 IAM Role의 임시 자격 증명을 발급하는 서비스입니다. IRSA에서는 AssumeRoleWithWebIdentity API가 사용됩니다."
              />
              <NoteRow
                title="AWS SDK credential chain"
                body="애플리케이션이 AWS client를 만들 때 자격 증명을 찾는 순서입니다. IRSA 설정이 맞아도 더 앞선 위치의 정적 키가 있으면 그 키가 먼저 사용될 수 있습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              동작 흐름
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              핵심은 Kubernetes가 발급한 ServiceAccount OIDC 토큰을 AWS STS가
              검증하고, IAM Role의 trust policy 조건에 맞을 때만 임시 자격
              증명을 발급한다는 점입니다.
            </p>
            <BlogDiagram
              src="/blog/irsa-flow.png"
              alt="IRSA에서 Pod, ServiceAccount, OIDC Provider, AWS STS, IAM Role, AWS 서비스가 연결되는 흐름"
              width={1672}
              height={941}
              caption="Pod는 ServiceAccount 토큰을 사용해 STS의 AssumeRoleWithWebIdentity 흐름으로 임시 자격 증명을 받습니다."
            />
            <ol className="mt-8 grid gap-3 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <li>
                EKS 클러스터의 OIDC issuer를 IAM OIDC provider로 등록합니다. 이
                작업은 AWS IAM이 “이 EKS 클러스터가 발급한 토큰은 검증 대상으로
                삼아도 된다”고 알게 하는 과정입니다.
              </li>
              <li>
                IAM Role trust policy에 특정 namespace와 ServiceAccount만 Role을
                assume할 수 있도록 조건을 둡니다. 보통{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  system:serviceaccount:namespace:name
                </code>{" "}
                형식의 subject 값을 검사합니다.
              </li>
              <li>
                Kubernetes ServiceAccount에 IAM Role ARN을 annotation으로
                연결합니다. 이 annotation이 Pod와 IAM Role 사이의 연결고리입니다.
              </li>
              <li>
                Pod가 해당 ServiceAccount로 실행되면 AWS SDK가 web identity token
                file을 통해 STS에서 임시 자격 증명을 가져옵니다. 이 자격 증명은
                장기 키가 아니라 만료 시간이 있는 임시 값입니다.
              </li>
              <li>
                애플리케이션은 받은 임시 자격 증명으로 AWS API 요청에 서명합니다.
                이때 실제 허용 범위는 IAM Role에 붙은 policy가 결정합니다.
              </li>
            </ol>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Pod 안에서 실제로 생기는 값
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                ServiceAccount에{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  eks.amazonaws.com/role-arn
                </code>{" "}
                annotation이 있고 Pod가 그 ServiceAccount를 사용하면, EKS Pod
                Identity Webhook이 Pod에 IRSA용 환경 변수와 projected token volume을
                추가합니다. 애플리케이션 코드는 이 값을 직접 다룰 필요가 거의
                없지만, 장애 분석에서는 반드시 확인해야 하는 값입니다.
              </p>
              <p>
                핵심 환경 변수는{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  AWS_ROLE_ARN
                </code>
                과{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  AWS_WEB_IDENTITY_TOKEN_FILE
                </code>
                입니다. AWS SDK는 기본 credential chain에서 이 값을 발견하면 token
                file을 읽고 STS에 AssumeRoleWithWebIdentity 요청을 보내 임시 자격
                증명을 가져옵니다.
              </p>
            </div>
            <CodeBlock
              code={`AWS_ROLE_ARN=arn:aws:iam::123456789012:role/api-server-irsa-role
AWS_WEB_IDENTITY_TOKEN_FILE=/var/run/secrets/eks.amazonaws.com/serviceaccount/token`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              token file은 kubelet이 Pod를 대신해 요청하고 저장합니다. EKS 문서상
              kubelet은 토큰 수명의 80%가 지나거나 24시간이 지나면 토큰을
              갱신합니다. 즉 IRSA는 한 번 발급한 값을 계속 쓰는 구조가 아니라,
              토큰과 STS 임시 자격 증명이 주기적으로 갱신되는 구조입니다.
            </p>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              설정 순서
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                IRSA 설정은 크게 네 단계입니다. 먼저 AWS 권한을 만들고, 그 권한을
                누가 빌릴 수 있는지 trust policy로 제한한 다음, Kubernetes
                ServiceAccount에 연결하고, 마지막으로 Pod가 그 ServiceAccount로
                실행되는지 확인합니다.
              </p>
              <p>
                실무에서 자주 생기는 실수는 “IAM policy는 맞는데 trust policy가
                넓거나 틀린 경우”, “ServiceAccount annotation은 붙였지만 Deployment가
                다른 ServiceAccount를 쓰는 경우”, “IRSA는 맞는데 컨테이너 안에
                남아 있는 정적 키가 먼저 사용되는 경우”입니다. 그래서 구성은
                코드보다 연결 지점을 하나씩 확인하는 방식으로 봐야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/irsa-policy-boundary.png"
              alt="Kubernetes ServiceAccount와 Pod, IAM Role trust policy, permission policy, STS, AWS Resource의 책임 경계를 보여주는 IRSA 설정 구조 다이어그램"
              width={1440}
              height={900}
              caption="IRSA 설정은 ServiceAccount 연결, Role assume 조건, 실제 AWS 권한 범위를 분리해서 봐야 합니다. trust policy는 누가 빌릴 수 있는가를, permission policy는 빌린 뒤 무엇을 할 수 있는가를 결정합니다."
            />
            <ol className="mt-6 grid gap-3 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <li>
                AWS 리소스에 필요한 최소 IAM permission policy를 작성합니다. 예를
                들어 특정 S3 bucket의{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  s3:GetObject
                </code>
                만 필요한지, prefix 조건까지 좁힐 수 있는지 먼저 정합니다.
              </li>
              <li>
                그 policy를 붙일 IAM Role을 만들고 trust policy를 작성합니다.
                trust policy는 “누가 이 Role을 assume할 수 있는가”를 결정하고,
                permission policy는 “assume한 뒤 무엇을 할 수 있는가”를 결정합니다.
              </li>
              <li>
                EKS 클러스터의 OIDC provider가 IAM에 등록되어 있는지 확인합니다.
                IRSA는 클러스터별 OIDC issuer URL을 IAM provider로 등록해야 STS가
                Kubernetes ServiceAccount 토큰을 검증할 수 있습니다.
              </li>
              <li>
                ServiceAccount에 IAM Role ARN annotation을 추가합니다. annotation은
                ServiceAccount에 붙지만 실제 권한 사용 주체는 그 ServiceAccount로
                실행되는 Pod입니다.
              </li>
              <li>
                Deployment에서{" "}
                <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                  serviceAccountName
                </code>
                이 정확한지 확인합니다. 이 값이 빠지면 Pod는 보통 default
                ServiceAccount로 실행됩니다.
              </li>
              <li>
                Pod 안에서 AWS SDK가 IRSA credential chain을 사용하고 있는지
                확인합니다. 기존 static credential이 환경 변수나 설정 파일에 있으면
                IRSA보다 먼저 선택될 수 있습니다.
              </li>
            </ol>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              최소 구성 예시
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              실제 구성에서 가장 중요한 부분은 trust policy의{" "}
              <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
                sub
              </code>{" "}
              조건입니다. 이 값이 넓어지면 같은 Role을 사용할 수 있는
              ServiceAccount 범위도 함께 넓어집니다.
            </p>
            <CodeBlock
              code={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::123456789012:oidc-provider/oidc.eks.ap-northeast-2.amazonaws.com/id/CLUSTER_ID"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.eks.ap-northeast-2.amazonaws.com/id/CLUSTER_ID:aud": "sts.amazonaws.com",
          "oidc.eks.ap-northeast-2.amazonaws.com/id/CLUSTER_ID:sub": "system:serviceaccount:production:api-server"
        }
      }
    }
  ]
}`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              ServiceAccount에는 Role ARN을 annotation으로 붙입니다. 이후
              Deployment에서 이 ServiceAccount를 지정하면 해당 Pod가 Role을
              사용할 수 있습니다.
            </p>
            <CodeBlock
              code={`apiVersion: v1
kind: ServiceAccount
metadata:
  name: api-server
  namespace: production
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/api-server-irsa-role`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              Deployment 쪽에서는 아래처럼 같은 ServiceAccount 이름을 지정해야
              합니다. ServiceAccount를 만들어도 Pod가 기본 ServiceAccount로
              실행되면 IRSA Role은 연결되지 않습니다.
            </p>
            <CodeBlock
              code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  namespace: production
spec:
  template:
    spec:
      serviceAccountName: api-server
      containers:
        - name: api-server
          image: example/api-server:latest`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영할 때 주의할 점
            </h2>
            <div className="mt-6">
              <NoteRow
                title="IMDS 접근을 막지 않으면 노드 Role이 새어 들어올 수 있다"
                body="IRSA를 설정해도 Pod가 Instance Metadata Service에 접근할 수 있으면 노드 IAM Role의 자격 증명 경로가 남습니다. 노드 메타데이터 접근 제한을 함께 봐야 권한 격리가 의도대로 동작합니다."
              />
              <NoteRow
                title="trust policy는 ServiceAccount 단위로 좁힌다"
                body="StringLike와 와일드카드를 사용하면 편하지만, namespace 전체 또는 여러 ServiceAccount가 같은 Role을 공유하게 됩니다. 운영 워크로드라면 먼저 정확한 namespace/name 조합으로 시작하는 편이 안전합니다."
              />
              <NoteRow
                title="SDK 버전과 credential chain을 확인한다"
                body="IRSA는 AWS SDK의 기본 자격 증명 체인에 포함됩니다. 다만 더 앞선 위치에 정적 키나 다른 credential provider가 있으면 그 값이 먼저 사용될 수 있습니다."
              />
              <NoteRow
                title="CloudTrail에서 Role session을 추적한다"
                body="IRSA는 STS를 통해 임시 자격 증명을 발급받으므로 CloudTrail에서 어떤 Role이 어떤 워크로드 흐름으로 사용되는지 확인할 수 있습니다."
              />
            </div>
            <BlogDiagram
              src="/blog/irsa-credential-chain.png"
              alt="Pod 안에서 AWS SDK가 정적 환경 변수, web identity token, container credential, IMDS node role 순서로 credential source를 확인하는 다이어그램"
              width={1440}
              height={900}
              caption="정적 AWS 키가 남아 있으면 IRSA web identity credential보다 먼저 선택될 수 있고, IMDS 접근이 열려 있으면 노드 Role 경로가 남을 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              디버깅 체크리스트
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              IRSA 문제는 대부분 “토큰은 발급됐는가”, “STS가 Role assume을
              허용했는가”, “SDK가 그 credential을 실제로 선택했는가” 중 하나에서
              갈립니다. 아래 순서대로 보면 원인을 좁히기 쉽습니다.
            </p>
            <div className="mt-6">
              <NoteRow
                title="Pod가 원하는 ServiceAccount로 실행 중인지 확인"
                body="kubectl describe pod로 service account 이름을 먼저 확인합니다. ServiceAccount annotation이 맞아도 Pod가 default ServiceAccount로 뜨면 IRSA가 적용되지 않습니다."
              />
              <NoteRow
                title="AWS_ROLE_ARN과 AWS_WEB_IDENTITY_TOKEN_FILE 확인"
                body="IRSA가 주입되면 Pod 환경에서 Role ARN과 web identity token file 경로를 확인할 수 있습니다. 값이 없다면 ServiceAccount annotation, webhook, Pod 재시작 여부를 먼저 봅니다."
              />
              <NoteRow
                title="AccessDenied가 나면 trust policy와 permission policy를 나눠서 본다"
                body="AssumeRoleWithWebIdentity 자체가 거절되면 trust policy 문제일 가능성이 큽니다. Role assume은 성공했지만 S3, DynamoDB 작업이 거절되면 Role에 붙은 permission policy를 봐야 합니다."
              />
              <NoteRow
                title="InvalidIdentityToken은 OIDC provider와 audience를 의심한다"
                body="OIDC provider ARN, issuer URL, aud 조건이 실제 토큰과 맞는지 확인합니다. 특히 aud가 sts.amazonaws.com으로 조건 처리되어 있는지 확인합니다."
              />
              <NoteRow
                title="정적 키가 남아 있으면 IRSA보다 먼저 선택될 수 있다"
                body="환경 변수나 Secret으로 AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY가 주입되어 있으면 SDK credential chain에서 그 값이 먼저 선택될 수 있습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              EKS Pod Identity와의 관계
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                현재 Amazon EKS에는 IRSA 외에도 EKS Pod Identity가 있습니다.
                AWS는 가능한 경우 Pod Identity를 사용하는 흐름을 권장합니다. Pod
                Identity는 EKS 서비스와 더 직접적으로 통합되어 있고, 클러스터마다
                IAM OIDC provider와 trust policy를 세밀하게 갱신해야 하는 부담을
                줄여줍니다.
              </p>
              <p>
                그렇다고 IRSA를 몰라도 되는 것은 아닙니다. IRSA는 OIDC와 STS를
                이용하는 구조가 명확하고, Amazon EKS 외의 Kubernetes 배포 형태나
                기존 운영 환경에서도 여전히 자주 등장합니다. 특히 이미 IRSA로
                구성된 클러스터를 운영하거나, Helm chart가 ServiceAccount
                annotation을 전제로 하는 경우에는 IRSA의 trust policy와 토큰
                흐름을 이해해야 장애를 빨리 좁힐 수 있습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              IRSA는 EKS에서 AWS 권한을 노드가 아니라 Pod의 ServiceAccount에
              붙이는 방식입니다. OIDC provider, IAM Role trust policy,
              ServiceAccount annotation, AWS SDK credential chain이 한 흐름으로
              이어져야 정상 동작합니다. 보안적으로는 권한을 작게 만들 수 있는
              좋은 도구지만, IMDS 접근 제한과 trust policy 범위까지 함께 관리할
              때 의미가 있습니다.
            </p>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
