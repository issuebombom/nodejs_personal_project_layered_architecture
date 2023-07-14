const AuthMiddleware = require('../middlewares/auth.middleware');
const UserService = require('../services/users.service');

const auth = new AuthMiddleware();
const userService = new UserService();

module.exports = (chatIo) => {
  let chatSocketList = []; // 채팅에 접속한 모든 유저의 소켓을 보관

  // 추후 아래 함수 옮길 것
  function parseCookies(cookieString) {
    const cookies = {};
    cookieString.split(';').forEach((cookie) => {
      const [key, value] = cookie.split('=').map((c) => c.trim());
      cookies[key] = decodeURIComponent(value);
    });
    return cookies;
  }
  // chat 구현
  chatIo.on('connection', async (socket) => {
    chatSocketList.push(socket);
    const cookies = parseCookies(socket.request.headers.cookie);
    const { accessToken } = cookies;
    const { userId } = auth.getAccessTokenPayload(accessToken);
    const user = await userService.findUserCommonData(userId);

    console.log(`${user.nickname}유저가 접속했습니다. (현재 접속자: ${chatSocketList.length}명)`);

    socket.emit('JOIN', user);

    // 누군가 메시지를 등록하면 작성자를 제외한 유저에게 emit합니다.
    socket.on('SEND', (data) => {
      const { msg, user } = data;
      chatSocketList.forEach((item) => {
        if (item !== socket) {
          item.emit('SEND', { msg, user });
        }
      });
    });
    socket.on('disconnect', function () {
      chatSocketList.splice(chatSocketList.indexOf(socket), 1);
      console.log(`${user.nickname}유저가 퇴장했습니다. (현재 접속자: ${chatSocketList.length}명)`);
    });
  });
};
