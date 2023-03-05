import React,{useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {useNavigate} from "react-router-dom"

const Search = ({history}) => {

  const [keyword,setKeyword]=useState("")
  const navigate=useNavigate();

  const searchHandler =(e)=>{
    e.preventDefault()  
    if(keyword.trim()){
        navigate(`/shop/search/${keyword}`)
    } else{
        navigate("/")
    }
  } 
  return (

    <form onSubmit={searchHandler} >
                    <div className="input-group">
                        
                        <input onChange={(e)=>setKeyword(e.target.value)} type="text" className="form-control" placeholder="Search for products"/>
                        <div className="input-group-append">
                                <button className='btn btn-outline-warning bg-transparent btn-sm'>
                                  <i className="fa fa-search"></i>
                                </button>   
                        </div>
                    </div>
    </form>
  )
}

export default Search