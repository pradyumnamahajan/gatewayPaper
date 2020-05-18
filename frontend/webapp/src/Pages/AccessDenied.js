import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const AccessDenied = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: " #FF0000",
        flexDirection: "column",
      }}
    >
      <FaTimesCircle style={{ fontSize: "50vh" }} />
      <div style={{ fontSize: "8vh" }}>Access Denied</div>
    </div>
  );
};

export default AccessDenied;
