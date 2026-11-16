// 見出しをURLからタグ名を取得して表示する
const params = new URLSearchParams(window.location.search);
const selectedTag = params.get("tag");

const dashboardTag = document.getElementById("dashboard-tag");

dashboardTag.textContent = selectedTag;