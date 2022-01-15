import React from "react";

import Typewriter from "typewriter-effect";
function Jumbotron() {
  return (
    <div>
      <Typewriter
        options={{
          strings: ["New Arrivals", "Best Sellers", "Latest Products"],
          autoStart: true,
          delay: 111,
          loop: true,
        }}
      />
    </div>
  );
}

export default Jumbotron;
