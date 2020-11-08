import React from "react";
import SignIn from "../../components/SignIn";
import "./signIn.css";

export default function signIn() {
  return (
    <div className="row m-0">
      <div className="col-md-6 p-0">
        <div className="handshake-bg"></div>
      </div>
      <div className="col-md-6 p-0 align-self-center">
        <SignIn />
      </div>
    </div>
  );
}
