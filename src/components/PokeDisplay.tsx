import React, { useEffect, useState } from "react";
import axios from "axios";

const PokeDisplay = () => {
  return (
    <>
      <section id="single-display" className="text-center">
        <div className="container ">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div
              className="col-10 col-sm-12 col-lg-6 align-items-center"
              id="single-display-image"
            >
              <img
                src="https://camo.githubusercontent.com/839597b17f45c52c479653e93ed377c50e40b0176e32616d80af58d48aa9f9bf/68747470733a2f2f692e696d6775722e636f6d2f583962314b75362e706e67"
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div
              className="col-lg-6 col-sm-12 mx-auto text-center"
              id="poke-info"
            >
              <h1
                id="single-display"
                className="display-5 fw-bold text-body-emphasis lh-1 mb-3"
              >
                Who's that Pokémon?
              </h1>
              <p className="lead">
                Search through a list of 1300+ Pokémon, and learn sweet little
                facts about them. Want to learn more facts? Just enter the
                Pokémon's name again 😀
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PokeDisplay;
