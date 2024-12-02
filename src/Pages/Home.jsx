import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { fetchProducts } from '../Redux/slice/productSlice'
import Header from '../Components/Header'
import { addToWishList } from '../Redux/slice/wishlistSlice'
import { addToCart } from '../Redux/slice/cartSlice'





function Home() {
const dispatch = useDispatch()
const{allproducts,loading,error}=useSelector(state=>state.productReducer)
const {wishlist} = useSelector(state=>state.wishListReducer)
const cart = useSelector((state)=>state.cartReducer)


useEffect(()=>{
  dispatch(fetchProducts())
},[])

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
    <Header insideHome/>
    <div style={{marginTop:"10px"}} className='container-fluid'>
  {  

  loading?<div className='text-center mt-5'>
    <Spinner animation="border" variant="info" />

  </div>:
    <Row>
        { allproducts?.length>0?allproducts.map(product=>(
    <Col key={product?.id}>  
    <Card style={{ width: '18rem' }} className='m-3'>
    <Link to={`/view/${product?.id}`}><Card.Img variant="top" width={"100%"} src={product?.thumbnail} />
    </Link>
    <Card.Body>
      <Card.Title className='text-danger fw-bolder'>{product?.title.slice(0,10)}...</Card.Title>
      <Card.Text>
      {product?.description.slice(0,20)}
      </Card.Text>
      <div className='d-flex justify-content-between'>
      <Button className='btn btn-light'> <i class="fa-solid fa-heart text-danger" onClick={()=>handleWishlist(product)}></i></Button>
      <Button className='btn btn-light'><i class="fa-solid fa-cart-shopping text-warning" onClick={()=>handleCart(product)}></i></Button>

      </div>
      
      
    </Card.Body>
  </Card></Col>
        )):<p className='text-danger'>Nothing to display</p>
}
      </Row>}
    </div>
    </>
  )
}

export default Home
