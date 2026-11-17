// 単語のステータスを読み込む
const wordStatuses = loadWordStatuses();

// 単語一覧の要素を取得
const wordList = document.getElementById("word-list");

// 単語一覧を生成
for (let i = 0; i < words.length; i++) {

    // 行を作成
    const wordRow = document.createElement("tr");

    // 単語を表示するセルを作成
    const wordCell = document.createElement("th");
    wordCell.scope = "row";
    wordCell.textContent = words[i].word;

    // タグを表示するセルを作成
    const tagCell = document.createElement("td");
    tagCell.textContent = words[i].tags.join(", ");

    // 行に追加
    wordRow.appendChild(wordCell);
    wordRow.appendChild(tagCell);

    // お気に入りボタンを作成
    const favoriteCell = document.createElement("td");
    const favoriteButton = document.createElement("button");

    favoriteButton.type = "button";
    favoriteButton.classList.add("favorite-button");
    favoriteButton.dataset.wordId = words[i].id;

    // お気に入り状態によって表示を変更
    favoriteButton.textContent = wordStatuses[words[i].id].favorite ? "★" : "☆";

    favoriteCell.appendChild(favoriteButton);
    wordRow.appendChild(favoriteCell);

    // マークボタンを3つ作成
    const marks = ["mark1", "mark2", "mark3"];
    const markIcons = ["🔵", "🟡", "🔴"];

    for (let j = 0; j < marks.length; j++) {

        const markCell = document.createElement("td");
        const markButton = document.createElement("button");

        markButton.type = "button";
        markButton.classList.add("mark-button");

        // 単語IDとマーク名を保存
        markButton.dataset.wordId = words[i].id;
        markButton.dataset.mark = marks[j];

        // 登録状態を反映
        markButton.classList.toggle(
            "active",
            wordStatuses[words[i].id][marks[j]]
        );

        markButton.textContent = markIcons[j];

        markCell.appendChild(markButton);
        wordRow.appendChild(markCell);
    }

    // テーブルに追加
    wordList.appendChild(wordRow);
}


// 単語をクリックしたときの処理
wordList.addEventListener("click", function(event) {

    // お気に入りボタンがクリックされた場合
    const favoriteButton = event.target.closest(".favorite-button");

    if (favoriteButton) {
        // 単語IDを取得
        const wordId = favoriteButton.dataset.wordId;

        // お気に入り状態を反転
        wordStatuses[wordId].favorite = !wordStatuses[wordId].favorite;

        // ボタンの表示を更新
        favoriteButton.textContent = wordStatuses[wordId].favorite ? "★" : "☆";
        favoriteButton.classList.toggle("active", wordStatuses[wordId].favorite);

        // localStorageに保存
        saveWordStatuses(wordStatuses);

        return;
    }

    // マークボタンがクリックされた場合
    const markButton = event.target.closest(".mark-button");

    if (markButton) {

        // 単語IDとマーク名を取得
        const wordId = markButton.dataset.wordId;
        const mark = markButton.dataset.mark;

        // マーク状態を反転
        wordStatuses[wordId][mark] = !wordStatuses[wordId][mark];

        // 表示を更新
        markButton.classList.toggle("active", wordStatuses[wordId][mark]);

        // localStorageに保存
        saveWordStatuses(wordStatuses);

        return;
    }


    // クリックされた行を取得
    const clickedRow = event.target.closest("tr");

    // 行以外、または説明行がクリックされた場合は終了
    if (!clickedRow || clickedRow.classList.contains("description-row")) {
        return;
    }

    // クリックされた単語を取得
    const word = clickedRow.querySelector("th").textContent;

    // すでに説明行が存在するか確認
    const nextRow = clickedRow.nextElementSibling;

    if (nextRow && nextRow.classList.contains("description-row")) {
        nextRow.remove();
        return;
    }

    // 説明データを探す
    const selectedWord = words.find(function(item) {
        return item.word === word;
    });

    if (!selectedWord) {
        return;
    }

    // 説明を表示する行を作成
    const descriptionRow = document.createElement("tr");
    descriptionRow.classList.add("description-row");

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = selectedWord.description;
    descriptionCell.colSpan = 6;

    descriptionRow.appendChild(descriptionCell);

    // クリックされた行の直後に追加
    clickedRow.after(descriptionRow);
});