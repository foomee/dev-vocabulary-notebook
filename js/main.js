const toggleForm = document.getElementById("toggle-form");
const addCardForm = document.getElementById("add-card-form");

toggleForm.addEventListener("click", function () {
    addCardForm.hidden = !addCardForm.hidden;
});