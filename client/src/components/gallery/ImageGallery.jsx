import React, { useState, useEffect, useRef } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import lgRotate from "lightgallery/plugins/rotate";
import useFetch from "../../hooks/useFetch";
import Pagination from "../Pagination";
import Limits from "../Limit";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const { data, isLoading, error } = useFetch(URL, limit === 10);

  const galleryContainerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setURL(URL.replace(/(page=)\d+/, `$1${pageNumber}`));
    setCurrentPage(pageNumber);
  };

  const handleLimitChange = (limitNumber) => {
    setURL(URL.replace(/(limit=)\d+/, `$1${limitNumber}`));
    setLimit(limitNumber);
  };

  const handleScroll = async (e) => {
    if (limit !== 10) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const pos = document.documentElement.scrollTop;
    console.log(scrollHeight, innerHeight + pos + 1);

    try {
      if (innerHeight + pos + 1 >= scrollHeight) {
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (limit === 10) {
      window.addEventListener("scroll", handleScroll);
    } else {
    }
  }, [limit]);

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
      <div className="flex justify-around items-center px-4">
        <div className="w-[200px]">
          <Limits handleLimitChange={handleLimitChange} limit={limit} />
        </div>
        {limit !== 10 && (
          <div className="flex-grow">
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages || 1}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
