import React from "react";
import "./galleryItem.css";
import { Link } from "react-router";
import { useState } from "react";
// import { Image } from "@imagekit/react";
import ImageElement from "../image/Image";

const GalleryItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const optimisedHeight = (372 * item.height) / item.width;
  
  return (



    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      {/* <img src={item.media} alt="galleryitem" /> */}
      {/* <Image
        urlEndpoint={imagekitUrl}
        src={item.media}
        width={372}
        className="galleryimage"
        loading="lazy"
        lqip={{ active: true, quality: 20, blur: 10 }}
      /> */}
      <ImageElement path={item.media} className='galleryimage'  w='372'   alt=''   />

      <Link to={`/pin/${item._id}`} className="overlay">
        {" "}
      </Link>
      <button className="saveButton">Save</button>
      <div className="overLayIcons">
        <button className="overLayButtons">
          <img src="general/share.svg" alt="share" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpen((prev) => !prev);
          }}
          className="overLayButtons"
        >
          <img src="general/more.svg" alt="more" />
        </button>
        {open && (
          <div className="userOptions">
            <div className="userOption">
              <ImageElement path="/general/heart.svg" alt="" />
              See more like this
            </div>
            <div className="userOption">
              <ImageElement path="/general/dislike.svg" alt="" />
              See less like this
            </div>
            <div className="userOption">
              <ImageElement path="/general/download.svg" alt="" />
              Download
            </div>
            <div className="userOption">
              <ImageElement path="/general/report.svg" alt="" />
              Report
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryItem;
