import React from "react";
import notFoundStyles from "./not-found.module.css";

// Страница не найдена
export const PageNotFound = () => { 



  return (
    <>
      <h1>404</h1>

      <div className={notFoundStyles.frame}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={notFoundStyles.caps}><img src="http://ademilter.com/caps.png" alt="" /></div>
      <canvas id="canvas"></canvas>
    </>
  )
}

export default PageNotFound;
