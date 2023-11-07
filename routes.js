const router = require('express').Router();

const { getAllWines, getWine, getAllProducers, getProducer, getRegion } = require('./getHandlers');
const { getFavorites, updateFavorites, addNote } = require('./favoritesHandlers')
const { createUser, login, getUser } = require('./userHandlers');

router.get('/hello', (req, res) => {
    return res.status(200).json({status: 200, message:"Hello from server"});
});

router.get('/wines',  getAllWines);
router.get('/wines/:wineId', getWine);
router.get('/producers', getAllProducers);
router.get('/producers/:producerId', getProducer);
// router.get('/regions/:region', getRegion);
// router.get('/search/:searchedName', getByName);
// router.get("/users", getUsers);s
router.post("/user", getUser);

router.get("/favorites/:userId", getFavorites);
// router.post("/favorites", addFavorites);
router.patch("/favorites", updateFavorites);
router.patch("/favorites/notes", addNote)

// router.post("/signup/create", createUser);
// router.post("/login", login);
// router.post("/favorites", addFavorites);
// router.post("/user", () => {});

// router.patch("/favorites/:favoritesId", updateFavorites);
// router.delete("/favorites/:favoritesId", deleteFavorites);

module.exports = router;
