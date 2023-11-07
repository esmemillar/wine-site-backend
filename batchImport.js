const wines = require("./data/wines.json");
const producers = require("./data/producers.json");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const batchImportWines = async () => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproj");

    const result = await db.collection("wines").insertMany(wines)
    console.log(result)
}

const batchImportProducers = async () => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproj");

    const result = await db.collection("producers").insertMany(producers)
    console.log(result)
}


batchImportWines();
batchImportProducers();