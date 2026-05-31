import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogDiagram } from "../_components/blog-diagram";
import { CodeBlock, InlineCode, ReferenceList } from "../_components/blog-elements";

export const metadata = {
  title: "리눅스 파일시스템과 디렉터리 구조 이해하기 | Blog",
  description:
    "리눅스 파일시스템의 단일 루트 트리, mount, inode, path resolution, FHS 기준 디렉터리 역할과 운영에서 자주 하는 실수를 정리한 글",
};

const references = [
  {
    label: "Filesystem Hierarchy Standard 3.0",
    href: "https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html",
  },
  {
    label: "man7.org - hier(7)",
    href: "https://man7.org/linux/man-pages/man7/hier.7.html",
  },
  {
    label: "man7.org - inode(7)",
    href: "https://man7.org/linux/man-pages/man7/inode.7.html",
  },
  {
    label: "man7.org - path_resolution(7)",
    href: "https://man7.org/linux/man-pages/man7/path_resolution.7.html",
  },
  {
    label: "man7.org - proc(5)",
    href: "https://man7.org/linux/man-pages/man5/proc.5.html",
  },
  {
    label: "systemd - File Hierarchy",
    href: "https://www.freedesktop.org/software/systemd/man/latest/file-hierarchy.html",
  },
];

export default function LinuxFilesystemDirectoryStructureBlogPostPage() {
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
              Linux / Filesystem · 2026.05
            </p>
            <h1 className="mx-auto mt-4 max-w-[700px] font-heading text-4xl font-medium leading-[1.11] tracking-normal text-black">
              리눅스 파일시스템과 디렉터리 구조 이해하기
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              리눅스를 처음 다룰 때는 <InlineCode>/etc</InlineCode>,{" "}
              <InlineCode>/var</InlineCode>, <InlineCode>/usr</InlineCode>,{" "}
              <InlineCode>/proc</InlineCode> 같은 디렉터리가 그냥 폴더 이름처럼 보입니다.
              하지만 운영 관점에서는 이 구조가 설정, 실행 파일, 로그, 런타임 상태, 커널
              인터페이스를 분리하는 약속입니다.
            </p>
          </header>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              파일시스템은 저장소 위의 구조다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                파일시스템은 디스크나 메모리 같은 저장 공간 위에 파일과 디렉터리를 어떤
                방식으로 배치하고 찾을지 정하는 구조입니다. ext4, XFS, Btrfs, tmpfs처럼
                구현은 다를 수 있지만, 사용자와 프로그램은 대부분 같은 POSIX 스타일 API로
                파일을 열고 읽고 씁니다.
              </p>
              <p>
                리눅스에서는 거의 모든 것이 파일처럼 보입니다. 일반 파일, 디렉터리, 장치
                파일, socket, pipe, symbolic link가 모두 파일시스템 namespace 안에 놓입니다.
                그래서 서버를 운영할 때 파일시스템을 이해한다는 것은 단순히 폴더 이름을
                외우는 것이 아니라 프로세스, 장치, 설정, 로그가 어디에 노출되는지 이해하는
                일에 가깝습니다.
              </p>
              <p>
                중요한 출발점은 <InlineCode>/</InlineCode>입니다. 리눅스는 Windows처럼
                <InlineCode>C:</InlineCode>, <InlineCode>D:</InlineCode> 드라이브를 나누어
                보여주지 않습니다. 하나의 루트 디렉터리 아래에 모든 디렉터리를 붙이고,
                다른 디스크나 가상 파일시스템은 mount point를 통해 그 트리의 일부로
                연결합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/linux-filesystem-root-tree.png"
              alt="리눅스 파일시스템이 하나의 루트 디렉터리 아래에 etc, usr, var, home, run, dev, proc, sys, boot, tmp 같은 디렉터리를 붙이는 구조 다이어그램"
              width={1440}
              height={900}
              caption="리눅스는 하나의 루트 트리를 보여줍니다. 실제 데이터는 여러 디스크, tmpfs, procfs, sysfs에서 올 수 있지만 사용자는 모두 / 아래의 경로로 접근합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              경로는 파일 자체가 아니다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>/var/log/nginx/access.log</InlineCode> 같은 경로는 사람이 읽기
                쉬운 문자열입니다. 커널은 이 문자열을 한 번에 파일로 바꾸지 않습니다.
                <InlineCode>/</InlineCode>에서 시작해 <InlineCode>var</InlineCode>,{" "}
                <InlineCode>log</InlineCode>, <InlineCode>nginx</InlineCode>,{" "}
                <InlineCode>access.log</InlineCode>를 순서대로 해석합니다.
              </p>
              <p>
                디렉터리는 이름과 inode를 연결하는 mapping에 가깝습니다. inode는 파일의
                타입, 권한, 소유자, timestamp, 데이터 block 위치 같은 metadata를 담습니다.
                즉 파일 이름은 디렉터리 entry에 있고, 파일의 실체와 metadata는 inode 쪽에
                있습니다.
              </p>
              <p>
                이 관점이 중요한 이유는 link와 mount를 이해할 수 있기 때문입니다. hard link는
                같은 inode를 여러 이름으로 가리킬 수 있고, symbolic link는 다른 pathname을
                가리킵니다. mount point는 경로 탐색 중 특정 디렉터리 아래를 다른 filesystem의
                root로 바꿔 연결합니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/linux-filesystem-path-inode.png"
              alt="Path string이 directory entries, inode metadata, data blocks로 해석되고 mount point와 VFS layer를 거치는 구조 다이어그램"
              width={1440}
              height={900}
              caption="경로는 파일 자체가 아니라 이름을 따라가는 탐색 과정입니다. directory entry가 inode를 가리키고, inode가 metadata와 데이터 위치를 설명합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              주요 디렉터리 역할
            </h2>
            <div className="mt-6">
              <DirectoryRow
                path="/"
                title="root directory"
                body="모든 경로의 시작점입니다. 다른 filesystem과 장치는 mount를 통해 이 트리 아래에 연결됩니다."
              />
              <DirectoryRow
                path="/bin, /sbin"
                title="필수 실행 파일"
                body="시스템 부팅과 복구에 필요한 기본 command가 있던 위치입니다. 최근 배포판은 /usr merge로 /bin이 /usr/bin을 가리키는 symlink인 경우가 많습니다."
              />
              <DirectoryRow
                path="/lib, /lib64"
                title="필수 shared library"
                body="기본 binary 실행에 필요한 library가 위치하던 경로입니다. 이 역시 modern distribution에서는 /usr/lib 계열로 합쳐진 경우가 많습니다."
              />
              <DirectoryRow
                path="/usr"
                title="배포판이 설치한 소프트웨어"
                body="대부분의 user-space binary, library, documentation이 위치합니다. 이름은 user가 아니라 Unix System Resources 또는 shareable read-only data로 이해하는 편이 실무적으로 더 맞습니다."
              />
              <DirectoryRow
                path="/usr/local"
                title="관리자가 직접 설치한 로컬 소프트웨어"
                body="패키지 매니저가 관리하는 /usr와 분리해, 시스템 관리자가 직접 빌드하거나 설치한 프로그램을 둘 때 사용합니다."
              />
              <DirectoryRow
                path="/etc"
                title="호스트별 설정"
                body="systemd unit override, nginx 설정, sshd 설정, network 설정처럼 machine-specific configuration이 위치합니다. 백업과 변경 추적의 우선순위가 높은 디렉터리입니다."
              />
              <DirectoryRow
                path="/var"
                title="계속 변하는 데이터"
                body="log, cache, spool, service state처럼 운영 중 계속 변하는 데이터가 위치합니다. /var/log, /var/lib, /var/cache를 구분해서 봐야 합니다."
              />
              <DirectoryRow
                path="/home, /root"
                title="사용자 홈"
                body="/home은 일반 사용자 홈 디렉터리이고 /root는 root 사용자의 홈입니다. 서비스 상태나 공용 runtime data를 사용자 홈에 섞어두면 운영 추적이 어려워집니다."
              />
              <DirectoryRow
                path="/tmp"
                title="임시 파일"
                body="프로세스가 임시 작업 파일을 두는 위치입니다. 재부팅이나 정리 정책으로 사라질 수 있으므로 영속 데이터 저장소로 쓰면 안 됩니다."
              />
              <DirectoryRow
                path="/run"
                title="부팅 이후 런타임 상태"
                body="PID file, socket, lock file처럼 현재 부팅 세션에서만 유효한 runtime state를 둡니다. 보통 tmpfs이므로 reboot 후 사라집니다."
              />
              <DirectoryRow
                path="/dev"
                title="장치 파일"
                body="disk, terminal, random device 같은 kernel device interface가 파일처럼 노출됩니다. 일반 애플리케이션 데이터를 저장하는 위치가 아닙니다."
              />
              <DirectoryRow
                path="/proc, /sys"
                title="커널과 프로세스의 가상 파일시스템"
                body="/proc은 process와 kernel 정보를, /sys는 device와 kernel object 정보를 노출합니다. 디스크에 저장된 일반 파일이 아니라 kernel이 만들어 보여주는 interface입니다."
              />
              <DirectoryRow
                path="/boot"
                title="부팅 관련 파일"
                body="kernel image, initramfs, bootloader 관련 파일이 위치합니다. 작은 별도 partition으로 분리된 서버에서는 용량 부족이 kernel update 실패로 이어질 수 있습니다."
              />
              <DirectoryRow
                path="/opt, /srv, /mnt, /media"
                title="추가 애플리케이션, 서비스 데이터, mount"
                body="/opt는 vendor application, /srv는 서비스가 제공하는 데이터, /mnt는 임시 mount, /media는 removable media mount에 자주 사용됩니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              운영 파일은 역할별로 나눠야 한다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                좋은 리눅스 운영은 설정, 실행 파일, runtime state, log, service data, user data를
                섞지 않는 것에서 시작합니다. 파일이 어디에 있느냐는 backup, restore, log
                rotation, 배포, 권한 관리, 장애 분석 방식에 직접 영향을 줍니다.
              </p>
              <p>
                예를 들어 nginx 설정은 <InlineCode>/etc/nginx</InlineCode>에, nginx access log는
                <InlineCode>/var/log/nginx</InlineCode>에, 애플리케이션 persistent state는
                <InlineCode>/var/lib/myapp</InlineCode>에 두는 식입니다. 실행 파일은
                distribution package라면 <InlineCode>/usr</InlineCode>, 직접 설치한 local tool이면
                <InlineCode>/usr/local</InlineCode>, vendor bundle이면 <InlineCode>/opt</InlineCode>
                가 자연스럽습니다.
              </p>
              <p>
                반대로 mutable application state를 <InlineCode>/usr</InlineCode> 아래에 쓰거나,
                영속 데이터가 필요한데 <InlineCode>/tmp</InlineCode>에 의존하거나, 서비스 로그를
                사용자 홈에 남기면 운영 자동화와 장애 분석이 어려워집니다.
              </p>
            </div>
            <BlogDiagram
              src="/blog/linux-filesystem-directory-purpose.png"
              alt="Configuration, installed software, variable state, runtime state, user data, kernel interfaces별 리눅스 디렉터리 목적을 정리한 다이어그램"
              width={1440}
              height={900}
              caption="운영 파일은 역할별로 위치가 다릅니다. 설정은 /etc, 서비스 데이터는 /var/lib, 로그는 /var/log, 런타임 파일은 /run, 사용자 작업은 /home에 두는 식으로 분리합니다."
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              가상 파일시스템을 일반 디렉터리처럼 보면 안 된다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                <InlineCode>/proc</InlineCode>, <InlineCode>/sys</InlineCode>,{" "}
                <InlineCode>/dev</InlineCode>, <InlineCode>/run</InlineCode>은 디스크 위의
                일반 디렉터리와 성격이 다릅니다. 이들은 kernel이 현재 system state를 파일처럼
                보여주거나, device와 runtime object를 파일 namespace에 연결한 것입니다.
              </p>
              <p>
                <InlineCode>/proc/1234</InlineCode>는 PID 1234 process 정보를 보여주고,
                <InlineCode>/proc/cpuinfo</InlineCode>는 CPU 정보를 보여줍니다.{" "}
                <InlineCode>/sys</InlineCode>는 device와 driver 정보를 계층적으로 노출합니다.
                <InlineCode>/dev/sda</InlineCode> 같은 파일은 실제 일반 파일이 아니라 block
                device node입니다.
              </p>
              <p>
                이 구조 덕분에 많은 운영 도구가 파일을 읽듯 system state를 확인할 수 있습니다.
                하지만 여기에 애플리케이션 데이터를 저장하거나 일반 파일처럼 백업 대상으로
                다루면 안 됩니다.
              </p>
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              권한은 경로 전체에서 확인된다
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                파일 권한은 마지막 파일 하나만 보지 않습니다. 경로를 따라가는 모든 디렉터리에
                execute 권한이 있어야 해당 path를 통과할 수 있습니다. 그래서 파일 자체는
                읽기 가능해 보여도 상위 디렉터리 권한 때문에 접근이 실패할 수 있습니다.
              </p>
              <p>
                소유자, group, mode, ACL, SELinux/AppArmor 정책, mount option이 함께 작동합니다.
                운영에서 <InlineCode>Permission denied</InlineCode>를 만나면{" "}
                <InlineCode>ls -l</InlineCode>만 볼 것이 아니라 <InlineCode>namei -l</InlineCode>,
                mount option, 보안 모듈 로그까지 확인해야 합니다.
              </p>
            </div>
            <CodeBlock
              code={`권한과 경로 확인
pwd
ls -la /var/log/nginx
namei -l /var/log/nginx/access.log
stat /var/log/nginx/access.log

mount와 용량 확인
findmnt
df -hT
du -sh /var/log /var/lib
lsblk -f`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              실무에서 자주 하는 실수
            </h2>
            <div className="mt-6">
              <MistakeRow
                title="/tmp를 영속 저장소처럼 사용"
                body="/tmp는 정리 정책이나 reboot로 사라질 수 있습니다. 업로드 중간 파일은 가능하지만 최종 데이터 저장소로 쓰면 안 됩니다."
              />
              <MistakeRow
                title="/usr 아래에 애플리케이션 상태를 기록"
                body="/usr은 보통 설치된 소프트웨어와 read-only에 가까운 데이터를 위한 영역입니다. 서비스 상태는 /var/lib, 로그는 /var/log로 분리하는 편이 안전합니다."
              />
              <MistakeRow
                title="/var/log 또는 Docker data가 root partition을 가득 채움"
                body="로그와 container layer는 빠르게 커질 수 있습니다. logrotate, journald 정책, Docker data root, 별도 partition을 함께 봐야 합니다."
              />
              <MistakeRow
                title="mount point 아래 기존 파일을 잊음"
                body="디렉터리에 filesystem을 mount하면 그 아래 기존 파일은 사라진 것이 아니라 가려집니다. unmount하면 다시 보일 수 있습니다."
              />
              <MistakeRow
                title="/proc, /sys를 일반 파일 저장 위치로 오해"
                body="이 경로들은 kernel interface입니다. 읽고 쓰는 동작이 즉시 system state에 영향을 줄 수 있으므로 문서 없이 수정하면 위험합니다."
              />
              <MistakeRow
                title="/bin, /sbin이 실제 디렉터리라고 가정"
                body="modern distribution에서는 /bin, /sbin, /lib이 /usr 아래로 합쳐진 symlink일 수 있습니다. script에서 경로를 하드코딩할 때 주의해야 합니다."
              />
            </div>
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              장애 분석 순서
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                파일시스템 문제는 애플리케이션 오류처럼 보이는 경우가 많습니다. 로그를 못
                쓰면 서버가 500을 내고, disk full이면 database가 멈추고, permission 문제면
                배포 후 특정 파일만 읽지 못합니다. 그래서 장애를 볼 때는 경로, 권한, mount,
                용량, 파일 타입을 나눠서 확인해야 합니다.
              </p>
              <p>
                먼저 실제 경로가 맞는지 확인하고, symlink를 따라가며, 어떤 filesystem에
                올라가 있는지 봅니다. 그 다음 권한과 소유자, 남은 용량과 inode, read-only
                mount 여부, SELinux/AppArmor 같은 추가 정책을 확인합니다.
              </p>
            </div>
            <CodeBlock
              code={`파일시스템 장애 확인 순서
1. realpath /path/to/file
2. namei -l /path/to/file
3. stat /path/to/file
4. findmnt /path/to/file
5. df -hT /path/to/file
6. df -ih /path/to/file
7. mount | grep ' /target '
8. journalctl -xe`}
            />
          </section>

          <section className="pt-[88px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-normal text-black">
              정리
            </h2>
            <div className="mt-6 grid gap-4 text-base font-normal leading-relaxed tracking-normal text-[#737373]">
              <p>
                리눅스 파일시스템은 <InlineCode>/</InlineCode>에서 시작하는 하나의 트리입니다.
                하지만 그 아래에는 실제 disk filesystem, tmpfs, procfs, sysfs, device node가
                함께 붙어 있습니다. 겉으로는 모두 경로처럼 보이지만 성격은 다릅니다.
              </p>
              <p>
                디렉터리는 이름과 inode를 연결하고, inode는 metadata와 데이터 위치를 설명합니다.
                mount point와 symbolic link까지 이해하면 “파일이 어디에 있는가”라는 질문을
                더 정확히 답할 수 있습니다.
              </p>
              <p>
                운영에서는 디렉터리의 목적을 지키는 것이 중요합니다. 설정은{" "}
                <InlineCode>/etc</InlineCode>, 로그는 <InlineCode>/var/log</InlineCode>,
                서비스 상태는 <InlineCode>/var/lib</InlineCode>, runtime file은{" "}
                <InlineCode>/run</InlineCode>, 사용자 데이터는 <InlineCode>/home</InlineCode>에
                두는 기준을 지키면 백업, 배포, 장애 분석이 훨씬 단순해집니다.
              </p>
            </div>
          </section>

          <ReferenceList references={references} />
        </article>
      </main>
    </div>
  );
}



function DirectoryRow({
  path,
  title,
  body,
}: {
  path: string;
  title: string;
  body: string;
}) {
  return (
    <section className="border-t border-[#e5e5e5] py-5 first:border-t-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-mono text-[18px] font-semibold leading-[1.56] tracking-normal text-black">
          {path}
        </h3>
        <span className="text-base font-medium leading-relaxed tracking-normal text-black">
          {title}
        </span>
      </div>
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
