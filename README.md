# 게시판 페이지 with 3-Leyered Architecture pattern

> TODO

- [x] 패키지 설치
- [X] ERD 작성
- [ ] REST API 작성
- [X] 폴더 트리 구성
- [X] dotenv 등록
- [X] config.js 생성 및 등록
- [x] MySQL 데이터베이스 연결
- [x] 모델 생성 (cli) 및 마이그레이션
  - [x] type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 등록
  - [x] toMany, belongsTo 등록
  - [x] references: {model: 'User', key: 'userId'}, 등록
  - [x] onDelete: 'CASCADE' 등록
  - [x] defaultValue: Sequelize.fn('now'), defaultValue: DataTypes.NOW 등록
  - [x] timestamps: false 등록
- [ ] server.js 기본 구성
- [ ] routes 구성
- [ ] controllers 설정
- [ ] services 설정
- [ ] repositories 설정
- [ ] repositories CRUD with DB 구현
- [ ] services CRUD with repositories
- [ ] controllers CRUD with services
- [ ] Authorization middleware 설정
- [ ] ......

ERD 작성
User 테이블 - userId, nickname, email, gender, age, interestTopic, createdAt, updatedAt
Post 테이블 - postId, UserId, title, topic, content
Comment 테이블 - commentId, UserId, PostId, content
LikePost 테이블 - UUID, UserId, PostId
LikeComment 테이블 - UUID, UserId, CommentId
