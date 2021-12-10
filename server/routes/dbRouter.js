const router = require("express").Router();
const db = require("./db.js");
router.post("/add", (req, res) => {
    console.log(req.body); // Получить тело формы
    /* *
     * Добавить в массив новые данные => Перезаписать файл
     * */
    const client = db();
    client.connect(err => {
        if (err) {
            // aaa!!!
        } else {
            const table = client.db("food");
            const col = table.collection("products");
            col.insertOne(req.body, err => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ msg: "done" });
                }
                client.close();
            });

        }
    });
});

router.get("/vegetables", (req, res) => {
    const client = db();
    client.connect(err => {
        if (err) {
            res.send({ "msg": "Error connection" });
            client.close();
        } else {
            const table = client.db("food");
            const col = table.collection("products");
            col.find({ "type": "Овощи" }).toArray((error, data) => {
                if (error) {
                    console.log(error);
                }
                console.log(data);
                res.send({ "data": data });
                client.close();
            });
        }

    });
});

router.get("/del/:id", (req, res) => {
    const client = db();
    client.connect((err) => {
        if (err) {
            console.log(err);
            client.close();
        } else {
            const col = client.db("food").collection("products");
            console.log(req.params);
            col.deleteOne({ "_id": ObjectId(req.params.id) });
            client.close();
            res.send({ "msg": "ok" });
        }
    })
});


module.exports = router;