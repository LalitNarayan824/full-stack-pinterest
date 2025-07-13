import React, { useEffect } from 'react'
import './postPage.css'
import ImageElement from '../../components/image/Image'
import PostInteractions from '../../components/postInteractions/PostInteractions'
import {Link, useNavigate, useParams} from 'react-router'
import Comments from  '../../components/comments/Comments'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../utils/apiRequest'
import useAuthStore from '../../utils/authStore'


const PostPage = () => {
  const {currentUser} = useAuthStore()
  const navigate = useNavigate();

  const {id}= useParams();
  const {isPending , error , data} = useQuery({
    queryKey:["pin" , id],
    queryFn:()=>apiRequest.get(`/api/pins/${id}`).then((res)=>res.data.pin),
  });

  useEffect(() => {
      if (!currentUser) {
        navigate("/auth");
      }
    }, [currentUser, navigate]);



  if(isPending) return "Loading..."

  if(error) return "an error has occured" + error.message

  if(!data) return "no pin found"

  // console.log(data);
  // console.log(id , "   "  , data._id)
  return (
    <div className='postPage'>
      <ImageElement path='/general/backarrow.svg' className='icon' alt='' />
      <div className="postContainer">
        <div className="postImage">
         <ImageElement path={data.media} w={736} alt='pin' />
        </div>
        <div className="postDetails">
          <PostInteractions id={id}/>
          <Link to={`/${data.user?.username || ""}`} className='postUser' >
            <ImageElement path={ data.user?.img || '/general/noAvatar.png'}/>
            <span>{data.user?.displayName || ""}</span>
            
          </Link>
          {data.title ? <p className='title'>{data.title}</p> : null}
          {data.description ? <p className='desc'>{data.description}</p> : null}
          <Comments pinId={data._id}/>
        </div>
      </div>
    </div>
  )
}

export default PostPage
