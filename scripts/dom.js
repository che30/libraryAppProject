function Book(title, author, pages, id, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id;
  this.status = status;
}
function display() {
  const lib = JSON.parse(localStorage.getItem('myLibrary'));
  lib.forEach(book => {
    const container = document.getElementById('libraryInfo');
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('d-flex');
    bookDiv.classList.add('justify-content-around');
    bookDiv.classList.add('mt-5');
    bookDiv.classList.add('bg-success');
    bookDiv.classList.add('py-3');
    bookDiv.style.cssText = 'width:95%; alig-items-baseline; align-content-baseline%';
    const newTitle = document.createElement('h3');
    newTitle.className = 'book-title';
    newTitle.classList.add('text-white');
    const newAuthor = document.createElement('h4');
    newAuthor.className = 'author';
    newAuthor.classList.add('text-white');
    const newPages = document.createElement('p');
    newPages.className = 'text-white';
    newPages.classList.add('ml-5');
    const dFlex = document.createElement('div');
    dFlex.style.cssText = 'width:10%;';
    dFlex.classList.add('text-right');
    const status = document.createElement('button');
    status.className = 'status';
    status.classList.add('bg-primary');
    status.style.cssText = 'border-radius:20px;';
    status.id = `s${book.id}`;
    status.setAttribute('onclick', `changeStatus(${book.id})`);
    status.innerText = 'read book';


    newTitle.innerText = lib[book.id].title;
    newAuthor.innerText = lib[book.id].author;
    newPages.innerText = lib[book.id].pages;

    bookDiv.appendChild(newTitle);
    bookDiv.appendChild(newAuthor);
    bookDiv.appendChild(newPages);
    container.appendChild(bookDiv);
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.id = book.id;
    button.setAttribute('onclick', `removeItem(${button.id})`);
    button.classList.add('bg-white');
    button.style.cssText = 'width:69%;border-radius:20px';
    const remove = document.createTextNode('remove');
    dFlex.appendChild(status);
    dFlex.appendChild(button);
    bookDiv.appendChild(dFlex);
    button.appendChild(remove);
  });
}
export { Book, display };