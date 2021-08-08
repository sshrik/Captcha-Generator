const CAPTCHA_LENGTH = 8;

function genKoreanCaptcha() {
    let result = "";
    for(let i = 0; i < CAPTCHA_LENGTH; i++) {
        // 모든 한글 문자열을 바탕으로한 RECAPTCHA
        result += String.fromCharCode( 44031 + Math.ceil( 11172 * Math.random() ) );
    }
    return result;
}

function checkCaptcha(src, dest) {
    return src === dest;
}

window.onload = () => {
    const $captchaBody = document.querySelector(".captcha-body");
    const $captchaText = $captchaBody.querySelector('.captcha-text');
    $captchaText.innerText = genKoreanCaptcha();
    
    const $input = document.querySelector("input");
    $input.addEventListener('input', (e) => {
        const textValue = e.target.value;

        if(checkCaptcha($captchaText.innerText, textValue)) {
            console.log("GOOD!");
        }
    });

    const $btn = document.querySelector("button");
    $btn.addEventListener('click', (e) => {
        const textValue = $input.value;

        if(checkCaptcha($captchaText.innerText, textValue)) {
            console.log("GOOD!");
        }
    });
}