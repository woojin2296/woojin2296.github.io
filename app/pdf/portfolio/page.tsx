import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BodyText, PDFContact, PdfDocument, PdfPage, PdfSection, PDFSectionTitle, PDFSkillStack } from "../_components/pdf-elements";
import { otherProjects } from "@/content/other-projects";
import {
  about,
  awards,
  contact,
  education,
  language,
  military,
  profile,
  publication,
  skills,
} from "@/content/data";

export const metadata: Metadata = {
  title: "Woojin Lim Portfolio PDF",
  description: "PDF 변환용 임우진 포트폴리오",
};

const publicationExperienceBullet = "KCC2025 학부생 논문 제출";

const portfolioExperiences = [
  {
    title: "(주)유머스트알엔디",
    meta: "계약직 사원 / 인턴 사원 · 2026.04 ~ Current / 2025.09 ~ 2026.02",
    bullets: [
      "2026.04 ~ Current 계약직 사원: 도봉라이프 AWS 인프라 아키텍처 설계 및 구축, 배포 파이프라인과 모니터링 환경 구성, 회사 ERP 시스템 백엔드 개발 및 운영",
      "2025.09 ~ 2026.02 인턴 사원: X-ray 치료기기 GUI 개발 참여",
    ],
  },
  {
    title: "UBICOMP LAB",
    meta: "학부연구생 · 2024.01 ~ 2026.02",
    bullets: [
      "판옵티콘 데이터 수집 관제 시스템 개발",
      "ROS 기반 PCD 수집 및 시각화 실험 참여",
      publicationExperienceBullet,
    ],
  },
] as const;

const portfolioAdditionalExperiences = [
  "순천향대학교 수업 조교 6회: IoT 플랫폼, 임베디드 시스템, 나만의 게임만들기, 웹페이지 제작의 실제",
  "해커톤 참여 3회: 2024 캡스톤디자인 및 AI 해커톤, 2025 캡스톤디자인 및 AI 해커톤, 2025 대한민국 해커톤",
  "멘토링 프로그램 2회: 2024 순천향 AI·SW 창의한마당, 2025 SW 학습멘토링",
] as const;

export default function PortfolioPdfPage() {
  return (
    <PdfDocument>
      <PdfPage>
        <header>
          <p className="text-[13px] uppercase tracking-[0.22em] text-[#737373]">
            Portfolio 2026
          </p>
          <h1 className="mt-3 text-[36px] font-semibold leading-none tracking-normal text-black">
            {profile.displayName}
          </h1>
        </header>

        <PdfSection className="grid gap-8">
          {about.map((section) => (
            <article key={section.title}>
              <PDFSectionTitle>{section.title}</PDFSectionTitle>
              <BodyText>
                {section.body}
              </BodyText>
            </article>
          ))}
        </PdfSection>

        <PdfSection>
          <PDFSectionTitle>연락처</PDFSectionTitle>
          <PDFContact items={
            contact.filter((item) =>
              ["phone", "email", "blog", "github"].includes(item.type),
            )
          } />
        </PdfSection>

        <PdfSection>
          <PDFSectionTitle>기술 스택</PDFSectionTitle>
          <PDFSkillStack items={skills} />
        </PdfSection>
      </PdfPage>

      <PdfPage>
        <ProjectTitle
          eyebrow="Project No.1"
          title="도봉라이프(DobongLife)"
          description="서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 구축하고 운영한 프로젝트"
          meta={[
            "Period · 2026.04 ~ current",
            "Position · (주)유머스트알엔디 / 인턴 사원",
            "Role · DevOps Engineer",
          ]}
        />
        <DetailSection title="프로젝트 개요">
          <DetailText>
            도봉라이프 애플리케이션의 AWS 인프라 아키텍처를 설계하고
            구축했으며, 배포 파이프라인과 모니터링 환경을 구성해 운영하고
            있습니다. 도봉라이프는 서울특별시 도봉구의 지역상권 활성화
            애플리케이션으로 스토리텔링 기반 여행 코스, 맛집 정보, 지역
            소상공인 연계 할인 쿠폰 발행 및 사용 기능을 제공하며, 현재
            플레이스토어와 앱스토어에 출시되어 다운로드 가능합니다.
          </DetailText>
        </DetailSection>
        <DetailSection title="역할">
          <DetailBullets
            items={[
              "단일 EC2 기반 아키텍처(V1)를 역할 기반 AWS 인프라(V2)와 EKS 기반 MSA 플랫폼(V3)으로 확장 설계",
              "Terraform 기반 IaC를 적용하여 AWS 인프라를 코드로 관리하고, 스택 분리를 통해 재현성과 변경 추적성 확보",
              "GitHub Actions, OIDC, SSM, Argo CD 기반 GitOps CI/CD 파이프라인 구축",
              "AWS Secrets Manager, External Secrets Operator, Kubernetes Secret을 활용한 Secret 관리 및 주입 체계 구축",
            ]}
          />
        </DetailSection>
        <DetailSection title="기술 스택">
          <PillGroup
            items={[
              "AWS",
              "Terraform",
              "Kubernetes",
              "Prometheus",
              "Grafana",
              "EKS",
              "Argo CD",
              "GitOps",
              "GitHub Actions",
              "Docker",
              "AWS Secrets Manager",
              "Loki",
              "Alloy",
              "Nginx",
            ]}
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="도봉라이프(DobongLife)" />
        <DetailSection
          title="AWS 인프라 및 CI/CD 방식 개선 (V1, V2, V3)"
          className="mt-4"
        >
          <SubHeading>기존 레거시 인프라 구조 (V1)</SubHeading>
          <DetailText>
            기존 인프라는 단일 EC2에서 Nginx, Spring Boot, Redis를 함께
            운영하는 구조였습니다. 배포 파이프라인의 경우 GitHub Actions에서
            Docker 이미지를 빌드한 뒤 Docker Hub에 업로드하고, EC2에 SSH로
            접속해 이미지를 내려받아 컨테이너를 갱신하는 방식이었습니다.
          </DetailText>
          <DetailImageGrid
            columns={1}
            images={[
              {
                src: "/projects/dobonglife/dobonglife-aws-infra-v1.jpg",
                alt: "도봉라이프 V1 아키텍처 다이어그램",
                caption: "레거시 인프라 아키텍처",
              },
              {
                src: "/projects/dobonglife/dobonglife-ci-cd-v1.jpg",
                alt: "도봉라이프 V1 CI/CD 아키텍처 다이어그램",
                caption: "레거시 인프라 CI/CD 파이프라인",
              },
            ]}
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="도봉라이프(DobongLife)" />
        <DetailSection title="역할 기반 인프라 구조로 전환 (V2)" className="mt-4" headingLevel="h3">
          <DetailText>
            프론트 서버를 별도로 배포해야 해 기존 인프라를 역할 기반
            아키텍처로 분리하고 확장하였습니다. 이에 따라 Nginx, Backend,
            Frontend 서버를 역할별 EC2로 분리하고, 외부 접근 영역과 내부 서비스
            영역을 Public/Private Subnet으로 나누었습니다. Redis는 ElastiCache로
            분리해 애플리케이션 서버와 상태 저장 계층의 책임을 나누었고,
            Amazon CloudWatch를 활용해 EC2 로그 수집 및 애플리케이션 로그 확인
            환경을 구축했습니다.
          </DetailText>
          <DetailImage
            src="/projects/dobonglife/dobonglife-aws-infra-v2.jpg"
            alt="도봉라이프 V2 AWS 인프라 아키텍처 다이어그램"
            caption="역할 기반 AWS 인프라 구성"
            narrow
          />
        </DetailSection>
        <DetailSection title="GitHub Actions, OIDC, SSM을 활용한 CI/CD 파이프라인 구축 (V2)" className="mt-4" headingLevel="h3">
          <DetailText>
            서버에 직접 SSH로 접속해 배포하고 환경 변수를 관리하던 방식을
            줄이고, 기존 SSH 22번 포트 기반 접근을 제거했습니다. AWS Systems
            Manager로 인스턴스 접근 방식을 전환하고, GitHub Actions와 OIDC 기반
            권한 위임을 사용해 CD 파이프라인을 재구성했습니다.
          </DetailText>
          <DetailImage
            src="/projects/dobonglife/dobonglife-ci-cd-v2.jpg"
            alt="도봉라이프 V2 CI/CD 파이프라인 다이어그램"
            caption="V2 CI/CD 파이프라인"
            narrow
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="도봉라이프(DobongLife)" />
        <DetailSection title="마이크로 서비스 전환을 위한 EKS 환경 구축 (V3)" className="mt-4" headingLevel="h3">
          <DetailText>
            백엔드 서비스의 MSA 아키텍처 전환과 트래픽 증가에 대비해 기존 서버
            배포 방식을 AWS EKS 기반 구조로 확장했습니다. 전체 구조는 외부 진입,
            애플리케이션 실행, 데이터 저장 계층을 분리하는 방식으로 설계했습니다.
            Public Subnet은 ALB를 통한 외부 요청 진입점으로 두고, Private Subnet
            내부에는 EKS 애플리케이션 노드와 RDS/Redis 데이터 계층을 나누어
            배치해 서비스 트래픽과 데이터 접근 경계를 분리했습니다.
          </DetailText>
          <DetailImage
            src="/projects/dobonglife/dobonglife-aws-infra-v3.jpg"
            alt="도봉라이프 V3 EKS 플랫폼 아키텍처 다이어그램"
            caption="V3 EKS 플랫폼 아키텍처"
            narrow
          />
        </DetailSection>
        <DetailSection title="Argo CD와 GitOps 기반 EKS 배포 파이프라인 구축 (V3)" className="mt-4" headingLevel="h3">
          <DetailText>
            Argo CD를 사용해 이미지 빌드와 클러스터 배포 책임을 분리하는
            방식으로 구성했습니다. GitHub Actions는 서비스 소스 변경 시 Docker
            이미지를 빌드해 Amazon ECR에 업로드하고, GitOps 저장소의 Helm
            values 이미지 태그만 갱신하도록 했습니다. GitHub webhook은 GitOps
            저장소 변경 이벤트를 Argo CD로 전달해 변경 감지 지연을 줄이도록
            연결했으며, 이후 Argo CD에서 GitOps 저장소 변경을 기준으로 EKS에
            동기화했습니다.
          </DetailText>
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="도봉라이프(DobongLife)" />
        <DetailSection title="" className="mt-4">
          <DetailImage
            src="/projects/dobonglife/dobonglife-ci-cd-v3.jpg"
            alt="도봉라이프 V3 Argo CD와 GitOps 기반 CI/CD 파이프라인 다이어그램"
            caption="V3 Argo CD와 GitOps 기반 CI/CD 파이프라인"
            narrow
          />
        </DetailSection>
        <DetailSection title="Terraform 기반 IaC와 GitOps 운영 구조 구축" className="mt-12">
          <DetailText>
            Terraform 기반 IaC로 AWS 인프라를 코드화하여 인프라 재현성과 변경
            추적성을 높였습니다. Terraform은 인프라 리소스의 목표 상태를
            정의하고 생성·변경을 적용하고, 리소스 성격과 변경 범위에 따라
            스택을 분리했습니다. GitOps 저장소는 Kubernetes 애플리케이션의 배포
            상태를 관리하고, Argo CD는 해당 변경을 감지해 EKS 클러스터에
            동기화하도록 했습니다.
          </DetailText>
          <DetailImage
            src="/projects/dobonglife/dobonglife-terraform-gitops-structure.jpg"
            alt="Terraform IaC 스택 분리와 GitOps, Argo CD, EKS 역할 분리 다이어그램"
            caption="Terraform IaC 스택 분리와 GitOps 운영 구조"
            narrow
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="도봉라이프(DobongLife)" />
        <DetailSection title="Secret 저장 위치와 주입 흐름 분리" className="mt-4">
          <DetailText>
            민감값은 Terraform 코드나 GitOps 저장소에 직접 두지 않고 AWS Secrets
            Manager에 저장해, 저장 위치와 참조 방식을 분리했습니다. 인프라
            계층은 secret 값 자체가 아니라 필요한 참조 정보만 전달하고,
            애플리케이션은 Kubernetes Secret으로 동기화된 값을 환경 변수로
            사용하도록 구성했습니다.
          </DetailText>
        </DetailSection>
        <DetailSection title="가용성 및 자동 확장 구성" className="mt-12">
          <DetailText>
            서비스 부하와 Pod 배치 상태에 대응할 수 있도록 HPA와 Cluster
            Autoscaler를 함께 구성했습니다. HPA는 서비스별 부하에 따라 Pod
            replica 수를 조정하고, Cluster Autoscaler는 Pending Pod가 발생했을
            때 Managed Node Group을 확장할 수 있도록 구성했습니다.
          </DetailText>
        </DetailSection>
        <DetailSection title="모니터링 구성" className="mt-12">
          <DetailText>
            메트릭 흐름은 Prometheus가 클러스터와 워크로드 지표를 수집하고,
            Grafana에서 Pod 상태, 리소스 사용량, HPA 동작을 확인하는 구조로
            구성했습니다. API 지표는 요청 수, 5xx 발생량, request rate,
            method/status/path별 호출량을 중심으로 확인하도록 정리했습니다.
          </DetailText>
          <DetailText>
            로그 흐름은 Grafana Alloy가 워크로드와 API 로그를 수집하고 Loki에
            저장한 뒤, Grafana에서 메트릭과 로그를 함께 조회하는 방식으로
            구성했습니다. 이를 통해 Pod 상태나 API 오류가 발생했을 때 관련
            로그를 같은 관측 화면에서 함께 확인할 수 있도록 했습니다.
          </DetailText>
          <DetailImageGrid
            images={[
              {
                src: "/projects/dobonglife/dobonglife-grafana-operations-overview.png",
                alt: "도봉라이프 Grafana 운영 상태 모니터링 대시보드",
                caption: "Grafana 클러스터 운영 상태 모니터링 화면",
              },
              {
                src: "/projects/dobonglife/dobonglife-grafana-api-traffic-logs.png",
                alt: "도봉라이프 Grafana API 트래픽 및 로그 모니터링 대시보드",
                caption: "Grafana API 트래픽 및 Gateway access log 모니터링 화면",
              },
            ]}
          />
        </DetailSection>
        <DetailSection title="V1 환경 API 서버 운영 장애 대응: TLS 인증서 갱신 실패" className="mt-12">
          <SubHeading>장애 상황</SubHeading>
          <DetailText>
            프론트엔드 동료로부터 앱 로그인이 되지 않는다는 제보를 받고 V1
            환경의 API 서버 장애를 확인했습니다. 확인 결과 일반 로그인, 카카오
            로그인, 비밀번호 찾기, 이메일 인증처럼 API 호출이 필요한 인증 기능
            전반이 실패했고, 앱에는 네트워크 연결 상태가 원활하지 않습니다
            오류가 표시되었습니다.
          </DetailText>
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="도봉라이프(DobongLife)" />
        <section className="mt-4 grid gap-4">
          <SubHeading>원인 확인</SubHeading>
          <DetailText>
            먼저 서버에 접속해 애플리케이션 프로세스를 확인했습니다. 새로운
            요청을 시도했지만, 백엔드 로그와 Nginx access log에 신규 접속 로그가
            남지 않았습니다. 이를 통해 요청이 애플리케이션까지 도달하지 못한다는
            것을 확인하였습니다.
          </DetailText>
          <DetailText>
            초기에 DNS 문제를 의심하여 도메인 접속과 서버 IP 직접 접속을
            비교하려 했지만, 도메인 접속 단계에서 인증서 만료 오류가
            확인되었습니다. 이후 openssl 명령어로 인증서 정보를 확인했고,
            인증서 만료로 장애가 발생했다는 것을 확인하였습니다.
          </DetailText>
          <SubHeading>조치 및 재발 방지</SubHeading>
          <DetailText>
            이후 인증서 갱신을 위해 certbot renew를 시도하였으나, Nginx가 이미
            80번 포트를 점유하고 있어 실패했습니다. 긴급 복구를 위해 Nginx를
            일시 중단한 뒤 인증서를 갱신했고, 갱신 후 Certbot 상태와 외부에서
            제공되는 인증서 만료일을 다시 확인했습니다. 재발 방지를 위해 기존
            renewal 설정의 authenticator 항목을 standalone에서 webroot로
            변경했습니다.
          </DetailText>
        </section>
        <DetailSection title="프로젝트 회고" className="mt-12">
          <DetailText>
            사수 없이 인프라 전반을 단독으로 구축하며 부족한 부분과 시행착오도
            많았지만, 그만큼 직접 부딪히며 많이 성장할 수 있었던 프로젝트입니다.
            서비스 전체를 AWS 환경에 직접 올리고 배포하면서, 인프라가 어떻게
            연결되고 실제 트래픽이 어떤 흐름으로 처리되는지 이해할 수 있었습니다.
            특히 도메인 요청이 어떤 라우팅을 거쳐 서버까지 도달하는지, 포트
            설정에 따라 요청 흐름이 어떻게 달라지는지 직접 확인하는 과정이 가장
            재밌었습니다. 또한 Terraform을 사용해보면서 기존에 GUI를 통해
            설정했을 때에는 알지 못했던 인프라의 전체 구조와 흐름을 더 쉽게
            이해할 수 있었습니다.
          </DetailText>
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectTitle
          eyebrow="Project No.2"
          title="판옵티콘(Panopticon)"
          description="연구실 실험 데이터 수집 파이프라인 관제 및 이상 알림 시스템 개발"
          meta={[
            "Period · 2024.07 ~ 2026.02 (1년 8개월 - 개발 및 운영)",
            "Position · 순천향대학교 UBICOMP LAB / 학부연구생",
            "Role · Team Lead / Full Stack Developer",
          ]}
        />
        <DetailSection title="프로젝트 개요">
          <DetailText>
            순천향대학교 UBICOMP LAB의 연구실 실험 데이터 수집 파이프라인을 위한
            실시간 관제 및 이상 알림 시스템입니다. 기존 환경에서는 수집이
            멈추거나 데이터 품질에 문제가 생겨도 직접 데이터를 열람하기 전까지
            이상 여부를 확인하기 어려웠고, 실제로 데이터 수집 중단을 3일간
            인지하지 못한 사례가 있었습니다. 이 문제를 해결하기 위해 서버 응답
            상태, 마지막 수집 시각, 데이터 품질을 기준으로 장애 여부를 자동
            감지하도록 했습니다. 감지된 상태는 통합 대시보드와 실시간 알림을
            통해 확인할 수 있도록 구성했습니다. 개발 이후 졸업 전까지 약 1년
            8개월간 연구 과제 환경에서 실제 운영했으며, 현재도 연구실 실험
            데이터 수집 환경에서 계속 운영되고 있습니다.
          </DetailText>
        </DetailSection>
        <DetailSection title="역할">
          <DetailBullets
            items={[
              "팀 리드로서 요구사항 정리, 기능 범위 정의, 전체 시스템 아키텍처 설계",
              "데이터 수집·조회·장애 상태 흐름을 고려한 DB 스키마 설계 및 Spring Boot API 구현",
              "장치 상태, 최근 수집 시각, 센서 데이터를 한 화면에서 확인하는 관제 UI 설계 및 Next.js 프론트엔드 구현",
              "self-hosted runner 기반 CI/CD 파이프라인 구축 및 Docker 기반 배포 환경 구성",
            ]}
          />
        </DetailSection>
        <DetailSection title="기술 스택">
          <PillGroup
            items={[
              "Next.js",
              "Spring Boot",
              "MySQL",
              "Docker Compose",
              "GitHub Actions",
              "Self-hosted Runner",
            ]}
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="판옵티콘(Panopticon)" />
        <DetailSection title="데이터 수집 파이프라인 관제 시스템 개발" className="mt-4">
          <DetailText>
            서버와 데이터베이스의 응답 상태, 센서 데이터 수집 상태, 장애 이력을
            대시보드에서 통합적으로 확인할 수 있도록 구성했습니다. 데이터 확인
            과정도 DB 직접 접근에 의존하지 않도록 바꿨습니다. 운영자는 화면에서
            실시간 데이터를 확인하고, 필요한 기간을 선택해 데이터를 조회한 뒤
            CSV로 출력할 수 있습니다. 감지된 이상 상태는 Spring Boot 백엔드에
            저장하고, 대시보드에 반영하는 동시에 이상 발생 시 Slack으로 알림을
            전송하도록 연결했습니다.
          </DetailText>
          <DetailImageGrid
            images={[
              {
                src: "/projects/panopticon/panopticon-dashboard-overview.png",
                alt: "리소스 상태와 장애 이력을 확인하는 대시보드 화면",
                caption: "리소스 상태와 장애 이력을 확인하는 대시보드 화면",
              },
              {
                src: "/projects/panopticon/panopticon-realtime-monitoring.png",
                alt: "실시간 데이터 수집 상태를 확인하는 관제 대시보드 화면",
                caption: "실시간 데이터 수집 상태를 확인하는 관제 대시보드 화면",
              },
            ]}
          />
        </DetailSection>
        <DetailSection title="확장성을 고려한 모듈 아키텍처 설계" className="mt-12">
          <DetailText>
            Watchdog의 감지 로직과 Notification의 알림 전송 로직을 분리했습니다.
            감지 대상이 늘어나더라도 해당 대상의 checker 모듈을 추가하는
            방식으로 쉽게 확장할 수 있도록 구조를 잡았습니다. Slack 외의 알림
            채널이 필요하면 notifier 모듈을 추가하는 구조로 설계했습니다. 백엔드는
            Watchdog이 보낸 감지 결과를 저장하고, 프론트엔드는 저장된 상태
            이벤트를 조회하거나 WebSocket으로 전달받아 화면을 갱신합니다.
          </DetailText>
          <DetailImage
            src="/projects/panopticon/panopticon-system-architecture.jpg"
            alt="역할별 모듈로 분리한 판옵티콘 전체 아키텍처"
            caption="역할별 모듈로 분리한 판옵티콘 전체 아키텍처"
            narrow
          />
        </DetailSection>

      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="판옵티콘(Panopticon)" />
        <DetailSection title="TCP Socket과 WebSocket을 사용한 상태 이벤트 전달 구조 구현" className="mt-4">
          <DetailText>
            Watchdog은 각 감지 대상에 맞는 checker 전략을 실행하고 이상 상태를
            판단합니다. 이상 상태가 확인되면 Watchdog은 감지 결과를 TCP 기반
            소켓 통신으로 Spring Boot 백엔드에 전달합니다. 백엔드는 감지 결과를
            상태 이벤트로 저장한 뒤 WebSocket 이벤트로 변환해 Next.js
            프론트엔드에 전달합니다. Slack 알림도 같은 상태 이벤트를 기준으로
            전송되도록 연동했습니다.
          </DetailText>
          <DetailImage
            src="/projects/panopticon/panopticon-event-architecture.jpg"
            alt="Watchdog 상태 이벤트 전파 구조"
            caption="Watchdog 상태 이벤트 전파 구조"
            narrow
          />
        </DetailSection>
        <DetailSection title="Self-hosted Runner 기반 내부망 배포 자동화 구축" className="mt-12">
          <DetailText>
            서버가 학교 내부망에 있어 외부에서 SSH로 접속하는 배포 파이프라인을
            사용할 수 없었습니다. 내부망 서버에 self-hosted runner를 설치하고,
            GitHub Actions job이 해당 runner에서 실행되도록 구성했습니다. GitHub
            Actions는 내부망 runner에 job을 전달하고, runner가 서버 안에서 소스
            갱신, Docker 이미지 빌드, Docker Compose 기반 컨테이너 재배포를
            순서대로 수행하도록 구성했습니다.
          </DetailText>
          <DetailImage
            src="/projects/panopticon/panopticon-ci-cd.jpg"
            alt="self-hosted runner를 사용한 CI/CD 시퀀스 다이어그램"
            caption="self-hosted runner를 사용한 CI/CD 시퀀스 다이어그램"
            narrow
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="판옵티콘(Panopticon)" />
        <DetailSection title="회고 및 개선 방향" className="mt-4">
          <DetailText>
            시스템 구축 이후 사용률이 높아 보람찼던 프로젝트였습니다. 특히
            실시간 데이터 그래프와 알림 시스템이 연구실 운영 과정에서 유용하게
            사용되었습니다. 운영하면서 감지 대상과 알림 채널을 분리해 둔 점도
            유지보수에 도움이 됐습니다. 새 서버를 감시하거나 Slack 외의 알림
            방식을 붙일 때 Watchdog 전체를 수정하지 않고 모듈을 추가하는
            방식으로 대응할 수 있었습니다. 반대로 Watchdog과 백엔드 사이를 TCP
            Socket으로 직접 연결한 구조는 네트워크 하위 계층을 직접 다루는
            방식이라 신경 써야 할 부분이 많았습니다. 기존에 만들어진 코드가 있어
            그대로 사용했지만, 다시 설계한다면 Watchdog의 감지 결과 전달은
            HTTP/Webhook 기반 방식을 사용하거나, 프론트엔드 단방향 상태 갱신도
            WebSocket 대신 SSE 등의 기술을 사용할 것 같습니다.
          </DetailText>
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectTitle
          eyebrow="Project No.3"
          title="SCH MiniProject PMS"
          description="순천향대학교 사물인터넷학과 ML/DL 강의에서 사용하는 프로젝트 과제 관리 시스템"
          meta={[
            "Period · 2025.06 ~ 2026.02 (약 10개월 - 개발 및 운영)",
            "Position · 순천향대학교 ML/DL 강의 / 개인 프로젝트",
            "Role · Full-stack Developer",
          ]}
        />
        <DetailSection title="프로젝트 개요">
          <DetailText>
            순천향대학교 사물인터넷학과 머신러닝·딥러닝 강의에서 사용하는
            프로젝트 과제 관리 시스템입니다. 기존 방식에서는 학생이 서로의
            점수를 비교할 수 없어 자신의 결과 수준을 확인하기 어려웠고, 교수자는
            제출 파일과 점수를 따로 확인해 순위를 직접 계산해야 했습니다. 이를
            해결하기 위해 학생은 결과를 제출하면 자신의 랭킹을 확인할 수 있고,
            교수자는 학생 점수와 제출 파일을 웹에서 관리할 수 있는 시스템을
            구현했습니다. 실제 강의 성적에 반영되는 데이터를 다루기 때문에 점수
            위변조를 막는 서버 측 검증을 포함해 세션 기반 사용자 관리, 감사 로그,
            파일 업로드 검증을 구현했습니다. 이 시스템은 졸업 전까지 약
            10개월간 직접 운영했으며, 현재도 강의 운영 환경에서 계속 사용되고
            있습니다. 현재 월 평균 약 40명의 학생이 과제 제출과 랭킹 조회 기능을
            이용하고 있습니다.
          </DetailText>
        </DetailSection>
        <DetailSection title="역할">
          <DetailBullets
            items={[
              "교수자 요구사항을 바탕으로 과제 제출, 점수 비교, 랭킹, 관리자 기능의 요구사항 정리",
              "학생용 과제 제출/랭킹 화면과 교수자용 관리 화면의 UI/UX 설계 및 프론트엔드 구현",
              "서버 세션 인증, 역할 기반 접근 제어, 서버 측 점수 검증, 파일 업로드 검증, 감사 로그 개발",
              "Docker Compose 기반 실행 환경 구성과 졸업 전까지 배포 및 운영 대응",
            ]}
          />
        </DetailSection>
        <DetailSection title="기술 스택">
          <PillGroup items={["Next.js", "SQLite", "Docker Compose"]} />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="SCH MiniProject PMS" />
        <DetailSection title="과제 제출·랭킹 관리 시스템 구현" className="mt-4">
          <DetailText>
            사용자는 프로젝트 결과와 점수를 웹으로 제출하고 제출 후 바로 자신의
            랭킹을 확인할 수 있도록 구성했습니다. 교수자는 관리자 페이지에서
            사용자 관리와 제출 점수 집계를 처리하고, 프로젝트별 랭킹을 한 번에
            확인할 수 있습니다. 전체 랭킹은 엑셀 형식으로 출력해 성적 정리 과정에
            바로 활용할 수 있도록 구성했습니다.
          </DetailText>
          <DetailImageGrid
            images={[
              {
                src: "/projects/sch-iot-rankingboard/sch-miniproject-ranking-page.png",
                alt: "전체 프로젝트 랭킹을 확인하는 학생 화면",
                caption: "전체 프로젝트 랭킹을 확인하는 학생 화면",
              },
              {
                src: "/projects/sch-iot-rankingboard/sch-miniproject-admin-rankings-page.png",
                alt: "프로젝트별 랭킹과 점수를 집계하는 관리자 화면",
                caption: "프로젝트별 랭킹과 점수를 집계하는 관리자 화면",
              },
            ]}
          />
        </DetailSection>
        <DetailSection title="아키텍처 및 데이터 구조 설계" className="mt-12">
          <DetailText>
            강의 서버에서는 Next.js 애플리케이션, SQLite DB, 제출 파일 저장
            영역을 Docker Compose 환경에서 함께 운영했습니다. 월 평균 약 40명
            규모의 강의 운영 시스템이라 별도 DB 서버를 두기보다 SQLite로 관리
            비용을 낮췄고, DB 파일과 제출 파일은 각각 별도 볼륨으로 분리해
            컨테이너 재시작 이후에도 데이터가 유지되도록 했습니다.
          </DetailText>
          <DetailImageGrid
            columns={1}
            images={[
              {
                src: "/projects/sch-iot-rankingboard/sch-miniproject-system-architecture.png",
                alt: "SCH MiniProject PMS 운영 아키텍처 다이어그램",
                caption: "운영 아키텍처 구성도",
                imageWidth: "75",
                captionWidth: "75",
              },
              {
                src: "/projects/sch-iot-rankingboard/sch-miniproject-data-model-erd.png",
                alt: "SCH MiniProject PMS 데이터 구조 ERD",
                caption: "데이터 구조 ERD",
                imageWidth: "75",
                captionWidth: "75",
              },
            ]}
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="SCH MiniProject PMS" />
        <DetailSection title="세션 기반 인증과 API 경로 기반 인가 구현" className="mt-4">
          <DetailText>
            강의 운영 시스템은 외부 서비스 연동보다 학생·관리자 권한을 서버에서
            확실하게 통제하는 것이 중요했습니다. 그래서 토큰을 클라이언트에서
            직접 다루는 방식보다 서버가 로그인 상태와 권한을 관리하는 세션 기반
            인증을 선택했습니다. 인증은 학번 기반 로그인과 session_token 쿠키,
            서버 세션을 기준으로 처리했습니다.
          </DetailText>
          <DetailText>
            보호 경로에서는 세션을 먼저 확인하고, 학생용 API와 관리자용 API를
            경로 기준으로 분리해 역할에 맞는 요청만 처리되도록 했습니다. 학생은
            본인의 제출 결과와 랭킹 조회 기능에 접근하고, 관리자는 사용자 관리,
            점수 집계, 제출 파일 확인 같은 운영 기능에 접근할 수 있도록 인가
            범위를 나눴습니다.
          </DetailText>
        </DetailSection>
        <DetailImageGrid
          columns={1}
          images={[
            {
              src: "/projects/sch-iot-rankingboard/sch-miniproject-session-auth-flow.jpg",
              alt: "SCH MiniProject 로그인 및 세션 발급 흐름",
              caption: "로그인 및 세션 발급 흐름",
            },
            {
              src: "/projects/sch-iot-rankingboard/sch-miniproject-session-api-flow.jpg",
              alt: "SCH MiniProject 보호된 API 접근 및 경로 기반 인가 흐름",
              caption: "보호된 API 접근 및 경로 기반 인가 흐름",
            },
          ]}
        />
        <DetailSection title="파일 업로드 보안과 서버 검증 구현" className="mt-12">
          <DetailText>
            제출 파일은 성적 처리의 근거가 되기 때문에 단순 첨부 파일이 아니라
            검증 대상 데이터로 다뤘습니다. 입력 단계, 저장 단계, 다운로드
            단계에서 필요한 확인을 나눠 적용했습니다.
          </DetailText>
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="SCH MiniProject PMS" />
        <section className="mt-4 grid gap-4">
          <SubHeading>프론트엔드 검증</SubHeading>
          <DetailText>
            프론트엔드에서는 빈 파일을 먼저 차단하고, 확장자 제한을 적용해
            .ipynb, .py 파일만 선택할 수 있게 했습니다. 이를 통해 서버 요청 전에
            사용자 입력 오류를 줄였습니다.
          </DetailText>
          <SubHeading>서버 검증</SubHeading>
          <DetailText>
            인증된 세션이 있는 사용자만 제출할 수 있게 하고, 빈 파일과 10MB 초과
            파일을 서버에서 차단했습니다. 업로드 확장자는 .ipynb, .py만 허용하고,
            파일명 특수문자를 정리한 뒤 randomUUID를 붙여 저장 파일명 충돌을
            방지했습니다. 파일은 사용자 ID별 디렉터리에 저장했고, 저장 전 업로드
            루트와 저장 대상 경로를 각각 절대 경로로 변환한 뒤, 최종 경로가
            업로드 루트 내부에서 시작하는지 확인했습니다.
          </DetailText>
          <SubHeading>다운로드 보안</SubHeading>
          <DetailText>
            다운로드도 인증된 사용자만 가능하며, 제출 소유자 또는 관리자만 파일을
            받을 수 있도록 확인했습니다. 저장된 파일 경로도 다시 검사해 업로드
            루트 밖 파일이 응답되지 않도록 했습니다.
          </DetailText>
        </section>
        <DetailSection title="모니터링을 위한 요청 로그 관리 구현" className="mt-12">
          <DetailText>
            성적 반영에는 점수뿐 아니라 제출 시간도 중요했기 때문에, 제출 실패,
            로그인 실패, 점수 관리, 관리자 작업처럼 사후 확인이 필요한 요청을
            request_logs 테이블에 남겼습니다. 로그에는 요청자, 경로, 메서드, 상태
            코드, IP, 요청 메타데이터를 포함했고, 관리자 페이지에서는 요청 경로,
            method, status, IP, metadata 기준 검색과 페이지네이션으로 점수 처리와
            제출 과정의 문제를 추적하도록 구성했습니다.
          </DetailText>
          <DetailImage
            src="/projects/sch-iot-rankingboard/sch-miniproject-request-logs-page.png"
            alt="요청 로그를 확인하는 관리자 화면"
            caption="요청 로그를 확인하는 관리자 화면"
            narrow
          />
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="SCH MiniProject PMS" />
        <DetailSection title="서버 배포 장애 대응: 내부망 DNS 설정 유실" className="mt-4">
          <SubHeading>장애 상황</SubHeading>
          <DetailText>
            배포 과정에서 Docker Compose가 필요한 이미지를 pull하는 단계에서
            실패했습니다. 로그 확인 결과 IP 주소 대상 ping은 성공했지만 도메인
            이름으로는 ping이 실패했습니다.
          </DetailText>
          <SubHeading>원인 확인</SubHeading>
          <DetailText>
            초기에 DNS 문제를 의심하여 서버의 netplan 설정에서
            nameservers.addresses 값을 Cloudflare DNS(1.1.1.1)와 Google
            DNS(8.8.8.8)로 지정해 공개 DNS로 변경해 확인했습니다. 하지만 도메인
            이름으로는 ping이 계속 실패했습니다.
          </DetailText>
          <DetailText>
            이후 원인을 다시 확인하면서, 학교 내부망에서는 외부 공개 DNS로 직접
            질의하지 못하고 학교 로컬 DNS 서버를 통해 도메인을 해석해야 하는
            구조일 가능성이 높다고 판단했습니다.
          </DetailText>
          <SubHeading>조치 및 재발 방지</SubHeading>
          <DetailText>
            학교 내부망에서는 외부 공개 DNS로 직접 질의하지 못하고 학교 로컬 DNS
            서버를 통해 도메인을 해석해야 하는 구조일 가능성이 높다고 판단했고,
            유실되어 있던 학교 DNS 서버 IP를 서버 DNS 설정에 반영했습니다. 이후
            도메인 해석과 Docker Compose 배포가 정상 진행되는 것을 확인했습니다.
          </DetailText>
        </DetailSection>
        <DetailSection title="회고 및 개선 방향" className="mt-12">
          <DetailText>
            UI 디자인을 AI를 활용하여 진행했는데, 생각보다 원하는 분위기에 가깝게
            나와 제작 과정이 즐거웠던 프로젝트였습니다. 성적에 반영되는
            프로젝트이다 보니 보안을 최대한 신경 쓰려고 노력했지만 추후 검토
            과정에서 놓친 부분들이 많았다는 것을 알게 되었습니다. 특히 파일
            업로드 보안에서 단순한 확장자 검증과 구조 검증뿐만 아니라 MIME type,
            파일 signature까지 확인해야 한다는 것을 알게 되어 후임자에게 해당
            내용을 공유하고, 향후 시스템을 새로 구축할 때는 이러한 부분들을
            보완해서 시스템을 설계해야겠다고 생각했습니다.
          </DetailText>
        </DetailSection>
      </PdfPage>

      <PdfPage>
        <SectionHeading>Experience</SectionHeading>
        <div className="mt-4 grid gap-8">
          {portfolioExperiences.map((experience) => (
            <ExperienceItem
              key={experience.title}
              title={experience.title}
              meta={experience.meta}
              bullets={experience.bullets.map(renderPortfolioExperienceBullet)}
            />
          ))}
        </div>

        <section className="mt-10 grid gap-4">
          <h3 className="text-[17px] font-semibold leading-tight text-black">
            기타 경험
          </h3>
          <ul className="grid list-disc gap-2 pl-5 text-[14px] font-normal leading-relaxed text-[#525252] marker:text-black">
            {portfolioAdditionalExperiences.map((experience) => (
              <li key={experience}>{experience}</li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-[18px] font-semibold leading-tight text-black">
            수상 내역
          </h2>
          <div className="mt-4 grid gap-4">
            {awards.map((award) => (
              <div
                key={`${award.date}-${award.title}`}
                className="grid grid-cols-[40mm_58mm_1fr] items-baseline gap-5"
              >
                <p className="text-[12px] font-medium leading-relaxed tracking-[0.14em] text-[#737373]">
                  {award.date} · {award.prize}
                </p>
                <p className="text-[13px] font-semibold leading-relaxed text-black">
                  {award.title}
                </p>
                <p className="text-[12.5px] font-normal leading-relaxed text-[#737373]">
                  {award.project}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-16">
          <SectionHeading>Profile</SectionHeading>
          <div className="mt-4 grid gap-6">
            {[
              {
                title: "학력",
                body: `${education.school} ${education.major} · ${education.status} · ${education.period} · ${education.grade}`,
              },
              {
                title: "어학",
                body: `${language.name} ${language.score} · ${language.date}`,
              },
              {
                title: "병역",
                body: `${military.type} ${military.state} · ${military.branch} · ${military.period}`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-[38mm_1fr] items-baseline gap-8"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#737373]">
                  {item.title}
                </p>
                <p className="text-[14px] font-medium leading-relaxed text-black">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </PdfPage>

      <PdfPage>
        <SectionHeading>Other Projects</SectionHeading>
        <div className="mt-4 grid gap-7">
          {otherProjects.slice(0, 3).map((project) => (
            <OtherProjectItem key={project.title} project={project} />
          ))}
        </div>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="Other Projects" />
        <div className="mt-4 grid gap-7">
          {otherProjects.slice(3, 6).map((project) => (
            <OtherProjectItem key={project.title} project={project} />
          ))}
        </div>
      </PdfPage>

      <PdfPage>
        <ProjectContinuation title="Other Projects" />
        <div className="mt-4 grid gap-7">
          {otherProjects.slice(6).map((project) => (
            <OtherProjectItem key={project.title} project={project} />
          ))}
        </div>
      </PdfPage>
    </PdfDocument>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-[18px] font-semibold leading-tight tracking-normal text-black">
      {children}
    </h2>
  );
}

function ContactSection({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <SectionHeading>연락처</SectionHeading>
      <div className="mt-4 grid gap-4 text-[14px] leading-relaxed text-black sm:grid-cols-2">
        {contact
          .filter((item) =>
            ["phone", "email", "portfolio", "github"].includes(item.type),
          )
          .map((item) => {
            const isExternal = "external" in item && item.external;

            return (
              <ContactLink
                key={item.type}
                label={item.label}
                value={item.value}
                href={item.href}
                external={isExternal}
              />
            );
          })}
      </div>
    </section>
  );
}

function SkillsSection({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <SectionHeading>기술 스택</SectionHeading>
      <div className="mt-4 grid gap-2.5">
        {skills.map((group) => (
          <div
            key={group.title}
            className="grid grid-cols-[34mm_1fr] items-baseline gap-8"
          >
            <p className="text-[14px] font-medium leading-relaxed tracking-normal text-[#525252]">
              {group.title}
            </p>
            <p className="text-[14.5px] font-normal leading-relaxed tracking-normal text-[#525252]">
              {group.skills.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectTitle({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
}) {
  return (
    <header>
      <p className="text-[11px] uppercase tracking-[0.22em] text-[#737373]">
        {eyebrow}
      </p>
      <h1 className="mt-4 font-display text-[34px] font-semibold leading-[1.08] tracking-normal text-black">
        {title}
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-[#737373]">
        {description}
      </p>
      <section className="mt-8 grid grid-cols-3 gap-6 border-y border-[#e5e5e5] py-5">
        {meta.map((item) => (
          <p key={item} className="text-[11px] leading-relaxed text-[#737373]">
            {item}
          </p>
        ))}
      </section>
    </header>
  );
}

function ProjectContinuation({ title }: { title: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#737373]">
      {title}
    </p>
  );
}

function DetailSection({
  title,
  children,
  className = "mt-16",
  headingLevel = "h2",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const headingClassName =
    headingLevel === "h3"
      ? "pt-1 text-[15px] font-semibold leading-relaxed tracking-normal text-black"
      : "font-heading text-[21px] font-medium leading-[1.33] tracking-normal text-black";

  return (
    <section className={`${className} grid gap-4`}>
      <Heading className={headingClassName}>
        {title}
      </Heading>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-1 text-[15px] font-semibold leading-relaxed tracking-normal text-black">
      {children}
    </h3>
  );
}

function DetailText({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13px] font-normal leading-relaxed tracking-normal text-[#737373]">
      {children}
    </p>
  );
}

function DetailBullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 text-[13px] font-normal leading-relaxed tracking-normal text-[#737373]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-black"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailImage({
  src,
  alt,
  caption,
  compact = false,
  narrow = false,
}: {
  src: string;
  alt: string;
  caption: string;
  compact?: boolean;
  narrow?: boolean;
}) {
  return (
    <figure className="grid gap-2">
      <div
        className={`flex ${
          narrow ? "" : compact ? "h-[50mm]" : "h-[58mm]"
        } items-center justify-center overflow-hidden ${narrow ? "" : "px-6"}`}
      >
        <img
          src={src}
          alt={alt}
          className={`max-h-full object-contain ${narrow ? "w-[90%]" : "w-full"}`}
        />
      </div>
      <figcaption
        className={`text-[10px] leading-relaxed text-[#737373] ${
          narrow ? "mx-auto w-[90%]" : ""
        }`}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function DetailImageGrid({
  images,
  columns = 2,
  wide = false,
}: {
  images: Array<{
    src: string;
    alt: string;
    caption: string;
    imageWidth?: "75" | "80" | "90";
    captionWidth?: "75" | "90";
  }>;
  columns?: 1 | 2;
  wide?: boolean;
}) {
  const isSingleColumn = columns === 1;

  return (
    <div
      className={`grid ${isSingleColumn ? "grid-cols-1" : "grid-cols-2"} ${
        wide ? "-mx-4 gap-4" : "gap-5"
      }`}
    >
      {images.map((image) => (
        <figure key={image.src} className="grid gap-2">
          <div
            className={`flex ${
              isSingleColumn ? "" : "h-[42mm]"
            } items-center justify-center overflow-hidden`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`${
                isSingleColumn
                  ? image.imageWidth === "75"
                    ? "w-[75%]"
                    : image.imageWidth === "80"
                    ? "w-[80%]"
                    : "w-[90%]"
                  : "w-full"
              } object-contain ${
                isSingleColumn ? "h-auto" : "max-h-full"
              }`}
            />
          </div>
          <figcaption
            className={`text-[10px] leading-relaxed text-[#737373] ${
              isSingleColumn
                ? image.captionWidth === "75"
                  ? "mx-auto w-[75%]"
                  : "mx-auto w-[90%]"
                : ""
            }`}
          >
            {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function PillGroup({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <Pill key={item} strong={index < 5}>
          {item}
        </Pill>
      ))}
    </div>
  );
}

function OtherProjectItem({
  project,
}: {
  project: (typeof otherProjects)[number];
}) {
  return (
    <article className="border-t border-[#e5e5e5] pt-5">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="font-heading text-[18px] font-semibold leading-[1.35] tracking-normal text-black">
            {project.title} - {project.subtitle}
          </h3>
          <p className="mt-2 text-[12px] font-normal leading-relaxed tracking-normal text-[#737373]">
            {project.affiliation} · {project.period}
          </p>
        </div>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 shrink-0 items-center rounded-full border border-[#d4d4d4] px-3 text-[11px] font-medium leading-none text-[#525252]"
          >
            GitHub ↗
          </a>
        ) : null}
      </div>
      <p className="mt-4 text-[13px] font-normal leading-relaxed tracking-normal text-[#525252]">
        {project.summary}
      </p>
      <ul className="mt-3 grid gap-1.5 text-[12px] font-normal leading-relaxed tracking-normal text-[#737373]">
        {project.highlights.map((text) => (
          <li key={text} className="flex gap-3">
            <span
              className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-black"
              aria-hidden="true"
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((skill) => (
          <Pill key={skill}>{skill}</Pill>
        ))}
      </div>
    </article>
  );
}

function renderPortfolioExperienceBullet(bullet: string) {
  if (bullet !== publicationExperienceBullet) {
    return bullet;
  }

  return (
    <span>
      {publicationExperienceBullet} -{" "}
      <a
        href={publication.href}
        target="_blank"
        rel="noreferrer"
        className="font-normal text-[#525252] underline decoration-[#bdbdbd] underline-offset-2"
      >
        {publication.description}
        <span aria-hidden="true"> ↗</span>
      </a>
    </span>
  );
}

function ExperienceItem({
  title,
  meta,
  bullets,
}: {
  title: string;
  meta: string;
  bullets: ReactNode[];
}) {
  return (
    <article className="grid gap-4">
      <div className="flex items-baseline gap-3">
        <h3 className="text-[18px] font-semibold leading-tight text-black">
          {title}
        </h3>
        <p className="text-[14px] font-normal leading-tight text-[#737373]">
          | {meta}
        </p>
      </div>
      <ul className="grid list-disc gap-2 pl-5 text-[14px] font-normal leading-relaxed text-[#525252] marker:text-black">
        {bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

function Pill({
  children,
  strong = false,
}: {
  children: string;
  strong?: boolean;
}) {
  return (
    <span
      className={`inline-flex h-8 items-center rounded-full px-3 text-[12px] leading-none tracking-normal ${
        strong
          ? "bg-[#eeeeee] font-medium text-black"
          : "bg-[#fafafa] font-normal text-[#737373]"
      }`}
    >
      {children}
    </span>
  );
}

function ContactLink({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <p className="grid grid-cols-[16mm_1fr] gap-2">
      <span className="font-medium text-[#525252]">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="underline decoration-[#bdbdbd] underline-offset-2"
        >
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </p>
  );
}
