import axios from "axios";
import React, { useEffect, useState } from "react";
import PokeDisplay from "./PokeDisplay";

interface Pokemon {
  name: string;
}

const PokeSearch = () => {
  const [pokeCount, setPokeCount] = useState(0);
  const [error, setError] = useState([]);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const [activePokemon, setActivePokemon] = useState(false);
  const [pokemonUpperCase, setPokemonUpperCase] =
    useState<React.ReactNode | null>(null);
  const [pokemonDisplayImg, setpokemonDisplayImg] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        setPokeCount(res.data.count);
        const fetchPokemon = async () => {
          const pokemonData: Pokemon[] = [];
          for (let i = 1; i <= res.data.count; i++) {
            try {
              const pokeRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${i > 1025 ? i + 8975 : i}`
              );
              pokemonData.push(pokeRes.data);
            } catch (error) {
              setError(error.message);
            }
          }
          setPokemon(pokemonData);
          setLoading(false);
        };
        fetchPokemon();
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const pokeOption = pokemon.map((poke, index) => (
    <option
      key={index}
      value={poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
    >
      {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
    </option>
  ));

  // Activated with the Enter Key
  // Checks if the entered value matches a Pokemon name
  // Returns a message under the input field after a valid Pokemon is entered, message disappears after 3 seconds
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const pokeName = pokemon.map((poke) => poke.name.toLowerCase());
    if (event.key === "Enter") {
      event.preventDefault();
      const enteredValue = event.currentTarget.value.toLowerCase();
      const enteredPokemon = pokeName.find((name) => name === enteredValue);
      if (enteredPokemon) {
        setActivePokemon(true);
        console.log(enteredPokemon);
        setSelectedPokemon(enteredPokemon);
        setTimeout(() => {
          setSelectedPokemon("");
        }, 3000);
      } else {
        console.log("Invalid Pokemon");
      }
    }
  };

  // Capitalizes the first letter of the Pokemon's name/s
  // Deals with Pokemon that have a "-" in their names, replaces the "-" with a space, " "
  useEffect(() => {
    if (selectedPokemon) {
      if (selectedPokemon.includes("-")) {
        setPokemonUpperCase(
          <p className="mt-3">
            {selectedPokemon
              .split("-")
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(" ")}{" "}
            I choose you!
          </p>
        );
      } else {
        setPokemonUpperCase(
          <p className="mt-3">
            {selectedPokemon.charAt(0).toUpperCase() + selectedPokemon.slice(1)}{" "}
            I choose you!
          </p>
        );
      }
    } else {
      setPokemonUpperCase(null);
    }
  }, [selectedPokemon]);

  useEffect(() => {
    const updatedPokemon = pokemon.map((poke, index) => {
      let pokemonDisplay = "";
      if (index > 1025 && index !== 1184) {
        pokemonDisplay = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 8976
        }.png`;
      } else if (index === 10160 - 8976) {
        pokemonDisplay =
          "https://marriland.com/wp-content/plugins/marriland-core/images/pokemon/sprites/home/full/pikachu-world-cap.png";
      } else if (index === 25 - 1) {
        pokemonDisplay =
          "https://www.twitch.guru/pokemon/images/animated/025.gif";
      } else {
        pokemonDisplay = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`;
      }
      return { ...poke, imageUrl: pokemonDisplay };
    });
    setpokemonDisplayImg(updatedPokemon.map((poke) => poke.imageUrl));
  }, [pokemon]);

  if (!loading) {
    console.log(pokemonDisplayImg);
  }

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <div>
          <div className="loading-popup">
            <p>Poképedia is gathering data...</p>
            <div className="spinner-border"></div>
          </div>
          <PokeDisplay />
        </div>
      ) : (
        <section id="poke-search">
          <div className="container">
            <input
              className="form-control center"
              list="datalistOptions"
              id="poke-search-input"
              placeholder="Who's that Pokemon?..."
              data-bs-theme="dark"
              onKeyDown={handleKeyDown}
            />
            {/* {selectedPokemon ? (
              <p className="mt-3">
                {selectedPokemon.charAt(0).toUpperCase() +
                  selectedPokemon.slice(1)}{" "}
                I choose you!
              </p>
            ) : selectedPokemon.includes("-") ? (
              <p className="mt-3">
                {selectedPokemon
                  .split("-")
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join(" ")}
              </p>
            ) : null} */}
            {pokemonUpperCase}
            <datalist id="datalistOptions">{pokeOption}</datalist>
          </div>
          {activePokemon ? (
            <>
              <section id="single-display">
                <div className="container col-xxl-8 px-4 py-5">
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
                        Search through a list of 1300+ Pokémon, and learn sweet
                        little facts about them. Want to learn more facts? Just
                        enter the Pokémon's name again 😀
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <PokeDisplay />
          )}
        </section>
      )}
    </>
  );
};

export default PokeSearch;
