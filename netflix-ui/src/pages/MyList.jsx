import React, {useState} from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchMovies, getGenres, getMyMovies} from '../store/store';
import {onAuthStateChanged} from 'firebase/auth';
import {firebaseAuth} from '../utils/firebase-config';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';
import NotFound from "../assets/NotFound.svg";
import Card from '../components/Card';

const MyList = () => {
  const [email, setEmail] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myMovies=useSelector(state=>state.netflix.movies);
  const message=useSelector(state=>state.netflix.message);

  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setEmail(user.email);
      }
    });
  }, [navigate]);

  useEffect(()=>{
    if(message) {
      if(message.type==="success") {
        toast.success(message.content)
      }else{
        toast.error(message.content)
      }
    }
  })

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        const {data} = await axios.get(
          `http://localhost:5000/api/user/liked/${email}`
        );
        

        if(!data.msg) {
            dispatch(getMyMovies(data));
        }

      } catch (err) {
        toast.error(err.response.data.msg);
      }
    };
    fetchLikedMovies();
  }, [email,dispatch]);

 

  return (
    <Container>
      <div className='nav-bar'>
        <NavBar isScrolled={isScrolled} />
      </div>
      <div className="content flex column">
          <h1>My List</h1>
          <div>
              {myMovies.length? (
                  <div className='grid flex'>
                      {myMovies.map((movie,index)=>{
                          return <Card  key={movie.id} index={index} movie={movie} isLiked/>
                      })}
                  </div>
              ) :(
                  <div className="not-Found">
                    <img src={NotFound} alt="notFound"/>
                  </div>
              ) }
          </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default MyList;

const Container = styled.div`
    .content {
        gap:3rem;
        margin-top:8rem;
        
       
       
        h1 {
            margin-left:5rem;
        }

        .grid {
            flex-wrap:wrap;
            gap:1rem;
            margin-left:5rem;
        }


    }

    .not-Found {
        width:100vw;
        height:100vh;
        img {
            width:100%;
            height:70%;
            object-fit:contain;

        }
    }
`;
