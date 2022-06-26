 import React, { useState} from "react";
import ClockLoader from "react-spinners/ClockLoader";
import "./Loader.css";

const Loader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return <div style={{display: 'flex', justifyContent: 'center', marginTop:"10%", width: '100%', height: '100vh'}}>
    <ClockLoader animation="border" size={70} loading={loading}  color={"#36D7B7"} variant="info" />
  </div>
};

export default Loader;
// import React from "react";
// import ClockLoader from "react-spinners/ClockLoader";

// import "./Loader.css";

// export default function LoadingSpinner() {
//   return (
//     <ClockLoader
//      color={"36D7B7"}
//        size={150} />

//     // <div className="spinner-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
//     //   <div className="loading-spinner">
//     //   </div>
//     // </div>
//   );
// }