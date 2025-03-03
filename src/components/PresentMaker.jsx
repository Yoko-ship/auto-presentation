import React, { useEffect, useRef,useContext } from "react";
import Reveal from "reveal.js";
import "./css/present.css";
import PptxGenJS from "pptxgenjs";
import firstImage from "../assets/23_afcas12.jpg";
import secondImage from "../assets/59276.jpg";
import thirdImage from "../assets/patrick-tomasso-QMDap1TAu0g-unsplash.jpg";
import fourthImage from "../assets/v915-wit-010-a.jpg";
import PresentationContext from "../store/PresentationContext";
import { PresentContext } from "../store/PresentationContext";
function PresentMaker() {

  const {name,secondName,action,selectedImage} = useContext(PresentContext)
  const revealRef = useRef(null);
  const revealInstance = useRef(null);

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

  //* presentation

  const dowloading = () => {
    let pres = new PptxGenJS();
    pres.theme = { headFontFace: "Arial Light" };
    pres.theme = { bodyFontFace: "Arial" };
    let presentationData = action;
    let background;
    const firstSlide = pres.addSlide();
    if (selectedImage === "1") {
      background = firstSlide.background = { path: firstImage };
    } else if (selectedImage === "2") {
      background = firstSlide.background = { path: secondImage };
    } else if (selectedImage === "3") {
      background = firstSlide.background = { path: thirdImage };
    } else if (selectedImage === "4") {
      background = firstSlide.background = { path: fourthImage };
    } else {
      background = firstSlide.background = { path: thirdImage };
    }
    firstSlide.addText(action.presentationTitle, {
      x: 1.5,
      y: 0.5,
      w: "80%",
      color: "363636",
      fill: { color: "F1F1F1" },
      fontFace: "Times New Roman",
      fontSize: 23,
    });
    firstSlide.addText(`${secondName } ${name}`,{
      x: 2.5,
      y: 5,
      w: "80%",
      color: "363636",
      fill: { color: "F1F1F1" },
      fontFace: "Times New Roman",
      fontSize: 23,
    });

    presentationData.slides.forEach((slideData, index) => {
      let slide = pres.addSlide();
      slide.background = background;
      slide.addText(slideData.title, {
        x: 1.5,
        y: 0.5,
        w: "80%",
        color: "363636",
        fill: { color: "F1F1F1" },
        align: pres.AlignH.center,
        fontFace: "Times New Roman",
        fontSize: 23,
      });
      slide.addText(slideData.description, {
        x: 1.5,
        y: 3,
        w: "80%",
        margin: 1,
        color: "363636",
        fill: { color: "F1F1F1" },
        align: pres.AlignH.center,
        fontSize: 17,
        fontFace: "Times New Roman",
      });
    });
    pres.writeFile({ fileName: "Presentation.pptx" });
  };

  let informations = action;

  return (
    <>
      <PresentationContext>
        {informations ? (
          <>
            <div className="dowload">
              <button onClick={dowloading}>
                <p>Cкачать</p>
              </button>
            </div>
            <div className="reveal" ref={revealRef}>
              <div className="slides">
                {informations.slides.map((infoData, index) => (
                  <section key={index}>
                    <h2>{infoData.title}</h2>
                    <p>{infoData.description}</p>
                  </section>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p></p>
        )}
      </PresentationContext>
    </>
  );
}

export default PresentMaker;
