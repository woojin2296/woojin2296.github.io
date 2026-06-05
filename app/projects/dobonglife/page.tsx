import { ProjectHero } from "@/app/_components/project/project-hero";
import { ProjectPageLayout } from "@/app/_components/project/project-page-layout";
import { SkillIcon } from "@/app/_components/common/skill-icon";
import {
  hero,
  metadata as projectMetadata,
  sectionLinks,
} from "@/content/dobonglife";
import { ContentSection, SectionDevider } from "@/components/section";
import { ContentSubTitle, ContentTitle } from "@/components/title";
import { ContentText } from "@/components/text";
import { FigureGroup as ContentFigureGroup } from "@/components/figure";

export const metadata = projectMetadata;

export default function DobongLifePage() {
  return (
    <ProjectPageLayout sectionLinks={sectionLinks}>
      <ProjectHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        meta={[
          { label: "Period", value: hero.period },
          {
            label: "Position",
            value: (
              <>
                {hero.affiliation} <br />
                {hero.position}
              </>
            ),
          },
          {
            label: "Role",
            value: (
              <span className="flex flex-col items-center leading-relaxed">
                {hero.role.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </span>
            ),
          },
        ]}
      />

      <ContentSection id="overview">
        <ContentTitle>프로젝트 개요</ContentTitle>
        <ContentText>
          {`
          도봉라이프 애플리케이션의 **AWS 인프라 아키텍처**를 설계하고 구축했으며, **배포 파이프라인**과 **모니터링 환경**을 구성해 운영하고
          있습니다. 도봉라이프는 서울특별시 도봉구의 지역상권 활성화 애플리케이션으로 스토리텔링 기반 여행 코스, 맛집 정보, 지역
          소상공인 연계 할인 쿠폰 발행 및 사용 기능을 제공하며, 현재 **플레이스토어**와 **앱스토어**에 출시되어 다운로드 가능합니다.
          `}
        </ContentText>
      </ContentSection>

      <ContentSection id="role">
        <ContentTitle>역할</ContentTitle>
        <ContentText>
          {`
          - 단일 EC2 기반 아키텍처(V1)를 역할 기반 AWS 인프라(V2)와 **EKS 기반 MSA 플랫폼**(V3)으로 확장 설계
          - **Terraform 기반 IaC**를 적용하여 AWS 인프라를 코드로 관리하고, 스택 분리를 통해 재현성과 변경 추적성 확보
          - GitHub Actions, OIDC, SSM, Argo CD 기반 GitOps **CI/CD 파이프라인** 구축
          - AWS Secrets Manager를 활용한 **Secret 관리 및 주입 체계** 구축
          - **HPA, Auto Scaling**을 활용한 AWS 인프라의 확장성 및 가용성 확보
          - Grafana, Prometheus를 활용한 **모니터링 시스템** 구축
          - TLS 인증서 갱신 실패 **운영 장애 대응**
          `}
        </ContentText>
      </ContentSection>

      <ContentSection id="skills">
        <ContentTitle>기술 스택</ContentTitle>
        <div className="flex flex-wrap gap-2 mt-4">
          <SkillIcon emphasized>AWS</SkillIcon>
          <SkillIcon emphasized>EKS / Kubernetes</SkillIcon>
          <SkillIcon emphasized>Terraform</SkillIcon>
          <SkillIcon emphasized>GitHub Actions</SkillIcon>
          <SkillIcon emphasized>Argo CD</SkillIcon>
          <SkillIcon>AWS Secrets Manager</SkillIcon>
          <SkillIcon>Prometheus</SkillIcon>
          <SkillIcon>Grafana</SkillIcon>
          <SkillIcon>Loki</SkillIcon>
        </div>
      </ContentSection>

      <SectionDevider />

      <ContentSection id="legacy-upgrade">
        <ContentTitle>AWS 인프라 및 CI/CD 방식 개선 (V1, V2, V3)</ContentTitle>
        <ContentSubTitle>기존 레거시 인프라 구조(V1)</ContentSubTitle>
        <ContentText>
          {`
          기존 인프라는 **단일 EC2**에서 Nginx, Spring Boot, Redis를 함께 운영하는 구조였습니다.
          배포 파이프라인의 경우 GitHub Actions에서 Docker 이미지를 빌드한 뒤 **Docker Hub**에 업로드하고,
          EC2에 **SSH**로 접속해 이미지를 내려받아 컨테이너를 갱신하는 방식이었습니다.
          `}
        </ContentText>
        <ContentFigureGroup
          figures={[
            {
              src: "/projects/dobonglife/dobonglife-aws-infra-v1.jpg",
              alt: "도봉라이프 AWS 인프라 구조 다이어그램 V1",
              caption: "도봉라이프 AWS 인프라 구조 다이어그램 V1",
            },
            {
              src: "/projects/dobonglife/dobonglife-ci-cd-v1.jpg",
              alt: "도봉라이프 AWS 인프라 구조 다이어그램 V1",
              caption: "도봉라이프 AWS 인프라 구조 다이어그램 V1",
            },
          ]}
        />

        <ContentSubTitle>역할 기반 인프라 구조로 전환(V2)</ContentSubTitle>
        <ContentText>
          {`
          프론트 서버를 별도로 배포해야 해 기존 인프라를 역할 기반 아키텍처로 분리하고 확장하였습니다.
          이에 따라 Nginx, Backend, Frontend 서버를 **역할별 EC2로 분리**하고,
          외부 접근 영역과 내부 서비스 영역을 Public/Private Subnet으로 나누었습니다.
          Redis는 ElastiCache로 분리해 애플리케이션 서버와 상태 저장 계층의 책임을 나누었고,
          Amazon CloudWatch를 활용해 EC2 로그 수집 및 애플리케이션 로그 확인 환경을 구축했습니다.
          `}
        </ContentText>
        <ContentFigureGroup
          figures={[
            {
              src: "/projects/dobonglife/dobonglife-aws-infra-v2.jpg",
              alt: "도봉라이프 AWS 인프라 구조 다이어그램 V2",
              caption: "도봉라이프 AWS 인프라 구조 다이어그램 V2",
            },
          ]}
        />

        <ContentSubTitle>
          GitHub Actions, OIDC, SSM을 활용한 CI/CD 파이프라인 구축 (V2)
        </ContentSubTitle>
        <ContentText>
          {`
          서버에 직접 SSH로 접속해 배포하고 환경 변수를 관리하던 방식을 줄이고, 기존 SSH 22번 포트 기반 접근을 제거했습니다.
          **AWS Systems Manager**로 인스턴스 접근 방식을 전환하고, GitHub Actions와 **OIDC 기반 권한 위임**을 사용해 CD 파이프라인을 재구성했습니다.
          `}
        </ContentText>
        <ContentFigureGroup
          figures={[
            {
              src: "/projects/dobonglife/dobonglife-ci-cd-v2.jpg",
              alt: "도봉라이프 CI/CD 파이프라인 구조 다이어그램 V2",
              caption: "도봉라이프 CI/CD 파이프라인 구조 다이어그램 V2",
            },
          ]}
        />

        <ContentSubTitle>
          마이크로 서비스 전환을 위한 EKS 환경 구축 (V3)
        </ContentSubTitle>
        <ContentText>
          {`
          백엔드 서비스의 MSA 아키텍처 전환과 트래픽 증가에 대비해 기존 서버 배포 방식을 **AWS EKS 기반 구조**로 확장했습니다.
          전체 구조는 외부 진입, 애플리케이션 실행, 데이터 저장 계층을 분리하는 방식으로 설계했습니다.
          Public Subnet은 ALB를 통한 외부 요청 진입점으로 두고, Private Subnet 내부에는 EKS 애플리케이션 노드와
          RDS/Redis 데이터 계층을 나누어 배치해 서비스 트래픽과 데이터 접근 경계를 분리했습니다.
          `}
        </ContentText>

        <ContentFigureGroup
          figures={[
            {
              src: "/projects/dobonglife/dobonglife-aws-infra-v3.jpg",
              alt: "도봉라이프 AWS 인프라 구조 다이어그램 V3",
              caption: "도봉라이프 AWS 인프라 구조 다이어그램 V3",
            },
          ]}
        />

        <ContentSubTitle>
          Argo CD와 GitOps 기반 EKS 배포 파이프라인 구축 (V3)
        </ContentSubTitle>
        <ContentText>
          {`
          **Argo CD**를 사용해 이미지 빌드와 클러스터 배포 책임을 분리하는 방식으로 구성했습니다.
          GitHub Actions는 서비스 소스 변경 시 Docker 이미지를 빌드해 **Amazon ECR**에 업로드하고,
          GitOps 저장소의 Helm values 이미지 태그만 갱신하도록 했습니다.
          **GitHub webhook**은 GitOps 저장소 변경 이벤트를 Argo CD로 전달해 변경 감지 지연을 줄이도록 연결했으며,
          이후 Argo CD에서 GitOps 저장소 변경을 기준으로 EKS에 동기화했습니다.
          `}
        </ContentText>

        <ContentFigureGroup
          figures={[
            {
              src: "/projects/dobonglife/dobonglife-ci-cd-v3.jpg",
              alt: "도봉라이프 CI/CD 파이프라인 구조 다이어그램 V3",
              caption: "도봉라이프 CI/CD 파이프라인 구조 다이어그램 V3",
            },
          ]}
        />
      </ContentSection>

      <ContentSection id="terraform-gitops">
        <ContentTitle>Terraform 기반 IaC와 GitOps 운영 구조 구축</ContentTitle>
        <ContentText>
          {`
          **Terraform 기반 IaC**로 AWS 인프라를 코드화하여 인프라 재현성과 변경 추적성을 높였습니다.
          Terraform은 인프라 리소스의 목표 상태를 정의하고 생성·변경을 적용하고,
          리소스 성격과 변경 범위에 따라 스택을 분리했습니다.
          **GitOps 저장소**는 Kubernetes 애플리케이션의 배포 상태를 관리하고,
          **Argo CD**는 해당 변경을 감지해 EKS 클러스터에 동기화하도록 했습니다.
          `}
        </ContentText>
        <ContentFigureGroup
          figures={[
            {
              src: "/projects/dobonglife/dobonglife-terraform-gitops-structure.jpg",
              alt: "도봉라이프 Terraform과 GitOps 운영 구조 다이어그램",
              caption: "도봉라이프 Terraform과 GitOps 운영 구조 다이어그램",
            },
          ]}
        />
      </ContentSection>

      <ContentSection id="secret-variables">
        <ContentTitle>Secret 저장 위치와 주입 흐름 분리</ContentTitle>
        <ContentText>
          {`
          민감값은 Terraform 코드나 GitOps 저장소에 직접 두지 않고
          **AWS Secrets Manager**에 저장해, 저장 위치와 참조 방식을 분리했습니다.
          인프라 계층은 secret 값 자체가 아니라 필요한 참조 정보만 전달하고,
          애플리케이션은 **Kubernetes Secret**으로 동기화된 값을 환경 변수로 사용하도록 구성했습니다.
          `}
        </ContentText>
      </ContentSection>

      <ContentSection id="availability-scaling">
        <ContentTitle>가용성 및 자동 확장 구성</ContentTitle>
        <ContentText>
          {`
          서비스 부하와 Pod 배치 상태에 대응할 수 있도록 **HPA**와
          **Cluster Autoscaler**를 함께 구성했습니다.
          HPA는 서비스별 부하에 따라 Pod replica 수를 조정하고,
          Cluster Autoscaler는 Pending Pod가 발생했을 때
          Managed Node Group을 확장할 수 있도록 구성했습니다.
          `}
        </ContentText>
      </ContentSection>

      <ContentSection id="monitoring">
        <ContentTitle>모니터링 구성</ContentTitle>
        <ContentText>
          {`
          **Grafana**와 **Prometheus**, **Loki**를 활용해 EKS 클러스터와 애플리케이션의 모니터링 시스템을 구축했습니다.
          `}
        </ContentText>
        <ContentText>
          {`
          **메트릭 흐름**은 Prometheus가 클러스터와 워크로드 지표를 수집하고, Grafana에서 Pod 상태, 리소스 사용량, HPA 동작을 확인하는 구조로 구성했습니다.
          API 지표는 요청 수, 5xx 발생량, request rate, method/status/path별 호출량을 중심으로 확인하도록 정리했습니다.
          `}
        </ContentText>
        <ContentText>
          {`
          **로그 흐름**은 Grafana Alloy가 워크로드와 API 로그를 수집하고 Loki에 저장한 뒤, Grafana에서 메트릭과 로그를 함께 조회하는 방식으로 구성했습니다.
          이를 통해 Pod 상태나 API 오류가 발생했을 때 관련 로그를 같은 관측 화면에서 함께 확인할 수 있도록 했습니다.
          `}
        </ContentText>
        <ContentFigureGroup
          figures={[
            {
              src: "/projects/dobonglife/dobonglife-grafana-operations-overview-masked.png",
              alt: "도봉라이프 Grafana 운영 대시보드",
              caption: "도봉라이프 Grafana 운영 대시보드",
            },
            {
              src: "/projects/dobonglife/dobonglife-grafana-api-traffic-logs-masked.png",
              alt: "도봉라이프 API 트래픽과 오류 로그 대시보드",
              caption: "도봉라이프 API 트래픽과 오류 로그 대시보드",
            },
          ]}
        />
      </ContentSection>

      <ContentSection id="tls-troubleshooting">
        <ContentTitle>
          V1 환경 API 서버 운영 장애 대응: TLS 인증서 갱신 실패
        </ContentTitle>
        <ContentSubTitle>장애 상황</ContentSubTitle>
        <ContentText>
          {`
          프론트엔드 동료로부터 앱 로그인이 되지 않는다는 제보를 받고 V1 환경의 API 서버 장애를 확인했습니다.
          확인 결과 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증처럼 **API 호출이 필요한 인증 기능 전반이 실패**했고,
          앱에는 **네트워크 연결 상태가 원활하지 않습니다 오류**가 표시되었습니다.
          `}
        </ContentText>

        <ContentSubTitle>원인 확인</ContentSubTitle>
        <ContentText>
          {`
          먼저 서버에 접속해 애플리케이션 프로세스를 확인했습니다. 새로운 요청을 시도했지만,
          백엔드 로그와 Nginx access log에 신규 접속 로그가 남지 않았습니다.
          이를 통해 **요청이 애플리케이션까지 도달하지 못한다는 것을 확인**하였습니다.
          `}
        </ContentText>
        <ContentText>
          {`
          초기에 DNS 문제를 의심하여 도메인 접속과 서버 IP 직접 접속을 비교하려 했지만,
          도메인 접속 단계에서 **인증서 만료 오류가 확인**되었습니다. 이후 **openssl 명령어**로 인증서 정보를 확인했고,
          인증서 만료로 장애가 발생했다는 것을 확인하였습니다.
          `}
        </ContentText>

        <ContentSubTitle>조치 및 재발 방지</ContentSubTitle>
        <ContentText>
          {`
          이후 인증서 갱신을 위해 **certbot renew**를 시도하였으나,
          Nginx가 이미 80번 포트를 점유하고 있어 실패했습니다. 긴급 복구를 위해 Nginx를 일시 중단한 뒤 인증서를 갱신했고,
          갱신 후 Certbot 상태와 외부에서 제공되는 인증서 만료일을 다시 확인했습니다.
          재발 방지를 위해 기존 renewal 설정의 authenticator 항목을 **standalone에서 webroot로** 변경했습니다.
          `}
        </ContentText>
      </ContentSection>

      <ContentSection id="retrospective">
        <ContentTitle>프로젝트 회고</ContentTitle>
        <ContentText>
          {`
          사수 없이 인프라 전반을 단독으로 구축하며 부족한 부분과 시행착오도 많았지만,
          그만큼 직접 부딪히며 많이 성장할 수 있었던 프로젝트입니다. 서비스 전체를 AWS 환경에 직접 올리고 배포하면서,
          인프라가 어떻게 연결되고 실제 트래픽이 어떤 흐름으로 처리되는지 이해할 수 있었습니다.
          특히 도메인 요청이 어떤 라우팅을 거쳐 서버까지 도달하는지, 포트 설정에 따라 요청 흐름이
          어떻게 달라지는지 직접 확인하는 과정이 가장 재밌었습니다. 또한 Terraform을 사용해보면서
          기존에 GUI를 통해 설정했을 때에는 알지 못했던 인프라의 전체 구조와 흐름을 더 쉽게 이해할 수 있었습니다.
          `}
        </ContentText>
      </ContentSection>
    </ProjectPageLayout>
  );
}
