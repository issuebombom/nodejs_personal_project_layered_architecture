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
