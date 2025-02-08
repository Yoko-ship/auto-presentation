import React, { useEffect, useRef, useState } from "react";
import Reveal from "reveal.js";
import "./css/present.css";

function PresentMaker(props) {
  const revealRef = useRef(null);
  const revealInstance = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideDescription, setCurrentSlideDescription] = useState(0);
  const [currentSlideImage, setCurrentSlideImage] = useState(0);
  useEffect(() => {
    if (revealRef.current && !revealInstance.current) {
      revealInstance.current = new Reveal(revealInstance);
      revealInstance.current.initialize({
        embedded: true,
        controlsTutorial: false,
        controlsLayout: "edges",
        progress: true,
        controls: true,
        slideNumber: true,
        transition: "fade",
      });
      revealInstance.current.on("slidechanged", (event) => {
        setCurrentSlide(event.indexh);
        setCurrentSlideDescription(event.indexh);
        setCurrentSlideImage(event.indexh);
      });
    }

    const handleVisibility = () => {
      if (!document.hidden && revealInstance.current) {
        revealInstance.current.layout();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (props.action) {
    var initialItems = [
      { id: 1, text: props.action.presentationTitle, x: 150, y: -300 },
      { id: 2, text: props.action.slides[0].title, x: 150, y: -300 },
      { id: 3, text: props.action.slides[1].title, x: 150, y: -300 },
      { id: 4, text: props.action.slides[2].title, x: 150, y: -300 },
      { id: 5, text: props.action.slides[3].title, x: 150, y: -300 },
      { id: 6, text: props.action.slides[4].title, x: 150, y: -300 },
      { id: 7, text: props.action.slides[5].title, x: 150, y: -300 },
      { id: 8, text: props.action.slides[6].title, x: 150, y: -300 },
      { id: 9, text: props.action.slides[7].title, x: 150, y: -300 },
    ];
    var initialDescriptions = [
      {
        id: 1,
        text: props.action.presentationTitle,
        x: 150,
        y: -300,
      },
      {
        id: 2,
        text: props.action.slides[0].description,
        x: 150,
        y: -150,
      },
      { id: 3, text: props.action.slides[1].description, x: 150, y: -150 },
      { id: 4, text: props.action.slides[2].description, x: 150, y: -150 },
      { id: 5, text: props.action.slides[3].description, x: 150, y: -150 },
      { id: 6, text: props.action.slides[4].description, x: 150, y: -150 },
      { id: 7, text: props.action.slides[5].description, x: 150, y: -150 },
      { id: 8, text: props.action.slides[6].description, x: 150, y: -150 },
      { id: 9, text: props.action.slides[7].description, x: 150, y: -150 },
    ];
  } else {
    var initialItems = [
      { id: 1, text: props.action.presentationTitle, x: 20, y: 30 },
      { id: 2, text: "", x: 50, y: 50 },
      { id: 3, text: "", x: 200, y: 50 },
      { id: 4, text: "", x: 300, y: 50 },
      { id: 5, text: "", x: 400, y: 50 },
      { id: 6, text: "", x: 500, y: 50 },
      { id: 7, text: "", x: 600, y: 50 },
      { id: 8, text: "", x: 700, y: 50 },
      { id: 9, text: "", x: 800, y: 50 },
    ];
    var initialDescriptions = [
      { id: 1, text: "", x: 250, y: -50 },
      { id: 2, text: "", x: 250, y: -50 },
      { id: 3, text: "", x: 250, y: -50 },
      { id: 4, text: "", x: 250, y: -50 },
      { id: 5, text: "", x: 250, y: -50 },
      { id: 6, text: "", x: 250, y: -50 },
      { id: 7, text: "", x: 250, y: -50 },
      { id: 8, text: "", x: 250, y: -50 },
    ];
  }
  //* for titles
  const [titles, setTitles] = useState(initialItems);
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, id) => {
    const item = titles.find((t) => t.id === id);
    if (!item) return;
    setDragging(id);
    setOffset({
      x: e.clientX - item.x,
      y: e.clientY - item.y,
    });
  };

  useEffect(() => {
    if (dragging === null) return;

    const handleMouseMove = (e) => {
      setTitles((prevTitles) =>
        prevTitles.map((title) =>
          title.id === dragging
            ? { ...title, x: e.clientX - offset.x, y: e.clientY - offset.y }
            : title
        )
      );
    };
    const handleMouseUp = () => {
      setDragging(null);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  //* for description
  const [description, setDescription] = useState(initialDescriptions);
  const [descriptionDragging, setDescriptionDragging] = useState(null);
  const [descriptionOffset, setDescriptionOffset] = useState({ x: 0, y: 0 });

  const handleMouseDownDescription = (e, id) => {
    const item = description.find((el) => el.id === id);
    if (!item) return;
    setDescriptionDragging(id);
    setDescriptionOffset({
      x: e.clientX - item.x,
      y: e.clientY - item.y,
    });
  };

  useEffect(() => {
    if (descriptionDragging === null) return;

    const handleMouseMoveDescription = (e) => {
      setDescription((prevElements) =>
        prevElements.map((descrb) =>
          descrb.id === descriptionDragging
            ? {
                ...descrb,
                x: e.clientX - descriptionOffset.x,
                y: e.clientY - descriptionOffset.y,
              }
            : descrb
        )
      );
    };

    const handleMoveUpDescription = () => {
      setDescriptionDragging(null);
    };

    document.addEventListener("mousemove", handleMouseMoveDescription);
    document.addEventListener("mouseup", handleMoveUpDescription);

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveDescription);
      document.removeEventListener("mouseup", handleMoveUpDescription);
    };
  }, [descriptionDragging, descriptionOffset]);

  //* for images
  if (props.imageOne) {
    var initialImages = [
      { id: 1, img: "", x: 200, y: -200 },
      { id: 2, img: props.imageOne, x: 200, y: -200 },
      { id: 3, img: "", x: 200, y: -200 },
      { id: 4, img: props.imageSecond, x: 200, y: -200 },
      { id: 5, img: "", x: 200, y: -200 },
      { id: 6, img: props.imageThird, x: 200, y: -200 },
      { id: 7, img: "", x: 200, y: -200 },
      { id: 8, img: props.imageFourth, x: 200, y: -200 },
      { id: 9, img: "", x: 200, y: -200 },
    ];
  } else {
    var initialImages = [
      { id: 1, img: "", x: 200, y: -400 },
      { id: 3, img: "", x: 200, y: -400 },
    ];
  }

  const [images, setImages] = useState(initialImages);
  const [imageDragging, setImageDragging] = useState(null);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });

  const handleMouseDownImages = (e, id) => {
    const item = images.find((el) => el.id === id);
    if (!item) return;
    setImageDragging(id);
    setImageOffset({
      x: e.clientX - item.x,
      y: e.clientY - item.y,
    });
  };
  useEffect(() => {
    if (imageDragging === null) return;

    const handleMouseMoveImage = (e) => {
      setImages((prevImages) =>
        prevImages.map((image) =>
          image.id === imageDragging
            ? {
                ...image,
                x: e.clientX - imageOffset.x,
                y: e.clientY - imageOffset.y,
              }
            : image
        )
      );
    };
    const handleMouseUpImage = () => {
      setImageDragging(null);
    };
    document.addEventListener("mousemove", handleMouseMoveImage);
    document.addEventListener("mouseup", handleMouseUpImage);

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveImage);
      document.removeEventListener("mouseup", handleMouseUpImage);
    };
  }, [imageDragging, imageOffset]);

  return (
    <>
      <div className="reveal" ref={revealRef}>
        <div className="slides">
          {titles.map((title, index) => (
            <section key={index}>
              {currentSlide === index && (
                <>
                  <h3
                    key={title.id}
                    suppressContentEditableWarning="true"
                    contentEditable="true"
                    className="title"
                    onMouseDown={(e) => handleMouseDown(e, title.id)}
                    style={{
                      position: "absolute",
                      top: title.y,
                      left: title.x,
                      cursor: "grab",
                      userSelect: "none",
                      fontSize: 15,
                    }}
                  >
                    {title.text}
                  </h3>
                  {description.map((descrb, index) => (
                    <>
                      {currentSlideDescription === index && (
                        <>
                          <p
                            key={descrb.id}
                            contentEditable="true"
                            suppressContentEditableWarning="true"
                            onMouseDown={(e) =>
                              handleMouseDownDescription(e, descrb.id)
                            }
                            style={{
                              position: "absolute",
                              top: descrb.y,
                              left: descrb.x,
                              cursor: "grab",
                              userSelect: "none",
                              fontSize: 17,
                            }}
                          >
                            {descrb.text}
                          </p>
                          {images.map((image, index) => (
                            <>
                              {currentSlideImage === index && (
                                <img
                                  src={image.img}
                                  key={image.id}
                                  onMouseDown={(e) =>
                                    handleMouseDownImages(e, image.id)
                                  }
                                  style={{
                                    position:"relative",
                                    top:image.y,
                                    left:image.x,
                                    cursor:"grab",
                                    userSelect:'none',
                                  }}
                                ></img>
                              )}
                            </>
                          ))}
                        </>
                      )}
                    </>
                  ))}
                </>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default PresentMaker;
