import React, { useRef } from "react";
import "./profilePage.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../../utils/authStore";
import apiRequest from "../../utils/apiRequest";
import { useNavigate } from "react-router";

const UserForm = ({ setShowUpdateModal }) => {
  const navigate = useNavigate();
  const updateFormRef = useRef();
  const { currentUser, updateCurrentUser } = useAuthStore();
  console.log(currentUser);
  const handleCloseButton = (e) => {
    e.preventDefault();
    setShowUpdateModal((prev) => !prev);
  };
  const handleUpdateForm = (e) => {
    e.preventDefault();
    const formData = new FormData(updateFormRef.current);
    console.log("form data sent");
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);

    mutation.mutate(formData);
    console.log("my=uttion done");
    
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await apiRequest.patch(`/api/users/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      updateCurrentUser(res.data);
      console.log(res);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", currentUser.username],
      });
      setShowUpdateModal(false);
      navigate(`/${currentUser.username}`)
    },
  });
  console.log(currentUser);

  return (
    <form className="form" ref={updateFormRef} onSubmit={handleUpdateForm}>
      <div className="formItemsx">
        <label htmlFor="displayName">Display Name :</label>
        <input
          type="text"
          placeholder="..display name "
          id="displayName"
          name="displayName"
        />
      </div>
      <div className="formItemsx">
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          placeholder="..User name "
          id="username"
          name="username"
        />
      </div>
      <div className="formItemsx">
        <label htmlFor="email">Email:</label>
        <input type="text" placeholder="..email " id="email" name="email" />
      </div>

      <div className="formItemsx">
        <label htmlFor="profilePicture">Profile Picture :</label>
        <input type="file" id="profilePicture" name="img" />
      </div>
      <div className="buttonsdiv">
        <button type="submit" className="submit">
          Submit
        </button>
        <button onClick={handleCloseButton} className="closeButton">
          {" "}
          close{" "}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
