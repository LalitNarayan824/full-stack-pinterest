import "./comments.css";
import ImageElement from "../image/Image";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { format } from "timeago.js";
import CommentForm from "./CommentForm";
import useAuthStore from "../../utils/authStore";

// const deleteComment = async (comment) => {
//   const res = await apiRequest.delete("/api/comments", comment);
//   return res.data;
// };

const Comments = ({ pinId }) => {
  const { currentUser } = useAuthStore();
  // console.log(currentUser);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (commentId) => {
      const res = await apiRequest.delete(`/api/comments/${commentId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", pinId] });
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", pinId],
    queryFn: () =>
      apiRequest.get(`/api/comments/${pinId}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "an error has occured" + error.message;

  if (!data) return "no comments for now :(";

  // console.log(data);
  // console.log(error)

  

  return (
    <div className="comments">
      <span className="commentCount">
        {data.length === 0 ? "No Comments" : data.length + " Comments"}
      </span>
      <div className="commentList">
        {data.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="commentDetails">
              <ImageElement
                path={comment.user.img || "/general/noAvatar.png"}
              />

              <div className="commentContent">
                <span className="commentUser">{comment.user.displayName}</span>
                <p className="commentDesc">{comment.description}</p>
                <span className="commentTime">{format(comment.createdAt)}</span>
              </div>
            </div>
            <div>
              {currentUser._id === comment.user._id && (
                <b onClick={() => mutation.mutate(comment._id)} className="deleteComment">Del</b>
              )}
            </div>
          </div>
        ))}

        {/*  a single comment starts */}
        {/* <div className="comment">
          <ImageElement path="/general/noAvatar.png" />
          <div className="commentContent">
            <span className="commentUser">John Doe</span>
            <p className="commentDesc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Incidunt, neque.
            </p>
            <span className="commentTime">1hr ago</span>
          </div>
        </div> */}
        {/* a single comment ends */}
      </div>

      {/* input form for comment */}
      <CommentForm pinId={pinId} />
    </div>
  );
};

export default Comments;
