/* eslint-disable import/extensions */
import Book from './dom.js';

const f1 = document.getElementById('book-form');
const h1 = document.getElementById('b1');
let hidden = true;
f1.className = 'd-none';
h1.addEventListener('click', () => {
  if ((hidden === true) && (f1.className === 'd-none')) {
    f1.className = 'd-block';
    hidden = false;
  } else
  if ((hidden === false) && (f1.className === 'd-block')) {
    hidden = true;
    f1.className = 'd-none';
  }
});
class UI {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }
}

function addBookToList(book) {
  const bookList = document.querySelector('#book-list');
  bookList.classList.add('d-flex', 'justify-content-around', 'mt-3');
  const bookContainer = document.createElement('div');
  bookContainer.className = 'card';
  const bookBody = document.createElement('div');
  bookBody.className = 'card-body';
  bookBody.classList.add('border', 'border-dark', 'rounded');
  const bookTitle = document.createElement('h5');
  bookTitle.className = 'card-title';
  const bookAuthor = document.createElement('p');
  bookAuthor.className = 'card-text';
  const numberPages = document.createElement('p');
  numberPages.className = 'card-text';
  const isbn = document.createElement('p');
  isbn.className = 'card-text';
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('d-flex', 'flex-wrap', 'justify-content-between', 'w-75');
  const status = document.createElement('button');
  status.className = 'bg-success';
  const read = document.createTextNode('read');
  status.appendChild(read);
  status.classList.add('text-white', 'rounded');
  status.setAttribute('onclick', `changeStatus(${book.id})`);
  status.id = `s${book.id}`;
  const removeBtn = document.createElement('button');
  removeBtn.className = 'bg-danger';
  removeBtn.classList.add('rounded', 'text-white');
  removeBtn.id = book.id;
  removeBtn.setAttribute('onclick', `removeBook(${book.id})`);
  const remove = document.createTextNode('remove');
  removeBtn.appendChild(remove);
  // Adding Value To The Nodes
  bookTitle.innerHTML = book.title;
  bookAuthor.innerHTML = book.author;
  numberPages.innerHTML = book.pages;
  isbn.innerHTML = book.isbn;
  // Appending The Nodes To Parent Nodes
  bookBody.appendChild(bookTitle);
  bookBody.appendChild(bookAuthor);
  bookBody.appendChild(numberPages);
  bookBody.appendChild(isbn);
  buttonContainer.appendChild(status);
  buttonContainer.appendChild(removeBtn);
  bookBody.appendChild(buttonContainer);
  bookContainer.appendChild(bookBody);
  bookList.appendChild(bookContainer);
}
function countBook() {
  let currentNumber = Number(localStorage.getItem('lastBookId'));
  if (currentNumber === null) {
    currentNumber = 0;
  } else {
    currentNumber += 1;
    localStorage.setItem('lastBookId', currentNumber);
  }

  return currentNumber;
}
function displayBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  const books = UI.getBooks();

  books.forEach((book) => addBookToList(book));
}

function storeBook(book) {
  const books = UI.getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}
function clearFields() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('nbpages').value = '';
  document.getElementById('isbn').value = '';
}
function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);
}
window.removeBook = (bookid) => {
  const books = UI.getBooks();
  books.forEach((book, index) => {
    if (book.id === bookid) {
      books.splice(index, 1);
    }
  });
  document.getElementById(bookid).parentNode.parentNode.parentNode.remove();
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
  showAlert('Book Removed', 'success');
};
document.addEventListener('DOMContentLoaded', displayBooks());

// Event: Change Status If Book Read
window.changeStatus = (statusId) => {
  const books = UI.getBooks();
  const retrievedId = document.getElementById(`s${statusId}`);
  retrievedId.className = 'bg-primary';
  retrievedId.innerHTML = 'book read';
  books.status = true;
  localStorage.setItem('books', JSON.stringify(books));
};

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  const title = `title: ${document.querySelector('#title').value}`;
  const author = `author: ${document.querySelector('#author').value}`;
  const isbn = `isbn: ${document.querySelector('#isbn').value}`;
  const nbpages = `pages: ${document.querySelector('#nbpages').value}`;
  if (title === '' || author === '' || isbn === '' || nbpages === '') {
    showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const count = countBook();
    const book = new Book(title, author, nbpages, count, false, isbn);
    // Add book to store
    storeBook(book);
    showAlert('Book Added', 'success');
    clearFields();
    displayBooks(book);
  }
});


// Storage.clear()