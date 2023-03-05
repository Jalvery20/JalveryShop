import React,{ useEffect,useState} from 'react'
import MetaData from "./layout/MetaData"
import Loader from "./layout/Loader"
import { useSelector,useDispatch } from "react-redux";
import {  toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from "react-router-dom"

import Slider from "rc-slider"
import "rc-slider/assets/index.css"

import {getProducts,clearErrors} from "../slices/product/products";
import Carousel from "./layout/Carousel"
import Features from './layout/Features';
import Categories from './layout/Categories';
import Products from './layout/Products';

const {createSliderWithTooltip}=Slider;
const Range=createSliderWithTooltip(Slider.Range)

const Home = () => {
  const {keyword}=useParams();

  
  const [currentPage,setCurrentPage]=useState(1)
  const [price,setPrice]=useState([1,1000])
  const [category,setCategory]=useState("")
  const [rating,setRating]=useState(0)

  

  const dispatch=useDispatch();
  
  const {loading, error}=useSelector(state=>state.products)
  
  useEffect(() => {
      
    window.scrollTo(0,0)
}, [])
  
  useEffect(()=>{ 
    dispatch(getProducts(keyword,currentPage,price,category,rating,""))

  },[dispatch,error,keyword,currentPage,price,category,rating])



  return (
    <>
      {loading ? <Loader/>: (

        <>
          <MetaData title={"Buy best Products Online"} />
              <Carousel />
              <Features />
              <Categories />
              <Products/>
      </>
        
        ) }
      
    </>
  )
}

export default Home