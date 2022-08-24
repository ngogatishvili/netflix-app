const User=require("../models/UserModel")
const CustomError=require("../error/CustomError");


module.exports.addToLikedMovies=async(req,res,next)=>{
    try{
       
    const {email,data}=req.body;
    const user=await User.findOne({email});
    if(user) {
        const {likedMovies}=user;
        const movieAlreadyLiked=likedMovies.find(({id})=>id===data.id);
        if(!movieAlreadyLiked) {
            await User.findByIdAndUpdate(user._id,{likedMovies:[...user.likedMovies,data]},{new:true})
        }else{
            return next(new CustomError(`The movie - ${data.name} is already saved in your list `,400))
        }
    }else{
       await User.create({email,likedMovies:[data]});
      
    }
    return res.status(200).json({msg:`Movie-  ${data.name} Added succesfully`});
    }catch(err) {
    next(new CustomError({message:"error adding the video in liked videos"})); 
    }
};


module.exports.getLikedMovies=async(req,res,next)=>{
    try {
        const {email}=req.params;
        const user=await User.findOne({email});
        if(user) {
            const {likedMovies}=user;
            return res.status(200).json(likedMovies);
        }else{
            return res.json({msg:"there are no movies in your list yet"})
        }

    }catch(err){
        return next(new CustomError("error fetching the liked videos"));
    }
}   



module.exports.removeLikedMovie=async(req,res,next)=>{
    try {
     const {email,movieId}=req.body;
     const user=await User.findOne({email});
    
     if(user) {
         const {likedMovies}=user;
         const movie=likedMovies.find(({id})=>id===movieId);
         
         if(!movie) {
             return next(new CustomError('this movie is not in your list',404))
         }else{
            await User.findByIdAndUpdate(user._id,{likedMovies:likedMovies.filter(movie=>movie.id!==movieId)},{new:true})
         }
         
         return res.status(200).json({msg:`movie- ${movie.name} is removed from your list successfully`})
         

     }else{
        return next(new CustomError('User with this E-mail does not exist',404))
     }
    }catch(err) {
     return next(new CustomError("error removing the liked video"))
    }
}


