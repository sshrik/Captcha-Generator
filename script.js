const CAPTCHA_LENGTH = 8;

function genKoreanCaptcha() {
    let result = "";
    for(let i = 0; i < CAPTCHA_LENGTH; i++) {
        // 모든 한글 문자열을 바탕으로한 RECAPTCHA
        result += String.fromCharCode( 44031 + Math.ceil( 11172 * Math.random() ) );
    }
    return result;
}

console.log(genKoreanCaptcha());