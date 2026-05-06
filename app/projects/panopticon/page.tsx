import Link from "next/link";

export const metadata = {
  title: "Panopticon | Lim Woojin Portfolio",
  description: "AI 훈련용 실험 데이터 수집 파이프라인 관제 및 이상 알림 시스템",
};

const highlights = [
  "Next.js + Spring Boot 기반 풀스택 개발 및 Docker Compose 배포",
  "GitHub Actions self-hosted runner 기반 On-prem CI/CD 구축",
  "수집 지연 및 중단 상태를 자동 감지하는 관제 로직 구현",
  "Slack 기반 실시간 알림으로 데이터 파이프라인 장애 대응 속도 개선",
];

const skills = [
  "Next.js",
  "Spring Boot",
  "MySQL",
  "Docker Compose",
  "GitHub Actions",
];

function ProjectVisualPlaceholder() {
  return (
    <div
      aria-label="프로젝트 이미지 자리"
      className="relative aspect-video w-full overflow-hidden border border-[#c4c0b8] bg-[#eef1f4]"
    >
      <div className="absolute inset-x-8 top-8 h-4 bg-white/70" />
      <div className="absolute left-8 top-16 h-4 w-2/3 bg-white/55" />
      <div className="absolute bottom-8 left-8 h-24 w-24 bg-[#d8dde7]" />
      <div className="absolute bottom-12 left-40 right-8 h-4 bg-white/55" />
      <div className="absolute bottom-20 left-40 right-24 h-4 bg-white/45" />
    </div>
  );
}

export default function PanopticonPage() {
  return (
    <main className="mx-auto max-w-[920px] px-6 pt-10 pb-28 sm:px-10">
      <Link
        href="/#projects"
        className="text-[11px] font-semibold uppercase tracking-[2.5px] text-[#5a6775] transition-colors hover:text-[#111418]"
      >
        Back to Projects
      </Link>

      <header className="mt-14 border-t-[3px] border-[#111418] pt-10">
        <p className="text-sm uppercase tracking-[0.35em] text-[#5a6775]">
          Project No.2
        </p>
        <h1 className="mt-4 text-[clamp(36px,6vw,64px)] font-bold leading-tight text-[#111418]">
          판옵티콘 (Panopticon)
        </h1>
        <p className="mt-4 max-w-[680px] text-xl leading-relaxed text-[#5a6775]">
          AI 훈련용 실험 데이터 수집 파이프라인의 상태를 관제하고 이상 상황을
          실시간으로 알리는 운영 시스템입니다.
        </p>
      </header>

      <section className="mt-12 grid gap-0 border-y border-[#c4c0b8]">
        {[
          ["Period", "2024.07 — 2026.02"],
          ["Role", "UBICOMP LAB / 학부연구생"],
          ["Scope", "관제 시스템 개발 · On-prem CI/CD · 실시간 알림"],
        ].map(([label, value], i) => (
          <div
            key={label}
            className={`grid gap-2 px-7 py-5 md:grid-cols-[140px_1fr] ${
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

      <section className="mt-12">
        <ProjectVisualPlaceholder />
      </section>

      <section className="mt-16">
        <h2 className="border-b-[2px] border-[#111418] pb-4 text-lg font-bold uppercase leading-none tracking-[2.5px] text-[#111418]">
          Overview
        </h2>
        <p className="mt-6 text-[17px] leading-relaxed text-[#111418]">
          연구실에서 운영하는 AI 훈련용 실험 데이터 수집 파이프라인은 장시간
          안정적으로 동작해야 합니다. Panopticon은 수집 상태를 한눈에 확인하고,
          지연이나 중단이 발생했을 때 빠르게 감지할 수 있도록 만든 관제 및 이상
          알림 시스템입니다.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="border-b-[2px] border-[#111418] pb-4 text-lg font-bold uppercase leading-none tracking-[2.5px] text-[#111418]">
          Contribution
        </h2>
        <ul className="border-b border-[#c4c0b8]">
          {highlights.map((item, i) => (
            <li
              key={item}
              className={`px-7 py-5 text-[15px] leading-relaxed text-[#5a6775] ${
                i > 0 ? "border-t border-[#c4c0b8]" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="border-b-[2px] border-[#111418] pb-4 text-lg font-bold uppercase leading-none tracking-[2.5px] text-[#111418]">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2 border-b border-[#c4c0b8] px-7 py-5">
          {skills.map((skill, i) => (
            <span
              key={skill}
              className={`text-xs font-medium ${
                i < 2
                  ? "border border-[#1a1a1a] bg-[#1a1a1a] px-3 py-1 text-white"
                  : "border border-[#ccc] px-3 py-1 text-[#555]"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
