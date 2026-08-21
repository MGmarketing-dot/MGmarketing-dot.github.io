# GitHub Pages 배포 안내

이 프로젝트는 GitHub 계정 `Tagun9797`의 프로젝트 저장소 **`maguffin-marketing-site`**를 기준으로 설정되어 있습니다. 정상적으로 게시되면 기본 주소는 다음과 같습니다.

```text
https://tagun9797.github.io/maguffin-marketing-site/
```

## 배포 방법

1. GitHub에서 **공개(Public)** 저장소 `maguffin-marketing-site`를 만듭니다.
2. 이 프로젝트의 전체 소스를 해당 저장소의 `main` 브랜치에 올립니다.
3. GitHub 저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다.
4. `main` 브랜치로 푸시하면 `.github/workflows/deploy.yml`이 자동으로 빌드 및 배포합니다.
5. 저장소의 **Actions** 탭에서 배포가 완료된 후, **Settings → Pages**에 표시되는 주소로 접속합니다.

## 주소 또는 저장소 이름을 바꿀 때

저장소 이름이 바뀌면 `vite.config.ts`의 `base` 값도 새 이름으로 바꿔야 합니다. 예를 들어 저장소가 `my-site`가 되면 다음처럼 수정합니다.

```ts
base: process.env.GITHUB_PAGES === "true" ? "/my-site/" : "/",
```

개인 도메인을 나중에 연결한다면 GitHub의 **Settings → Pages → Custom domain**에서 먼저 등록하고, DNS를 설정합니다. 사용자 지정 도메인을 사용하면 `base`는 `/`로 변경해야 합니다.

## 네이버 서치어드바이저 준비

개인 도메인을 연결한 뒤 `client/index.html`, `client/public/robots.txt`, `client/public/sitemap.xml`의 `https://example.com`을 실제 도메인으로 교체하고 다시 푸시합니다. `naver-site-verification`의 토큰도 네이버에서 발급받은 값으로 바꿔야 합니다.
