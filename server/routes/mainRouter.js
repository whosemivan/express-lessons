const router = require("express").Router();
const fs = require("fs");

let data = "";
const readFile = (path) => {
    return fs.readFileSync(path, "utf-8");
}

data = readFile("./data/fruits.csv");
data = data.split("\r\n");

console.log(data);

const Product = function(prArr) {
    let names = data[0].split(";");
    /* *
     * [name;b;h;u;kcal;type]
     * [Авокадо,1.9,23.5,6.7,223,Фрукты]
     * */
    names.forEach(function(name, i) {
        console.log(this);
        this[name] = prArr[i];
    }.bind(this));
}

const products = [];

for (let i = 1; i < data.length; i++) {
    products.push(new Product(data[i].split(";")));
}



router.get("/", (req, res) => {
    res.render("index", {
        title: "Здоровый образ жизни",
        products: products,
        tableCaptions: data[0]
    });
});
router.get("/vegetables", (req, res) => {
    res.render("category", {
        title: "Овощи"
    });
});

module.exports = router;