const stats = [
  { number: "3", label: "Projects" },
  { number: "5", label: "Awards" },
  { number: "40", label: "MAU" },
  { number: "4.22", label: "GPA" },
];

const skills = [
  { cat: "Cloud / Infra", techs: "AWS, Terraform, Docker, Linux" },
  { cat: "Platform / CI", techs: "Git, GitHub Actions" },
  { cat: "Backend", techs: "Spring Boot, Java, MySQL" },
  { cat: "Frontend", techs: "Next.js, TypeScript, JavaScript, Python" },
];

const timeline = [
  {
    date: "2025.09 — 2025.02",
    title: "인턴 사원",
    org: "(주)유머스트알엔디",
    details: [
      "도봉라이프 애플리케이션의 AWS 인프라 구축 및 운영",
      "리눅스 기반 Qt로 저선량 X-ray 관절염 치료기기(AMUST) GUI 개발",
    ],
  },
  {
    date: "2024.01 — 2026.02",
    title: "학부연구생 (랩장)",
    org: "순천향대학교 UBICOMP LAB",
    details: [
      "연구실 데이터 수집장치 관제 시스템 판옵티콘(Panopticon) 개발",
      "ROS 기반 Lidar 및 Depth Camera의 PCD 수집 파이프라인 개발",
      "2025 한국컴퓨터종합학술대회(KCC2025) 학부생 논문 게재",
    ],
  },
  {
    date: "2022.05 — 2023.11",
    title: "육군 병장 만기 전역",
    org: "MW 통신병",
    details: [],
  },
  {
    date: "2020.03 — 2026.08",
    title: "순천향대학교 사물인터넷학과",
    org: "졸업예정 | 평점 4.22/4.5",
    details: [],
  },
];

const projects = [
  {
    name: "도봉라이프 (Dobong Life)",
    status: "Live",
    statusColor: "text-[#16a34a] border-[#16a34a]",
    meta: "(주)유머스트알엔디 | 인턴사원 | 2025.12 — 2026.02 (3m)",
    desc: "서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 구축 및 운영.",
    achievements: [
      "AWS(VPC, EC2, RDS, S3) 기반 서비스 인프라 설계 및 구축",
      "Terraform을 활용한 IaC로 인프라 재현성 확보",
      "SSM + GitHub Actions(OIDC) 기반 CI/CD 파이프라인 구축",
      "CloudWatch 기반 로그 수집/모니터링 환경 구축",
    ],
    tags: [
      { name: "AWS", filled: true },
      { name: "Terraform", filled: true },
      { name: "Docker Compose", filled: false },
      { name: "GitHub Actions", filled: false },
      { name: "CloudWatch", filled: false },
    ],
  },
  {
    name: "판옵티콘 (Panopticon)",
    status: "Active",
    statusColor: "text-[#2563eb] border-[#2563eb]",
    meta: "UBICOMP LAB | 학부연구생 | 2024.07 — 2026.02 (1y 7m)",
    desc: "연구실 AI 훈련용 실험 데이터 수집 파이프라인의 관제 및 이상 알림 시스템.",
    achievements: [
      "Next.js + Spring Boot 기반 풀스택 개발 및 Docker Compose 배포",
      "GitHub Actions(self-hosted runner) 기반 On-prem CI/CD 구축",
      "수집 지연/중단 자동 감지 및 Slack 기반 실시간 알림",
    ],
    tags: [
      { name: "Next.js", filled: true },
      { name: "Spring Boot", filled: true },
      { name: "MySQL", filled: false },
      { name: "Docker Compose", filled: false },
    ],
  },
  {
    name: "SCH MiniProject Submission System",
    status: "Active",
    statusColor: "text-[#2563eb] border-[#2563eb]",
    meta: "개인 프로젝트 | 2025.06 — 2026.02 (9m)",
    desc: "학과 ML/DL 강의에서 사용하는 과제 제출 및 랭킹 관리 시스템. 월 평균 40명 이용.",
    achievements: [
      "과제 제출, 평가, 랭킹 관리를 통합한 웹 서비스",
      "세션 기반 인증 및 계층형 권한 구조 구현",
      "Docker Compose 기반 배포 및 감사 로그 시스템 구축",
    ],
    tags: [
      { name: "Next.js", filled: true },
      { name: "SQLite", filled: false },
      { name: "Docker Compose", filled: false },
    ],
  },
];

const awards = [
  { badge: "최우수상", top: true, date: "2024.11", title: "2024 제1회 SW융합대학 학술제 (E-Sports 개발)", desc: "캐주얼 리듬게임 - 탭 스페이스 (Tab Space)" },
  { badge: "장려상", top: false, date: "2025.11", title: "2025 SCHU AI SW Festival SW 프로젝트 경진대회", desc: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)" },
  { badge: "장려상", top: false, date: "2025.11", title: "2025 캡스톤 디자인 및 AI 해커톤 경진대회", desc: "장소에 맞는 음악 생성 서비스 - 카라멜 (Caramel)" },
  { badge: "장려상", top: false, date: "2025.08", title: "2025 글로벌 캡스톤디자인 경진대회", desc: "AI 기반 발표 연습 보조 서비스 - 플라보 (PLAVO)" },
  { badge: "장려상", top: false, date: "2024.10", title: "2024 캡스톤디자인 및 AI 해커톤 경진대회", desc: "입법 현황 실시간 분석 시스템 - 라다온 (LawDaon)" },
];

const others = [
  { label: "Education", value: "순천향대학교 사물인터넷학과 (2020.03 ~ 2026.08)" },
  { label: "GPA", value: "4.22 / 4.5" },
  { label: "Language", value: "TOEIC 810 (2025.11)" },
  { label: "Military", value: "육군 병장 만기 전역 (2022.05 ~ 2023.11) MW 통신병" },
];

const contacts = [
  { label: "Email", value: "woojin2296@gmail.com", href: "mailto:woojin2296@gmail.com" },
  { label: "GitHub", value: "woojin2296", href: "https://github.com/woojin2296" },
  { label: "Tech Blog", value: "velog.io/@talking_tomato", href: "https://velog.io/@talking_tomato" },
  { label: "Phone", value: "010-2296-1280", href: "tel:010-2296-1280" },
];

export default function Design1() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] leading-relaxed antialiased">
      <div className="max-w-[780px] mx-auto px-6 py-16 md:py-20">

        {/* ━━ Header ━━ */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
            임우진 (Woojin Lim)
          </h1>
          <p className="text-base text-[#666] mb-1">DevOps Engineer</p>
          <p className="text-sm text-[#999] mb-4">남 2001년 (만25세)</p>
          <p className="text-xl text-[#333] leading-relaxed max-w-[600px]">
            서비스 전체를 이해하고 유연한 구조를 설계하는 엔지니어입니다.
          </p>
          <nav className="mt-7 flex flex-wrap gap-6">
            {["About", "Skills", "Experience", "Projects", "Awards", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium border-b-[1.5px] border-transparent hover:border-[#1a1a1a] pb-1 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        {/* thick rule */}
        <div className="h-[2px] bg-[#1a1a1a] mb-12" />

        {/* ━━ Stats ━━ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="border border-[#e0e0e0] py-5 text-center">
              <span className="block text-[28px] font-bold mb-1">{s.number}</span>
              <span className="text-xs text-[#888] uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        {/* rule */}
        <div className="h-px bg-[#d4d4d4] mb-12" />

        {/* ━━ About ━━ */}
        <section id="about" className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[3px] text-[#999] mb-7">About</h2>
          <p className="text-base text-[#333] mb-3">
            <strong className="text-[#1a1a1a]">기술 스택에 얽매이기보다 문제와 개념을 먼저 이해</strong>하고,
            해결에 가장 적절한 기술을 빠르게 학습하고 적용하는 것을 중요하게 생각합니다.
            FE와 BE를 포함해 네트워크, 시스템, 하드웨어, ML/DL 등 다양한 영역의 프로젝트 경험을 바탕으로
            서비스 전체를 이해하고 구조와 흐름을 고려하는 개발자로 성장하고 있습니다.
          </p>
          <p className="text-base text-[#333]">
            기술은 결국 사람의 문제를 해결하기 위한 도구입니다.
            팀원들과 적극적으로 소통하며 지식을 공유하고, 협업을 통해 문제를 해결합니다.
            연구실과 여러 프로젝트에서{" "}
            <strong className="text-[#1a1a1a]">
              랩장과 팀장을 맡아 팀의 소통과 협업을 이끌어왔으며,
              실제 운영 중인 시스템과 40 MAU 규모의 서비스를 개발하고 운영한 경험
            </strong>
            이 있습니다.
          </p>
        </section>

        {/* dashed rule */}
        <div className="border-t border-dashed border-[#ccc] my-12" />

        {/* ━━ Contact Info ━━ */}
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[3px] text-[#999] mb-7">Contact Info</h2>
          <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-x-4 gap-y-2">
            <span className="text-[13px] font-semibold text-[#888]">Phone</span>
            <span className="text-[15px]">010-2296-1280</span>
            <span className="text-[13px] font-semibold text-[#888]">Email</span>
            <a href="mailto:woojin2296@gmail.com" className="text-[15px] border-b border-[#ccc] hover:border-[#1a1a1a] pb-px w-fit">woojin2296@gmail.com</a>
            <span className="text-[13px] font-semibold text-[#888]">GitHub</span>
            <a href="https://github.com/woojin2296" target="_blank" rel="noreferrer" className="text-[15px] border-b border-[#ccc] hover:border-[#1a1a1a] pb-px w-fit">github.com/woojin2296</a>
            <span className="text-[13px] font-semibold text-[#888]">Tech Blog</span>
            <a href="https://velog.io/@talking_tomato" target="_blank" rel="noreferrer" className="text-[15px] border-b border-[#ccc] hover:border-[#1a1a1a] pb-px w-fit">velog.io/@talking_tomato</a>
          </div>
        </section>

        {/* rule */}
        <div className="h-px bg-[#d4d4d4] my-12" />

        {/* ━━ Skills ━━ */}
        <section id="skills" className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[3px] text-[#999] mb-7">Skills</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[13px] font-semibold text-[#666] pb-2.5 border-b-2 border-[#1a1a1a] w-[180px]">Category</th>
                <th className="text-left text-[13px] font-semibold text-[#666] pb-2.5 border-b-2 border-[#1a1a1a]">Technologies</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s.cat}>
                  <td className="py-3.5 border-b border-[#e8e8e8] font-semibold text-[15px] text-[#333]">{s.cat}</td>
                  <td className="py-3.5 border-b border-[#e8e8e8] text-[15px] text-[#555]">{s.techs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* rule */}
        <div className="h-px bg-[#d4d4d4] my-12" />

        {/* ━━ Experience ━━ */}
        <section id="experience" className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[3px] text-[#999] mb-7">Experience</h2>
          <div className="relative pl-8">
            {/* vertical line */}
            <div className="absolute left-[6px] top-1 bottom-1 w-px bg-[#ccc]" />

            {timeline.map((item, i) => (
              <div key={i} className={`relative ${i < timeline.length - 1 ? "mb-8" : ""}`}>
                {/* dot */}
                <div className="absolute -left-[22px] top-2 w-[9px] h-[9px] rounded-full border-2 border-[#1a1a1a] bg-[#fafafa]" />
                <p className="text-xs text-[#999] font-semibold tracking-wide mb-1">{item.date}</p>
                <h3 className="text-base font-semibold mb-0.5">{item.title}</h3>
                <p className="text-sm text-[#666] mb-1.5">{item.org}</p>
                {item.details.map((d, j) => (
                  <p key={j} className="text-sm text-[#777]">{d}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* double rule */}
        <div className="border-t-[3px] border-double border-[#bbb] my-12" />

        {/* ━━ Projects ━━ */}
        <section id="projects" className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[3px] text-[#999] mb-7">Key Projects</h2>

          {projects.map((proj) => (
            <div
              key={proj.name}
              className="border border-[#ddd] p-7 mb-5 hover:border-[#1a1a1a] transition-colors"
            >
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold">{proj.name}</h3>
                <span className={`text-xs px-2.5 py-0.5 border ${proj.statusColor}`}>
                  {proj.status}
                </span>
              </div>
              <p className="text-[13px] text-[#999] mb-3">{proj.meta}</p>
              <p className="text-[15px] text-[#555] mb-2">{proj.desc}</p>
              {proj.achievements.map((a) => (
                <p key={a} className="text-sm text-[#666] mb-1">- {a}</p>
              ))}
              <div className="flex flex-wrap gap-2 mt-3">
                {proj.tags.map((t) => (
                  <span
                    key={t.name}
                    className={`text-xs px-3 py-1 font-medium ${
                      t.filled
                        ? "bg-[#1a1a1a] text-white border border-[#1a1a1a]"
                        : "border border-[#ccc] text-[#555]"
                    }`}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* rule */}
        <div className="h-px bg-[#d4d4d4] my-12" />

        {/* ━━ Awards ━━ */}
        <section id="awards" className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[3px] text-[#999] mb-7">Awards</h2>

          {awards.map((a, i) => (
            <div
              key={i}
              className={`grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] gap-4 py-4 border-b border-[#eee] ${i === 0 ? "border-t" : ""}`}
            >
              <div className="text-center">
                <p className={`text-[13px] font-bold ${a.top ? "text-[#b45309]" : ""}`}>{a.badge}</p>
                <p className="text-[11px] text-[#999]">{a.date}</p>
              </div>
              <div>
                <h4 className="text-[15px] font-semibold mb-0.5">{a.title}</h4>
                <p className="text-[13px] text-[#777]">{a.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* rule */}
        <div className="h-px bg-[#d4d4d4] my-12" />

        {/* ━━ Other ━━ */}
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[3px] text-[#999] mb-7">Other</h2>
          {others.map((o, i) => (
            <div
              key={o.label}
              className={`flex justify-between items-baseline py-3 border-b border-[#eee] ${i === 0 ? "border-t" : ""}`}
            >
              <span className="text-sm text-[#888]">{o.label}</span>
              <span className="text-[15px] font-medium">{o.value}</span>
            </div>
          ))}
        </section>

        {/* rule */}
        <div className="h-px bg-[#d4d4d4] my-12" />

        {/* ━━ Contact ━━ */}
        <section id="contact" className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[3px] text-[#999] mb-7">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="block border border-[#e0e0e0] p-5 text-center hover:border-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-[11px] uppercase tracking-[1.5px] text-[#999] mb-1.5">{c.label}</p>
                <p className="text-sm font-semibold">{c.value}</p>
              </a>
            ))}
          </div>
        </section>

        {/* thick rule */}
        <div className="h-[2px] bg-[#1a1a1a] my-12" />

        {/* ━━ Footer ━━ */}
        <footer className="text-center">
          <p className="text-xs text-[#bbb]">&copy; 2024 임우진. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}
