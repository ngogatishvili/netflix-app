import React,{useState} from 'react'
import Card from './Card'
import styled from "styled-components";
import { useRef } from 'react';
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"
import { useEffect } from 'react';

const CardSlider = ({title,data}) => {
    const [showControls,setShowControls]=useState(false);
    const listRef=useRef();
    const [sliderPosition,setSliderPosition]=useState(0);

  

    
    

    const handleDirection=(direction,offSet)=>{

      if(direction==="right"&&offSet>=-1400) {
          listRef.current.style.transform=`translateX(${offSet}px)`;
          setSliderPosition(offSet)
          console.log(sliderPosition)
      }


      if(direction==="left"&&offSet<=0) {
        listRef.current.style.transform=`translateX(${offSet}px)`;
        setSliderPosition(offSet)
        
      }
            

     
      



    } 
  return (
    <Container className="flex column" onMouseEnter={()=>setShowControls(true)} onMouseLeave={()=>setShowControls(false)}>
      <h1>{title}</h1>
      <div className="wrapper">
        <div className={`slider-action-left ${!showControls?"none":""} flex j-center a-center`} onClick={()=>handleDirection("left",sliderPosition+200)}>
            <AiOutlineLeft/>
        </div>
        <div className="flex slider" ref={listRef}>
     {data.map((movie,index)=>{
        return <Card movie={movie} index={index} key={movie.id}/>
    })}
     </div>
     <div className={`slider-action-right ${!showControls?"none":""} flex j-center a-center`} onClick={()=>handleDirection("right",sliderPosition-200)}>
            <AiOutlineRight />
        </div>
      </div>
     
    
    </Container>
  )
}

export default CardSlider;


const Container=styled.div`

    gap:1.8rem;
    padding:4.5rem 0;

    h1 {
      margin-left:50px;
    }



    .wrapper {
      position:relative;
      .slider {
        padding:0 1rem;
        width:max-content;
        gap:1rem;
        transform:translateX(0px);
        margin-left:50px;
        transition:0.4s ease-in-out;
      }

      .slider-action-left {
        z-index:800;
        transition:all 0.3s ease-in-out;
        cursor:pointer;
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        left:2rem;
        svg {
          font-size:2rem;
         
        }
      }

      .slider-action-right {
        z-index:800;
        transition:all 0.3s ease-in-out;
        cursor:pointer;
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        right:2rem;
        svg {
          font-size:2rem;
         
        }
      }
    }
  .none {
    display:none;
  }
`
