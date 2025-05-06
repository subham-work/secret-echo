import React from "react";

const Loader = ({ width = "40px", height = "40px" }) => {
    return (
        <div
            className="custom-loader"
            style={{ width: width, height: height }}
        ></div>
    );
};

export default Loader;