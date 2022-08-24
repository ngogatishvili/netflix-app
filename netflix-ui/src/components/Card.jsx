import React from 'react'
import { useState } from 'react'
import styled from "styled-components"
import { getMyMovies, getTrailer, setMessage } from '../store/store'
import {useDispatch,useSelector} from "react-redux"
import {IoPlayCircleSharp} from "react-icons/io5"
import {RiThumbUpFill,RiThumbDownFill} from "react-icons/ri"
import {BsCheck} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BiChevronDown} from "react-icons/bi"
import {onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase-config"
import { useEffect } from 'react'
import axios from 'axios'



const Card = ({movie,index,isLiked=false}) => {
  const dispatch=useDispatch();
  const currentTrailer=useSelector(state=>state.netflix.currentMovieTrailer);
  const myMovies=useSelector(state=>state.netflix.myMovies);
  const [isClicked,setIsClicked]=useState(false)
  const [email,setEmail]=useState(undefined);
  const hoverHandler=(id)=>{
    dispatch(getTrailer(id));
  }
  const clickHandler=()=>{
    setIsClicked(true)
    
  }

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
        if(user) {
          setEmail(user.email);
          
        }
    })
  },[])

  const addMovie=async()=>{
      try{
        const {data:{msg}}=await axios.put('http://localhost:5000/api/user/add',{email,data:movie});
        dispatch(setMessage({type:"success",content:msg}))
      }catch(err) {
        dispatch(setMessage({type:"error",content:err.response.data.msg}))
       
      }
  }

  const unlikeMovie=async()=>{
    try {
      const {data:{msg}}=await axios.put('http://localhost:5000/api/user/delete',{email,movieId:movie.id});
      dispatch(setMessage({type:"success",content:msg}))
      dispatch(getMyMovies(myMovies.filter(m=>m.id!==movie.id)))
    }catch(err) {
      dispatch(setMessage({type:"success",content:err.response.data.msg}));
    }
  }
  return (
    <Container onMouseEnter={()=>hoverHandler(movie.id)} onClick={clickHandler} onMouseLeave={()=>setIsClicked(false)}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt="poster"/>

        {isClicked && (
          
          <div currentTrailer={currentTrailer}  className={` ${!currentTrailer?.length?'absolute':"hover"}`}>
            <div className="image-video-container">
          {currentTrailer?.[0]?.key && <a href={`https://www.youtube.com/embed/${currentTrailer?.[0]?.key}`}><img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt="poster"/></a>}  
              
            {currentTrailer?.length>0 && <iframe  style={{"position":"absolute","top":"0","zIndex":"90"}} width="320" height="220" src={`https://www.youtube.com/embed/${currentTrailer[0].key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  }
            </div>
            <div className={`info-container flex column`}>
                 <a href={`https://www.youtube.com/embed/${currentTrailer?.[0]?.key}`}><h3 className="name">{movie.name}</h3></a> 
                 <div className="icons flex j-between">
                   <div className="controls flex">
                   {currentTrailer?.[0]?.key && <a href={`https://www.youtube.com/embed/${currentTrailer?.[0]?.key}`}> <IoPlayCircleSharp title="play"/></a>}  
                 <RiThumbUpFill title="like"/>
                 <RiThumbDownFill title="dislike"/>

                 {isLiked? <BsCheck onClick={unlikeMovie}  title="Remove from List"/>:<AiOutlinePlus onClick={addMovie}  title="plus"/>}
                   </div>
                
                   <div className="info">
                   <BiChevronDown title="more info"/>
                 </div>

                 </div>
                 <div className="genres flex">
              <ul className="flex">
                {movie.genres.map(genre=>{
                  return <li key={genre}>{genre}</li>
                })}
              </ul>
            </div>
                
            </div>

            

          </div>
        )}

       
    </Container>
  )
}

export default Card;


const Container=styled.div`
  max-width:230px;
  position:relative;
  cursor:pointer;
  
  img {
    width:100%;
    height:100%;
  }

  .hover {
    
    background:#181818;
    width:320px;
    position:relative;
    z-index:900;
    height:auto;

    .image-video-container {
      width:100%;
      position:relative;

      img {
        position:absolute;
        top:0;
        width:100%;
        height:220px;
        
      }
    }

    .info-container {
      padding:0.5rem;
      width:320px;
      background:black;
      position:absolute;
      bottom:0;

      .icons {
        .controls {
          display:flex;
          gap:8px;
        }
      }
      
      a {
        text-decoration:none;
        color:white;
        
      }
      
    }

  }

  .absolute {
    
    width:230px;
    z-index:10;
    position:absolute;
    left:50%;
    transform:translateX(-50%);
    background:#181818;


    .info-container {
      padding:0.5rem;
    }


  }

  a {
    text-decoration:none;
    color:white;
    
  }

  .icons {
    .controls {
      display:flex;
      gap:8px;
      svg {
        font-size:1.2rem;
        transition:0.3s ease-in-out;
        &:hover {
          color:#b8b8b8;
        }
      }
    }
  }


  .genres {
    ul {
      gap:1rem;
      flex-wrap:wrap;
      
      

      li {
        padding-right:0.7rem;
        &:first-of-type {
          list-style:none;
        }

        


      }
    }
  }



`