import React from "react";
import Axios from "axios";
import QrReader from "react-qr-reader";
import { AiFillGithub } from "react-icons/ai";
import { IoIosPaper } from "react-icons/io";
import "./Styles.css";
import { Link } from "react-router-dom";

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
    <div className="verifyContainer">
      <div className="heading">TOTP based Authentication for Gateway Entry System</div>
      <QrReader
        delay={1000}
        onError={handleError}
        onScan={handleScan}
        showViewFinder={false}
        className="qr"
      />
      <div className="links">
        <div className="linksChildren">
          <a href="https://github.com/pradyumnamahajan/gatewayPaper">
            <AiFillGithub size="2rem" />
          </a>
          <a href="https://github.com/pradyumnamahajan/gatewayPaper">
            <div>Github</div>
          </a>
        </div>

        <div className="linksChildren">
          <a href="http://ijecs.in/index.php/ijecs/article/view/4481/3953">
            <IoIosPaper size="2rem" />
          </a>
          <a href="http://ijecs.in/index.php/ijecs/article/view/4481/3953">
            <div>Paper</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Verify;
