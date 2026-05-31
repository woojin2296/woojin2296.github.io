import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { InlineCode } from "../_components/blog-elements";

export const metadata = {
  title: "UX Hierarchy는 사용자의 시선과 행동 흐름을 설계하는 구조다 | Blog",
  description:
    "UX Hierarchy의 의미, Visual Hierarchy와 Structural Hierarchy의 차이, 크기/색상/대비/여백/위치, CTA 우선순위와 모바일 계층 구조를 정리한 글",
};

export default function UxHierarchyBlogPostPage() {
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
              UX / UI · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              UX Hierarchy는 사용자의 시선과 행동 흐름을 설계하는 구조다
            </h1>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              UX Hierarchy란?
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                UX Hierarchy는 사용자가 화면에서 무엇을 먼저 보고, 어떻게 이해하고, 어떤
                행동을 하게 만들지 설계하는 UX/UI의 핵심 원칙입니다. 하이어라키 또는 계층
                구조라고도 부릅니다.
              </p>
              <p>
                이 개념은 단순히 요소를 예쁘게 배치하는 것이 아닙니다. 정보의 중요도와
                사용자의 행동 흐름을 시각적으로 제어하는 구조 설계에 가깝습니다. 사용자는
                화면의 모든 요소를 동일한 중요도로 보지 않기 때문에, 디자이너와 개발자는
                요소 간 우선순위를 만들어야 합니다.
              </p>
              <p>
                예를 들어 가장 중요한 CTA 버튼은 더 크게 보이게 하고, 보조 설명은 작고
                차분하게 두고, 핵심 정보는 상단에 배치하고, 연관된 요소는 가까이 묶습니다.
                이런 방식으로 정보의 위계를 만드는 것이 Hierarchy입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/ux-hierarchy-attention-flow.png"
              alt="사용자가 핵심 정보, 이해 보조, 다음 행동 순서로 화면을 이해하는 UX Hierarchy 흐름"
              width={1440}
              height={900}
              caption="UX Hierarchy는 사용자가 화면을 해석하는 순서를 설계합니다. 중요한 정보가 먼저 보이고, 설명이 따라오고, 마지막에 행동으로 이어져야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              왜 중요한가?
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Hierarchy가 없으면 사용자는 어디를 먼저 봐야 하는지 모릅니다. 중요한 기능을
                놓치고, 화면은 복잡하게 느껴지고, 행동 흐름은 끊깁니다. 기능이 많아서
                어려운 것이 아니라 우선순위가 보이지 않아서 어려운 경우가 많습니다.
              </p>
              <p>
                반대로 Hierarchy가 명확하면 정보 이해 속도가 빨라집니다. 사용자는 화면을
                하나하나 읽지 않고도 중요한 것부터 파악하고, 자연스럽게 다음 행동으로
                이동합니다. UX 피로도는 줄고, CTA 클릭 같은 전환 가능성은 올라갑니다.
              </p>
              <p>
                좋은 UX는 사용자가 “생각하지 않고도” 흐름을 따라가게 만듭니다. 여기서
                생각하지 않는다는 말은 사용자를 속인다는 뜻이 아니라, 불필요한 해석 비용을
                줄인다는 뜻입니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              대표적인 UX Hierarchy 요소
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                위계는 한 가지 속성만으로 만들어지지 않습니다. 크기, 색상, 대비, 여백,
                위치가 함께 작동하면서 사용자의 시선을 움직입니다.
              </p>
              <p>
                큰 요소는 더 중요하게 인식됩니다. 그래서 메인 제목, 핵심 CTA 버튼, 대표
                이미지는 보통 더 큰 크기를 갖습니다. 색상도 시선을 끄는 장치입니다. 구매
                버튼만 포인트 컬러를 쓰거나, 경고 메시지에 빨간색을 쓰는 이유가 여기에
                있습니다.
              </p>
              <p>
                대비는 밝기, 굵기, 색 차이로 중요도를 표현합니다. 제목은 굵게, 설명은
                회색으로, 활성 버튼은 높은 대비로 보여 주는 방식입니다. 여백은 관련된
                요소를 묶고 서로 다른 그룹을 분리합니다. 여백이 부족하면 화면은 복잡하고
                피로하게 느껴집니다.
              </p>
              <p>
                위치도 중요합니다. 사용자는 일반적으로 상단을 먼저 보고, 중앙에 집중하고,
                좌측에서 읽기 시작합니다. 따라서 핵심 정보와 CTA는 보통 상단이나 시선 흐름
                위에 배치됩니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/ux-hierarchy-principles.png"
              alt="크기, 색상, 대비, 여백, 위치가 UX Hierarchy를 만드는 대표 요소임을 보여주는 다이어그램"
              width={1440}
              height={900}
              caption="Hierarchy는 크기 하나로만 결정되지 않습니다. 크기, 색상, 대비, 여백, 위치가 함께 작동해야 우선순위가 명확해집니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Visual Hierarchy와 Structural Hierarchy
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Hierarchy는 크게 Visual Hierarchy와 Structural Hierarchy로 나누어 볼 수
                있습니다. Visual Hierarchy는 “무엇이 더 중요해 보이는가”의 문제입니다.
                크기, 색상, 대비, 타이포그래피처럼 눈에 보이는 요소가 중심입니다.
              </p>
              <p>
                Structural Hierarchy는 “정보가 어떤 구조로 연결되는가”의 문제입니다. 메뉴
                구조, 카테고리, 페이지 depth, breadcrumb, 내비게이션 흐름이 여기에
                들어갑니다.
              </p>
              <p>
                UX에서는 두 가지가 함께 설계되어야 합니다. 버튼이 눈에 잘 보여도 사용자가
                현재 위치와 다음 경로를 이해하지 못하면 길을 잃습니다. 반대로 정보 구조가
                좋아도 시각적 우선순위가 약하면 중요한 행동을 놓칩니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/ux-hierarchy-visual-structural.png"
              alt="Visual Hierarchy와 Structural Hierarchy를 비교하고 두 구조가 함께 필요함을 보여주는 다이어그램"
              width={1440}
              height={900}
              caption="Visual Hierarchy는 보이는 중요도이고, Structural Hierarchy는 정보의 연결 구조입니다. 실무 UX에서는 둘 중 하나만으로 충분하지 않습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              사용자는 읽지 않고 스캔한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                사용자는 화면을 처음부터 끝까지 정독하지 않습니다. 먼저 제목, 키워드, 버튼,
                강조 텍스트를 훑고, 그다음 필요하다고 판단한 부분만 자세히 읽습니다. 그래서
                Hierarchy는 문장을 잘 쓰는 것만큼이나 스캔 가능한 구조를 만드는 일이기도
                합니다.
              </p>
              <p>
                긴 목록이나 검색 결과처럼 텍스트가 많은 화면에서는 <InlineCode>F-Pattern</InlineCode>이
                자주 나타납니다. 사용자는 상단을 가로로 훑고, 다시 조금 아래를 훑은 뒤,
                좌측 축을 따라 내려갑니다.
              </p>
              <p>
                랜딩 페이지처럼 짧고 목적이 분명한 화면에서는 <InlineCode>Z-Pattern</InlineCode>을
                활용하기도 합니다. 좌상단에서 우상단, 다시 좌하단을 거쳐 우하단 CTA로 시선이
                흐르도록 배치하는 방식입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/ux-hierarchy-scan-patterns.png"
              alt="F-Pattern과 Z-Pattern으로 사용자의 화면 스캔 흐름을 보여주는 다이어그램"
              width={1440}
              height={900}
              caption="사용자는 화면을 읽기 전에 스캔합니다. 제목, 키워드, 버튼, 강조 텍스트가 빠르게 잡혀야 화면의 목적을 이해할 수 있습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              실무에서 중요한 포인트
            </h2>
            <div className="mt-6">
              <PointRow
                title="CTA는 한 화면에 하나가 가장 강하다"
                body="버튼이 많을수록 사용자는 행동을 결정하지 못합니다. 핵심 전환을 하나 정하고, 나머지는 보조 행동으로 낮추는 편이 좋습니다."
              />
              <PointRow
                title="모든 요소를 강조하면 아무것도 강조되지 않는다"
                body="강조 색상, 굵은 글씨, 큰 버튼을 동시에 많이 쓰면 위계가 무너집니다. 강조는 제한적으로 사용할 때만 힘이 생깁니다."
              />
              <PointRow
                title="사용자는 읽지 않고 스캔한다"
                body="제목, 키워드, 버튼, 강조 텍스트 중심으로 빠르게 이해할 수 있어야 합니다. 중요한 문장을 본문 깊숙이 숨기면 발견되지 않습니다."
              />
              <PointRow
                title="모바일에서는 Hierarchy가 더 중요하다"
                body="화면이 작기 때문에 우선순위, 간격, 터치 영역, 정보 압축이 더 중요해집니다. 데스크톱에서 보이는 위계가 모바일에서는 쉽게 무너질 수 있습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              좋은 Hierarchy와 나쁜 Hierarchy
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                좋은 Hierarchy는 핵심 CTA가 명확하고, 정보 흐름이 자연스럽고, 섹션 구분이
                분명합니다. 사용자는 고민하지 않고 “다음에 무엇을 하면 되는지” 이해합니다.
              </p>
              <p>
                나쁜 Hierarchy는 버튼 색상이 전부 강하고, 텍스트 크기가 모두 비슷하고,
                정보가 과도하게 밀집되어 있습니다. 사용자는 어디를 눌러야 하는지, 무엇을
                먼저 읽어야 하는지 다시 생각해야 합니다.
              </p>
              <p>
                결국 좋은 Hierarchy는 선택지를 없애는 것이 아니라 선택 비용을 줄이는
                것입니다. 사용자가 판단해야 할 순간을 줄이고, 중요한 행동을 자연스럽게
                드러냅니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/ux-hierarchy-good-bad-mobile.png"
              alt="좋은 UX Hierarchy와 나쁜 UX Hierarchy를 모바일 화면 예시로 비교한 다이어그램"
              width={1440}
              height={900}
              caption="좋은 Hierarchy는 사용자의 선택 비용을 줄입니다. 특히 모바일에서는 작은 화면 안에서 우선순위, 간격, 터치 영역이 더 선명해야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                UX Hierarchy는 단순한 디자인 기술이 아닙니다. 사용자의 시선과 행동을
                설계하는 구조입니다. 어떤 정보를 먼저 보여 줄지, 어떤 설명을 보조로 둘지,
                어떤 행동을 가장 강하게 제안할지 정하는 일입니다.
              </p>
              <p>
                좋은 Hierarchy는 사용자가 생각 없이도 자연스럽게 행동하게 만듭니다. 화면을
                읽는 순서와 서비스가 원하는 행동 흐름이 맞아떨어질 때 UX는 가벼워집니다.
              </p>
              <p>
                그래서 화면을 설계할 때는 “예쁜가”보다 먼저 “무엇이 먼저 보이는가”를 봐야
                합니다. 사용자의 눈이 움직이는 순서가 곧 사용자의 행동이 시작되는 순서입니다.
              </p>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}


function PointRow({ title, body }: { title: string; body: string }) {
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
