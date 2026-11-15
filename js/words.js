// 単語一覧の要素を取得
const wordList = document.getElementById("word-list");

// 単語をクリックしたときの処理
wordList.addEventListener("click", function(event) {

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