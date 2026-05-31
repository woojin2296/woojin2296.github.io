import { ProjectFigure as DiagramFigure } from "@/app/_components/project/project-figure";
import { ProjectHero } from "@/app/_components/project/project-hero";
import { ProjectPageLayout } from "@/app/_components/project/project-page-layout";
import { SectionHeading } from "@/app/_components/common/section-heading";
import { SkillIcon } from "@/app/_components/common/skill-icon";

export const metadata = {
  title: "Dobong Life | Lim Woojin Portfolio",
  description: "도봉라이프 AWS 인프라 구축 및 운영 프로젝트",
};

const projectSectionLinks = [
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
];

export default function DobongLifePage() {
  return (
    <ProjectPageLayout sectionLinks={projectSectionLinks}>
        <ProjectHero
          eyebrow="Project No.1"
          title="도봉라이프(DobongLife)"
          description="서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 구축하고 운영한 프로젝트"
          meta={[
            { label: "Period", value: "2026.04 ~ current" },
            {
              label: "Position",
              value: (
                <>
                  (주)유머스트알엔디 <br />
                  인턴 사원
                </>
              ),
            },
            {
              label: "Role",
              value: "DevOps Engineer",
            },
          ]}
        />

        <section id="overview" className="scroll-mt-12 pt-32">
          <SectionHeading>프로젝트 개요</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"도봉라이프 애플리케이션의 AWS 인프라 아키텍처를 설계하고 구축했으며, 배포 파이프라인과 모니터링 환경을 구성해 운영하고 있습니다. 도봉라이프는 서울특별시 도봉구의 지역상권 활성화 애플리케이션으로 스토리텔링 기반 여행 코스, 맛집 정보, 지역 소상공인 연계 할인 쿠폰 발행 및 사용 기능을 제공하며, 현재 플레이스토어와 앱스토어에 출시되어 다운로드 가능합니다."}
            </p>
          </div>
        </section>

        <section id="role" className="scroll-mt-12 pt-24">
          <SectionHeading>역할</SectionHeading>
          <div className="grid gap-5">
            <ul className="grid list-disc gap-2 pl-5 text-base font-normal leading-relaxed tracking-normal text-[#737373] marker:text-black">
              <li>
                {"단일 EC2 구조를 역할 기반 AWS 구조(V2)와 EKS 기반 MSA 운영 플랫폼(V3)으로 확장 설계"}
              </li>
              <li>
                {"Terraform 기반 IaC 적용, AWS 리소스 코드화, 스택 분리를 통한 인프라 재현성·변경 추적성 확보"}
              </li>
              <li>
                {"GitHub Actions, OIDC, SSM, Argo CD/GitOps 기반 CI/CD 구성 및 GitHub webhook 연결"}
              </li>
              <li>
                {"Secret 저장 위치와 주입 흐름 분리 및 HPA/Cluster Autoscaler 기반 가용성·자동 확장 구성"}
              </li>
              <li>
                {"Prometheus, Grafana, Loki, Alloy 기반 관측 환경 구성 및 TLS/RDS/Node capacity 운영 장애 대응"}
              </li>
            </ul>
          </div>
        </section>

        <section id="skills" className="scroll-mt-12 pt-24">
          <SectionHeading>기술 스택</SectionHeading>
          <div className="flex flex-wrap gap-2.5">
            <SkillIcon emphasized>AWS</SkillIcon>
            <SkillIcon emphasized>Terraform</SkillIcon>
            <SkillIcon emphasized>Kubernetes / EKS</SkillIcon>
            <SkillIcon emphasized>Argo CD / GitOps</SkillIcon>
            <SkillIcon>GitHub Actions</SkillIcon>
            <SkillIcon>Docker</SkillIcon>
            <SkillIcon>Nginx</SkillIcon>
            <SkillIcon>Grafana / Prometheus / Loki</SkillIcon>
          </div>
        </section>

        <section id="legacy-upgrade" className="scroll-mt-12 pt-24">
          <SectionHeading>AWS 인프라 및 CI/CD 방식 개선 (V1, V2, V3)</SectionHeading>
          <div className="grid gap-5">
            <h3 className="pt-4 text-[19px] font-semibold leading-[1.4] tracking-normal text-black">
              {"기존 레거시 인프라 구조 (V1)"}
            </h3>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"기존 인프라는 "}
              <strong className="font-medium text-black">{"단일 EC2"}</strong>
              {"에서 Nginx, Spring Boot, Redis를 함께 운영하는 구조였습니다. 배포 파이프라인의 경우 GitHub Actions에서 Docker 이미지를 빌드한 뒤 "}
              <strong className="font-medium text-black">{"Docker Hub"}</strong>
              {"에 업로드하고, EC2에 "}
              <strong className="font-medium text-black">{"SSH"}</strong>
              {"로 접속해 이미지를 내려받아 컨테이너를 갱신하는 방식이었습니다."}
            </p>
            <div
              className="grid items-start gap-5 md:grid-cols-[1fr_0.78fr]"
              aria-label="도봉라이프 V1 인프라와 CI/CD 구조"
            >
              <DiagramFigure
                src="/projects/dobonglife/dobonglife-aws-infra-v1.jpg"
                alt="도봉라이프 V1 아키텍처 다이어그램"
                width={5800}
                height={2758}
                caption="레거시 인프라 아키텍처"
                wrapperClassName="flex w-full items-center justify-center md:h-[220px]"
                imageClassName="h-auto w-full object-contain md:max-h-full md:w-auto md:max-w-full"
              />
              <DiagramFigure
                src="/projects/dobonglife/dobonglife-ci-cd-v1.jpg"
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
              {"프론트 서버를 별도로 배포해야 해 기존 인프라를 "}
              <strong className="font-medium text-black">
                {"역할 기반 아키텍처"}
              </strong>
              {"로 분리하고 확장하였습니다. 이에 따라 "}
              {"Nginx, Backend, Frontend 서버를 역할별 EC2로 분리하고, "}
              <strong className="font-medium text-black">
                {"외부 접근 영역과 내부 서비스 영역"}
              </strong>
              {"을 "}
              {"Public/Private Subnet"}
              {"으로 나누었습니다. Redis는 "}
              {"ElastiCache"}
              {"로 분리해 애플리케이션 서버와 상태 저장 계층의 책임을 나누었고, Amazon CloudWatch를 활용해 EC2 로그 수집 및 애플리케이션 로그 확인 환경을 구축했습니다."}
            </p>
            <DiagramFigure
              src="/projects/dobonglife/dobonglife-aws-infra-v2.jpg"
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
              {"서버에 직접 SSH로 접속해 배포하고 환경 변수를 관리하던 방식을 줄이고, 기존 SSH 22번 포트 기반 접근을 제거했습니다. "}
              <strong className="font-medium text-black">
                {"AWS Systems Manager"}
              </strong>
              {"로 인스턴스 접근 방식을 전환하고, GitHub Actions와 "}
              <strong className="font-medium text-black">{"OIDC"}</strong>
              {" 기반 권한 위임을 사용해 CD 파이프라인을 재구성했습니다."}
            </p>
            <DiagramFigure
              src="/projects/dobonglife/dobonglife-ci-cd-v2.jpg"
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
              {"백엔드 서비스의 MSA 아키텍처 전환과 트래픽 증가에 대비해 기존 서버 배포 방식을 "}
              <strong className="font-medium text-black">
                {"AWS EKS 기반 구조로 확장"}
              </strong>
              {"했습니다. 전체 구조는 외부 진입, 애플리케이션 실행, 데이터 저장 계층을 분리하는 방식으로 설계했습니다. Public Subnet은 ALB를 통한 외부 요청 진입점으로 두고, Private Subnet 내부에는 EKS 애플리케이션 노드와 RDS/Redis 데이터 계층을 나누어 배치해 서비스 트래픽과 데이터 접근 경계를 분리했습니다."}
            </p>
            <DiagramFigure
              src="/projects/dobonglife/dobonglife-aws-infra-v3.jpg"
              alt="도봉라이프 V3 EKS 플랫폼 아키텍처 다이어그램"
              width={4175}
              height={3831}
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
              {"Argo CD를 사용해 이미지 빌드와 클러스터 배포 책임을 분리하는 방식으로 구성했습니다. GitHub Actions는 서비스 소스 변경 시 Docker 이미지를 빌드해 Amazon ECR에 업로드하고, GitOps 저장소의 Helm values 이미지 태그만 갱신하도록 했습니다. GitHub webhook은 GitOps 저장소 변경 이벤트를 Argo CD로 전달해 변경 감지 지연을 줄이도록 연결했으며, 이후 Argo CD에서 GitOps 저장소 변경을 기준으로 EKS에 동기화했습니다."}
            </p>
            <DiagramFigure
              src="/projects/dobonglife/dobonglife-ci-cd-v3.jpg"
              alt="도봉라이프 V3 GitOps 기반 CI/CD 파이프라인 다이어그램"
              width={4995}
              height={3202}
              caption="Argo CD와 GitOps 기반 V3 배포 파이프라인"
              className="px-8"
            />
            <h2
              id="terraform-gitops"
              className="scroll-mt-12 pt-8 font-heading text-[24px] font-medium leading-[1.33] tracking-normal text-black"
            >
              {"Terraform 기반 IaC와 GitOps 운영 구조 구축"}
            </h2>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"Terraform 기반 IaC로 AWS 인프라를 코드화하여 인프라 재현성과 변경 추적성을 높였습니다."}
              {" Terraform은 인프라 리소스의 목표 상태를 정의하고 생성·변경을 적용하고, 리소스 성격과 변경 범위에 따라 스택을 분리했습니다. GitOps 저장소는 Kubernetes 애플리케이션의 배포 상태를 관리하고, Argo CD는 해당 변경을 감지해 EKS 클러스터에 동기화하도록 했습니다."}
            </p>
            <DiagramFigure
              src="/projects/dobonglife/dobonglife-terraform-gitops-structure.jpg"
              alt="Terraform IaC 스택 분리와 GitOps, Argo CD, EKS 역할 분리 다이어그램"
              width={1693}
              height={929}
              caption="Terraform IaC 스택 분리와 GitOps 운영 구조"
            />
            <h2
              id="secret-variables"
              className="scroll-mt-12 pt-8 font-heading text-[24px] font-medium leading-[1.33] tracking-normal text-black"
            >
              {"Secret 저장 위치와 주입 흐름 분리"}
            </h2>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"민감값은 Terraform 코드나 GitOps 저장소에 직접 두지 않고 AWS Secrets Manager에 저장해, 저장 위치와 참조 방식을 분리했습니다. 인프라 계층은 secret 값 자체가 아니라 필요한 참조 정보만 전달하고, 애플리케이션은 Kubernetes Secret으로 동기화된 값을 환경 변수로 사용하도록 구성했습니다."}
            </p>
            <h2
              id="availability-scaling"
              className="scroll-mt-12 pt-8 font-heading text-[24px] font-medium leading-[1.33] tracking-normal text-black"
            >
              {"가용성 및 자동 확장 구성"}
            </h2>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"서비스 부하와 Pod 배치 상태에 대응할 수 있도록 HPA와 Cluster Autoscaler를 함께 구성했습니다. HPA는 서비스별 부하에 따라 Pod replica 수를 조정하고, Cluster Autoscaler는 Pending Pod가 발생했을 때 Managed Node Group을 확장할 수 있도록 구성했습니다."}
            </p>
            <h2
              id="monitoring"
              className="scroll-mt-12 pt-8 font-heading text-[24px] font-medium leading-[1.33] tracking-normal text-black"
            >
              {"모니터링 구성"}
            </h2>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"메트릭 흐름은 "}
              <strong className="font-medium text-black">{"Prometheus"}</strong>
              {"가 클러스터와 워크로드 지표를 수집하고, "}
              <strong className="font-medium text-black">{"Grafana"}</strong>
              {"에서 Pod 상태, 리소스 사용량, HPA 동작을 확인하는 구조로 구성했습니다. API 지표는 "}
              {"요청 수, 5xx 발생량, request rate, method/status/path별 호출량을 중심으로 확인하도록 정리했습니다."}
            </p>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"로그 흐름은 "}
              <strong className="font-medium text-black">{"Grafana Alloy"}</strong>
              {"가 워크로드와 API 로그를 수집하고 "}
              <strong className="font-medium text-black">{"Loki"}</strong>
              {"에 저장한 뒤, Grafana에서 메트릭과 로그를 함께 조회하는 방식으로 구성했습니다. 이를 통해 Pod 상태나 API 오류가 발생했을 때 관련 로그를 같은 관측 화면에서 함께 확인할 수 있도록 했습니다."}
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              <DiagramFigure
                src="/projects/dobonglife/dobonglife-grafana-operations-overview.png"
                alt="도봉라이프 Grafana 운영 상태 모니터링 대시보드"
                width={1905}
                height={1080}
                caption="Grafana 클러스터 운영 상태 모니터링 화면"
              />
              <DiagramFigure
                src="/projects/dobonglife/dobonglife-grafana-api-traffic-logs.png"
                alt="도봉라이프 Grafana API 트래픽 및 로그 모니터링 대시보드"
                width={1905}
                height={1080}
                caption="Grafana API 트래픽 및 Gateway access log 모니터링 화면"
              />
            </div>
          </div>
        </section>

        <section id="tls-troubleshooting" className="scroll-mt-12 pt-24">
          <SectionHeading>V1 환경 API 서버 운영 장애 대응: TLS 인증서 갱신 실패</SectionHeading>
          <div className="grid gap-5">
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"장애 상황"}
            </h4>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"프론트엔드 동료로부터 앱 로그인이 되지 않는다는 제보를 받고 V1 환경의 API 서버 장애를 확인했습니다. 확인 결과 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증처럼 API 호출이 필요한 인증 기능 전반이 실패했고, 앱에는 "}
              <code className="text-[0.95em] font-medium text-black">
                {"네트워크 연결 상태가 원활하지 않습니다"}
              </code>
              {" 오류가 표시되었습니다."}
            </p>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"원인 확인"}
            </h4>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"먼저 서버에 접속해 애플리케이션 프로세스를 확인했습니다. 새로운 요청을 시도했지만, 백엔드 로그와 Nginx access log에 신규 접속 로그가 남지 않았습니다. 이를 통해 요청이 애플리케이션까지 도달하지 못한다는 것을 확인하였습니다."}
            </p>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"초기에 DNS 문제를 의심하여 도메인 접속과 서버 IP 직접 접속을 비교하려 했지만, 도메인 접속 단계에서 인증서 만료 오류가 확인되었습니다. 이후 "}
              <code className="text-[0.95em] font-medium text-black">
                {"openssl"}
              </code>
              {" 명령어로 인증서 정보를 확인했고, 인증서 만료로 장애가 발생했다는 것을 확인하였습니다."}
            </p>
            <h4 className="pt-2 text-base font-semibold leading-relaxed tracking-normal text-black">
              {"조치 및 재발 방지"}
            </h4>
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"이후 인증서 갱신을 위해 "}
              <code className="text-[0.95em] font-medium text-black">
                {"certbot renew"}
              </code>
              {"를 시도하였으나, Nginx가 이미 80번 포트를 점유하고 있어 실패했습니다. 긴급 복구를 위해 Nginx를 일시 중단한 뒤 인증서를 갱신했고, 갱신 후 Certbot 상태와 외부에서 제공되는 인증서 만료일을 다시 확인했습니다. 재발 방지를 위해 기존 renewal 설정의 "}
              <code className="text-[0.95em] font-medium text-black">
                {"authenticator"}
              </code>
              {" 항목을 "}
              <code className="text-[0.95em] font-medium text-black">
                {"standalone"}
              </code>
              {"에서 "}
              <code className="text-[0.95em] font-medium text-black">
                {"webroot"}
              </code>
              {"로 변경했습니다."}
            </p>
          </div>
        </section>

        <section id="retrospective" className="scroll-mt-12 pt-24">
          <SectionHeading>프로젝트 회고</SectionHeading>
          <div className="grid gap-5">
            <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              {"사수 없이 인프라 전반을 단독으로 구축하며 부족한 부분과 시행착오도 많았지만, 그만큼 직접 부딪히며 많이 성장할 수 있었던 프로젝트입니다. 서비스 전체를 AWS 환경에 직접 올리고 배포하면서, 인프라가 어떻게 연결되고 실제 트래픽이 어떤 흐름으로 처리되는지 이해할 수 있었습니다. 특히 도메인 요청이 어떤 라우팅을 거쳐 서버까지 도달하는지, 포트 설정에 따라 요청 흐름이 어떻게 달라지는지 직접 확인하는 과정이 가장 재밌었습니다. 또한 Terraform을 사용해보면서 기존에 GUI를 통해 설정했을 때에는 알지 못했던 인프라의 전체 구조와 흐름을 더 쉽게 이해할 수 있었습니다."}
            </p>
          </div>
        </section>

    </ProjectPageLayout>
  );
}
