export const metadata = {
  title: "Dobong Life | Lim Woojin Portfolio",
  description: "Dobong Life 소개 페이지",
} as const;

const affiliation = "(주)유머스트알엔디";
const position = "사업부 IT팀";
const period = "2026.04-current";
const role = ["DevOps Engineer", "Cloud Engineer"] as const;
const title = "도봉라이프(DobongLife)";
const subtitle = "AWS 인프라 구축 및 운영";
const description = "서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 구축하고 운영한 프로젝트";
const mainSummary = [
  "단일 EC2 기반 아키텍처(V1)를 역할 기반 AWS 인프라(V2)와 EKS 기반 MSA 플랫폼(V3)으로 확장 설계",
  "Terraform 기반 IaC를 적용하여 AWS 인프라를 코드로 관리하고, 스택 분리를 통해 재현성과 변경 추적성 확보",
  "GitHub Actions, OIDC, SSM, Argo CD 기반 GitOps CI/CD 파이프라인 구축",
  "AWS Secrets Manager를 활용한 Secret 관리 및 주입 체계 구축",
  "HPA, Auto Scaling을 활용한 AWS 인프라의 확장성 및 가용성 확보",
  "Grafana, Prometheus를 활용한 모니터링 시스템 구축",
  "TLS 인증서 갱신 실패 운영 장애 대응",
] as const;
const resumeSummary = [
  "단일 EC2 기반 아키텍처(V1)를 역할 기반 AWS 인프라(V2)와 EKS 기반 MSA 플랫폼(V3)으로 확장 설계",
  "Terraform 기반 IaC를 적용하여 AWS 인프라를 코드로 관리하고, 스택 분리를 통해 재현성과 변경 추적성 확보",
  "GitHub Actions, OIDC, SSM, Argo CD 기반 GitOps CI/CD 파이프라인 구축, TLS 인증서 갱신 실패 운영 장애 대응",
  "Grafana, Prometheus를 활용한 모니터링 시스템 구축, AWS Secrets Manager를 활용한 Secret 관리 및 주입 체계 구축",
] as const;
const skillSummary = [
  { name: "AWS", primary: true },
  { name: "Terraform", primary: true },
  { name: "Kubernetes", primary: true },
  { name: "Prometheus", primary: true },
  { name: "Grafana", primary: true },
  { name: "GitHub Actions", primary: false },
] as const;

export const resumeProjectSummary = {
  title: title + " - " + subtitle,
  affiliation: affiliation,
  position: position,
  period: period,
  description: description,
  summary: resumeSummary,
} as const;

export const projectSummary = {
  link: "/projects/dobonglife/",
  title: title + " - " + subtitle,
  affiliation: affiliation,
  position: position,
  period: period,
  image: {
    src: "/projects/dobonglife/dobonglife-aws-infra-v3.jpg",
    alt: "도봉라이프 AWS 인프라 대표 이미지",
    width: 5333,
    height: 2999,
  },
  summary: mainSummary,
  techStack: skillSummary,
} as const;

export const sectionLinks = [
  { id: "overview", label: "프로젝트 개요" },
  { id: "role", label: "역할" },
  { id: "skills", label: "기술 스택" },
  { id: "legacy-upgrade", label: "AWS 인프라 및 CI/CD 방식 개선 (V1, V2, V3)" },
  { id: "terraform-gitops", label: "Terraform 기반 IaC와 GitOps 운영 구조 구축" },
  { id: "secret-variables", label: "Secret 저장 위치와 주입 흐름 분리" },
  { id: "availability-scaling", label: "가용성 및 자동 확장 구성" },
  { id: "monitoring", label: "모니터링 구성" },
  { id: "tls-troubleshooting", label: "V1 환경 API 서버 운영 장애 대응: TLS 인증서 갱신 실패" },
  { id: "retrospective", label: "프로젝트 회고" },
] as const;

export const hero = {
  eyebrow: "Project No.1",
  title: title,
  description: description,
  period: period,
  affiliation: affiliation,
  position: position,
  role: role,
} as const;

export const overviewSection = {
  id: "overview",
  title: "프로젝트 개요",
  paragraphs: [
    "도봉라이프 애플리케이션의 AWS 인프라 아키텍처를 설계하고 구축했으며, 배포 파이프라인과 모니터링 환경을 구성해 운영하고 있습니다. 도봉라이프는 서울특별시 도봉구의 지역상권 활성화 애플리케이션으로 스토리텔링 기반 여행 코스, 맛집 정보, 지역 소상공인 연계 할인 쿠폰 발행 및 사용 기능을 제공하며, 현재 플레이스토어와 앱스토어에 출시되어 다운로드 가능합니다.",
  ],
} as const;

export const roleSection = {
  id: "role",
  title: "역할",
  bullets: [
    "단일 EC2 기반 아키텍처(V1)를 역할 기반 AWS 인프라(V2)와 EKS 기반 MSA 플랫폼(V3)으로 확장 설계",
    "Terraform 기반 IaC를 적용하여 AWS 인프라를 코드로 관리하고, 스택 분리를 통해 재현성과 변경 추적성 확보",
    "GitHub Actions, OIDC, SSM, Argo CD 기반 GitOps CI/CD 파이프라인 구축",
    "AWS Secrets Manager, External Secrets Operator, Kubernetes Secret을 활용한 Secret 관리 및 주입 체계 구축",
  ],
} as const;

export const skillsSection = {
  id: "skills",
  title: "기술 스택",
  emphasized: ["AWS", "Terraform", "Kubernetes", "Prometheus", "Grafana"],
  items: [
    "EKS",
    "Argo CD",
    "GitOps",
    "GitHub Actions",
    "Docker",
    "AWS Secrets Manager",
    "Loki",
    "Alloy",
    "Nginx",
  ],
} as const;

export const sections = [
  {
    id: "legacy-upgrade",
    title: "AWS 인프라 및 CI/CD 방식 개선 (V1, V2, V3)",
    subsections: [
      {
        title: "기존 레거시 인프라 구조 (V1)",
        paragraphs: [
          "기존 인프라는 단일 EC2에서 Nginx, Spring Boot, Redis를 함께 운영하는 구조였습니다. 배포 파이프라인의 경우 GitHub Actions에서 Docker 이미지를 빌드한 뒤 Docker Hub에 업로드하고, EC2에 SSH로 접속해 이미지를 내려받아 컨테이너를 갱신하는 방식이었습니다.",
        ],
        figures: [
          {
            src: "/projects/dobonglife/dobonglife-aws-infra-v1.jpg",
            alt: "도봉라이프 V1 아키텍처 다이어그램",
            width: 5800,
            height: 2758,
            caption: "레거시 인프라 아키텍처",
          },
          {
            src: "/projects/dobonglife/dobonglife-ci-cd-v1.jpg",
            alt: "도봉라이프 V1 CI/CD 아키텍처 다이어그램",
            width: 4598,
            height: 3479,
            caption: "레거시 인프라 CI/CD 파이프라인",
          },
        ],
      },
      {
        title: "역할 기반 인프라 구조로 전환 (V2)",
        paragraphs: [
          "프론트 서버를 별도로 배포해야 해 기존 인프라를 역할 기반 아키텍처로 분리하고 확장하였습니다. 이에 따라 Nginx, Backend, Frontend 서버를 역할별 EC2로 분리하고, 외부 접근 영역과 내부 서비스 영역을 Public/Private Subnet으로 나누었습니다. Redis는 ElastiCache로 분리해 애플리케이션 서버와 상태 저장 계층의 책임을 나누었고, Amazon CloudWatch를 활용해 EC2 로그 수집 및 애플리케이션 로그 확인 환경을 구축했습니다.",
        ],
        figures: [
          {
            src: "/projects/dobonglife/dobonglife-aws-infra-v2.jpg",
            alt: "도봉라이프 V2 AWS 인프라 아키텍처 다이어그램",
            width: 5333,
            height: 2999,
            caption: "역할 기반 AWS 인프라 구성",
          },
        ],
      },
      {
        title: "GitHub Actions, OIDC, SSM을 활용한 CI/CD 파이프라인 구축 (V2)",
        paragraphs: [
          "서버에 직접 SSH로 접속해 배포하고 환경 변수를 관리하던 방식을 줄이고, 기존 SSH 22번 포트 기반 접근을 제거했습니다. AWS Systems Manager로 인스턴스 접근 방식을 전환하고, GitHub Actions와 OIDC 기반 권한 위임을 사용해 CD 파이프라인을 재구성했습니다.",
        ],
        figures: [
          {
            src: "/projects/dobonglife/dobonglife-ci-cd-v2.jpg",
            alt: "도봉라이프 V2 CI/CD 아키텍처 다이어그램",
            width: 5756,
            height: 2779,
            caption: "GitHub Actions, OIDC, SSM을 활용한 V2 CI/CD 파이프라인",
          },
        ],
      },
      {
        id: "eks-platform",
        title: "마이크로 서비스 전환을 위한 EKS 환경 구축 (V3)",
        paragraphs: [
          "백엔드 서비스의 MSA 아키텍처 전환과 트래픽 증가에 대비해 기존 서버 배포 방식을 AWS EKS 기반 구조로 확장했습니다. 전체 구조는 외부 진입, 애플리케이션 실행, 데이터 저장 계층을 분리하는 방식으로 설계했습니다. Public Subnet은 ALB를 통한 외부 요청 진입점으로 두고, Private Subnet 내부에는 EKS 애플리케이션 노드와 RDS/Redis 데이터 계층을 나누어 배치해 서비스 트래픽과 데이터 접근 경계를 분리했습니다.",
        ],
        figures: [
          {
            src: "/projects/dobonglife/dobonglife-aws-infra-v3.jpg",
            alt: "도봉라이프 V3 EKS 플랫폼 아키텍처 다이어그램",
            width: 4175,
            height: 3831,
            caption: "V3 EKS 플랫폼 아키텍처",
          },
        ],
      },
      {
        id: "eks-cicd",
        title: "Argo CD와 GitOps 기반 EKS 배포 파이프라인 구축 (V3)",
        paragraphs: [
          "Argo CD를 사용해 이미지 빌드와 클러스터 배포 책임을 분리하는 방식으로 구성했습니다. GitHub Actions는 서비스 소스 변경 시 Docker 이미지를 빌드해 Amazon ECR에 업로드하고, GitOps 저장소의 Helm values 이미지 태그만 갱신하도록 했습니다. GitHub webhook은 GitOps 저장소 변경 이벤트를 Argo CD로 전달해 변경 감지 지연을 줄이도록 연결했으며, 이후 Argo CD에서 GitOps 저장소 변경을 기준으로 EKS에 동기화했습니다.",
        ],
        figures: [
          {
            src: "/projects/dobonglife/dobonglife-ci-cd-v3.jpg",
            alt: "도봉라이프 V3 GitOps 기반 CI/CD 파이프라인 다이어그램",
            width: 4995,
            height: 3202,
            caption: "Argo CD와 GitOps 기반 V3 배포 파이프라인",
          },
        ],
      },
    ],
  },
  {
    id: "terraform-gitops",
    title: "Terraform 기반 IaC와 GitOps 운영 구조 구축",
    paragraphs: [
      "Terraform 기반 IaC로 AWS 인프라를 코드화하여 인프라 재현성과 변경 추적성을 높였습니다. Terraform은 인프라 리소스의 목표 상태를 정의하고 생성·변경을 적용하고, 리소스 성격과 변경 범위에 따라 스택을 분리했습니다. GitOps 저장소는 Kubernetes 애플리케이션의 배포 상태를 관리하고, Argo CD는 해당 변경을 감지해 EKS 클러스터에 동기화하도록 했습니다.",
    ],
    figures: [
      {
        src: "/projects/dobonglife/dobonglife-terraform-gitops-structure.jpg",
        alt: "Terraform IaC 스택 분리와 GitOps, Argo CD, EKS 역할 분리 다이어그램",
        width: 1693,
        height: 929,
        caption: "Terraform IaC 스택 분리와 GitOps 운영 구조",
      },
    ],
  },
  {
    id: "secret-variables",
    title: "Secret 저장 위치와 주입 흐름 분리",
    paragraphs: [
      "민감값은 Terraform 코드나 GitOps 저장소에 직접 두지 않고 AWS Secrets Manager에 저장해, 저장 위치와 참조 방식을 분리했습니다. 인프라 계층은 secret 값 자체가 아니라 필요한 참조 정보만 전달하고, 애플리케이션은 Kubernetes Secret으로 동기화된 값을 환경 변수로 사용하도록 구성했습니다.",
    ],
  },
  {
    id: "availability-scaling",
    title: "가용성 및 자동 확장 구성",
    paragraphs: [
      "서비스 부하와 Pod 배치 상태에 대응할 수 있도록 HPA와 Cluster Autoscaler를 함께 구성했습니다. HPA는 서비스별 부하에 따라 Pod replica 수를 조정하고, Cluster Autoscaler는 Pending Pod가 발생했을 때 Managed Node Group을 확장할 수 있도록 구성했습니다.",
    ],
  },
  {
    id: "monitoring",
    title: "모니터링 구성",
    paragraphs: [
      "메트릭 흐름은 Prometheus가 클러스터와 워크로드 지표를 수집하고, Grafana에서 Pod 상태, 리소스 사용량, HPA 동작을 확인하는 구조로 구성했습니다. API 지표는 요청 수, 5xx 발생량, request rate, method/status/path별 호출량을 중심으로 확인하도록 정리했습니다.",
      "로그 흐름은 Grafana Alloy가 워크로드와 API 로그를 수집하고 Loki에 저장한 뒤, Grafana에서 메트릭과 로그를 함께 조회하는 방식으로 구성했습니다. 이를 통해 Pod 상태나 API 오류가 발생했을 때 관련 로그를 같은 관측 화면에서 함께 확인할 수 있도록 했습니다.",
    ],
    figures: [
      {
        src: "/projects/dobonglife/dobonglife-grafana-operations-overview.png",
        alt: "도봉라이프 Grafana 운영 상태 모니터링 대시보드",
        width: 1905,
        height: 1080,
        caption: "Grafana 클러스터 운영 상태 모니터링 화면",
      },
      {
        src: "/projects/dobonglife/dobonglife-grafana-api-traffic-logs.png",
        alt: "도봉라이프 Grafana API 트래픽 및 로그 모니터링 대시보드",
        width: 1905,
        height: 1080,
        caption: "Grafana API 트래픽 및 Gateway access log 모니터링 화면",
      },
    ],
  },
  {
    id: "tls-troubleshooting",
    title: "V1 환경 API 서버 운영 장애 대응: TLS 인증서 갱신 실패",
    subsections: [
      {
        title: "장애 상황",
        paragraphs: [
          "프론트엔드 동료로부터 앱 로그인이 되지 않는다는 제보를 받고 V1 환경의 API 서버 장애를 확인했습니다. 확인 결과 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증처럼 API 호출이 필요한 인증 기능 전반이 실패했고, 앱에는 네트워크 연결 상태가 원활하지 않습니다 오류가 표시되었습니다.",
        ],
      },
      {
        title: "원인 확인",
        paragraphs: [
          "먼저 서버에 접속해 애플리케이션 프로세스를 확인했습니다. 새로운 요청을 시도했지만, 백엔드 로그와 Nginx access log에 신규 접속 로그가 남지 않았습니다. 이를 통해 요청이 애플리케이션까지 도달하지 못한다는 것을 확인하였습니다.",
          "초기에 DNS 문제를 의심하여 도메인 접속과 서버 IP 직접 접속을 비교하려 했지만, 도메인 접속 단계에서 인증서 만료 오류가 확인되었습니다. 이후 openssl 명령어로 인증서 정보를 확인했고, 인증서 만료로 장애가 발생했다는 것을 확인하였습니다.",
        ],
      },
      {
        title: "조치 및 재발 방지",
        paragraphs: [
          "이후 인증서 갱신을 위해 certbot renew를 시도하였으나, Nginx가 이미 80번 포트를 점유하고 있어 실패했습니다. 긴급 복구를 위해 Nginx를 일시 중단한 뒤 인증서를 갱신했고, 갱신 후 Certbot 상태와 외부에서 제공되는 인증서 만료일을 다시 확인했습니다. 재발 방지를 위해 기존 renewal 설정의 authenticator 항목을 standalone에서 webroot로 변경했습니다.",
        ],
      },
    ],
  },
  {
    id: "retrospective",
    title: "프로젝트 회고",
    paragraphs: [
      "사수 없이 인프라 전반을 단독으로 구축하며 부족한 부분과 시행착오도 많았지만, 그만큼 직접 부딪히며 많이 성장할 수 있었던 프로젝트입니다. 서비스 전체를 AWS 환경에 직접 올리고 배포하면서, 인프라가 어떻게 연결되고 실제 트래픽이 어떤 흐름으로 처리되는지 이해할 수 있었습니다. 특히 도메인 요청이 어떤 라우팅을 거쳐 서버까지 도달하는지, 포트 설정에 따라 요청 흐름이 어떻게 달라지는지 직접 확인하는 과정이 가장 재밌었습니다. 또한 Terraform을 사용해보면서 기존에 GUI를 통해 설정했을 때에는 알지 못했던 인프라의 전체 구조와 흐름을 더 쉽게 이해할 수 있었습니다.",
    ],
  },
] as const;
