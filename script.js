// form input
// const inputTitle = document.getElementById("input_title");
// const inputAuthor = document.getElementById("input_author");
// const inputYear = document.getElementById("input_year");
// const inputCompleteStatus = document.getElementById("complete_status");

const inputForm = document.getElementById("input_book");
const inputTitle = inputForm["input_title"];
const inputAuthor = inputForm["input_author"];
const inputYear = inputForm["input_year"];
const checkbox = document.getElementById("complete_status");

const addToButtonText = document.getElementById("shelf");

const emptyAllRowText = document.getElementById("empty_all_row_text");
const emptyReadRowText = document.getElementById("empty_read_row_text");
const emptyUnreadRowText = document.getElementById("empty_unread_row_text");

const allTabRow = document.getElementById("all_row");
const readTabRow = document.getElementById("read_row");
const unreadTabRow = document.getElementById("unread_row");

const bookArray = JSON.parse(localStorage.getItem("books")) || [];

// buttons
const addBookBtn = document.getElementById("add_book_button");
const searchBtn = document.getElementById("search_button");
const editBtn = document.getElementById("edit_button");
const markReadBtn = document.getElementById("mark_read");
const deleteBtn = document.getElementById("delete_button");

document.addEventListener("DOMContentLoaded", () => {
  bookArray.forEach(createBookCard);
  removeEmptyRowText();
});

checkbox.addEventListener("click", () => {
  const inputCompleteStatus = inputForm["complete_status"].checked;

  if (inputCompleteStatus) {
    addToButtonText.innerText = "Read Books";
  } else {
    addToButtonText.innerText = "Unread Books";
  }
});

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const inputCompleteStatus = inputForm["complete_status"].checked;

  if (inputTitle.value == "" && inputAuthor.value == "") {
    alert("Input cannot be empty!");
    return;
  }

  const newBook = addBook(inputTitle.value, inputAuthor.value, inputYear.value, inputCompleteStatus);

  createBookCard(newBook);

  console.log(inputTitle.value);
  console.log(inputAuthor.value);
  console.log(inputYear.value);
  console.log(inputCompleteStatus);

  inputTitle.value = "";
  inputAuthor.value = "";
  inputYear.value = "";
  checkbox.checked = false;
});

const addBook = (title, author, year, completeStatus) => {
  const id = new Date().valueOf();

  bookArray.push({
    id,
    title,
    author,
    year,
    completeStatus,
  });

  localStorage.setItem("books", JSON.stringify(bookArray));

  removeEmptyRowText();
  return { title, author, year, completeStatus };
};

const createBookCard = ({ title, author, year, completeStatus }) => {
  // elements
  const allRowContainer = document.getElementById("all_row");
  const readRowContainer = document.getElementById("read_row");
  const unreadRowContainer = document.getElementById("unread_row");

  const colContainer = document.createElement("div");
  colContainer.classList.add("col-md-6");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");
  cardContainer.classList.add("mt-3");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer");
  cardFooter.classList.add("d-grid");
  cardFooter.classList.add("bg-white");

  const bookTitle = document.createElement("h5");
  bookTitle.classList.add("book_title");
  bookTitle.classList.add("fw-bold");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("div");
  bookAuthor.innerText = "Author: " + author;

  const bookYear = document.createElement("div");
  bookYear.innerText = "Year: " + year;

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.classList.add("btn");
  editButton.classList.add("btn-secondary");
  editButton.classList.add("mb-1");
  editButton.classList.add("edit_button");
  editButton.innerText = "Edit";

  const markReadButton = document.createElement("button");
  markReadButton.type = "button";
  markReadButton.classList.add("btn");
  markReadButton.classList.add("btn-success");
  markReadButton.classList.add("mb-1");
  markReadButton.classList.add("mark_read_button");
  if (!completeStatus) {
    markReadButton.innerText = "Mark Read";
  } else {
    markReadButton.innerText = "Mark Unread";
  }

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-danger");
  deleteButton.classList.add("mb-1");
  deleteButton.classList.add("delete_button");
  deleteButton.innerText = "Delete";

  cardBody.appendChild(bookTitle);
  cardBody.appendChild(bookAuthor);
  cardBody.appendChild(bookYear);

  cardFooter.appendChild(editButton);
  cardFooter.appendChild(markReadButton);
  cardFooter.appendChild(deleteButton);

  cardContainer.appendChild(cardBody);
  cardContainer.appendChild(cardFooter);

  colContainer.appendChild(cardContainer);

  if (completeStatus == true) {
    readRowContainer.appendChild(colContainer);
  } else {
    unreadRowContainer.appendChild(colContainer);
  }
};

const removeEmptyRowText = () => {
  emptyReadRowText.classList.remove("visually-hidden");
  emptyUnreadRowText.classList.remove("visually-hidden");

  console.log(readTabRow.children.length);

  if (readTabRow.children.length > 1) {
    emptyReadRowText.classList.add("visually-hidden");
  }

  if (unreadTabRow.children.length > 1) {
    emptyUnreadRowText.classList.add("visually-hidden");
  }
};

const actions = (e) => {
  const target = e.target;
  const index = Array.from();
};

const changeReadStatus = () => {};