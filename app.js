const express = require("express")
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require("body-parser")
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient
const app = express()
const crypto = require("crypto");
const { Parser } = require('json2csv');
const fs = require("fs")
const dbName = "test_commerce"
const url = 'mongodb://localhost:27017'
const port = 5000

const key = crypto.createHash("sha256").update("OMGCAT!", "ascii").digest();
const iv = "1234567890123456"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.options('*', cors())
app.use(
    cors({
        origin: ["http://13.67.90.191:3000/", "http://13.67.90.191:3000", "*", "http://localhost:3000"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        preflightContinue: false,
        optionsSuccessStatus: 204
    })
);

//Init Mongo Db
async function createConnection() {
    return MongoClient.connect(url, {
        useUnifiedTopology: true,
        poolSize: 500,
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        keepAlive: true,
        autoReconnect: true
    })
}


function initRoutes(connectionObject) {
    //Store Products
    app.post("/create/product", async (req, res) => {
        const { name, price, description } = req.body

        try {
            let product_json = { name, price, description }

            const dbo = connectionObject.db(dbName)

            await dbo.collection("products").insertOne(product_json)

            res.json({
                status: "Success",
                message: "Inserted Successfully"
            })
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({
                    status: "Error",
                    message: "Something went wrong.."
                })
        }
    })

    //Get all products
    app.get("/products", async (req, res) => {
        try {
            const dbo = connectionObject.db(dbName)
            const result = await dbo.collection("products").find().toArray()
            res.json({
                status: "Success",
                message: result
            })
        } catch (error) {
            console.log(error);

            res.status(500)
            res.json({
                status: "Error"
            })
        }
    })

    //Get individual Product
    app.get("/product", async (req, res) => {
        const { id } = req.query
        try {
            const dbo = connectionObject.db(dbName)
            const oid = new ObjectId(id)
            const result = await dbo.collection("products").findOne({ "_id": oid })
            res.json({
                status: "Success",
                message: result
            })
        } catch (error) {
            console.log(error);

            res.status(500)
                .json({
                    status: "Error"
                })
        }
    })

    app.put("/product", async (req, res) => {
        const { name, price, description, id } = req.body
        try {
            const dbo = connectionObject.db(dbName)
            const product_json = { name, price, description }
            const oid = new ObjectId(id)
            await dbo.collection("products").updateOne({ "_id": oid }, { $set: product_json }, { upert: true })
            res.json({
                status: "Success"
            })
        } catch (error) {
            console.log(error);

            res.status(500)
                .json({
                    status: "Error"
                })
        }
    })

    app.delete("/product", async (req, res) => {
        const { id } = req.query
        try {
            const dbo = connectionObject.db(dbName)
            const oid = new ObjectId(id)
            await dbo.collection("products").deleteOne({ "_id": oid })
            res.json({
                status: "Success"
            })
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({
                    status: "Error"
                })

        }
    })

    //SiginUp User
    app.post("/signup", async (req, res) => {
        const { email, password } = req.body
        try {
            const dbo = connectionObject.db(dbName)

            const result = await dbo.collection("users").findOne({ email })

            if (result) {
                res.status(401)
                    .json({
                        status: "Error",
                        message: "User Already Registered"
                    })
            } else {
                //encrypting the password
                const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
                cipher.update(password, "ascii");
                const encrypted = cipher.final("base64");

                const user_json = { email, password: encrypted }


                await dbo.collection("users").insertOne(user_json)

                res.json({
                    status: "Success"
                })
            }

        } catch (error) {
            console.log(error);

            res.status(500)
                .json({
                    status: "Error"
                })
        }
    })

    //Signin User
    app.post("/signin", async (req, res) => {
        const { email, password } = req.body

        try {
            const dbo = connectionObject.db(dbName)

            //encrypting the password
            const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
            cipher.update(password, "ascii");
            const encrypted = cipher.final("base64");

            const result = await dbo.collection("users").findOne({ email })

            if (result) {
                if (result.password == encrypted) {
                    res.json({
                        status: "Success",
                        message: "Successfully logged In"
                    })
                    return
                } else {
                    res.status(401)
                        .json({
                            status: "Error",
                            message: "Password not matched"
                        })
                }

            } else {
                res.status(404)
                    .json({
                        status: "Error",
                        message: "User Not Registered"
                    })
            }

        } catch (error) {
            console.log(error);

            res.status(500)
                .json({
                    status: "Error"
                })
        }
    })

    app.get("/sendCSV", async (req, res) => {
        try {
            const dbo = connectionObject.db(dbName)
            const result = await dbo.collection("products").find().toArray()
            const fields = ["name", "price", "description"]

            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(result);
            fs.writeFileSync("./client/src/products.csv", csv)
            res.send(csv)

        } catch (error) {
            res.status(500)
                .json({
                    status: "Error",
                })
        }
    })

}

async function main() {
    try {
        const connectionObject = await createConnection()
        initRoutes(connectionObject)
        app.listen(port, () => console.log(`Server started at ${port}`))
    } catch (error) {
        console.log("DB IS NOT CONNECTED....");

    }
}



main()