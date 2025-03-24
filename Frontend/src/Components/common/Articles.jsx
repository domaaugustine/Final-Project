import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
// import { VscAccount } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function Articles() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState('');
  const [filteredArticles,setFilteredArticles]=useState(null);
  // const [filter]
  const navi=useNavigate();
  const {getToken}=useAuth();
  //get all articles
  async function getArticles() {
    // get token
    const token =await getToken()
    
    let res = await axios.get('http://localhost:3000/author-api/articles',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    console.log(res.data.message, res.data.payLoad)
    if (res.data.message) {
      setArticles(res.data.payLoad)
    } else {
      setError(res.data.message);
    }
  }
  useEffect(() => {
    //get request
    getArticles();
  }, [])

  function handleFilter(e){
    console.log(e);
    const filterArticle=articles.filter((ele)=>{return ele.category===e})
    setFilteredArticles(filterArticle)
  }
  return (
    <div className='container'>
      
      <div className='d-flex flex-start dropdown'>
  <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Category
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className="dropdown-item" style={{cursor:"pointer"}} onClick={()=>handleFilter("programming")} >Programming</li>
    <li className="dropdown-item" style={{cursor:"pointer"}} onClick={()=>handleFilter("AI&ML")} >AI & ML</li>
    <li className="dropdown-item" style={{cursor:"pointer"}} onClick={()=>handleFilter("database")}>Data Base </li>
  </ul>
</div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          {
            filteredArticles!=null
            ?
            <>
            {
                filteredArticles.map((articleObj) => {
                  return <div className="col g-4" key={articleObj.articleId}>
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="author-details text-end">
                          <img src={articleObj.authorData.profileImageUrl} width="40px" className='rounded-circle' alt="" />
    
                          <p className='text-secondary'>{articleObj.authorData.firstName}</p>
                          <small className='text-secondary'>{articleObj.authorData.nameOfAuthor}</small>
                        </div>
                        <h5 className='text-start card-title mt-3'>{articleObj.title}</h5>
                        <p className='card-text text-start'>
                          {articleObj.content.substring(0, 80) + "......"}
                        </p>
                        <div className='text-end'>
                        <button className="btn btn-primary text-start" onClick={()=>{navi(`../${articleObj.articleId}`,{state:articleObj})}} > Read more</button>
                        </div>
                      </div>
                      <div className="card-footer p-2">
                    <small className='d-block'>Last-Modified: {articleObj.dateOfModification}</small>
    
                      </div>
    
                    </div>
                  </div>
                })
            }
            </>
            :
            <>
            {
            articles.map((articleObj) => {
              return <div className="col g-4" key={articleObj.articleId}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="author-details text-end">
                      <img src={articleObj.authorData.profileImageUrl} width="40px" className='rounded-circle' alt="" />

                      <p className='text-secondary'>{articleObj.authorData.firstName}</p>
                      <small className='text-secondary'>{articleObj.authorData.nameOfAuthor}</small>
                    </div>
                    <h5 className='text-start card-title mt-3'>{articleObj.title}</h5>
                    <p className='card-text text-start'>
                      {articleObj.content.substring(0, 80) + "......"}
                    </p>
                    <div className='text-end'>
                    <button className="btn btn-primary text-start" onClick={()=>{navi(`../${articleObj.articleId}`,{state:articleObj})}} > Read more</button>
                    </div>
                  </div>
                  <div className="card-footer p-2">
                <small className='d-block'>Last-Modified: {articleObj.dateOfModification}</small>

                  </div>

                </div>
              </div>
            })
          }
            </>
          }
        </div>
    </div>
  )
}

export default Articles