import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'


function App() {
    const [results, setresults] = useState({});
    const [sortedArr, setsortedArr] = useState([]);
    const sortData = () =>{
      let resArr = Object.keys(results.products).map((productkey) => ([productkey, parseInt(results.products[productkey].popularity)] ));
      resArr.sort((first, second) => (second[1] - first[1]  ));
      setsortedArr(resArr.map((e) => (e[0])));
    }

    useEffect(()=>{
      axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json')
      .then(res=>{setresults(res.data)})
    },[])

    useEffect(()=>{
      if(results.products){
        sortData()
      }
    },[results])

    if(Object.keys(results).length>0){
      return (
        <div className='main-container'>
          <div className='header'>
            <h1>Electronics.</h1>
            <p>Here are the products listed based on their popularity</p>
          </div>
            
            <div id="all-products-container">
              {sortedArr.map(el=>(
                <div className='one-product-container' key={`electronics_${el}`}>
                  <div style={{display:'flex',alignItems:'center', gap:'1rem'}}>
                    <div className={`product-category ${results.products[el].subcategory}`}>{results.products[el].subcategory}</div>
                    <div className='product-popularity'>Popularity #{results.products[el].popularity}</div>
                  </div>
                  <div className='product-title'>{results.products[el].title}</div>
                  
                  <div className='product-price'>Rs. {results.products[el].price}</div>
                  
                </div>
              ))}
            </div>
            
        </div>
      )
    }else{
      return(<div className='loader'>Loading...</div>)
    }
  
}

export default App
