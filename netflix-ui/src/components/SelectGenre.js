import React from 'react'
import styled from "styled-components"
import {useDispatch} from "react-redux"
import {fetchDataByGenre} from "../store/store"


const SelectGenre = ({genres,type}) => {
        const dispatch=useDispatch();

  return (
   <Select className='flex' onChange={(e)=>dispatch(fetchDataByGenre({genre:e.target.value,type}))}>
       {genres.map(genre=>{
           return <option key={genre.id} value={genre.id}>{genre.name}</option>
       })}
   </Select>
  )
}

export default SelectGenre;

const Select=styled.select`
    padding:0.2rem 0.5rem;
    margin-left:5rem;
    cursor:pointer;
    font-size:1.4rem;
    background:rgba(0,0,0,0.4);
    color:white;
    

`

