// import React from "react";
// import { Spinner } from "react-bootstrap";

// const Loader = () => {
//   return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
//     <Spinner animation="border" variant="info" />;
//   </div>
// };

// export default Loader;
import React from "react";
import "./Loader.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
      <div className="loading-spinner">
      </div>
    </div>
  );
}