import app from "./server.js"
import mongodb from "mongodb"
import dotenv from 'dotenv'
import reviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient

// Hide db username & password
dotenv.config() // Create dotenv -> npm install dotenv -> create .env file

const db_username = process.env['DATABASE_USERNAME']
const db_password = process.env['DATABASE_PASSWORD']
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.xkt9jgz.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await reviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })


