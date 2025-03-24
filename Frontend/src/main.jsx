import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import UserAuthorContext from './Contexts/UserAuthorContext.jsx'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom' 
import App from './App.jsx'
import Root from './Components/Root.jsx'
import Home from './Components/common/Home.jsx'
import Signin from './Components/common/Signin.jsx'
import Signup from './Components/common/Signup.jsx'
import ArticleByID from './Components/common/ArticleByID.jsx'
import Articles from "./Components/common/Articles.jsx"
import UserProfile from './Components/user/UserProfile.jsx'
import AuthorProfile from './Components/author/AuthorProfile.jsx'
import PostArticle from './Components/author/PostArticle.jsx'
import AdminProfile from './Components/admin/AdminProfile.jsx';
import UserAuthorsDetails from './Components/admin/UserAuthorsDetails.jsx';
// import Profile from './Components/common/Profile.jsx';




const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<Root/>,
    children:[
      {
         path:"",
         element:<Home/>
      },
      {
        path:"signup",
        element:<Signup/>
      },{
        path:"signin",
        element:<Signin/>
      },
      {
          path:"admin-profile/:email",
          element:<AdminProfile/>
          ,children:[
            {
              path:"articles",
              element:<Articles/>
            },
            {
              path:":articleId",
              element:<ArticleByID/>
            }
            ,{
              path:"user-authors",
              element:<UserAuthorsDetails/>
            }
            ,
            {
              path:"",
              element:<Navigate to="articles"/>
            }
        ]
      },
      {
        path:"user-profile/:email",
        element:<UserProfile/>
        ,children:[
          {
            path:"articles",
            element:<Articles/>
          },
          {
            path:":articleId",
            element:<ArticleByID/>
          }
          ,
          {
            path:"",
            element:<Navigate to="articles"/>
          }
        ]
      },
      {
        path:"author-profile/:email",
        element:<AuthorProfile/>
        ,children:[
          {
            path:"articles",
            element:<Articles/>
          },
          {
            path:":articleId",
            element:<ArticleByID/>
          },
          {
            path:"",
            element:<Navigate to="articles"/>
          },
          {
            path:"article",
            element:<PostArticle/>
          }
        ]
      }
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <UserAuthorContext>
  <RouterProvider router={browserRouterObj}/>
  </UserAuthorContext>
  </StrictMode>
  ,
)
