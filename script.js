const container = document.querySelector(".container");
const newBookOpen = document.querySelector(".newbook-open");
const newBookDialog = document.querySelector(".newbook-dialog");
const newBookForm = document.querySelector(".newbook-form");
const newBookSubmit = document.querySelector(".newbook-submit");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const year = document.querySelector("#year");
const pages = document.querySelector("#pages");

const myLibrary = [];

class Book {
    constructor(title, author, year, pages, read) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages + " pages";
        this.read = read.charAt(0).toUpperCase() + read.slice(1);
        this.dataID = self.crypto.randomUUID();
    };
    toggleRead() {
        if(this.read === "Read") {
            this.read = "Not read";
        } else this.read = "Read";
    };
};

function addBookToLibrary(title, author, year, pages, read) {
    const book = new Book(title, author, year, pages, read);
    myLibrary.push(book);
};

function displayBooks() {
    for(i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("div");
    card.classList.add("books");
    card.setAttribute("data-id", myLibrary[i].dataID);
    container.appendChild(card);
    const header = document.createElement("h2");
    header.textContent = myLibrary[i].title + " | " + myLibrary[i].author;
    card.appendChild(header);
    const paragraph = document.createElement("p");
    paragraph.textContent = myLibrary[i].year  + " | " + myLibrary[i].pages;
    card.appendChild(paragraph);
    const read = document.createElement("p");
    read.classList.add("readstatus");
    read.textContent = myLibrary[i].read;
    card.appendChild(read);
    const removeBook = document.createElement("button");
    removeBook.classList.add("newbook-remove")
    removeBook.textContent = "Remove";
    card.appendChild(removeBook);
    removeBooks(removeBook, card);
    const toggleReadStatus = document.createElement("button");
    toggleReadStatus.classList.add("toggle-readstatus");
    toggleReadStatus.textContent = "Toggle";
    read.appendChild(toggleReadStatus);
    toggleReadNow(toggleReadStatus, card, read);
    };
};

function resetBookList(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };
};

function removeBooks(removeBook, card) {
    removeBook.addEventListener("click", () => {
        const bookToRemove = myLibrary.findIndex(book => book.dataID === card.dataset.id);
        myLibrary.splice(bookToRemove, 1);
        resetBookList(container);
        displayBooks();
        console.log(myLibrary);
    });
};

function toggleReadNow(toggleReadStatus, card, read) {
    toggleReadStatus.addEventListener("click", () => {
        const bookToToggle = myLibrary.find(book => book.dataID === card.dataset.id);
        bookToToggle.toggleRead();
        console.log(bookToToggle);
        read.textContent = bookToToggle.read;
        read.appendChild(toggleReadStatus);
    });
};

newBookOpen.addEventListener("click", (e) => {
    newBookForm.reset();
    newBookDialog.showModal();
});

newBookDialog.addEventListener("close", (e) => {
    console.log(newBookDialog.returnValue);
});

title.addEventListener("input", (e) => {
    if(title.validity.valueMissing) {
        title.setCustomValidity("The title value is missing!");
    } else title.setCustomValidity("");
});

author.addEventListener("input", (e) => {
    if(author.validity.valueMissing) {
        author.setCustomValidity("The author value is missing!");
    } else author.setCustomValidity("");
});

year.addEventListener("input", (e) => {
    if(year.validity.valueMissing) {
        year.setCustomValidity("The year value is missing!");
    } else if(year.validity.rangeUnderflow) {
        year.setCustomValidity("The year value should not be lower than 1!");
    } else if(year.validity.rangeOverflow) {
        year.setCustomValidity("The year value should not be higher than 2025!");
    } else year.setCustomValidity("");
});

pages.addEventListener("input", (e) => {
    if(pages.validity.valueMissing) {
        pages.setCustomValidity("The page value is missing!");
    } else if(pages.validity.rangeUnderflow) {
        pages.setCustomValidity("The page value should not be lower than 1!");
    } else if(pages.validity.rangeOverflow) {
        pages.setCustomValidity("The page value should not be higher than 16000!");
    } else pages.setCustomValidity("");
});

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary(document.querySelector("#title").value, 
    document.querySelector("#author").value, 
    document.querySelector("#year").value, 
    document.querySelector("#pages").value, 
    document.querySelector("#read").value);
    resetBookList(container);
    displayBooks();
    newBookDialog.close("New book added.");
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1957, 310, "Not read");
addBookToLibrary("Hyperion", "Dan Simmons", 1989, 482, "Read");
addBookToLibrary("The Blade Itself", "Joe Abercrombie", 2006, 529, "Read");
addBookToLibrary("Bullshit Jobs", "David Graeber", 2011, 368, "Not read");

displayBooks();