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


// ユーザー登録単語のIDを移行する
function migrateCustomWordIds() {
    // 移行済みなら終了
    if (localStorage.getItem("customWordsMigrated") === "true") {
        return;
    }

    // 保存されているデータを読み込む
    const customWords = loadCustomWords();
    const wordStatuses = loadWordStatuses();

    // ユーザー登録単語のIDを変更
    customWords.forEach(function(item) {
        const oldId = item.id;
        const newId = oldId + 1000000;

        // 単語のIDを変更
        item.id = newId;

        // ステータスを新しいIDに移す
        if (wordStatuses[oldId]) {
            wordStatuses[newId] = wordStatuses[oldId];
            delete wordStatuses[oldId];
        }
    });

    // 変更したデータを保存
    saveCustomWords(customWords);
    saveWordStatuses(wordStatuses);

    // 移行済みとして記録
    localStorage.setItem("customWordsMigrated", "true");
}