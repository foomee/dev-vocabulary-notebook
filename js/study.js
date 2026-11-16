// HTML要素を取得
const wordCard = document.getElementById("word-card");
const studyWord = document.getElementById("study-word");
const studyDescription = document.getElementById("study-description");
const cardAction = document.getElementById("card-action");
const studyProgress = document.getElementById("study-progress");
// 学習完了！用
const studyComplete = document.getElementById("study-complete");
// ★ボタン用
const favoriteButton = document.getElementById("favorite-button");
// マークボタン用
const mark1Button = document.getElementById("mark1-button");
const mark2Button = document.getElementById("mark2-button");
const mark3Button = document.getElementById("mark3-button");
// wordStatusesを読み込んでおく
const wordStatuses = loadWordStatuses();

// URLパラメータから学習対象のタグを取得
const params = new URLSearchParams(window.location.search);
const selectedTag = params.get("tag");

// 学習する単語を取得
const studyWords = words.filter(function(item) {
    return item.tags.includes(selectedTag);
});

// 現在の単語の位置
let currentIndex = 0;

// 説明を表示しているかどうか
let isDescriptionVisible = false;

// 学習完了状態を管理する変数
let isStudyComplete = false;

// 最初の単語を表示
function showWord() {
    const currentWord = studyWords[currentIndex];

    studyWord.textContent = currentWord.word;
    studyDescription.textContent = currentWord.description;

    studyDescription.hidden = true;
    cardAction.textContent = "説明を見る ↓";

    studyProgress.textContent = `${currentIndex + 1} / ${studyWords.length}`;

    isDescriptionVisible = false;

    studyComplete.hidden = true;
    studyWord.hidden = false;
    cardAction.hidden = false;

    // お気に入り状態を反映
    const isFavorite = wordStatuses[currentWord.id].favorite;
    // マーク状態を反映
    mark1Button.classList.toggle("active", wordStatuses[currentWord.id].mark1);
    mark2Button.classList.toggle("active", wordStatuses[currentWord.id].mark2);
    mark3Button.classList.toggle("active", wordStatuses[currentWord.id].mark3);

    favoriteButton.textContent = isFavorite ? "★ お気に入り" : "☆ お気に入り";
}

// カードをクリックしたときの処理
wordCard.addEventListener("click", function() {
    // 学習完了後ならトップページへ戻る
    if (isStudyComplete) {
        window.location.href = "index.html";
        return;
    }    

    // 説明が表示されていない場合
    if (!isDescriptionVisible) {
        studyDescription.hidden = false;
        cardAction.textContent = "次の単語へ →";

        isDescriptionVisible = true;

    // 説明が表示されている場合
    } else {
        currentIndex++;

        if (currentIndex < studyWords.length) {
            showWord();
        } else {
            showComplete();
        }
    }
});


// お気に入りボタンをクリックしたときの処理
favoriteButton.addEventListener("click", function() {

    // 現在の単語IDを取得
    const currentWord = studyWords[currentIndex];

    // お気に入り状態を反転
    wordStatuses[currentWord.id].favorite = !wordStatuses[currentWord.id].favorite;

    // ボタンの表示を更新
    favoriteButton.textContent = wordStatuses[currentWord.id].favorite
        ? "★ お気に入り"
        : "☆ お気に入り";

    // localStorageに保存
    saveWordStatuses(wordStatuses);
});


// マークボタンのクリック処理
function toggleMark(button, mark) {

    button.addEventListener("click", function() {

        // 現在の単語IDを取得
        const currentWord = studyWords[currentIndex];

        // マーク状態を反転
        wordStatuses[currentWord.id][mark] = !wordStatuses[currentWord.id][mark];

        // 表示を更新
        button.classList.toggle("active", wordStatuses[currentWord.id][mark]);

        // localStorageに保存
        saveWordStatuses(wordStatuses);
    });
}

// 各マークのイベントを設定
toggleMark(mark1Button, "mark1");
toggleMark(mark2Button, "mark2");
toggleMark(mark3Button, "mark3");


// 初期表示
if (studyWords.length > 0) {
    showWord();
} else {
    studyWord.textContent = "学習する単語がありません";
    studyDescription.hidden = true;
    cardAction.hidden = true;
    studyComplete.hidden = true;
    studyProgress.textContent = "";
    wordCard.disabled = true;
    favoriteButton.hidden = true;
}


// 学習完了時の表示
function showComplete() {
    isStudyComplete = true;

    studyWord.hidden = true;
    studyDescription.hidden = true;
    cardAction.hidden = true;

    studyComplete.hidden = false;
    studyProgress.textContent = "学習完了！";
}