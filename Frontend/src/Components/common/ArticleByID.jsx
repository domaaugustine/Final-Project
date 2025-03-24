import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserAuthorContextObj } from '../../Contexts/UserAuthorContext';
import { useContext } from 'react';
import { FaEdit } from 'react-icons/fa'
import { MdRestore } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useAuth} from '@clerk/clerk-react'

function ArticleByID() {
  // to give update of comments
  const [commentAdded,setCommentAdded]=useState(false);
  const {getToken}=useAuth()
  // to get data from navigate
  const { state } = useLocation()
  const navi=useNavigate()
  // to enable editing
  const [editArticleStatus, setEditArticleStatus] = useState(false);
  // importing context
  const { currentUser } = useContext(UserAuthorContextObj);
  // to register form
  const {register,handleSubmit,formState:{errors}}=useForm()
  const [currentArticle,setCurrentArticle]=useState();

// to save modify article
async function onSave(modifiedArticle){
  const token=await getToken();
  const articleAfterChanges={...state,...modifiedArticle};
  const currentDate=new Date()
  // add date for modification
  articleAfterChanges.dateOfModification=currentDate.getDate()+'-'+currentDate.getMonth()+'-'+currentDate.getFullYear()+'-'+currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  // http post request
  const res=await axios.put(`http://localhost:3000/author-api/article/${articleAfterChanges.articleId}`,articleAfterChanges
    // ,{
    //   headers:{
    //        Authorization:`Bearer ${token}`
    // }
  // }
  )
  if(res.data.message){
    setEditArticleStatus(false)
    navi(`/author-profile/articles/${state.articleId}`,{state:articleAfterChanges})
  }
}

// function delete
async function deleteArticle(){
  console.log("i am in delete");
  state.isArticleActive=false;
  // console.log(state);
  let res=await axios.put(`http://localhost:3000/author-api/article/${state.articleId}`,state)
  console.log(res.data);
  if(res.data.message===true){
    // console.log("data: ",res.data.payLoad)
    setCurrentArticle(res.data.payLoad)
  }
}
// function torestore
async function restoreArticle(){
  console.log("i am in restoreArticle")
  state.isArticleActive=true;
  //  console.log(state);
  let res=await axios.put(`http://localhost:3000/author-api/article/${state.articleId}`,state)
  console.log(res.data);
  if(res.data.message===true){
    // console.log("data: ",res.data.payLoad)
    setCurrentArticle(res.data.payLoad)
  }
}
async function handleComments(commentObj){
  console.log(state)

  const cObj={
    nameOfUser:currentUser.firstName,
    comment:commentObj.comment
  }
  console.log(cObj)
  const res=await axios.put(`http://localhost:3000/user-api/comment/${state?.articleId}`,cObj)
  console.log("comment msg is: ",res.data.message)
  if(res.data.message=='comment added'){
    setCommentAdded(true)
  }
}

  return (
    <div className='container'>
      {
        editArticleStatus === true
          ?
          <form className='container mt-5' onSubmit={handleSubmit(onSave)}>
            {/* <h3 className='text-center'>Edit Form</h3> */}
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              defaultValue={state.title}
              {...register('title')}      
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="form-label">
              Select a category
            </label>
            <select
            
              id="category"
              className="form-select"
              defaultValue={state.category}
              {...register('category')}
            >
              <option value="programming">Programming</option>
              <option value="AI&ML">AI&ML</option>
              <option value="database">Database</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
             
              className="form-control"
              id="content"
              rows="10"
              defaultValue={state.content}
              {...register('content')}

            ></textarea>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
          :
          <>
          <div style={{boxShadow:'1px 1px 2px 1px gray',borderRadius:"10px"}}>
            <div className="d-flex justify-content-between" style={{boxShadow:'1px 1px 6px gray',borderRadius:"10px"}}>
              <div className="mb-2 w-100 px-4 py-3 rounded-2 d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-start display-6 mt-2" style={{fontWeight:"500"}}>{state.title}</p>
                  {/* date of creation and date of moodification */}
                  <span className="m-0 d-flex flex-column text-start text-secondary">
                    <small>
                      Created On: {state.dateOfCreation}
                    </small>
                    <small>
                      Last Modified On: {state.dateOfModification}
                    </small>
                  </span>
                </div>
                <div className="div author-details text-center">
                  <img src={state.authorData.profileImageUrl} width="40px" className='rounded-circle mt-3' alt="" />
                  <p className='mt-1'>{state.authorData.nameOfAuthor}</p>
                </div>
              </div>
              {
                currentUser.role === 'author'|| currentUser.role === 'admin' &&
                <div className='d-flex me-3'>
                  {
                     currentUser.role === 'author'&& <button className="me-2 btn" style={{border:"none"}} onClick={() => { setEditArticleStatus(true) }}>
                     <FaEdit className='text-warning fs-5' style={{width:"24px",height:"24px"}}/>
                   </button>
                  }
                 
                  {
                    state.isArticleActive === true ? (
                      <button className="me-2 btn" style={{border:"none"}} onClick={deleteArticle}>
                        <MdDelete className='text-danger fs-5' style={{width:"24px",height:"24px"}} />
                      </button>
                    ) :
                      (<button className="me-2 btn" style={{border:"none"}} onClick={restoreArticle}>
                        <MdRestore className='text-info fs-5'style={{width:"24px",height:"24px"}}/>
                      </button>)
                  }
                </div>
              }
            </div>
            {
              state?.isArticleActive===true?<><p className='lead mt-3 article-content p-5' style={{ whiteSpace: 'pre-line' }}>{state.content}</p></>:<div><p className='mt-3 p-3 text-danger'>Aricle is inActive,Restore to view the content</p></div> 
            }
            </div>
            <div className='text-start mt-5'>
              <h3>Comments</h3>
              <div className="comments mt-4">
                {
                  state.comments.length === 0 ? <>No comments yet...</>
                    :
                    state.comments.map(cobj => {
                      return <div key={cobj} className='mt-3'>
                        <h5 className='user-name m-0'>{cobj?.nameOfUser}</h5>
                        <p className='comment m-0 text-secondary'>
                          {cobj?.comment}
                        </p>
                      </div>
                    })
                }
              </div>
            </div>
            {
              commentAdded==true?<>Comment added</>:<></>
            }

            {/* if role is  user,then allow to write comments */}
            {
              currentUser.role==='user'&&
                <form className="form mt-3 d-flex flex-column gap-3" onSubmit={handleSubmit(handleComments)}>
                  <input name="comment" id="comment" className='p-3 form-control' {...register('comment',{required:true,minLength:16})} placeholder='write a comment here..'/>
                  {
                    errors?.comment?.type==='required'&& <p className='text-danger m-1 text-start'>*commnet cannot be empty.</p>
                  }
                   {
                    errors?.comment?.type==='minLength'&& <p className='text-danger m-1 text-start'>*mininum 4 words required each of length 4 characters.</p>
                  }
                  <button className=' btn btn-outline-success' style={{width:"145px"}}>add Comment</button>
                  
                </form>
            }
          </>

      }

    </div>
  )
}

export default ArticleByID