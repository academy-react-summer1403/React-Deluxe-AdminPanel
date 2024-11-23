import React from "react";
import Style from "./FullPageLoading.module.css";

export const FullPageLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className={Style["custom-loader"]}></div>
      <p style={{ marginTop: "1rem", fontSize: "1.25rem", color: "#766DF4" }}>
        در حال بارگذاری...
      </p>
    </div>
  );
};
