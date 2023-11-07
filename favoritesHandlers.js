"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

// Options for mongoDB client
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};



const getFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const userId = req.params.userId;

    try {
       await client.connect();

        const db = await client.db('finalproj');

        const data = await db.collection('users').findOne({_id: userId});

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


const updateFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = await client.db('finalproj');
    console.log("connected");

    const _id = req.body._id
    const user = req.body.user
    console.log(req.body);

    await client.connect();

    const User = await db.collection("users")
    // try {
        const favoriteAdded = await User.updateOne(
            { _id: req.body._id },
            { $addToSet: { favorites: req.body.updatedFavorite } })
    // }
    // catch {
        if (favoriteAdded) {
            res.status(200).json({ status: 200, message: "Your favorites have been updated!", data: favoriteAdded})
        } else {
            res.status(500).json({ status: 500, message: "That didn't work!", data: "" });
        }
}

const addNote = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = await client.db('finalproj');
    console.log("connected");

    const _id = req.body._id;
    const favoriteId = req.body.favoriteId;
    console.log(_id);
    const user = req.body.user;
    console.log("log from addNote line 82 favoritesHandlers.js" + req.body.favoriteId, req.body.user);
    // console.log(user);

    await client.connect();

    const User = await db.collection("users")
    // try {
        const noteAdded = await User.updateOne(
            { _id: _id, "favorites._id": favoriteId },
            { $set: { "favorites.$.userNotes": req.body.addNote } })
    // }
    // catch {
        if (noteAdded) {
            res.status(200).json({ status: 200, message: "Your notes have been updated!", data: noteAdded})
        } else {
            res.status(500).json({ status: 500, message: "That didn't work!", data: "" });
        }
}

// TO DO : ADD HANDLER FOR SUBMITTING NOTES AND RETURNING NOTES -



// TO DO: add remove from favorites feature - find user by ID and remove wine by ID

// const removeFavorite = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);

//     const _id = req.body._id
//     console.log(_id);

//     try {
//         await client.connect();

//         const db = await client.db('finalproj');

//         const data = await db.collection('users').findOneAndDelete({ _id: favoritesId })
//         console.log(data)

//         if (data.deletedCount === 0) {
//             return res.status(404).json({
//                 status: 404,
//                 message: "favorites ID could not be found...",
//                 data: favoritesId,
//             })
//         } else {
//             return res.status(200).json({
//                 status: 200,
//                 message: "Favorite removed.",
//                 data: favoritesId,
//             })
//         }

//     } catch (err) {
//         res.status(404).json({status: 404, message: err.message})
//     }

//     client.close();

// };

module.exports = {
    getFavorites,
    updateFavorites,
    addNote
    // removeFavorite
}
