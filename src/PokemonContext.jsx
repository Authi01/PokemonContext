import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// new context object - used to share state, functions
const PokemonContext = createContext();

// return custom hook usePokemonContext
export function usePokemonContext() {
  return useContext(PokemonContext);
}

// wraps children to make context available as seen in app.jsx
export function PokemonProvider({ children }) {
  // store datas
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // api to fetch the list of Pokemon
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((response) => {
      setPokemonList(response.data.results);
    });
  }, []);

  const getPokemonDetails = (name) => {
    // api to fetch Pokemon details by name
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => {
      setPokemonDetails(response.data);

      const abilityRequests = response.data.abilities.map((ability) =>
        axios.get(ability.ability.url)
      );
      //  axios.all will wait for all abilities details
      // ability response stores the data of abilities in ability details
      axios.all(abilityRequests).then((abilityResponses) => {
        const abilityDetails = abilityResponses.map(
          (abilityResponse) => abilityResponse.data
        );
        setAbilities(abilityDetails);
      });

      const formRequests = response.data.forms.map((form) =>
        axios.get(form.url)
      );

      axios.all(formRequests).then((formResponses) => {
        const formDetails = formResponses.map(
          (formResponse) => formResponse.data
        );
        setForms(formDetails);
      });
    });
  };

  return (
    // the values enclosed here are made available to children
    <PokemonContext.Provider
      value={{
        pokemonList,
        getPokemonDetails,
        pokemonDetails,
        abilities,
        forms,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
