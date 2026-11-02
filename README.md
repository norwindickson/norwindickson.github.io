# Sunbin 블로그

[Jekyll Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy)를 사용하는 GitHub Pages 블로그입니다.

- 주소: https://norwindickson.github.io
- 언어: 한국어
- 시간대: Asia/Seoul
- 배포: `main`에 push하면 GitHub Actions가 빌드·내부 링크 검사 후 배포
- 댓글·방문자 추적: 설정하지 않음
- 개인 Obsidian 볼트나 서버 자료: 연결하지 않음

## 글 작성

`_posts/YYYY-MM-DD-slug.md` 파일을 만들고 다음 형식으로 작성합니다.

```yaml
---
title: 글 제목
date: YYYY-MM-DD HH:MM:SS +0900
categories: [공부, 과목명]
tags: [개념명]
math: true
---
```

그 아래에 Markdown 본문을 작성하면 됩니다. 이미지 파일은 `assets/img/posts/` 아래에 두고 `/assets/img/posts/파일명.png`로 참조합니다. 수식은 `$...$` 또는 `$$...$$`, 코드는 fenced code block을 사용합니다.

GitHub 웹 편집기로 직접 작성하거나, 저장소를 Mac에 clone해 Obsidian/VS Code로 편집할 수 있습니다. 기존 개인 볼트 전체를 이 공개 저장소로 옮기지 마세요. 공개해도 되는 글·이미지만 복사하세요.

## 발행

```sh
git add _posts assets/img/posts
git commit -m "docs: add a new post"
git push origin main
```

사이트가 갱신되지 않으면 저장소의 **Actions → Build and Deploy** 결과를 확인하세요. 초안은 `_drafts/`에 보관하면 일반 배포에는 포함되지 않습니다. 비밀 정보는 초안에도 넣지 마세요. 이 저장소 자체가 공개입니다.

## 설정 변경

- 이름·소개·프로필: `_config.yml`
- 소개 페이지: `_tabs/about.md`
- 사이드바 연락처: `_data/contact.yml`
- 댓글: 별도의 서비스와 개인정보 설정을 정한 뒤 활성화

스타터 출처: `cotes2020/chirpy-starter`, 검토한 커밋 `beffc88713242da8bf49325674be38d171071213`. 원본 MIT 라이선스를 유지합니다.
