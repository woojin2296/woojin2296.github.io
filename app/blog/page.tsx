import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Blog | Lim Woojin Portfolio",
  description: "임우진의 개발 기록과 인프라 트러블슈팅 글 목록",
};

type BlogPost = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  href: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "인증서 만료로 앱 로그인 전체가 막힌 장애 분석",
    description:
      "도봉라이프 API 도메인의 TLS 인증서 만료로 앱 인증 기능이 동시에 실패한 장애를 진단하고, Certbot 갱신 방식을 webroot로 정리한 기록입니다.",
    date: "2026.05",
    category: "Incident / TLS",
    tags: ["TLS", "Nginx", "Certbot"],
    href: "/blog/tls-certificate-expiry/",
  },
  {
    title: "DNS 플로우와 레코드를 운영 관점에서 이해하기",
    description:
      "Recursive resolver, authoritative zone, DNS message, TTL, delegation, 주요 레코드 타입과 장애 분석 흐름을 정리했습니다.",
    date: "2026.05",
    category: "Network / DNS",
    tags: ["DNS", "Network", "Record"],
    href: "/blog/dns/",
  },
  {
    title: "Deployment Network Issue",
    description:
      "학과 내부망 서버 배포 중 Docker image pull 실패를 IP 통신과 DNS 해석 관점으로 분리해 원인을 좁히고 학교 DNS 서버 설정 복구로 해결한 기록입니다.",
    date: "2026.05",
    category: "Troubleshooting",
    tags: ["Docker", "DNS", "Linux"],
    href: "/blog/deployment-network-issue/",
  },
  {
    title: "OIDC는 OAuth 2.0 위에서 인증을 어떻게 완성하는가",
    description:
      "Authorization Code Flow, ID Token 검증, Discovery, JWKS, PKCE, state와 nonce까지 OIDC의 핵심 흐름을 정리했습니다.",
    date: "2026.05",
    category: "Identity / Auth",
    tags: ["OIDC", "OAuth 2.0", "JWT"],
    href: "/blog/oidc/",
  },
  {
    title: "IRSA로 EKS Pod에 필요한 AWS 권한만 부여하기",
    description:
      "Kubernetes ServiceAccount와 IAM Role을 연결해 Pod 단위 권한을 분리하는 IRSA의 동작 흐름과 구성 포인트를 정리했습니다.",
    date: "2026.05",
    category: "AWS / EKS",
    tags: ["IRSA", "IAM", "EKS"],
    href: "/blog/irsa/",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-[760px] px-5 pb-28 pt-10 sm:px-6">
        <Link
          href="/"
          className="inline-flex h-9 items-center gap-2 text-sm font-medium text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          돌아가기
        </Link>

        <header className="flex flex-col gap-4 py-[88px] text-center">
          <h1 className="font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
            Blog
          </h1>
          <p className="mx-auto max-w-[540px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
            프로젝트를 진행하며 정리한 기술 기록과 설계 회고를 모았습니다.
          </p>
        </header>

        <section aria-labelledby="blog-posts-heading">
          <div className="mb-6 flex items-end justify-between gap-6">
            <h2
              id="blog-posts-heading"
              className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black"
            >
              글 목록
            </h2>
            <p className="text-sm font-normal leading-relaxed text-[#737373]">
              {blogPosts.length} posts
            </p>
          </div>

          <div>
            {blogPosts.map((post) => (
              <article key={post.title} className="border-b border-[#e5e5e5] py-6">
                <div className="grid gap-4 sm:grid-cols-[144px_1fr] sm:gap-8">
                  <div className="grid content-start gap-2">
                    <p className="text-xs font-normal uppercase leading-[1.33] tracking-normal text-[#a3a3a3]">
                      {post.date}
                    </p>
                    <p className="text-sm font-medium leading-[1.43] tracking-normal text-black">
                      {post.category}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <BlogPostLink post={post} />
                    <p className="text-base font-normal leading-relaxed tracking-normal text-[#737373]">
                      {post.description}
                    </p>
                    <ul className="flex flex-wrap gap-2" aria-label="Tags">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-[#fafafa] px-3 py-1.5 text-sm font-normal leading-none tracking-normal text-black"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function BlogPostLink({ post }: { post: BlogPost }) {
  const className =
    "inline-flex items-center gap-2 text-[20px] font-medium leading-[1.4] tracking-normal text-black underline-offset-4 hover:underline";

  const content = (
    <>
      <span>{post.title}</span>
      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </>
  );

  return (
    <Link href={post.href} className={className}>
      {content}
    </Link>
  );
}
