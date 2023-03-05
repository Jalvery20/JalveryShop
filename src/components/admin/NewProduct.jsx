import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Sidebar from "./Sidebar"
import {  toast,ToastContainer } from 'react-toastify';
import MetaData from "../layout/MetaData"
import {useNavigate} from "react-router-dom"

import { newProduct,clearErrors, NewProductReset } from '../../slices/product/newProduct';

const NewProduct = () => {

    const [name,setName]=useState("");
    const [price,setPrice]=useState(0);
    const [description,setDescription]=useState("")
    const [category, setCategory]=useState("")
    const [stock,setStock]=useState(0)
    const [seller,setSeller]=useState("");
    const [images,setImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])

  
    const categories=[
        "Appliances",
        "Cameras",
        "PC",
        "Headphones",
        "Food",
        "Books",
        "Clothes_Shoes",
        "Beauty_Health",
        "Sport",
        "Outdoor",
        "Home"
      ]

      const dispatch=useDispatch();
      const navigate=useNavigate();
      const {loading,error,success}=useSelector(state=>state.newProduct)
  
      useEffect(() => {
        if(error){
              toast.error(error,{
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  })
                  dispatch(clearErrors())
          }
        if(success){
            navigate("/admin/products")
            toast.success("Product created successfully",{
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
                dispatch({type:NewProductReset})
        
        
        }
      }, [dispatch,toast,navigate,error,success])
      const submitHandler=(e)=>{
        e.preventDefault();
    
        const formData=new FormData();
        formData.set("name", name)
        formData.set("price", price)
        formData.set("description", description)
        formData.set("category", category)
        formData.set("stock", stock)
        formData.set("seller", seller)

        images.forEach(image=>{
            formData.append("images",image)
        })
        dispatch(newProduct(formData))
      }
    
      const onChange=e=>{
        
        const files=Array.from(e.target.files)
        
        setImagesPreview([])
        setImages([])

        files.forEach(file=>{
            const reader=new FileReader();
    
            reader.onload=()=>{
                if(reader.readyState===2){
                    setImagesPreview(oldArray=>[...oldArray,reader.result])
                    setImages(oldArray=>[...oldArray,reader.result])
                }
            }
            reader.readAsDataURL(file)
       
        })
        
      }
    return (
        <>
        <MetaData title={"New Product"}/>
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

            <div className="col-12 col-md-10">
                <>
                <div className="wrapper "> 
        <form onSubmit={submitHandler} className="shadow mx-auto p-4 w-75" encType='multipart/form-data'>
            <h1 className="mb-4">New Product</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className="form-control" id="description_field" rows="8" ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="form-control" id="category_field">
                    {categories.map(category=>(
                        <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={(e)=>setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={(e)=>setSeller(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            multiple
                            onChange={onChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Images
                        </label>
                    </div>
                    {imagesPreview.map(img=>(
                        <img height="52" width="55" key={img} src={img} alt="Image Preview" className="mt-3 mr-2" />
                    ))}
            </div>

            <div className='w-100 text-center'>
            <button
              id="login_button"
              type="submit"
              className="btn  btn-primary mx-auto w-25  py-2 mt-3  font-weight-bold"
              disabled={loading?true:false}
            >
              CREATE
            </button>
            </div>
            

          </form>
    </div> 
                </>
            </div>
        </div>
    </>
  )
}

export default NewProduct