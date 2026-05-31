import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, NoteRow, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "Node capacity와 Pod IP 부족으로 Pending이 길어진 장애 분석 | Blog",
  description:
    "Kubernetes Pod Pending 장애를 image pull이나 GitOps 문제가 아니라 node memory, AWS VPC CNI Pod IP, nodegroup scaling limit 관점에서 분리해 분석한 글",
};

const references = [
  {
    label: "Kubernetes - Pod Lifecycle",
    href: "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/",
  },
  {
    label: "Kubernetes - Assign Memory Resources to Containers and Pods",
    href: "https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/",
  },
  {
    label: "Amazon EKS - Assign IPs to Pods with the Amazon VPC CNI",
    href: "https://docs.aws.amazon.com/eks/latest/userguide/managing-vpc-cni.html",
  },
  {
    label: "Amazon EKS Best Practices - VPC CNI",
    href: "https://docs.aws.amazon.com/eks/latest/best-practices/vpc-cni.html",
  },
  {
    label: "Amazon EKS API Reference - NodegroupScalingConfig",
    href: "https://docs.aws.amazon.com/eks/latest/APIReference/API_NodegroupScalingConfig.html",
  },
];

export default function KubernetesNodeCapacityIpMemoryBlogPostPage() {
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
              Incident / Kubernetes · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              Node capacity와 Pod IP 부족으로 Pending이 길어진 장애 분석
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              일부 Pod가 Pending 상태에 머물렀고 처음에는 이미지 배포 실패나 GitOps
              동기화 문제처럼 보였습니다. 하지만 scheduler event와 kubelet event를
              확인해 보니 원인은 node memory request, AWS VPC CNI의 Pod IP 할당,
              nodegroup 확장 한계가 얽힌 capacity 문제였습니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 요약
            </h2>
            <div className="mt-6">
              <NoteRow
                title="장애 상황"
                body="일부 Pod가 Pending 상태에서 오래 머물렀습니다. Deployment와 manifest는 존재했고 GitOps 동기화도 끝난 것처럼 보였지만, 실제 workload는 node 위에서 정상 실행되지 않았습니다."
              />
              <NoteRow
                title="초기 오해"
                body="처음에는 이미지 배포 실패, imagePullSecret 문제, Argo CD 동기화 누락처럼 보였습니다. 그러나 Pending은 image pull 이전의 scheduling 단계에서도 발생할 수 있으므로 이벤트를 먼저 봐야 했습니다."
              />
              <NoteRow
                title="확인한 증거"
                body="kubectl describe pod 이벤트에서 insufficient memory와 failed to assign an IP address to container 메시지가 확인되었습니다. 하나는 scheduler가 보는 compute capacity 문제이고, 다른 하나는 AWS VPC CNI가 보는 Pod IP capacity 문제입니다."
              />
              <NoteRow
                title="조치"
                body="Spring Boot 서비스의 JVM memory request와 Kubernetes resource request를 dev node 용량에 맞게 조정했습니다. 동시에 nodegroup max size와 Cluster Autoscaler가 실제로 scale-out할 수 있는 상태인지 확인했습니다."
              />
              <NoteRow
                title="재발 방지 방향"
                body="Pod Pending을 단일 원인으로 보지 않고 CPU/memory, Pod IP, autoscaler boundary를 나누어 확인하는 runbook을 만들 수 있도록 정리했습니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              Pending은 배포 실패가 아니라 실행 전 대기 상태다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Kubernetes에서 Pod가 Pending이라는 것은 Pod 객체는 API server에
                만들어졌지만 아직 모든 container가 실행 가능한 상태로 올라오지 않았다는
                뜻입니다. 이 안에는 여러 경우가 섞입니다. 아직 node에 schedule되지 않았을
                수도 있고, node에는 배치됐지만 container runtime이나 CNI 단계에서 막혔을
                수도 있습니다.
              </p>
              <p>
                그래서 Pending을 보면 먼저 <InlineCode>kubectl describe pod</InlineCode>
                의 Events를 봐야 합니다. 이미지 pull 문제라면 image pull 관련 메시지가
                나옵니다. scheduler가 node를 고르지 못했다면{" "}
                <InlineCode>FailedScheduling</InlineCode>이 나오고, Pod sandbox 생성 중
                네트워크가 막히면 <InlineCode>FailedCreatePodSandBox</InlineCode>가
                나옵니다.
              </p>
              <p>
                이번 장애는 두 종류의 이벤트가 핵심이었습니다. 하나는 node에 남은 memory가
                부족하다는 scheduler 이벤트였고, 다른 하나는 AWS VPC CNI가 container에
                줄 Pod IP를 확보하지 못했다는 kubelet 이벤트였습니다.
              </p>
            </div>
            <CodeBlock
              code={`$ kubectl describe pod <pod-name> -n backend-dev
Warning  FailedScheduling       0/2 nodes are available: insufficient memory
Warning  FailedCreatePodSandBox  failed to assign an IP address to container`}
            />
            <BlogDiagram
              src="/blog/kubernetes-node-capacity-pending-flow.png"
              alt="Pod Pending 상태에서 FailedScheduling은 node capacity 문제로, FailedCreatePodSandBox는 Pod IP 할당 문제로 분기되는 진단 흐름"
              width={1440}
              height={900}
              caption="Pending은 하나의 원인이 아닙니다. 이벤트의 reason을 기준으로 scheduler capacity 문제인지, CNI 네트워크 문제인지 먼저 분리해야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              첫 번째 원인: node memory가 부족했다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>FailedScheduling</InlineCode>의{" "}
                <InlineCode>insufficient memory</InlineCode>는 scheduler가 현재 node들의
                allocatable memory와 Pod의 memory request를 비교했을 때 배치 가능한 node가
                없다고 판단했다는 뜻입니다. 이 판단은 실제 사용량보다 request를 기준으로
                먼저 일어납니다.
              </p>
              <p>
                Spring Boot 서비스는 JVM heap, metaspace, thread stack, direct buffer,
                native memory를 함께 씁니다. 그런데 dev node 용량이 작은 상태에서 각
                서비스의 memory request를 넉넉하게 잡아두면 실제 사용량이 낮아도 scheduler
                입장에서는 이미 node가 꽉 찬 것으로 계산됩니다.
              </p>
              <p>
                이번 조치에서는 dev 환경의 서비스별 실제 사용량과 node 용량을 다시 보고,
                JVM option과 Kubernetes memory request를 함께 낮췄습니다. 단순히 request만
                줄이면 OOM 위험이 생길 수 있으므로, heap 크기와 container memory limit도
                같이 봐야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`resources:
  requests:
    cpu: 100m
    memory: 512Mi
  limits:
    memory: 768Mi

env:
  - name: JAVA_TOOL_OPTIONS
    value: "-Xms256m -Xmx512m"`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              두 번째 원인: Pod에 줄 IP도 capacity다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                EKS에서 기본 Amazon VPC CNI를 사용하면 Pod는 VPC 안의 IP를 직접 받습니다.
                즉 Pod 수는 단순히 node의 CPU와 memory만으로 결정되지 않습니다. node에
                붙을 수 있는 ENI와 secondary IP 수, subnet의 남은 IP, CNI warm pool 설정도
                Pod 수의 상한이 됩니다.
              </p>
              <p>
                <InlineCode>failed to assign an IP address to container</InlineCode>는
                container가 실행되기 전에 Pod sandbox 네트워크를 만들지 못했다는 신호입니다.
                이 경우 이미 scheduler가 node를 골랐더라도, kubelet이 CNI plugin을 호출하는
                단계에서 실패할 수 있습니다.
              </p>
              <p>
                그래서 이 이벤트가 보이면 node의 CPU와 memory만 볼 것이 아니라{" "}
                <InlineCode>aws-node</InlineCode> DaemonSet 로그, subnet available IP,
                instance type별 Pod/IP 제한, prefix delegation 사용 여부를 함께 확인해야
                합니다.
              </p>
            </div>
            <CodeBlock
              code={`$ kubectl logs -n kube-system ds/aws-node --tail=200
$ kubectl get nodes -o wide
$ aws ec2 describe-subnets \\
  --subnet-ids <subnet-id> \\
  --query 'Subnets[].AvailableIpAddressCount'`}
            />
            <BlogDiagram
              src="/blog/kubernetes-node-capacity-ip-memory-map.png"
              alt="Pod Pending 원인을 compute capacity, network capacity, autoscaler scale boundary로 나누어 보는 다이어그램"
              width={1440}
              height={900}
              caption="Pod를 하나 더 띄우려면 CPU/memory만 필요한 것이 아닙니다. EKS VPC CNI 환경에서는 Pod IP도 실제 capacity입니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              세 번째 확인점: autoscaler가 늘릴 수 있는 상태인가
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                node capacity가 부족하면 자연스럽게 Cluster Autoscaler가 node를 늘려줄
                것이라고 기대하기 쉽습니다. 하지만 autoscaler도 무제한으로 node를 추가하지
                않습니다. EKS managed node group에는 min size, desired size, max size가 있고,
                autoscaler는 이 경계 안에서만 움직입니다.
              </p>
              <p>
                따라서 nodegroup의 max size에 이미 도달했거나, autoscaler 권한과 tag 구성이
                맞지 않거나, taint/label 조건 때문에 새 node가 해당 Pod를 받을 수 없다면
                Pending은 계속됩니다. 이 경우에는 Pod manifest만 봐서는 해결되지 않습니다.
              </p>
              <p>
                이번 장애에서는 dev node 용량에 비해 각 Spring Boot 서비스의 request가
                컸고, nodegroup 확장 한계까지 함께 검토해야 했습니다. 즉 원인은 단순한
                Pod 하나의 설정 문제가 아니라 workload request와 cluster capacity 사이의
                불균형이었습니다.
              </p>
            </div>
            <CodeBlock
              code={`$ aws eks describe-nodegroup \\
  --cluster-name <cluster-name> \\
  --nodegroup-name <nodegroup-name> \\
  --query 'nodegroup.scalingConfig'

$ kubectl logs -n kube-system deploy/cluster-autoscaler --tail=200`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              조치와 검증
            </h2>
            <div className="mt-6">
              <NoteRow
                title="JVM memory와 request를 함께 낮췄다"
                body="Spring Boot 서비스의 dev용 JVM heap과 Kubernetes memory request를 node 용량에 맞게 조정했습니다. request만 낮추면 scheduler는 통과하지만 runtime에서 OOM이 날 수 있으므로 JVM option과 limit도 같이 확인했습니다."
              />
              <NoteRow
                title="Pending 원인을 이벤트로 분리했다"
                body="FailedScheduling은 scheduler capacity 문제로, FailedCreatePodSandBox는 CNI/IP 할당 문제로 분리했습니다. 두 이벤트를 같은 Pending으로 뭉개지 않고 서로 다른 계층의 문제로 다뤘습니다."
              />
              <NoteRow
                title="nodegroup 확장 한계를 확인했다"
                body="현재 node 수가 nodegroup max size에 가까운지, Cluster Autoscaler가 scale-up을 시도할 수 있는지 확인했습니다. capacity 문제가 반복되면 request 조정만이 아니라 nodegroup 크기와 subnet IP도 함께 늘려야 합니다."
              />
              <NoteRow
                title="재기동 후 Ready 전환을 확인했다"
                body="변경 후 Pod가 schedule되고 sandbox가 생성되며 readiness가 true로 전환되는지 확인했습니다. 이때 Pod 상태만 보지 않고 describe event가 더 이상 같은 경고를 반복하지 않는지도 확인했습니다."
              />
            </div>
            <BlogDiagram
              src="/blog/kubernetes-node-capacity-remediation.png"
              alt="개발 클러스터에서 JVM memory request, readiness, metrics, nodegroup max size를 함께 관리하는 재발 방지 다이어그램"
              width={1440}
              height={900}
              caption="조치는 Pod manifest 하나로 끝나지 않습니다. request, readiness, node metric, subnet IP, nodegroup max size를 함께 운영 기준으로 묶어야 합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영에서 바로 쓰는 확인 순서
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                Pending Pod를 보면 먼저 manifest diff나 이미지 태그부터 의심하기 쉽습니다.
                하지만 더 빠른 순서는 이벤트에서 계층을 나누는 것입니다. scheduler가
                거절했는지, kubelet이 sandbox를 만들다 실패했는지, container runtime이
                이미지를 받다 실패했는지에 따라 조사 위치가 완전히 달라집니다.
              </p>
            </div>
            <CodeBlock
              code={`# 1. Event reason으로 계층 분리
$ kubectl describe pod <pod-name> -n backend-dev

# 2. Node compute capacity 확인
$ kubectl top nodes
$ kubectl describe node <node-name>

# 3. Pod request 합산 확인
$ kubectl get pods -n backend-dev -o wide
$ kubectl describe pod <pod-name> -n backend-dev

# 4. EKS VPC CNI / subnet IP 확인
$ kubectl logs -n kube-system ds/aws-node --tail=200
$ aws ec2 describe-subnets --subnet-ids <subnet-id>

# 5. nodegroup / autoscaler boundary 확인
$ aws eks describe-nodegroup --cluster-name <cluster-name> --nodegroup-name <nodegroup-name>
$ kubectl logs -n kube-system deploy/cluster-autoscaler --tail=200`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                이 장애는 GitOps 동기화나 이미지 배포 실패처럼 보였지만, 실제로는
                Kubernetes가 Pod를 실행할 capacity를 확보하지 못한 문제였습니다. Pending은
                상태 이름일 뿐이고, 원인은 이벤트 reason에 있습니다.
              </p>
              <p>
                <InlineCode>insufficient memory</InlineCode>는 scheduler의 resource
                계산 문제이고, <InlineCode>failed to assign an IP address</InlineCode>는
                EKS VPC CNI와 subnet IP capacity 문제입니다. 둘은 같은 Pending 화면에
                보일 수 있지만 조사 계층은 다릅니다.
              </p>
              <p>
                최종 조치는 Spring Boot 서비스의 JVM memory와 resource request를 dev node에
                맞게 조정하고, nodegroup 확장 한계와 Pod IP capacity를 함께 점검하는
                것이었습니다. 운영에서는 CPU와 memory만이 capacity가 아닙니다. Pod IP와
                autoscaler boundary까지 포함해야 실제로 Pod가 뜹니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}
