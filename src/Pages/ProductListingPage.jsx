import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import "./ProductListingPage.css";
import { usePokemonContext } from "../PokemonContext";

const ProductListingPage = () => {
  // destructring the result from context
  const { pokemonList, getPokemonDetails } = usePokemonContext();

  // iterates over the pokemonlist to get pokemon details
  useEffect(() => {
    pokemonList.forEach((pokemon) => {
      getPokemonDetails(pokemon.name);
    });
  }, [pokemonList, getPokemonDetails]); // dependencies

  const getImageUrl = (id) => {
    // pokemon image is in 001 format
    const paddedId = String(id).padStart(3, "0");
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;
  };

  return (
    <div className="product-listing1">
      <h1 className="centered1">Pokemon List</h1>
      <div className="pokemon-grid1">
        {pokemonList.map((pokemon, index) => {
          const imageUrl = getImageUrl(index + 1);
          console.log("Image URL:", imageUrl);
          return (
            <div className="pokemon-card1" key={pokemon.name}>
              <PokemonCard pokemon={pokemon} imageUrl={imageUrl} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListingPage;
