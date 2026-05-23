# 도봉라이프 AWS 인프라 구축 및 운영

Project No.1

서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 구축하고 운영한 프로젝트

Period \n
2025.12 ~ current

Position
(주)유머스트알엔디
인턴 사원

Role
DevOps Engineer
Backend Developer

## 프로젝트 개요

도봉라이프는 서울특별시 도봉구의 **지역상권 활성화**를 위한 관광 정보 안내 서비스입니다. 스토리텔링 기반 여행 코스, 맛집 정보, **지역 소상공인 연계 할인 쿠폰 발행 및 사용 기능**을 제공하며, 현재 **플레이스토어와 앱스토어에 출시되어** 다운로드 가능한 서비스입니다.

## 역할

### V1 - 초기 인프라 설계 및 배포 기반 구축

- 단일 EC2 기반으로 Nginx, Spring Boot, Redis를 Docker Compose로 통합 배포
- VPC, Public Subnet, Private Subnet, RDS를 구성해 외부 접근과 데이터 계층을 분리
- GitHub Actions, Docker Hub, SSH를 활용한 초기 CI/CD 파이프라인 구축

### V2 - 운영 안정성 개선 및 보안 배포 구조 고도화

- Nginx, Backend, Frontend 서버를 역할별 EC2로 분리하고 내부 서비스 영역을 Private Subnet에 배치
- Terraform으로 VPC, Subnet, EC2, RDS, IAM 리소스를 코드화해 인프라 재현성 확보
- GitHub Actions OIDC, SSM, Parameter Store를 활용해 SSH Key 없이 배포와 환경 변수 관리를 수행
- CloudWatch로 EC2 및 애플리케이션 로그를 수집해 운영 상태를 확인할 수 있는 기반 마련

### V3 - EKS 기반 운영 플랫폼 전환

- EC2 역할 분리 구조를 EKS 기반 MSA 운영 플랫폼으로 확장
- Terraform stack을 remote-state, foundation, container-registry, datastore, cluster-addons로 분리
- AWS Load Balancer Controller, EBS CSI, Cluster Autoscaler, External Secrets Operator, ExternalDNS, Argo CD 등 EKS 필수 add-on 구성
- GitHub Actions, ECR, GitOps Repository, Argo CD를 연결해 commit SHA 기반 선언형 배포 파이프라인 구축
- Argo CD App of Apps 구조로 frontend, backend, monitoring, logging, observability application을 dev cluster에 배포
- AWS Secrets Manager, External Secrets, GitHub Secrets/Variables, Kubernetes Secret, public runtime config의 관리 경계 정리
- Pod readiness, RDS connection, node capacity, PVC attachment, API traffic dashboard, dev teardown 문제를 운영 로그 형태로 추적

### 운영 장애 분석 및 재발 방지

- API 도메인의 TLS 인증서 만료로 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 동시에 실패한 장애 분석
- 서버 프로세스 정상, 애플리케이션 로그 없음, Nginx access log 없음이라는 단서를 바탕으로 HTTP 이전 계층의 문제로 조사 범위 전환
- OpenSSL, Certbot, system time, Nginx 설정을 확인해 Let's Encrypt 인증서 만료와 standalone 갱신 실패 원인 식별
- webroot 기반 Certbot 갱신 구조, dry-run 검증, Nginx reload hook, 인증서 만료일 모니터링으로 재발 방지 방향 정리

## 기술 스택

### Infra

- AWS VPC, Public Subnet, App Private Subnet, Data Private Subnet
- NAT Gateway, VPC Endpoint, Route 53, ACM, ALB
- Amazon EC2, Amazon EKS, Managed Node Group
- Amazon RDS MySQL, Amazon ElastiCache Redis
- Amazon ECR, Amazon S3, CloudWatch
- Terraform, S3 Remote State, IAM, OIDC, IRSA
- TLS/HTTPS, Let's Encrypt, Certbot, OpenSSL

### Kubernetes / GitOps

- Kubernetes Deployment, Service, Ingress, Namespace, ConfigMap, Secret
- Argo CD, App of Apps, GitOps Repository
- Helm, Kubernetes Manifest
- AWS Load Balancer Controller, ExternalDNS
- External Secrets Operator, AWS Secrets Manager, Parameter Store
- EBS CSI Driver, gp3 StorageClass
- Cluster Autoscaler

### CI/CD

- GitHub Actions
- GitHub OIDC to AWS IAM Role
- Amazon ECR commit SHA image tagging
- GitOps image tag update
- Argo CD Sync, Rollout Verification

### Observability

- Prometheus, kube-prometheus-stack
- Grafana, Grafana Dashboard
- Loki, Grafana Alloy
- Alertmanager, PrometheusRule
- Nginx Gateway Access Log, LogQL

### Operations / Troubleshooting

- Nginx access log, application log
- `openssl s_client`, `certbot certificates`, `certbot renew --dry-run`
- systemd timer, cron, Nginx reload hook
- DNS, SNI, TLS handshake, certificate expiration monitoring

### Application Runtime

- Spring Boot Backend Microservices
- Next.js Admin Frontend
- Docker, Docker Compose
- Nginx, MySQL, Redis

## 인프라 구축 과정

### 01. 초기 배포 환경 구축 (V1)

도봉라이프의 초기 BE 인프라를 AWS 기반으로 배포했습니다. 개발 환경 중심으로 최소 비용과 빠른 배포가 요구되어 단일 EC2와 RDS를 사용하는 단순한 구조로 구성했습니다.

![도봉라이프 V1 아키텍처 다이어그램](../public/projects/dobonglife/Architecture%20-%20DobongLife%20AWS%20Infra%20-%20V1.jpg)

_V1 단일 EC2, RDS, S3 기반의 초기 AWS 인프라 구성_

#### 단일 EC2 + RDS 기반 AWS 배포

- 도봉라이프 API 서버를 AWS 환경에 최초 배포
- 단일 EC2 기반으로 Nginx, Spring Boot, Redis를 Docker Compose로 통합 운영
- 데이터 계층은 Amazon RDS와 Amazon S3를 사용

#### 네트워크 및 보안 구성

- VPC 내 Private Subnet에 RDS를 배치하여 외부 직접 접근 차단
- Amazon Route 53을 통한 DNS 라우팅 구성

#### 배포 방식

- SSH 기반 원격 접속을 활용한 CD 파이프라인 구성
- 단일 서버 구조로 빠른 배포와 운영 단순성 확보

![도봉라이프 V1 CI/CD 아키텍처 다이어그램](../public/projects/dobonglife/Architecture%20-%20DobongLife%20CICD%20-%20V1.jpg)

_GitHub Actions, Docker Hub, EC2를 연결한 초기 CI/CD 파이프라인_

### 02. 인프라 구조 개선 및 운영 환경 고도화 (V2)

웹 어드민 페이지 개발에 따라 FE 서버를 추가 배포하고, 트래픽 증가에 대비해 인프라 구조를 역할 기반으로 분리했습니다. 운영 로그 수집을 위한 모니터링 기반도 함께 구축했습니다.

![도봉라이프 V2 AWS 인프라 아키텍처 다이어그램](../public/projects/dobonglife/Architecture%20-%20DobongLife%20AWS%20Infra%20-%20V2.jpg)

_V2 역할별 EC2, Private Subnet, SSM, OIDC 기반의 AWS 인프라 구성_

#### 인프라 구조 분리 및 확장

- 단일 서버 구조에서 역할 기반 아키텍처로 전환
- Nginx, Backend, Frontend를 각각 독립된 EC2로 분리
- Nginx는 Public Subnet에, FE/BE 애플리케이션 서버와 DB는 Private Subnet에 배치
- Redis를 EC2에서 Amazon ElastiCache로 이전

관련 글: [AWS와 화해하기 - 네트워크와 인스턴스](https://velog.io/@talking_tomato/AWS%EC%99%80-%ED%99%94%ED%95%B4%ED%95%98%EA%B8%B0-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EC%99%80-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4)

#### 배포 방식 개선 (SSM + OIDC)

- 기존 SSH 22번 포트 기반 접근 제거
- AWS Systems Manager를 활용하여 인스턴스 접근 방식 전환
- GitHub Actions + OIDC 기반으로 CD 파이프라인 재구성

#### IaC 도입

- Terraform으로 VPC, Subnet, EC2, RDS, IAM 등 AWS 리소스를 코드화
- AWS Systems Manager Parameter Store를 활용해 환경 변수와 민감 정보 관리
- user-data 파일을 이용해 EC2 기본 설정 자동화

#### 로깅 및 모니터링

- Amazon CloudWatch를 활용하여 EC2 로그 수집 및 애플리케이션 로그 확인 환경 구축

![도봉라이프 V2 CI/CD 아키텍처 다이어그램](../public/projects/dobonglife/Architecture%20-%20DobongLife%20CICD%20-%20V2.jpg)

_GitHub Actions, OIDC, SSM을 활용한 V2 CI/CD 파이프라인_

### 03. EKS 기반 MSA 운영 플랫폼 전환 (V3)

도봉라이프의 기존 배포 구조를 AWS EKS 기반 MSA 운영 플랫폼으로 확장하기 위해 VPC, EKS, RDS, Redis, ECR, Route 53, ACM, 클러스터 애드온을 Terraform 모듈로 분리했습니다. 애플리케이션 배포는 GitHub Actions와 Argo CD 기반 GitOps로 전환했고, 구축 과정에서는 이미지 배포 성공 여부에 머무르지 않고 Pod readiness, 노드 capacity, RDS connection, PVC attachment, 로그 수집, API traffic dashboard까지 확인하며 실제 운영 관점의 장애 대응 기록을 남겼습니다.

#### 전체 구조

Terraform은 클라우드와 클러스터 기반을 만들고, GitOps는 애플리케이션과 운영 리소스를 관리하도록 책임을 분리했습니다. 인프라 변경과 애플리케이션 배포 변경의 범위를 나누어 관리하기 위한 구조입니다.

```text
Terraform
  bootstrap/remote-state
    -> S3 remote state bucket

  stacks/foundation
    -> VPC, subnet, route, NAT, VPC endpoints
    -> EKS, node group, OIDC/IRSA
    -> Route 53, ACM

  stacks/container-registry
    -> ECR repositories

  stacks/datastore
    -> RDS MySQL, ElastiCache Redis

  stacks/cluster-addons
    -> Argo CD, AWS Load Balancer Controller, EBS CSI
    -> External Secrets, ExternalDNS, Cluster Autoscaler

GitOps / Argo CD
  applications/dev/root.yaml
    -> frontend-dev
    -> backend-dev
    -> monitoring-dev
    -> loki-dev
    -> alloy-dev
    -> observability-dev
```

#### Terraform 기반 인프라 모듈화

- 강조할 점: 단일 Terraform root에 모든 리소스를 몰아넣지 않고 remote-state, foundation, container-registry, datastore, cluster-addons 단위로 분리해 변경 범위와 장애 영향을 줄였습니다.
- 강조할 점: dev, staging, prod 환경은 `envs/<env>` 아래의 `tfvars`와 backend 설정으로 나누고, 각 stack은 S3 remote state output만 참조하도록 구성했습니다.
- 강조할 점: remote state bucket은 일반 dev teardown 대상에서 제외해 Terraform source of truth를 보존하는 방향으로 정리했습니다.
- 주요 기술: Terraform, S3 Remote State, AWS Provider, VPC, Subnet, NAT Gateway, VPC Endpoint, EKS, Managed Node Group, Route 53, ACM, IAM, IRSA

#### EKS 운영 플랫폼 구성

- 강조할 점: Public Subnet은 ALB, App Private Subnet은 application node, Data Private Subnet은 RDS/Redis로 역할을 나누어 트래픽 흐름과 데이터 계층을 분리했습니다.
- 강조할 점: AWS Load Balancer Controller는 Kubernetes Ingress를 ALB로 연결하고, ExternalDNS는 Route 53 record를 관리하며, ACM은 ALB HTTPS listener에 연결되는 AWS managed certificate로 정리했습니다.
- 강조할 점: EBS CSI Driver는 Prometheus, Grafana, Loki PVC를 gp3 volume으로 연결하고, Cluster Autoscaler는 dev node group capacity 조정에 사용했습니다.
- 주요 기술: Amazon EKS, Kubernetes Ingress, AWS Load Balancer Controller, ALB, Route 53, ACM, ExternalDNS, EBS CSI Driver, gp3 StorageClass, Cluster Autoscaler

#### GitHub Actions + ECR + Argo CD GitOps 파이프라인

- 강조할 점: CI는 애플리케이션 빌드와 이미지 발행, GitOps image tag 갱신을 담당하고, 실제 배포는 Argo CD가 클러스터 상태를 동기화하도록 책임을 분리했습니다.
- 강조할 점: mutable `latest` 대신 full commit SHA image tag를 사용해 어떤 코드가 어떤 이미지로 배포되었는지 추적 가능하게 했습니다.
- 강조할 점: fresh dev cluster에서는 bootstrap script로 Grafana admin secret을 준비한 뒤 `root-dev` application을 적용하고, Argo CD App of Apps 구조로 frontend, backend, monitoring, loki, alloy, observability application을 관리했습니다.
- 주요 기술: GitHub Actions, GitHub OIDC, Amazon ECR, Argo CD, GitOps Repository, Kubernetes Manifest, Helm, App of Apps, Docker

#### Admin Frontend CI/CD 전환

- 강조할 점: 기존 Docker Hub/SSM 성격의 배포 흐름에서 ECR push-only GitHub Actions로 정리하고, GitOps tag 갱신 이후 Argo CD가 배포를 수행하도록 분리했습니다.
- 강조할 점: `AWS_REGION`, `ECR_IMAGE_URI`, `NEXT_PUBLIC_API_URL` 같은 비민감 설정은 GitHub Variables로, `AWS_ROLE_TO_ASSUME`, `GITOPS_DEPLOY_KEY` 같은 민감 설정은 GitHub Secrets로 관리했습니다.
- 강조할 점: `NEXT_PUBLIC_*`는 client bundle에 노출되는 public config이므로 secret과 분리해 다뤘습니다.
- 주요 기술: Next.js Admin Frontend, GitHub Actions, GitHub Variables, GitHub Secrets, GitHub OIDC, Amazon ECR, Argo CD, GitOps

#### Backend MSA 배포와 API contract 보존

- 강조할 점: 기존 client를 수정할 수 없는 조건에서 public API contract 보존을 우선 기준으로 두고, Spring Boot backend를 microservice 단위로 분리했습니다.
- 강조할 점: 11개 backend service image를 GitHub Actions로 빌드해 ECR에 push하고, GitOps image tag를 같은 commit SHA로 맞추는 흐름을 구성했습니다.
- 강조할 점: cross-domain side effect는 Outbox와 Redis Stream 기반으로 분리하는 방향을 잡아 MSA 전환 시 도메인 간 결합도를 낮추려 했습니다.
- 주요 기술: Spring Boot, Gradle, Docker, Amazon ECR, GitHub Actions, GitOps, Redis Stream, Outbox Pattern

#### Secret 및 Variables 관리 경계

- 강조할 점: RDS master password는 AWS Secrets Manager에서 관리하고, Terraform은 secret value가 아니라 ARN만 output으로 전달하도록 정리했습니다.
- 강조할 점: GitOps backend chart는 ExternalSecret을 통해 RDS secret의 username/password를 `DB_USERNAME`, `DB_PASSWORD`로 주입하도록 구성했습니다.
- 강조할 점: secret value, public runtime config, client public config, drift 위험 config를 분류해 어떤 값이 어디에서 관리되어야 하는지 inventory로 정리했습니다.
- 주요 기술: AWS Secrets Manager, External Secrets Operator, Kubernetes Secret, GitHub Secrets, GitHub Variables, ConfigMap, Helm values, IRSA

#### Observability 구성

- 강조할 점: Prometheus, Grafana, Loki, Alloy를 dev cluster에 배포해 클러스터와 워크로드 상태, 로그, 대시보드를 확인할 수 있는 기반을 만들었습니다.
- 강조할 점: Spring Boot `/actuator/prometheus` endpoint는 인증 정책 정리가 필요했기 때문에, 우선 Nginx gateway access log를 Loki로 수집해 API traffic dashboard를 구성했습니다.
- 강조할 점: request count, 5xx count, request rate, method/status/path별 호출량을 LogQL 기반 Grafana dashboard로 확인할 수 있게 했습니다.
- 주요 기술: kube-prometheus-stack, Prometheus, Grafana, Loki, Grafana Alloy, LogQL, PrometheusRule, Alertmanager, Nginx Gateway Access Log

#### 운영 트러블슈팅

- IAM 권한 부족: `eks:CreateCluster`, `ssm:GetParameter`, `ecr:ListTagsForResource`, `eks:DescribeUpdate` 등 Terraform 실행 주체에 필요한 AWS API action을 분리해 확인했습니다. 주요 기술: Terraform, AWS IAM, EKS, ECR, SSM
- GitOps bootstrap 분리: Terraform apply 성공 이후에도 workload가 나타나지 않는 상태를 Argo CD root application 미적용 문제로 분리하고, bootstrap script와 `kubectl -n argocd get applications` 검증 흐름을 정리했습니다. 주요 기술: Argo CD, App of Apps, kubectl, GitOps
- Admission webhook dependency: External Secrets 설치 중 webhook endpoint 오류를 대상 chart 문제가 아니라 AWS Load Balancer Controller readiness와 add-on 설치 순서 문제로 추적했습니다. 주요 기술: Kubernetes Admission Webhook, AWS Load Balancer Controller, External Secrets Operator
- Backend readiness probe 실패: Spring Security 정책으로 HTTP actuator readiness가 401을 반환할 수 있는 상태를 확인하고, dev 서비스에는 TCP probe와 완화된 delay를 적용하는 방향으로 조정했습니다. 주요 기술: Kubernetes Probe, Spring Boot Actuator, Spring Security, ConfigMap checksum annotation
- RDS connection exhaustion: datasource 설정 누락처럼 보이는 오류를 DB metadata 조회 실패와 MySQL `Too many connections` 문제로 재해석하고, service별 Hikari pool size와 minimum idle 값을 dev RDS 용량에 맞게 줄였습니다. 주요 기술: RDS MySQL, HikariCP, Spring Boot, Pod logs, DB connection metric
- Node capacity / IP / memory 부족: Pod Pending을 단순 배포 실패로 보지 않고 scheduler event, AWS CNI IP 할당, nodegroup max size, JVM memory request를 함께 확인해 capacity 문제로 분류했습니다. 주요 기술: EKS Managed Node Group, Cluster Autoscaler, AWS VPC CNI, Kubernetes Scheduler, JVM memory option
- NotReady node와 stuck Pod 정리: NotReady node 위에 남은 Terminating Pod와 잔여 DB connection 가능성을 보고, force delete, ASG instance terminate, lifecycle action complete 절차를 정리했습니다. 주요 기술: Kubernetes Pod lifecycle, EC2 Auto Scaling Group, Managed Node Group
- Grafana/Loki PVC Multi-Attach: Pod event만 보지 않고 AWS EBS attachment 상태와 Kubernetes VolumeAttachment object를 함께 확인해 stale attachment를 정리했습니다. 주요 기술: EBS CSI, PersistentVolumeClaim, VolumeAttachment, Grafana, Loki
- place-service CSV import file missing: 마지막에 남은 `CrashLoopBackOff`를 인프라/GitOps 문제가 아니라 `/data/import/places.csv` runtime file dependency 문제로 분리하고, ConfigMap/PVC/image packaging 또는 Job/migration 분리 방안을 정리했습니다. 주요 기술: Spring Boot CommandLineRunner, Kubernetes Volume, ConfigMap, Job
- Dev teardown과 state 복구: 비용 절감을 위한 teardown 중 ECR `RepositoryNotEmptyException`, Argo CD finalizer, `errored.tfstate` 문제를 분리하고, container-registry state sync, reverse-order destroy, `terraform state push` 복구 절차를 정리했습니다. 주요 기술: Terraform destroy, ECR, Argo CD finalizer, Terraform state lock, errored.tfstate

#### V3 결과와 성과

- dev 환경 기준으로 AWS EKS 기반 MSA 플랫폼의 주요 블록을 Terraform stack 단위로 분리했습니다.
- frontend는 GitOps 기반으로 public HTTPS endpoint까지 연결했습니다.
- backend 11개 microservice image를 ECR에 push하고 GitOps image tag 갱신 흐름을 구성했습니다.
- Argo CD App of Apps 구조로 frontend, backend, monitoring, logging, observability application을 관리했습니다.
- Grafana, Prometheus, Loki, Alloy를 구성하고 PVC stale attachment 문제까지 운영 관점에서 해결했습니다.
- Loki access log 기반 API traffic dashboard를 구성해 요청 수, status code, method, path를 확인할 수 있게 했습니다.
- dev 비용 통제를 위한 teardown 순서와 ECR force delete/state sync 전략을 정리했습니다.
- AWS Secrets Manager, Kubernetes Secret, GitHub Secrets, public config의 관리 경계를 inventory로 정리했습니다.

#### 남은 개선 방향

- Terraform output을 GitOps values로 자동 동기화해 `DB_URL`, `REDIS_HOST`, RDS Secret ARN drift를 줄일 필요가 있습니다.
- frontend `AUTH_SECRET`과 backend OAuth/JWT/mail/S3/external API secret은 AWS Secrets Manager와 ExternalSecret 기반으로 더 일관되게 분리해야 합니다.
- Spring Boot `/actuator/prometheus` 인증 정책을 정리해 application metric 기반 dashboard로 확장할 수 있습니다.
- dev RDS connection 한계 대응을 위해 RDS Proxy 또는 service별 connection pool policy를 더 정교화할 필요가 있습니다.
- Karpenter, VPC CNI prefix delegation 등을 검토해 MSA workload capacity 운영을 고도화할 수 있습니다.

### 04. TLS 인증서 만료로 인한 앱 인증 장애 분석

도봉라이프 앱에서 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 동시에 실패한 장애를 분석했습니다. 서버 프로세스는 살아 있었지만 신규 요청이 백엔드 로그와 Nginx access log에 남지 않았고, 최종 원인은 `api.dobonglife.co.kr`의 Let's Encrypt TLS 인증서 만료였습니다.

#### 장애 영향과 초기 증상

- 영향 범위: API 호출이 필요한 인증 기능 전반이 실패했습니다. 일반 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증이 모두 영향을 받았습니다.
- 사용자 관점: 앱에는 네트워크 연결 상태가 원활하지 않다는 형태의 오류가 표시되어, 사용자는 계정 문제인지 소셜 로그인 문제인지 서버 문제인지 구분하기 어려웠습니다.
- 운영 관점: 서버 프로세스는 정상적으로 떠 있었지만 새 요청을 보내도 애플리케이션 로그와 Nginx access log에 요청이 남지 않았습니다.
- 판단 포인트: 특정 API의 비즈니스 로직 오류가 아니라 API 도메인, DNS, TCP 연결, TLS 인증서처럼 모든 인증 기능이 공유하는 네트워크 계층 문제를 우선 의심했습니다.
- 주요 기술: Nginx, Spring Boot, TLS, HTTPS, DNS, SNI, access log, application log

#### 원인 분석 흐름

- 공통 기능 동시 실패: 로그인, 카카오 로그인, 비밀번호 찾기, 이메일 인증은 모두 API 서버와 통신해야 하므로 API 도메인의 HTTPS 연결 자체가 실패하면 함께 중단됩니다.
- access log 부재 해석: HTTP 요청은 TLS 핸드셰이크와 인증서 검증 이후에 전송됩니다. 인증서가 만료되어 클라이언트가 연결을 중단하면 Nginx와 백엔드에는 path, method, header, body가 전달되지 않습니다.
- 서버 시간 확인: 서버 시간이 크게 틀어져 있으면 유효한 인증서도 만료된 것처럼 보일 수 있으므로 `date`, `timedatectl`로 UTC 시간과 NTP 동기화 상태를 먼저 확인했습니다.
- 인증서 확인: `openssl s_client -connect api.dobonglife.co.kr:443 -servername api.dobonglife.co.kr`로 SNI를 지정해 실제 앱이 보는 인증서를 확인했고, `certificate has expired`와 만료 시각을 확인했습니다.
- 로컬 Certbot 상태 확인: `sudo certbot certificates`로 Certbot이 관리하는 로컬 인증서도 같은 만료일과 `INVALID: EXPIRED` 상태를 가리키는지 확인했습니다.
- 주요 기술: `openssl s_client`, `openssl x509`, `timedatectl`, Certbot, Let's Encrypt, TLS certificate, SNI

#### 직접 원인

- `api.dobonglife.co.kr`의 Let's Encrypt 인증서가 `2026-05-13 23:55:25 UTC`에 만료되어 있었습니다.
- 한국 시간으로는 `2026-05-14 08:55:25 KST`이며, 장애가 확인된 날짜와 일치했습니다.
- 인증서 만료로 클라이언트가 HTTPS 연결을 신뢰하지 못했고, HTTP 요청이 Nginx와 백엔드 애플리케이션까지 도달하지 못했습니다.
- 주요 기술: Let's Encrypt, TLS verification, HTTPS client validation, Nginx SSL termination

#### Certbot 갱신 실패 원인

- `sudo certbot renew` 첫 시도는 80번 포트를 열 수 없다는 오류로 실패했습니다.
- 기존 갱신 설정이 standalone authenticator를 사용하고 있었기 때문에 Certbot이 HTTP-01 challenge 응답을 위해 80번 포트를 직접 점유해야 했습니다.
- 운영 서버에서는 Nginx가 이미 80번 포트를 사용하고 있었으므로 자동 갱신도 같은 이유로 실패했을 가능성이 높다고 판단했습니다.
- 긴급 복구는 Nginx를 일시 중단하고 Certbot을 실행해 처리할 수 있었지만, 이 방식은 갱신 때마다 서비스 중단 가능성을 만들기 때문에 운영 자동화 방식으로는 적합하지 않다고 정리했습니다.
- 주요 기술: Certbot standalone authenticator, HTTP-01 challenge, Nginx, port 80, Let's Encrypt renewal

#### 복구와 검증

- Certbot으로 인증서를 갱신한 뒤 로컬 인증서 만료일이 `2026-08-12 04:08:03 UTC`로 연장된 것을 확인했습니다.
- 로컬 파일만 확인하지 않고, 443 포트에서 Nginx가 실제로 제공하는 인증서도 `openssl s_client`와 `openssl x509 -noout -dates`로 다시 확인했습니다.
- 이중 확인을 통해 `/etc/letsencrypt/live/...` 인증서 파일이 갱신되었고, Nginx가 클라이언트에게 새 인증서를 제공하고 있음을 검증했습니다.
- 이후 앱에서 API 호출이 다시 성공하는지 확인해 사용자 영향 복구까지 판단할 수 있도록 정리했습니다.
- 주요 기술: Certbot, Nginx reload, `openssl x509 -noout -dates`, external certificate verification

#### webroot 방식으로 전환한 이유

- standalone 방식은 Certbot이 80번 포트를 직접 점유해야 하므로 Nginx가 상시 실행 중인 운영 서버와 충돌할 수 있습니다.
- webroot 방식은 Certbot이 검증 파일을 지정된 디렉터리에 쓰고, Nginx가 기존 80번 포트로 `/.well-known/acme-challenge/` 경로를 서빙하는 방식입니다.
- 이 구조에서는 인증서 갱신을 위해 Nginx를 멈출 필요가 없고, 자동 갱신에도 더 적합합니다.
- renewal 설정에는 authenticator뿐 아니라 webroot path가 함께 남아야 하므로, 운영에서는 수동 편집보다 Certbot 명령과 `--dry-run`으로 다음 갱신 경로까지 검증하는 것이 안전하다고 정리했습니다.
- 주요 기술: Certbot webroot authenticator, Nginx server block, `/.well-known/acme-challenge/`, `certbot renew --dry-run`

#### 재발 방지 체크리스트

- 자동 갱신 스케줄 확인: `systemctl list-timers`, `systemctl status certbot.timer`, cron 설정을 확인해 Certbot이 실제로 주기 실행되는지 점검합니다.
- dry-run 검증: Nginx 설정, 보안 그룹, 웹루트 변경 이후 `sudo certbot renew --dry-run`으로 갱신 경로를 검증합니다.
- challenge 경로 확인: `http://api.dobonglife.co.kr/.well-known/acme-challenge/...` 경로가 80번 포트에서 막히지 않는지 확인합니다.
- reload 자동화: 인증서 갱신 후 `nginx -t`와 `systemctl reload nginx`가 실행되도록 deploy hook 또는 운영 절차를 둡니다.
- 외부 관측: 서버 내부 파일 상태만 보지 않고 외부에서 443 포트로 접속했을 때 제공되는 인증서의 `notAfter`를 주기적으로 확인합니다.
- 만료 알림: Let's Encrypt 인증서는 유효기간이 짧기 때문에 만료 30일, 14일, 7일, 3일 전처럼 단계별 알림을 두는 것이 안전합니다.
- 주요 기술: systemd timer, cron, Certbot deploy hook, Nginx reload, OpenSSL, TLS expiration monitoring

#### 포트폴리오에서 강조할 점

- 서버가 살아 있다는 사실과 사용자 요청이 서버까지 도달한다는 사실을 분리해서 판단했습니다.
- 백엔드 로그와 Nginx access log가 모두 비어 있는 상황을 애플리케이션 내부 오류가 아니라 HTTP 이전 계층의 문제로 해석했습니다.
- DNS와 서버 문제를 구분할 때 단순 IP 접속 대신 `curl --resolve`처럼 Host와 SNI를 유지하는 방식이 필요하다는 점을 정리했습니다.
- 긴급 복구와 재발 방지 자동화를 분리해, 단기 갱신 이후 webroot, dry-run, reload hook, 만료일 모니터링까지 운영 개선 방향으로 연결했습니다.
- 주요 기술: DNS, SNI, TLS handshake, Certbot, Nginx, OpenSSL, `curl --resolve`

## 프로젝트 회고

서비스 전체를 AWS 환경에 직접 배포하면서 인프라 구성 요소가 어떻게 연결되고 실제 트래픽이 어떤 흐름으로 처리되는지 이해할 수 있었습니다. 특히 Security Group과 IAM을 활용한 권한 관리를 직접 설계하고 적용하면서 클라우드 환경에서의 보안 설정을 경험했습니다.

Terraform을 사용하면서 GUI로 설정할 때보다 VPC, Subnet, EC2, RDS, IAM 등 인프라 리소스의 관계를 더 명확하게 파악할 수 있었습니다. 코드로 인프라를 정의하면서 재현성과 변경 추적의 중요성도 함께 체감했습니다.

사수 없이 인프라 전반을 단독으로 구축하며 시행착오도 많았지만, 직접 부딪히며 이해한 부분이 많았습니다. 이후에는 EC2 중심 운영에서 EKS 기반 운영 플랫폼으로 확장하면서 Kubernetes, GitOps, 관측 가능성, Secret 관리, 권한 관리가 실제 서비스 운영 안정성과 어떻게 연결되는지 경험했습니다.

특히 CI/CD가 성공했다고 해서 서비스가 정상 운영되는 것은 아니라는 점을 체감했습니다. 이미지 빌드와 배포 완료 여부뿐 아니라 Argo CD 동기화 상태, Pod Ready 상태, Probe 결과, 로그, 메트릭, DB 연결 상태를 함께 확인해야 실제 운영 가능한 상태를 판단할 수 있었습니다.
