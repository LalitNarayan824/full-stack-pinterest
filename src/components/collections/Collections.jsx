import React from 'react'
import './collections.css'
import ImageElement from '../image/Image'
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';
import {format} from "timeago.js"
import { Link } from 'react-router';
const Collections = ({userId}) => {

  const {isPending , error , data} = useQuery({
    queryKey:["boards" , userId],
    queryFn:()=>apiRequest.get(`/api/boards/${userId}`).then((res)=>res.data),
  });

  if(isPending) return "Loading..."

  if(error) return "an error has occured" + error.message

  if(!data) return "no user found :("

  // console.log(userId)
  // console.log(data);

  return (
    <div className='collections'>
      {data?.map((board)=>(
        <Link to={`/search?boardId=${board._id}`} key={board._id} className='collection'>
        <ImageElement path={board.firstPin?.media || "/general/heart.svg"} alt='board Defimage' />
        <div className="collectionDetails">
          <h1>{board.title}</h1>
          <span>{board.pinCount}pins . {format(board.createdAt)}</span>
        </div>
      </Link>
      ))}


      {/*  one collections start */}
      {/* <div className='collection'>
        <ImageElement path='/pins/pin4.jpeg' alt=''/>
        <div className="collectionDetails">
          <h1>Minimal</h1>
          <span>12pins . 1w</span>
        </div>
      </div> */}
      
      
      
    </div>
  )
}

export default Collections
