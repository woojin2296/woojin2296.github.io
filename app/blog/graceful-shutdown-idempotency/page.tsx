import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";

export const metadata = {
  title: "무중단 배포인데 결제 정합성이 깨지는 이유 | Blog",
  description:
    "Spring Boot graceful shutdown, Kubernetes preStop, terminationGracePeriodSeconds, 결제 멱등키를 함께 설계해야 무중단 배포 중 결제 정합성을 지킬 수 있다는 내용을 정리한 글",
};

const references = [
  {
    label: "Spring Boot - Graceful Shutdown",
    href: "https://docs.spring.io/spring-boot/reference/web/graceful-shutdown.html",
  },
  {
    label: "Spring Boot - Kubernetes Probes",
    href: "https://docs.spring.io/spring-boot/reference/actuator/endpoints.html#actuator.endpoints.kubernetes-probes",
  },
  {
    label: "Kubernetes - Container Lifecycle Hooks",
    href: "https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/",
  },
  {
    label: "Kubernetes - Pod Termination Flow",
    href: "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination",
  },
  {
    label: "Stripe - Idempotent Requests",
    href: "https://docs.stripe.com/api/idempotent_requests",
  },
];

export default function GracefulShutdownIdempotencyBlogPostPage() {
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
              Deployment / Reliability · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              무중단 배포인데 결제 정합성이 깨지는 이유
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              배포는 무중단이라고 공지했는데 배포 때마다 결제 클레임이 들어오는
              경우가 있습니다. payment gateway에는 결제가 성공했지만 우리 DB에는
              주문이 없는 상태가 생깁니다. 이 문제는 서버 종료 흐름과 결제 멱등성을
              함께 봐야 원인이 보입니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              결제는 됐는데 주문이 없다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                결제 API는 보통 하나의 HTTP 요청 안에서 두 종류의 side effect를
                만듭니다. 먼저 외부 payment gateway에 결제를 승인하고, 그 다음 우리
                DB에 주문과 결제 상태를 저장합니다. 정상적으로 끝나면 사용자는 주문
                완료 화면을 봅니다.
              </p>
              <p>
                문제는 배포 중 종료 신호가 이 요청 중간에 들어올 때입니다. 외부
                gateway 호출은 성공했는데, DB insert 또는 transaction commit 전에
                애플리케이션 프로세스가 종료되면 외부에는 돈이 움직였고 내부에는
                주문이 없는 상태가 됩니다.
              </p>
              <p>
                이 상황은 로그만 보면 더 헷갈립니다. gateway에는 성공 거래가 있고,
                우리 서비스에는 timeout, connection reset, pod termination 같은
                흔적만 남습니다. 사용자는 결제됐다고 주장하고, DB에는 주문이 없으니
                운영팀은 수동 대조를 하게 됩니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/graceful-shutdown-payment-gap.png"
              alt="배포 종료 중 payment gateway 결제는 성공했지만 Spring Boot Pod가 SIGTERM으로 종료되어 Order DB 저장이 누락되는 정합성 간극 다이어그램"
              width={1440}
              height={900}
              caption="외부 결제 승인과 내부 주문 저장은 하나의 로컬 transaction으로 묶이지 않습니다. 종료 신호가 이 사이에 들어오면 gateway에는 결제가 있고 DB에는 주문이 없는 상태가 생길 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              종료 신호는 생각보다 빨리 온다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Kubernetes에서 Pod가 종료되면 kubelet은 컨테이너의 main process에
                보통 <InlineCode>SIGTERM</InlineCode>을 보냅니다. 그리고{" "}
                <InlineCode>terminationGracePeriodSeconds</InlineCode> 안에 종료되지
                않으면 <InlineCode>SIGKILL</InlineCode>로 강제 종료합니다. 기본 grace
                period는 30초입니다.
              </p>
              <p>
                Spring Boot의 graceful shutdown은 이 구간에서 새 요청은 더 받지 않고,
                이미 처리 중인 요청은 timeout 안에서 끝까지 처리할 수 있게 해 줍니다.
                Spring Boot 현재 문서는 embedded Tomcat, Jetty, Reactor Netty에서
                graceful shutdown이 기본 활성화되어 있다고 설명하지만, 실제 운영에서는
                Spring Boot 버전, <InlineCode>server.shutdown=immediate</InlineCode>
                설정, 종료 방식에 따라 동작이 달라질 수 있습니다.
              </p>
              <p>
                그래서 결제처럼 중요한 요청이 있는 서비스는 graceful shutdown을
                명시적으로 확인해야 합니다. “우리 서버는 무중단 배포니까 괜찮다”가
                아니라, 종료 중에 새 요청을 거부하고 진행 중 요청을 기다리는지 실제
                설정과 배포 흐름으로 확인해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`server:
  shutdown: graceful

spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Spring만 설정하면 끝이 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                graceful shutdown은 애플리케이션 내부 요청 처리만 봅니다. 하지만
                트래픽은 Kubernetes Service, Ingress, cloud load balancer를 거쳐
                들어옵니다. 이 레이어들이 아직 종료 중인 Pod로 요청을 보내고 있다면
                Spring이 아무리 graceful하게 종료해도 새 요청이 이미 들어오는 문제가
                남습니다.
              </p>
              <p>
                Kubernetes는 Pod가 종료될 때 EndpointSlice에서 해당 endpoint를
                terminating 상태로 표시하고 ready를 false로 둡니다. readiness probe가
                실패하면 Service endpoint에서도 제외됩니다. 다만 외부 load balancer나
                ingress controller가 이 변화를 반영하는 데는 시간이 걸릴 수 있습니다.
              </p>
              <p>
                그래서 자주 쓰는 패턴이 <InlineCode>preStop</InlineCode>입니다.
                <InlineCode>preStop</InlineCode>에서 짧게 기다리면 endpoint 제거와
                load balancer 반영이 먼저 일어날 시간을 벌 수 있습니다. 그 다음
                <InlineCode>SIGTERM</InlineCode>이 전달되고, Spring graceful shutdown이
                진행 중 요청을 drain합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/graceful-shutdown-drain-flow.png"
              alt="Kubernetes Pod delete, endpoint ready false, preStop drain delay, SIGTERM, Spring Boot graceful shutdown이 순서대로 진행되는 무중단 배포 종료 흐름 다이어그램"
              width={1440}
              height={900}
              caption="진행 중 요청을 지키려면 애플리케이션만이 아니라 플랫폼 흐름도 맞아야 합니다. endpoint 제거와 load balancer 반영 시간을 확보한 뒤, Spring graceful shutdown이 in-flight 요청을 마무리해야 합니다."
            />
            <CodeBlock
              code={`terminationGracePeriodSeconds: 60
containers:
  - name: order-api
    lifecycle:
      preStop:
        exec:
          command: ["/bin/sh", "-c", "sleep 15"]
    readinessProbe:
      httpGet:
        path: /actuator/health/readiness
        port: 8080`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              grace period는 총예산이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                여기서 중요한 점은 <InlineCode>preStop</InlineCode>이 grace period
                밖에서 공짜로 실행되는 시간이 아니라는 것입니다. Kubernetes 문서에
                따르면 Pod의 termination grace period countdown은{" "}
                <InlineCode>preStop</InlineCode> 실행 전에 시작됩니다. 즉 60초를
                줬는데 <InlineCode>preStop</InlineCode>에서 50초를 쓰면 애플리케이션이
                실제로 종료할 수 있는 시간은 거의 남지 않습니다.
              </p>
              <p>
                따라서 <InlineCode>terminationGracePeriodSeconds</InlineCode>는
                <InlineCode>preStop</InlineCode> 대기 시간과 Spring graceful shutdown
                timeout을 합친 값보다 커야 합니다. 긴 결제 요청이 최대 20초 걸리고
                load balancer 반영을 위해 10초를 기다린다면 30초 기본값은 빠듯합니다.
              </p>
              <p>
                반대로 너무 길게 잡으면 배포 속도와 장애 복구 속도가 느려집니다. 이
                값은 “대충 넉넉히”가 아니라 실제 요청 latency, external API timeout,
                DB transaction 시간, 배포 controller의 rollout 전략을 보고 정해야
                합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              그래도 긴 작업은 끊길 수 있다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                graceful shutdown은 손실을 크게 줄이지만 모든 문제를 없애지는
                못합니다. 긴 batch transaction, Kafka consumer 처리, 외부 API retry가
                겹친 요청, 느린 DB commit은 grace period 안에 끝나지 않을 수 있습니다.
                시간이 끝나면 Kubernetes는 결국 강제 종료를 진행합니다.
              </p>
              <p>
                특히 외부 API와 내부 DB를 함께 변경하는 요청은 더 조심해야 합니다.
                외부 payment gateway는 이미 승인했는데 우리 DB transaction이
                commit되지 않은 상태에서 프로세스가 죽을 수 있습니다. 이 구간은
                infrastructure option만으로 완전히 제거할 수 없습니다.
              </p>
              <p>
                이때 필요한 안전망이 멱등성입니다. 같은 결제 의도가 두 번 실행되어도
                외부 payment gateway에는 같은 <InlineCode>Idempotency-Key</InlineCode>
                를 보내고, 내부 DB에는 같은 주문 키나 결제 키에 unique constraint를
                둬야 합니다. 재시도가 들어와도 중복 결제가 아니라 같은 결과를 회수할
                수 있어야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/graceful-shutdown-idempotency-safety.png"
              alt="결제 요청에 idempotency key를 붙이고 payment gateway와 order service가 같은 결제 의도를 같은 결과로 처리하는 멱등성 안전망 다이어그램"
              width={1440}
              height={900}
              caption="graceful shutdown은 요청이 중간에 끊길 확률을 줄입니다. 멱등키와 DB unique key, webhook/reconciler는 남은 재시도와 정합성 복구 경로를 안전하게 만듭니다."
            />
            <CodeBlock
              code={`// 같은 주문 결제 시도에는 같은 멱등키를 사용한다.
String idempotencyKey = "payment:" + orderId;

paymentGateway.approve(
  paymentRequest,
  RequestOptions.builder()
    .setIdempotencyKey(idempotencyKey)
    .build()
);

// 내부 DB도 같은 키를 중복 생성하지 못하게 막는다.
// UNIQUE(order_id), UNIQUE(payment_idempotency_key)`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              결제 정합성은 상태 머신으로 본다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                멱등키만 붙이면 끝나는 것도 아닙니다. 우리 DB에는 결제 요청의 상태가
                남아 있어야 합니다. 예를 들어{" "}
                <InlineCode>PAYMENT_REQUESTED</InlineCode>,{" "}
                <InlineCode>PG_APPROVED</InlineCode>,{" "}
                <InlineCode>ORDER_CREATED</InlineCode>,{" "}
                <InlineCode>FAILED</InlineCode>처럼 상태를 나누면 어디에서 끊겼는지
                재처리할 수 있습니다.
              </p>
              <p>
                첫 요청이 gateway 승인 후 DB 저장 전에 끊겼다면, 같은 멱등키로 다시
                요청했을 때 gateway는 기존 승인 결과를 돌려줄 수 있습니다. 서비스는
                그 결과를 기반으로 누락된 주문 상태를 이어서 저장합니다. webhook이나
                reconciliation job도 같은 원칙으로 paid-but-missing 상태를 찾아
                복구해야 합니다.
              </p>
              <p>
                Stripe의 idempotency 문서도 같은 키로 재시도하면 최초 요청의 결과를
                재사용한다고 설명합니다. provider마다 세부 동작과 보관 시간이 다르기
                때문에 실제 payment gateway 문서를 기준으로 key 생성 규칙, TTL,
                파라미터 불일치 처리, 재시도 정책을 확인해야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              점검 순서
            </h2>
            <div className="mt-6">
              <NoteRow
                title="Spring graceful shutdown 동작을 실제 버전에서 확인한다"
                body="현재 Spring Boot 문서는 graceful shutdown이 기본 활성화되어 있다고 설명하지만, 운영 서비스의 Spring Boot 버전과 server.shutdown 설정, 종료 신호 전달 방식을 확인해야 합니다."
              />
              <NoteRow
                title="preStop과 terminationGracePeriodSeconds를 함께 계산한다"
                body="preStop sleep은 load balancer 반영 시간을 벌기 위한 짧은 지연으로만 쓰고, 전체 grace period 안에 preStop 시간과 애플리케이션 drain 시간이 모두 들어가게 잡습니다."
              />
              <NoteRow
                title="readiness와 endpoint 제거 흐름을 검증한다"
                body="Pod 종료 시 Service endpoint와 외부 load balancer가 실제로 언제 트래픽을 중단하는지 배포 로그와 access log로 확인합니다."
              />
              <NoteRow
                title="외부 API 호출은 멱등키로 감싼다"
                body="결제 승인처럼 외부 side effect가 있는 호출은 같은 결제 의도에 같은 idempotency key를 사용하고, 재시도해도 같은 결과를 회수할 수 있어야 합니다."
              />
              <NoteRow
                title="DB에는 unique key와 복구 가능한 상태를 남긴다"
                body="order_id, payment_idempotency_key, gateway_transaction_id 같은 키에 unique constraint를 두고, webhook 또는 reconciliation job이 paid-but-missing 상태를 복구하게 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                무중단 배포는 “Pod를 하나씩 바꾼다”만으로 완성되지 않습니다. 종료 중인
                인스턴스에 새 요청이 들어오지 않게 하고, 이미 들어온 요청은 끝까지
                처리할 시간을 줘야 합니다. Spring Boot graceful shutdown, Kubernetes
                readiness, <InlineCode>preStop</InlineCode>,{" "}
                <InlineCode>terminationGracePeriodSeconds</InlineCode>가 한 흐름으로
                맞아야 합니다.
              </p>
              <p>
                그래도 결제처럼 외부 API와 내부 DB 사이에 정합성 구간이 있는 작업은
                언제든 중간에 끊길 수 있습니다. 인프라 설정은 손실 확률을 줄이지만,
                남은 실패를 안전하게 되돌리거나 이어서 처리하려면 멱등키, unique key,
                상태 머신, webhook/reconciliation이 필요합니다.
              </p>
              <p>
                그래서 정답은 둘 다입니다. graceful shutdown과 platform drain으로
                진행 중 요청을 먼저 지키고, 그 위에서 모든 외부 side effect를
                멱등하게 만들어야 합니다. 인프라가 손실을 줄이고 멱등성이 재시도를
                안전하게 만들 때 무중단 배포는 결제 정합성까지 포함하게 됩니다.
              </p>
            </div>
          </section>

          <footer className="pt-[88px]">
            <h2 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
              참고 자료
            </h2>
            <ul className="mt-4 grid gap-2 text-sm font-normal leading-relaxed tracking-normal text-[#737373]">
              {references.map((reference) => (
                <li key={reference.href}>
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-black underline-offset-4 hover:underline"
                  >
                    {reference.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </footer>
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

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[6px] bg-[#fafafa] px-1.5 py-0.5 font-mono text-sm text-black">
      {children}
    </code>
  );
}

function NoteRow({ title, body }: { title: string; body: string }) {
  return (
    <section className="py-5">
      <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
        {title}
      </h3>
      <p className="mt-2 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
        {body}
      </p>
    </section>
  );
}
