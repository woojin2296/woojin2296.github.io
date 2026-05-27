import { BackToProjectsLink } from "@/app/_components/back-to-projects-link";
import { ExpandableImage } from "@/app/_components/expandable-image";
import { ProjectBottomNavigation } from "@/app/_components/project-bottom-navigation";
import { ProjectSectionNavigation } from "@/app/_components/project-section-navigation";
import { SectionHeading } from "@/app/_components/section-heading";
import { SkillIcon } from "@/app/_components/skill-icon";

export const metadata = {
  title: "Dobong Life | Lim Woojin Portfolio",
  description: "도봉라이프 AWS 인프라 구축 및 운영 프로젝트",
};

export const projectInfo = {
  link: "/projects/dobonglife/",
  title: "도봉라이프(DobongLife) - AWS 인프라 구축 및 운영",
  titleProject: "도봉라이프 AWS 인프라 구축 및 운영",
  affiliation: "(주)유머스트알엔디",
  position: "인턴 사원",
  period: "2025.12 ~ current",
  description:
    "서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 구축하고 운영한 프로젝트",
  summary: [
    "AWS 기반 서비스 인프라 설계 및 구축",
    "Terraform을 활용한 IaC 구현으로 인프라 재현성 확보",
    "AWS SSM + GitHub Actions(OIDC) 기반 CI/CD 파이프라인 구축",
    "CloudWatch로 운영 로그 수집 및 모니터링 환경 구축",
  ],
  techStack: [
    { name: "AWS", primary: true, summary: true },
    { name: "Terraform", primary: true, summary: true },
    { name: "GitHub Actions", primary: false, summary: true },
    { name: "Docker Compose", primary: false, summary: true },
    { name: "CloudWatch", primary: false, summary: true },
    { name: "VPC", primary: false, summary: false },
    { name: "EC2", primary: false, summary: false },
    { name: "RDS", primary: false, summary: false },
    { name: "ElastiCache", primary: false, summary: false },
    { name: "S3", primary: false, summary: false },
    { name: "Route 53", primary: false, summary: false },
    { name: "IAM", primary: false, summary: false },
    { name: "SSM", primary: false, summary: false },
    { name: "Parameter Store", primary: false, summary: false },
    { name: "OIDC", primary: false, summary: false },
    { name: "Nginx", primary: false, summary: false },
    { name: "Spring Boot", primary: false, summary: false },
  ],
};

const projectSectionLinks = [
  { id: "overview", label: "프로젝트 개요" },
  { id: "role", label: "역할" },
  { id: "skills", label: "기술 스택" },
  { id: "legacy-upgrade", label: "AWS 인프라 및 CI/CD 방식 개선 (V1, V2, V3)" },
  { id: "terraform-gitops", label: "Terraform과 GitOps 전체 구조" },
  { id: "secret-variables", label: "Secret 및 Variables 관리 경계" },
  { id: "monitoring", label: "모니터링 구성" },
  { id: "tls-troubleshooting", label: "TLS 인증서 장애 트러블슈팅" },
  { id: "retrospective", label: "프로젝트 회고" },
];

function DiagramFigure({
  src,
  alt,
  caption,
  width,
  height,
  className = "",
  wrapperClassName = "block w-full",
  imageClassName = "h-auto w-full object-contain",
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  className?: string;
  wrapperClassName?: string;
  imageClassName?: string;
}) {
  return (
    <figure className={`grid gap-3 ${className}`.trim()}>
      <ExpandableImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        wrapperClassName={wrapperClassName}
        className={imageClassName}
      />
      <figcaption className="text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function DobongLifePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-[760px] px-5 pt-10 pb-28 sm:px-6">
        <BackToProjectsLink />
        <ProjectSectionNavigation links={projectSectionLinks} />

        <header className="mt-16 flex flex-col gap-8 pt-10 text-center">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[#737373]">
              Project No.1
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.12] text-balance">
              도봉라이프 AWS 인프라 구축 및 운영
            </h1>
            <p className="text-base leading-relaxed text-[#737373]">
              서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 구축하고 운영한 프로젝트
            </p>
          </div>

          <section className="mt-8 grid grid-cols-3 items-stretch">
            <div className="grid grid-rows-[auto_1fr]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Period
              </p>
              <p className="mt-3 flex min-h-10 items-center justify-center text-sm font-medium text-black">
                2025.12 ~ current
              </p>
            </div>
            <div className="relative grid grid-rows-[auto_1fr]">
              <span
                className="absolute bottom-4 left-0 top-4 w-px bg-[#e5e5e5]"
                aria-hidden="true"
              />
              <span
                className="absolute bottom-4 right-0 top-4 w-px bg-[#e5e5e5]"
                aria-hidden="true"
              />
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Position
              </p>
              <p className="mt-3 flex min-h-10 items-center justify-center text-sm font-medium text-black">
                (주)유머스트알엔디 <br />
                인턴 사원
              </p>
            </div>
            <div className="grid grid-rows-[auto_1fr]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#737373]">
                Role
              </p>
              <p className="mt-3 flex min-h-10 items-center justify-center text-sm font-medium text-black">
                DevOps Engineer <br />
                Backend Developer
              </p>
            </div>
          </section>
        </header>

        <section id="overview" className="scroll-mt-12 pt-32">
          <SectionHeading>프로젝트 개요</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"서울특별시 도봉구의 "}
              <strong className="font-medium text-black">
                {"지역상권 활성화"}
              </strong>
              {"를 위한 관광 정보 안내 서비스입니다. 스토리텔링 기반 여행 코스, 맛집 정보, "}
              <strong className="font-medium text-black">
                {"지역 소상공인 연계 할인 쿠폰 발행 및 사용 기능"}
              </strong>
              {"을 제공하며, 현재 "}
              <strong className="font-medium text-black">
                {"플레이스토어와 앱스토어에 출시되어"}
              </strong>
              {" 다운로드 가능한 서비스입니다."}
            </p>
          </div>
        </section>

        <section id="role" className="scroll-mt-12 pt-24">
          <SectionHeading>역할</SectionHeading>
          <div className="grid gap-5">
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"기존 EC2 기반 레거시 인프라 분석 및 V2 구조 개선 설계"}
              </li>
              <li>
                {"Terraform 기반 AWS 리소스 코드화 및 배포 권한·설정 관리 구조 정리"}
              </li>
              <li>
                {"EKS 기반 MSA 운영 플랫폼 구성 및 GitOps 배포 흐름 설계"}
              </li>
              <li>
                {"TLS 인증서 장애 원인 분석 및 재발 방지 운영 절차 정리"}
              </li>
            </ul>
          </div>
        </section>

        <section id="skills" className="scroll-mt-12 pt-24">
          <SectionHeading>기술 스택</SectionHeading>
          <div className="flex flex-wrap gap-2.5">
            <SkillIcon emphasized>AWS</SkillIcon>
            <SkillIcon emphasized>Terraform</SkillIcon>
            <SkillIcon emphasized>EKS</SkillIcon>
            <SkillIcon emphasized>Argo CD</SkillIcon>
            <SkillIcon>Kubernetes</SkillIcon>
            <SkillIcon>GitHub Actions</SkillIcon>
            <SkillIcon>Amazon ECR</SkillIcon>
            <SkillIcon>Amazon RDS</SkillIcon>
            <SkillIcon>CloudWatch</SkillIcon>
            <SkillIcon>Docker</SkillIcon>
            <SkillIcon>Nginx</SkillIcon>
          </div>
        </section>

        <section id="legacy-upgrade" className="scroll-mt-12 pt-24">
          <SectionHeading>AWS 인프라 및 CI/CD 방식 개선 (V1, V2, V3)</SectionHeading>
          <div className="grid gap-5">
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"기존 레거시 인프라 구조 (V1)"}
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"기존 인프라는 단일 EC2에서 Nginx, Spring Boot, Redis를 함께 운영하는 구조였습니다. 배포 파이프라인의 경우 GitHub Actions에서 Docker 이미지를 빌드한 뒤 Docker Hub에 업로드하고, EC2에 SSH로 접속해 이미지를 내려받아 컨테이너를 갱신하는 방식이었습니다."}
            </p>
            <div
              className="grid items-start gap-5 md:grid-cols-[1fr_0.78fr]"
              aria-label="도봉라이프 V1 인프라와 CI/CD 구조"
            >
              <DiagramFigure
                src="/projects/dobonglife/Architecture - DobongLife AWS Infra - V1.jpg"
                alt="도봉라이프 V1 아키텍처 다이어그램"
                width={5800}
                height={2758}
                caption="레거시 인프라 아키텍처"
                wrapperClassName="flex w-full items-center justify-center md:h-[220px]"
                imageClassName="h-auto w-full object-contain md:max-h-full md:w-auto md:max-w-full"
              />
              <DiagramFigure
                src="/projects/dobonglife/Architecture - DobongLife CICD - V1.jpg"
                alt="도봉라이프 V1 CI/CD 아키텍처 다이어그램"
                width={4598}
                height={3479}
                caption="레거시 인프라 CI/CD 파이프라인"
                wrapperClassName="flex w-full items-center justify-center md:h-[220px]"
                imageClassName="h-auto w-full object-contain md:max-h-full md:w-auto md:max-w-full"
              />
            </div>
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"역할 기반 인프라 구조로 전환 (V2)"}
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"프론트 서버를 별도로 배포해야 해 기존 인프라를 역할 기반 아키텍처로 분리하고 확장하였습니다. 이에 따라 Nginx, Backend, Frontend 서버를 역할별 EC2로 분리하고, 외부 접근 영역과 내부 서비스 영역을 Public/Private Subnet으로 나누었습니다. Redis는 ElastiCache로 분리해 애플리케이션 서버와 상태 저장 계층의 책임을 나누었고, Amazon CloudWatch를 활용해 EC2 로그 수집 및 애플리케이션 로그 확인 환경을 구축했습니다."}
            </p>
            <DiagramFigure
              src="/projects/dobonglife/Architecture - DobongLife AWS Infra - V2.jpg"
              alt="도봉라이프 V2 AWS 인프라 아키텍처 다이어그램"
              width={5333}
              height={2999}
              caption="역할 기반 AWS 인프라 구성"
              className="px-8"
            />
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"GitHub Actions, OIDC, SSM을 활용한 CI/CD 파이프라인 구축 (V2)"}
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"서버에 직접 SSH로 접속해 배포하고 환경 변수를 관리하던 방식을 줄이고, 기존 SSH 22번 포트 기반 접근을 제거했습니다. AWS Systems Manager로 인스턴스 접근 방식을 전환하고, GitHub Actions와 OIDC 기반 권한 위임을 사용해 CD 파이프라인을 재구성했습니다."}
            </p>
            <DiagramFigure
              src="/projects/dobonglife/Architecture - DobongLife CICD - V2.jpg"
              alt="도봉라이프 V2 CI/CD 아키텍처 다이어그램"
              width={5756}
              height={2779}
              caption="GitHub Actions, OIDC, SSM을 활용한 V2 CI/CD 파이프라인"
              className="px-8"
            />
            <h3
              id="eks-platform"
              className="scroll-mt-12 pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black"
            >
              {"마이크로 서비스 전환을 위한 EKS 환경 구축 (V3)"}
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"백엔드 서비스의 MSA 아키텍처 전환과 트래픽 증가에 대비해 기존 서버 배포 방식을 AWS EKS 기반 구조로 확장했습니다. GitHub Actions가 이미지를 빌드해 Amazon ECR에 업로드하면 Argo CD가 GitOps 저장소 변경을 감지해 클러스터로 배포하도록 구성했습니다."}
            </p>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"Public Subnet은 ALB 진입점, App Private Subnet은 application node, Data Private Subnet은 RDS/Redis 계층으로 나누어 트래픽 흐름과 데이터 계층을 분리했습니다. 각 애플리케이션의 Kubernetes 리소스는 Helm Charts로 템플릿화해 중복 설정을 줄였고, AWS Load Balancer Controller는 Kubernetes Ingress를 ALB로 연결하고, ExternalDNS는 Route 53 record를 관리하며, EBS CSI Driver와 Cluster Autoscaler로 스토리지와 노드 확장 기반을 구성했습니다."}
            </p>
            <DiagramFigure
              src="/projects/dobonglife/Architecture - DobongLife EKS Platform - V3.png"
              alt="도봉라이프 V3 EKS 플랫폼 아키텍처 다이어그램"
              width={1536}
              height={1024}
              caption="V3 EKS 플랫폼 아키텍처"
              className="px-8"
            />
            <h3
              id="eks-cicd"
              className="scroll-mt-12 pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black"
            >
              {"Argo CD와 GitOps 기반 EKS 배포 파이프라인 구축 (V3)"}
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"EKS 환경에서는 애플리케이션 이미지 빌드와 클러스터 배포 책임을 분리했습니다. 기존 Docker Hub/SSM 성격의 배포 흐름은 ECR push-only GitHub Actions로 정리했고, GitHub Actions가 서비스 소스 변경을 기준으로 Docker 이미지를 빌드해 Amazon ECR에 push한 뒤 GitOps 저장소의 Helm values 이미지 태그를 갱신하도록 구성했습니다."}
            </p>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"이미지 태그는 mutable latest 대신 full commit SHA를 사용해 어떤 코드가 어떤 이미지로 배포되었는지 추적 가능하게 했습니다. Argo CD는 GitOps 저장소 변경을 감지해 각 서비스의 Helm Chart를 EKS 클러스터에 동기화하고, App of Apps 구조로 frontend, backend, monitoring, loki, alloy, observability application을 관리하도록 했습니다."}
            </p>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"그 결과 frontend는 GitOps 기반으로 public HTTPS endpoint까지 연결했고, backend 11개 microservice image를 ECR에 push한 뒤 GitOps image tag 갱신 흐름으로 배포할 수 있게 했습니다."}
            </p>
            <h2
              id="terraform-gitops"
              className="scroll-mt-12 pt-8 font-heading text-[24px] font-medium leading-[1.33] tracking-normal text-black"
            >
              {"Terraform과 GitOps 전체 구조"}
            </h2>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"Terraform은 VPC, EKS, ECR, RDS, Redis처럼 클러스터가 동작하기 위한 기반 인프라를 관리하고, Argo CD와 GitOps 저장소는 애플리케이션 배포 상태를 관리하도록 책임을 분리했습니다. 인프라 변경과 애플리케이션 배포 변경이 같은 파이프라인에 섞이지 않도록 나눈 구조입니다."}
            </p>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"Terraform은 단일 root에 모든 리소스를 넣지 않고, remote-state, foundation, container-registry, datastore, cluster-addons 단위로 나누었습니다. remote-state는 S3 기반 state 저장소를 담당하고, foundation은 VPC, subnet, NAT, VPC endpoint, EKS, node group, Route 53, ACM 같은 공통 기반을 담당하도록 했습니다. container-registry는 ECR, datastore는 RDS MySQL과 ElastiCache Redis, cluster-addons는 Argo CD와 EKS add-on을 관리하도록 분리했습니다."}
            </p>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"환경은 dev, staging, prod를 기준으로 "}
              <code className="text-[0.95em] font-medium text-black">
                {"envs/<env>"}
              </code>
              {" 아래의 "}
              <code className="text-[0.95em] font-medium text-black">
                {"tfvars"}
              </code>
              {"와 backend 설정으로 나누었습니다. 각 stack은 필요한 값만 S3 remote state output으로 참조하도록 구성했고, remote state bucket은 일반 dev teardown 대상에서 제외해 Terraform source of truth가 함께 삭제되지 않도록 정리했습니다."}
            </p>
            <pre className="overflow-x-auto bg-[#f5f5f5] p-4 text-sm leading-relaxed text-black">
              <code>{`Terraform
  bootstrap/remote-state
    -> S3 remote state bucket

  stacks/foundation
    -> VPC, subnet, route, NAT, VPC endpoints
    -> EKS, node group, OIDC/IRSA
    -> Route 53, ACM

  stacks/container-registry
    -> ECR repositories

  stacks/datastore
    -> RDS MySQL, ElastiCache Redis

  stacks/cluster-addons
    -> Argo CD, AWS Load Balancer Controller, EBS CSI
    -> External Secrets, ExternalDNS, Cluster Autoscaler

GitOps / Argo CD
  applications/dev/root.yaml
    -> frontend-dev
    -> backend-dev
    -> monitoring-dev
    -> loki-dev
    -> alloy-dev
    -> observability-dev`}</code>
            </pre>
            <h2
              id="secret-variables"
              className="scroll-mt-12 pt-8 font-heading text-[24px] font-medium leading-[1.33] tracking-normal text-black"
            >
              {"Secret 및 Variables 관리 경계"}
            </h2>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"RDS master password는 AWS Secrets Manager에서 관리하고, Terraform은 secret value가 아니라 ARN만 output으로 전달하도록 정리했습니다."}
              </li>
              <li>
                {"GitOps backend chart는 ExternalSecret을 통해 RDS secret의 username/password를 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"DB_USERNAME"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"DB_PASSWORD"}
                </code>
                {"로 주입하도록 구성했습니다."}
              </li>
              <li>
                <code className="text-[0.95em] font-medium text-black">
                  {"AWS_REGION"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"ECR_IMAGE_URI"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"NEXT_PUBLIC_API_URL"}
                </code>
                {" 같은 비민감 설정은 GitHub Variables로, "}
                <code className="text-[0.95em] font-medium text-black">
                  {"AWS_ROLE_TO_ASSUME"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"GITOPS_DEPLOY_KEY"}
                </code>
                {" 같은 민감 설정은 GitHub Secrets로 관리했습니다."}
              </li>
              <li>
                <code className="text-[0.95em] font-medium text-black">
                  {"NEXT_PUBLIC_*"}
                </code>
                {"는 client bundle에 노출되는 public config이므로 secret과 분리해 다뤘습니다."}
              </li>
              <li>
                {"secret value, public runtime config, client public config, drift 위험 config를 분류해 어떤 값이 어디에서 관리되어야 하는지 inventory로 정리했습니다."}
              </li>
              <li>
                {"AWS Secrets Manager, Kubernetes Secret, GitHub Secrets, public config의 관리 경계를 inventory로 정리했습니다."}
              </li>
              <li>
                {"주요 기술: AWS Secrets Manager, External Secrets Operator, Kubernetes Secret, GitHub Secrets, GitHub Variables, ConfigMap, Helm values, IRSA"}
              </li>
            </ul>
            <h2
              id="monitoring"
              className="scroll-mt-12 pt-8 font-heading text-[24px] font-medium leading-[1.33] tracking-normal text-black"
            >
              {"모니터링 구성"}
            </h2>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"Prometheus, Grafana, Loki, Alloy를 dev cluster에 배포해 클러스터와 워크로드 상태, 로그, 대시보드를 확인할 수 있는 기반을 만들었습니다."}
              </li>
              <li>
                {"Spring Boot "}
                <code className="text-[0.95em] font-medium text-black">
                  {"/actuator/prometheus"}
                </code>
                {" endpoint는 인증 정책 정리가 필요했기 때문에, 우선 Nginx gateway access log를 Loki로 수집해 API traffic dashboard를 구성했습니다."}
              </li>
              <li>
                {"request count, 5xx count, request rate, method/status/path별 호출량을 LogQL 기반 Grafana dashboard로 확인할 수 있게 했습니다."}
              </li>
              <li>
                {"가용성 측면에서는 Cluster Autoscaler로 Pending Pod 발생 시 Managed Node Group이 확장될 수 있도록 구성하고, HPA로 서비스 부하에 따라 Pod replica 수를 자동 조정하도록 했습니다."}
              </li>
              <li>
                {"Grafana, Prometheus, Loki, Alloy를 구성하고 PVC stale attachment 문제까지 운영 관점에서 해결했습니다."}
              </li>
              <li>
                {"Loki access log 기반 API traffic dashboard를 구성해 요청 수, status code, method, path를 확인할 수 있게 했습니다."}
              </li>
              <li>
                {"주요 기술: kube-prometheus-stack, Prometheus, Grafana, Loki, Grafana Alloy, LogQL, PrometheusRule, Alertmanager, Nginx Gateway Access Log, Cluster Autoscaler, HPA"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"운영 트러블슈팅"}
            </h4>
            <h5 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"RDS connection exhaustion"}
            </h5>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                <strong className="font-medium text-black">{"장애 상황: "}</strong>
                {"일부 백엔드 서비스가 기동 과정에서 datasource 설정이 누락된 것처럼 실패했고, readiness가 정상 상태로 올라오지 않았습니다."}
              </li>
              <li>
                <strong className="font-medium text-black">{"원인 확인: "}</strong>
                {"pod logs에서는 Hibernate가 DB metadata를 조회하는 단계에서 connection을 얻지 못했고, 같은 시점 MySQL에는 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"Too many connections"}
                </code>
                {"가 발생했습니다. 서비스별 기본 Hikari pool이 동시에 생성되면서 dev RDS connection limit을 초과한 문제로 재분류했습니다."}
              </li>
              <li>
                <strong className="font-medium text-black">{"조치: "}</strong>
                {"service별 maximum pool size와 minimum idle 값을 dev RDS 용량에 맞게 줄이고, pod logs와 DB connection metric으로 재기동 시 연결 수가 과도하게 증가하지 않는지 확인했습니다."}
              </li>
            </ul>
            <pre className="overflow-x-auto bg-[#f5f5f5] p-4 text-sm leading-relaxed text-black">
              <code>{`[placeholder] RDS connection exhaustion 확인 로그
$ kubectl logs deploy/<service-name> -n backend-dev
Unable to determine Dialect without JDBC metadata

$ mysql -h <rds-endpoint> -u <user> -p
ERROR 1040 (08004): Too many connections`}</code>
            </pre>
            <h5 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"Node capacity / IP / memory 부족"}
            </h5>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                <strong className="font-medium text-black">{"장애 상황: "}</strong>
                {"일부 Pod가 Pending 상태에 머물렀고, 처음에는 이미지 배포 실패나 GitOps 동기화 문제처럼 보였습니다."}
              </li>
              <li>
                <strong className="font-medium text-black">{"원인 확인: "}</strong>
                {"scheduler event를 확인해 노드에 할당 가능한 CPU·memory가 부족한지, AWS VPC CNI가 Pod에 부여할 IP를 확보하지 못했는지, nodegroup max size와 Cluster Autoscaler가 확장 가능한 상태인지 함께 확인했습니다."}
              </li>
              <li>
                <strong className="font-medium text-black">{"조치: "}</strong>
                {"Spring Boot 서비스의 JVM memory request와 resource request를 dev node 용량에 맞게 조정하고, nodegroup 확장 한계를 함께 검토해 Pending 원인을 capacity 문제로 분리했습니다."}
              </li>
            </ul>
            <pre className="overflow-x-auto bg-[#f5f5f5] p-4 text-sm leading-relaxed text-black">
              <code>{`[placeholder] Pending Pod scheduler event 확인 로그
$ kubectl describe pod <pod-name> -n backend-dev
Warning  FailedScheduling  0/2 nodes are available: insufficient memory
Warning  FailedCreatePodSandBox  failed to assign an IP address to container`}</code>
            </pre>
          </div>
        </section>

        <section id="tls-troubleshooting" className="scroll-mt-12 pt-24">
          <SectionHeading>운영 장애 트러블슈팅: TLS 인증서 만료</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"도봉라이프 앱에서 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 동시에 실패한 장애를 분석했습니다. 서버 프로세스는 실행 중이었지만 백엔드 로그와 Nginx access log에 신규 요청이 남지 않았고, 원인은 "}
              <code className="text-[0.95em] font-medium text-black">
                {"api.dobonglife.co.kr"}
              </code>
              {"의 Let's Encrypt TLS 인증서 만료였습니다. 애플리케이션 내부 오류가 아니라 HTTP 요청이 서버에 도달하기 전 TLS 계층에서 차단된 문제로 판단했습니다."}
            </p>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"장애 상황"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"API 호출이 필요한 인증 기능 전반이 동시에 실패했습니다. 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 모두 영향을 받았습니다."}
              </li>
              <li>
                {"앱에는 네트워크 연결 문제처럼 보이는 오류가 표시되어, 사용자 입장에서는 계정 문제인지 서버 문제인지 구분하기 어려웠습니다."}
              </li>
              <li>
                {"서버 프로세스는 살아 있었지만 요청 로그가 비어 있어, 특정 API 로직보다 도메인, DNS, TCP 연결, TLS 인증서처럼 공통 네트워크 계층을 먼저 의심했습니다."}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"원인 확인"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                <code className="text-[0.95em] font-medium text-black">
                  {"openssl s_client -connect api.dobonglife.co.kr:443 -servername api.dobonglife.co.kr"}
                </code>
                {"로 SNI를 지정해 외부 클라이언트가 실제로 받는 인증서를 확인했습니다."}
              </li>
              <li>
                {"응답에서 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"certificate has expired"}
                </code>
                {"와 만료 시각을 확인했고, 로컬 Certbot 인증서 상태도 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"INVALID: EXPIRED"}
                </code>
                {"로 일치했습니다."}
              </li>
              <li>
                {"갱신 실패 원인은 기존 Certbot 설정이 standalone 방식이라 HTTP-01 challenge를 위해 80번 포트를 직접 점유해야 했고, 운영 서버에서는 Nginx가 이미 80번 포트를 사용하고 있었기 때문으로 정리했습니다."}
              </li>
            </ul>
            <div className="grid gap-3 md:grid-cols-2">
              <pre className="overflow-x-auto bg-[#f5f5f5] p-4 text-sm leading-relaxed text-black">
                <code>{`[placeholder] openssl 인증서 만료 확인 로그
$ openssl s_client -connect api.dobonglife.co.kr:443 -servername api.dobonglife.co.kr
verify error:num=10:certificate has expired
notAfter=2026-05-13 23:55:25 GMT`}</code>
              </pre>
              <pre className="overflow-x-auto bg-[#f5f5f5] p-4 text-sm leading-relaxed text-black">
                <code>{`[placeholder] Certbot 갱신 실패/상태 로그
$ sudo certbot certificates
INVALID: EXPIRED

$ sudo certbot renew
Could not bind TCP port 80 because it is already in use`}</code>
              </pre>
            </div>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"복구와 재발 방지"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"긴급 복구는 Certbot으로 인증서를 갱신하고 Nginx가 실제로 새 인증서를 제공하는지 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"openssl x509 -noout -dates"}
                </code>
                {"로 다시 확인했습니다."}
              </li>
              <li>
                {"standalone 방식은 갱신 때마다 Nginx와 80번 포트가 충돌할 수 있어, Nginx가 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"/.well-known/acme-challenge/"}
                </code>
                {" 경로를 서빙하는 webroot 방식으로 전환하는 방향을 잡았습니다."}
              </li>
              <li>
                {"이후 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"certbot renew --dry-run"}
                </code>
                {"으로 자동 갱신 경로를 검증하고, 인증서 만료일 모니터링과 Nginx reload 절차를 재발 방지 항목으로 정리했습니다."}
              </li>
            </ul>
            <pre className="overflow-x-auto bg-[#f5f5f5] p-4 text-sm leading-relaxed text-black">
              <code>{`[placeholder] 복구 후 인증서 검증 로그
$ openssl s_client -connect api.dobonglife.co.kr:443 -servername api.dobonglife.co.kr | openssl x509 -noout -dates
notBefore=...
notAfter=...`}</code>
            </pre>
          </div>
        </section>

        <section id="retrospective" className="scroll-mt-12 pt-24">
          <SectionHeading>프로젝트 회고</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"서비스 전체를 AWS 환경에 직접 배포하면서 인프라 구성 요소가 어떻게 연결되고 실제 트래픽이 어떤 흐름으로 처리되는지 이해할 수 있었습니다. 특히 Security Group과 IAM을 활용한 권한 관리를 직접 설계하고 적용하면서 클라우드 환경에서의 보안 설정을 경험했습니다."}
            </p>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"Terraform을 사용하면서 GUI로 설정할 때보다 VPC, Subnet, EC2, RDS, IAM 등 인프라 리소스의 관계를 더 명확하게 파악할 수 있었습니다. 코드로 인프라를 정의하면서 재현성과 변경 추적의 중요성도 함께 체감했습니다."}
            </p>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"사수 없이 인프라 전반을 단독으로 구축하며 시행착오도 많았지만, 직접 부딪히며 이해한 부분이 많았습니다. 이후에는 EC2 중심 운영에서 EKS 기반 운영 플랫폼으로 확장하면서 Kubernetes, GitOps, 관측 가능성, Secret 관리, 권한 관리가 실제 서비스 운영 안정성과 어떻게 연결되는지 경험했습니다."}
            </p>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"특히 CI/CD가 성공했다고 해서 서비스가 정상 운영되는 것은 아니라는 점을 체감했습니다. 이미지 빌드와 배포 완료 여부뿐 아니라 Argo CD 동기화 상태, Pod Ready 상태, Probe 결과, 로그, 메트릭, DB 연결 상태를 함께 확인해야 실제 운영 가능한 상태를 판단할 수 있었습니다."}
            </p>
          </div>
        </section>

        <ProjectBottomNavigation />
      </main>
    </div>
  );
}
