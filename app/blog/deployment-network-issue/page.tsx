import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "Deployment Network Issue: Docker pull 실패를 DNS 설정에서 찾기 | Blog",
  description:
    "학과 내부망 서버 배포 중 Docker image pull 실패를 IP/DNS 관점에서 좁혀 학교 DNS 서버 설정 복구로 해결한 트러블슈팅 기록",
};

export default function DeploymentNetworkIssuePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-[760px] px-5 pb-28 pt-10 sm:px-6">
        <Link
          href="/blog/"
          className="inline-flex h-9 items-center gap-2 text-sm font-medium text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          글 목록
        </Link>

        <article className="pt-[88px]">
          <header className="text-center">
            <p className="text-xs font-normal uppercase leading-[1.33] tracking-normal text-[#a3a3a3]">
              Troubleshooting · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[680px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              Deployment Network Issue
            </h1>
            <p className="mx-auto mt-5 max-w-[590px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              학과 내부망 서버에 서비스를 배포하던 중 Docker image pull이
              반복적으로 실패했습니다. 처음에는 서버의 외부 네트워크 연결 문제로
              보였지만, IP 통신과 도메인 이름 해석을 나누어 확인하면서 원인을 DNS
              설정 문제로 좁혔고, 최종적으로 학교 DNS 서버 설정을 복구해 해결한
              기록입니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              문제 상황
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                학과 내부망 서버에 애플리케이션을 배포하는 과정에서 Docker가
                registry에서 image를 가져오지 못했습니다. 배포 자체는 Docker 기반으로
                구성되어 있었기 때문에 image pull이 실패하면 컨테이너 실행 단계까지
                갈 수 없었습니다. 문제는 단순히 “Docker가 안 된다”가 아니라,
                Docker가 외부 registry 주소를 찾아가 image layer를 내려받는
                네트워크 경로 어딘가에서 실패하고 있다는 점이었습니다.
              </p>
              <p>
                이런 유형의 장애는 원인을 크게 세 갈래로 나누어 봐야 합니다. 첫째,
                서버가 외부 네트워크로 나갈 수 없는 경우입니다. 둘째, 네트워크는
                열려 있지만 도메인 이름을 IP 주소로 바꾸는 DNS 해석이 실패하는
                경우입니다. 셋째, DNS와 네트워크는 정상인데 Docker registry 인증,
                rate limit, proxy, 방화벽 정책 같은 상위 계층 문제가 있는 경우입니다.
              </p>
              <p>
                당시에는 Docker pull 명령이 계속 네트워크 에러로 실패했기 때문에,
                바로 Docker 설정을 바꾸기보다 서버의 기본 네트워크 상태부터 확인하는
                방식으로 접근했습니다. Docker는 결국 OS 네트워크 스택과 DNS resolver를
                사용하므로, OS 레벨에서 도메인 해석이 안 되면 Docker pull도 정상
                동작하기 어렵습니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              트러블슈팅 흐름
            </h2>
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              핵심은 “네트워크가 완전히 끊겼는지”와 “도메인 이름 해석만 실패하는지”를
              분리해서 확인하는 것이었습니다. IP 주소로 직접 통신했을 때와 도메인
              주소로 통신했을 때의 결과가 달라지면, 문제의 범위는 크게 좁아집니다.
            </p>
            <BlogDiagram
              src="/blog/deployment-network-issue-flow.png"
              alt="Docker pull 실패를 IP 연결 확인, 도메인 ping 실패, DNS 원인 축소, 학교 DNS 복구 순서로 해결한 트러블슈팅 흐름"
              width={1440}
              height={900}
              caption="IP 통신은 가능하지만 도메인 해석이 실패하는 상황을 기준으로 DNS 설정 문제를 의심했고, 내부망 환경에 맞는 학교 DNS 서버를 복구해 Docker pull을 정상화했습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              1. 먼저 Docker보다 서버 네트워크를 확인
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Docker pull 실패를 보면 Docker daemon, registry, image name부터
                의심하기 쉽습니다. 하지만 Docker가 외부 image를 가져오려면 먼저
                서버가 외부 주소로 패킷을 보낼 수 있어야 하고, registry 도메인을 IP로
                해석할 수 있어야 합니다. 그래서 Docker 설정을 건드리기 전에 서버의
                기본 연결 상태를 확인했습니다.
              </p>
              <p>
                첫 번째 확인은 IP 주소 기준 통신입니다. 특정 IP 주소로 ping이
                성공한다면 최소한 서버의 NIC, gateway, routing, 외부로 나가는 기본
                경로가 완전히 죽은 상태는 아니라고 볼 수 있습니다. 물론 ICMP가 막힌
                네트워크도 있지만, 이 경우에는 IP ping이 성공했기 때문에 “네트워크가
                완전히 끊긴 상황”은 우선순위에서 낮출 수 있었습니다.
              </p>
            </div>
            <CodeBlock
              code={`# IP 주소 기준 연결 확인
ping -c 3 8.8.8.8

# 기본 라우팅 확인
ip route

# 서버에 설정된 IP와 인터페이스 상태 확인
ip addr`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이 단계에서 중요한 것은 “ping이 된다”를 너무 넓게 해석하지 않는
              것입니다. IP 주소로 ping이 된다는 사실은 네트워크 경로 일부가 살아
              있다는 뜻이지, DNS나 HTTPS 통신, Docker registry 접근까지 모두
              정상이라는 뜻은 아닙니다. 그래서 다음 단계에서는 도메인 이름을 기준으로
              같은 방식의 확인을 진행했습니다.
            </p>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              2. IP ping은 성공하지만 도메인 ping은 실패
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                다음으로 도메인 주소를 대상으로 ping을 실행했습니다. 이때 IP 주소로는
                통신이 되지만 도메인 주소로는 실패하는 차이가 확인됐습니다. 이 차이는
                원인을 좁히는 데 매우 중요했습니다. 같은 서버에서 IP는 도달하지만
                도메인은 실패한다면, 패킷을 보낼 경로보다 도메인을 IP로 바꾸는 DNS
                resolver 쪽을 먼저 의심해야 합니다.
              </p>
              <p>
                Docker pull 역시 사람이 입력하는 image 이름을 registry 도메인으로
                해석하는 과정이 필요합니다. 예를 들어 Docker Hub나 private registry를
                사용할 때 Docker는 registry 도메인을 먼저 IP 주소로 해석하고, 그
                다음 HTTPS 연결을 맺어 manifest와 layer를 내려받습니다. 도메인 해석이
                안 되면 Docker는 registry에 도달하기 전 단계에서 실패합니다.
              </p>
            </div>
            <CodeBlock
              code={`# 도메인 이름 기준 확인
ping -c 3 google.com
ping -c 3 registry-1.docker.io

# DNS resolver가 실제로 응답하는지 확인
getent hosts google.com
getent hosts registry-1.docker.io`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              여기서 판단이 갈렸습니다. 서버가 외부로 전혀 나가지 못한다면 IP ping도
              실패했을 가능성이 큽니다. 하지만 IP 주소 기준 통신은 가능했고, 도메인
              기준 통신만 실패했습니다. 따라서 이 문제는 Docker 자체보다 서버의 DNS
              설정, resolver 설정, 내부망 DNS 정책과 관련될 가능성이 높다고 봤습니다.
            </p>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              3. 처음에는 외부 DNS로 해결하려 했다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                DNS 문제로 보였기 때문에 처음에는 가장 익숙한 방식으로 접근했습니다.
                resolver를 Cloudflare DNS인 1.1.1.1이나 Google DNS인 8.8.8.8로 바꾸면
                도메인 해석이 정상화될 것이라고 생각했습니다. 일반적인 개인 PC나
                외부망 서버에서는 이 방법으로 문제가 해결되는 경우가 많습니다.
              </p>
              <p>
                하지만 이 서버는 학과 내부망에 있는 서버였습니다. 내부망 서버는 외부
                DNS 서버로 직접 질의하는 것이 네트워크 정책상 막혀 있거나, 내부
                네트워크에서 반드시 학교 DNS 서버를 거쳐야 정상 동작하도록 구성되어
                있을 수 있습니다. 즉 “공개 DNS로 바꾸면 된다”는 일반적인 해결책이
                내부망 환경에서는 오히려 맞지 않을 수 있었습니다.
              </p>
            </div>
            <CodeBlock
              code={`# resolver 설정 확인 예시
cat /etc/resolv.conf

# systemd-resolved 사용 환경이라면
resolvectl status

# NetworkManager 사용 환경이라면
nmcli dev show | grep DNS`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              이 단계에서 얻은 교훈은 DNS 장애를 볼 때 “어떤 DNS 서버가 빠른가”보다
              “이 네트워크에서 어떤 DNS 서버를 사용해야 하는가”를 먼저 확인해야
              한다는 점입니다. 특히 학교, 회사, 연구실, 폐쇄망, VPN 환경에서는 외부
              공개 DNS가 정답이 아닐 수 있습니다. 내부 도메인 해석, 접근 제어, 보안
              정책이 내부 DNS를 전제로 설계되어 있을 가능성이 있기 때문입니다.
            </p>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              4. 학교 DNS 서버 설정이 유실된 것을 확인
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                원인을 더 확인해 보니 서버에서 사용해야 할 학교 DNS 서버 IP 설정이
                유실되어 있었습니다. 그래서 서버는 IP 기준 통신은 할 수 있었지만,
                도메인 이름을 해석할 resolver가 올바르게 지정되지 않은 상태였습니다.
                이 상태에서 Docker pull은 registry 도메인을 해석하지 못하고 네트워크
                에러로 실패했습니다.
              </p>
              <p>
                복구 방향은 단순했습니다. 외부 DNS가 아니라 학교 내부망에서 사용해야
                하는 DNS 서버 IP를 확인하고, 서버의 DNS 설정에 다시 반영했습니다.
                설정 반영 후에는 도메인 해석이 정상화되는지 먼저 확인했고, 그 다음
                Docker pull을 다시 실행했습니다.
              </p>
            </div>
            <CodeBlock
              code={`# DNS 설정 복구 후 확인할 항목
cat /etc/resolv.conf
getent hosts registry-1.docker.io
ping -c 3 registry-1.docker.io

# Docker pull 재시도
docker pull <image-name>:<tag>`}
            />
            <p className="mt-6 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              DNS 설정을 복구한 뒤 Docker image pull은 정상적으로 동작했습니다. 결과적으로
              Docker daemon이나 image 자체의 문제가 아니라, 배포 대상 서버의 DNS
              resolver 설정이 내부망 환경에 맞지 않게 빠져 있었던 것이 원인이었습니다.
            </p>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              왜 Docker pull 에러가 DNS 문제로 보이지 않았나
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                배포 중 만나는 에러는 보통 마지막에 실행한 명령을 기준으로 보이기
                쉽습니다. 이 경우 마지막 명령은 Docker pull이었기 때문에 문제도
                Docker 안에 있을 것처럼 보였습니다. 하지만 Docker pull은 registry
                도메인 해석, HTTPS 연결, 인증, manifest 조회, layer 다운로드가 모두
                이어져야 성공하는 복합 작업입니다.
              </p>
              <p>
                그래서 Docker pull 실패를 볼 때는 실패 메시지를 그대로 Docker
                레이어에서만 해석하지 말고, 한 단계 아래로 내려가야 합니다. 도메인
                해석이 되는지, registry IP로 연결 가능한지, TLS handshake까지 가는지,
                인증이 필요한 registry인지 순서대로 나누어 보면 원인을 빠르게 좁힐 수
                있습니다.
              </p>
              <p>
                이번 사례에서는 IP 통신과 도메인 통신을 분리해서 확인한 것이 핵심이었습니다.
                만약 바로 Docker 설정 파일이나 image 이름만 확인했다면 실제 원인인 DNS
                설정 유실을 더 늦게 발견했을 가능성이 큽니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/docker-pull-network-layers.png"
              alt="Docker pull이 DNS 해석, 라우팅, TCP TLS 연결, registry 인증, manifest 조회, layer 다운로드 단계를 거치는 구조 다이어그램"
              width={1440}
              height={900}
              caption="Docker pull은 DNS, 라우팅, TLS, registry 인증, manifest 조회, layer 다운로드가 이어지는 복합 작업이므로 마지막 에러 메시지보다 아래 계층을 분리해서 봐야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              같은 문제를 볼 때 사용할 점검 순서
            </h2>
            <div className="mt-6 grid gap-5 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <CheckItem
                title="IP 기준 연결과 도메인 기준 연결을 분리한다"
                body="IP 주소로는 통신이 되는데 도메인 이름만 실패하면 DNS resolver 설정을 우선 확인한다."
              />
              <CheckItem
                title="현재 서버가 어느 네트워크에 있는지 확인한다"
                body="내부망, VPN, 학교망, 회사망에서는 외부 공개 DNS보다 조직 내부 DNS를 사용해야 할 수 있다."
              />
              <CheckItem
                title="resolver 설정 파일만 보지 말고 실제 질의 결과를 확인한다"
                body="/etc/resolv.conf 내용과 getent hosts 결과를 함께 확인해야 설정과 실제 동작을 연결해 볼 수 있다."
              />
              <CheckItem
                title="Docker pull은 여러 네트워크 단계를 포함한다"
                body="DNS 해석, HTTPS 연결, registry 인증, manifest 조회, layer 다운로드 중 어느 단계에서 실패하는지 나누어 본다."
              />
              <CheckItem
                title="임시 수정과 영구 수정을 구분한다"
                body="직접 resolv.conf를 바꾸는 임시 수정은 재부팅이나 네트워크 재시작 후 사라질 수 있다. 운영 환경에서는 NetworkManager, netplan, systemd-resolved 등 실제 관리 주체에 맞춰 반영해야 한다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                이번 문제는 Docker pull 실패로 시작했지만, 실제 원인은 Docker 자체가
                아니라 서버의 DNS 설정이 내부망 환경에 맞게 유지되지 않은 것이었습니다.
                IP 주소 기준 통신은 가능했고 도메인 이름 기준 통신은 실패했기 때문에,
                네트워크 단절이 아니라 DNS 해석 문제로 원인을 좁힐 수 있었습니다.
              </p>
              <p>
                해결 과정에서 중요한 판단은 외부 공개 DNS를 바로 정답으로 두지 않은
                것입니다. 학과 내부망 서버는 학교 네트워크의 DNS 서버를 사용해야 했고,
                유실된 학교 DNS 서버 IP를 복구한 뒤 Docker pull이 정상 동작했습니다.
              </p>
              <p>
                이 경험을 통해 Linux 환경에서 CLI로 IP, routing, DNS resolver, Docker
                pull 실패를 계층별로 확인하는 방법을 익혔습니다. 배포 장애를 볼 때는
                마지막에 실패한 도구만 보는 것이 아니라, 그 도구가 의존하는 네트워크
                계층을 아래에서 위로 분리해 확인하는 것이 중요합니다.
              </p>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-6 overflow-x-auto rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-4 text-sm leading-relaxed text-black">
      <code>{code}</code>
    </pre>
  );
}

function CheckItem({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
        {title}
      </h3>
      <p className="mt-2 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
        {body}
      </p>
    </section>
  );
}
