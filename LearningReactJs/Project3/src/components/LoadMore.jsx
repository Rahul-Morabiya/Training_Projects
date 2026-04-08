import React from 'react'
import { useState,useEffect } from 'react'

const LoadMore = () => {
    const [loading,setLoading] = useState(false);
    const [products,setProducts]=useState([]);
    const [count,setCount]=useState(0);
    const [errorMsg,setErrorMsg]=useState("");
    const [disableBtn,setDisableBtn]=useState(false);

    async function fetchProducts(){
        try{
            setLoading(true);
            const response=await fetch(`https://dummyjson.com/products?limit=20&skip=${count===0?0:count*20}`);
            const result=await response.json();
            if(result && result.products && result.products.length>0)setProducts((prev)=>[...prev,...result.products]);
            console.log(result.products);
            setLoading(false);
        }
        catch(e){
            setErrorMsg(e.message);
            console.log(e.message);
        }
    }

    function handleBtnClick(){
        setCount(count+1);
    }

    useEffect(()=>{
        fetchProducts();
    },[count]);

    useEffect(()=>{
        if(products && products.length>100){
            setDisableBtn(true);
        }
    },[products]);

    if(loading){
        return (<div>{<h3>Loading</h3>}</div>);
    }

  return (
    <div className='container' style={{
        display:'flex',
        flexWrap:'wrap',
        gap:'20px',
    }}>
      <button disabled={disableBtn} onClick={handleBtnClick}>Press for Loading more data</button>
        {disableBtn ? (<div>Button Disabled</div>):null}
        {products.map((product,idx)=>{
            return(<div style={{
                height:'70px',
                width:'70px'
            }} key={idx}>
                <img style={{height:'50px',width:'50px'}} src={product.images[0]} alt="" />
            </div>)
        })}
        
    </div>
  )
}

export default LoadMore
