// 見出しをURLからタグ名を取得して表示する
const params = new URLSearchParams(window.location.search);
const selectedTag = params.get("tag");

// タグ名を表示
const dashboardTag = document.getElementById("dashboard-tag");
dashboardTag.textContent = selectedTag;


// 学習開始ボタンのリンク先を設定
const startButton = document.getElementById("start-button");
startButton.href = `study.html?tag=${encodeURIComponent(selectedTag)}`;