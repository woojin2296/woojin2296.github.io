import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ExpandableImage } from "@/app/_components/expandable-image";
import { SkillIcon } from "@/app/_components/skill-icon";

export const metadata = {
  title: "SCH MiniProject Submission System | Lim Woojin Portfolio",
  description: "ML/DL 강의 과제 제출 및 랭킹 관리 시스템",
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

export default function SchMiniProjectPage() {
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
              Project No.3
            </p>
            <h1 className="text-5xl font-black leading-tight text-[#111418]">
              SCH MiniProject Submission System
            </h1>
            <p className="text-lg leading-relaxed text-[#5a6775]">
              ML/DL 강의 프로젝트 과제 제출 및 랭킹 관리 시스템
            </p>
          </div>
          <section className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#5a6775]">
                Period
              </p>
              <p className="text-[15px] font-medium text-[#111418]">
                약 10개월 운영
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#5a6775]">
                Position
              </p>
              <p className="text-[15px] font-medium text-[#111418]">
                순천향대학교 ML/DL 강의 운영 시스템
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#5a6775]">
                Role
              </p>
              <p className="text-[15px] font-medium text-[#111418]">
                Solo Full-stack Developer
              </p>
            </div>
          </section>
        </header>

        <section className="pt-24">
          <ExpandableImage
            src={"/sch-iot-ranking-board.png"}
            alt={"SCH MiniProject Submission System 랭킹 화면"}
            width={1920}
            height={1080}
            unoptimized
            wrapperClassName="mx-auto block w-full"
            className="h-auto w-full object-contain"
          />
        </section>

        <section className="pt-24">
          <SectionHeading>프로젝트 개요</SectionHeading>
          <p className="mt-6 text-[17px] leading-relaxed text-[#111418]">
            학과 ML/DL 강의에서 사용하는 프로젝트 과제 제출 및 랭킹 관리
            시스템을 설계하고 개발했습니다. 학생은 프로젝트 코드와 결과 점수를
            제출하고 자신의 순위를 확인할 수 있으며, 교수자는 관리자 페이지를
            통해 사용자 관리, 점수 관리, 공지 관리, 요청 로그 조회를 수행할 수
            있습니다. 현재 해당 시스템은 약 10개월간 강의 운영에 실제로 사용되고
            있으며, 월 평균 약 40명의 학생이 과제 제출 및 랭킹 조회 기능을
            이용하고 있습니다.
          </p>
        </section>

        <section className="pt-24">
          <SectionHeading>역할</SectionHeading>
          <ul className="mt-6 grid gap-2">
            <li className="text-[17px] leading-relaxed text-[#111418]">
              1인 개발 프로젝트로 전체 시스템 기능 기획
            </li>
            <li className="text-[17px] leading-relaxed text-[#111418]">
              UI/UX 설계, 프론트엔드 및 백엔드 개발
            </li>
            <li className="text-[17px] leading-relaxed text-[#111418]">
              시스템 배포 및 운영
            </li>
          </ul>
        </section>

        <section className="pt-24">
          <SectionHeading>기술 스택</SectionHeading>
          <div className="flex flex-wrap gap-2 py-5">
            <SkillIcon isBlack>Next.js</SkillIcon>
            <SkillIcon isBlack>SQLite</SkillIcon>
            <SkillIcon>Docker Compose</SkillIcon>
          </div>
        </section>

        <section className="pt-16">
          <SectionHeading>주요 성과</SectionHeading>
          <div className="border-b border-[#c4c0b8]">
            <div className="py-6">
              <div className="flex gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    01. 과제 제출 및 평가 프로세스 자동화를 통한 운영 효율 개선
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      과제 제출, 점수 관리, 랭킹 산정, 공지 관리를 통합한 강의
                      운영 시스템 구축
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      과제 평가 및 관리 과정을 자동화하여 강의 운영 효율성과
                      사용자 편의성 개선
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-[#c4c0b8] py-6">
              <div className="flex gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    02. 세션 기반 인증 및 계층형 권한 관리 시스템 구축
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      서버 세션과 HttpOnly 쿠키 기반 인증을 적용해 클라이언트 측
                      토큰 노출 위험 완화
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      사용자와 관리자 권한을 분리한 계층형 인가 구조 구현
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      성적 평가 시스템 특성을 고려하여 보안 중심 설계 적용
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-[#c4c0b8] py-6">
              <div className="flex gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    03. 서비스 운영 추적을 위한 감사 로그 시스템 구축
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      주요 API 요청에 대해 요청자, 경로, 상태 코드, IP를 기록하는
                      로깅 시스템 구축
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      서비스 사용 이력을 추적할 수 있도록 운영 가시성 확보
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      관리자 페이지에서 로그 조회 기능을 제공해 문제 상황 분석
                      및 운영 관리 효율 개선
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-[#c4c0b8] py-6">
              <div className="flex gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    04. 파일 업로드 보안 검증 시스템 구축
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      파일 업로드 과정에서 발생할 수 있는 보안 위협을 고려해 다중
                      검증 로직 설계 및 적용
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      확장자, JSON 구조, null-byte, 경로 정규화 검증을 적용해
                      비정상 업로드와 Path Traversal 위험 완화
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-[#c4c0b8] py-6">
              <div className="flex gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#111418]">
                    05. Docker 기반 실행 환경 통일 및 배포 구조 구축
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      on-premise 환경에서 Docker Compose를 활용해 실행 환경을
                      컨테이너화하고 배포
                    </li>
                    <li className="text-sm leading-relaxed text-[#5a6775]">
                      개발/운영 환경 간 차이를 줄여 환경 의존성 문제를
                      최소화하고 배포 재현성 확보
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
