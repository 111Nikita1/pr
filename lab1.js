// 1.1.A.1
console.log("href:", location.href);
console.log("файл:", location.pathname.split("/").pop());
console.log("язык:", navigator.language);
console.log("окно:", window.innerWidth, "×", window.innerHeight);
console.log("online:", navigator.onLine);

// 1.1.A.2
const userName = prompt("Как вас зовут?");
console.log("Привет,", userName === null ? "Аноним" : userName);

// 1.1.A.3
setTimeout(() => {
  location.hash = "my";
  setTimeout(() => { location.hash = "catalog"; }, 3000);
}, 3000);

// 1.1.B
let seconds = 0;
const stopwatchId = setInterval(() => {
  seconds++;
  console.log(`Вы на странице ${seconds} с`);
  if (seconds === 10) clearInterval(stopwatchId);
}, 1000);

// 1.2.A.1
const nav = document.querySelector("nav");
console.log("nav.childNodes:", nav.childNodes.length); // 7
console.log("nav.children:", nav.children.length);     // 3

// 1.2.A.2
// Разница: childNodes — все элементы, текстовые узлы, комментарии, включая переводы строк и отступы из HTML.
// children — только дочерние элементы (узлы с nodeType === 1).
// Поэтому из-за форматирования HTML childNodes всегда больше children.
const showCounts = (label, node) => {
  console.log(`${label}: childNodes = ${node.childNodes.length}, children = ${node.children.length}`);
};
showCounts("#my-list", document.getElementById("my-list")); // 5 / 2
showCounts("#my", document.getElementById("my"));           // 5 / 2
showCounts("main", document.querySelector("main"));         // 9 / 4

// 1.2.A.3
const myList = document.getElementById("my-list");
console.log("первый узел #my-list, nodeType:", myList.firstChild.nodeType);   // 3 — текст
console.log("последний узел #my-list, nodeType:", myList.lastChild.nodeType); // 3 — текст

// 1.2.B
function countNodes(node) {
  const result = {};
  (function walk(n) {
    result[n.nodeType] = (result[n.nodeType] || 0) + 1;
    for (const child of n.childNodes) walk(child);
  })(node);
  return result;
}
console.log("countNodes(document):", countNodes(document));

// 1.3.A.1
const table = document.getElementById("books");
const columns = Array.from(table.tHead.rows[0].cells).map(th => th.textContent.trim());
console.log("колонки:", columns);

// 1.3.A.2
console.log("автор 3-й книги:", table.tBodies[0].rows[2].cells[1].textContent);

// 1.3.A.3
for (const row of table.tBodies[0].rows) {
  console.log(`${row.cells[0].textContent} — ${row.cells[2].textContent}`);
}

// 1.3.A.4
console.log("последняя книга:", table.tBodies[0].lastElementChild.cells[0].textContent);

// 1.3.A.5
let row = table.tBodies[0].firstElementChild;
while (row) {
  console.log("data-id:", row.dataset.id);
  row = row.nextElementSibling;
}

// 1.3.B
let minRow = null;
for (const r of table.tBodies[0].rows) {
  const y = Number(r.cells[2].textContent);
  if (!minRow || y < Number(minRow.cells[2].textContent)) minRow = r;
}
console.log("самая старая книга:", `${minRow.cells[0].textContent} (${minRow.cells[2].textContent})`);

// 1.4.1
console.log("1)", [...document.querySelectorAll("#books tbody tr.book .title")].map(td => td.textContent.trim()));

// 1.4.2
console.log("2)", document.querySelectorAll('#books tbody tr.book[data-available="true"]').length);

// 1.4.3
console.log("3)", [...document.querySelectorAll('#books tbody tr.book[data-available="false"] .title')].map(td => td.textContent.trim()));

// 1.4.4
console.log("4)", [...document.querySelectorAll('#books tbody tr.book[data-genre="Фантастика"] .title')].map(td => td.textContent.trim()));

// 1.4.5
console.log("5)", [...document.querySelectorAll("#books tbody tr.book")].filter(tr => tr.querySelector(".author").textContent.includes("Булгаков")).map(tr => tr.querySelector(".title").textContent.trim()));

// 1.4.6
console.log("6)", document.querySelector("#books tbody tr:last-child"));

// 1.4.7
console.log("7)", [...document.querySelectorAll("#books tbody tr:nth-child(even)")].map(tr => tr.querySelector(".title").textContent.trim()));

// 1.4.8
console.log("8)", [...document.querySelectorAll("th[data-sort]")].map(th => th.textContent.trim()));

// 1.4.9
console.log("9)", [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute("href")));

// 1.4.10
console.log("10)", [...document.querySelectorAll("#add-form [required]")].map(el => el.name));

// 1.4.B
function titlesByGenre(genre) {
  return [...document.querySelectorAll(`#books tbody tr.book[data-genre="${genre}"] .title`)].map(td => td.textContent.trim());
}
["Роман", "Фантастика", "Повесть"].forEach(g => console.log(g, "→", titlesByGenre(g)));

// 1.5.A — способ 1
document.querySelector("#books tbody").innerHTML = "";
console.log('после innerHTML="":', document.getElementsByClassName("book").length);

// 1.5.A — способ 2
// const tbody = document.querySelector("#books tbody");
// while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
// console.log("после removeChild:", document.getElementsByClassName("book").length);