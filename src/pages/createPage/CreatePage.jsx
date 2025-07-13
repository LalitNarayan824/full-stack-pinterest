import React, { useEffect, useRef, useState } from "react";
import "./createPage.css";
import ImageElement from "../../components/image/Image";
import useAuthStore from "../../utils/authStore";
import { useNavigate } from "react-router";
import apiRequest from "../../utils/apiRequest";

const CreatePage = () => {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const formRef = useRef()
  const [userBoards, setUserBoards] = useState([]);
  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);


  useEffect(() => {
    const fetchBoards = async () => {
      if (currentUser && !userBoards.length) {
        try {
          const res = await apiRequest.get(`/api/boards/${currentUser._id}`);
          setUserBoards(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchBoards();
  }, [currentUser, userBoards.length]);

  const previewImgUrl = file ? URL.createObjectURL(file) : null;

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData(formRef.current);
    

    try {
      const res = await apiRequest.post('/api/pins', formData , {
        headers:{
          "Content-Type":"multipart/form-data",
        },
      })

      console.log(res);
      navigate(`/pin/${res.data._id}`);


    } catch (error) {
      
    }
  }

  return (
    <div className="createPage">
      
      <div className="createBottom">
        <h1>Create Pin</h1>
        {previewImgUrl ? (
          <label htmlFor="file" className="previewImg">
            <img src={previewImgUrl} />
          </label>
        ) : (
          <label htmlFor="file" className="upload">
            <div className="uploadTitle">
              <ImageElement
                path="/general/upload.svg"
                alt=""
                className="icon"
              />
              <span>Paste or Drag to upload your image</span>
            </div>
            <div className="uploadInfo">
              We recommend using high quality .jpg files less than 5MB in size
            </div>
          </label>
        )}
        <form ref={formRef} className="createForm" onSubmit={handleSubmit}>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            name="media"
            
            hidden
          />
          <div className="formItem">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="Add a title"
              name="title"
              id="title"
            />
          </div>
          <div className="formItem">
            <label htmlFor="description">Description:</label>
            <textarea
              rows={6}
              type="text"
              placeholder="Add a detailed description"
              name="description"
              id="description"
            />
          </div>
          <div className="formItem">
            <label htmlFor="link">Link:</label>
            <input type="text" placeholder="Add a link" name="link" id="link" />
          </div>
          <div className="formItem">
            <label htmlFor="board">Board:</label>
            <select name="board" id="board">
              <option className="boardOption" value="">Choose a board</option>
              {userBoards && userBoards.map((board) => (
                  <option className="boardOption" key={board._id} value={board._id}>
                    {board.title}
                  </option>
                ))}
            </select>
          </div>
          <div className="formItem">
            <label htmlFor="tags">Tagged topics:</label>
            <input type="text" placeholder="Add tags" name="tags" />
            <small>Don't worry , people won't see your tags</small>
          </div>
        </form>
        <button onClick={() => formRef.current.requestSubmit()}>Publish</button>
      </div>
    </div>
  );
};

export default CreatePage;
