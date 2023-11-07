const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require("uuid");

// const createUser = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);
//     await client.connect();
//     const db = await client.db("finalproj");

//     console.log("req.body" + req.body)
//     const userDetails = req.body;

//     // UPDATE TO KEY PASSED FROM CHECKOUT

//     // compiles order checkout information with cart and submits to order collection
//     const user = {
//         _id: uuidv4(),
//         user: userDetails
//     };

//     try {

//         const result = await db.collection("users").insertOne(user)

//         if (result.acknowledged === true) {
//             return res.status(200).json({
//                 status: 200,
//                 message: "Account created.",
//                 data: user,
//             })
//         }
//     } catch (err) {
//         return res.status(500).json({
//             status: 500,
//             message: "Something went wrong. " + err.message + " Please try again.",
//             data: order,
//         })
//     }

// }

// const login = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);
//     await client.connect();
//     const db = await client.db("finalproj");

//     const {email} = req.body;
//     console.log(email);


//     // UPDATE TO KEY PASSED FROM CHECKOUT

//     // compiles order checkout information with cart and submits to order collection
//     const user = {
//         _id: uuidv4(),
//         user: email
//     };

//     try {

//         const result = await db.collection("users").findOne({"user.email": email})
//         let userId = result._id;
//         console.log(result);
//         console.log(userId);

//         if (result._id !== null) {
//             return res.status(200).json({
//                 status: 200,
//                 message: "Logged in.",
//                 data: userId,
//             })
//         }
//     } catch (err) {
//         return res.status(500).json({
//             status: 500,
//             message: "Something went wrong. " + err.message + " Please try again."
//         })
//     }

// }

//ADD UUID
const getUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    console.log(req.body);
    const email = req.body.user.email;
    const user = req.body.user;
    const _id = uuidv4();


    try {
        await client.connect();

        const db = await client.db('finalproj');

        const data = await db.collection('users').findOne({ email: email });
        // console.log( "console from getUsers " + data);


        if (data === null){
                const result = await db.collection("users").insertOne({ ...user, _id, favorites: [] });
                console.log(result);
                if (result.acknowledged === true) {
                return res.status(200).json({
                    status: 200,
                    data: { ...user, _id, favorites: [] }
                })
            }

            // throw new Error();
        }

        res.status(200).json({
            status: 200,
            data: data
        })

    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'user not found'
        })
} finally {
    client.close();
}

};


module.exports = {
    // createUser,
    getUser
    // getUsers
};
