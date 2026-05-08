import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ExpandableImage } from "@/app/_components/expandable-image";

export const metadata = {
  title: "Dobong Life | Lim Woojin Portfolio",
  description: "도봉라이프 AWS 인프라 구축 및 운영 프로젝트",
};

const projectMeta = [
  ["Period", "2025.12 — 2026.02"],
  ["Role", "(주)유머스트알엔디 / 인턴 사원"],
  ["Scope", "AWS 인프라 설계 · Terraform IaC · CI/CD · 로그 모니터링"],
];

const rolePhases = [
  {
    label: "V1",
    title: "초기 인프라 설계 및 배포 기반 구축",
    items: [
      "단일 EC2 기반으로 Nginx, Spring Boot, Redis를 Docker Compose로 통합 배포",
      "VPC, Public Subnet, Private Subnet, RDS를 구성해 외부 접근과 데이터 계층을 분리",
      "GitHub Actions, Docker Hub, SSH를 활용한 초기 CI/CD 파이프라인 구축",
    ],
  },
  {
    label: "V2",
    title: "운영 안정성 개선 및 보안 배포 구조 고도화",
    items: [
      "Nginx, Backend, Frontend 서버를 역할별 EC2로 분리하고 내부 서비스 영역을 Private Subnet에 배치",
      "Terraform으로 VPC, Subnet, EC2, RDS, IAM 리소스를 코드화해 인프라 재현성 확보",
      "GitHub Actions OIDC, SSM, Parameter Store를 활용해 SSH Key 없이 배포와 환경 변수 관리를 수행",
      "CloudWatch로 EC2 및 애플리케이션 로그를 수집해 운영 상태를 확인할 수 있는 기반 마련",
    ],
  },
];

const skillGroups = [
  {
    label: "Cloud / Infra",
    items: ["AWS VPC", "EC2", "RDS", "S3", "NAT Gateway", "Security Group"],
  },
  {
    label: "IaC",
    items: ["Terraform"],
  },
  {
    label: "Delivery",
    items: ["GitHub Actions", "OIDC", "SSM", "Docker Compose"],
  },
  {
    label: "Observability",
    items: ["CloudWatch"],
  },
  {
    label: "Network",
    items: ["Public / Private Subnet", "Route Table", "Security Group"],
  },
];

function SectionHeading({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={`border-b-[2px] border-[#111418] pb-4 ${className}`}>
      <h2 className="text-lg font-bold uppercase leading-none tracking-[2.5px] text-[#111418]">
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
      <main className="mx-auto max-w-[1080px] px-6 pt-10 pb-28 sm:px-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#5a6775] transition-colors hover:text-[#111418]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          돌아가기
        </Link>

        <header className="mt-14 border-t-[3px] border-[#111418] pt-10">
          <div className="grid gap-7 md:grid-cols-[112px_1fr] md:items-center">
            <div className="flex h-24 w-24 items-center justify-center border border-[#c4c0b8] bg-[#f5f5f5] p-3">
              <Image
                src="/dobonglife-logo.png"
                alt="도봉라이프 로고"
                width={502}
                height={501}
                unoptimized
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#5a6775]">
                Project No.1
              </p>
              <h1 className="mt-4 text-[clamp(38px,6vw,64px)] font-bold leading-tight text-[#111418]">
                도봉라이프 (Dobong Life)
              </h1>
              <p className="mt-4 max-w-[720px] text-xl leading-relaxed text-[#5a6775]">
                서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 설계,
                구축하고 운영 안정성을 개선한 프로젝트입니다.
              </p>
            </div>
          </div>
        </header>

        <section className="mt-12 grid border-y border-[#c4c0b8]">
          {projectMeta.map(([label, value], i) => (
            <div
              key={label}
              className={`grid gap-2 px-7 py-5 md:grid-cols-[160px_1fr] md:items-baseline ${
                i > 0 ? "border-t border-[#c4c0b8]" : ""
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#5a6775]">
                {label}
              </p>
              <p className="text-[15px] font-medium text-[#111418]">{value}</p>
            </div>
          ))}
        </section>

        <section className="py-16">
          <SectionHeading>Overview</SectionHeading>
          <p className="mt-6 max-w-[860px] text-[17px] leading-relaxed text-[#111418]">
            도봉라이프는 서울특별시 도봉구의 지역상권 활성화를 위한 관광 정보
            안내 서비스입니다. 스토리텔링 기반 여행 코스, 맛집 정보, 지역
            소상공인 연계 할인 쿠폰 발행 및 사용 기능을 제공하며, 현재
            플레이스토어와 앱스토어에 출시되어 다운로드 가능한 서비스입니다.
          </p>
        </section>

        <section className="py-16">
          <SectionHeading>Role</SectionHeading>
          <div className="border-b border-[#c4c0b8]">
            {rolePhases.map((phase, i) => (
              <div
                key={phase.label}
                className={`grid gap-5 px-7 py-6 md:grid-cols-[160px_1fr] md:gap-8 ${
                  i > 0 ? "border-t border-[#c4c0b8]" : ""
                }`}
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[2.5px] text-[#5a6775]">
                    {phase.label}
                  </p>
                </div>
                <div className="md:border-l md:border-[#c4c0b8] md:pl-7">
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    {phase.title}
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-relaxed text-[#5a6775]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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

        <section className="py-16">
          <SectionHeading>Skills</SectionHeading>
          <div className="border-b border-[#c4c0b8]">
            {skillGroups.map((group, i) => (
              <div
                key={group.label}
                className={`grid gap-3 px-7 py-5 md:grid-cols-[170px_1fr] md:items-baseline md:gap-8 ${
                  i > 0 ? "border-t border-[#c4c0b8]" : ""
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[2.5px] text-[#5a6775]">
                  {group.label}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  {group.items.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="flex items-center gap-x-3 text-[15px] font-medium text-[#111418]"
                    >
                      {skillIndex > 0 ? (
                        <span className="text-[#c4c0b8]">/</span>
                      ) : null}
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
