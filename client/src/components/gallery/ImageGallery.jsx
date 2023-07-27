import React, { useState, useEffect, useRef } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import lgRotate from "lightgallery/plugins/rotate";
import useFetch from "../../hooks/useFetch";
import Pagination from "../Pagination";

const ImageItem = ({ src, subHtml }) => (
  <a data-src={src} data-sub-html={subHtml} className="gallery-item" href={src}>
    <img
      className="w-[300px] h-[300px] m-6 object-cover"
      style={{ border: "10px solid #2e2e2e" }}
      src={src}
      alt=""
    />
  </a>
);

const ImageGallery = ({ initialURL }) => {
  const [URL, setURL] = useState(initialURL);
  const { data, isLoading, error } = useFetch(URL);
  const [currentPage, setCurrentPage] = useState(1);

  const galleryContainerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setURL(URL.replace(/(page=)\d+/, `$1${pageNumber}`));
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mx-auto mt-8" ref={galleryContainerRef}>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error && "Error Occurred!"}</div>
      ) : (
        data && (
          <>
            <LightGallery plugins={[lgZoom, lgVideo, lgRotate]} mode="lg-fade">
              {data?.images.map((image, index) => (
                <ImageItem key={index} src={image.link} subHtml={image.key} />
              ))}
            </LightGallery>
          </>
        )
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ImageGallery;
