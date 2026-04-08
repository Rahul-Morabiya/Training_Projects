import React from "react";
import { useState, useEffect } from "react";

const ImageSlider = ({ url, limit, page = 1 }) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleNext() {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function handlePrevious() {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
        console.log(data);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
    console.log(images);
  }, [url, page, limit]);

  if (loading) {
    return <div>Loading Data</div>;
  }

  if (errorMsg !== null) {
    return <div>Error Occured! {errorMsg}</div>;
  }

  return (
    <div
      className="container"
      style={{
        display: "flex",
        gap: "30px",
        flexWrap: "wrap",
        height: "100vh",
        width: "100vw",
      }}
    >
      (
      <div
        className="item"
        style={{
          display: "flex",
          height: "50px",
          width: "50px",
        }}
      >
        <img src={images[currentSlide]?.download_url} alt="" />
      </div>
      )
      <button
        className=""
        style={{
          color: "white",
          background: "orange",
          height: "20px",
          width: "40px",
        }}
        onClick={handlePrevious}
      >
        Previous
      </button>
      <button
        className=""
        style={{
          color: "white",
          background: "orange",
          height: "20px",
          width: "40px",
        }}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default ImageSlider;
