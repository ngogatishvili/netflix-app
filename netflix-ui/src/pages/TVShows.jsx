import React,{useState} from 'react'
import styled from "styled-components"
import NavBar from "../components/NavBar"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { useEffect } from 'react'
import { fetchMovies, getGenres, setMessage } from '../store/store'
import Slider from '../components/Slider'
import NotAvaliable from '../components/NotAvaliable'
import SelectGenre from '../components/SelectGenre'
import {onAuthStateChanged} from "firebase/auth"
import { firebaseAuth } from '../utils/firebase-config';
import {ToastContainer,toast} from "react-toastify";


const TVShows = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const genresLoaded=useSelector(state=>state.netflix.genresLoaded);
    const message=useSelector(state=>state.netflix.message);
    const genres=useSelector(state=>state.netflix.genres);
    const movies=useSelector(state=>state.netflix.movies);
    const [isScrolled,setIsScrolled]=useState(false);
    window.onscroll=()=>{
        setIsScrolled(window.pageYOffset===0?false:true);
        return ()=>{
          window.onscroll=null;
        } 
      }

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
          dispatch(getGenres())
      },[dispatch])

      useEffect(()=>{
          if(genresLoaded) {
            dispatch(fetchMovies({type:"tv"}))
          }
         
      },[dispatch,genresLoaded])
  return (
    <Container>
        <div className="nav-bar">
            <NavBar isScrolled={isScrolled}/>
        </div>
        <div className="data">
            <SelectGenre genres={genres} type="tv"/>
            {movies.length? <Slider movies={movies}/>:<NotAvaliable/>}
        </div>
        <ToastContainer/>
    </Container>
  )
}

export default TVShows;

const Container=styled.div`

    margin-top:7rem;

    .not-avaliable {
        text-align:center;
    }

`
