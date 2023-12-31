require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Memorystore = require('memorystore')(session);
const express = require('express');
const path = require('path');
const { Server } = require('http');
const socketIo = require('socket.io');

const renderRouter = require('./routes/render.router');
const userRouter = require('./routes/users.router');
const postRouter = require('./routes/posts.router');
const commentRouter = require('./routes/comments.router');
const likesRouter = require('./routes/likes.router');
const socketRouter = require('./routes/socket.router');

const HOST = '127.0.0.1';
const PORT = 3000;
const maxAge = 5 * 60 * 1000; // 5분
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(cookieParser());

const http = Server(app);
const io = socketIo(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
socketRouter(io); // socket.router.js에서 따로 관리

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

app.use('/', [renderRouter]);
app.use('/api', [userRouter, postRouter, commentRouter, likesRouter]);

http.listen(PORT, HOST, () => {
  console.log(PORT, '포트에 접속하였습니다.');
});
