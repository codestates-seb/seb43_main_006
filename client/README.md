# 🍶매주매주 client
## ⚙️기술 스택

- HTML
- CSS
- JavaScript
- React
- TypeScript
- Styled-Components
- axios
- Redux-toolkit

## 🔍client 구조
- `public`: 정적인 파일 저장
- `eslintrc.json`: eslint 코드 규칙 설정
- `prettierrc.json`: prettier 코드 스타일 규칙 설정
- `package.json`: 핵심 패키지 설정 파일
- `src`: 구현 소스 코드
  - `assets`: 이미지, 폰트등의 정적 asset 저장
  - `components`:  페이지 구성을 위한 컴포넌트 저장
  - `hooks`: 재사용 logic 캠슐화한 커스텀 hook 저장
  - `pages`: 페이지 컴포넌트 저장
  - `redux`: 전역 상태 관리를 위한 redux-toolkit 파일 저장
  - `styles`: 전역 스타일 및 theme 파일 저장
  - `types`: 사용 타입 정의
- tsconfig.json: Typescript 컴파일 설정 파일

```
client
├── package.json
├── eslintrc.json
├── prettierrc.json
├── public
├── src
│   ├── custom.d.ts
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── layout
│       ├── Header
│       ├── Main
│   ├── pages
│   ├── redux
│       ├── slice
│   ├── styles
│   └── types
└── tsconfig.json
 ```
 
 ## 🔔 Git
 ### branch
 - `main`: 시스템 배포 브랜치
 - `dev`: fe/be 병합•테스트 관리 브랜치
 - `fe`: Front-end 브랜치
 - `be`: Back-end 브랜치
 - `fe-feat/ 기능 혹은 페이지 명`: 새로운 기능 개발 및 수정 브랜치


 ### 로컬에서 PR 작성까지의 과정
 1. git checkout -b '브랜치 명' 작성할 브랜치 생성
 2. 작업
 3. git checkout 브랜치명 으로 작업한 브랜치 이동
 4. git status으로 현재 브랜치 확인
 5. git add 파일경로 및 파일명 으로 스테이징
 6. git commit -m '커밋 메시지' (commit convention 준수)
 7. git push origin 브랜치 혹은 git push
 8. PR 양식을 준수해 해당하는 브랜치로 PR 작성

