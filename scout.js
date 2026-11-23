// 1.6.1
function getBookRows() {
  return [...document.querySelectorAll("tr.book")];
}

// 1.6.2
function getRowByBookId(id) {
  return document.querySelector(`tr.book[data-id="${id}"]`);
}

// 1.6.3
function getAvailableTitles() {
  return getBookRows()
    .filter(tr => tr.dataset.available === "true")
    .map(tr => tr.querySelector(".title").textContent.trim());
}

// 1.6.4
function findByAuthor(text) {
  const needle = String(text).toLowerCase();
  return getBookRows()
    .filter(tr => tr.querySelector(".author").textContent.toLowerCase().includes(needle))
    .map(tr => tr.querySelector(".title").textContent.trim());
}

// 1.6.5
function getRowFromButton(btn) {
  return btn.closest("tr.book");
}

// 1.6.6
function readBooks() {
  return getBookRows().map(tr => ({
    id: Number(tr.dataset.id),
    title: tr.querySelector(".title").textContent.trim(),
    author: tr.querySelector(".author").textContent.trim(),
    year: Number(tr.querySelector(".year").textContent),
    genre: tr.dataset.genre,
    available: tr.dataset.available === "true",
    rating: Number(tr.querySelector(".rating").textContent)
  }));
}

// 1.6.B
function getMyBookIds() {
  return [...document.querySelectorAll("#my-list li[data-book-id]")]
    .map(li => Number(li.dataset.bookId));
}