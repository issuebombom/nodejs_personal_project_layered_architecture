const socket = io.connect('/login');

function login() {
  let email = $('#email').val();
  let password = $('#password').val();

  $.ajax({
    type: 'POST',
    url: '/api/login',
    data: {
      email,
      password,
    },
    success: (response) => {
      alert(response.message)
      socket.emit('LOGIN_SUCCEED', {
        email,
      });
    },
    error: (err) => {
      alert(err.responseJSON.message);
    },
  });
}