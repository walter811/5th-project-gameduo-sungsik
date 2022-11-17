<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#환경셋팅">환경셋팅</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# [프리온보딩] 게임듀오 백엔드 API 개발 프로젝트

## About The Project

### 프로젝트 개요

#### 서비스 개요

    - 보스레이드 PVE 컨텐츠 관련 백엔드 API 기능 구현

- 개발 조건
  - database 는 RDB를 기본으로 사용
  - 일부 기능은 Redis 캐싱을 사용
  - S3 오브젝트 주소를 통해 데이터를 받아와 API에 적용

</br>

- 책임

| 김성식                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------- |
| 유저 생성</br>유저 조회</br>보스레이드 상태 조회</br>보스레이드 시작</br>보스레이드 종료</br>랭킹 조회 |

</br>

- 개발 우선순위
  1. 완성: 일정 준수 / API 정상 작동 / 코딩 컨벤션 / 코드패키지 구조
     1. 2022.11.15.화요일 23:59 까지 API 완성
     2. API 정상 작동 테스트: 금요일 17:00-24:00 까지
     3. 금요일 내로 README 작성
  2. 추가 구현: 자세한 내용은 아래에 있음
     1. 화요일 이후에 구현
- 추가 구현 목표
  - API 명세서 (swagger)
  - Unit test

</br>

### ERD
<img width="880" alt="ERD" src="https://user-images.githubusercontent.com/104759273/202399803-4bc1e62f-6fcf-4cd3-8ed8-c6aa9a06e062.jpg">

</br>

### Built With

- JavaScript
- TypeScript
- NestJS
- TypeORM
- Jest
- Swagger

</br>

<!-- GETTING STARTED -->

## Getting Started

```
.
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── boss-raid
│   ├── boss-raid.controller.spec.ts
│   ├── boss-raid.controller.ts
│   ├── boss-raid.module.ts
│   ├── boss-raid.service.spec.ts
│   ├── boss-raid.service.ts
│   └── dto
│       ├── endRaid.request.dto.ts
│       └── enterRaid.request.dto.ts
├── entities
│   ├── history.entity.ts
│   └── user.entity.ts
├── http-exception.filter.ts
├── main.ts
└── user
    ├── user.controller.spec.ts
    ├── user.controller.ts
    ├── user.module.ts
    ├── user.service.spec.ts
    └── user.service.ts
```

</br>

### 환경셋팅

- 프로젝트 셋업(Git repository & Server 초기세팅)
  - server 셋팅
    - TypORM 을 사용함
    - Redis를 사용함
  - Git repo
    - 짧은 프로젝트 기간을 고려해 git flow 는 단순화했음: main-feature branch
    - git 컨벤션: [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)

</br>

<!-- USAGE EXAMPLES -->

## Usage

[API 명세]

nest에 내장된 Swagger로 명세서 제작(예정)

</br>

<!-- ROADMAP -->

## Roadmap

#### 구현 목표

- [x] 유저 생성
- [x] 유저 조회
- [x] 보스레이드 상태 조회
- [x] 보스레이드 시작
- [x] 보스레이드 종료
- [x] 랭킹 조회
  - [] Swagger 
  - [] unit test
