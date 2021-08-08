const CAPTCHA_LENGTH = 8;
const STRING_BANK = "가개갸거게겨고괴괘교구귀궤규그긔기나내냐너네녀노뇌놰뇨누뉘눼뉴느늬니다대댜더데뎌도되돼됴두뒤뒈류드듸디라래랴러레려로뢰뢔료루뤼뤠류르리마매먀머메며모뫼뫠묘무뮈뭬뮤므믜미바배뱌버베벼보뵈봬뵤부뷔붸뷰브븨비사새샤서세셔소쇠쇄쇼수쉬쉐슈브븨비아애야어에여오외왜요우위웨유으의이자재쟈저제져조죄좨죠주쥐줴쥬즈즤지차채챠처체쳐초최쵀쵸추취췌츄츠치카캐캬커케켜코쾨쾌쿄쿠퀴퀘큐크키타태탸터테텨토퇴퇘툐투튀퉤튜트틔티파패퍄퍼페펴포푀표푸퓌퓨프피하해햐허헤혀호회홰효후휘훼휴흐희히"
const WIDTH = 140;
const HEIGHT = 24;


function getOneLetter() {
    const index = Math.floor(Math.random() * STRING_BANK.length);
    return STRING_BANK.charAt(index);
}

function genKoreanCaptcha() {
    let result = "";
    for(let i = 0; i < CAPTCHA_LENGTH; i++) {
        // 모든 한글 문자열을 바탕으로한 RECAPTCHA
        result += getOneLetter();
    }
    return result;
}

function checkCaptcha(src, dest) {
    return src === dest;
}

function gradientFilter(ctx) {
    let backgroundGradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
    const backgroundStartColor = "#000000";
    const backgroundEndColor = "#FFFFFF";
    backgroundGradient.addColorStop(0, backgroundStartColor);
    backgroundGradient.addColorStop(1, backgroundEndColor);

    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    let reverseBackgroundGradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
    reverseBackgroundGradient.addColorStop(0.5, backgroundEndColor);
    reverseBackgroundGradient.addColorStop(0.5, backgroundStartColor);
    return reverseBackgroundGradient
}

function loadCaptcha() {
    const captchaCode = genKoreanCaptcha();
    const $canvasText = document.querySelector(".captcha-text");
    const ctx = $canvasText.getContext('2d');
    // Size 정의
    $canvasText.width = WIDTH;
    $canvasText.height = HEIGHT;

    // 여러 filter를 Random하게 작성
    let reverseBackgroundGradient = gradientFilter(ctx);

    // 글자를 작성
    ctx.font = '16px Black Han Sans';
    ctx.fillStyle = reverseBackgroundGradient;
    ctx.fillText(captchaCode, 0, 20);
    return captchaCode;
}

window.onload = () => {
    const captchaCode = loadCaptcha();
    const $input = document.querySelector("input");
    $input.addEventListener('input', (e) => {
        if(checkCaptcha($input.value, captchaCode)) {
            console.log("GOOD!");
        }
    });

    const $btn = document.querySelector("button");
    $btn.addEventListener('click', (e) => {
        if(checkCaptcha($input.value, captchaCode)) {
            console.log("GOOD!");
        }
    });
}