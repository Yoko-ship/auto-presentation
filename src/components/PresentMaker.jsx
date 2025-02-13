import React, { useEffect, useRef} from "react";
import Reveal from "reveal.js";
import "./css/present.css";
import PptxGenJS from "pptxgenjs";
import firstImage from "../assets/23_afcas12.jpg";
import secondImage from "../assets/59276.jpg";
import thirdImage from "../assets/patrick-tomasso-QMDap1TAu0g-unsplash.jpg";
import fourthImage from "../assets/v915-wit-010-a.jpg";

function PresentMaker(props) {
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
    let presentationData = props.action;
    presentationData.slides.forEach((slideData, index) => {
      let slide = pres.addSlide();
      if (props.backgroundImage === "1") {
        slide.background = { path: firstImage };
      } else if (props.backgroundImage === "2") {
        slide.background = { path: secondImage };
      } else if (props.backgroundImage === "3") {
        slide.background = { path: thirdImage };
      } else if (props.backgroundImage === "4") {
        slide.background = { path: fourthImage };
      } else {
        slide.background = { path: thirdImage };
      }
      slide.addText(slideData.title, {
        x: 1.5,
        y: 0.5,
        w: "80%",
        color: "363636",
        fill: { color: "F1F1F1" },
        align: pres.AlignH.center,
        fontFace: "Arial",
        fontSize: 25,
      });
      slide.addText(slideData.description, {
        x: 1.5,
        y: 2.8,
        w: "80%",
        margin: 1,
        color: "363636",
        fill: { color: "F1F1F1" },
        align: pres.AlignH.center,
        fontSize: 18,
        fontFace: "Arial",
      });
    });
    pres.writeFile({ fileName: "Presentation.pptx" });
  };

  let informations = props.action;

  return (
    <>
      {informations ? (
        <>
          <div className="dowload">
            <button onClick={dowloading}><p>Cкачать</p></button>
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
      ):(
        <p>test</p>
      )}
    </>
  );
}

export default PresentMaker;
