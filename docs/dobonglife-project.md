# 도봉라이프 AWS 인프라 구축 및 운영

Project No.1

서울시 도봉구 지역상권 활성화 애플리케이션의 AWS 인프라를 구축하고 운영한 프로젝트

Period
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

## 기술 스택

- **AWS**
- **Terraform**
- **GitHub Actions**
- **Docker Compose**
- **CloudWatch**
- VPC
- EC2
- RDS
- S3
- ElastiCache
- Route 53
- OIDC
- SSM
- Parameter Store
- IAM
- Nginx
- Spring Boot
- Redis

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

## 프로젝트 회고

서비스 전체를 AWS 환경에 직접 배포하면서 인프라 구성 요소가 어떻게 연결되고 실제 트래픽이 어떤 흐름으로 처리되는지 이해할 수 있었습니다. 특히 Security Group과 IAM을 활용한 권한 관리를 직접 설계하고 적용하면서 클라우드 환경에서의 보안 설정을 경험했습니다.

Terraform을 사용하면서 GUI로 설정할 때보다 VPC, Subnet, EC2, RDS, IAM 등 인프라 리소스의 관계를 더 명확하게 파악할 수 있었습니다. 코드로 인프라를 정의하면서 재현성과 변경 추적의 중요성도 함께 체감했습니다.

사수 없이 인프라 전반을 단독으로 구축하며 시행착오도 많았지만, 직접 부딪히며 이해한 부분이 많았습니다. 현재는 서비스 규모가 작아 컨테이너 오케스트레이션이나 고도화된 트래픽 분산 구조까지는 적용하지 않았지만, 향후 Kubernetes나 ALB 기반 아키텍처로 확장해볼 계획입니다.
