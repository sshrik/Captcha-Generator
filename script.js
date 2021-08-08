const CAPTCHA_LENGTH = 8;
const STRING_BANK = "가개갸거게겨고괴괘교구귀궤규그긔기나내냐너네녀노뇌놰뇨누뉘눼뉴느늬니다대댜더데뎌도되돼됴두뒤뒈류드듸디라래랴러레려로뢰뢔료루뤼뤠류르리마매먀머메며모뫼뫠묘무뮈뭬뮤므믜미바배뱌버베벼보뵈봬뵤부뷔붸뷰브븨비사새샤서세셔소쇠쇄쇼수쉬쉐슈브븨비아애야어에여오외왜요우위웨유으의이자재쟈저제져조죄좨죠주쥐줴쥬즈즤지차채챠처체쳐초최쵀쵸추취췌츄츠치카캐캬커케켜코쾨쾌쿄쿠퀴퀘큐크키타태탸터테텨토퇴퇘툐투튀퉤튜트틔티파패퍄퍼페펴포푀표푸퓌퓨프피하해햐허헤혀호회홰효후휘훼휴흐희히"
const WIDTH = 200;
const HEIGHT = 36;

function getRandomColor() {
    const color = {
        r: Math.floor(Math.random() * 255), 
        g: Math.floor(Math.random() * 255), 
        b: Math.floor(Math.random() * 255)
    };
    return color;
}

function colorToString(color) {
    return `
    #${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}

function getReverseColor(color) {
    const rColor = {
        r: 255 - color.r,
        g: 255 - color.g,
        b: 255 - color.b,
    }
    return rColor;
}

function getOneLetter() {
    const index = Math.floor(Math.random() * STRING_BANK.length);
    return STRING_BANK.charAt(index);
}

function genRandomFontSize(fontType="Black Han Sans") {
    const randomSize = [16, 18, 20, 22, 24];
    const index = Math.floor(Math.random() * randomSize.length);
    return {
        fontStyle: `${randomSize[index]}px ${fontType}`,
        fontSize: randomSize[index],
    };
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

function gradientFilter(ctx, colorBreakLocation) {
    let backgroundGradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
    const baseColor = getRandomColor();
    const backgroundStartColor = colorToString(baseColor);
    const backgroundEndColor = colorToString(getReverseColor(baseColor));
    backgroundGradient.addColorStop(0, backgroundStartColor);
    backgroundGradient.addColorStop(1, backgroundEndColor);

    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    let reverseBackgroundGradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
    reverseBackgroundGradient.addColorStop(colorBreakLocation, backgroundEndColor);
    reverseBackgroundGradient.addColorStop(colorBreakLocation, backgroundStartColor);
    return reverseBackgroundGradient
}

function loadCaptcha() {
    const captchaCode = genKoreanCaptcha();
    const $canvasText = document.querySelector(".captcha-text");
    const ctx = $canvasText.getContext('2d');
    // Size 정의
    $canvasText.width = WIDTH;
    $canvasText.height = HEIGHT;

    const fontStyleList = [];
    let total = 0;
    let colorBreakLocation = 0;
    // 글자와 글자 스타일을 작성
    for(let i = 0; i < CAPTCHA_LENGTH; i++) {
        const tempStyle = genRandomFontSize();
        fontStyleList.push(tempStyle);
        total += tempStyle.fontSize;
        if(i < CAPTCHA_LENGTH / 2) {
            colorBreakLocation += tempStyle.fontSize;
        }
    }
    let before = Math.floor((WIDTH - total) / 2);
    colorBreakLocation += before;
    
    // 여러 filter를 Random하게 작성 - 글자 중간부터 색을 변경한다.
    let reverseBackgroundGradient = gradientFilter(ctx, colorBreakLocation/WIDTH);

    ctx.fillStyle = reverseBackgroundGradient;


    for(let i = 0; i < CAPTCHA_LENGTH; i++) {
        const { fontStyle, fontSize } = fontStyleList[i];
        ctx.font = fontStyle;
        ctx.fillText(captchaCode.charAt(i), before, 28);
        before += fontSize;
    }
    return captchaCode;
}

window.onload = () => {
    let captchaCode = loadCaptcha();
    const $input = document.querySelector("input");
    $input.addEventListener('input', (e) => {
        if(checkCaptcha($input.value, captchaCode)) {
            console.log("GOOD!");
        }
    });

    const $btn = document.querySelector(".acceptor");
    $btn.addEventListener('click', (e) => {
        if(checkCaptcha($input.value, captchaCode)) {
            console.log("GOOD!");
        }
    });

    const $regen = document.querySelector(".regen");
    $regen.addEventListener('click', (e) => {
        captchaCode = loadCaptcha();
    });

}