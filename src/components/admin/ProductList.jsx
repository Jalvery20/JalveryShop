import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Sidebar from "./Sidebar"
import {  toast } from 'react-toastify';
import MetaData from "../layout/MetaData"
import {Link,useNavigate} from "react-router-dom"

import {MDBDataTable} from "mdbreact"
import Loader from "../layout/Loader"

import { getAdminProducts,clearErrors } from '../../slices/product/products';
import { deleteProduct, DeleteProductReset } from '../../slices/product/newProduct';


const ProductList = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loading,error,products}=useSelector(state=>state.products)
    const {error:deleteError,isDeleted}=useSelector(state=>state.newProduct)
    
    useEffect(() => {
        dispatch(getAdminProducts())

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
        if(deleteError){
            toast.error(deleteError,{
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
        if(isDeleted){
            toast.success("Product Deleted successfully ",{
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
                navigate("/admin/products")
                dispatch(clearErrors())
                dispatch({type:DeleteProductReset})
        }
    }, [dispatch,toast,error,deleteError,isDeleted,navigate])

    const setProducts=()=>{
        const data={
            columns:[
                {
                    label:"ID",
                    field:"id",
                    sort:"asc"
                },
                {
                    label:"Name",
                    field:"name",
                    sort:"asc"
                },
                {
                    label:"Price",
                    field:"price",
                    sort:"asc"
                },
                {
                    label:"Stock",
                    field:"stock",
                    sort:"asc"
                },
                {
                    label:"Actions",
                    field:"actions",
                }

            ],
            rows:[]
        }

        products.forEach(product=>{
            data.rows.push({
                id:product._id,
                name:product.name,
                price:`$${product.price}`,
                stock:product.stock,
                actions: <> 
                        <Link className='btn btn-primary py-1 px-2' to={`/admin/product/${product._id}`}>
                            <i className='fa fa-pen'></i>
                        </Link>   
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=>deleteProductHandler(product._id)}>
                            <i className='fa fa-trash'></i>
                        </button>  
                        </>   
            })
        })

        return data
    }

    const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id))
    }
  return (
    <>
        <MetaData title={"All Products"}/>
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

            <div className="col-12 col-md-10">
                <>
                    <h1 className="my-5">All Products</h1>
        
                    {loading? <Loader/>:
                    <>
                     <MDBDataTable
                        data={setProducts()}
                        className="px-3"
                        bordered
                        striped
                        hover/>
                    </>}
                </>
            </div>
        </div>
    </>
  )
}

export default ProductList