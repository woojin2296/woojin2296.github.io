export default function Home() {
  return (
    <main className="flex mx-auto max-w-3xl px-12 flex-col mt-14 pb-28">
      <section>
        <div className="flex items-center gap-4 mb-4">
          <p className="text-sm text-[#5a6775] uppercase tracking-[0.25em] min-w-max">
            Project Archive
          </p>
          <div className="my-8 h-px bg-[#d8dde7] w-full" />
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
            Key Projects
          </h2>
          <a
            href="/project"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#66758f] hover:text-[#45546d]"
          >
            Show more
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="mt-2 mb-4 h-px bg-[#d8dde7] w-full" />
        <div className="grid gap-10">
          <article className="grid gap-1">
            <div>
              <p className="text-2xl font-semibold text-[#111418]">
                도봉라이프(Dobong Life) - AWS 인프라 구축 및 운영
              </p>
              <p className="text-sm text-[#5a6775]">
                (주)유머스트알엔디 | 인턴사원 | 2025.12 ~ 2026.02 (3m)
              </p>
              <p className="text-lg font-semibold mt-4">프로젝트 개요</p>
              <p className="mt-2">
                서울시 도봉구 지역상권 활성화 애플리케이션 도봉라이프의 AWS
                인프라를 구축 및 운영하였습니다.
              </p>
              <p className="text-lg font-semibold mt-4">주요 성과</p>
              <p className="mt-2 text-[#5a6775]">
                - AWS(VPC, EC2, RDS, S3 등) 기반 서비스 인프라 설계 및 구축
              </p>
              <p className="mt-1 text-[#5a6775]">
                - Terraform을 활용한 IaC로 인프라 재현성 확보
              </p>
              <p className="mt-1 text-[#5a6775]">
                - SSM + GitHub Actions(OIDC) 기반 CI/CD 파이프라인 구축 및 SSH
                제거
              </p>
              <p className="mt-1 text-[#5a6775]">
                - CloudWatch 기반 로그 수집/모니터링 환경 구축
              </p>
              <p className="text-lg font-semibold mt-4">기술 스택</p>
              <p className="mt-1 text-[#5a6775]">
                - AWS(VPC, EC2, RDS, S3, NAT Gateway, Security Group, Route53,
                ElatiCache)
              </p>
              <p className="mt-1 text-[#5a6775]">
                - TerraForm, Docker Compose, GitHub Actions, AWS CloudWatch, AWS
                SSM, Nginx
              </p>
            </div>
          </article>
          <article className="grid gap-1">
            <div>
              <p className="text-2xl font-semibold text-[#111418]">
                판옵티콘 - 장애 감지 및 관제 시스템 개발
              </p>
              <p className="text-sm text-[#5a6775]">
                UBICOMP LAB | 학부연구생 | 2024.07 ~ 2026.02 (1y 7m)
              </p>
              <p className="text-lg font-semibold mt-4">프로젝트 개요</p>
              <p className="mt-2">
                연구실 AI 훈련용 실험 데이터 수집 파이프라인의 관제 및 이상 알림
                시스템을 개발하였습니다.
              </p>
              <p className="mt-1">
                현재 연구 과제에 1년 6개월 이상 적용되어, 데이터 파이프라인의
                안정적 운영과 장애 대응에 활용 중입니다.
              </p>
              <p className="text-lg font-semibold mt-4">주요 성과</p>
              <p className="mt-2 text-[#5a6775]">
                - Next.js + Spring Boot 기반 풀스택 개발 및 Docker Compose를
                활용한 배포
              </p>
              <p className="mt-1 text-[#5a6775]">
                - GitHub Actions(self-hosted runner) 기반 CI/CD 구축으로 On-prem
                환경에서도 안정적 배포 구조 구현
              </p>
              <p className="mt-1 text-[#5a6775]">
                - 데이터 수집 파이프라인 관제 및 이상 알림 시스템 설계·개발
              </p>
              <p className="mt-1 text-[#5a6775]">
                - 수집 지연·중단 자동 감지 로직 및 Slack 기반 실시간 알림
              </p>
              <p className="mt-1 text-[#5a6775]">
                - 리포트 자동화를 통해 장애 대응 속도 및 운영 효율 개선
              </p>
              <p className="text-lg font-semibold mt-4">기술 스택</p>
              <p className="mt-1 text-[#5a6775]">
                - Next.js, Spring Boot, MySQL
              </p>
              <p className="mt-1 text-[#5a6775]">
                - Docker Compose, GitHub Actions (self-hosted runner)
              </p>
            </div>
          </article>
          <article className="grid gap-1">
            <div>
              <p className="text-2xl font-semibold text-[#111418]">
                SCH-MiniProject-Submission-System
              </p>
              <p className="text-sm text-[#5a6775]">
                개인 프로젝트 | 2025.06 ~ 2026.02 (9m)
              </p>
              <p className="text-lg font-semibold mt-4">프로젝트 개요</p>
              <p className="mt-2">
                학과 ML/DL 강의에서 사용하는 프로젝트 과제 제출 및 랭킹 관리
                시스템을 설계하고 개발하였습니다.
              </p>
              <p className="mt-1">
                현재 2학기 간 강의 운영에 실제로 사용되고 있으며 월 평균 약
                40명의 학생이 서비스를 이용하고 있습니다.
              </p>
              <p className="text-lg font-semibold mt-4">주요 성과</p>
              <p className="mt-2 text-[#5a6775]">
                - 과제 제출, 평가, 랭킹 관리를 통합한 웹 서비스 설계 및 개발
              </p>
              <p className="mt-1 text-[#5a6775]">
                - 세션 기반 인증 및 계층형 권한 구조, 파일 업로드 검증 로직
                구현으로 서비스 보안 강화
              </p>
              <p className="mt-1 text-[#5a6775]">
                - Docker Compose 기반 배포 환경 구성 및 감사 로그 시스템
                구축으로 운영 가시성 및 안정성 확보
              </p>
              <p className="text-lg font-semibold mt-4">기술 스택</p>
              <p className="mt-1 text-[#5a6775]">
                - Next.js, SQLite, Docker Compose
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          Award
        </h2>
        <div className="mt-2 mb-4 h-px bg-[#d8dde7] w-full" />
        <ul className="mt-4 grid gap-2">
          <li className="grid gap-1 pb-3 sm:grid-cols-[90px_1fr]">
            <div className="flex flex-col items-start gap-2">
              <span className="inline-flex text-sm font-semibold tracking-wide">
                장려상
              </span>
              <span className="text-sm text-[#5a6775]">2025.11</span>
            </div>
            <div>
              <p className="text-[#111418]">
                2025 SCHU AI SW Festival SW 프로젝트 경진대회 | 순천향대학교 SW융합대학
              </p>
              <p className="text-[#4f5a6a]">
                AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)
              </p>
            </div>
          </li>
          <li className="grid gap-1 pb-3 sm:grid-cols-[90px_1fr]">
            <div className="flex flex-col items-start gap-2">
              <span className="inline-flex text-sm font-semibold tracking-wide">
                장려상
              </span>
              <span className="text-sm text-[#5a6775]">2025.11</span>
            </div>
            <div>
              <p className="text-[#111418]">
                2025 캡스톤 디자인 및 AI 해커톤 경진대회 | 한국컴퓨터교육학회
              </p>
              <p className="text-[#4f5a6a]">
                장소에 맞는 음악 생성 서비스 - 카라멜 (Caramel)
              </p>
            </div>
          </li>
          <li className="grid gap-1 pb-3 sm:grid-cols-[90px_1fr]">
            <div className="flex flex-col items-start gap-2">
              <span className="inline-flex text-sm font-semibold tracking-wide">
                장려상
              </span>
              <span className="text-sm text-[#5a6775]">2025.08</span>
            </div>
            <div>
              <p className="text-[#111418]">
                2025학년도 글로벌 캡스톤디자인 경진대회 | 대한민국교육부 &amp; 충남 RISE 센터
              </p>
              <p className="text-[#4f5a6a]">
                AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)
              </p>
            </div>
          </li>
          <li className="grid gap-1 pb-3 sm:grid-cols-[90px_1fr]">
            <div className="flex flex-col items-start gap-2">
              <span className="inline-flex text-sm font-semibold tracking-wide">
                최우수상
              </span>
              <span className="text-sm text-[#5a6775]">2024.11</span>
            </div>
            <div>
              <p className="text-[#111418]">
                2024년 제1회 SW융합대학 학술제(E-Sports 개발) | 순천향대학고 SW융합대학
              </p>
              <p className="text-[#4f5a6a]">
                캐주얼 리듬게임 - 탭 스페이스 (Tab Space)
              </p>
            </div>
          </li>
          <li className="grid gap-1 pb-3 sm:grid-cols-[90px_1fr]">
            <div className="flex flex-col items-start gap-2">
              <span className="inline-flex text-sm font-semibold tracking-wide">
                장려상
              </span>
              <span className="text-sm text-[#5a6775]">2024.10</span>
            </div>
            <div>
              <p className="text-[#111418]">
                2024 캡스톤디자인 및 AI 해커톤 경진대회 | 한국컴퓨터교육학회
              </p>
              <p className="text-[#4f5a6a]">
                입법 현황 실시간 분석 시스템 - 라다온 (LawDaon)
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          Languages
        </h2>
        <div className="mt-2 mb-4 h-px bg-[#d8dde7] w-full" />
        <div className="grid gap-1">
          <p className="text-[#111418]">영어 : TOEIC 810 (LC 430 / RC 480)</p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-[#5a6775]">2025.11.09 취득</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          Military Service
        </h2>
        <div className="my-4 h-px bg-[#d8dde7] w-full" />
        <div className="grid gap-1 pb-2">
          <p className="text-[#111418]">군필 : 육군 병장 만기 전역</p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-[#5a6775]">2022.05 ~ 2023.11</p>
            <p className="text-[#4f5a6a]">MW 통신병</p>
          </div>
        </div>
      </section>
    </main>
  );
}
