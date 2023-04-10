import React from "react";
import Lottie from "lottie-react";

import loader from "src/assets/loader.json";

const Loader = () => {
  return (
    <Lottie
      style={{ width: 300, height: 300 }}
      animationData={loader}
      loop={true}
    />
  );
};

export default Loader;