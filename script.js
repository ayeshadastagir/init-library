const bookList = document.querySelector('#book-list');
const addBookForm = document.querySelector('#add-book-form');

let myLibrary = [];

function Book(title, author, isbn, status) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  this.status = status;
}

function displayBooks() {
  bookList.innerHTML = '';
  
  myLibrary.forEach((book, index) => {
    const li = document.createElement('li');
    li.dataset.index = index;
    
    const title = document.createElement('span');
    title.textContent = book.title;
    li.appendChild(title);
    
    const author = document.createElement('span');
    author.textContent = `${book.author}  `;
    li.appendChild(author);
    
    const isbn = document.createElement('span');
    isbn.textContent = ` ${book.isbn}  `;
    li.appendChild(isbn);
    
    const status = document.createElement('button');
    status.textContent = book.status === 'Available' ? 'Already borrowed' : 'Available';
    status.addEventListener('click', () => {
      book.status = book.status === 'Available' ? 'Already borrowed' : 'Available';
      displayBooks();
    });
    li.appendChild(status);
    
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.addEventListener('click', () => {
      const newStatus = prompt('Enter new status (Available or Already borrowed)');
      if (newStatus === 'Available' || newStatus === 'Already borrowed') {
        updateBookStatus(index, newStatus);
      } else {
        alert('Invalid status. Please enter Available or Already borrowed.');
      }
    });
    li.appendChild(updateBtn);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });
    li.appendChild(deleteBtn);
    
    bookList.appendChild(li);
  });
}

function addBookToLibrary(title, author, isbn, status) {
  const book = new Book(title, author, isbn, status);
  myLibrary.push(book);
}

function updateBookStatus(index, newStatus) {
  myLibrary[index].status = newStatus;
  displayBooks();
}

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = addBookForm.title.value;
  const author = addBookForm.author.value;
  const isbn = addBookForm.isbn.value;
  const status = 'Already borrowed';
  
  addBookToLibrary(title, author, isbn, status);
  displayBooks();
  
  addBookForm.reset();
});



displayBooks();
