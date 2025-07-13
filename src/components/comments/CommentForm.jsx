import React from "react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import apiRequest from "../../utils/apiRequest.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addComment = async (comment) => {
  const res = await apiRequest.post("/api/comments", comment);
  return res.data;
};

const CommentForm = ({ pinId }) => {
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + emoji.emoji);
    setOpen((prev) => !prev);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", pinId] });
      setDesc("");
      setOpen(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ description: desc, pinId: pinId });
    // console.log(res.data);
  };

  return (
    <form onSubmit={handleSubmit} className="commentForm">
      <input
        type="text"
        placeholder="thoughts here"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <div className="emoji">
        <span
          onClick={() => setOpen((prev) => !prev)}
          role="img"
          aria-label="emoji"
          className="emoji"
        >
          😊
        </span>
        {open && (
          <div className="emojiPicker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
