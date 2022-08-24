const { addToLikedMovies, getLikedMovies, removeLikedMovie } = require("../controllers/UserController");

const router=require("express").Router();


router.put('/add',addToLikedMovies);
router.put("/delete",removeLikedMovie);
router.get("/liked/:email",getLikedMovies);


module.exports=router;

