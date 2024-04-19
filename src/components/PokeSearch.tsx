import axios from "axios";
import React, { useEffect, useState } from "react";

interface Pokemon {
  name: string;
}

const PokeSearch = () => {
  const [pokeCount, setPokeCount] = useState(0);
  const [error, setError] = useState([]);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const [pokemonUpperCase, setPokemonUpperCase] =
    useState<React.ReactNode | null>(null);

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

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <div className="loading-popup">
          <p>Poképedia is gathering data...</p>
          <div className="spinner-border"></div>
        </div>
      ) : (
        <section id="poke-search">
          <div className="container">
            <input
              className="form-control center"
              list="datalistOptions"
              id="poke-search-input"
              placeholder="What's that Pokemon?..."
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
        </section>
      )}
    </>
  );
};

export default PokeSearch;
