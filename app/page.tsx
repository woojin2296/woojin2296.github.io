const personalProjects = [
  {
    period: "2025.12 ~ 2026.02",
    title: "도봉라이프 인프라",
    summary:
      "서울시 도봉구 지역상권 활성화 애플리케이션 '도봉라이프'의 AWS 인프라 구축 및 운영을 담당한 프로젝트입니다.",
    role: "리드/인프라 담당",
    links: [
      {
        label: "AWS와 화해하기 #1 - 네트워크와 인스턴스",
        href: "https://velog.io/@talking_tomato/AWS%EC%99%80-%ED%99%94%ED%95%B4%ED%95%98%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EC%99%80-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4",
      },
      {
        label: "Notion 상세",
        href: "https://talkingtomato.notion.site/341444ee88c981b8ba04ecff072e9a33",
      },
    ],
    tech: [
      "AWS(VPC, EC2, RDS, S3, NAT Gateway, Security Group)",
      "Docker Compose",
      "Terraform",
      "GitHub Actions",
      "AWS CloudWatch",
      "Nginx",
    ],
  },
  {
    period: "2026.03 ~ 2026.04",
    title: "도봉라이프 V2 인프라 고도화",
    summary:
      "FE/BE 분리 배포 구조로 전환하고 Terraform 기반 IaC, SSM 기반 배포 파이프라인, 운영 모니터링을 구축한 확장 단계입니다.",
    role: "인프라 리드",
    links: [
      {
        label: "도봉라이프 인프라 상세",
        href: "https://talkingtomato.notion.site/341444ee88c981b8ba04ecff072e9a33",
      },
    ],
    tech: ["Terraform", "AWS SSM", "Amazon ElastiCache", "CloudWatch"],
  },
];

const awards = [
  {
    period: "2025.11",
    title: "SCHU AI SW Festival SW 프로젝트 경진대회 장려상",
    detail: "AI 기반 발표 연습 보조 서비스 - PLAVO",
  },
  {
    period: "2025.11",
    title: "캡스톤 디자인 및 AI 해커톤 경진대회 장려상",
    detail: "장소에 맞는 음악 생성 서비스 - Caramel",
  },
  {
    period: "2025.08",
    title: "글로벌 캡스톤디자인 경진대회 장려상",
    detail: "AI 기반 발표 연습 보조 서비스 - PLAVO",
  },
  {
    period: "2024.11",
    title: "제1회 SW융합대학 학술제 최우수상",
    detail: "캐주얼 리듬게임 - Tab Space",
  },
  {
    period: "2024.10",
    title: "캡스톤디자인 및 AI 해커톤 경진대회 장려상",
    detail: "입법 현황 실시간 분석 시스템 - LawDaon",
  },
];

export default function Home() {
  return (
    <main className="flex mx-auto max-w-2xl flex-col mt-28">
      
      <div>
        <div className="flex gap-4 justify-start items-baseline">
          <h1 className="text-5xl text-[#111418]">임우진 (Woojin Lim)</h1>
          <p className="text-xl text-[#5a6775] px-0.5">남 2001년 (만25세)</p>
        </div>
        <p className="text-2xl text-[#5a6775] px-0.5 mt-3">DevOps Engineer</p>
      </div>

      <section className="mt-12">
        <div>
          <h2 className="text-xl font-semibold text-[#111418]">
            서비스 전체를 이해하고 유연한 구조를 설계하는 엔지니어 임우진입니다.
          </h2>
          <p className="mt-2 text-[#4f5a6a]">
            기술 스택에 얽매이기보다 문제와 개념을 먼저 이해하고, 해결에 가장
            적절한 기술을 빠르게 학습하고 적용하는 것을 중요하게 생각합니다.
            FE와 BE를 포함해 네트워크, 시스템, 하드웨어, ML/DL 등 다양한 영역의
            프로젝트 경험을 바탕으로{" "}
            <strong>
              서비스 전체를 이해하고 구조와 흐름을 고려하는 개발자
            </strong>
            로 성장하고 있습니다.
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-[#111418]">
            팀과 함께 소통하며 기술과 사람을 연결합니다.
          </h2>
          <p className="mt-2 text-[#4f5a6a]">
            기술은 결국 사람의 문제를 해결하기 위한 도구입니다. 팀원들과
            적극적으로 소통하며 지식을 공유하며 협업을 통해 문제를 해결하는 것을
            중요하게 여깁니다. 연구실과 여러 프로젝트에서{" "}
            <strong>
              랩장과 팀장을 맡아 팀의 소통과 협업을 이끌어왔으며, 여러 실제
              운영중인 시스템과 40MAU 규모의 서비스를 개발하고 운영한 경험
            </strong>
            이 있습니다.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          About
        </h2>
        <div className="my-4 h-px bg-[#d8dde7] w-full" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-[#5a6775]">Birthday</p>
            <p className="text-[#111418]">2001.02.26 (26세)</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#5a6775]">Phone</p>
            <p className="text-[#111418]">010-2296-1280</p>
          </div>
          <div className="">
            <p className="text-sm font-semibold text-[#5a6775]">Email</p>
            <a
              className="text-[#2d4cf2] underline-offset-4 hover:underline"
              href="mailto:woojin2296@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              woojin2296@gmail.com
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#5a6775]">GitHub</p>
            <a
              className="text-[#2d4cf2] underline-offset-4 hover:underline"
              href="https://github.com/woojin2296"
              target="_blank"
              rel="noreferrer"
            >
              github.com/woojin2296
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#5a6775]">Tech Blog</p>
            <a
              className="text-[#2d4cf2] underline-offset-4 hover:underline"
              href="https://velog.io/@talking_tomato"
              target="_blank"
              rel="noreferrer"
            >
              velog.io/@talking_tomato
            </a>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          Skills
        </h2>
        <div className="my-4 h-px bg-[#d8dde7] w-full" />
        <dl className="grid gap-3">
          <div className="grid gap-1 pb-2 sm:grid-cols-[160px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-[#5a6775]">Cloud / Infrastructure</dt>
            <dd className="text-[#111418]">AWS, Terraform, Docker, Linux</dd>
          </div>
          <div className="grid gap-1 pb-2 sm:grid-cols-[160px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-[#5a6775]">Platform / CI</dt>
            <dd className="text-[#111418]">Git, GitHub Actions</dd>
          </div>
          <div className="grid gap-1 pb-2 sm:grid-cols-[160px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-[#5a6775]">Backend</dt>
            <dd className="text-[#111418]">Spring Boot, Java, MySQL</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-[#5a6775]">Frontend</dt>
            <dd className="text-[#111418]">Next.js, TypeScript, JavaScript, Python</dd>
          </div>
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          Education
        </h2>
        <div className="my-4 h-px bg-[#d8dde7] w-full" />
        <div className="grid gap-1 pb-2">
          <p className="text-[#111418]">순천향대학교 사물인터넷학과 졸업예정</p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-[#5a6775]">2020.03 ~ 2026.08</p>
            <p className="text-[#4f5a6a]">평점 4.22/4.5</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          Key Projects
        </h2>
        <div className="my-4 h-px bg-[#d8dde7] w-full" />
        <div className="grid gap-4">
          {personalProjects.map((project) => (
            <article
              key={project.title}
              className="grid gap-1 border-b border-[#d8dde7] pb-4 sm:grid-cols-[110px_1fr]"
            >
              <p className="text-sm text-[#5a6775]">{project.period}</p>
              <div>
                <p className="text-lg font-semibold text-[#111418]">
                  {project.title}
                </p>
                <p className="text-[#4f5a6a]">{project.summary}</p>
                <p className="mt-1 text-sm text-[#5a6775]">
                  역할: {project.role}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[#2d4cf2] underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="line-divider mt-8 border-t pt-8">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5a6775]">
          Award
        </h2>
        <ul className="mt-4 grid gap-2">
          {awards.map((award) => (
            <li
              key={`${award.period}-${award.title}`}
              className="grid gap-1 border-b border-[#d8dde7] pb-3 sm:grid-cols-[90px_1fr]"
            >
              <span className="text-sm text-[#5a6775]">{award.period}</span>
              <div>
                <p className="text-[#111418]">{award.title}</p>
                <p className="text-[#4f5a6a]">{award.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
