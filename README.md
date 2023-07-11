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

- [x] 로그인할 때 마다 리프레시 토큰을 생성하므로 DB에 중복 적재되지 않도록 기존 유저는 리프레시 토큰 최신화 처리
- [x] 로그인 시 컨트롤러에서 직접 리프레시 토큰 테이블에 접근하는데 해당 task도 repository가 처리할 수 있도록 수정
- [x] nodemailer 적용 시 토큰 생성하여 5분 내 가입 가능하도록 구현
- [x] socket.io 간단하게나마 적용해 볼 것
  - 로그인 성공 시 socket.io를 통해 백엔드 cli에 성공 메시지 출력되도록 구현
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

프론트 페이지가 존재한다고 가정했을 때 우선적으로 떠오르는 render 페이지를 작성해 보았습니다.  
`현재 프론트 페이지는 구현되어 있지 않습니다.`

- '/' GET 메인페이지
- '/login' GET -> 로그인 페이지
- '/signup' GET -> 회원가입 페이지
- '/posts/:postId' GET -> 상세 게시글 보기
- '/mypage' GET -> 개인정보 페이지

### '/api' 데이터 접근 관련

**_posts.router.js_**

- [x] '/posts' GET -> 전체 게시글 나열(?orderby=likes 입력 시 좋아요 순 정렬)
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

- [x] '/posts/:postId/comments' GET -> 해당 게시글의 댓글 나열(?orderby=likes 입력 시 좋아요 순 정렬)
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

- [x] '/users' GET -> 모든 유저 정보 조회(테스트 확인용)
- [x] '/users/info' GET -> 유저 정보 조회(개인정보는 쿠키에서 획득)
- [x] '/users/info' PUT -> 유저 정보 수정(개인)
- [x] '/users/info/password' PUT -> 유저 패스워드 변경
- [x] '/users/info' DELETE -> 유저 정보 삭제 (회원탈퇴)
- [x] '/signup' POST -> 회원가입(인증 메일을 통한 인증 필요)
- [x] '/signup/mail' POST -> 인증 메일 발송 (인증 번호 발송)
  - [x] 인증번호 발송 시 세션에 확인용 인증번호 저장
- [x] '/signup/mail/verify' POST -> 인증 번호 검증
  - [x] 인증번호 일치 시 세션에 true값 남기기
- [x] '/login' POST -> 로그인
  - [x] 토큰 생성 기능

## Middlewares

**_auth.middleware.js_**

- [x] 토큰 생성 (Access Token, Refresh Token)
- [x] 인증, 인가

## 3-layered architecture의 역할 배분

이번 프로젝트의 구조는 controllers, services, repositories로 레이어를 나눈다.

repositories - 순수하게 DB 조회만 한다.  
services - repositories에서 받은 조회 결과를 클라이언트 요구사항에 맞게 수정(정렬, 일부 정보만 공개 등)  
controllers - API 통신 영역, 유효성 검증, 인증/인가

## 세부 구현 내역

### nodemailer 활용을 통한 인증 방식 구현

회원 가입 시 *랜덤 인증 번호를 생성*하여 가입을 시도하고자 하는 *메일로 발송*하며, 유저는 본인 메일에서 인증 번호를 확인 후 입력창에 입력하여 인증을 완료하면 회원가입이 가능하도록 구현

---

#### 세션을 활용하여 인증번호 검증

```javascript
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const Memorystore = require('memorystore')(session);

const userRouter = require('./routes/users.router');

const HOST = '127.0.0.1';
const PORT = 3000;
const maxAge = 5 * 60 * 1000; // 5분
const app = express();

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new Memorystore({ checkPeriod: maxAge }),
    cookie: {
      maxAge: maxAge, // 5분
    },
  })
);

app.use('/api', [userRouter]);

app.listen(PORT, HOST, () => {
  console.log(PORT, '포트에 접속하였습니다.');
});
```

`express-session` 과 `memorystore` 패키지를 설치하여 세션을 서버의 메모리에 저장하도록 구현합니다.  
현재 메일 인증용으로만 세션을 활용하고 있으므로 세션 유효 기간을 5분으로 설정합니다. 즉 5분 내 인증 절차 및 회원가입을 마무리하지 못하면 메일을 재발송해야 합니다.

---

```javascript
// nodemailer.js
const nodemailer = require('nodemailer');

class VerificationMail {
  transporter = nodemailer.createTransport({
    // 인증 서비스는 'gmail' 사용
    service: 'gmail',
    secure: false,
    auth: {
      // gmail 주소 입력, ex) 'testmail@gmail.com'
      user: process.env.NODEMAILER_USER,
      // gmail 패스워드 입력
      pass: process.env.NODEMAILER_PASS,
    },
  });

  // 6자리 난수 생성
  generateVerificationCode = () => {
    // 6자리 랜덤 인증 번호 생성
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    return verificationCode;
  };

  // 이메일 인증
  sendEmail = async (email) => {
    const randomNumber = this.generateVerificationCode();
    const mailOption = {
      from: `"issuepark" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: '[issuepark] 회원가입 인증 메일입니다.',
      html: `
            <h2 style="margin: 20px 0">[issuepark] 인증 메일 확인</h2>
            <p>아래 인증번호를 인증번호 입력란에 기입해 주세요.</p>
            <p style='color: red; font-size: 40px;'>${randomNumber}</p>
            `,
    };
    await this.transporter.sendMail(mailOption);
    return randomNumber;
  };
}

module.exports = VerificationMail;
```

3-layered-architecture에서 워낙 class를 즐겨 사용하다보니 nodemailer도 class 형태로 작성했습니다.  
`VerificationMail` 클래스 안에 인증메일 발송에 필요한 모든 프로퍼티를 담고 있으며 `transporter` 메서드는 gmail을 활용한 인증메일 발송에 필요한 정보를 담습니다.

> 🚨 `주의사항`  
> **_transporter의 pass는 일반적으로 생각하는 gmail의 패스워드가 아닙니다._**  
> gmail을 발송용 메일로 활용하기 위해서는 `Google 계정 관리 - 보안` 에서 2단계 인증이 필요하며 이를 완료하면 `2단계 인증 - 앱 비밀번호` 항목에 접속하면 `앱 선택` 드롭다운이 있는데 해당 란에서 `기타(맟춤 이름)` 선택 후 적절한 이름을 지어준 뒤 `생성`을 클릭하면 `16자리 비밀번호가 생성`되는데 이를 입력한 값입니다.

`generateVerificationCode` 프로퍼티(함수)를 통해 6자리 난수를 생성하고, sendEmail 프로퍼티(함수)를 통해 생성한 난수를 인증 메일로 전송하고, 서버의 세션(메모리)에 저장합니다.

---

```javascript
// users.controller.js
signup = async (req, res) => {
  try {
    const { nickname, password, confirm, email, gender, interestTopic } = req.body;

    // comfirm 검증
    if (password !== confirm) return res.status(412).send({ message: '암호와 암호확인 불일치' });

    // 유효성 검증 생략

    // 인증 번호 검증 확인 유무
    if (!req.session.isVerified)
      return res.status(412).send({ message: '인증 번호를 먼저 검증받을 것' });

    // 해시화 및 생성
    const hashedPassword = await bcrypt.hash(password, 10); // pw, salt_rounds
    const createUserData = await this.userService.createUser(
      nickname,
      hashedPassword,
      email,
      gender,
      interestTopic
    );
    res.status(200).send({ data: createUserData });
  } catch (err) {
    console.error(err.name, ':', err.message);
    return res.status(400).send({ message: `${err.message}` });
  }
};
```

signup 함수는 회원가입 API와 연결됩니다. 코드를 보면 `req.session.isVerified` 항목이 true값을 가질 때만 이후 회원가입 절차를 밟을 수 있도록 끼워넣었습니다. 기본적으로 세션 생성 시 req.session.isVerified 프로퍼티는 세션에 존재하지 않으므로 인증을 완료하지 않는다면 지나갈 수 없습니다.

---

```javascript
// users.controller.js
sendVerificationMail = async (req, res) => {
  try {
    const { email } = req.body;
    const verificationMail = new VerificationMail();
    const randomNumber = await verificationMail.sendEmail(email); // 인증번호 메일 전송 후 난수 리턴
    req.session.verificationCode = randomNumber;

    res.status(200).send({ message: '인증 메일 전송 완료' });
  } catch (err) {
    console.error(err.name, ':', err.message);
    return res.status(400).send({ message: `${err.message}` });
  }
};
```

해당 함수는 `인증 메일 발송 버튼 클릭` 시 작동을 위한 함수이며 인증 메일 발송을 위한 `verificationMail.sendEmail(email)` 함수가 작동하면 생성된 난수를 리턴합니다. 그리고 해당 난수를 `req.session.verificationCode` 세션에 저장합니다.

> 🚨 `주의 사항`  
> 세션 저장은 res 즉 응답을 보낼 때 자동적으로 save됩니다. 그러므로 만약 res를 통한 응답을 완료한 이후 세션값을 지정한다면 기본적으로 해당 값은 저장되지 않으며 이와 같은 상황에서는 이후 `req.session.save()` 입력을 통해 직접 저장해야 합니다. 위 코드의 경우 res.status(200) 이전에 세션값 지정이 이루어 지므로 따로 save 메서드가 필요하지 않습니다.

---

```javascript
verifyCode = async (req, res) => {
  try {
    const { inputVerificationCode } = req.body;
    const verificationCode = req.session.verificationCode;

    if (!verificationCode) return res.status(404).send({ message: '인증 메일을 먼저 발송할 것' });
    // 인증 번호 입력 유효성 검증 필요

    // 인증 번호 일치 여부 검증
    if (verificationCode !== inputVerificationCode)
      return res.status(412).send({ message: '인증 번호 일치하지 않음' });

    // 인증 번호 일치 시
    req.session.isVerified = true;

    return res.status(200).send({ message: '인증 번호 확인 완료' });
  } catch (err) {
    console.error(err.name, ':', err.message);
    return res.status(400).send({ message: `${err.message}` });
  }
};
```

인증번호를 검증하는 함수 입니다. 이는 인증 메일 발송 버튼 클릭 후 프론트에서 `인증 번호 입력창` 과 `확인 버튼`이 생성되었다는 가정 하에 `확인 버튼` 클릭 시 작동을 위한 함수입니다.  
입력창에 메일에서 확인한 인증번호 6자리를 입력하면 세션에 저장했던 인증번호와 대조합니다. 일치할 경우 `req.session.isVerified = true;`를 설정합니다. 이는 위 signup 함수에서 메일 인증이 확인되었음을 구분하기 위한 정보로 활용됩니다.

---

정리하자면 회원가입 페이지 내 인증 메일 발송 버튼이 존재하고 이를 클릭 시 `sendVerificationMail` 함수가 작동합니다. 그 뒤 프론트에 인증번호 입력창과 확인 버튼이 생성된다는 가정 하에 내용 입력 후 확인 버튼 클릭 시 `verifyCode` 함수가 작동합니다. 이 과정을 모두 거쳤다면 페이지 하단에 존재할 회원가입하기 버튼 클릭 시 작동하는 `signup` 함수가 정상적으로 실행되어 신규 유저를 생성합니다.
