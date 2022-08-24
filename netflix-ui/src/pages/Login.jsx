import React,{useState} from 'react'
import styled from "styled-components";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth"
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"

const Login = () => {
  const navigate=useNavigate();
  const [formValues,setFormValues]=useState({
    email:"",
    password:""
})

const handleLogin=async()=>{
  const {email,password}=formValues;
  try{
    await signInWithEmailAndPassword(firebaseAuth,email,password);
  }catch(err) {
    console.log(err);
  }
}

useEffect(()=>{
  onAuthStateChanged(firebaseAuth,(user)=>{
    if(user) {
      navigate("/")
    }
  })
},[navigate])
  return (
    <Container>
      <BackgroundImage/>
      <div className="content">
        <Header/>
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
            <input type='email' placeholder='Emal address' name='email' value={formValues.email} onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})}/>
             <input type='password' placeholder='Password' name='password' value={formValues.password} onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})} /> 
             <button onClick={handleLogin}>Log In</button> 
            </div>

          </div>
        </div>
      </div>

    </Container>
  )
}

export default Login;


const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: 15% 85%;

    .form-container {
      gap:2rem;
      height:85vh;
      .form {
        padding:2rem;
        background-color:#000000b0;
        width:25vw;
        gap:2rem;
        color:white;
        .container {
          gap:2rem;

          input {
            padding:0.5rem 1rem;
            width:15rem;
            &:focus {
              outline:none;
            }
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }


      }
    }
    
  }
`;

