import React from 'react'

import {Link} from "react-router-dom"

import HomeAppliances from "../../../assets/img/home-appliances.jpg"
import Camera from "../../../assets/img/camera.jpg"
import PCs from "../../../assets/img/pc.jpg"
import HeadPhones from "../../../assets/img/headphones.png"
import Food from "../../../assets/img/food.jpg"
import Books from "../../../assets/img/book.jpg"
import Clothes from "../../../assets/img/clothes.jpg"
import Beauty from "../../../assets/img/beauty.jpg"
import Sports from "../../../assets/img/sport-equipment.jpg"
import OutDoor from "../../../assets/img/outdoor.jpg"
import Home from "../../../assets/img/home.jpg"
import SmartWatch from "../../../assets/img/watch.jpg"

const categories=[
    ["Appliances",HomeAppliances],
    ["Cameras",Camera],
    ["Smart Watch",SmartWatch],
    ["PCs",PCs],
    ["Headphones",HeadPhones],
    ["Food",Food],
    ["Books",Books],
    ["Clothes/Shoes",Clothes],
    ["Beauty/Health",Beauty],
    ["Sports Equipment",Sports],
    ["Outdoor",OutDoor],
    ["Home ",Home]
  ]

const Categories = () => {
  return (
    <div className="container-fluid pt-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Categories</span></h2>
        <div className="row px-xl-5 pb-3">
            {categories.map(category=>(
                <Link to={`/shop/search/${category[0]}`} key={category[0]} className="col-lg-3 col-md-4 col-sm-6 pb-1">
                
                    <div className="cat-item d-flex align-items-center mb-4">
                        <div className="overflow-hidden" style={{width: "100px", height: "100px"}}>
                            <img className="img-fluid" src={category[1]} alt={category[0]} />
                        </div>
                        <div className="flex-fill pl-3">
                            <h6>{category[0]}</h6>
                        </div>
                    </div>
            </Link>
            ))}
            
            
        </div>
    </div>
  )
}

export default Categories