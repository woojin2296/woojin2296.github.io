import { BackToProjectsLink } from "@/app/_components/back-to-projects-link";
import { ExpandableImage } from "@/app/_components/expandable-image";
import { ProjectBottomNavigation } from "@/app/_components/project-bottom-navigation";
import { ProjectSectionNavigation } from "@/app/_components/project-section-navigation";
import { SectionHeading } from "@/app/_components/section-heading";

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
  { id: "infrastructure", label: "인프라 구축 과정" },
  { id: "retrospective", label: "프로젝트 회고" },
];

function DiagramFigure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="grid gap-3">
      <ExpandableImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        wrapperClassName="block w-full"
        className="h-auto w-full object-contain"
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
              {"도봉라이프는 서울특별시 도봉구의 "}
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
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"V1 - 초기 인프라 설계 및 배포 기반 구축"}
            </h3>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"단일 EC2 기반으로 Nginx, Spring Boot, Redis를 Docker Compose로 통합 배포"}
              </li>
              <li>
                {"VPC, Public Subnet, Private Subnet, RDS를 구성해 외부 접근과 데이터 계층을 분리"}
              </li>
              <li>
                {"GitHub Actions, Docker Hub, SSH를 활용한 초기 CI/CD 파이프라인 구축"}
              </li>
            </ul>
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"V2 - 운영 안정성 개선 및 보안 배포 구조 고도화"}
            </h3>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"Nginx, Backend, Frontend 서버를 역할별 EC2로 분리하고 내부 서비스 영역을 Private Subnet에 배치"}
              </li>
              <li>
                {"Terraform으로 VPC, Subnet, EC2, RDS, IAM 리소스를 코드화해 인프라 재현성 확보"}
              </li>
              <li>
                {"GitHub Actions OIDC, SSM, Parameter Store를 활용해 SSH Key 없이 배포와 환경 변수 관리를 수행"}
              </li>
              <li>
                {"CloudWatch로 EC2 및 애플리케이션 로그를 수집해 운영 상태를 확인할 수 있는 기반 마련"}
              </li>
            </ul>
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"V3 - EKS 기반 운영 플랫폼 전환"}
            </h3>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"EC2 역할 분리 구조를 EKS 기반 MSA 운영 플랫폼으로 확장"}
              </li>
              <li>
                {"Terraform stack을 remote-state, foundation, container-registry, datastore, cluster-addons로 분리"}
              </li>
              <li>
                {"AWS Load Balancer Controller, EBS CSI, Cluster Autoscaler, External Secrets Operator, ExternalDNS, Argo CD 등 EKS 필수 add-on 구성"}
              </li>
              <li>
                {"GitHub Actions, ECR, GitOps Repository, Argo CD를 연결해 commit SHA 기반 선언형 배포 파이프라인 구축"}
              </li>
              <li>
                {"Argo CD App of Apps 구조로 frontend, backend, monitoring, logging, observability application을 dev cluster에 배포"}
              </li>
              <li>
                {"AWS Secrets Manager, External Secrets, GitHub Secrets/Variables, Kubernetes Secret, public runtime config의 관리 경계 정리"}
              </li>
              <li>
                {"Pod readiness, RDS connection, node capacity, PVC attachment, API traffic dashboard, dev teardown 문제를 운영 로그 형태로 추적"}
              </li>
            </ul>
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"운영 장애 분석 및 재발 방지"}
            </h3>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"API 도메인의 TLS 인증서 만료로 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 동시에 실패한 장애 분석"}
              </li>
              <li>
                {"서버 프로세스 정상, 애플리케이션 로그 없음, Nginx access log 없음이라는 단서를 바탕으로 HTTP 이전 계층의 문제로 조사 범위 전환"}
              </li>
              <li>
                {"OpenSSL, Certbot, system time, Nginx 설정을 확인해 Let's Encrypt 인증서 만료와 standalone 갱신 실패 원인 식별"}
              </li>
              <li>
                {"webroot 기반 Certbot 갱신 구조, dry-run 검증, Nginx reload hook, 인증서 만료일 모니터링으로 재발 방지 방향 정리"}
              </li>
            </ul>
          </div>
        </section>

        <section id="skills" className="scroll-mt-12 pt-24">
          <SectionHeading>기술 스택</SectionHeading>
          <div className="grid gap-5">
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"Infra"}
            </h3>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"AWS VPC, Public Subnet, App Private Subnet, Data Private Subnet"}
              </li>
              <li>
                {"NAT Gateway, VPC Endpoint, Route 53, ACM, ALB"}
              </li>
              <li>
                {"Amazon EC2, Amazon EKS, Managed Node Group"}
              </li>
              <li>
                {"Amazon RDS MySQL, Amazon ElastiCache Redis"}
              </li>
              <li>
                {"Amazon ECR, Amazon S3, CloudWatch"}
              </li>
              <li>
                {"Terraform, S3 Remote State, IAM, OIDC, IRSA"}
              </li>
              <li>
                {"TLS/HTTPS, Let's Encrypt, Certbot, OpenSSL"}
              </li>
            </ul>
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"Kubernetes / GitOps"}
            </h3>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"Kubernetes Deployment, Service, Ingress, Namespace, ConfigMap, Secret"}
              </li>
              <li>
                {"Argo CD, App of Apps, GitOps Repository"}
              </li>
              <li>
                {"Helm, Kubernetes Manifest"}
              </li>
              <li>
                {"AWS Load Balancer Controller, ExternalDNS"}
              </li>
              <li>
                {"External Secrets Operator, AWS Secrets Manager, Parameter Store"}
              </li>
              <li>
                {"EBS CSI Driver, gp3 StorageClass"}
              </li>
              <li>
                {"Cluster Autoscaler"}
              </li>
            </ul>
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"CI/CD"}
            </h3>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"GitHub Actions"}
              </li>
              <li>
                {"GitHub OIDC to AWS IAM Role"}
              </li>
              <li>
                {"Amazon ECR commit SHA image tagging"}
              </li>
              <li>
                {"GitOps image tag update"}
              </li>
              <li>
                {"Argo CD Sync, Rollout Verification"}
              </li>
            </ul>
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"Observability"}
            </h3>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"Prometheus, kube-prometheus-stack"}
              </li>
              <li>
                {"Grafana, Grafana Dashboard"}
              </li>
              <li>
                {"Loki, Grafana Alloy"}
              </li>
              <li>
                {"Alertmanager, PrometheusRule"}
              </li>
              <li>
                {"Nginx Gateway Access Log, LogQL"}
              </li>
            </ul>
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"Operations / Troubleshooting"}
            </h3>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"Nginx access log, application log"}
              </li>
              <li>
                <code className="text-[0.95em] font-medium text-black">
                  {"openssl s_client"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"certbot certificates"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"certbot renew --dry-run"}
                </code>
              </li>
              <li>
                {"systemd timer, cron, Nginx reload hook"}
              </li>
              <li>
                {"DNS, SNI, TLS handshake, certificate expiration monitoring"}
              </li>
            </ul>
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"Application Runtime"}
            </h3>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"Spring Boot Backend Microservices"}
              </li>
              <li>
                {"Next.js Admin Frontend"}
              </li>
              <li>
                {"Docker, Docker Compose"}
              </li>
              <li>
                {"Nginx, MySQL, Redis"}
              </li>
            </ul>
          </div>
        </section>

        <section id="infrastructure" className="scroll-mt-12 pt-24">
          <SectionHeading>인프라 구축 과정</SectionHeading>
          <div className="grid gap-5">
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"01. 초기 배포 환경 구축 (V1)"}
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"도봉라이프의 초기 BE 인프라를 AWS 기반으로 배포했습니다. 개발 환경 중심으로 최소 비용과 빠른 배포가 요구되어 단일 EC2와 RDS를 사용하는 단순한 구조로 구성했습니다."}
            </p>
            <DiagramFigure
              src="/projects/dobonglife/Architecture - DobongLife AWS Infra - V1.jpg"
              alt="도봉라이프 V1 아키텍처 다이어그램"
              width={5800}
              height={2758}
              caption="V1 단일 EC2, RDS, S3 기반의 초기 AWS 인프라 구성"
            />
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"단일 EC2 + RDS 기반 AWS 배포"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"도봉라이프 API 서버를 AWS 환경에 최초 배포"}
              </li>
              <li>
                {"단일 EC2 기반으로 Nginx, Spring Boot, Redis를 Docker Compose로 통합 운영"}
              </li>
              <li>
                {"데이터 계층은 Amazon RDS와 Amazon S3를 사용"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"네트워크 및 보안 구성"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"VPC 내 Private Subnet에 RDS를 배치하여 외부 직접 접근 차단"}
              </li>
              <li>
                {"Amazon Route 53을 통한 DNS 라우팅 구성"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"배포 방식"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"SSH 기반 원격 접속을 활용한 CD 파이프라인 구성"}
              </li>
              <li>
                {"단일 서버 구조로 빠른 배포와 운영 단순성 확보"}
              </li>
            </ul>
            <DiagramFigure
              src="/projects/dobonglife/Architecture - DobongLife CICD - V1.jpg"
              alt="도봉라이프 V1 CI/CD 아키텍처 다이어그램"
              width={4598}
              height={3479}
              caption="GitHub Actions, Docker Hub, EC2를 연결한 초기 CI/CD 파이프라인"
            />
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"02. 인프라 구조 개선 및 운영 환경 고도화 (V2)"}
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"웹 어드민 페이지 개발에 따라 FE 서버를 추가 배포하고, 트래픽 증가에 대비해 인프라 구조를 역할 기반으로 분리했습니다. 운영 로그 수집을 위한 모니터링 기반도 함께 구축했습니다."}
            </p>
            <DiagramFigure
              src="/projects/dobonglife/Architecture - DobongLife AWS Infra - V2.jpg"
              alt="도봉라이프 V2 AWS 인프라 아키텍처 다이어그램"
              width={5333}
              height={2999}
              caption="V2 역할별 EC2, Private Subnet, SSM, OIDC 기반의 AWS 인프라 구성"
            />
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"인프라 구조 분리 및 확장"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"단일 서버 구조에서 역할 기반 아키텍처로 전환"}
              </li>
              <li>
                {"Nginx, Backend, Frontend를 각각 독립된 EC2로 분리"}
              </li>
              <li>
                {"Nginx는 Public Subnet에, FE/BE 애플리케이션 서버와 DB는 Private Subnet에 배치"}
              </li>
              <li>
                {"Redis를 EC2에서 Amazon ElastiCache로 이전"}
              </li>
            </ul>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"관련 글: "}
              <a
                href="https://velog.io/@talking_tomato/AWS%EC%99%80-%ED%99%94%ED%95%B4%ED%95%98%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EC%99%80-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-black underline underline-offset-4"
              >
                {"AWS와 화해하기 - 네트워크와 인스턴스"}
              </a>
            </p>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"배포 방식 개선 (SSM + OIDC)"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"기존 SSH 22번 포트 기반 접근 제거"}
              </li>
              <li>
                {"AWS Systems Manager를 활용하여 인스턴스 접근 방식 전환"}
              </li>
              <li>
                {"GitHub Actions + OIDC 기반으로 CD 파이프라인 재구성"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"IaC 도입"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"Terraform으로 VPC, Subnet, EC2, RDS, IAM 등 AWS 리소스를 코드화"}
              </li>
              <li>
                {"AWS Systems Manager Parameter Store를 활용해 환경 변수와 민감 정보 관리"}
              </li>
              <li>
                {"user-data 파일을 이용해 EC2 기본 설정 자동화"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"로깅 및 모니터링"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"Amazon CloudWatch를 활용하여 EC2 로그 수집 및 애플리케이션 로그 확인 환경 구축"}
              </li>
            </ul>
            <DiagramFigure
              src="/projects/dobonglife/Architecture - DobongLife CICD - V2.jpg"
              alt="도봉라이프 V2 CI/CD 아키텍처 다이어그램"
              width={5756}
              height={2779}
              caption="GitHub Actions, OIDC, SSM을 활용한 V2 CI/CD 파이프라인"
            />
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"03. EKS 기반 MSA 운영 플랫폼 전환 (V3)"}
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"도봉라이프의 기존 배포 구조를 AWS EKS 기반 MSA 운영 플랫폼으로 확장하기 위해 VPC, EKS, RDS, Redis, ECR, Route 53, ACM, 클러스터 애드온을 Terraform 모듈로 분리했습니다. 애플리케이션 배포는 GitHub Actions와 Argo CD 기반 GitOps로 전환했고, 구축 과정에서는 이미지 배포 성공 여부에 머무르지 않고 Pod readiness, 노드 capacity, RDS connection, PVC attachment, 로그 수집, API traffic dashboard까지 확인하며 실제 운영 관점의 장애 대응 기록을 남겼습니다."}
            </p>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"전체 구조"}
            </h4>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"Terraform은 클라우드와 클러스터 기반을 만들고, GitOps는 애플리케이션과 운영 리소스를 관리하도록 책임을 분리했습니다. 인프라 변경과 애플리케이션 배포 변경의 범위를 나누어 관리하기 위한 구조입니다."}
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
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"Terraform 기반 인프라 모듈화"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"강조할 점: 단일 Terraform root에 모든 리소스를 몰아넣지 않고 remote-state, foundation, container-registry, datastore, cluster-addons 단위로 분리해 변경 범위와 장애 영향을 줄였습니다."}
              </li>
              <li>
                {"강조할 점: dev, staging, prod 환경은 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"envs/<env>"}
                </code>
                {" 아래의 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"tfvars"}
                </code>
                {"와 backend 설정으로 나누고, 각 stack은 S3 remote state output만 참조하도록 구성했습니다."}
              </li>
              <li>
                {"강조할 점: remote state bucket은 일반 dev teardown 대상에서 제외해 Terraform source of truth를 보존하는 방향으로 정리했습니다."}
              </li>
              <li>
                {"주요 기술: Terraform, S3 Remote State, AWS Provider, VPC, Subnet, NAT Gateway, VPC Endpoint, EKS, Managed Node Group, Route 53, ACM, IAM, IRSA"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"EKS 운영 플랫폼 구성"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"강조할 점: Public Subnet은 ALB, App Private Subnet은 application node, Data Private Subnet은 RDS/Redis로 역할을 나누어 트래픽 흐름과 데이터 계층을 분리했습니다."}
              </li>
              <li>
                {"강조할 점: AWS Load Balancer Controller는 Kubernetes Ingress를 ALB로 연결하고, ExternalDNS는 Route 53 record를 관리하며, ACM은 ALB HTTPS listener에 연결되는 AWS managed certificate로 정리했습니다."}
              </li>
              <li>
                {"강조할 점: EBS CSI Driver는 Prometheus, Grafana, Loki PVC를 gp3 volume으로 연결하고, Cluster Autoscaler는 dev node group capacity 조정에 사용했습니다."}
              </li>
              <li>
                {"주요 기술: Amazon EKS, Kubernetes Ingress, AWS Load Balancer Controller, ALB, Route 53, ACM, ExternalDNS, EBS CSI Driver, gp3 StorageClass, Cluster Autoscaler"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"GitHub Actions + ECR + Argo CD GitOps 파이프라인"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"강조할 점: CI는 애플리케이션 빌드와 이미지 발행, GitOps image tag 갱신을 담당하고, 실제 배포는 Argo CD가 클러스터 상태를 동기화하도록 책임을 분리했습니다."}
              </li>
              <li>
                {"강조할 점: mutable "}
                <code className="text-[0.95em] font-medium text-black">
                  {"latest"}
                </code>
                {" 대신 full commit SHA image tag를 사용해 어떤 코드가 어떤 이미지로 배포되었는지 추적 가능하게 했습니다."}
              </li>
              <li>
                {"강조할 점: fresh dev cluster에서는 bootstrap script로 Grafana admin secret을 준비한 뒤 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"root-dev"}
                </code>
                {" application을 적용하고, Argo CD App of Apps 구조로 frontend, backend, monitoring, loki, alloy, observability application을 관리했습니다."}
              </li>
              <li>
                {"주요 기술: GitHub Actions, GitHub OIDC, Amazon ECR, Argo CD, GitOps Repository, Kubernetes Manifest, Helm, App of Apps, Docker"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"Admin Frontend CI/CD 전환"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"강조할 점: 기존 Docker Hub/SSM 성격의 배포 흐름에서 ECR push-only GitHub Actions로 정리하고, GitOps tag 갱신 이후 Argo CD가 배포를 수행하도록 분리했습니다."}
              </li>
              <li>
                {"강조할 점: "}
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
                {"강조할 점: "}
                <code className="text-[0.95em] font-medium text-black">
                  {"NEXT_PUBLIC_*"}
                </code>
                {"는 client bundle에 노출되는 public config이므로 secret과 분리해 다뤘습니다."}
              </li>
              <li>
                {"주요 기술: Next.js Admin Frontend, GitHub Actions, GitHub Variables, GitHub Secrets, GitHub OIDC, Amazon ECR, Argo CD, GitOps"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"Backend MSA 배포와 API contract 보존"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"강조할 점: 기존 client를 수정할 수 없는 조건에서 public API contract 보존을 우선 기준으로 두고, Spring Boot backend를 microservice 단위로 분리했습니다."}
              </li>
              <li>
                {"강조할 점: 11개 backend service image를 GitHub Actions로 빌드해 ECR에 push하고, GitOps image tag를 같은 commit SHA로 맞추는 흐름을 구성했습니다."}
              </li>
              <li>
                {"강조할 점: cross-domain side effect는 Outbox와 Redis Stream 기반으로 분리하는 방향을 잡아 MSA 전환 시 도메인 간 결합도를 낮추려 했습니다."}
              </li>
              <li>
                {"주요 기술: Spring Boot, Gradle, Docker, Amazon ECR, GitHub Actions, GitOps, Redis Stream, Outbox Pattern"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"Secret 및 Variables 관리 경계"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"강조할 점: RDS master password는 AWS Secrets Manager에서 관리하고, Terraform은 secret value가 아니라 ARN만 output으로 전달하도록 정리했습니다."}
              </li>
              <li>
                {"강조할 점: GitOps backend chart는 ExternalSecret을 통해 RDS secret의 username/password를 "}
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
                {"강조할 점: secret value, public runtime config, client public config, drift 위험 config를 분류해 어떤 값이 어디에서 관리되어야 하는지 inventory로 정리했습니다."}
              </li>
              <li>
                {"주요 기술: AWS Secrets Manager, External Secrets Operator, Kubernetes Secret, GitHub Secrets, GitHub Variables, ConfigMap, Helm values, IRSA"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"Observability 구성"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"강조할 점: Prometheus, Grafana, Loki, Alloy를 dev cluster에 배포해 클러스터와 워크로드 상태, 로그, 대시보드를 확인할 수 있는 기반을 만들었습니다."}
              </li>
              <li>
                {"강조할 점: Spring Boot "}
                <code className="text-[0.95em] font-medium text-black">
                  {"/actuator/prometheus"}
                </code>
                {" endpoint는 인증 정책 정리가 필요했기 때문에, 우선 Nginx gateway access log를 Loki로 수집해 API traffic dashboard를 구성했습니다."}
              </li>
              <li>
                {"강조할 점: request count, 5xx count, request rate, method/status/path별 호출량을 LogQL 기반 Grafana dashboard로 확인할 수 있게 했습니다."}
              </li>
              <li>
                {"주요 기술: kube-prometheus-stack, Prometheus, Grafana, Loki, Grafana Alloy, LogQL, PrometheusRule, Alertmanager, Nginx Gateway Access Log"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"운영 트러블슈팅"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"IAM 권한 부족: "}
                <code className="text-[0.95em] font-medium text-black">
                  {"eks:CreateCluster"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"ssm:GetParameter"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"ecr:ListTagsForResource"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"eks:DescribeUpdate"}
                </code>
                {" 등 Terraform 실행 주체에 필요한 AWS API action을 분리해 확인했습니다. 주요 기술: Terraform, AWS IAM, EKS, ECR, SSM"}
              </li>
              <li>
                {"GitOps bootstrap 분리: Terraform apply 성공 이후에도 workload가 나타나지 않는 상태를 Argo CD root application 미적용 문제로 분리하고, bootstrap script와 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"kubectl -n argocd get applications"}
                </code>
                {" 검증 흐름을 정리했습니다. 주요 기술: Argo CD, App of Apps, kubectl, GitOps"}
              </li>
              <li>
                {"Admission webhook dependency: External Secrets 설치 중 webhook endpoint 오류를 대상 chart 문제가 아니라 AWS Load Balancer Controller readiness와 add-on 설치 순서 문제로 추적했습니다. 주요 기술: Kubernetes Admission Webhook, AWS Load Balancer Controller, External Secrets Operator"}
              </li>
              <li>
                {"Backend readiness probe 실패: Spring Security 정책으로 HTTP actuator readiness가 401을 반환할 수 있는 상태를 확인하고, dev 서비스에는 TCP probe와 완화된 delay를 적용하는 방향으로 조정했습니다. 주요 기술: Kubernetes Probe, Spring Boot Actuator, Spring Security, ConfigMap checksum annotation"}
              </li>
              <li>
                {"RDS connection exhaustion: datasource 설정 누락처럼 보이는 오류를 DB metadata 조회 실패와 MySQL "}
                <code className="text-[0.95em] font-medium text-black">
                  {"Too many connections"}
                </code>
                {" 문제로 재해석하고, service별 Hikari pool size와 minimum idle 값을 dev RDS 용량에 맞게 줄였습니다. 주요 기술: RDS MySQL, HikariCP, Spring Boot, Pod logs, DB connection metric"}
              </li>
              <li>
                {"Node capacity / IP / memory 부족: Pod Pending을 단순 배포 실패로 보지 않고 scheduler event, AWS CNI IP 할당, nodegroup max size, JVM memory request를 함께 확인해 capacity 문제로 분류했습니다. 주요 기술: EKS Managed Node Group, Cluster Autoscaler, AWS VPC CNI, Kubernetes Scheduler, JVM memory option"}
              </li>
              <li>
                {"NotReady node와 stuck Pod 정리: NotReady node 위에 남은 Terminating Pod와 잔여 DB connection 가능성을 보고, force delete, ASG instance terminate, lifecycle action complete 절차를 정리했습니다. 주요 기술: Kubernetes Pod lifecycle, EC2 Auto Scaling Group, Managed Node Group"}
              </li>
              <li>
                {"Grafana/Loki PVC Multi-Attach: Pod event만 보지 않고 AWS EBS attachment 상태와 Kubernetes VolumeAttachment object를 함께 확인해 stale attachment를 정리했습니다. 주요 기술: EBS CSI, PersistentVolumeClaim, VolumeAttachment, Grafana, Loki"}
              </li>
              <li>
                {"place-service CSV import file missing: 마지막에 남은 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"CrashLoopBackOff"}
                </code>
                {"를 인프라/GitOps 문제가 아니라 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"/data/import/places.csv"}
                </code>
                {" runtime file dependency 문제로 분리하고, ConfigMap/PVC/image packaging 또는 Job/migration 분리 방안을 정리했습니다. 주요 기술: Spring Boot CommandLineRunner, Kubernetes Volume, ConfigMap, Job"}
              </li>
              <li>
                {"Dev teardown과 state 복구: 비용 절감을 위한 teardown 중 ECR "}
                <code className="text-[0.95em] font-medium text-black">
                  {"RepositoryNotEmptyException"}
                </code>
                {", Argo CD finalizer, "}
                <code className="text-[0.95em] font-medium text-black">
                  {"errored.tfstate"}
                </code>
                {" 문제를 분리하고, container-registry state sync, reverse-order destroy, "}
                <code className="text-[0.95em] font-medium text-black">
                  {"terraform state push"}
                </code>
                {" 복구 절차를 정리했습니다. 주요 기술: Terraform destroy, ECR, Argo CD finalizer, Terraform state lock, errored.tfstate"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"V3 결과와 성과"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"dev 환경 기준으로 AWS EKS 기반 MSA 플랫폼의 주요 블록을 Terraform stack 단위로 분리했습니다."}
              </li>
              <li>
                {"frontend는 GitOps 기반으로 public HTTPS endpoint까지 연결했습니다."}
              </li>
              <li>
                {"backend 11개 microservice image를 ECR에 push하고 GitOps image tag 갱신 흐름을 구성했습니다."}
              </li>
              <li>
                {"Argo CD App of Apps 구조로 frontend, backend, monitoring, logging, observability application을 관리했습니다."}
              </li>
              <li>
                {"Grafana, Prometheus, Loki, Alloy를 구성하고 PVC stale attachment 문제까지 운영 관점에서 해결했습니다."}
              </li>
              <li>
                {"Loki access log 기반 API traffic dashboard를 구성해 요청 수, status code, method, path를 확인할 수 있게 했습니다."}
              </li>
              <li>
                {"dev 비용 통제를 위한 teardown 순서와 ECR force delete/state sync 전략을 정리했습니다."}
              </li>
              <li>
                {"AWS Secrets Manager, Kubernetes Secret, GitHub Secrets, public config의 관리 경계를 inventory로 정리했습니다."}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"남은 개선 방향"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"Terraform output을 GitOps values로 자동 동기화해 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"DB_URL"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"REDIS_HOST"}
                </code>
                {", RDS Secret ARN drift를 줄일 필요가 있습니다."}
              </li>
              <li>
                {"frontend "}
                <code className="text-[0.95em] font-medium text-black">
                  {"AUTH_SECRET"}
                </code>
                {"과 backend OAuth/JWT/mail/S3/external API secret은 AWS Secrets Manager와 ExternalSecret 기반으로 더 일관되게 분리해야 합니다."}
              </li>
              <li>
                {"Spring Boot "}
                <code className="text-[0.95em] font-medium text-black">
                  {"/actuator/prometheus"}
                </code>
                {" 인증 정책을 정리해 application metric 기반 dashboard로 확장할 수 있습니다."}
              </li>
              <li>
                {"dev RDS connection 한계 대응을 위해 RDS Proxy 또는 service별 connection pool policy를 더 정교화할 필요가 있습니다."}
              </li>
              <li>
                {"Karpenter, VPC CNI prefix delegation 등을 검토해 MSA workload capacity 운영을 고도화할 수 있습니다."}
              </li>
            </ul>
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"04. TLS 인증서 만료로 인한 앱 인증 장애 분석"}
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"도봉라이프 앱에서 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 동시에 실패한 장애를 분석했습니다. 서버 프로세스는 살아 있었지만 신규 요청이 백엔드 로그와 Nginx access log에 남지 않았고, 최종 원인은 "}
              <code className="text-[0.95em] font-medium text-black">
                {"api.dobonglife.co.kr"}
              </code>
              {"의 Let's Encrypt TLS 인증서 만료였습니다."}
            </p>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"장애 영향과 초기 증상"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"영향 범위: API 호출이 필요한 인증 기능 전반이 실패했습니다. 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 모두 영향을 받았습니다."}
              </li>
              <li>
                {"사용자 관점: 앱에는 네트워크 연결 상태가 원활하지 않다는 형태의 오류가 표시되어, 사용자는 계정 문제인지 소셜 로그인 문제인지 서버 문제인지 구분하기 어려웠습니다."}
              </li>
              <li>
                {"운영 관점: 서버 프로세스는 정상적으로 떠 있었지만 새 요청을 보내도 애플리케이션 로그와 Nginx access log에 요청이 남지 않았습니다."}
              </li>
              <li>
                {"판단 포인트: 특정 API의 비즈니스 로직 오류가 아니라 API 도메인, DNS, TCP 연결, TLS 인증서처럼 모든 인증 기능이 공유하는 네트워크 계층 문제를 우선 의심했습니다."}
              </li>
              <li>
                {"주요 기술: Nginx, Spring Boot, TLS, HTTPS, DNS, SNI, access log, application log"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"원인 분석 흐름"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"공통 기능 동시 실패: 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증은 모두 API 서버와 통신해야 하므로 API 도메인의 HTTPS 연결 자체가 실패하면 함께 중단됩니다."}
              </li>
              <li>
                {"access log 부재 해석: HTTP 요청은 TLS 핸드셰이크와 인증서 검증 이후에 전송됩니다. 인증서가 만료되어 클라이언트가 연결을 중단하면 Nginx와 백엔드에는 path, method, header, body가 전달되지 않습니다."}
              </li>
              <li>
                {"서버 시간 확인: 서버 시간이 크게 틀어져 있으면 유효한 인증서도 만료된 것처럼 보일 수 있으므로 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"date"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"timedatectl"}
                </code>
                {"로 UTC 시간과 NTP 동기화 상태를 먼저 확인했습니다."}
              </li>
              <li>
                {"인증서 확인: "}
                <code className="text-[0.95em] font-medium text-black">
                  {"openssl s_client -connect api.dobonglife.co.kr:443 -servername api.dobonglife.co.kr"}
                </code>
                {"로 SNI를 지정해 실제 앱이 보는 인증서를 확인했고, "}
                <code className="text-[0.95em] font-medium text-black">
                  {"certificate has expired"}
                </code>
                {"와 만료 시각을 확인했습니다."}
              </li>
              <li>
                {"로컬 Certbot 상태 확인: "}
                <code className="text-[0.95em] font-medium text-black">
                  {"sudo certbot certificates"}
                </code>
                {"로 Certbot이 관리하는 로컬 인증서도 같은 만료일과 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"INVALID: EXPIRED"}
                </code>
                {" 상태를 가리키는지 확인했습니다."}
              </li>
              <li>
                {"주요 기술: "}
                <code className="text-[0.95em] font-medium text-black">
                  {"openssl s_client"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"openssl x509"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"timedatectl"}
                </code>
                {", Certbot, Let's Encrypt, TLS certificate, SNI"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"직접 원인"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                <code className="text-[0.95em] font-medium text-black">
                  {"api.dobonglife.co.kr"}
                </code>
                {"의 Let's Encrypt 인증서가 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"2026-05-13 23:55:25 UTC"}
                </code>
                {"에 만료되어 있었습니다."}
              </li>
              <li>
                {"한국 시간으로는 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"2026-05-14 08:55:25 KST"}
                </code>
                {"이며, 장애가 확인된 날짜와 일치했습니다."}
              </li>
              <li>
                {"인증서 만료로 클라이언트가 HTTPS 연결을 신뢰하지 못했고, HTTP 요청이 Nginx와 백엔드 애플리케이션까지 도달하지 못했습니다."}
              </li>
              <li>
                {"주요 기술: Let's Encrypt, TLS verification, HTTPS client validation, Nginx SSL termination"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"Certbot 갱신 실패 원인"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                <code className="text-[0.95em] font-medium text-black">
                  {"sudo certbot renew"}
                </code>
                {" 첫 시도는 80번 포트를 열 수 없다는 오류로 실패했습니다."}
              </li>
              <li>
                {"기존 갱신 설정이 standalone authenticator를 사용하고 있었기 때문에 Certbot이 HTTP-01 challenge 응답을 위해 80번 포트를 직접 점유해야 했습니다."}
              </li>
              <li>
                {"운영 서버에서는 Nginx가 이미 80번 포트를 사용하고 있었으므로 자동 갱신도 같은 이유로 실패했을 가능성이 높다고 판단했습니다."}
              </li>
              <li>
                {"긴급 복구는 Nginx를 일시 중단하고 Certbot을 실행해 처리할 수 있었지만, 이 방식은 갱신 때마다 서비스 중단 가능성을 만들기 때문에 운영 자동화 방식으로는 적합하지 않다고 정리했습니다."}
              </li>
              <li>
                {"주요 기술: Certbot standalone authenticator, HTTP-01 challenge, Nginx, port 80, Let's Encrypt renewal"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"복구와 검증"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"Certbot으로 인증서를 갱신한 뒤 로컬 인증서 만료일이 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"2026-08-12 04:08:03 UTC"}
                </code>
                {"로 연장된 것을 확인했습니다."}
              </li>
              <li>
                {"로컬 파일만 확인하지 않고, 443 포트에서 Nginx가 실제로 제공하는 인증서도 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"openssl s_client"}
                </code>
                {"와 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"openssl x509 -noout -dates"}
                </code>
                {"로 다시 확인했습니다."}
              </li>
              <li>
                {"이중 확인을 통해 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"/etc/letsencrypt/live/..."}
                </code>
                {" 인증서 파일이 갱신되었고, Nginx가 클라이언트에게 새 인증서를 제공하고 있음을 검증했습니다."}
              </li>
              <li>
                {"이후 앱에서 API 호출이 다시 성공하는지 확인해 사용자 영향 복구까지 판단할 수 있도록 정리했습니다."}
              </li>
              <li>
                {"주요 기술: Certbot, Nginx reload, "}
                <code className="text-[0.95em] font-medium text-black">
                  {"openssl x509 -noout -dates"}
                </code>
                {", external certificate verification"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"webroot 방식으로 전환한 이유"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"standalone 방식은 Certbot이 80번 포트를 직접 점유해야 하므로 Nginx가 상시 실행 중인 운영 서버와 충돌할 수 있습니다."}
              </li>
              <li>
                {"webroot 방식은 Certbot이 검증 파일을 지정된 디렉터리에 쓰고, Nginx가 기존 80번 포트로 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"/.well-known/acme-challenge/"}
                </code>
                {" 경로를 서빙하는 방식입니다."}
              </li>
              <li>
                {"이 구조에서는 인증서 갱신을 위해 Nginx를 멈출 필요가 없고, 자동 갱신에도 더 적합합니다."}
              </li>
              <li>
                {"renewal 설정에는 authenticator뿐 아니라 webroot path가 함께 남아야 하므로, 운영에서는 수동 편집보다 Certbot 명령과 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"--dry-run"}
                </code>
                {"으로 다음 갱신 경로까지 검증하는 것이 안전하다고 정리했습니다."}
              </li>
              <li>
                {"주요 기술: Certbot webroot authenticator, Nginx server block, "}
                <code className="text-[0.95em] font-medium text-black">
                  {"/.well-known/acme-challenge/"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"certbot renew --dry-run"}
                </code>
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"재발 방지 체크리스트"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"자동 갱신 스케줄 확인: "}
                <code className="text-[0.95em] font-medium text-black">
                  {"systemctl list-timers"}
                </code>
                {", "}
                <code className="text-[0.95em] font-medium text-black">
                  {"systemctl status certbot.timer"}
                </code>
                {", cron 설정을 확인해 Certbot이 실제로 주기 실행되는지 점검합니다."}
              </li>
              <li>
                {"dry-run 검증: Nginx 설정, 보안 그룹, 웹루트 변경 이후 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"sudo certbot renew --dry-run"}
                </code>
                {"으로 갱신 경로를 검증합니다."}
              </li>
              <li>
                {"challenge 경로 확인: "}
                <code className="text-[0.95em] font-medium text-black">
                  {"http://api.dobonglife.co.kr/.well-known/acme-challenge/..."}
                </code>
                {" 경로가 80번 포트에서 막히지 않는지 확인합니다."}
              </li>
              <li>
                {"reload 자동화: 인증서 갱신 후 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"nginx -t"}
                </code>
                {"와 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"systemctl reload nginx"}
                </code>
                {"가 실행되도록 deploy hook 또는 운영 절차를 둡니다."}
              </li>
              <li>
                {"외부 관측: 서버 내부 파일 상태만 보지 않고 외부에서 443 포트로 접속했을 때 제공되는 인증서의 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"notAfter"}
                </code>
                {"를 주기적으로 확인합니다."}
              </li>
              <li>
                {"만료 알림: Let's Encrypt 인증서는 유효기간이 짧기 때문에 만료 30일, 14일, 7일, 3일 전처럼 단계별 알림을 두는 것이 안전합니다."}
              </li>
              <li>
                {"주요 기술: systemd timer, cron, Certbot deploy hook, Nginx reload, OpenSSL, TLS expiration monitoring"}
              </li>
            </ul>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"포트폴리오에서 강조할 점"}
            </h4>
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"서버가 살아 있다는 사실과 사용자 요청이 서버까지 도달한다는 사실을 분리해서 판단했습니다."}
              </li>
              <li>
                {"백엔드 로그와 Nginx access log가 모두 비어 있는 상황을 애플리케이션 내부 오류가 아니라 HTTP 이전 계층의 문제로 해석했습니다."}
              </li>
              <li>
                {"DNS와 서버 문제를 구분할 때 단순 IP 접속 대신 "}
                <code className="text-[0.95em] font-medium text-black">
                  {"curl --resolve"}
                </code>
                {"처럼 Host와 SNI를 유지하는 방식이 필요하다는 점을 정리했습니다."}
              </li>
              <li>
                {"긴급 복구와 재발 방지 자동화를 분리해, 단기 갱신 이후 webroot, dry-run, reload hook, 만료일 모니터링까지 운영 개선 방향으로 연결했습니다."}
              </li>
              <li>
                {"주요 기술: DNS, SNI, TLS handshake, Certbot, Nginx, OpenSSL, "}
                <code className="text-[0.95em] font-medium text-black">
                  {"curl --resolve"}
                </code>
              </li>
            </ul>
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
