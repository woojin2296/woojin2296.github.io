import Link from "next/link";

export const metadata = {
  title: "SCH MiniProject Submission System | Lim Woojin Portfolio",
  description: "ML/DL 강의 과제 제출 및 랭킹 관리 시스템",
};

const highlights = [
  "과제 제출, 평가, 랭킹 관리를 통합한 웹 서비스 설계 및 개발",
  "세션 기반 인증과 계층형 권한 구조로 학생 및 관리자 흐름 분리",
  "파일 업로드 검증 로직을 구현해 제출 데이터의 안정성 확보",
  "Docker Compose 기반 배포와 감사 로그 시스템으로 운영 가시성 개선",
];

const skills = ["Next.js", "SQLite", "Docker Compose"];

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

export default function SchMiniProjectPage() {
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
          Project No.3
        </p>
        <h1 className="mt-4 text-[clamp(36px,6vw,64px)] font-bold leading-tight text-[#111418]">
          SCH MiniProject Submission System
        </h1>
        <p className="mt-4 max-w-[680px] text-xl leading-relaxed text-[#5a6775]">
          학과 ML/DL 강의에서 사용하는 과제 제출, 평가, 랭킹 관리를 하나의
          흐름으로 연결한 강의 운영 시스템입니다.
        </p>
      </header>

      <section className="mt-12 grid gap-0 border-y border-[#c4c0b8]">
        {[
          ["Period", "2025.06 — 2026.02"],
          ["Role", "개인 프로젝트"],
          ["Scope", "과제 제출 · 평가 관리 · 랭킹 · 감사 로그"],
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
          SCH MiniProject Submission System은 학과 ML/DL 강의에서 프로젝트
          과제를 제출하고 결과를 확인하는 과정을 단순화하기 위해 만든
          서비스입니다. 현재 2학기 간 강의 운영에 실제로 사용되었고, 월 평균 약
          40명의 학생이 이용했습니다.
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
                i === 0
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
