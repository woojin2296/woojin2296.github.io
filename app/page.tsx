export default function Home() {
  return (
    <div>
      <header className="flex flex-col items-center gap-5 text-center py-7 sm:py-9 px-6 sm:px-10">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#5a6775]">
          Portfolio &mdash; 2026
        </p>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight text-[#111418]">
          WOOJIN LIM
        </h1>
        <p className="text-sm sm:text-base text-[#5a6775] italic leading-relaxed">
          &ldquo;이해하지 못한 코드는 책임질 수 없다.&rdquo;
        </p>
      </header>

      {/* todo: fix hover border make nav height change */}
      <nav className="flex justify-center gap-6 sm:gap-10 py-4 px-6 sm:px-10 border-b border-b-[#c4c0b8] border-t-[3px] border-t-[#111418] flex-wrap">
        {["Projects", "Experience", "Skills", "Awards", "Contact"].map(
          (item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[3px] text-[#111418] font-semibold hover:border-b-[1.5px] hover:border-[#111418]"
            >
              {item}
            </a>
          ),
        )}
      </nav>

      <main className="max-w-[1080px] mx-auto px-6 sm:px-10">
        <section className="pt-20 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#5a6775]">
            DevOps Engineer
          </p>
          <h2 className="text-[clamp(36px,6vw,64px)] font-black leading-[1.1] tracking-tight max-w-[720px] mx-auto my-6 text-[#111418]">
            복잡한 워크플로우를
            <br />
            단순하고 직관적이게
          </h2>
          <p className="text-lg text-[#5a6775] max-w-[560px] mx-auto leading-relaxed">
            프론트엔드부터 벡엔드, 인프라까지 다양한 영역에서의 경험을 바탕으로
            제품의 전체 생명주기를 이해하고 사용자에게 가치를 전달하는 것을
            목표로 합니다.
          </p>
        </section>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr_1px_1fr] border-t-[3px] border-t-[#111418] border-b-[1px] border-b-[#c4c0b8]">
          <div className="py-8 md:px-7">
            <span className="inline-block text-[10px] uppercase tracking-[2px] text-[#5a6775] border border-[#c4c0b8] px-2 py-0.5 mb-3">
              Cloud / Infra
            </span>
            <h3 className="text-lg font-bold text-[#111418] mb-3 leading-snug">
              견고한 인프라 위에
            </h3>
            <p className="text-sm text-[#5a6775] leading-relaxed">
              AWS, Terraform, Docker를 활용해 클라우드 인프라를 설계 및
              구축하고, Public/Private Subnet 분리와 Route Table 설계를 통해
              트래픽 흐름을 정의하며 사용자 요청의 유입부터 내부 서비스까지의
              네트워크 경로를 고려한 아키텍처를 구성합니다.
            </p>
          </div>
          <div className="hidden md:block bg-[#c4c0b8]" />
          <div className="py-8 md:px-7 border-t border-[#d8dde7] md:border-t-0">
            <span className="inline-block text-[10px] uppercase tracking-[2px] text-[#5a6775] border border-[#c4c0b8] px-2 py-0.5 mb-3">
              CI/CD
            </span>
            <h3 className="text-lg font-bold text-[#111418] mb-3 leading-snug">
              끊김 없는 배포를 위해
            </h3>
            <p className="text-sm text-[#5a6775] leading-relaxed">
              GitHub Actions 기반 CI/CD 파이프라인을 구축하고, OIDC + SSM을
              활용한 보안 배포와 self-hosted runner를 통한 On-prem 환경 지원을
              통해 반복적인 배포 작업을 줄이고 개발자의 불편함을 해소합니다.
            </p>
          </div>
          <div className="hidden md:block bg-[#c4c0b8]" />
          <div className="py-8 md:px-7 border-t border-[#d8dde7] md:border-t-0">
            <span className="inline-block text-[10px] uppercase tracking-[2px] text-[#5a6775] border border-[#c4c0b8] px-2 py-0.5 mb-3">
              Full-Stack
            </span>
            <h3 className="text-lg font-bold text-[#111418] mb-3 leading-snug">
              서비스 전체를 이해하며
            </h3>
            <p className="text-sm text-[#5a6775] leading-relaxed">
              다양한 프로젝트 경험을 바탕으로 FE/BE, 네트워크, 시스템까지
              아우르는 서비스 전반의 구조를 이해하고, 전체 흐름과 의존성을
              기반으로 설계하며 복잡한 환경에서도 문제를 빠르게 파악하고
              해결합니다.
            </p>
          </div>
        </section>

        <section
          id="projects"
          className="mt-18 grid grid-cols-1 md:grid-cols-[200px_1px_1fr] border-y-[1px] border-y-[#c4c0b8]"
        >
          <div className="pt-10 md:pr-8 pb-4 md:pb-10">
            <h3 className="text-sm uppercase tracking-[3px] text-[#5a6775] font-semibold">
              Key Projects
            </h3>
          </div>

          <div className="hidden md:block bg-[#c4c0b8]" />

          <div className="flex flex-col">
            <div className="p-7">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold">
                  도봉라이프 (Dobong Life)
                </h3>
                <span className="text-xs px-2.5 py-0.5 border text-[#16a34a] border-[#16a34a]">
                  Live
                </span>
              </div>
              <p className="text-[13px] text-[#999] mb-3">
                (주)유머스트알엔디 | 인턴사원 | 2025.12 — 2026.02 (3m)
              </p>
              <p className="text-[15px] text-[#555] mb-2">
                서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 구축
                및 운영.
              </p>
              <p className="text-sm text-[#666] mb-1">
                - AWS(VPC, EC2, RDS, S3) 기반 서비스 인프라 설계 및 구축
              </p>
              <p className="text-sm text-[#666] mb-1">
                - Terraform을 활용한 IaC로 인프라 재현성 확보
              </p>
              <p className="text-sm text-[#666] mb-1">
                - SSM + GitHub Actions(OIDC) 기반 CI/CD 파이프라인 구축
              </p>
              <p className="text-sm text-[#666] mb-1">
                - CloudWatch 기반 로그 수집/모니터링 환경 구축
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-3 py-1 font-medium bg-[#1a1a1a] text-white border border-[#1a1a1a]">
                  AWS
                </span>
                <span className="text-xs px-3 py-1 font-medium bg-[#1a1a1a] text-white border border-[#1a1a1a]">
                  Terraform
                </span>
                <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                  Docker Compose
                </span>
                <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                  Github Actions
                </span>
                <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                  CloudWatch
                </span>
              </div>
            </div>
            <div className="p-7 border-y-[1px] border-y-[#c4c0b8]">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold">판옵티콘 (Panopticon)</h3>
                <span className="text-xs px-2.5 py-0.5 border text-[#2563eb] border-[#2563eb]">
                  Active
                </span>
              </div>
              <p className="text-[13px] text-[#999] mb-3">
                UBICOMP LAB | 학부연구생 | 2024.07 — 2026.02 (1y 7m)
              </p>
              <p className="text-[15px] text-[#555] mb-2">
                연구실 AI 훈련용 실험 데이터 수집 파이프라인의 관제 및 이상 알림
                시스템.
              </p>
              <p className="text-sm text-[#666] mb-1">
                - Next.js + Spring Boot 기반 풀스택 개발 및 Docker Compose 배포
              </p>
              <p className="text-sm text-[#666] mb-1">
                - GitHub Actions(self-hosted runner) 기반 On-prem CI/CD 구축
              </p>
              <p className="text-sm text-[#666] mb-1">
                - 수집 지연/중단 자동 감지 및 Slack 기반 실시간 알림
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-3 py-1 font-medium bg-[#1a1a1a] text-white border border-[#1a1a1a]">
                  Next.js
                </span>
                <span className="text-xs px-3 py-1 font-medium bg-[#1a1a1a] text-white border border-[#1a1a1a]">
                  Spring Boot
                </span>
                <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                  MySQL
                </span>
                <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                  Docker Compose
                </span>
                <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                  GitHub Actions
                </span>
              </div>
            </div>
            <div className="p-7">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold">
                  SCH MiniProject Submission System
                </h3>
                <span className="text-xs px-2.5 py-0.5 border text-[#2563eb] border-[#2563eb]">
                  Active
                </span>
              </div>
              <p className="text-[13px] text-[#999] mb-3">
                개인 프로젝트 | 2025.06 — 2026.02 (9m)
              </p>
              <p className="text-[15px] text-[#555] mb-2">
                학과 ML/DL 강의에서 사용하는 과제 제출 및 랭킹 관리 시스템. 월
                평균 40명 이용.
              </p>
              <p className="text-sm text-[#666] mb-1">
                - 과제 제출, 평가, 랭킹 관리를 통합한 웹 서비스 설계 및 개발
              </p>
              <p className="text-sm text-[#666] mb-1">
                - 세션 기반 인증 및 계층형 권한 구조, 파일 업로드 검증 로직 구현
              </p>
              <p className="text-sm text-[#666] mb-1">
                - Docker Compose 기반 배포 및 감사 로그 시스템 구축
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-3 py-1 font-medium bg-[#1a1a1a] text-white border border-[#1a1a1a]">
                  Next.js
                </span>
                <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                  SQLite
                </span>
                <span className="text-xs px-3 py-1 font-medium border border-[#ccc] text-[#555]">
                  Docker Compose
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="mt-18 grid grid-cols-1 md:grid-cols-[200px_1px_1fr] border-y-[1px] border-y-[#c4c0b8]"
        >
          <div className="pt-10 md:pr-8 pb-4 md:pb-10">
            <h3 className="text-sm uppercase tracking-[3px] text-[#5a6775] font-semibold">
              Experience
            </h3>
          </div>

          <div className="hidden md:block bg-[#c4c0b8]" />

          <div className="md:pl-8">
            <div className="grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_170px] gap-6 pt-8 pb-9 items-baseline">
              <span className="text-[32px] font-black text-[#c4c0b8] leading-none">
                01
              </span>
              <div>
                <h4 className="text-lg font-bold text-[#111418] mb-1">
                  (주)유머스트알엔디 - 인턴 사원 (DevOps Engineer)
                </h4>
                <p className="text-sm text-[#5a6775]">
                  도봉라이프 AWS 인프라 구축 및 운영 · X-ray 치료기기 GUI 개발
                </p>
              </div>
              <span className="hidden md:block text-sm text-[#5a6775] text-right">
                2025.09 ~ 2026.02 (6m)
              </span>
            </div>

            <div className="grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_170px] gap-6 pt-8 pb-9  border-t border-[#c4c0b8] items-baseline">
              <span className="text-[32px] font-black text-[#c4c0b8] leading-none">
                02
              </span>
              <div>
                <h4 className="text-lg font-bold text-[#111418] mb-1">
                  UBICOMP LAB - 학부연구생
                </h4>
                <p className="text-sm text-[#5a6775]">
                  판옵티콘 개발 · ROS 기반 PCD 수집 · KCC2025 논문 게재
                </p>
              </div>
              <span className="hidden md:block text-sm text-[#5a6775] text-right">
                2024.01 ~ 2026.02 (2y)
              </span>
            </div>

            <details className="border-t border-[#c4c0b8] group">
              <summary className="flex justify-center items-center py-4 cursor-pointer [list-style:none] [&::-webkit-details-marker]:hidden">
                <span className="text-xs uppercase tracking-[2px] text-[#5a6775] group-open:hidden">
                  +3 more
                </span>
                <svg
                  className="w-4 h-4 text-[#5a6775] transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <div className="grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_170px] gap-6 pt-8 pb-9 border-t border-[#c4c0b8] items-baseline ">
                <span className="text-[32px] font-black text-[#c4c0b8] leading-none">
                  03
                </span>
                <div>
                  <h4 className="text-lg font-bold text-[#111418] mb-1">
                    순천향대학교 - 수업 조교 6회
                  </h4>
                  <p className="text-sm text-[#5a6775]">
                    IoT 플랫폼 (24-1 25-1) · 임베디드 시스템 (24-2, 25-2) <br />
                    나만의 게임만들기 (24-1) · 웹페이지 제작의 실제 (24-2)
                  </p>
                </div>
                <span className="hidden md:block text-sm text-[#5a6775] text-right">
                  2024.01 ~ 2025.12
                </span>
              </div>

              <div className="grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_170px] gap-6 pt-8 pb-9 border-t border-[#c4c0b8] items-baseline">
                <span className="text-[32px] font-black text-[#c4c0b8] leading-none">
                  04
                </span>
                <div>
                  <h4 className="text-lg font-bold text-[#111418] mb-1">
                    해커톤 참여 3회
                  </h4>
                  <p className="text-sm text-[#5a6775]">
                    2024 캡스톤디자인 및 AI 해커톤 · 2025 캡스톤디자인 및 AI
                    해커톤 <br />
                    2025 대한민국 해커톤
                  </p>
                </div>
                <span className="hidden md:block text-sm text-[#5a6775] text-right">
                  2024.01 ~ 2025.12
                </span>
              </div>

              <div className="grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_170px] gap-6 pt-8 pb-9 border-t border-[#c4c0b8] items-baseline">
                <span className="text-[32px] font-black text-[#c4c0b8] leading-none">
                  05
                </span>
                <div>
                  <h4 className="text-lg font-bold text-[#111418] mb-1">
                    멘토링 프로그램 멘토 참여 2회
                  </h4>
                  <p className="text-sm text-[#5a6775]">
                    2024 순천향 AI·SW 창의한마당 · 2025 SW 학습멘토링(머신러닝)
                  </p>
                </div>
                <span className="hidden md:block text-sm text-[#5a6775] text-right">
                  2024.01 ~ 2025.12
                </span>
              </div>
            </details>
          </div>
        </section>

        {/* ━━ Awards ━━ */}
        <div
          id="awards"
          className="mt-18 grid grid-cols-1 md:grid-cols-[200px_1px_1fr] border-y-[1px] border-y-[#c4c0b8]"
        >
          <div className="pt-10 md:pr-8 pb-4 md:pb-10">
            <h3 className="text-sm uppercase tracking-[3px] text-[#5a6775] font-semibold">
              Awards
            </h3>
          </div>
          <div className="hidden md:block bg-[#d8dde7]" />
          <div className="md:pl-8">
            {[
              {
                grade: "최우수상",
                gold: true,
                date: "2024.11",
                title: "SW융합대학 학술제 (E-Sports 개발)",
                desc: "캐주얼 리듬게임 - 탭 스페이스 (Tab Space)",
              },
              {
                grade: "장려상",
                gold: false,
                date: "2025.11",
                title: "2025 SCHU AI SW Festival",
                desc: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)",
              },
              {
                grade: "장려상",
                gold: false,
                date: "2025.11",
                title: "2025 캡스톤 디자인 및 AI 해커톤",
                desc: "장소에 맞는 음악 생성 서비스 - 카라멜 (Caramel)",
              },
              {
                grade: "장려상",
                gold: false,
                date: "2025.08",
                title: "2025 글로벌 캡스톤디자인 경진대회",
                desc: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)",
              },
              {
                grade: "장려상",
                gold: false,
                date: "2024.10",
                title: "2024 캡스톤디자인 및 AI 해커톤",
                desc: "입법 현황 실시간 분석 시스템 - 라다온 (LawDaon)",
              },
            ].map((award, i) => (
              <div
                key={i}
                className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-6 py-4 border-b border-[#d8dde7] last:border-0 items-center"
              >
                <div className="text-center">
                  <p
                    className={`text-sm font-extrabold ${
                      award.gold ? "text-[#92400e]" : "text-[#111418]"
                    }`}
                  >
                    {award.grade}
                  </p>
                  <p className="text-[11px] text-[#5a6775]">{award.date}</p>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#111418] mb-0.5">
                    {award.title}
                  </h4>
                  <p className="text-sm text-[#5a6775]">{award.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ━━ Skills ━━ */}
        <section
          id="skills"
          className="mt-18 grid grid-cols-1 md:grid-cols-[200px_1px_1fr] border-y-[1px] border-y-[#c4c0b8]"
        >
          <div className="pt-10 md:pr-8 pb-4 md:pb-10">
            <h3 className="text-sm uppercase tracking-[3px] text-[#5a6775] font-semibold">
              Skills
            </h3>
          </div>

          <div className="hidden md:block bg-[#c4c0b8]" />

          <div className="md:pl-8">
            {[
              {
                category: "Cloud / Infra",
                items: ["AWS", "Terraform", "Docker", "Linux"],
              },
              {
                category: "CI/CD",
                items: ["Git", "GitHub Actions"],
              },
              {
                category: "Backend",
                items: ["Spring Boot", "Java", "MySQL"],
              },
              {
                category: "Frontend",
                items: ["Next.js", "TypeScript", "Python"],
              },
            ].map((group, i) => (
              <div
                key={group.category}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-6 ${
                  i > 0 ? "border-t border-[#d8dde7]" : ""
                }`}
              >
                <span className="text-sm font-bold text-[#111418] w-[140px] shrink-0">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 font-medium border border-[#c4c0b8] text-[#111418]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ━━ About ━━ */}
        <section className="mt-18 grid grid-cols-1 md:grid-cols-[200px_1px_1fr] border-y-[1px] border-y-[#c4c0b8]">
          <div className="pt-10 md:pr-8 pb-4 md:pb-10">
            <h3 className="text-sm uppercase tracking-[3px] text-[#5a6775] font-semibold">
              About
            </h3>
          </div>

          <div className="hidden md:block bg-[#c4c0b8]" />

          <div className="md:pl-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
              {[
                {
                  label: "Education",
                  main: "순천향대학교 사물인터넷학과",
                  sub: "졸업예정 · 2020.03 — 2026.08 · 평점 4.22 / 4.5",
                },
                {
                  label: "Publication",
                  main: "KCC2025 학부생 논문 게재",
                  sub: "한국컴퓨터종합학술대회",
                },
                {
                  label: "Language",
                  main: "TOEIC 810",
                  sub: "2025.11 취득",
                },
                {
                  label: "Military",
                  main: "육군 병장 만기 전역",
                  sub: "MW 통신병 · 2022.05 — 2023.11",
                },
              ].map((item) => (
                <div key={item.label} className="py-3 border-[#d8dde7]">
                  <p className="text-[10px] uppercase tracking-[2px] text-[#5a6775] font-bold mb-2">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-[#111418]">
                    {item.main}
                  </p>
                  <p className="text-xs text-[#5a6775] mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━ Contact ━━ */}
        <section
          id="contact"
          className="mt-18 grid grid-cols-1 md:grid-cols-[200px_1px_1fr] border-y-[1px] border-y-[#c4c0b8]"
        >
          <div className="pt-10 md:pr-8 pb-4 md:pb-10">
            <h3 className="text-sm uppercase tracking-[3px] text-[#5a6775] font-semibold">
              Contact
            </h3>
          </div>

          <div className="hidden md:block bg-[#c4c0b8]" />

          <div className="md:pl-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              {[
                {
                  key: "Phone",
                  val: "010-2296-1280",
                  href: "tel:010-2296-1280",
                },
                {
                  key: "Email",
                  val: "woojin2296@gmail.com",
                  href: "mailto:woojin2296@gmail.com",
                },
                {
                  key: "GitHub",
                  val: "github.com/woojin2296",
                  href: "https://github.com/woojin2296",
                },
                {
                  key: "Tech Blog",
                  val: "velog.io/@talking_tomato",
                  href: "https://velog.io/@talking_tomato",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="py-3"
                >
                  <p className="text-[10px] uppercase tracking-[2px] text-[#5a6775] mb-1">
                    {item.key}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[15px] font-semibold text-[#111418] pb-px"
                  >
                    {item.val}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━ Footer ━━ */}
        <div className="py-8 text-center">
          <div className="flex justify-center gap-8 mb-4">
            {[
              { label: "Email", href: "mailto:woojin2296@gmail.com" },
              { label: "GitHub", href: "https://github.com/woojin2296" },
              {
                label: "Blog",
                href: "https://velog.io/@talking_tomato",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] uppercase tracking-[2px] text-[#5a6775] hover:text-[#111418]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-[#d8dde7]">
            &copy; 2026 임우진 (Woojin Lim) &mdash; All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
