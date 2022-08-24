import React from 'react'
import { useState } from 'react'
import NavBar from '../components/NavBar';
import BackGroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import {FaPlay} from "react-icons/fa"
import {AiOutlineInfoCircle} from "react-icons/ai"
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import {getGenres, fetchMovies, setMessage} from "../store/store";
import { useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux"
import Slider from '../components/Slider';
import {onAuthStateChanged} from "firebase/auth"
import { firebaseAuth } from '../utils/firebase-config';
import {ToastContainer,toast} from "react-toastify";


const Netflix = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const genresLoaded=useSelector(state=>state.netflix.genresLoaded);
  const message=useSelector(state=>state.netflix.message);
  const movies=useSelector(state=>state.netflix.movies);
  const [isScrolled,setIsScrolled]=useState(false);

  

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
        if(!user) {
          navigate("/login")
        }
    })
  },[navigate]);

  useEffect(()=>{
    if(message) {
      if(message.type==="success") {
          toast.success(message.content)
      }else{
        toast.error(message.content)
      }

      
      
    }
    setTimeout(()=>{
      dispatch(setMessage(null))
  },8)
  },[message,dispatch]);

  useEffect(()=>{
    dispatch(getGenres());
  },[dispatch])

  useEffect(()=>{
    if(genresLoaded) {
      dispatch(fetchMovies({type:"all"}))
    }
  },[dispatch,genresLoaded])

  window.onscroll=()=>{
    setIsScrolled(window.pageYOffset===0?false:true);
    return ()=>{
      window.onscroll=null;
    } 
  }
  return (
    <Container>
      <NavBar isScrolled={isScrolled}/>
      <div className="hero">
        <img src={BackGroundImage} alt="background" className="background-image"/>
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="movie-logo"/>

          </div>
          <div className="buttons flex">
            <a className="play" href="https://www.youtube.com/watch?v=_VN4ncpwglU"><button  className='flex j-center a-center'>
              <FaPlay/> Play
            </button></a>
            <button className='flex j-center a-center'>
              <AiOutlineInfoCircle/> More Info
            </button>
          </div>
        </div>

      </div>
      <Slider movies={movies}/>
      <ToastContainer/>
    </Container>
  )
}

export default Netflix;


const Container=styled.div`
    background-color:black;
    .hero {
      position:relative;

      .background-image {
        filter:brightness(60%);
        height:100vh;
        width:100vw;
      }

      .container {
        position:absolute;
        bottom:5rem;

        .logo {
          img {
            width:100%;
            height:100%;
            margin-left:5rem;
          }
        }

        .buttons {
          margin:5rem;
          gap:2rem;
          button {
            font-size:1.4rem;
            gap:1rem;
            border-radius:0.2rem;
            padding:0.5rem;
            padding-left:2rem;
            padding-right:2.4rem;
            border:none;
            cursor:pointer;
            transition:0.3s ease-in-out;
            &:hover {
              opacity:0.8;

            }

            &:nth-of-type(2) {
              background-color:rgba(109,109,110,0.7);
              color:white;
              svg {
                font-size:1.8rem;
              }
            }
          }
        }

        



      }
    }

    .play {
      text-decoration:none;
    }
`

