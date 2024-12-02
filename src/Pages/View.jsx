import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishList } from '../Redux/slice/wishlistSlice'


function View() {

  const {id}= useParams() //can handle path related informations from components
  const[product,setProduct]=useState({})
  const {wishlist} = useSelector(state=>state.wishListReducer)
  const cart = useSelector((state)=>state.cartReducer)

  const dispatch = useDispatch()

  useEffect(()=>{
    

      const allProducts=JSON.parse(localStorage.getItem("allProducts"))
      setProduct(allProducts?.find((item)=>item?.id==id))
  
     
  },[])
  console.log(product);
  
  const handleWishlist=(product)=>{
    const existingProduct = wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      alert("product already exist")
    }else{
      dispatch(addToWishList(product))
    }
  }
  const handleCart=(product)=>{
    const existingProduct = cart?.find(item=>item.id==product.id)
    if(existingProduct){
      alert("items added")
      dispatch(addToCart(product))
    }else{
      alert("item added")
      dispatch(addToCart(product))
    }
     
  }
  
  return (
    <>
          <Header/>

<div style={{marginTop:"100px"}}>
<div className="container mt-5 row">
        <div className="col-lg-4">
          <img src={product?.thumbnail} width={"100%"} alt="" />
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-6">
          <p>Pid:{product?.id}</p>
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h3>Price:<span>${product?.price}</span></h3>
        
        <div className="d-flex justify-content-between">
          <Button className='btn btn-outline-dark' onClick={()=>handleWishlist(product)}><i class="fa-solid fa-heart text-danger"></i>Wishlist</Button>
          <Button className='btn btn-outline-light' onClick={()=>handleCart(product)}><i class="fa-solid fa-cart-shopping text-warning"></i>Cart</Button>

        </div>
      </div>
      </div>
</div>

    </>
  )
}

export default View
