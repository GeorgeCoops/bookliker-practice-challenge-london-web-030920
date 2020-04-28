document.addEventListener("DOMContentLoaded", function () {
  getBook();
});

/// get books
function getBooks() {
  return fetch("http://localhost:3000/books").then(function (response) {
    return response.json();
  });
}

// get book
function getBook() {
  getBooks().then(function (books) {
    books.forEach((book) => renderBookImage(book));
  });
}

function renderBookImage(book) {
  // book image render
  const list = document.querySelector("#list-panel");
  const image = document.createElement("img");
  image.src = book.img_url;

  list.appendChild(image);

  // thumbnail render
  image.addEventListener("click", function (e) {
    renderInfo(book);
  });
}

function renderInfo(book) {
  const listInfo = document.querySelector("#show-panel");

  const bookTitle = document.createElement("h2");
  bookTitle.innerHTML = book.title;

  const descr = document.createElement("p");
  descr.innerHTML = book.description;

  const likeButton = document.createElement("button");
  likeButton.innerText = "Like <3";

  const bookList = document.createElement("ul");
  if (book.users.length > 0) {
    renderNames(book, bookList);
  }

  for (let i = 0; i < book.users.length; i++) {
    if (book.users[i].username === "pouros") {
      likeButton.disabled = true;
    }
  }

  likeButton.addEventListener("click", function (e) {
    addUser(book.users, book.id, e);
  });

  listInfo.append(bookTitle, descr, likeButton, bookList);
}

function renderNames(book, bookList) {
  for (let i = 0; i < book.users.length; i++) {
    const userLi = document.createElement("li");
    userLi.innerText = book.users[i].username;
    bookList.appendChild(userLi);
  }
}

function addUser(currentUsers, bookId, e) {
  const newUsers = currentUsers;

  newUsers.push({ id: 1, username: "pouros" });

  const configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      users: newUsers,
    }),
  };
  return fetch(`http://localhost:3000/books/${bookId}`, configurationObject)
    .then(function (response) {
      return response.json();
    })
    .then(function (newName) {

      const userLikes = e.target.nextElementSibling;

      const newLi = document.createElement("li");
      newLi.innerText = "pouros";
      userLikes.appendChild(newLi);
    });
}
