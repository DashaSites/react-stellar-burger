import React from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    
      <div>
        <div>
          <Link to="/login">
            LOGIN PAGE
          </Link>
          <Link to="/not-existing-page">NOT EXISTING PAGE</Link>
          </div>
        HOME
      </div>
    
  )

}