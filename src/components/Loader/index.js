import React from "react";
import './styles.css'

const Loader = () => {
  return (
    <div className="container-loader">
      <div className="spinner-border text-white" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;