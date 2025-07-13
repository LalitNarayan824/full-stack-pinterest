import React, { useRef, useState } from "react";
import "./postInteractions.css";
import ImageElement from "../image/Image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/authStore";

const PostInteractions = ({ id }) => {
  const { currentUser } = useAuthStore();
  const [openBoards, setOpenBoards] = useState(false);
  const [userBoards, setUserBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("")

  const savePinFormRef = useRef()

  const handleSaveButton = async () => {
    setOpenBoards((prev) => !prev);
    if(!userBoards.length ){
      try {
        console.log("fecthing boards")
        const res = await apiRequest.get(`/api/boards/${currentUser._id}`);
      setUserBoards(res.data);
      } catch (error) {
        console.log(error);
      }

    } 
  };
  // issue ye hai ki mere paas koi boards hai nhi abhi , 
  // console.log(userBoards)
  // console.log(currentUser)

  const handleSavePin = async (e)=>{
    e.preventDefault();
    try {
      const formData = new FormData(savePinFormRef.current);
      const result = await apiRequest.post(`/api/pins/save/${id}` , formData);
      console.log(result);
      setOpenBoards(false);

    } catch (error) {
      console.log(error)
    }
    
  }

  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
  };

  // for liking the post
  const queryClient = useQueryClient();

  const likemutation = useMutation({
    mutationFn: async (id) => {
      const res = await apiRequest.put(`/api/pins/like/${id}`);
      // console.log(res);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interactionCheck", id] });
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["interactionCheck", id],
    queryFn: async () => {
      const res = await apiRequest.get(`/api/pins/checkInteractions/${id}`);
      return res.data;
    },
  });

  if (isPending) return "Loading...";
  if (error) return "ther is some error";
  // console.log(data);

  return (
    <div className="postInteractions">
      <div className="InteractionIcons">
        <div onClick={() => likemutation.mutate(id)} className="reaction">
          {data.isLiked ? (
            <ImageElement path="/general/redheart.png" className="icon" />
          ) : (
            <ImageElement path="/general/heart.svg" className="icon" />
          )}
          <span>{data.likeCount}</span>
        </div>
        <ImageElement path="/general/share.svg" className="icon" />
        <ImageElement path="/general/more.svg" className="icon" />
      </div>
      {currentUser && (
        <div className="savediv">
          <button onClick={handleSaveButton}>Save</button>
          {openBoards && (<>
            <form className="selectBoardForm" onSubmit={handleSavePin} ref={savePinFormRef} >
              <select value={selectedBoard} onChange={handleBoardChange} name="board">
                <option value="">Select a board</option>
                {userBoards && userBoards.map((board) => (
                  <option key={board._id} value={board._id}>
                    {board.title}
                  </option>
                ))}
              </select>
              <div>
                <button type="submit">Save</button>
                <button className="closebtn" onClick={()=>setOpenBoards(prev=>!prev)}>close</button>
              </div>

              
            </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostInteractions;
