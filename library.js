// 3.3 3.5
class Library {
  constructor({ books, users, loans }) {
    this.books = books;
    this.users = users;
    this.loans = loans;
    this.currentUser = null;
  }

  // 3.3
  find({ query = "", genre = "", sortKey = "", sortDir = 1 } = {}) {
    // 1.
    let result = this.books.filter(book => {
      const text = query.toLowerCase();
      const matchQuery = book.title.toLowerCase().includes(text) || book.author.toLowerCase().includes(text);
      const matchGenre = genre === "" || book.genre === genre;
      return matchQuery && matchGenre;
    });

    // 2.
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (typeof valA === "string") {
          return valA.localeCompare(valB, "ru") * sortDir;
        } else {
          return (valA - valB) * sortDir;
        }
      });
    }

    return result;
  }

  // 3.5
  takeBook(bookId) {
    if (!this.currentUser) {
      throw new Error("Войдите, чтобы взять книгу");
    }
    const book = this.books.find(b => b.id === bookId);
    if (!book) {
      throw new Error("Книга не найдена");
    }
    if (!book.available) {
      throw new Error("Книга уже выдана");
    }

    const maxId = this.loans.length > 0 ? Math.max(...this.loans.map(l => l.id)) : 0;
    const today = new Date().toISOString().slice(0, 10);

    this.loans.push({
      id: maxId + 1,
      userId: this.currentUser.id,
      bookId: bookId,
      takenAt: today,
      returnedAt: null,
      rating: null
    });

    book.available = false;
  }

  getActiveLoans(userId) {
    return this.loans.filter(loan => loan.userId === userId && loan.returnedAt === null);
  }
}
