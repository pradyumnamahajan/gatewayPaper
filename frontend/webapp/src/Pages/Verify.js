import React from "react";
import Axios from "axios";
import QrReader from "react-qr-reader";

const Verify = ({ history }) => {
  const handleScan = async (qrData) => {
    console.log("QR code detected");
    if (qrData) {
      let { data } = await Axios.post("/verify", { data: qrData });
      if (data.status === "success") {
        history.push("/accessGranted");
      } else {
        history.push("/accessDenied");
      }
    }
  };

  const handleError = (err) => {
    console.log(err);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>TOTP based Gateway Entry System</div>
      <QrReader
        delay={1000}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "50%" }}
      />
    </div>
  );
};

export default Verify;
