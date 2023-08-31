const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
dotenv.config();

// dotenv-cli in mvc

const app = express();
app.use(express.json());

// database
const client = new MongoClient(process.env.DATABASE_URL);

app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome");
});
app.post("/user", (req, res) => {
    const dummyUser = req.body;
    client
        .connect()
        .then(() => {
            const db = client.db(process.env.DATABASE_NAME);
            const usersCollection = db.collection("users");
            usersCollection.insertOne(dummyUser).then((err, result) => {
                if (err) {
                    console.log(err);
                }
            });

            return res.send("success");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/user", (req, res) => {
    client
        .connect()
        .then(() => {
            const query = { name: "dummy User" };
            const queryOptions = {
                limit: 4,
                skip: 2,
            };
            const db = client.db(process.env.DATABASE_NAME);
            const usersCollection = db.collection("users");
            usersCollection.findOne(query).then((err, result) => {
                if (err) {
                    console.log(err);
                }
            });

            return res.send("success");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/user/batch", (req, res) => {
    const dummyUser = req.body;
    client
        .connect()
        .then(() => {
            const db = client.db(process.env.DATABASE_NAME);
            const usersCollection = db.collection("users");
            usersCollection.insertMany(dummyUser).then((err, result) => {
                if (err) {
                    console.log(err);
                }
            });

            return res.send("success");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.patch("/user", (req, res) => {
    client
        .connect()
        .then(() => {
            const db = client.db(process.env.DATABASE_NAME);
            const usersCollection = db.collection("users");
            const query = { name: "dummy User" };
            const newValues = { age: 22 };
            usersCollection.updateOne(query, newValues).then((err, result) => {
                if (err) {
                    console.log(err);
                }
            });

            return res.send("success");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete("/user", (req, res) => {
    client
        .connect()
        .then(() => {
            const query = { name: "dummy User" };
            const db = client.db(process.env.DATABASE_NAME);
            const usersCollection = db.collection("users");
            usersCollection.deleteOne(query).then((err, result) => {
                if (err) {
                    console.log(err);
                }
            });

            return res.send("success");
        })
        .catch((err) => {
            console.log(err);
        });
});
