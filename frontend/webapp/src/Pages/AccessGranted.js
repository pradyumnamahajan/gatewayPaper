import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const AccessGranted = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: " #00FF00",
        flexDirection: "column",
      }}
    >
      <FaCheckCircle style={{ fontSize: "50vh" }} />
      <div style={{ fontSize: "8vh" }}>Access Granted</div>
    </div>
  );
};

export default AccessGranted;
