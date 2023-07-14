module.exports = (loginIo) => {
  loginIo.on('connection', (socket) => {
    console.log('로그인 페이지 소켓이 연결되었어요!');

    socket.on('LOGIN_SUCCEED', (data) => {
      const { email } = data;
      console.log(`${email}님이 로그인 했습니다.`);
    });
  });
}