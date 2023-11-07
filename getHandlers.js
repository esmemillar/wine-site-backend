"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
// const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

// Options for mongoDB client
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};



const getAllWines = async (req, res) => {
    console.log('hello');
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = await client.db('finalproj');

        const data = await db.collection('wines').find().toArray();

        res.status(200).json({
            status: 200,
            data: data
        });

    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Data not found'
        })
    } finally {
        client.close();
    }

};

const getAllProducers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
       await client.connect();

        const db = await client.db('finalproj');

        const data = await db.collection('producers').find().toArray();

        res.status(200).json({
            status: 200,
            data: data
        });

    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Data not found'
        })
    }

    client.close();
};


const getWine = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const wineId = Number(req.params.wineId);

    try {
       await client.connect();

        const db = await client.db('finalproj');

        const data = await db.collection('wines').findOne({_id: wineId});

        if (data === null){
            throw new Error();
        }

        res.status(200).json({
            status: 200,
            data: data
        })

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Product not found'
        });
    }

    client.close();
};

const getProducer = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const producerId = Number(req.params.producerId);

    // console.log("from getHandlers:" + producerId);

    try {
       await client.connect();

        const db = await client.db('finalproj');

        const data = await db.collection('producers').findOne({_id: producerId});

        if (data === null){
            throw new Error();
        }

        res.status(200).json({
            status: 200,
            data: data
        })

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Product not found'
        });
    }

    client.close();
};

// const getByGrape = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);

//     try {
//        await client.connect();

//         const db = await client.db('finalproj');

// const data = await db.collection('wines').findOne({grapes: selectedGrape});

//         if (producers || wines === null){
//             throw new Error();
//         }

//         res.status(200).json({
//             status: 200,
//             data: producers && wines,
//         });

//     } catch(err) {
//         console.log(err);
//         res.status(404).json({
//             status: 404,
//             message: 'Data not found'
//         })
//     }

//     client.close();
// };

const getUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
       await client.connect();

        const db = await client.db('finalproj');

        const data = await db.collection('users').find().toArray();
        console.log(data);

        res.status(200).json({
            status: 200,
            data: data
        })


    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'not users found'
        })
    }
    finally {
        client.close();
    }

};

// const getRegion = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);
//     const region = (req.params.region);

//     console.log("from getHandlers: getRegion" + region);

//     try {
//        await client.connect();

//         const db = await client.db('finalproj');

//         const data = await db.collection('wines').findOne({region: region});

//         if (data === null){
//             throw new Error();
//         }

//         res.status(200).json({
//             status: 200,
//             data: data
//         })

//     } catch (err) {
//         console.log(err);
//         res.status(404).json({
//             status: 404,
//             message: 'Product not found'
//         });
//     }

//     client.close();
// };






module.exports = {
    getAllWines,
    getWine,
    getAllProducers,
    getProducer,
    // getByGrape,
    getUsers
    // getRegion
 };
