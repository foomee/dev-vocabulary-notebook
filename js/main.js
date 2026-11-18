// 単語のデータを読み込む
const wordStatuses = loadWordStatuses();
const customWords = loadCustomWords();
const allWords = [...words, ...customWords];

// タグ一覧を取得
const tags = [...new Set(words.flatMap(function(item) {
    return item.tags;
}))];

// タグ一覧の要素を取得
const tagList = document.getElementById("tag-list");

// タグ入力フォーム用
const selectedTagList = document.getElementById("selected-tag-list");

// タグ一覧を生成
tags.forEach(function(tag) {
    const row = document.createElement("tr");

    // タグに該当する学習済の単語数を取得
    const learnedCount = words.filter(function(item) {
        return item.tags.includes(tag) && wordStatuses[item.id].learned;
    }).length;

    // タグに該当するお気に入りの単語数を取得
    const favoriteCount = words.filter(function(item) {
        return item.tags.includes(tag) && wordStatuses[item.id].favorite;
    }).length;

    // タグに該当するmark1の単語数を取得
    const mark1Count = words.filter(function(item) {
        return item.tags.includes(tag) && wordStatuses[item.id].mark1;
    }).length;

    // タグに該当するmark2の単語数を取得
    const mark2Count = words.filter(function(item) {
        return item.tags.includes(tag) && wordStatuses[item.id].mark2;
    }).length;

    // タグに該当するmark3の単語数を取得
    const mark3Count = words.filter(function(item) {
        return item.tags.includes(tag) && wordStatuses[item.id].mark3;
    }).length;


    const tagCell = document.createElement("th");
    tagCell.scope = "row";

    const tagLink = document.createElement("a");
    tagLink.href = `dashboard.html?tag=${encodeURIComponent(tag)}`;
    tagLink.textContent = tag;

    tagCell.appendChild(tagLink);
    row.appendChild(tagCell);

    // 学習済の数を表示
    const learnedCell = document.createElement("td");
    learnedCell.textContent = learnedCount;
    row.appendChild(learnedCell);

    // お気に入りの数を表示
    const favoriteCell = document.createElement("td");
    favoriteCell.textContent = favoriteCount;
    row.appendChild(favoriteCell);

    // mark1の数を表示
    const mark1Cell = document.createElement("td");
    mark1Cell.textContent = mark1Count;
    row.appendChild(mark1Cell);

    // mark2の数を表示
    const mark2Cell = document.createElement("td");
    mark2Cell.textContent = mark2Count;
    row.appendChild(mark2Cell);

    // mark3の数を表示
    const mark3Cell = document.createElement("td");
    mark3Cell.textContent = mark3Count;
    row.appendChild(mark3Cell);


    tagList.appendChild(row);

    // 確認用
    console.log(tag, learnedCount);
});


// 「カードを追加」ボタンを押したときの処理
const toggleForm = document.getElementById("toggle-form");
const addCardForm = document.getElementById("add-card-form");

toggleForm.addEventListener("click", function () {
    addCardForm.hidden = !addCardForm.hidden;
});


// タグを保存する処理
// 指定したIDがある要素を取得して、タグを保存する配列を用意する
const tagInput = document.getElementById("tag-input");

let selectedTags = []; // 現在登録されているタグを管理する配列

// タグを入力するフォーム内で、enterでタグを追加する処理
tagInput.addEventListener("keydown", function(event) {
    // Enterが押されたか確認
    if (event.key === "Enter") {
        // Enterによるフォーム送信を防ぐ
        event.preventDefault();

        // 入力欄の文字列を取得して、前後の空白を取り除く
        const tag = tagInput.value.trim();

        // もし何も入力されなかったらタグは無し
        if (tag === "") {
            return;
        }

        // 	配列に同じタグがあるか確認
        if (selectedTags.includes(tag)) {
            return;
        }

        // 配列の末尾にタグを追加
        selectedTags.push(tag);

        console.log(selectedTags);

        displayTags();

        // 入力欄を空にする
        tagInput.value = "";
    }
});


//既存のタグを画面に表示するための関数
function displayTags() {
    selectedTagList.innerHTML = "";

    for (let i = 0; i < selectedTags.length; i++) {
        const tagItem = document.createElement("span");
        tagItem.classList.add("tag-item");

        const tagName = document.createElement("span");
        tagName.textContent = selectedTags[i];

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.type = "button";

        // ×を押したとき
        deleteButton.addEventListener("click", function() {
            selectedTags.splice(i, 1);
            displayTags();
        });

        tagItem.append(tagName, deleteButton);
        selectedTagList.appendChild(tagItem);
    }
}


// フォーム要素を取得
const wordInput = document.getElementById("word");
const descriptionInput = document.getElementById("description");

// フォーム送信イベント
addCardForm.addEventListener("submit", function(event) {
    // フォームの標準送信を防ぐ
    event.preventDefault();

    // 入力内容を取得
    const word = wordInput.value.trim();
    const description = descriptionInput.value.trim();

    // 入力チェック
    if (word === "" || description === "" || selectedTags.length === 0) {
        alert("単語・説明・タグを入力してください");
        return;
    }

    // 最大IDから新しいIDを作る
    const maxId = Math.max(0, ...allWords.map(function(item) {
        return item.id;
    }));

    const newId = maxId + 1;

    // 重複防止
    const isDuplicate = allWords.some(function(item) {
        return item.word === word;
    });

    if (isDuplicate) {
        alert("この単語はすでに登録されています");
        return;
    }

    // 新しい単語を作成
    const newWord = {
        id: newId,
        word: word,
        description: description,
        tags: [...selectedTags]
    };

    // 追加した単語に初期ステータスを設定
    wordStatuses[newId] = {
        favorite: false,
        mark1: false,
        mark2: false,
        mark3: false,
        learned: false,
        correct: null
    };

    customWords.push(newWord);
    saveCustomWords(customWords);

    allWords.push(newWord);

    saveWordStatuses(wordStatuses);

    showToast();

    console.log(newWord);
});


// 追加しました！アニメーション関係
const toast = document.getElementById("toast");

let toastTimer;

function showToast() {
    toast.classList.add("show");

    // 既存のタイマーを解除
    clearTimeout(toastTimer);

    toastTimer = setTimeout(function() {
        toast.classList.remove("show");
    }, 2000);
}


// 行をクリックしたときの処理
tagList.addEventListener("click", function(event) {
    const clickedRow = event.target.closest("tr");

    if (!clickedRow) {
        return;
    }

    const link = clickedRow.querySelector("a");

    if (link) {
        window.location.href = link.href;
    }
});