# Poképedia v0.1

Welcome to Poképedia v0.1, a web application, now utilizng React, that allows you to search and learn random facts about various Pokémon!

## Overview

This project utilizes JavaScript, TypeScript, and React to interact with the [PokéAPI](https://pokeapi.co/) to fetch information about Pokémon. It features a user-friendly interface where you can search for Pokémon by name and get detailed information about them, including images and interesting facts.

## Live Preview

[Poképedia](https://sabrunthedev.github.io/react-web-app/), hosted on GitHub Pages

## Features

- **Pokémon Search:** Utilize the search bar to find information about your favorite Pokémon.
- **Dynamic Display:** The application dynamically displays the selected Pokémon's image and species details.
- **Random Pokémon Facts:** Learn interesting facts about the Pokémon species through randomly selected flavor text. Resubmitting the same Pokémon will return a different, randomized fact.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **PokéAPI:** An API that provides data about Pokémon species, abilities, moves, and more.

## Components

### PokeSearch

- **Description:** Component responsible for the search functionality.
- **Features:**
  - Fetches Pokémon data from the PokéAPI.
  - Provides an input field for users to search for Pokémon by name.
  - Displays a loading spinner while fetching data.

### PokeDisplay

- **Description:** Component responsible for displaying Pokémon information.
- **Features:**
  - Dynamically renders the selected Pokémon's image and species details.
  - Randomly selects and displays flavor text for the selected Pokémon.

### PreLoader

- **Description:** Component responsible for displaying a preloader.
- **Features:**
  - Shows a loading spinner while fetching data.

### Contributing

Contributions are welcome! Feel free to open issues, suggest enhancements, or submit pull requests.

## License

This project is licensed under the [MIT License](/LICENSE.MIT).

## Acknowledgements

Special thanks to the PokéAPI for providing most of the the Pokémon data used in this application.
