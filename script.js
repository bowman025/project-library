const container = document.querySelector(".container");
const myLibrary = [];

function Book(title, author, year, pages, read) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages + " pages";
    this.read = read;
    this.id = self.crypto.randomUUID();
};

function addBookToLibrary(title, author, year, pages, read) {
    const book = new Book(title, author, year, pages, read);
    myLibrary.push(book);
};

function displayBooks() {
    for(i = 0; i < myLibrary.length; i++) {
        const card = document.createElement("div");
        card.classList.add("books");
        container.appendChild(card);
        const header = document.createElement("h2");
        card.appendChild(header);
        const paragraph = document.createElement("p");
        card.appendChild(paragraph);
        const readingStatus = document.createElement("p");
        readingStatus.classList.add("readingStatus");
        card.appendChild(readingStatus);
        header.textContent = myLibrary[i].title + " | " + myLibrary[i].author;
        paragraph.textContent = myLibrary[i].year  + " | " + myLibrary[i].pages;
        readingStatus.textContent = myLibrary[i].read;
    };
};

addBookToLibrary("The Hobbit", "JRR Tolkien", 1957, 310, "not read");
addBookToLibrary("Hyperion", "Dan Simmons", 1989, 482, "read");
addBookToLibrary("The Blade Itself", "Joe Abercrombie", 2006, 529, "read");
addBookToLibrary("Bullshit Jobs", "David Graeber", 2011, 368, "currently reading");

displayBooks();