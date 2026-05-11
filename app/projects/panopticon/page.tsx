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
      <h2 className="text-xl font-semibold uppercase leading-none tracking-[2.5px] text-[#111418]">
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

export default function PanopticonPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <main className="mx-auto max-w-[1080px] px-6 pt-10 pb-28 sm:px-10 lg:px-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#5a6775] transition-colors hover:text-[#111418]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          돌아가기
        </Link>

        <header className="flex flex-col gap-8 mt-16">
          <div className="flex flex-col gap-4">
            <p className="text-base uppercase tracking-[0.35em] text-[#5a6775]">
              판옵티콘 · Panopticon
            </p>
            <h1 className="text-4xl font-black leading-tight text-[#111418]">
              데이터 수집 파이프라인 관제 시스템 개발
            </h1>
            <p className="text-base leading-relaxed text-[#5a6775]">
              연구실 AI 훈련용 실험 데이터 수집 파이프라인의 실시간 관제 및 이상
              알림 시스템 개발 및 운영
            </p>
          </div>
          <section className="flex gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[#5a6775]">
                Period
              </p>
              <p className="text-[15px] font-medium text-[#111418]">
                2024.07 ~ 2026.02 (1년 8개월)
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[#5a6775]">
                Position
              </p>
              <p className="text-[15px] font-medium text-[#111418]">
                순천향대학교 UBICOMP LAB / 학부연구생
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-[#5a6775]">
                Role
              </p>
              <p className="text-[15px] font-medium text-[#111418]">
                Full-stack Developer
              </p>
            </div>
          </section>
        </header>

        {/* <section className="pt-16">
          <img
            src="/panopticon-summary.webp"
            alt="판옵티콘 시스템 표지"
            width={1200}
            height={675}
            className="block h-auto w-full object-contain"
          />
        </section> */}

        <section className="pt-16">
          <SectionHeading>프로젝트 개요</SectionHeading>
          <p className="mt-4 text-[17px] leading-relaxed text-[#111418]">
            순천향대학교 UBICOMP LAB에서 운영 중인 AI 학습용 실험 데이터 수집
            파이프라인의 통합 관제 및 이상 감지 시스템입니다. 센서 및 수집 장치
            상태, 서버 리소스, 데이터 수집 흐름과 품질 지표를 통합적으로
            모니터링하며, 이상 징후 발생 시 실시간 알림과 로그 기반 추적 기능을
            제공합니다. 해당 시스템은 연구 과제 환경에 약 1년 6개월 이상 실제
            운영 중이며, AI 데이터 수집 파이프라인의 안정성 확보와 운영 자동화,
            장애 대응 시간 단축에 활용되고 있습니다.
          </p>
        </section>

        <section className="pt-16">
          <SectionHeading>역할</SectionHeading>
          <p className="mt-4 text-[17px] leading-relaxed text-[#111418]">
            - 팀장으로서 전체 시스템 기능 기획 및 아키텍처 설계 <br />
            - DB 설계 및 백엔드 개발 <br />
            - UI/UX 설계 및 프론트엔드 개발 <br />- 시스템 배포 및 운영, CI/CD
          </p>
        </section>

        <section className="pt-16">
          <SectionHeading>기술 스택</SectionHeading>
          <div className="flex flex-wrap gap-2 py-5">
            <SkillIcon isBlack>Next.js</SkillIcon>
            <SkillIcon isBlack>Spring Boot</SkillIcon>
            <SkillIcon isBlack>MySQL</SkillIcon>
            <SkillIcon>Docker Compose</SkillIcon>
            <SkillIcon>Github Actions</SkillIcon>
            <SkillIcon>Self-hosted Runner</SkillIcon>
          </div>
        </section>

        <section className="py-16">
          <SectionHeading>아키텍처</SectionHeading>
          <ExpandableImage
            src={"/panopticon-arch.webp"}
            alt={"판옵티콘 시스템 아키텍처 다이어그램"}
            width={1153}
            height={867}
            unoptimized
            wrapperClassName="mx-auto block w-full"
            className="h-auto w-full object-contain"
          />
        </section>

        <section className="pt-16">
          <SectionHeading>주요 성과</SectionHeading>
          <div className="border-b border-[#c4c0b8]">
            <div className="py-6">
              <div className="flex gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    01. 통합 관제 대시보드를 통한 모니터링 시스템 구현
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      장치 상태, 장애 여부, 데이터 수집 이력을 대시보드에서 통합
                      관리할 수 있도록 설계 및 구현
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      실시간 로그 및 장애 모니터링과 데이터 조회 기능을 제공하여
                      운영 상태를 직관적으로 파악 가능하도록 개선
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      분산되어 있던 정보들을 통합하여 운영자가 빠르게 이상
                      상황을 인지할 수 있는 환경 구축
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-[#c4c0b8] py-6">
              <div className="flex gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    02. 데이터 조회 및 분석 기능을 통한 운영 효율 개선
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      실시간 및 과거 데이터를 시각화 기반으로 조회할 수 있는
                      기능 구현
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      최근 1주일 데이터 및 기간 지정 조회 기능을 통해 이상 패턴
                      및 추세 분석 가능
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      CSV 다운로드 기능을 제공하여 외부 분석 및 데이터 활용성
                      향상
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-[#c4c0b8] py-6">
              <div className="flex gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    03. 데이터 수집 파이프라인 장애 자동 감지 시스템 구축
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      1분 단위 데이터 수집 주기 준수 여부를 기반으로 수집 지연
                      및 중단을 자동 감지
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      장치 상태, 서버 응답 상태를 종합적으로 판단하여 장애
                      상황을 실시간 판별
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      수동 점검에 의존하던 운영 방식에서 벗어나 자동화된 장애
                      탐지 체계 구축
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-[#c4c0b8] py-6">
              <div className="flex gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    04. 실시간 알림 및 리포트 자동화를 통한 대응 속도 향상
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      장애 발생 시 Slack을 통한 실시간 알림 시스템 구축
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      결측치, 데이터 분산 등의 데이터 품질 지표를 기반으로 이상
                      데이터 자동 탐지
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      일간/주간 리포트 자동 생성 및 발송 기능을 통해 운영 점검
                      업무 자동화 및 반복 작업 감소
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-[#c4c0b8] py-6">
              <div className="flex gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    05. 운영 환경 제약을 고려한 배포 자동화 구조 구축
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      Github Actions를 사용한 CI/CD 파이프라인 구축
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      외부 SSH 접근이 불가능한 on-premise 내부망 환경에서
                      self-hosted runner 기반 CD 파이프라인을 설계 및 구축
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      애플리케이션 빌드 및 컨테이너 배포 과정을 자동화하여 수동
                      배포 제거 및 배포 안정성 확보
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      Docker Compose 기반으로 서비스들을 컨테이너화하여 환경
                      의존성 없이 일관된 배포 및 운영 환경 확보
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      제한된 인프라 환경에서도 지속적인 배포 및 운영이 가능한
                      구조 구현
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
