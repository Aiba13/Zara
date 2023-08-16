const API = "http://localhost:3000/goods";

const inpName = document.querySelector("#inpName");
const inpDesc = document.querySelector("#inpDesc");
const inpPrice = document.querySelector("#inpPrice");
const inpImage = document.querySelector("#inpImage");
const btnAdd = document.querySelector("#btnAdd");
const btnOpenForm = document.querySelector("#btnOpenForm");
const sectionBooks = document.querySelector("#flush-collapseOne");
const section = document.querySelector("#section");

btnAdd.addEventListener("click", () => {
  if (
    //проверка на заполнение
    !inpName.value.trim() ||
    !inpDesc.value.trim() ||
    !inpPrice.value.trim() ||
    !inpImage.value.trim()
  ) {
    return alert("заполните поля");
  }
  const newProduct = {
    title: inpName.value,
    description: inpDesc.value,
    image: inpImage.value,
    price: inpPrice.value,
  };
  createItem(newProduct);
});
async function createItem(product) {
  await fetch(API, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(product),
  });

  btnOpenForm.classList.toggle("show");
  inpName.value = "";
  inpDesc.value = "";
  inpImage.value = "";
  inpPrice.value = "";
}
async function renderGoods() {
  const res = await fetch(API);
  const data = await res.json();

  data.forEach(({ price, title, description, image, id }) => {
    section.innerHTML += `<div class="card m-4 cardBook" style="width: 18rem">
    <img id="${id}" src=${image}  class="card-img-top detailsCard" style="heigth: 280px" alt="${title}"/>
    <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <p class="card-text">${price}</p>
        <button class= "btn btn-outline-danger btnDelete" id="${id}">
         Удалить
          </button>
          <button class= "btn btn-outline-warning btnEdit" id="${id}">
         Изменить
          </button>
    </div>
</div>`;
  });
}
renderGoods();
