// 見出しをURLからタグ名を取得して表示する
const params = new URLSearchParams(window.location.search);
const selectedTag = params.get("tag");

// タグ名を表示
const dashboardTag = document.getElementById("dashboard-tag");
dashboardTag.textContent = selectedTag;


// 学習状況のデータを読み込む
const wordStatuses = loadWordStatuses();
const customWords = loadCustomWords();

const allWords = [...words, ...customWords];

// storage.jsに書いた共通関数
initializeWordStatuses(allWords, wordStatuses);

// タグに該当するそれぞれの単語数を取得
// 学習済み単語数
const learnedCount = allWords.filter(function(item) {
    return item.tags.includes(selectedTag) && wordStatuses[item.id].learned;
}).length;

// 正解数
const correctCount = allWords.filter(function(item) {
    return item.tags.includes(selectedTag) && wordStatuses[item.id].correct === true;
}).length;

// 不正解数
const incorrectCount = allWords.filter(function(item) {
    return item.tags.includes(selectedTag) && wordStatuses[item.id].correct === false;
}).length;

// お気に入り数
const favoriteCount = allWords.filter(function(item) {
    return item.tags.includes(selectedTag) && wordStatuses[item.id].favorite;
}).length;

// mark1の数
const mark1Count = allWords.filter(function(item) {
    return item.tags.includes(selectedTag) && wordStatuses[item.id].mark1;
}).length;

// mark2の数
const mark2Count = allWords.filter(function(item) {
    return item.tags.includes(selectedTag) && wordStatuses[item.id].mark2;
}).length;

// mark3の数
const mark3Count = allWords.filter(function(item) {
    return item.tags.includes(selectedTag) && wordStatuses[item.id].mark3;
}).length;

// 学習済の数を表示
document.getElementById("learned-count").textContent = learnedCount;
document.getElementById("correct-count").textContent = correctCount;
document.getElementById("incorrect-count").textContent = incorrectCount;
document.getElementById("favoriteCount").textContent = favoriteCount;
document.getElementById("mark1Count").textContent = mark1Count;
document.getElementById("mark2Count").textContent = mark2Count;
document.getElementById("mark3Count").textContent = mark3Count;


// 学習開始ボタンのリンク先を設定
const startButton = document.getElementById("start-button");
startButton.href = `study.html?tag=${encodeURIComponent(selectedTag)}`;