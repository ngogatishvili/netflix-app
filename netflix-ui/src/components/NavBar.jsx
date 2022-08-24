import React, { useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {FaPowerOff, FaSearch} from 'react-icons/fa';
import {signOut,onAuthStateChanged} from "firebase/auth"
import {firebaseAuth} from "../utils/firebase-config"
import { useSelector } from 'react-redux';



const NavBar = ({isScrolled}) => {
  const navigate=useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  
 
  const links = [
    {name: 'Home', link: '/'},
    {name: 'TV shows', link: '/tv'},
    {name: 'Movies', link: '/movies'},
    {name: 'My List', link: '/mylist'},
  ];

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
        if(!user) {
          navigate("/login")
        }
    })
  },[navigate]);

 
  return (
    <Container>
      <nav className={` flex ${isScrolled ? 'scrolled' : ''}`}>
        <div className='left flex a-center'>
          <div className='brand'>
            <Link to="/"><img src={logo} alt='logo' /></Link>
          </div>
          <ul className='links flex'>
            {links.map(({name, link}) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='right flex a-center'>
          <div className={`search ${showSearch ? 'show-search' : ''}  `}>
            <button onFocus={()=>setShowSearch(true)} onBlur={()=>{
              if(!inputHover) {
                setShowSearch(false);
              }
            }}>
            <FaSearch/>
            </button>
            <input    type="text" placeholder="Search..." onMouseEnter={()=>setInputHover(true)} onMouseLeave={()=>setInputHover(false)} onBlur={()=>{
              setInputHover(false);
              setShowSearch(false);
            }}/>
          </div>
          <button onClick={()=>signOut(firebaseAuth)}>
            <FaPowerOff/>
          </button>
        </div>
      </nav>
    </Container>
  );
};

export default NavBar;

const Container = styled.div`
  .scrolled {
    background-color:black;
  }

  nav {
    position:sticky;
    top:0;
    height:6.5rem;
    width:100%;
    justify-content:space-between;
    align-items:center;
    position:fixed;
    z-index:2;
    padding:0 4rem;
    transition:0.3s ease-in-out;



    .left {
      gap:2rem;
      .brand {
        img {
          height:4rem;
        }
      }
      .links {
        list-style-type:none;
        gap:2rem;

        li {
          a {
            text-decoration:none;
            color:white;
          }
        }
      }
    }

    .right {
      gap:1rem;
      button {
        background:transparent;
        border:none;
        cursor:pointer;
        &:focus {
          outline:none;
        }
        svg {
          color:#f34242;
          font-size:1.2rem;

        }
      }
      .search {
        display:flex;
        gap:0.4rem;
        align-items:center;
        justify-content:center;
        padding:0.2rem;
        padding-left:0.5rem;

        button {
          svg {
            color:white;
          }
        }
        
      }
      
      input {
        width:0;
        opacity:0;
        visibility:hidden;
        border:none;
        transition:all 0.4s ease-in-out;
        background:transparent;
        color:white;
        &:focus {
          outline:none;
        }
      }

      .show-search {
        border:1px solid white;
        background:rgba(0,0,0,0.6);
        input {
          width:100%;
          opacity:1;
          visibility:visible;
          padding:0.3rem;
          
        }
      }
    }
  }
`;
