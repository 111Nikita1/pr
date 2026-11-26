// 3.4
const library = new Library({ books, users, loans });

// 3.5
library.currentUser = users[0];

const state = {
  query: "",
  genre: "",
  sortKey: "",
  sortDir: 1
};

function createRow(book) {
  const tr = document.createElement("tr");
  tr.className = "book";
  tr.dataset.id = book.id;
  tr.dataset.genre = book.genre;
  tr.dataset.available = book.available;

  tr.innerHTML = `
    <td class="title"></td>
    <td class="author"></td>
    <td class="year"></td>
    <td class="genre"></td>
    <td class="rating">${book.rating}</td>
    <td><button class="take" type="button">Взять</button></td>
  `;

  tr.querySelector(".title").textContent = book.title;
  tr.querySelector(".author").textContent = book.author;
  tr.querySelector(".year").textContent = book.year;
  tr.querySelector(".genre").textContent = book.genre;

  const btn = tr.querySelector(".take");
  btn.disabled = !book.available;
  if (!book.available) btn.textContent = "Выдана";

  // 3.5
  btn.addEventListener("click", () => take(book.id));

  return tr;
}

function renderCatalog(list) {
  const tbody = document.querySelector("#books tbody");
  tbody.replaceChildren(...list.map(createRow));
}

function refresh() {
  renderCatalog(library.find(state));
}

// 3.5
function take(bookId) {
  try {
    library.takeBook(bookId);
    refresh();
    renderMyBooks();
  } catch (e) {
    alert(e.message);
  }
}

// 3.5
function renderMyBooks() {
  if (!library.currentUser) return;
  const myList = document.getElementById("my-list");
  const activeLoans = library.getActiveLoans(library.currentUser.id);

  const items = activeLoans.map(loan => {
    const book = library.books.find(b => b.id === loan.bookId);
    const li = document.createElement("li");
    li.textContent = `${book.title} — взята ${loan.takenAt}`;
    return li;
  });

  myList.replaceChildren(...items);
}

// 3.4

document.getElementById("search-form").addEventListener("submit", e => e.preventDefault());

document.querySelector('input[name="q"]').addEventListener("input", e => {
  state.query = e.target.value;
  refresh();
});

document.querySelector('select[name="genre"]').addEventListener("change", e => {
  state.genre = e.target.value;
  refresh();
});

document.querySelectorAll("th[data-sort]").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.sort;
    if (state.sortKey === key) {
      state.sortDir *= -1;
    } else {
      state.sortKey = key;
      state.sortDir = 1; 
    }
    refresh();
  });
});

refresh();
renderMyBooks();
