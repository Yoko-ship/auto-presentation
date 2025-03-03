import React from "react";

function Grid({ examples,click}) {
  return (
    <>
    {examples.map((example,index) => (
        <div className="grid" key={index}>
          <p onClick={() => click(example)}>{example}</p>
        </div>
      ))}
    </>
      
  );
}

export default Grid;
