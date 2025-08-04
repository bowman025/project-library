const container = document.querySelector(".container");
const newBookButton = document.querySelector(".newbook-button");
const newBookDialog = document.querySelector(".newbook-dialog");
const newBookSubmit = document.querySelector(".newbook-submit");
const newBookForm = document.querySelector(".newbook-form");
const readStatus = document.createElement("button");
const removeBook = document.createElement("button");
const myLibrary = [];

function Book(title, author, year, pages, read) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages + " pages";
    this.read = read.charAt(0).toUpperCase() + read.slice(1);
    this.id = self.crypto.randomUUID();
};

Book.prototype.toggleRead = function() {
    if(this.read === "Read") {
        this.read = "Not read";
    } else this.read = "Read";
};

function addBookToLibrary(title, author, year, pages, read) {
    const book = new Book(title, author, year, pages, read);
    myLibrary.push(book);
};

function displayBooks() {
    for(i = 0; i < myLibrary.length; i++) {
        const card = document.createElement("div");
        card.classList.add("books");
        card.setAttribute("data-id", myLibrary[i].id);
        container.appendChild(card);
        const header = document.createElement("h2");
        header.textContent = myLibrary[i].title + " | " + myLibrary[i].author;
        card.appendChild(header);
        const paragraph = document.createElement("p");
        paragraph.textContent = myLibrary[i].year  + " | " + myLibrary[i].pages;
        card.appendChild(paragraph);
        const read = document.createElement("p");
        read.classList.add("read");
        card.appendChild(read);
        read.textContent = myLibrary[i].read;
    };
};

newBookButton.addEventListener("click", () => {
    newBookForm.reset();
    newBookDialog.showModal();
    console.log("click");
});
newBookDialog.addEventListener("close", (e) => {
    console.log(newBookDialog.returnValue);
});

newBookSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const newBookAuthor = document.querySelector("#author");
    const newBookTitle = document.querySelector("#title");
    const newBookYear = document.querySelector("#year");
    const newBookPages = document.querySelector("#pages");
    const newBookRead = document.querySelector("#read");
    addBookToLibrary(newBookTitle.value, newBookAuthor.value, newBookYear.value, newBookPages.value, newBookRead.value)
    newBookDialog.close();
});



addBookToLibrary("The Hobbit", "JRR Tolkien", 1957, 310, "Not read");
addBookToLibrary("Hyperion", "Dan Simmons", 1989, 482, "Read");
addBookToLibrary("The Blade Itself", "Joe Abercrombie", 2006, 529, "Read");
addBookToLibrary("Bullshit Jobs", "David Graeber", 2011, 368, "Not read");

displayBooks(); 