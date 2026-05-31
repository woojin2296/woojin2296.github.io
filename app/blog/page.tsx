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
    title: "Node capacity와 Pod IP 부족으로 Pending이 길어진 장애 분석",
    description:
      "Kubernetes Pod Pending 장애를 image pull이나 GitOps 문제가 아니라 scheduler memory, AWS VPC CNI Pod IP, nodegroup scaling boundary 관점에서 분리해 분석했습니다.",
    date: "2026.05",
    category: "Incident / Kubernetes",
    tags: ["Kubernetes", "EKS", "Capacity"],
    href: "/blog/kubernetes-node-capacity-ip-memory/",
  },
  {
    title: "RDS connection exhaustion으로 readiness가 올라오지 않은 장애 분석",
    description:
      "백엔드 서비스 기동 중 datasource 설정 누락처럼 보였던 장애를 Hibernate JDBC metadata 조회 실패, MySQL Too many connections, Hikari pool 설정 관점에서 정리했습니다.",
    date: "2026.05",
    category: "Incident / RDS",
    tags: ["RDS", "HikariCP", "Spring Boot"],
    href: "/blog/rds-connection-exhaustion/",
  },
  {
    title: "리눅스 파일시스템과 디렉터리 구조 이해하기",
    description:
      "리눅스의 단일 루트 트리, mount point, inode와 path resolution, /etc, /usr, /var, /proc, /sys 같은 디렉터리 역할과 운영 실수를 정리했습니다.",
    date: "2026.05",
    category: "Linux / Filesystem",
    tags: ["Linux", "Filesystem", "Directory"],
    href: "/blog/linux-filesystem-directory-structure/",
  },
  {
    title: "자주 보이는 네트워크 포트 정리",
    description:
      "DevOps, Infra, Security 관점에서 HTTP, HTTPS, SSH, FTP, SMTP, SMB, Kerberos, LDAP, DB, Redis, MongoDB, SNMP, Syslog, NTP 포트와 노출 범위, 보안 포인트를 정리했습니다.",
    date: "2026.05",
    category: "Network / Security",
    tags: ["Port", "Security", "Infra"],
    href: "/blog/network-common-ports/",
  },
  {
    title: "DHCP는 네트워크 설정을 자동으로 임대해주는 프로토콜이다",
    description:
      "DHCP가 IP 주소, subnet mask, default gateway, DNS server를 자동으로 내려주는 방식과 DORA, lease, renewal, relay, 운영 장애 포인트를 정리했습니다.",
    date: "2026.05",
    category: "Network / DHCP",
    tags: ["DHCP", "Network", "IP"],
    href: "/blog/dhcp-network-basics/",
  },
  {
    title: "네트워크 계층별 프로토콜 정리",
    description:
      "OSI 7계층과 TCP/IP 관점에서 Ethernet, ARP, IP, ICMP, TCP, UDP, TLS, HTTP, DNS 같은 프로토콜이 어느 계층에서 어떤 역할을 하는지 정리했습니다.",
    date: "2026.05",
    category: "Network / Protocol",
    tags: ["Network", "Protocol", "OSI"],
    href: "/blog/network-protocol-layers/",
  },
  {
    title: "포트와 소켓은 같은 게 아니다",
    description:
      "Port가 TCP/UDP header의 번호이고 socket은 커널의 통신 endpoint라는 차이, listener socket과 established socket, 4-tuple로 하나의 포트에 여러 사용자가 붙는 원리를 정리했습니다.",
    date: "2026.05",
    category: "Network / TCP",
    tags: ["Port", "Socket", "TCP"],
    href: "/blog/network-port-socket/",
  },
  {
    title: "네트워크 계층별 스위치와 라우터 정리",
    description:
      "L1 hub/repeater, L2 switch, L3 router/L3 switch, L4 switch/load balancer, L7 reverse proxy를 각 계층의 판단 기준과 데이터 전달 흐름으로 정리했습니다.",
    date: "2026.05",
    category: "Network / Infrastructure",
    tags: ["Switch", "Router", "Network"],
    href: "/blog/network-switch-router-layers/",
  },
  {
    title: "VLAN과 Subnet은 네트워크를 나누는 계층이 다르다",
    description:
      "VLAN은 L2 broadcast domain을 나누고 Subnet은 L3 IP 주소 범위를 나눈다는 차이를 access/trunk, CIDR, gateway, inter-VLAN routing 관점에서 정리했습니다.",
    date: "2026.05",
    category: "Network / LAN",
    tags: ["VLAN", "Subnet", "Routing"],
    href: "/blog/vlan-subnet/",
  },
  {
    title: "Docker Compose는 여러 컨테이너를 하나의 애플리케이션으로 다루는 도구다",
    description:
      "compose.yaml이 서비스, 네트워크, 볼륨을 하나의 프로젝트 모델로 해석되고 Docker Engine 리소스로 적용되는 내부 흐름을 정리했습니다.",
    date: "2026.05",
    category: "Docker / Container",
    tags: ["Docker", "Compose", "Container"],
    href: "/blog/docker-compose-internals/",
  },
  {
    title: "UX Hierarchy는 사용자의 시선과 행동 흐름을 설계하는 구조다",
    description:
      "Visual Hierarchy와 Structural Hierarchy, 크기/색상/대비/여백/위치, CTA 우선순위와 모바일 화면에서의 계층 구조 설계를 정리했습니다.",
    date: "2026.05",
    category: "UX / UI",
    tags: ["UX", "Hierarchy", "UI"],
    href: "/blog/ux-hierarchy/",
  },
  {
    title: "CTA는 단순 버튼이 아니라 사용자의 행동을 설계하는 장치다",
    description:
      "Call To Action의 의미, 전환에서의 역할, 문구와 혜택 중심 설계, 위치 전략, Primary/Secondary CTA, 흔한 실수와 UX 관점의 체크리스트를 정리했습니다.",
    date: "2026.05",
    category: "UX / Conversion",
    tags: ["CTA", "UX", "Conversion"],
    href: "/blog/cta-call-to-action/",
  },
  {
    title: "JWT는 모두가 열어볼 수 있는데 왜 안전할까?",
    description:
      "JWT가 Base64URL로 열어볼 수 있는데도 인증에 쓰이는 이유를 JWS 서명, 변조 탐지, claim 검증, JWE와의 차이, 운영 보안 관점에서 정리했습니다.",
    date: "2026.05",
    category: "Auth / JWT",
    tags: ["JWT", "JWS", "Security"],
    href: "/blog/jwt-readable-but-safe/",
  },
  {
    title: "CORS는 서버 에러가 아니라 브라우저의 차단이다",
    description:
      "Origin, Access-Control-Allow-Origin, Preflight, Credentials, WebView, 모바일 앱, 실제 API 보안과 CORS의 경계를 정리했습니다.",
    date: "2026.05",
    category: "Web Security / Browser",
    tags: ["CORS", "Browser", "Security"],
    href: "/blog/cors-browser-policy/",
  },
  {
    title: "협업을 위한 최소한의 네트워크 지식",
    description:
      "인바운드 포트, 로컬과 서버 차이, 내부망과 외부망, DNS, IP, Port, NAT, DHCP, VPN, Proxy를 협업 관점에서 연결해 정리했습니다.",
    date: "2026.05",
    category: "Network / Collaboration",
    tags: ["Network", "DNS", "Troubleshooting"],
    href: "/blog/network-collaboration-basics/",
  },
  {
    title: "synchronized가 있는데도 쿠폰이 초과 발급되는 이유",
    description:
      "서버를 두 대로 늘린 뒤 쿠폰이 초과 발급되는 원인을 JVM local lock, Redis distributed lock, TTL, UUID token, watchdog, DB unique constraint 관점에서 정리했습니다.",
    date: "2026.05",
    category: "Concurrency / Redis",
    tags: ["Redis", "Distributed Lock", "Java"],
    href: "/blog/redis-distributed-lock-coupon/",
  },
  {
    title: "무중단 배포인데 결제 정합성이 깨지는 이유",
    description:
      "Spring Boot graceful shutdown, Kubernetes preStop, terminationGracePeriodSeconds, 결제 멱등키를 함께 설계해야 배포 중 결제 정합성을 지킬 수 있다는 내용을 정리했습니다.",
    date: "2026.05",
    category: "Deployment / Reliability",
    tags: ["Graceful Shutdown", "Kubernetes", "Idempotency"],
    href: "/blog/graceful-shutdown-idempotency/",
  },
  {
    title: "X-Forwarded-For를 믿고 IP 화이트리스트를 만들면 뚫리는 이유",
    description:
      "관리자 페이지 IP 화이트리스트가 X-Forwarded-For 헤더 spoofing으로 우회될 수 있는 이유와 Spring/Tomcat의 신뢰 프록시 설정을 정리했습니다.",
    date: "2026.05",
    category: "Security / Network",
    tags: ["X-Forwarded-For", "Proxy", "Spring"],
    href: "/blog/xff-ip-whitelist/",
  },
  {
    title: "DNS TTL이 지났는데도 Java 서버가 옛날 IP를 보는 이유",
    description:
      "DNS 레코드와 TTL은 정상인데 특정 Java 서버만 옛날 IP로 요청하던 원인을 InetAddress DNS 캐시와 JVM 프로세스 관점에서 정리했습니다.",
    date: "2026.05",
    category: "Network / Java",
    tags: ["DNS", "Java", "TTL"],
    href: "/blog/java-dns-cache/",
  },
  {
    title: "인덱스가 있는데도 MySQL 쿼리가 느린 이유",
    description:
      "회원 검색 API가 500만 건 테이블에서 풀 스캔을 타던 원인을 LIKE, 암묵적 타입 변환, 컬럼 함수, EXPLAIN type 관점에서 정리했습니다.",
    date: "2026.05",
    category: "Database / MySQL",
    tags: ["MySQL", "Index", "EXPLAIN"],
    href: "/blog/mysql-index-explain/",
  },
  {
    title: "네트워크 계층별 라우터와 라우팅 개념 이해하기",
    description:
      "L2 switching, L3 IP routing, L4/L7 traffic routing을 분리하고 route table, next hop, forwarding, NAT/LB까지 운영 관점에서 정리했습니다.",
    date: "2026.05",
    category: "Network / Routing",
    tags: ["Routing", "Router", "Network"],
    href: "/blog/network-routing-layers/",
  },
  {
    title: "Prometheus, Grafana, Loki, Alloy로 관측성 스택 이해하기",
    description:
      "Prometheus, Grafana, Loki, Grafana Alloy가 metrics와 logs를 수집, 저장, 시각화하는 역할을 운영 관점에서 분리해 정리했습니다.",
    date: "2026.05",
    category: "Observability",
    tags: ["Prometheus", "Grafana", "Loki", "Alloy"],
    href: "/blog/observability-stack/",
  },
  {
    title: "SSL/TLS 플로우와 패킷 구조 이해하기",
    description:
      "TLS 1.3 handshake, certificate validation, record layer, packet fragmentation/coalescing, 운영 장애 분석 관점을 정리했습니다.",
    date: "2026.05",
    category: "Network / TLS",
    tags: ["TLS", "HTTPS", "Packet"],
    href: "/blog/ssl-tls/",
  },
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

          <div className="grid gap-12">
            {blogPosts.map((post) => (
              <article key={post.title}>
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
