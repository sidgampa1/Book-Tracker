import dotenv from "dotenv"
import app from "./api/server.js"
import { MongoClient, ServerApiVersion } from 'mongodb'
import reviewsDAO from "./dao/reviewsDAO.js"

dotenv.config();
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.ufcz6ro.mongodb.net/?retryWrites=true&w=majority`;

const port = process.env.PORT || 8000; 

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true 
    })
    .catch(err => {
        console.err(err.stack);
        process.exit(1);
    })
    .then(async client => {
        console.log("connected to mongoDB");
        await reviewsDAO.injectDB(client);

        // test adding a record to Mongo DB
        // try {
        //     const reviewDoc = {
        //         movieID: 1,
        //         review: "good",
        //         user: "Sid"
        //     }
        //     console.log("In index.js, adding test review");
        //     console.log(reviewDoc);

        //     await client.db("reviews").collection("reviews").insertOne(reviewDoc);
        // } catch (e) {
        //     console.error(`Unable to post review: ${e}`);
        // }

        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    });