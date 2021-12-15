// Получить данные из базы данных за счет ajax-запроса
let container = document.querySelector(".products");
// IIFE
async function deleteProduct(el) {
    let id = el.getAttribute("data-key");
    let res = await fetch(`/api/del/${id}`);

    let msg = await res.json();
    if (msg.msg === "ok") {
        el.remove();
    }
}

(async() => {
    const res = await fetch("/api/vegetables");
    const data = await res.json();
    data.data.forEach((obj) => {
        container.innerHTML += `<div onclick="deleteProduct(this)" class="products__item" data-key="${obj._id}">${obj.name}</div>`
    })
})();