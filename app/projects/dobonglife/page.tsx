export default function Home() {
  return (
    <main className="flex mx-auto max-w-3xl px-12 flex-col mt-8 pb-8">
      <section className="flex items-center gap-4 mb-4">
        <p className="text-sm text-[#5a6775] uppercase tracking-[0.25em] min-w-max py-6">
          Project NO.1
        </p>
      </section>

      <section className="flex items-center gap-4 py-4">
        <img
          src="/dobonglife-logo.png"
          alt="도봉라이프 로고"
          className="w-23 h-23 object-contain rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.16)] scale-[1.03]"
        />
        <div>
          <h1 className="text-5xl text-[#111418]">도봉라이프 (Dobong Life)</h1>
          <p className="text-2xl text-[#5a6775] px-0.5 mt-3">
            클라우드 인프라 구축 및 운영
          </p>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-[1fr_4fr] gap-2 items-center">
        <p className="text-sm font-semibold text-[#5a6775]">Period</p>
        <p className="text-[#111418]">2024.12 ~ current</p>
        <p className="text-sm font-semibold text-[#5a6775]">Key Skills</p>
        <p className="text-[#111418]">
          AWS, Terraform Docker, Github Actions, CloudWatch
        </p>
        <p className="text-sm font-semibold text-[#5a6775]">Position</p>
        <p className="text-[#111418]">
          (주)유머스트알엔디 / 인턴사원 / DevOps Engineer
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          Overview
        </h2>
        <div className="mt-2 mb-4 h-px bg-[#d8dde7] w-full" />
        <p className="text-lg text-[#111418]">
          서울특별시 도봉구의 지역상권 활성화를 위한 관광 정보 안내
          서비스입니다. 스토리텔링 기반 여행 코스, 맛집 정보, 지역 소상공인 연계
          할인 쿠폰 발행/사용 등의 기능을 제공하며, 현재 플레이스토어와
          앱스토어에 출시되어 다운로드 가능합니다.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          Role
        </h2>
        <div className="mt-2 mb-4 h-px bg-[#d8dde7] w-full" />
        <div className="flex flex-col gap-2">
          <p className="text-lg text-[#111418]">
            V1 : AWS 인프라를 설계, 구축하고 운영하는 업무를 담당하였습니다.
          </p>
          <p className="text-[#5a6775]">
            - 초기 애플리케이션의 벡엔드 인프라를 설계하였습니다.
          </p>
          <p className="text-[#5a6775]">
            - Github Actions를 사용하여 SSH와 Docker Compose 기반의 CI/CD
            파이프라인을 구축하였습니다.
          </p>
          <p className="text-lg text-[#111418] mt-3">
            V2 : 배포 자동화 및 운영 안정성 개선을 중심으로 인프라를
            고도화하였습니다.
          </p>
          <p className="text-[#5a6775]">
            - 수동 배포 및 환경 불일치 문제를 해결하기 위해 Terraform을 도입하여
            인프라를 코드로 관리하였습니다.
          </p>
          <p className="text-[#5a6775]">
            - Github Actions의 OIDC를 활용하여 IAM Role 기반 인증 구조를
            구성하였습니다.
          </p>
          <p className="text-[#5a6775]">
            - SSM을 통해 EC2 접근 및 배포를 수행함으로써 SSH Key 관리 없이
            보안성을 개선하였습니다.
          </p>
          <p className="text-[#5a6775]">
            - CloudWatch를 활용하여 애플리케이션 로그 수집 및 모니터링 환경을
            구축하였습니다.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          Skills
        </h2>
        <div className="mt-2 mb-4 h-px bg-[#d8dde7] w-full" />
        <dl className="grid gap-2">
          <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-[#5a6775]">
              Cloud / Infrastructure
            </dt>
            <dd className="text-[#111418]">
              AWS (VPC, EC2, RDS, S3, NAT Gateway, Security Group)
            </dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-[#5a6775]">IaC</dt>
            <dd className="text-[#111418]">Terraform</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-[#5a6775]">
              Containerization
            </dt>
            <dd className="text-[#111418]">Docker Compose</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-[#5a6775]">CI/CD</dt>
            <dd className="text-[#111418]">Github Actions</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-[#5a6775]">
              Observablility
            </dt>
            <dd className="text-[#111418]">Amazon CloudWatch</dd>
          </div>
        </dl>
      </section>

      <section className="mt-24">
        <h2 className="text-3xl font-semibold text-[#111418]">
          V1 초기 인프라 설계 및 구축
        </h2>
        <div className="mt-2 mb-4 h-px bg-[#d8dde7] w-full" />
        <h2 className="text-2xl font-semibold text-[#111418] pt-6">
          단일 EC2 + RDS 기반 AWS 설계 및 배포
        </h2>
        <p className="text-lg text-[#111418] mt-2">
          도봉라이프의 초기 버전에서는 개발 환경 중심으로 최소 비용과 빠른 배포가 요구되었습니다.
          따라서 단일 EC2 기반으로 nginx, Spring Boot, Redis를 Docker Compose로 통합 배포하였습니다.
          또한 VPC를 구성하고 퍼블릭 서브넷(EC2)과 프라이빗 서브넷(RDS)을 분리하여 외부 접근은 nginx를 통해서만 가능하도록 설계하였습니다.
          또한 Security Group을 통해 애플리케이션 계층 간 접근을 제한하여 데이터베이스를 외부로부터 격리하였습니다. 
          Route53과 S3를 연계하여 도메인 및 정적 리소스 접근 구조를 구성하였습니다.
        </p>
        <img
          src="/dobonglife-arch-v1.webp"
          alt="도봉라이프 V1 아키텍처 다이어그램"
          className="w-full h-auto object-contain mb-4 px-4"
        />
        <h2 className="text-2xl font-semibold text-[#111418] pt-6">
          CI/CD 파이프라인 구축 및 배포 자동화
        </h2>
        <p className="text-lg text-[#111418] mt-2">
          수동 배포를 자동화하기 위해 Github Actions를 활용하여 CI/CD 파이프라인을 구축하였습니다.
          코드 푸시나 PR 머지 시 Github Actions가 트리거되어 빌드 및 테스트를 수행하고, 빌드된 이미지를 Docker Hub에 푸시하는 작업을 구성하였습니다. 
          이후 SSH를 통해 EC2에 접속하여 Docker Compose 명령어로 애플리케이션을 재배포하는 구조입니다.
          이를 통해 배포 프로세스의 일관성과 신뢰성을 향상시키고, 개발자들이 배포에 소요되는 시간을 줄일 수 있었습니다.
        </p>
        <img
          src="/dobonglife-cicd-arch-v1.webp"
          alt="도봉라이프 V1 CI/CD 아키텍처 다이어그램"
          className="w-full h-auto object-contain my-4 p-4"
        />
      </section>

      <section className="mt-24">
        <h2 className="text-3xl font-semibold text-[#111418]">
          V2 인프라 고도화 및 운영 안정성 개선
        </h2>
        <div className="mt-2 mb-4 h-px bg-[#d8dde7] w-full" />
        <h2 className="text-2xl font-semibold text-[#111418] pt-6">
          역할 기반 아키텍처 설계 및 Terraform 도입
        </h2>
        <p className="text-lg text-[#111418] mt-2">
          웹 어드민 페이지를 개발하면서 FE 서버를 추가 배포하였습니다.
또한 트래픽 증가에 대비하여 인프라 구조 개선과 운영 로그 수집을 위한 모니터링 시스템을 구축하였습니다. 

          단일 서버 구조에서 역할 기반 아키텍처로 전환하였습니다. 
Nginx, Backend, Frontend 서버를 각각 독립된 EC2로 분리하였습니다.
외부 노출 영역과 내부 서비스 영역을 분리하여 보안 수준을 향상시켰습니다.
  -  nginx: 퍼블릭 서브넷
  -  애플리케이션 서버 (FE/BE): 프라이빗 서브넷
  -  DB: 프라이빗 서브넷
Redis를 EC2에서 Amazon ElastiCache로 이전하였습니다.
기존 SSH(22번 포트) 기반 접근 제거하였고 
AWS Systems Manager를 활용한 인스턴스 접근 방식으로 전환하였습니다.
GitHub Actions + OIDC 기반으로 CD 재구성하였습니다.
Terraform을 활용하여 인프라 코드화를 진행하였습니다.
인프라 재현성 확보 및 운영 자동화 기반을 구축하였습니다. 
VPC / Subnet / EC2 / RDS / IAM 등 리소스를 정의하였습니다.
AWS Systems Manager Parameter Store를 활용하여 환경 변수 및 민감 정보를 관리하였습니다.
user-data 파일을 이용하여 EC2 기본 설정을 자동화하였습니다.
Amazon CloudWatch를 활용하여 EC2 로그 수집 및 애플리케이션 로그를 확인하였습니다.
        </p>
        <img
          src="/dobonglife-arch-v1.webp"
          alt="도봉라이프 V1 아키텍처 다이어그램"
          className="w-full h-auto object-contain mb-4 px-4"
        />
        <h2 className="text-2xl font-semibold text-[#111418] pt-6">
          CI/CD 파이프라인 구축 및 배포 자동화
        </h2>
        <p className="text-lg text-[#111418] mt-2">
          수동 배포를 자동화하기 위해 Github Actions를 활용하여 CI/CD 파이프라인을 구축하였습니다.
          코드 푸시나 PR 머지 시 Github Actions가 트리거되어 빌드 및 테스트를 수행하고, 빌드된 이미지를 Docker Hub에 푸시하는 작업을 구성하였습니다. 
          이후 SSH를 통해 EC2에 접속하여 Docker Compose 명령어로 애플리케이션을 재배포하는 구조입니다.
          이를 통해 배포 프로세스의 일관성과 신뢰성을 향상시키고, 개발자들이 배포에 소요되는 시간을 줄일 수 있었습니다.
        </p>
        <img
          src="/dobonglife-cicd-arch-v1.webp"
          alt="도봉라이프 V1 CI/CD 아키텍처 다이어그램"
          className="w-full h-auto object-contain my-4 p-4"
        />
      </section>
    </main>
  );
}
