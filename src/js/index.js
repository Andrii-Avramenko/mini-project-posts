import transformer from "parcel-transformer-hbs";
import templatePosts from "../templates/posts.hbs";

const SERVER_API =
  "https://supreme-waffle-v6pqv47975vx26qqj-3000.app.github.dev/posts";
const postsContainer = document.querySelector("#postsContainer");

// Отримання списку постів

async function getPosts() {
  try {
    const response = await fetch(SERVER_API);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error(error);
  }
}

// Створення нового поста

async function createPost(title, content) {
  const posts = await getPosts();
  const postToAdd = {
    id: toString(posts.length + 1),
    title,
    content,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(postToAdd),
  };
  try {
    fetch(SERVER_API, options);
  } catch (error) {
    console.error(error);
  }
}

// Оновлення поста

async function updatePost(id, title, content) {
  try {
  } catch (error) {
    console.error(error);
  }
}

// Видалення поста

async function deletePost(id) {
  try {
    fetch(SERVER_API + '/' + id, {
      method: "DELETE"
    })
  } catch (error) {
    console.error(error);
  }
}

// Додавання коментаря до поста

async function createComment(postId, comment) {
  try {
  } catch (error) {
    console.error(error);
  }
}

// Оновлення відображення постів на сторінці

function renderPosts(posts) {
  postsContainer.innerHTML = '';
  const output = posts.map((post) => templatePosts(post)).join("");
  console.log(output);
  postsContainer.innerHTML = output;

  document.querySelectorAll(".deletePostButton").forEach((deleteButton) =>
    deleteButton.addEventListener("click", (e) => {
      deletePost(e.target.dataset.id);
    })
  );
}

// // Обробник події для створення поста

document.getElementById("createPostForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get("title");
  const content = formData.get("content");
  createPost(title, content);
});

// // Обробник події для редагування поста

// document.addEventListener("click", cb);

// // Обробник події для додавання коментаря

// document.addEventListener("submit", cb);

// Запуск додатку

async function startApp() {
  const posts = await getPosts();
  renderPosts(posts);
}

startApp();
