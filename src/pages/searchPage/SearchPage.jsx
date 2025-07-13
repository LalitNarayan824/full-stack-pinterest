import React, { useEffect } from 'react'
import './searchPage.css'
import Gallery from '../../components/gallery/Gallery'
import { useNavigate, useSearchParams } from 'react-router'
import useAuthStore from '../../utils/authStore'

const SearchPage = () => {

  const {currentUser} = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
      if (!currentUser) {
        navigate("/auth");
      }
    }, [currentUser, navigate]);

  const [searchParams]= useSearchParams();
  const search = searchParams.get("search")
  const boardId = searchParams.get("boardId")

  return (
    <Gallery  search={search} boardId={boardId}  />
  )
}

export default SearchPage
