import React from "react";
import { Image } from "@imagekit/react";


const ImageElement = ({path , alt , className , h , w}) => {

  const imagekitUrl = `https://ik.imagekit.io/${
    import.meta.env.VITE_URL_IMAGEKIT_ID
  }`;
  return (
    <Image
      urlEndpoint={imagekitUrl}
      src={path}
      width={w}
      height={h}
      alt={alt}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20, blur: 10 }}
    />
  );
};

export default ImageElement;
