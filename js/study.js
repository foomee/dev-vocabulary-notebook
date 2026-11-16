// HTML要素を取得
const wordCard = document.getElementById("word-card");
const studyWord = document.getElementById("study-word");
const studyDescription = document.getElementById("study-description");
const cardAction = document.getElementById("card-action");
const studyProgress = document.getElementById("study-progress");
// 学習完了！用
const studyComplete = document.getElementById("study-complete");

// 学習する単語を取得
const studyWords = words.filter(function(item) {
    return item.tags.includes("HTML");
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

// 初期表示
showWord();


// 学習完了時の表示
function showComplete() {
    isStudyComplete = true;

    studyWord.hidden = true;
    studyDescription.hidden = true;
    cardAction.hidden = true;

    studyComplete.hidden = false;
    studyProgress.textContent = "学習完了！";
}