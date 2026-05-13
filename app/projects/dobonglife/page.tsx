import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ExpandableImage } from "@/app/_components/expandable-image";
import { SkillIcon } from "@/app/_components/skill-icon";

export const metadata = {
  title: "Dobong Life | Lim Woojin Portfolio",
  description: "도봉라이프 AWS 인프라 구축 및 운영 프로젝트",
};

function SectionHeading({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={`border-b-[2px] border-[#111418] pb-4 ${className}`}>
      <h2 className="text-lg font-semibold uppercase leading-none tracking-[2.5px] text-[#111418]">
        {children}
      </h2>
    </div>
  );
}

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
    <figure className="border-b border-[#c4c0b8]">
      <div className="bg-[#f5f5f5] px-4 py-6 sm:px-8">
        <ExpandableImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          wrapperClassName="mx-auto block w-full max-w-[860px]"
          className="h-auto w-full object-contain"
        />
      </div>
      <figcaption className="border-t border-[#c4c0b8] px-7 py-4 text-sm text-[#5a6775]">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function DobongLifePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="mx-auto max-w-[1080px] px-6 pt-10 pb-28 sm:px-10 lg:px-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#5a6775] transition-colors hover:text-[#111418]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          돌아가기
        </Link>

        <header className="flex flex-col gap-8 mt-14 pt-10">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.35em] text-[#5a6775]">
              Project No.1
            </p>
            <h1 className="text-5xl font-black leading-tight text-[#111418]">
              도봉라이프 AWS 인프라 구축 및 운영
            </h1>
            <p className="text-lg leading-relaxed text-[#5a6775]">
              클라우드 인프라 구축 및 운영
            </p>
          </div>
          <section className="flex gap-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#5a6775]">
                Period
              </p>
              <p className="text-[15px] font-medium text-[#111418]">
                2025.12 ~ current
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#5a6775]">
                Position
              </p>
              <p className="text-[15px] font-medium text-[#111418]">
                (주)유머스트알엔디 / 인턴 사원
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#5a6775]">
                Role
              </p>
              <p className="text-[15px] font-medium text-[#111418]">
                DevOps Engineer & Backend Developer
              </p>
            </div>
          </section>
        </header>

        <section className="pt-24">
          <SectionHeading>프로젝트 개요</SectionHeading>
          <p className="mt-6 text-[17px] leading-relaxed text-[#111418]">
            도봉라이프는 서울특별시 도봉구의 지역상권 활성화를 위한 관광 정보
            안내 서비스입니다. 스토리텔링 기반 여행 코스, 맛집 정보, 지역
            소상공인 연계 할인 쿠폰 발행 및 사용 기능을 제공하며, 현재
            플레이스토어와 앱스토어에 출시되어 다운로드 가능한 서비스입니다.
          </p>
        </section>

        <section className="pt-24">
          <SectionHeading>역할</SectionHeading>
          <div className="border-b border-[#c4c0b8]">
            <div className="gap-5 py-6 md:gap-8">
              <h3 className="text-[17px] font-semibold text-[#111418]">
                V1 - 초기 인프라 설계 및 배포 기반 구축
              </h3>
              <ul className="mt-4 grid gap-2">
                <li className="text-sm leading-relaxed text-[#5a6775]">
                  단일 EC2 기반으로 Nginx, Spring Boot, Redis를 Docker Compose로
                  통합 배포
                </li>
                <li className="text-sm leading-relaxed text-[#5a6775]">
                  VPC, Public Subnet, Private Subnet, RDS를 구성해 외부 접근과
                  데이터 계층을 분리
                </li>
                <li className="text-sm leading-relaxed text-[#5a6775]">
                  GitHub Actions, Docker Hub, SSH를 활용한 초기 CI/CD 파이프라인
                  구축
                </li>
              </ul>
            </div>
            <div className="gap-5 border-t border-[#c4c0b8] py-6">
              <h3 className="text-[17px] font-semibold text-[#111418]">
                V2 - 운영 안정성 개선 및 보안 배포 구조 고도화
              </h3>
              <ul className="mt-4 grid gap-2">
                <li className="text-sm leading-relaxed text-[#5a6775]">
                  Nginx, Backend, Frontend 서버를 역할별 EC2로 분리하고 내부
                  서비스 영역을 Private Subnet에 배치
                </li>
                <li className="text-sm leading-relaxed text-[#5a6775]">
                  Terraform으로 VPC, Subnet, EC2, RDS, IAM 리소스를 코드화해
                  인프라 재현성 확보
                </li>
                <li className="text-sm leading-relaxed text-[#5a6775]">
                  GitHub Actions OIDC, SSM, Parameter Store를 활용해 SSH Key
                  없이 배포와 환경 변수 관리를 수행
                </li>
                <li className="text-sm leading-relaxed text-[#5a6775]">
                  CloudWatch로 EC2 및 애플리케이션 로그를 수집해 운영 상태를
                  확인할 수 있는 기반 마련
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-24">
          <SectionHeading>기술 스택</SectionHeading>
          <div className="flex flex-wrap gap-2 py-5">
            <SkillIcon isBlack>AWS</SkillIcon>
            <SkillIcon isBlack>Terraform</SkillIcon>
            <SkillIcon isBlack>GitHub Actions</SkillIcon>
            <SkillIcon isBlack>Docker Compose</SkillIcon>
            <SkillIcon isBlack>CloudWatch</SkillIcon>
            <SkillIcon>VPC</SkillIcon>
            <SkillIcon>EC2</SkillIcon>
            <SkillIcon>RDS</SkillIcon>
            <SkillIcon>S3</SkillIcon>
            <SkillIcon>ElastiCache</SkillIcon>
            <SkillIcon>Route 53</SkillIcon>
            <SkillIcon>OIDC</SkillIcon>
            <SkillIcon>SSM</SkillIcon>
            <SkillIcon>Parameter Store</SkillIcon>
            <SkillIcon>IAM</SkillIcon>
            <SkillIcon>Nginx</SkillIcon>
            <SkillIcon>Spring Boot</SkillIcon>
            <SkillIcon>Redis</SkillIcon>
          </div>
        </section>

        <section className="pt-16">
          <SectionHeading>인프라 구축 과정</SectionHeading>
          <div className="border-b border-[#c4c0b8]">
            <article className="py-6">
              <h3 className="text-[17px] font-semibold text-[#111418]">
                01. 초기 배포 환경 구축 (V1)
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#5a6775]">
                도봉라이프의 초기 BE 인프라를 AWS 기반으로 배포했습니다. 개발
                환경 중심으로 최소 비용과 빠른 배포가 요구되어 단일 EC2와 RDS를
                사용하는 단순한 구조로 구성했습니다.
              </p>

              <div className="mt-6">
                <DiagramFigure
                  src="/dobonglife-arch-v1.webp"
                  alt="도봉라이프 V1 아키텍처 다이어그램"
                  width={962}
                  height={1062}
                  caption="V1 단일 EC2, RDS, S3 기반의 초기 AWS 인프라 구성"
                />
              </div>

              <div className="mt-6 grid gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#111418]">
                    단일 EC2 + RDS 기반 AWS 배포
                  </h4>
                  <ul className="mt-3 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      도봉라이프 API 서버를 AWS 환경에 최초 배포
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      단일 EC2 기반으로 Nginx, Spring Boot, Redis를 Docker
                      Compose로 통합 운영
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      데이터 계층은 Amazon RDS와 Amazon S3를 사용
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#111418]">
                    네트워크 및 보안 구성
                  </h4>
                  <ul className="mt-3 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      VPC 내 Private Subnet에 RDS를 배치하여 외부 직접 접근 차단
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      Amazon Route 53을 통한 DNS 라우팅 구성
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#111418]">
                    배포 방식
                  </h4>
                  <ul className="mt-3 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      SSH 기반 원격 접속을 활용한 CD 파이프라인 구성
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      단일 서버 구조로 빠른 배포와 운영 단순성 확보
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <DiagramFigure
                  src="/dobonglife-cicd-arch-v1.webp"
                  alt="도봉라이프 V1 CI/CD 아키텍처 다이어그램"
                  width={2163}
                  height={1266}
                  caption="GitHub Actions, Docker Hub, EC2를 연결한 초기 CI/CD 파이프라인"
                />
              </div>
            </article>

            <article className="border-t border-[#c4c0b8] py-6">
              <h3 className="text-[17px] font-semibold text-[#111418]">
                02. 인프라 구조 개선 및 운영 환경 고도화 (V2)
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#5a6775]">
                웹 어드민 페이지 개발에 따라 FE 서버를 추가 배포하고, 트래픽
                증가에 대비해 인프라 구조를 역할 기반으로 분리했습니다. 운영
                로그 수집을 위한 모니터링 기반도 함께 구축했습니다.
              </p>

              <div className="mt-6">
                <DiagramFigure
                  src="/dobonglife-aws-infra-v2.webp"
                  alt="도봉라이프 V2 AWS 인프라 아키텍처 다이어그램"
                  width={2163}
                  height={1266}
                  caption="V2 역할별 EC2, Private Subnet, SSM, OIDC 기반의 AWS 인프라 구성"
                />
              </div>

              <div className="mt-6 grid gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#111418]">
                    인프라 구조 분리 및 확장
                  </h4>
                  <ul className="mt-3 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      단일 서버 구조에서 역할 기반 아키텍처로 전환
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      Nginx, Backend, Frontend를 각각 독립된 EC2로 분리
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      Nginx는 Public Subnet에, FE/BE 애플리케이션 서버와 DB는
                      Private Subnet에 배치
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      Redis를 EC2에서 Amazon ElastiCache로 이전
                    </li>
                  </ul>
                  <a
                    href="https://velog.io/@talking_tomato/AWS%EC%99%80-%ED%99%94%ED%95%B4%ED%95%98%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EC%99%80-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-xs font-semibold text-[#111418] underline underline-offset-4"
                  >
                    관련 글: AWS와 화해하기 - 네트워크와 인스턴스
                  </a>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#111418]">
                    배포 방식 개선 (SSM + OIDC)
                  </h4>
                  <ul className="mt-3 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      기존 SSH 22번 포트 기반 접근 제거
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      AWS Systems Manager를 활용하여 인스턴스 접근 방식 전환
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      GitHub Actions + OIDC 기반으로 CD 파이프라인 재구성
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#111418]">
                    IaC 도입
                  </h4>
                  <ul className="mt-3 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      Terraform으로 VPC, Subnet, EC2, RDS, IAM 등 AWS 리소스를
                      코드화
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      AWS Systems Manager Parameter Store를 활용해 환경 변수와
                      민감 정보 관리
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      user-data 파일을 이용해 EC2 기본 설정 자동화
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#111418]">
                    로깅 및 모니터링
                  </h4>
                  <ul className="mt-3 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      Amazon CloudWatch를 활용하여 EC2 로그 수집 및 애플리케이션
                      로그 확인 환경 구축
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="pt-24">
          <SectionHeading>프로젝트 회고</SectionHeading>
          <div className="mt-6 grid gap-4">
            <p className="text-[17px] leading-relaxed text-[#111418]">
              서비스 전체를 AWS 환경에 직접 배포하면서 인프라 구성 요소가 어떻게
              연결되고 실제 트래픽이 어떤 흐름으로 처리되는지 이해할 수
              있었습니다. 특히 Security Group과 IAM을 활용한 권한 관리를 직접
              설계하고 적용하면서 클라우드 환경에서의 보안 설정을 경험했습니다.
            </p>
            <p className="text-[17px] leading-relaxed text-[#111418]">
              Terraform을 사용하면서 GUI로 설정할 때보다 VPC, Subnet, EC2, RDS,
              IAM 등 인프라 리소스의 관계를 더 명확하게 파악할 수 있었습니다.
              코드로 인프라를 정의하면서 재현성과 변경 추적의 중요성도 함께
              체감했습니다.
            </p>
            <p className="text-[17px] leading-relaxed text-[#111418]">
              사수 없이 인프라 전반을 단독으로 구축하며 시행착오도 많았지만,
              직접 부딪히며 이해한 부분이 많았습니다. 현재는 서비스 규모가 작아
              컨테이너 오케스트레이션이나 고도화된 트래픽 분산 구조까지는
              적용하지 않았지만, 향후 Kubernetes나 ALB 기반 아키텍처로 확장해볼
              계획입니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
