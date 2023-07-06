require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');

const userRouter = require('./routes/users.router');
const postRouter = require('./routes/posts.router');
const commentRouter = require('./routes/comments.router');

const HOST = '127.0.0.1';
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(cookieParser());

// app.use('/', []);
app.use('/api', [userRouter, postRouter, commentRouter]);

app.listen(PORT, HOST, () => {
  console.log(PORT, '포트에 접속하였습니다.');
});
