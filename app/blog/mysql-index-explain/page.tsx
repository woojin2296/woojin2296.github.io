import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "인덱스가 있는데도 MySQL 쿼리가 느린 이유 | Blog",
  description:
    "회원 검색 API가 500만 건 테이블에서 풀 스캔을 타던 원인을 LIKE, 암묵적 타입 변환, 컬럼 함수, EXPLAIN access type 관점에서 정리한 글",
};

const references = [
  {
    label: "MySQL 8.0 - How MySQL Uses Indexes",
    href: "https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html",
  },
  {
    label: "MySQL 8.0 - Range Optimization",
    href: "https://dev.mysql.com/doc/refman/8.0/en/range-optimization.html",
  },
  {
    label: "MySQL 8.4 - EXPLAIN Output Format",
    href: "https://dev.mysql.com/doc/refman/8.4/en/explain-output.html",
  },
  {
    label: "MySQL 8.0 - CREATE INDEX Statement",
    href: "https://dev.mysql.com/doc/refman/8.0/en/create-index.html",
  },
  {
    label: "MySQL 9.7 - Type Conversion in Expression Evaluation",
    href: "https://dev.mysql.com/doc/refman/9.7/en/type-conversion.html",
  },
];

export default function MysqlIndexExplainBlogPostPage() {
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
              Database / MySQL · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              인덱스가 있는데도 MySQL 쿼리가 느린 이유
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              회원 검색 API가 느리다는 제보를 받고 확인해 보니 인덱스는 이미
              있었습니다. 그런데 500만 건 테이블에서 쿼리가 3초 가까이 걸렸고,
              실행 계획은 풀 스캔에 가까웠습니다. 문제는 인덱스의 존재가 아니라
              인덱스를 탈 수 없는 조건식이었습니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              인덱스는 정렬된 목차다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                B-tree 인덱스는 책 뒤의 색인처럼 정렬된 목차에 가깝습니다. 이름
                컬럼에 인덱스가 있고 <InlineCode>김%</InlineCode>으로 시작하는
                회원을 찾는다면 MySQL은 “김”이 시작되는 구간으로 이동해 필요한
                범위만 읽을 수 있습니다. 이때는 인덱스가 검색 시작점을 알려줍니다.
              </p>
              <p>
                하지만 <InlineCode>%철수%</InlineCode>처럼 앞에 wildcard가 붙으면
                상황이 달라집니다. 값의 왼쪽부터 정렬된 B-tree에서는 “철수”가 문자열
                중간 어디에 포함되어 있는지 바로 찾을 수 없습니다. 결국 각 값을 읽고
                문자열 포함 여부를 검사해야 합니다.
              </p>
              <p>
                MySQL range optimization 문서도 B-tree 인덱스에서{" "}
                <InlineCode>LIKE</InlineCode>가 range 조건이 되려면 패턴이 wildcard로
                시작하지 않아야 한다고 설명합니다. 그래서 인덱스를 만들어도{" "}
                <InlineCode>LIKE &apos;%keyword%&apos;</InlineCode> 검색은 기대한
                방식으로 인덱스를 타지 못합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/mysql-index-btree-like.png"
              alt="B-tree 인덱스에서 LIKE '김%'은 range scan이 가능하지만 LIKE '%철수%'는 시작점을 찾지 못하는 다이어그램"
              width={1440}
              height={900}
              caption="B-tree 인덱스는 왼쪽부터 정렬된 값의 범위를 찾는 데 강합니다. 앞쪽이 고정된 prefix 검색은 range scan이 가능하지만, 앞에 wildcard가 붙은 포함 검색은 시작점을 만들 수 없습니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              가장 흔한 원인 1: 앞에 붙은 wildcard
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                회원 이름 검색에서 자주 나오는 실수는 “포함 검색”을 기본값으로
                만드는 것입니다. 사용자는 <InlineCode>철수</InlineCode>라고 입력하지만
                서버 쿼리는 <InlineCode>name LIKE &apos;%철수%&apos;</InlineCode>로
                나갑니다. 이 조건은 이름 인덱스가 있어도 B-tree의 정렬 순서를
                활용하기 어렵습니다.
              </p>
              <p>
                검색 요구사항이 “김으로 시작하는 회원”이면 prefix 검색으로 바꾸는
                것이 맞습니다. 반대로 “이름 어디든 포함되는 회원”이 정말 필요하다면
                일반 B-tree 인덱스 하나로 해결하려고 하면 안 됩니다. MySQL FULLTEXT,
                n-gram parser, 별도 검색 엔진, 검색 전용 denormalized column 같은
                선택지를 요구사항과 언어 특성에 맞춰 검토해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`-- 인덱스는 있어도 시작점을 찾기 어렵다.
SELECT id, name
FROM members
WHERE name LIKE '%철수%';

-- B-tree 인덱스가 range로 접근하기 쉬운 형태
SELECT id, name
FROM members
WHERE name LIKE '김%';`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              가장 흔한 원인 2: 타입이 맞지 않아 암묵적 변환이 발생한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                문자열 컬럼에 숫자 값을 그대로 비교하는 것도 위험합니다. 예를 들어
                전화번호 컬럼이 <InlineCode>VARCHAR</InlineCode>인데 쿼리가{" "}
                <InlineCode>phone = 1012345678</InlineCode>처럼 나가면 MySQL은 서로
                다른 타입을 비교하기 위해 암묵적 타입 변환을 수행할 수 있습니다.
              </p>
              <p>
                MySQL 문서는 서로 다른 타입의 피연산자가 있을 때 비교 가능하도록
                타입 변환이 일어날 수 있고, 문자열과 숫자 비교는 숫자 비교로 처리될
                수 있다고 설명합니다. 이런 상황에서는 문자열 인덱스의 정렬 값을
                그대로 비교하기 어려워집니다. <InlineCode>&apos;1&apos;</InlineCode>,{" "}
                <InlineCode>&apos;01&apos;</InlineCode>,{" "}
                <InlineCode>&apos; 1&apos;</InlineCode>처럼 숫자로 변환하면 같은 값처럼
                비교될 수 있는 문자열이 많기 때문입니다.
              </p>
              <p>
                해결은 단순합니다. 컬럼 타입에 맞는 파라미터 타입을 보내야 합니다.
                ORM이나 query builder를 쓸 때도 bind parameter가 문자열 컬럼에 숫자로
                묶이지 않는지 확인해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`-- phone이 VARCHAR라면 좋지 않은 형태
SELECT id, phone
FROM members
WHERE phone = 1012345678;

-- 컬럼 타입과 비교 값 타입을 맞춘다.
SELECT id, phone
FROM members
WHERE phone = '1012345678';`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              가장 흔한 원인 3: 컬럼에 함수를 씌운다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                날짜 검색에서도 비슷한 문제가 자주 발생합니다.{" "}
                <InlineCode>created_at</InlineCode>에 인덱스가 있는데{" "}
                <InlineCode>DATE(created_at) = &apos;2026-05-19&apos;</InlineCode>
                처럼 작성하면 MySQL은 저장된 인덱스 값인{" "}
                <InlineCode>created_at</InlineCode> 자체가 아니라, 각 row에 함수를
                적용한 결과를 비교해야 합니다.
              </p>
              <p>
                일반 인덱스는 원본 컬럼 값 기준으로 정렬되어 있습니다. 조건식에서
                원본 컬럼을 다른 값으로 변환해 버리면, 그 정렬 순서를 그대로 사용할
                수 없습니다. 날짜 하루를 찾고 싶다면 함수로 왼쪽 컬럼을 감싸기보다
                원본 컬럼에 대해 반열린 범위를 거는 편이 안전합니다.
              </p>
              <p>
                MySQL 8.0.13 이상에서는 functional key parts, 즉 expression 값을
                인덱싱하는 함수 기반 인덱스를 만들 수 있습니다. 다만 이 경우에도
                query의 expression과 index expression이 맞아야 하고, 모든 케이스의
                일반적인 해결책은 아닙니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/mysql-index-sargability-killers.png"
              alt="앞 wildcard, 암묵적 타입 변환, 컬럼 함수가 인덱스 사용을 어렵게 만드는 케이스와 대안을 정리한 다이어그램"
              width={1440}
              height={900}
              caption="조건식이 인덱스 키를 직접 비교하지 못하게 만들면 인덱스가 있어도 효율적인 seek가 어렵습니다. prefix 검색, 타입 일치, 원본 컬럼 range 조건처럼 optimizer가 범위를 만들 수 있는 형태로 바꿔야 합니다."
            />
            <CodeBlock
              code={`-- created_at 인덱스를 기대하기 어려운 형태
SELECT id, created_at
FROM members
WHERE DATE(created_at) = '2026-05-19';

-- 원본 컬럼에 range 조건을 건다.
SELECT id, created_at
FROM members
WHERE created_at >= '2026-05-19 00:00:00'
  AND created_at <  '2026-05-20 00:00:00';

-- MySQL 8.0.13+에서는 expression index를 검토할 수 있다.
CREATE INDEX idx_members_created_date
ON members ((DATE(created_at)));`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              EXPLAIN에서 type=index면 안심해도 될까?
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                인덱스 문제를 확인할 때 가장 먼저 보는 도구가{" "}
                <InlineCode>EXPLAIN</InlineCode>입니다. 하지만{" "}
                <InlineCode>key</InlineCode>에 인덱스 이름이 보인다고 곧바로 좋은
                실행 계획이라고 판단하면 안 됩니다. 특히{" "}
                <InlineCode>type=index</InlineCode>는 이름 때문에 오해하기 쉽습니다.
              </p>
              <p>
                MySQL 문서에서 <InlineCode>type=index</InlineCode>는{" "}
                <InlineCode>ALL</InlineCode>과 비슷하지만 table row 대신 index tree를
                scan하는 접근으로 설명됩니다. 커버링 인덱스라면 table row를 읽지 않아
                더 나을 수 있지만, 여전히 인덱스 전체를 처음부터 끝까지 읽는 형태일
                수 있습니다. 500만 건 규모에서는 이것도 충분히 느립니다.
              </p>
              <p>
                회원 검색처럼 특정 조건으로 좁히는 쿼리에서는 보통{" "}
                <InlineCode>ref</InlineCode>나 <InlineCode>range</InlineCode>처럼
                필요한 key 범위를 직접 찾는 access type을 기대합니다. 물론{" "}
                <InlineCode>const</InlineCode>, <InlineCode>eq_ref</InlineCode>처럼 더
                좋은 형태도 있지만, 핵심은 <InlineCode>index</InlineCode>를 “좋은
                인덱스 사용”으로 착각하지 않는 것입니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/mysql-index-explain-access-types.png"
              alt="MySQL EXPLAIN type 값에서 ALL, index, range, ref의 의미 차이를 비교한 다이어그램"
              width={1440}
              height={900}
              caption="type=index는 인덱스를 이름 그대로 잘 탔다는 뜻이 아니라 index tree 전체 scan일 수 있습니다. rows, filtered, key_len, Extra를 함께 보고 실제로 얼마나 좁혀 읽는지 확인해야 합니다."
            />
            <CodeBlock
              code={`EXPLAIN
SELECT id, name
FROM members
WHERE name LIKE '%철수%';

-- 확인할 것
-- type: ALL, index, range, ref
-- key: 실제 선택된 인덱스
-- rows: 예상 읽기 row 수
-- Extra: Using index, Using where, Using filesort 등`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Using index도 무조건 좋은 신호는 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>Extra</InlineCode>에{" "}
                <InlineCode>Using index</InlineCode>가 뜨면 “인덱스를 사용했으니
                괜찮다”고 생각하기 쉽습니다. 하지만 여기서 말하는{" "}
                <InlineCode>Using index</InlineCode>는 주로 커버링 인덱스, 즉 필요한
                컬럼을 인덱스만으로 읽을 수 있다는 뜻입니다.
              </p>
              <p>
                커버링 인덱스는 분명 장점이 있습니다. table row를 다시 읽지 않아도
                되기 때문입니다. 하지만 조건이 선택적이지 않아서 인덱스 전체를 읽는다면
                여전히 느립니다. <InlineCode>type=index</InlineCode>와{" "}
                <InlineCode>Using index</InlineCode>가 함께 보인다면 “좋다”가 아니라
                “table 대신 index 전체를 읽고 있지는 않은가”를 먼저 의심해야 합니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              점검 순서
            </h2>
            <div className="mt-6">
              <NoteRow
                title="검색 조건이 왼쪽부터 고정되는지 본다"
                body="LIKE '김%'는 B-tree range scan이 가능하지만 LIKE '%철수%'는 시작점을 만들기 어렵습니다. 포함 검색이 핵심 요구사항이면 FULLTEXT, n-gram, 검색 엔진을 별도로 검토합니다."
              />
              <NoteRow
                title="컬럼 타입과 파라미터 타입을 맞춘다"
                body="VARCHAR 컬럼에 숫자 파라미터를 넘기거나, 숫자 컬럼에 문자열 비교가 섞이면 암묵적 변환 때문에 인덱스 활용이 깨질 수 있습니다."
              />
              <NoteRow
                title="컬럼 왼쪽에 함수를 씌우지 않는다"
                body="DATE(created_at) 대신 created_at >= 시작시각 AND created_at < 다음날시각처럼 원본 컬럼에 range 조건을 거는 형태를 우선 사용합니다."
              />
              <NoteRow
                title="EXPLAIN은 key보다 type과 rows를 먼저 본다"
                body="key에 인덱스 이름이 있어도 type=index면 전체 index scan일 수 있습니다. range/ref인지, rows가 충분히 줄었는지, Extra가 무엇인지 함께 확인합니다."
              />
              <NoteRow
                title="변경 전후를 EXPLAIN ANALYZE로 비교한다"
                body="MySQL 8.0에서는 EXPLAIN ANALYZE로 실제 실행 통계까지 볼 수 있습니다. 단순히 인덱스를 추가하는 데서 끝내지 말고 실행 시간과 읽은 row 수가 줄었는지 확인합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                인덱스가 있는데도 회원 검색 API가 3초 걸린 이유는 인덱스가 없어서가
                아니라 인덱스를 효율적으로 사용할 수 없는 조건식 때문이었습니다. 앞에
                wildcard가 붙은 <InlineCode>LIKE</InlineCode>, 문자열 컬럼과 숫자
                파라미터의 비교, 컬럼에 함수를 씌운 날짜 조건은 모두 자주 나오는
                원인입니다.
              </p>
              <p>
                인덱스는 “있냐 없냐”보다 “어떻게 타느냐”가 중요합니다.{" "}
                <InlineCode>EXPLAIN</InlineCode>에서 <InlineCode>key</InlineCode>가
                보인다고 끝이 아니고, <InlineCode>type</InlineCode>,{" "}
                <InlineCode>rows</InlineCode>, <InlineCode>Extra</InlineCode>를 함께
                봐야 합니다. 특히 <InlineCode>type=index</InlineCode>는 인덱스 전체를
                읽는 scan일 수 있으므로 <InlineCode>range</InlineCode>나{" "}
                <InlineCode>ref</InlineCode>처럼 실제로 범위를 좁히는 접근인지
                확인해야 합니다.
              </p>
              <p>
                쿼리 최적화의 첫 단계는 새 인덱스를 더 만드는 것이 아닙니다. 기존
                인덱스가 탈 수 있는 형태로 조건식을 바꾸고, 그 결과가 실행 계획과
                실제 실행 시간에서 줄어드는지 확인하는 것입니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
