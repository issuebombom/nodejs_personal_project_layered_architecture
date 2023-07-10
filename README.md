# 게시판 페이지 with 3-Leyered Architecture pattern

> TODO

- [x] 패키지 설치
- [x] ERD 작성
- [x] REST API 작성
- [x] 폴더 트리 구성
- [x] dotenv 등록
- [x] config.js 생성 및 등록
- [x] MySQL 데이터베이스 연결
- [x] 모델 생성 (cli) 및 마이그레이션
  - [x] type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 등록
  - [x] toMany, belongsTo 등록
  - [x] references: {model: 'User', key: 'userId'}, 등록
  - [x] onDelete: 'CASCADE' 등록
  - [x] defaultValue: Sequelize.fn('now'), defaultValue: DataTypes.NOW 등록
  - [x] timestamps: false 등록
- [x] server.js 기본 구성
- [x] routes 구성
- [x] controllers 설정
- [x] services 설정
- [x] repositories 설정
- [x] repositories CRUD with DB 구현
- [x] services CRUD with repositories
- [x] controllers CRUD with services
- [x] Authorization middleware 설정
- [ ] ......

## ISSUE 추가 적용 및 수정 목록

- [ ] 로그인할 때 마다 리프레시 토큰을 생성하므로 DB에 중복 적재되지 않도록 기존 유저는 리프레시 토큰 최신화 처리
- [ ] 로그인 시 컨트롤러에서 직접 리프레시 토큰 테이블에 접근하는데 해당 task도 repository가 처리할 수 있도록 고민해볼 것
- [ ] nodemailer 적용 시 토큰 생성하여 5분 내 가입 가능하도록 구현
- [ ] 트랜잭션 적용 방법 고민해 볼것
- [ ] ......

## ERD 작성

User 테이블 - userId, nickname, email, gender, age, interestTopic, createdAt, updatedAt  
Post 테이블 - postId, UserId, title, topic, content  
Comment 테이블 - commentId, UserId, PostId, content  
LikePost 테이블 - UUID, UserId, PostId  
LikeComment 테이블 - UUID, UserId, CommentId
RefreshToken 테이블 - UUID, refreshToken, UserId

## REST API

### '/' 페이지 접속 관련

- '/' GET 메인페이지
- '/login' GET -> 로그인 페이지
- '/signup' GET -> 회원가입 페이지
- '/posts/:postId' GET -> 상세 게시글 보기

### '/api' 데이터 접근 관련

**_auth.router.js_**

- [x] '/login' POST -> 로그인
  - [x] 토큰 생성 기능
- [x] '/signup' POST -> 회원가입

**_posts.router.js_**

- [x] '/posts' GET -> 전체 게시글 나열
  - [x] 최신 날짜 기준 정렬
  - [x] 좋아요 수 높은 기준 정렬
- [x] '/posts/:postId' GET -> 개별 게시글 나열
- [x] '/posts' POST -> 게시글 작성
  - [x] 인증, 인가 기능
- [x] '/posts' PUT -> 게시글 수정
  - [x] 인증, 인가 기능
- [x] '/posts' DELETE -> 게시글 삭제
  - [x] 인증, 인가 기능

**_comments.router.js_**

- [x] '/posts/:postId/comments' GET -> 해당 게시글의 댓글 나열
- [x] '/posts/:postId/comments' POST -> 댓글 작성
- [x] '/posts/:postId/comments' PUT -> 댓글 수정
- [x] '/posts/:postId/comments' DELETE -> 댓글 삭제

**_likes.router.js_**

- [x] '/posts/:postId/likes' POST -> 게시글 좋아요 등록
- [x] '/posts/:postId/likes' DELETE -> 게시글 좋아요 취소
- [x] '/posts/:postId/likes' GET -> 게시글 좋아요 개수 조회
- [x] '/posts/:postId/comments/:commentId/likes' POST -> 댓글 좋아요 등록
- [x] '/posts/:postId/comments/:commentId/likes' DELETE -> 댓글 좋아요 취소
- [x] '/posts/:postId/comments/:commentId/likes' GET -> 댓글 좋아요 개수 조회

**_users.router.js_**

- [x] '/users/info' GET -> 유저 정보 조회
- [x] '/users/info' PUT -> 유저 정보 수정
- [x] '/users/info/password' PUT -> 유저 패스워드 변경
- [x] '/users/info' DELETE -> 유저 정보 삭제 (회원탈퇴)

## Middlewares

**_auth.middleware.js_**

- [x] 토큰 생성 (Access Token, Refresh Token)
- [x] 인증, 인가

## 3-layered architecture

controllers, services, repositories로 레이어를 나눈다.  
repositories - 순수하게 DB 조회만 한다.  
services - repositories에서 받은 조회 결과를 클라이언트 요구사항에 맞게 수정(정렬, 일부 정보만 공개 등)  
controllers - API 통신 영역, 유효성 검사
