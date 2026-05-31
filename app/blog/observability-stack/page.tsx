import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "Prometheus, Grafana, Loki, Alloy로 관측성 스택 이해하기 | Blog",
  description:
    "Prometheus, Grafana, Loki, Grafana Alloy가 metrics와 logs를 어떻게 수집, 저장, 시각화하는지 운영 관점에서 정리한 글",
};

const references = [
  {
    label: "Prometheus - Overview",
    href: "https://prometheus.io/docs/introduction/overview/",
  },
  {
    label: "Prometheus - Data model",
    href: "https://prometheus.io/docs/concepts/data_model/",
  },
  {
    label: "Grafana - Dashboards",
    href: "https://grafana.com/docs/grafana/latest/visualizations/dashboards/",
  },
  {
    label: "Grafana Loki - Overview",
    href: "https://grafana.com/docs/loki/latest/",
  },
  {
    label: "Grafana Loki - Understand labels",
    href: "https://grafana.com/docs/loki/latest/get-started/labels/",
  },
  {
    label: "Grafana Alloy - Introduction",
    href: "https://grafana.com/docs/alloy/latest/introduction/",
  },
];

export default function ObservabilityStackBlogPostPage() {
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
              Observability · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              Prometheus, Grafana, Loki, Alloy로 관측성 스택 이해하기
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              Prometheus, Grafana, Loki, Grafana Alloy는 모두 관측성 도구로
              묶이지만 담당하는 계층이 다릅니다. metrics와 logs가 어디에서 수집되고,
              어떤 저장 모델로 들어가며, Grafana에서 어떻게 함께 보는지 운영 관점에서
              정리합니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              먼저 역할을 분리해서 보기
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                이 스택을 처음 보면 Prometheus도 데이터를 모으고, Loki도 데이터를
                모으고, Grafana도 데이터를 보여주고, Alloy도 수집을 담당하기 때문에
                역할이 겹쳐 보입니다. 하지만 실제 운영에서는 책임 경계를 분리해야
                이해가 쉽습니다.
              </p>
              <p>
                <strong className="font-medium text-black">Prometheus</strong>는
                metrics 중심의 time series 저장소이자 쿼리/알림 엔진입니다.{" "}
                <strong className="font-medium text-black">Loki</strong>는 logs를
                저장하고 LogQL로 조회하는 로그 백엔드입니다.{" "}
                <strong className="font-medium text-black">Grafana</strong>는 여러
                데이터 소스를 한 화면에 연결하는 시각화/탐색 계층입니다.{" "}
                <strong className="font-medium text-black">Grafana Alloy</strong>는
                metrics, logs, traces, profiles 같은 telemetry를 수집하고 필요한
                백엔드로 보내는 collector 역할을 합니다.
              </p>
              <p>
                여기서 “엘로이”는 공식 명칭인 Grafana Alloy를 의미한다고 보고
                설명합니다. Alloy는 단순 로그 에이전트 하나가 아니라 OpenTelemetry
                Collector 기반의 수집 파이프라인이며, Prometheus 방식의 metrics
                수집과 Loki 로그 전송을 함께 구성할 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/observability-stack-architecture.png"
              alt="Workloads, Grafana Alloy, Prometheus, Loki, Grafana가 연결되는 관측성 스택 아키텍처 다이어그램"
              width={1440}
              height={900}
              caption="Alloy는 수집과 전처리 경로를 담당하고, Prometheus와 Loki는 각각 metrics와 logs를 저장합니다. Grafana는 두 백엔드를 데이터 소스로 연결해 운영자가 같은 화면에서 상태와 원인을 함께 볼 수 있게 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Prometheus: metrics를 time series로 저장
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Prometheus의 기본 단위는 time series입니다. 예를 들어{" "}
                <InlineCode>http_requests_total</InlineCode>이라는 metric name에{" "}
                <InlineCode>method=&quot;POST&quot;</InlineCode>,{" "}
                <InlineCode>status=&quot;500&quot;</InlineCode>,{" "}
                <InlineCode>service=&quot;api&quot;</InlineCode> 같은 label이 붙으면
                하나의 시계열이 됩니다. 같은 metric name이라도 label 값이 다르면
                별도의 series로 저장됩니다.
              </p>
              <p>
                Prometheus는 보통 HTTP pull 방식으로 target의{" "}
                <InlineCode>/metrics</InlineCode> endpoint를 주기적으로 scrape합니다.
                애플리케이션이 직접 metric을 노출하거나, node exporter,{" "}
                <InlineCode>kube-state-metrics</InlineCode>, blackbox exporter 같은
                exporter가 시스템 상태를 Prometheus 형식으로 노출합니다.
              </p>
              <p>
                운영에서 Prometheus를 볼 때 핵심은 “무엇을 측정할 것인가”와
                “어떤 label 차원으로 쪼갤 것인가”입니다. label은 필터링과 aggregation
                기준이 되지만, label 값 조합이 늘어나면 series 수가 급격히 증가합니다.
                그래서 request ID, user ID, timestamp처럼 거의 매 요청마다 바뀌는 값을
                metric label로 넣는 것은 피해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`# 예시 PromQL
sum by (service, status) (
  rate(http_requests_total{environment="production"}[5m])
)

# 예시 alert rule 조건
rate(http_requests_total{status=~"5.."}[5m]) > 0.05`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Loki: 로그 본문이 아니라 label을 인덱싱
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Loki는 Elasticsearch처럼 로그 본문 전체를 인덱싱하는 방향이 아닙니다.
                Loki의 핵심은 log line 자체는 chunk로 압축해 저장하고, 검색의 첫
                진입점은 label index로 좁히는 것입니다. 이 구조 덕분에 운영 비용을
                줄일 수 있지만, label 설계를 잘못하면 성능 문제가 커집니다.
              </p>
              <p>
                Loki에서 같은 label 집합을 공유하는 로그는 하나의 log stream으로
                묶입니다. 예를 들어{" "}
                <InlineCode>{`{service="api", environment="production"}`}</InlineCode>
                은 API 서비스의 운영 로그 stream을 찾는 좋은 출발점입니다. 그 이후
                구체적인 에러 메시지, request ID, 사용자 ID 같은 값은 LogQL의 filter
                표현식이나 structured metadata로 좁히는 편이 안전합니다.
              </p>
              <p>
                따라서 Loki label은 “이 로그가 어디에서 나왔는가”를 설명해야 합니다.
                서비스명, namespace, cluster, region, environment처럼 값 범위가
                제한된 정보는 label로 적합합니다. 반대로 request ID나 order ID처럼
                값이 계속 새로 생기는 정보는 label로 승격하지 않는 편이 좋습니다.
              </p>
            </div>
            <CodeBlock
              code={`# 예시 LogQL
{service_name="api-server", environment="production"} |= "timeout"

# request_id는 label보다 log body 필터로 찾는 편이 안전한 경우가 많다.
{service_name="api-server"} |= "request_id=8f3a9"`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Grafana: 저장소가 아니라 관측 화면
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Grafana는 Prometheus나 Loki처럼 telemetry를 직접 저장하는 계층으로
                이해하면 혼란스럽습니다. Grafana의 핵심은 data source를 연결하고,
                query 결과를 panel, dashboard, Explore 화면으로 보여주는 것입니다.
                Prometheus에는 PromQL을 보내고, Loki에는 LogQL을 보내며, 필요하면
                같은 대시보드 안에서 metrics와 logs를 나란히 보여줄 수 있습니다.
              </p>
              <p>
                운영자는 보통 Grafana에서 먼저 이상 신호를 봅니다. 예를 들어 API
                latency가 튀거나 5xx rate가 증가하면 Prometheus panel에서 시간대를
                확인하고, 같은 service/environment label을 기준으로 Loki 로그로
                이동해 원인 메시지를 찾습니다. 이때 metrics와 logs의 label 체계가
                서로 맞아야 전환이 자연스럽습니다.
              </p>
              <p>
                좋은 dashboard는 모든 값을 다 보여주는 화면이 아니라 판단 순서를
                압축한 화면입니다. 서비스 상태를 보여주는 SLI, 인프라 리소스, 오류율,
                로그 링크를 한 흐름으로 배치하면 장애 때 “어디부터 봐야 하는가”가
                줄어듭니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Alloy: 수집 파이프라인을 한 곳에서 구성
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Grafana Alloy는 telemetry collector입니다. 기존에는 Prometheus Agent,
                Promtail, OpenTelemetry Collector처럼 신호별 collector를 따로 두는
                구성이 흔했습니다. Alloy는 metrics, logs, traces, profiles 수집을
                한 설정 안에서 구성할 수 있게 해서 collector 운영 복잡도를 줄이는
                쪽에 가깝습니다.
              </p>
              <p>
                Kubernetes 환경에서는 Alloy가 pod discovery로 scrape target을 찾고,
                Prometheus metrics pipeline으로 metric을 수집한 뒤 Prometheus 계열
                백엔드로 보낼 수 있습니다. 동시에 container log를 tailing하고,
                필요한 label과 structured metadata를 정리해 Loki로 보낼 수도 있습니다.
              </p>
              <p>
                Alloy를 쓴다고 모든 문제가 자동으로 해결되는 것은 아닙니다. 오히려
                수집 경로가 한 곳에 모이기 때문에 label 규칙, relabeling, sampling,
                remote write endpoint, Loki label 정책을 명확히 잡아야 합니다. collector
                설정은 “데이터를 모으는 코드”이자 운영 계약으로 다루는 편이 좋습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/observability-telemetry-flow.png"
              alt="애플리케이션에서 나온 metrics와 logs가 Alloy 파이프라인을 거쳐 Prometheus와 Loki에 저장되고 Grafana에서 연결되는 흐름 다이어그램"
              width={1440}
              height={900}
              caption="metrics는 scrape/relabel/remote write 흐름으로 Prometheus에 들어가고, logs는 tail/parse/label/push 흐름으로 Loki에 들어갑니다. Grafana에서 두 신호를 연결하려면 service, namespace, environment 같은 공통 식별자가 맞아야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              label과 cardinality가 가장 중요한 운영 포인트
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Prometheus와 Loki는 모두 label을 중요하게 사용합니다. 하지만 두
                시스템에서 label을 무제한으로 늘리면 저장 비용과 쿼리 성능이 빠르게
                악화됩니다. Prometheus에서는 label 조합이 time series 수를 만들고,
                Loki에서는 label 조합이 log stream 수를 만듭니다.
              </p>
              <p>
                좋은 label은 값의 범위가 제한되어 있고, 운영자가 실제로 자주 필터링할
                축이어야 합니다. 서비스명, 환경, namespace, cluster, region, endpoint
                그룹처럼 길게 유지되는 값이 여기에 속합니다. 반대로 request ID, trace
                ID, user ID, full URL, timestamp는 값이 너무 많아 label로 쓰기 어렵습니다.
              </p>
              <p>
                상세 검색이 필요 없는 것은 아닙니다. 다만 그 값은 label이 아니라
                로그 본문, structured metadata, trace attribute 같은 위치에 두고,
                먼저 낮은 cardinality label로 범위를 좁힌 뒤 세부 문자열로 필터링하는
                방식이 운영에 더 안정적입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/observability-label-cardinality.png"
              alt="Prometheus와 Loki에서 좋은 label과 나쁜 label을 cardinality 기준으로 나누는 다이어그램"
              width={1440}
              height={900}
              caption="service, environment, namespace처럼 bounded value를 가진 값은 label로 적합하지만, request ID, user ID, timestamp처럼 계속 새로 생기는 값은 series와 stream 수를 폭발시킬 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 분석 흐름으로 보면 더 명확하다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                예를 들어 사용자가 “로그인이 느리다”고 제보했다고 가정합니다. 먼저
                Grafana dashboard에서 API latency, error rate, pod restart, CPU/memory
                사용량을 봅니다. 이 값들은 Prometheus metric으로 확인하는 영역입니다.
              </p>
              <p>
                특정 시간대와 서비스가 좁혀지면 같은 label을 기준으로 Loki에서 로그를
                봅니다. 이때 <InlineCode>service_name</InlineCode>,{" "}
                <InlineCode>environment</InlineCode>, <InlineCode>namespace</InlineCode>
                가 metrics와 logs에 일관되게 들어가 있으면, dashboard에서 Explore로
                이동해 바로 같은 범위의 로그를 확인할 수 있습니다.
              </p>
              <p>
                Alloy는 이 연결의 앞단에 있습니다. 어떤 target을 scrape할지, 어떤
                로그 파일 또는 Kubernetes pod log를 읽을지, 어떤 label을 붙일지,
                어떤 backend로 보낼지를 결정합니다. 결국 장애 분석 속도는 dashboard
                구성만이 아니라 수집 단계의 label 설계에서 이미 많이 결정됩니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영 체크리스트
            </h2>
            <div className="mt-6">
              <NoteRow
                title="수집 대상과 저장 대상을 분리해서 문서화한다"
                body="Alloy가 무엇을 scrape하거나 tailing하는지, Prometheus와 Loki 중 어디로 보내는지 먼저 정리합니다. 수집 경로가 불명확하면 dashboard가 맞아도 데이터 누락을 찾기 어렵습니다."
              />
              <NoteRow
                title="metrics와 logs의 공통 label을 맞춘다"
                body="service, environment, namespace, cluster 같은 식별자가 두 신호에서 다르게 들어가면 Grafana에서 metric과 log를 연결하기 어렵습니다."
              />
              <NoteRow
                title="high cardinality label을 초기에 막는다"
                body="request ID, user ID, pod UID, timestamp, full path처럼 값이 계속 늘어나는 항목은 label로 승격하기 전에 실제 쿼리 패턴과 비용을 확인해야 합니다."
              />
              <NoteRow
                title="알림은 증상 기준, 대시보드는 판단 순서 기준으로 둔다"
                body="알림은 사용자가 체감할 수 있는 오류율, latency, availability 기준으로 잡고, dashboard는 원인을 좁히는 순서대로 metrics와 logs를 배치하는 편이 좋습니다."
              />
              <NoteRow
                title="collector 설정도 배포 코드처럼 관리한다"
                body="Alloy 설정은 운영 데이터 계약입니다. relabeling, log processing, remote write endpoint가 바뀌면 dashboard와 alert가 함께 영향을 받으므로 코드 리뷰와 버전 관리 대상으로 두는 것이 안전합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Prometheus, Grafana, Loki, Alloy는 같은 목적을 가진 중복 도구가
                아니라 서로 다른 계층을 맡는 조합입니다. Prometheus는 metrics를
                time series로 저장하고, Loki는 logs를 label 기반 stream으로 저장하며,
                Alloy는 수집 파이프라인을 구성하고, Grafana는 그 결과를 사람이 판단할
                수 있는 화면으로 연결합니다.
              </p>
              <p>
                이 스택의 성패는 “도구를 설치했는가”보다 “어떤 label 체계로 데이터를
                연결했는가”에 달려 있습니다. metrics와 logs가 같은 서비스 식별자를
                공유하고, high cardinality 값을 label로 올리지 않으며, Grafana
                dashboard가 장애 분석 순서대로 설계되어 있을 때 운영자는 문제를 더
                빠르게 좁힐 수 있습니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
