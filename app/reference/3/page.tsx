export default function Design3() {
  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#1c1917] leading-[1.8] antialiased">
      {/* ━━ Masthead ━━ */}
      <header className="text-center py-8 px-6 md:px-10 border-b-[3px] border-[#1c1917]">
        <p className="text-[11px] uppercase tracking-[4px] text-[#78716c] mb-3">
          Portfolio &mdash; Seoul, 2024
        </p>
        <h1 className="text-[32px] md:text-5xl font-black tracking-tight">
          임우진 (WOOJIN LIM)
        </h1>
        <p className="text-sm text-[#78716c] italic mt-2">
          DevOps Engineer &mdash; &ldquo;서비스 전체를 이해하고 유연한 구조를
          설계하다&rdquo;
        </p>
      </header>

      <div className="mt-2 mb-4 h-px bg-[#d8dde7] w-full" />

      {/* ━━ Nav Strip ━━ */}
      <nav className="flex justify-center gap-5 md:gap-10 py-3.5 px-6 md:px-10 border-b border-[#c4c0b8] flex-wrap">
        {["About", "Projects", "Career", "Skills", "Awards", "Contact"].map(
          (item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[3px] font-semibold hover:border-b-[1.5px] hover:border-[#1c1917]"
            >
              {item}
            </a>
          )
        )}
      </nav>

      {/* ━━ Content Container ━━ */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10">
        {/* ━━ Headline ━━ */}
        <div className="pt-20 pb-16 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#78716c] mb-5">
            DevOps Engineer &middot; 만25세
          </p>
          <h2 className="text-[clamp(36px,6vw,64px)] font-black leading-[1.1] tracking-tighter max-w-[720px] mx-auto mb-6">
            복잡한 시스템을
            <br />
            단순하게 설계하다
          </h2>
          <p className="text-lg text-[#78716c] max-w-[560px] mx-auto leading-relaxed">
            기술 스택에 얽매이기보다 문제와 개념을 먼저 이해하고, 해결에 가장
            적절한 기술을 빠르게 학습하고 적용하는 엔지니어입니다.
          </p>
        </div>

        {/* bold rule */}
        <div className="h-[3px] bg-[#1c1917]" />

        {/* ━━ Three Column ━━ */}
        <div
          id="about"
          className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr_1px_1fr]"
        >
          {[
            {
              tag: "Cloud / Infra",
              title: "견고한 인프라 위에",
              desc: "AWS, Terraform, Docker를 활용한 클라우드 인프라 설계 및 구축. VPC, EC2, RDS, S3 등을 조합하여 보안과 확장성을 갖춘 아키텍처를 구현합니다.",
            },
            {
              tag: "CI/CD",
              title: "끊김 없는 배포를 위해",
              desc: "GitHub Actions 기반 CI/CD 파이프라인 구축. OIDC + SSM을 활용한 보안 배포, self-hosted runner를 통한 On-prem 환경 지원까지 경험했습니다.",
            },
            {
              tag: "Full-Stack",
              title: "서비스 전체를 이해하며",
              desc: "Next.js, Spring Boot를 활용한 풀���택 개발 경험. FE/BE부터 네트워크, 시스템, ML/DL까지 다양한 영역을 아우르는 시야를 갖추고 있습니다.",
            },
          ].flatMap((col, i, arr) => {
            const el = (
              <div key={col.tag} className="py-8 md:px-7">
                <span className="inline-block text-[10px] uppercase tracking-[2px] text-[#78716c] border border-[#c4c0b8] px-2 py-0.5 mb-3">
                  {col.tag}
                </span>
                <h3 className="text-lg font-bold mb-3 leading-snug">
                  {col.title}
                </h3>
                <p className="text-sm text-[#78716c] leading-relaxed">
                  {col.desc}
                </p>
              </div>
            );
            if (i < arr.length - 1) {
              return [
                el,
                <div
                  key={`div-${i}`}
                  className="hidden md:block bg-[#c4c0b8]"
                />,
              ];
            }
            return [el];
          })}
        </div>

        {/* rule */}
        <div className="h-px bg-[#c4c0b8]" />

        {/* ━━ Pull Quote ━━ */}
        <div className="py-12 text-center">
          <span className="text-[64px] leading-none text-[#d6d3cd] font-serif">
            &ldquo;
          </span>
          <blockquote className="text-[26px] font-light italic leading-snug max-w-[600px] mx-auto mb-4 text-[#292524]">
            기술은 결국 사람의 문제를 해결하기 위한 도구이다. 팀원들과 적극적으로
            소통하며 협업을 통해 문제를 해결한다.
          </blockquote>
          <cite className="text-xs not-italic uppercase tracking-[2px] text-[#78716c]">
            임우진 &mdash; 개인 신조
          </cite>
        </div>

        {/* rule */}
        <div className="h-px bg-[#c4c0b8]" />

        {/* ━━ Key Projects (Two-Split) ━━ */}
        <div
          id="projects"
          className="grid grid-cols-1 md:grid-cols-[340px_1px_1fr]"
        >
          <div className="pt-10 md:pr-8 pb-2 md:pb-10">
            <h3 className="text-[13px] uppercase tracking-[3px] text-[#78716c] font-semibold">
              Key Projects
            </h3>
          </div>
          <div className="hidden md:block bg-[#c4c0b8]" />
          <div className="md:pl-8 py-4 md:py-10">
            {[
              {
                num: "01",
                title: "도봉라이프 (Dobong Life)",
                desc: "서울시 도봉구 지역상권 활성화 앱의 AWS 인프라 구축 및 운영. Terraform IaC, SSM+OIDC 기반 CI/CD, CloudWatch 모니터링.",
                cat: "DevOps",
              },
              {
                num: "02",
                title: "판옵티콘 (Panopticon)",
                desc: "연구실 AI 데이터 수집 파이프라인 ��제 및 이상 알림 시스템. Next.js + Spring Boot 풀스택, Slack 실시간 알림, 1년 6개월 운영 중.",
                cat: "Full-Stack",
              },
              {
                num: "03",
                title: "SCH MiniProject Submission System",
                desc: "학과 ML/DL 강의용 과제 제출 및 랭킹 관리 시스템. 월 40명 이용, 세션 인증/권한 구조, 감사 로그 시스템.",
                cat: "Personal",
              },
            ].map((proj, i, arr) => (
              <div
                key={proj.num}
                className={`grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_100px] gap-6 items-baseline py-5 border-t border-[#d6d3cd] ${i === arr.length - 1 ? "border-b" : ""}`}
              >
                <span className="text-[32px] font-black text-[#d6d3cd] leading-none">
                  {proj.num}
                </span>
                <div>
                  <h4 className="text-[17px] font-bold mb-1">{proj.title}</h4>
                  <p className="text-sm text-[#78716c]">{proj.desc}</p>
                </div>
                <span className="hidden md:block text-[10px] uppercase tracking-[2px] text-[#78716c] text-right">
                  {proj.cat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* v-space rule */}
        <div className="my-[72px] h-px bg-[#c4c0b8]" />

        {/* ━━ Career (Horizontal Timeline) ━━ */}
        <div
          id="career"
          className="grid grid-cols-1 md:grid-cols-[340px_1px_1fr]"
        >
          <div className="pt-10 md:pr-8 pb-2 md:pb-10">
            <h3 className="text-[13px] uppercase tracking-[3px] text-[#78716c] font-semibold">
              Career
            </h3>
          </div>
          <div className="hidden md:block bg-[#c4c0b8]" />
          <div className="md:pl-8 py-4 md:py-8">
            <div className="flex overflow-x-auto pb-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
              {[
                {
                  year: "2025",
                  title: "인턴 사원",
                  sub: "(주)유머스트알엔디 / 도봉라이프 인프라",
                },
                {
                  year: "2024",
                  title: "학부연구생 (랩장)",
                  sub: "UBICOMP LAB / 판옵티콘 개발",
                },
                {
                  year: "2023",
                  title: "육군 병장 만기 전역",
                  sub: "MW 통신병 (2022.05 ~ 2023.11)",
                },
                {
                  year: "2020",
                  title: "순천향대학교 입학",
                  sub: "사물인터넷학과 (GPA 4.22/4.5)",
                },
              ].map((item) => (
                <div
                  key={item.year}
                  className="min-w-[220px] shrink-0 border-l-2 border-[#1c1917] pl-5 pr-6 py-6"
                >
                  <p className="text-[28px] font-black mb-2">{item.year}</p>
                  <p className="text-[15px] font-semibold mb-1">
                    {item.title}
                  </p>
                  <p className="text-[13px] text-[#78716c]">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* rule */}
        <div className="h-px bg-[#c4c0b8]" />

        {/* ━━ Skills + Sidebar ━━ */}
        <div
          id="skills"
          className="grid grid-cols-1 md:grid-cols-[1fr_1px_280px]"
        >
          {/* Main content */}
          <div className="py-10 md:pr-8">
            <p className="text-base text-[#44403c] leading-relaxed first-letter:float-left first-letter:text-[72px] first-letter:font-black first-letter:leading-[0.8] first-letter:pr-3 first-letter:pt-1 first-letter:text-[#1c1917]">
              서비스 전체를 이해하고 유연한 구조를 설계하는 것을 목표로 합니다.
              FE와 BE를 포함해 네트워크, 시스템, 하드웨어, ML/DL 등 다양한 영역의
              프로젝트 경험을 바탕으로, 문제에 적합한 기술을 선택하고 빠르게 적용할
              수 있습니다. 연구실과 여러 프로젝트에서 랩장과 팀장을 맡아 팀의
              소통과 협업을 이끌어왔습니다.
            </p>

            <div className="mt-8 flex flex-col">
              {[
                {
                  label: "Cloud / Infra",
                  filled: 5,
                  techs: "AWS, Terraform, Docker, Linux",
                },
                {
                  label: "Platform / CI",
                  filled: 4,
                  techs: "Git, GitHub Actions",
                },
                {
                  label: "Backend",
                  filled: 4,
                  techs: "Spring Boot, Java, MySQL",
                },
                {
                  label: "Frontend",
                  filled: 3,
                  techs: "Next.js, TypeScript, JavaScript",
                },
              ].map((skill) => (
                <div
                  key={skill.label}
                  className="flex items-center gap-4 py-3"
                >
                  <span className="text-sm font-semibold w-[140px] md:w-[180px] shrink-0">
                    {skill.label}
                  </span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full border-[1.5px] border-[#1c1917] ${i < skill.filled ? "bg-[#1c1917]" : ""}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#78716c] ml-auto hidden sm:block">
                    {skill.techs}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block bg-[#c4c0b8]" />

          {/* Sidebar */}
          <div className="py-10 md:pl-8 border-t border-[#c4c0b8] md:border-t-0">
            {[
              {
                title: "Education",
                items: [
                  {
                    main: "순천향대학교 사물인터넷학과",
                    sub: "졸업예정 · 2020.03 — 2026.08",
                  },
                  { main: "평점 4.22 / 4.5", sub: null },
                ],
              },
              {
                title: "Publication",
                items: [
                  {
                    main: "KCC2025 학부생 논문 게재",
                    sub: "한국컴퓨터종합학술대회",
                  },
                ],
              },
              {
                title: "Language",
                items: [{ main: "TOEIC 810", sub: "2025.11 취득" }],
              },
              {
                title: "Military",
                items: [
                  {
                    main: "육군 병장 만기 전역",
                    sub: "MW 통신병 · 2022.05 — 2023.11",
                  },
                ],
              },
            ].map((section) => (
              <div key={section.title} className="mb-8 last:mb-0">
                <h4 className="text-[10px] uppercase tracking-[3px] text-[#78716c] font-bold mb-3 pb-2 border-b-2 border-[#1c1917]">
                  {section.title}
                </h4>
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="text-sm py-2 border-b border-[#d6d3cd]"
                  >
                    {item.main}
                    {item.sub && (
                      <span className="block text-xs text-[#78716c]">
                        {item.sub}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* rule */}
        <div className="h-px bg-[#c4c0b8]" />

        {/* ━━ Contact Info (KV Grid) ━━ */}
        <div className="py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2">
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
            ].map((item, i) => (
              <div
                key={item.key}
                className={`py-4 border-b border-[#d6d3cd] ${i % 2 === 1 ? "sm:pl-5 sm:border-l" : "sm:pr-5"}`}
              >
                <p className="text-[10px] uppercase tracking-[2px] text-[#78716c] mb-1">
                  {item.key}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[15px] font-semibold border-b border-[#c4c0b8] hover:border-[#1c1917] pb-px"
                >
                  {item.val}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* rule */}
        <div className="h-px bg-[#c4c0b8]" />

        {/* ━━ Awards (Two-Split) ━━ */}
        <div
          id="awards"
          className="grid grid-cols-1 md:grid-cols-[340px_1px_1fr]"
        >
          <div className="pt-10 md:pr-8 pb-2 md:pb-10">
            <h3 className="text-[13px] uppercase tracking-[3px] text-[#78716c] font-semibold">
              Awards
            </h3>
          </div>
          <div className="hidden md:block bg-[#c4c0b8]" />
          <div className="md:pl-8 py-4 md:py-10">
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
                className={`grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-6 py-4 border-b border-[#d6d3cd] ${i === 0 ? "border-t" : ""}`}
              >
                <div className="text-center">
                  <p
                    className={`text-[13px] font-extrabold ${award.gold ? "text-[#92400e]" : ""}`}
                  >
                    {award.grade}
                  </p>
                  <p className="text-[11px] text-[#78716c]">{award.date}</p>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold mb-0.5">
                    {award.title}
                  </h4>
                  <p className="text-[13px] text-[#78716c]">{award.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* rule */}
        <div className="h-px bg-[#c4c0b8]" />

        {/* ━━ Footnotes ━━ */}
        <div className="py-8">
          <p className="text-xs text-[#78716c] py-1.5 flex gap-3">
            <span className="font-bold text-[#1c1917]">*</span>
            이 포트폴리오는 텍스트와 구분선만으로 디자인되었습니다.
          </p>
          <p className="text-xs text-[#78716c] py-1.5 flex gap-3">
            <span className="font-bold text-[#1c1917]">**</span>
            모든 프로젝트는 실제 운영 경험을 바탕으로 작성되었습니다.
          </p>
        </div>

        {/* bold rule */}
        <div className="h-[3px] bg-[#1c1917]" />

        {/* ━━ CTA Box ━━ */}
        <div
          id="contact"
          className="border-2 border-[#1c1917] p-8 md:p-12 text-center my-12"
        >
          <h3 className="text-[28px] font-black mb-3">함께 일해요</h3>
          <p className="text-[15px] text-[#78716c] mb-7">
            새로운 프로젝트, 협업, 또는 커피챗까지 편하게 연락 주세요.
          </p>
          <a
            href="mailto:woojin2296@gmail.com"
            className="inline-block text-xs uppercase tracking-[3px] font-bold py-3.5 px-11 border-2 border-[#1c1917] hover:bg-[#1c1917] hover:text-[#f4f1eb] transition-colors"
          >
            Get in Touch
          </a>
        </div>

        {/* ━━ Footer ━━ */}
        <div className="h-px bg-[#c4c0b8]" />
        <div className="py-8 text-center">
          <div className="flex justify-center gap-8 mb-4">
            {[
              { label: "Email", href: "mailto:woojin2296@gmail.com" },
              { label: "GitHub", href: "https://github.com/woojin2296" },
              { label: "Blog", href: "https://velog.io/@talking_tomato" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] uppercase tracking-[2px] text-[#78716c] hover:text-[#1c1917]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-[#c4c0b8]">
            &copy; 2024 임우진 (Woojin Lim) &mdash; All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
