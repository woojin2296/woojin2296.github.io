import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title:
    "Docker Compose는 여러 컨테이너를 하나의 애플리케이션으로 다루는 도구다 | Blog",
  description:
    "compose.yaml이 서비스, 네트워크, 볼륨을 하나의 프로젝트 모델로 해석되고 Docker Engine 리소스로 적용되는 내부 흐름을 정리한 글",
};

const references = [
  {
    label: "Docker Docs - Docker Compose",
    href: "https://docs.docker.com/compose/",
  },
  {
    label: "Docker Docs - How Compose works",
    href: "https://docs.docker.com/compose/compose-application-model/",
  },
  {
    label: "Docker Docs - docker compose up",
    href: "https://docs.docker.com/reference/cli/docker/compose/up/",
  },
  {
    label: "Docker Docs - docker compose down",
    href: "https://docs.docker.com/reference/cli/docker/compose/down/",
  },
  {
    label: "Docker Docs - docker compose config",
    href: "https://docs.docker.com/reference/cli/docker/compose/config/",
  },
  {
    label: "Docker Docs - Networking in Compose",
    href: "https://docs.docker.com/compose/how-tos/networking/",
  },
  {
    label: "Docker Docs - Compose services reference",
    href: "https://docs.docker.com/reference/compose-file/services/",
  },
  {
    label: "Docker Docs - Compose volumes reference",
    href: "https://docs.docker.com/reference/compose-file/volumes/",
  },
  {
    label: "Docker Docs - Variable interpolation",
    href: "https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/",
  },
];

export default function DockerComposeInternalsBlogPostPage() {
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
              Docker / Container · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              Docker Compose는 여러 컨테이너를 하나의 애플리케이션으로 다루는 도구다
            </h1>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              compose.yaml은 실행 명령이 아니라 모델이다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Compose 파일을 컨테이너 실행 스크립트처럼 보면 절반만 이해한 것입니다.
                공식 Compose 모델에서 애플리케이션의 계산 단위는{" "}
                <strong className="font-medium text-black">service</strong>입니다.
                하나의 service는 같은 이미지와 설정을 가진 컨테이너 하나 이상으로
                구현됩니다.
              </p>
              <p>
                서비스들은 <strong className="font-medium text-black">network</strong>
                로 통신하고, 영속 데이터는{" "}
                <strong className="font-medium text-black">volume</strong>에
                저장합니다. 런타임 설정은 environment, configs, secrets 같은 구성으로
                들어갑니다. 이 전체 묶음이 하나의 project가 됩니다.
              </p>
              <p>
                그래서 Compose에서 project name은 중요합니다. Compose는 project
                name을 기준으로 네트워크, 볼륨, 컨테이너 이름을 만들고, 관련 리소스에{" "}
                <InlineCode>com.docker.compose.project</InlineCode> 같은 label을
                붙여 같은 배포 단위로 추적합니다.
              </p>
            </div>
            <CodeBlock
              code={`services:
  web:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:18
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              docker compose up은 무엇을 하는가?
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>docker compose up</InlineCode>은 단순히 컨테이너를
                시작하는 명령이 아닙니다. Compose 파일을 읽고, 변수 치환과 파일 병합을
                수행하고, 서비스 모델을 정규화한 뒤, 필요한 Docker Engine 리소스를
                생성하거나 재사용합니다.
              </p>
              <p>
                서비스에 <InlineCode>build</InlineCode>가 있으면 이미지를 빌드하고,
                <InlineCode>image</InlineCode>만 있으면 필요한 이미지를 가져옵니다.
                그 다음 project network와 named volume을 만들고, 의존성 순서에 맞춰
                컨테이너를 만들고 시작합니다.
              </p>
              <p>
                이미 컨테이너가 떠 있는 상태에서 다시 <InlineCode>up</InlineCode>을
                실행하면 Compose는 서비스 설정이나 이미지가 바뀌었는지 확인합니다.
                바뀐 서비스는 중지 후 재생성하고, mounted volume은 보존합니다. 이
                덕분에 설정 변경은 반영하면서도 DB 데이터 같은 영속 데이터는 유지할
                수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/docker-compose-up-lifecycle.png"
              alt="docker compose up이 파일 읽기, 모델 만들기, 이미지 준비, 리소스 생성, 컨테이너 시작, 로그 연결 순서로 동작하는 흐름"
              width={1440}
              height={900}
              caption="up은 파일을 해석하는 단계와 Docker 리소스를 적용하는 단계로 나눠서 보면 이해하기 쉽습니다. Compose는 현재 상태와 선언 모델을 비교해 필요한 서비스만 재생성합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              네트워크: 컨테이너 IP가 아니라 서비스 이름으로 찾는다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Compose 파일에 network를 따로 선언하지 않아도 기본 network가
                만들어집니다. 보통 이름은 <InlineCode>&lt;project&gt;_default</InlineCode>
                형태입니다. 같은 network에 붙은 서비스들은 서로의 service name을 DNS
                이름처럼 사용할 수 있습니다.
              </p>
              <p>
                예를 들어 API 컨테이너가 Postgres에 붙을 때는{" "}
                <InlineCode>localhost</InlineCode>가 아니라 <InlineCode>db:5432</InlineCode>
                로 접속해야 합니다. 여기서 <InlineCode>db</InlineCode>는 서비스
                이름이고, <InlineCode>5432</InlineCode>는 컨테이너 내부 포트입니다.
              </p>
              <p>
                반대로 호스트 브라우저나 로컬 CLI에서 컨테이너로 접근하려면{" "}
                <InlineCode>ports</InlineCode>가 필요합니다. 컨테이너끼리 통신할 때는
                container port를 쓰고, 호스트에서 들어갈 때만 published host port를
                씁니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/docker-compose-network-dns.png"
              alt="Compose default network 안에서 web, api, db 서비스가 서비스 이름 DNS로 통신하고 호스트 접근에는 ports가 필요한 구조"
              width={1440}
              height={900}
              caption="컨테이너 IP는 재생성될 때 바뀔 수 있습니다. Compose 네트워크 안에서는 IP를 저장하지 말고 서비스 이름을 사용해야 합니다."
            />
            <CodeBlock
              code={`# 컨테이너 안에서 DB로 연결할 때
DATABASE_URL=postgres://user:pass@db:5432/app

# 호스트에서 published port로 접근할 때
psql postgres://user:pass@localhost:15432/app`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              볼륨: 컨테이너가 사라져도 데이터는 남아야 한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                컨테이너의 쓰기 계층은 컨테이너 수명에 묶입니다. 컨테이너가 삭제되면
                그 안에만 있던 데이터도 함께 사라집니다. 데이터베이스, 업로드 파일,
                개발 중 캐시처럼 보존해야 하는 데이터는 컨테이너 내부 파일시스템이
                아니라 volume이나 bind mount로 빼야 합니다.
              </p>
              <p>
                named volume은 Docker Engine이 관리하는 영속 저장소입니다. Compose
                project 안에서는 <InlineCode>db-data:/var/lib/postgresql/data</InlineCode>
                처럼 선언하고, top-level <InlineCode>volumes</InlineCode>에 이름을
                둡니다. bind mount는 호스트 경로를 컨테이너에 직접 연결합니다. 개발
                환경에서 소스 코드를 실시간 반영할 때 자주 씁니다.
              </p>
              <p>
                <InlineCode>docker compose down</InlineCode>은 기본적으로 서비스
                컨테이너와 네트워크를 제거합니다. named volume은 기본값으로 제거하지
                않습니다. 다만 <InlineCode>--volumes</InlineCode>를 붙이면 Compose
                파일에 선언된 named volume까지 제거될 수 있으므로 DB 데이터가 있는
                환경에서는 특히 조심해야 합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/docker-compose-volume-persistence.png"
              alt="container layer, named volume, bind mount의 수명 차이와 docker compose down 동작을 비교한 다이어그램"
              width={1440}
              height={900}
              caption="컨테이너는 교체 가능한 실행 단위이고, volume은 데이터를 보존하는 저장 단위입니다. 이 둘을 분리해야 재시작과 재생성을 안전하게 다룰 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              depends_on은 준비 완료를 뜻하지 않는다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>depends_on</InlineCode>은 서비스 생성과 시작 순서를 표현할
                때 사용합니다. 하지만 “컨테이너가 시작됐다”는 말과 “애플리케이션이
                요청을 받을 준비가 됐다”는 말은 다릅니다.
              </p>
              <p>
                데이터베이스 컨테이너가 시작되었더라도 내부 초기화, WAL 복구, schema
                준비가 끝나기 전이면 API 서버의 첫 연결은 실패할 수 있습니다. Redis나
                Kafka, LocalStack 같은 의존 서비스도 마찬가지입니다.
              </p>
              <p>
                준비 상태가 중요하다면 <InlineCode>healthcheck</InlineCode>를 정의하고
                long syntax의 <InlineCode>depends_on</InlineCode>에서{" "}
                <InlineCode>condition: service_healthy</InlineCode>를 사용해야 합니다.
                이때 Compose는 해당 dependency가 healthy 상태가 된 뒤 의존 서비스를
                생성하도록 기다릴 수 있습니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/docker-compose-dependency-healthcheck.png"
              alt="depends_on의 시작 순서와 healthcheck service_healthy의 준비 상태 보장을 비교한 다이어그램"
              width={1440}
              height={900}
              caption="depends_on은 순서 문제를 해결하고, healthcheck는 준비 상태 문제를 줄입니다. DB나 브로커처럼 초기화 시간이 있는 서비스에는 둘을 구분해서 써야 합니다."
            />
            <CodeBlock
              code={`services:
  api:
    build: .
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:18
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 10`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              환경 변수와 config 해석 흐름
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Compose 설정에서 가장 헷갈리는 부분 중 하나는 환경 변수입니다.{" "}
                <InlineCode>.env</InlineCode> 파일은 Compose 파일을 해석할 때 변수
                치환에 쓰입니다. 이것만으로 컨테이너 환경 변수가 자동 주입된다고
                보면 안 됩니다. 컨테이너 안으로 넣을 값은 <InlineCode>environment</InlineCode>
                나 <InlineCode>env_file</InlineCode>에 명시해야 합니다.
              </p>
              <p>
                Compose는 여러 파일을 병합하고, 변수 값을 치환하고, short syntax를
                canonical model로 펼친 뒤 실제로 Docker Engine에 적용할 모델을
                만듭니다. 그래서 실행 전에는 <InlineCode>docker compose config</InlineCode>
                로 해석 결과를 확인하는 습관이 좋습니다.
              </p>
              <p>
                특히 CI, 로컬, 스테이징에서 같은 <InlineCode>compose.yaml</InlineCode>
                을 쓰고 값만 다르게 넣는다면 <InlineCode>--env-file</InlineCode>과{" "}
                <InlineCode>docker compose config --environment</InlineCode>가 문제를
                줄여줍니다. 최종적으로 어떤 값이 치환됐는지 눈으로 확인할 수 있기
                때문입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/docker-compose-config-resolution.png"
              alt=".env와 compose files가 docker compose config를 거쳐 canonical model이 되고 Docker Engine API 요청으로 적용되는 흐름"
              width={1440}
              height={900}
              caption="Compose 설정은 실행 전에 한 번 실제 모델로 풀립니다. 이상한 값이 들어간 것 같다면 컨테이너 내부보다 먼저 config 출력부터 확인하는 편이 빠릅니다."
            />
            <CodeBlock
              code={`# .env
APP_PORT=8080
POSTGRES_VERSION=18

# compose.yaml
services:
  api:
    ports:
      - "\${APP_PORT}:8080"
  db:
    image: "postgres:\${POSTGRES_VERSION}"

# 해석 결과 확인
docker compose config --environment`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              내부 작동 방식은 reconcile에 가깝다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Compose를 이해할 때 “YAML을 읽어서 docker run을 여러 번 대신 쳐주는
                도구”라고만 보면 부족합니다. 더 정확하게는 선언 모델과 현재 Docker
                리소스 상태를 비교해서 필요한 작업을 수행하는 CLI 계층으로 보는 편이
                좋습니다.
              </p>
              <p>
                다만 Kubernetes 같은 지속적인 control loop는 아닙니다.{" "}
                <InlineCode>docker compose up</InlineCode>을 실행하는 순간 Compose가
                모델을 적용하고, detached mode라면 컨테이너는 백그라운드에서 계속
                실행됩니다. 그 이후에도 원하는 상태를 계속 감시하고 자동 복구하는
                컨트롤러로 동작한다고 생각하면 안 됩니다.
              </p>
            </div>
            <div className="mt-6">
              <ConceptRow
                title="리소스 추적"
                body="Compose는 project name과 label을 기준으로 자신이 만든 컨테이너, 네트워크, 볼륨을 추적합니다."
              />
              <ConceptRow
                title="변경 감지"
                body="서비스 설정이나 이미지가 달라지면 해당 컨테이너를 재생성합니다. 변하지 않은 서비스와 mounted volume은 가능한 한 재사용합니다."
              />
              <ConceptRow
                title="Engine 위의 CLI"
                body="실제 컨테이너, 네트워크, 볼륨을 만드는 주체는 Docker Engine입니다. Compose는 어떤 리소스가 필요한지 계산하고 Engine에 요청합니다."
              />
              <ConceptRow
                title="단일 호스트 중심의 편의성"
                body="Compose는 로컬 개발, 테스트, CI, 작은 운영 환경에 강합니다. 복잡한 스케줄링, 자동 복구, 롤링 업데이트는 별도의 오케스트레이션 계층을 검토해야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              실무에서 자주 헷갈리는 지점
            </h2>
            <div className="mt-6">
              <MistakeRow
                title="localhost를 컨테이너 사이 통신에 사용함"
                body="컨테이너 안의 localhost는 그 컨테이너 자신입니다. 다른 서비스로 가려면 Compose service name을 사용해야 합니다."
              />
              <MistakeRow
                title="depends_on만 있으면 DB 준비가 끝난다고 생각함"
                body="depends_on은 시작 순서이고 readiness는 healthcheck로 별도 표현해야 합니다."
              />
              <MistakeRow
                title="expose와 ports를 혼동함"
                body="서비스 간 통신은 같은 네트워크 안에서 container port로 이뤄집니다. 호스트에서 접근하려면 ports로 published port를 열어야 합니다."
              />
              <MistakeRow
                title="down --volumes를 습관적으로 실행함"
                body="로컬 DB 데이터까지 지워질 수 있습니다. 초기화가 목적이 아니라면 volume 제거 옵션은 분리해서 생각해야 합니다."
              />
              <MistakeRow
                title="민감 정보를 평문 환경 변수로 고정함"
                body="환경 변수는 편하지만 secret 저장소가 아닙니다. 실제 운영에서는 secrets, 외부 secret manager, 배포 시스템의 보안 기능을 함께 봐야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영 체크리스트
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Compose를 안정적으로 쓰려면 파일이 실행되는지보다 모델이 의도대로
                해석되는지 확인해야 합니다. 먼저 <InlineCode>docker compose config</InlineCode>
                로 최종 모델을 보고, 서비스 이름으로 통신하는지, 데이터가 named volume에
                있는지, readiness가 필요한 곳에 healthcheck가 있는지 확인합니다.
              </p>
              <p>
                포트는 “컨테이너끼리 쓰는 포트”와 “호스트가 접근하는 포트”를 분리해서
                적습니다. 환경 변수는 치환용 값과 컨테이너 주입용 값을 구분하고,
                secret은 평문 <InlineCode>.env</InlineCode>에 오래 두지 않는 편이
                좋습니다.
              </p>
              <p>
                정리하면 Docker Compose는 여러 컨테이너를 한 번에 띄우는 편의 도구를
                넘어, 애플리케이션의 실행 구조를 파일로 고정하는 도구입니다. Compose의
                내부 흐름을 알면 “왜 포트가 안 열리지?”, “왜 DB 연결이 실패하지?”,
                “왜 데이터가 사라졌지?” 같은 문제를 더 빠르게 좁힐 수 있습니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}



function ConceptRow({ title, body }: { title: string; body: string }) {
  return (
    <section className="border-t border-[#e5e5e5] py-5 first:border-t-0">
      <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
        {title}
      </h3>
      <p className="mt-2 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
        {body}
      </p>
    </section>
  );
}

function MistakeRow({ title, body }: { title: string; body: string }) {
  return (
    <section className="border-t border-[#e5e5e5] py-5 first:border-t-0">
      <h3 className="text-[18px] font-medium leading-[1.56] tracking-normal text-black">
        {title}
      </h3>
      <p className="mt-2 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
        {body}
      </p>
    </section>
  );
}
