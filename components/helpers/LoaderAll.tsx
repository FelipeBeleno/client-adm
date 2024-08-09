import Loader from "@/public/svgs/Loader";
import React from "react";

const LoaderAll = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
      }}
    >
      <Loader />
    </div>
  );
};

export default LoaderAll;
