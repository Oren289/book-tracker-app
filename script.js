const inputForm = document.getElementById("input_book");
const inputTitle = inputForm["input_title"];
const inputAuthor = inputForm["input_author"];
const inputYear = inputForm["input_year"];
const checkbox = document.getElementById("complete_status");

const searchInput = document.getElementById("search_input");

const modalInputForm = document.getElementById("modal_input_book");
const modalInputTitle = modalInputForm["modal_input_title"];
const modalInputAuthor = modalInputForm["modal_input_author"];
const modalInputYear = modalInputForm["modal_input_year"];
let modalDataIndex = 0;

const addToButtonText = document.getElementById("shelf");

const emptyRowText = document.getElementById("text_row");

const tabContainer = document.querySelector(".nav-tabs");
const tabRow = document.querySelector(".tabRow");

const bookArray = JSON.parse(localStorage.getItem("books")) || [];

// buttons
const addBookBtn = document.getElementById("add_book_button");
const searchBtn = document.getElementById("search_button");
const editBtn = document.getElementById("edit_button");
const markReadBtn = document.getElementById("mark_read");
const deleteBtn = document.getElementById("delete_button");
const modalSaveChangesBtn = document.getElementById("modal_save_changes_button");

tabContainer.addEventListener("click", tabFilter);

document.addEventListener("DOMContentLoaded", () => {
  bookArray.forEach(createBookCard);
  removeEmptyRowText();
});

searchInput.addEventListener("keyup", (e) => {
  const inputString = e.target.value.toLowerCase();
  const nodes = tabRow.childNodes;

  nodes.forEach((node) => {
    const title = node.children[0].children[0].children[0].innerText.toLowerCase();
    const author = node.children[0].children[0].children[1].innerText.toLowerCase();
    const year = node.children[0].children[0].children[2].innerText;

    node.classList.remove("visually-hidden");
    if (!title.includes(inputString) && !author.includes(inputString) && !year.includes(inputString)) {
      node.classList.add("visually-hidden");
    }
  });

  updateTabFilter();
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

  inputTitle.value = "";
  inputAuthor.value = "";
  inputYear.value = "";
  checkbox.checked = false;

  removeEmptyRowText();
  updateTabFilter();
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

  return { title, author, year, completeStatus };
};

const createBookCard = ({ title, author, year, completeStatus }) => {
  // elements
  const rowContainer = document.getElementById("tab_row");

  const colContainer = document.createElement("div");
  colContainer.classList.add("col-md-6");
  if (!completeStatus) {
    colContainer.classList.add("unread");
  } else {
    colContainer.classList.add("read");
  }

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
  editButton.setAttribute("data-bs-toggle", "modal");
  editButton.setAttribute("data-bs-target", "#staticBackdrop");
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

  rowContainer.appendChild(colContainer);
};

const removeEmptyRowText = () => {
  emptyRowText.classList.remove("visually-hidden");
  if (tabRow.hasChildNodes) {
    emptyRowText.classList.add("visually-hidden");
  }
};

function tabFilter(e) {
  const target = e.target;
  const items = tabRow.childNodes;
  const searchString = searchInput.value;

  if (!target.classList.contains("readTab") && !target.classList.contains("unreadTab") && !target.classList.contains("allTab")) {
    return;
  }

  items.forEach((item) => {
    const title = item.children[0].children[0].children[0].innerText.toLowerCase();
    const author = item.children[0].children[0].children[1].innerText.toLowerCase();
    const year = item.children[0].children[0].children[2].innerText;

    item.classList.remove("visually-hidden");
    if (target.classList.contains("allTab")) {
      if (!title.includes(searchString) && !author.includes(searchString) && !year.includes(searchString)) {
        item.classList.add("visually-hidden");
      }
    }
    if (target.classList.contains("readTab")) {
      if (item.classList.contains("unread") || (!title.includes(searchString) && !author.includes(searchString) && !year.includes(searchString))) {
        item.classList.add("visually-hidden");
      }
    } else if (target.classList.contains("unreadTab")) {
      if (item.classList.contains("read") || (!title.includes(searchString) && !author.includes(searchString) && !year.includes(searchString))) {
        item.classList.add("visually-hidden");
      }
    }
  });
}

function updateTabFilter() {
  const items = tabRow.childNodes;
  const tabs = tabContainer.childNodes;
  const searchString = searchInput.value;
  let activeTab;

  tabs.forEach((tab) => {
    if (tab.nodeName == "#text") {
      return;
    }

    if (tab.children[0].classList.contains("active")) {
      activeTab = tab.children[0].id;
    }
  });

  items.forEach((item) => {
    const title = item.children[0].children[0].children[0].innerText.toLowerCase();
    const author = item.children[0].children[0].children[1].innerText.toLowerCase();
    const year = item.children[0].children[0].children[2].innerText;

    item.classList.remove("visually-hidden");
    if (activeTab == "all-tab") {
      if (!title.includes(searchString) && !author.includes(searchString) && !year.includes(searchString)) {
        item.classList.add("visually-hidden");
      }
    } else if (activeTab == "read-tab") {
      if (item.classList.contains("unread") || (!title.includes(searchString) && !author.includes(searchString) && !year.includes(searchString))) {
        item.classList.add("visually-hidden");
      }
    } else if (activeTab == "unread-tab") {
      if (item.classList.contains("read") || (!title.includes(searchString) && !author.includes(searchString) && !year.includes(searchString))) {
        item.classList.add("visually-hidden");
      }
    }
  });
}

const actions = (e) => {
  const target = e.target;

  const rootElement = target.parentElement.parentElement.parentElement;

  if (target.classList.contains("delete_button")) {
    deleteBook(rootElement);
    rootElement.remove();
  } else if (target.classList.contains("mark_read_button")) {
    changeReadStatus(rootElement);
  } else if (target.classList.contains("edit_button")) {
    getEditData(rootElement);
  }

  removeEmptyRowText;
};

tabRow.addEventListener("click", actions);
tabRow.addEventListener("click", updateTabFilter);

const changeReadStatus = (book) => {
  const index = Array.from(tabRow.childNodes).indexOf(book);

  bookArray[index].completeStatus = !bookArray[index].completeStatus;

  if (bookArray[index].completeStatus) {
    book.classList.remove("unread");
    book.classList.add("read");
    book.children[0].children[1].children[1].innerText = "Mark Unread";
  } else {
    book.classList.remove("read");
    book.classList.add("unread");
    book.children[0].children[1].children[1].innerText = "Mark Read";
  }

  localStorage.setItem("books", JSON.stringify(bookArray));
};

const deleteBook = (book) => {
  const index = Array.from(tabRow.childNodes).indexOf(book);

  bookArray.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(bookArray));
};

const getEditData = (book) => {
  modalDataIndex = Array.from(tabRow.childNodes).indexOf(book);

  modalInputTitle.value = bookArray[modalDataIndex].title;
  modalInputAuthor.value = bookArray[modalDataIndex].author;
  modalInputYear.value = bookArray[modalDataIndex].year;
};

const saveEditData = () => {
  const cardBodyContainer = tabRow.childNodes[modalDataIndex].childNodes[0].childNodes[0];

  bookArray[modalDataIndex].title = modalInputTitle.value;
  bookArray[modalDataIndex].author = modalInputAuthor.value;
  bookArray[modalDataIndex].year = modalInputYear.value;

  cardBodyContainer.childNodes[0].innerText = bookArray[modalDataIndex].title;
  cardBodyContainer.childNodes[1].innerText = "Author: " + bookArray[modalDataIndex].author;
  cardBodyContainer.childNodes[2].innerText = "Year: " + bookArray[modalDataIndex].year;

  localStorage.setItem("books", JSON.stringify(bookArray));
};

modalSaveChangesBtn.addEventListener("click", saveEditData);
