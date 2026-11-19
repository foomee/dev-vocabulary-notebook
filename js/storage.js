// 保存データの読み込み
function loadWordStatuses() {
    const savedData = localStorage.getItem("wordStatuses");

    if (savedData === null) {
        return createInitialStatuses();
    }

    return JSON.parse(savedData);
}

// 保存データの書き込み
function saveWordStatuses(statuses) {
    localStorage.setItem("wordStatuses", JSON.stringify(statuses));
}

// 初期データを定義する関数
function createInitialStatuses() {
    const statuses = {};

    words.forEach(function(item) {
        statuses[item.id] = {
            favorite: false,
            mark1: false,
            mark2: false,
            mark3: false,
            learned: false,
            correct: null
        };
    });

    return statuses;
}


// ステータスが存在しない単語に初期ステータスを設定
function initializeWordStatuses(allWords, wordStatuses) {
    allWords.forEach(function(item) {
        if (!wordStatuses[item.id]) {
            wordStatuses[item.id] = {
                favorite: false,
                mark1: false,
                mark2: false,
                mark3: false,
                learned: false,
                correct: null
            };
        }
    });

    saveWordStatuses(wordStatuses);
}


// ユーザーが追加した単語を読み込む
function loadCustomWords() {
    const savedData = localStorage.getItem("customWords");

    if (savedData === null) {
        return [];
    }

    return JSON.parse(savedData);
}

// ユーザーが追加した単語を保存する
function saveCustomWords(customWords) {
    localStorage.setItem("customWords", JSON.stringify(customWords));
}