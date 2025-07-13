import React, { useEffect, useRef, useState } from "react";
import "./profilePage.css";
import ImageElement from "../../components/image/Image";
import Collections from "../../components/collections/Collections";
import Gallery from "../../components/gallery/Gallery";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/authStore";
import UserForm from "./UserForm";

const ProfilePage = () => {
  const [type, setType] = useState("saved");
  const [createBoard, setCreateBoard] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { currentUser } = useAuthStore();
  const createBoardFormRef = useRef();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { username } = useParams();

  useEffect(() => {
      if (!currentUser) {
        navigate("/auth");
      }
    }, [currentUser, navigate]);

  const handleCreateBoard = async (e)=>{
    e.preventDefault();
    try {
      const formData = new FormData(createBoardFormRef.current);
      createBoardmutation.mutate(formData);
      setCreateBoard(false);
    } catch (error) {
      console.log(error);
    }
  }

  const createBoardmutation = useMutation({
    mutationFn: async (formData) => {
      
      // console.log(formData);

      const result = await apiRequest.post('/api/boards' , formData)
      // console.log(result);
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", currentUser._id] });
    },
  });


  const mutation = useMutation({
    mutationFn: async (username) => {
      const res = await apiRequest.post(`/api/users/follow/${username}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });

  //  the primary use query to get the info about the user
  console.log(username)
  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () =>
      apiRequest.get(`/api/users/${username}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "an error has occured" + error.message;

  if (!data) return "no user found :(";

  // console.log(data);

  return (
    <div className="profilePage">
      {showUpdateModal && (
        <div className="updateModal">
          {/* form will be here */}
          <UserForm setShowUpdateModal={setShowUpdateModal} />
        </div>
      )}
      <ImageElement
        className="profileImg"
        path={data.img || "general/noAvatar.png"}
        alt=""
        h={100}
        w={100}
      />
      <div className="userdetail">
        <h1 className="profileName">{data.displayName}</h1>
        <span className="profileUsername">{data.username}</span>
      </div>
      <div className="follow">
        {data.followerCount} followers . {data.followingCount} followings
      </div>
      <div className="profileInteractions">
        <ImageElement path="/general/share.svg" alt="" className="icon" />
        <div className="profileButtons">
          {currentUser._id !== data._id ? (
            <>
              <button onClick={() => mutation.mutate(username)} id="follow">
                {data.isFollowing ? "Unfollow" : "Follow"}
              </button>
              <button id="message">Message</button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowUpdateModal((prev) => !prev)}
                id="follow"
              >
                Update
              </button>
              <button id="message"> See People</button>
            </>
          )}
        </div>
        <div
          onClick={() => setCreateBoard((prev) => !prev)}
          className="morediv"
          >
          <ImageElement path="/general/more.svg" alt="" className="icon" />
          </div>
          {createBoard && (
            <div className="createBoardDiv">
              <span>Create a Board:</span>
              <form className="createBoardForm" ref={createBoardFormRef} onSubmit={handleCreateBoard} >
                <input type="text" placeholder="title?" name="title" />
                <button type="submit">Create</button>
              </form>
              <b onClick={() => setCreateBoard((prev) => !prev)}>cancel</b>
            </div>
          )}
      </div>

      <div className="profileOptions">
        <span
          onClick={() => setType("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Saved
        </span>
      </div>
      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Collections userId={data._id} />
      )}
    </div>
  );
};

export default ProfilePage;
