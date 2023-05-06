const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

//新しい配列を用意する
let checkTexts=[];

// 複数のテキストを格納する配列
const textLists = [
    'yutohitorinerai',
    'yudaidogezasuru',
    'kaatyannniiusi',
    'hi-ta-',
    'yame-i',
    'u-ni-',
    'orenozaihoukahosikeryakureteyaru',
    'jasuthisu',
    'unti',
    'daisuki'

]; 
// ランダムなテキストを画面に表示する
const createText = () => {
const p = document.getElementById('text');

const rnd = Math.floor(Math.random()*textLists.length);

p.textContent='';

  // 画面に表示するテキスト情報をcheckTexts配列に格納する
    checkTexts = textLists[rnd].split('').map(value => {
    
    //span要素を生成する
    const span = document.createElement('span');

    //span要素に一文字ずつ当てはめる
    span.textContent = value;

    //span要素をp要素に追加していく
    p.appendChild(span);
    //一文字ずつcheckTextに格納していく
    return span;
    })
};

let score=0;
 // キーイベント＆入力判定処理
const keyDown = e => { 
    if(e.key === checkTexts[0].textContent) {
    // add-colorクラスを付与する
    checkTexts[0].className = 'add-color';

// 配列から1文字を削除する
    checkTexts.shift();

//正しい入力の時だけスコアを加算する
score++;

    //最後まで入力したら新しいテキストを用意する
    if(!checkTexts.length)createText();
  // Shiftキーを押した時は色が変わらない
} else if(e.key === 'Shift') {
wrap.style.backgroundColor = '#666';

// タイプミスした時だけ背景色を赤色に変える
} 
};
//console.log(checkTexts);


const rankCheck = score => {
let text = '';

// スコアに応じて異なるメッセージを変数textに格納する
if(score < 100) {
    text = `あなたのランクはウソップです。\nBランクまであと${100 - score}文字です。`;
} else if(score < 200) {
    text = `あなたのランクはボアハンコックです。\nAランクまであと${200 - score}文字です。`;    
} else if(score < 300) {
    text = `あなたのランクはなはらだいちです。\nSランクまであと${300 - score}文字です。`;    
} else if(score >= 300) {
    text = `あなたのランクは中西みのるです。\nおめでとうございます！`;    
}

// 生成したメッセージと一緒に文字列を返す
return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;
return `${score}文字打てました！`;
};

// ゲームの終了処理
const gameOver = id => {
    clearInterval(id);

 // スコアの値をrankCheck()に渡してダイアログで結果を表示する
const result = confirm(rankCheck(score));
if(result) window.location.reload();

}; 

const timer = () => {
    let time = 60;
    //タイマー要素を取得する
    const count =document.getElementById('count');
    const id = setInterval(() => {

        //順番逆だとダメなんですか？
    if(time <= 0)
    gameOver(id);
    count.textContent=time--;
    },1000);
}; // タイマー処理

// ゲームスタート時の処理
start.addEventListener('click', () => {
    createText();
    timer();

//これをCSSで書くにはどうすればいいのか？
start.style.display = 'none';


//キーボードの入力処理
document.addEventListener('keydown',keyDown);
});