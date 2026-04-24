const skills = [
  { idx: "01", name: "Cloud / Infrastructure", techs: "AWS, Terraform, Docker, Linux" },
  { idx: "02", name: "Platform / CI", techs: "Git, GitHub Actions" },
  { idx: "03", name: "Backend", techs: "Spring Boot, Java, MySQL" },
  { idx: "04", name: "Frontend", techs: "Next.js, TypeScript, JavaScript, Python" },
];

const projects = [
  {
    name: "도봉라이프",
    type: "AWS 인프라 구축 및 운영",
    year: "2025.12 ~",
    desc: "(주)유머스트알엔디 | 인턴사원 | 3개월\n서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 구축 및 운영.",
    achievements: [
      "AWS(VPC, EC2, RDS, S3) 기반 서비스 인프라 설계 및 구축",
      "Terraform을 활용한 IaC로 인프라 재현성 확보",
      "SSM + GitHub Actions(OIDC) 기반 CI/CD 파이프라인 구축 및 SSH 제거",
      "CloudWatch 기반 로그 수집/모니터링 환경 구축",
    ],
    techs: ["AWS", "Terraform", "Docker Compose", "GitHub Actions", "CloudWatch", "Nginx"],
    open: true,
  },
  {
    name: "판옵티콘",
    type: "장애 감지 및 관제 시스템",
    year: "2024.07 ~",
    desc: "UBICOMP LAB | 학부연구생 | 1년 7개월\n연구실 AI 훈련용 실험 데이터 수집 파이프라인의 관제 및 이상 알림 시스템.",
    achievements: [
      "Next.js + Spring Boot 기반 풀스택 개발 및 Docker Compose 배포",
      "GitHub Actions(self-hosted runner) 기반 On-prem CI/CD 구축",
      "수집 지연/중단 자동 감지 및 Slack 기반 실시간 알림",
      "리포트 자동화를 통해 장애 대응 속도 및 운영 효율 개선",
    ],
    techs: ["Next.js", "Spring Boot", "MySQL", "Docker Compose", "GitHub Actions"],
    open: false,
  },
  {
    name: "과제 제출 시스템",
    type: "ML/DL 랭킹 시스템",
    year: "2025.06 ~",
    desc: "개인 프로젝트 | 9개월\n학과 ML/DL 강의에서 사용하는 과제 제출 및 랭킹 관리 시스템. 월 평균 40명 이용.",
    achievements: [
      "과제 제출, 평가, 랭킹 관리를 통합한 웹 서비스 설계 및 개발",
      "세션 기반 인증 및 계층형 권한 구조, 파일 업로드 검증 로직 구현",
      "Docker Compose 기반 배포 및 감사 로그 시스템 구축",
    ],
    techs: ["Next.js", "SQLite", "Docker Compose"],
    open: false,
  },
];

const experiences = [
  { period: "2025.09 — 02", title: "인턴 사원 (DevOps Engineer)", desc: "도봉라이프 AWS 인프라 구축 및 운영 / X-ray 치료기기 GUI 개발", location: "(주)유머스트알엔디" },
  { period: "2024.01 — 26.02", title: "학부연구생 (랩장)", desc: "판옵티콘 개발 / ROS 기반 PCD 수집 파이프라인 / KCC2025 논문 게재", location: "UBICOMP LAB" },
  { period: "2022.05 — 23.11", title: "육군 병장 만기 전역", desc: "MW 통신병", location: "대한민국 육군" },
  { period: "2020.03 — 26.08", title: "순천향대학교 사물인터넷학과", desc: "졸업예정 | 평점 4.22/4.5", location: "아산, 충남" },
];

const awards = [
  { grade: "최우수상", gold: true, title: "2024 제1회 SW융합대학 학술제 (E-Sports 개발)", desc: "캐주얼 리듬게임 - 탭 스페이스 (Tab Space)", date: "2024.11" },
  { grade: "장려상", gold: false, title: "2025 SCHU AI SW Festival", desc: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)", date: "2025.11" },
  { grade: "장려상", gold: false, title: "2025 캡스톤 디자인 및 AI 해커톤", desc: "장소에 맞는 음악 생성 서비스 - 카라멜 (Caramel)", date: "2025.11" },
  { grade: "장려상", gold: false, title: "2025 글로벌 캡스톤디자인 경진대회", desc: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)", date: "2025.08" },
  { grade: "장려상", gold: false, title: "2024 캡스톤디자인 및 AI 해커톤", desc: "입법 현황 실시간 분석 시스템 - 라다온 (LawDaon)", date: "2024.10" },
];

const tickerItems = ["AWS", "Terraform", "Docker", "GitHub Actions", "Spring Boot", "Next.js", "Java", "TypeScript", "MySQL", "Linux"];

export default function Design2() {
  return (
    <div id="top" className="min-h-screen bg-[#0e0e0e] text-[#e8e8e8] leading-relaxed antialiased">
      {/* ━━ Ticker keyframes ━━ */}
      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .outline-text { -webkit-text-stroke: 1.5px #e8e8e8; color: transparent; }
      `}</style>

      {/* ━━ Top Bar ━━ */}
      <div className="flex justify-between items-center px-6 md:px-12 py-5 sticky top-0 bg-[#0e0e0e] z-50 border-b border-[#2a2a2a]">
        <span className="text-sm font-bold tracking-[4px] uppercase">WJL</span>
        <nav className="flex gap-4 md:gap-8">
          {["About", "Projects", "Career", "Awards", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs text-[#666] uppercase tracking-[2px] hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* ━━ Hero ━━ */}
      <div className="pt-[120px] pb-20 px-6 md:px-12">
        <p className="text-[11px] uppercase tracking-[4px] text-[#666] mb-6">
          DevOps Engineer &mdash; Seoul, KR
        </p>
        <h1 className="text-[clamp(48px,8vw,96px)] font-extrabold leading-[1.05] tracking-tighter mb-8">
          Build infra
          <br />
          that <span className="outline-text">scales</span>.
        </h1>
        <p className="text-lg text-[#666] max-w-[540px] leading-relaxed">
          서비스 전체를 이해하고 유연한 구조를 설계하는 엔지니어 임우진입니다.
          기술 스택에 얽매이기보다 문제와 개념을 먼저 이해하고, 해결에 가장 적절한
          기술을 빠르게 학습하고 적용합니다.
        </p>
      </div>

      {/* ━━ Ticker ━━ */}
      <div
        className="overflow-hidden whitespace-nowrap py-5 border-y border-[#2a2a2a]"
        aria-hidden="true"
      >
        <div
          className="inline-block"
          style={{ animation: "ticker 30s linear infinite" }}
        >
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span
              key={i}
              className="text-[13px] uppercase tracking-[3px] text-[#666] mr-12"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ━━ Big Numbers ━━ */}
      <div className="px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { value: "3", desc: "Key Projects" },
            { value: "5", desc: "Awards" },
            { value: "40", desc: "Monthly Users" },
            { value: "4.22", desc: "GPA / 4.5" },
          ].map((item, i, arr) => (
            <div
              key={item.desc}
              className={`py-8 md:py-12 px-4 md:px-8 ${i < arr.length - 1 ? "md:border-r md:border-[#2a2a2a]" : ""} ${i < 2 ? "border-b md:border-b-0 border-[#2a2a2a]" : ""}`}
            >
              <p className="text-[56px] font-extrabold tracking-tighter leading-none mb-2">
                {item.value}
              </p>
              <p className="text-[13px] text-[#666] uppercase tracking-wider">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-[#2a2a2a]" />

      {/* ━━ About ━━ */}
      <div id="about" className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-baseline pt-12 pb-8">
          <h2 className="text-[11px] uppercase tracking-[4px] text-[#666] font-semibold">
            About
          </h2>
          <span className="text-xs text-[#666] font-mono">01</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pb-12">
          <p className="text-[15px] text-[#666] leading-relaxed">
            <strong className="text-[#e8e8e8] font-semibold">
              FE와 BE를 포함해 네트워크, 시스템, 하드웨어, ML/DL
            </strong>{" "}
            등 다양한 영역의 프로젝트 경험을 바탕으로 서비스 전체를 이해하고
            구조와 흐름을 고려하는 개발자로 성장하고 있습니다.
          </p>
          <p className="text-[15px] text-[#666] leading-relaxed">
            연구실과 여러 프로젝트에서{" "}
            <strong className="text-[#e8e8e8] font-semibold">
              랩장과 팀장을 맡아 팀의 소통과 협업을 이끌어왔으며
            </strong>
            , 실제 운영 중인 시스템과 40 MAU 규모의 서비스를 개발하고 운영한
            경험이 있습니다.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="my-16 h-px bg-[#2a2a2a]" />
      </div>

      {/* ━━ Skills ━━ */}
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-baseline pt-12 pb-8">
          <h2 className="text-[11px] uppercase tracking-[4px] text-[#666] font-semibold">
            Skills
          </h2>
          <span className="text-xs text-[#666] font-mono">02</span>
        </div>

        {skills.map((skill, i) => (
          <div
            key={skill.idx}
            className={`grid grid-cols-[40px_1fr_auto] md:grid-cols-[60px_1fr_auto] items-baseline py-7 border-b border-[#2a2a2a] gap-4 md:gap-8 group ${i === 0 ? "border-t" : ""}`}
          >
            <span className="text-xs text-[#333] font-mono">{skill.idx}</span>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-white transition-colors">
              {skill.name}
            </h3>
            <span className="text-sm text-[#333] group-hover:text-white group-hover:translate-x-1 transition-all hidden sm:block">
              {skill.techs}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="my-16 h-px bg-[#2a2a2a]" />
      </div>

      {/* ━━ Key Projects ━━ */}
      <div id="projects" className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-baseline pt-12 pb-8">
          <h2 className="text-[11px] uppercase tracking-[4px] text-[#666] font-semibold">
            Key Projects
          </h2>
          <span className="text-xs text-[#666] font-mono">03</span>
        </div>

        {projects.map((proj, i) => (
          <details
            key={proj.name}
            open={proj.open}
            className={`border-b border-[#2a2a2a] ${i === 0 ? "border-t" : ""}`}
          >
            <summary className="grid grid-cols-[1fr_auto] md:grid-cols-[240px_1fr_auto] items-baseline py-6 cursor-pointer [list-style:none] [&::-webkit-details-marker]:hidden gap-4 md:gap-8">
              <span className="text-xl font-semibold">{proj.name}</span>
              <span className="text-[13px] text-[#666] hidden md:block">
                {proj.type}
              </span>
              <span className="text-[13px] text-[#333] font-mono">
                {proj.year}
              </span>
            </summary>
            <div className="pb-8">
              <p className="text-[15px] text-[#666] leading-relaxed mb-3 whitespace-pre-line">
                {proj.desc}
              </p>
              <div className="mb-4">
                {proj.achievements.map((a) => (
                  <span
                    key={a}
                    className="block text-sm text-[#666] py-0.5"
                  >
                    - {a}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {proj.techs.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] uppercase tracking-[1.5px] px-3 py-1 border border-[#2a2a2a] text-[#666]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="my-16 h-px bg-[#2a2a2a]" />
      </div>

      {/* ━━ Experience ━━ */}
      <div id="career" className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-baseline pt-12 pb-8">
          <h2 className="text-[11px] uppercase tracking-[4px] text-[#666] font-semibold">
            Experience
          </h2>
          <span className="text-xs text-[#666] font-mono">04</span>
        </div>

        {experiences.map((exp, i) => (
          <div
            key={exp.period}
            className={`grid grid-cols-1 md:grid-cols-[160px_1fr_140px] py-6 border-b border-[#2a2a2a] gap-1 md:gap-8 items-baseline ${i === 0 ? "border-t" : ""}`}
          >
            <span className="text-[13px] text-[#333] font-mono">
              {exp.period}
            </span>
            <div>
              <h3 className="text-[17px] font-semibold mb-0.5">{exp.title}</h3>
              <p className="text-sm text-[#666]">{exp.desc}</p>
            </div>
            <span className="text-xs text-[#333] md:text-right uppercase tracking-wider">
              {exp.location}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="my-16 h-px bg-[#2a2a2a]" />
      </div>

      {/* ━━ Awards ━━ */}
      <div id="awards" className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-baseline pt-12 pb-8">
          <h2 className="text-[11px] uppercase tracking-[4px] text-[#666] font-semibold">
            Awards
          </h2>
          <span className="text-xs text-[#666] font-mono">05</span>
        </div>

        {awards.map((award, i) => (
          <div
            key={i}
            className={`grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr_100px] py-5 border-b border-[#2a2a2a] gap-4 md:gap-6 items-baseline ${i === 0 ? "border-t" : ""}`}
          >
            <span
              className={`text-sm font-bold ${award.gold ? "text-[#f59e0b]" : ""}`}
            >
              {award.grade}
            </span>
            <div>
              <h4 className="text-[15px] font-semibold mb-0.5">
                {award.title}
              </h4>
              <p className="text-[13px] text-[#666]">{award.desc}</p>
            </div>
            <span className="text-xs text-[#333] font-mono md:text-right hidden md:block">
              {award.date}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="my-16 h-px bg-[#2a2a2a]" />
      </div>

      {/* ━━ CTA ━━ */}
      <div id="contact" className="py-20 px-6 md:px-12 text-center">
        <h2 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight mb-4">
          Let&apos;s work together.
        </h2>
        <p className="text-base text-[#666] mb-8">
          새로운 프로젝트나 협업에 대해 이야기 나눠보고 싶다면 연락주세요.
        </p>
        <a
          href="mailto:woojin2296@gmail.com"
          className="inline-block text-[13px] uppercase tracking-[3px] font-semibold bg-[#e8e8e8] text-[#0e0e0e] py-3.5 px-10 hover:opacity-85 transition-opacity"
        >
          Get in Touch
        </a>
      </div>

      <div className="h-px bg-[#2a2a2a]" />

      {/* ━━ Colophon ━━ */}
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div>
            <p className="text-[11px] uppercase tracking-[2px] text-[#333] mb-4">
              Navigate
            </p>
            {["About", "Projects", "Career", "Awards"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-sm text-[#666] leading-8 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[2px] text-[#333] mb-4">
              Connect
            </p>
            <a
              href="https://github.com/woojin2296"
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-[#666] leading-8 hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://velog.io/@talking_tomato"
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-[#666] leading-8 hover:text-white"
            >
              Tech Blog
            </a>
            <a
              href="mailto:woojin2296@gmail.com"
              className="block text-sm text-[#666] leading-8 hover:text-white"
            >
              Email
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[2px] text-[#333] mb-4">
              Info
            </p>
            <p className="text-sm text-[#666] leading-8">TOEIC 810</p>
            <p className="text-sm text-[#666] leading-8">
              순천향대학교 사물인터넷학과
            </p>
            <p className="text-sm text-[#666] leading-8">010-2296-1280</p>
          </div>
        </div>
      </div>

      {/* ━━ Footer ━━ */}
      <div className="flex justify-between items-center px-6 md:px-12 py-6 border-t border-[#2a2a2a]">
        <span className="text-[11px] text-[#333]">
          &copy; 2024 임우진 (Woojin Lim)
        </span>
        <a
          href="#top"
          className="text-[11px] text-[#333] uppercase tracking-[2px] hover:text-[#e8e8e8]"
        >
          Back to top &uarr;
        </a>
      </div>
    </div>
  );
}
