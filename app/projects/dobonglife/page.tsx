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
            <div className="gap-5 py-6  md:gap-8">
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
            <div className="gap-5 border-t border-[#c4c0b8] py-6 ">
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
            <SkillIcon>OIDC</SkillIcon>
            <SkillIcon>SSM</SkillIcon>
            <SkillIcon>Parameter Store</SkillIcon>
            <SkillIcon>IAM</SkillIcon>
            <SkillIcon>Nginx</SkillIcon>
            <SkillIcon>Spring Boot</SkillIcon>
            <SkillIcon>Redis</SkillIcon>
          </div>
        </section>

        <section className="py-16">
          <SectionHeading>Architecture</SectionHeading>
          <div className="border-b border-[#c4c0b8]">
            <DiagramFigure
              src="/dobonglife-arch-v1.webp"
              alt="도봉라이프 V1 아키텍처 다이어그램"
              width={962}
              height={1062}
              caption="V1 단일 EC2, RDS, S3 기반의 초기 AWS 인프라 구성"
            />
            <DiagramFigure
              src="/dobonglife-cicd-arch-v1.webp"
              alt="도봉라이프 V1 CI/CD 아키텍처 다이어그램"
              width={2163}
              height={1266}
              caption="GitHub Actions, Docker Hub, EC2를 연결한 초기 CI/CD 파이프라인"
            />
          </div>
        </section>

        
      </main>
    </div>
  );
}
