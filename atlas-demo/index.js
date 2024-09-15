const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

dotenv.config();
const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const app = express();
app.use(bodyParser.json());

const connectToDb = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db("yourDatabaseName").collection("yourCollectionName");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
};

// Insert data endpoint
app.post("/", async (req, res) => {
    try {
        const collection = await connectToDb();
        const data = req.body;
        const result = await collection.insertOne(data);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
});

// Get data endpoint
app.get("/", async (req, res) => {
    try {
        const collection = await connectToDb();
        const data = await collection.find({}).toArray();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
