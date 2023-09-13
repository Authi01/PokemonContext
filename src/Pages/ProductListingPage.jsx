import React, { useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import "../Product.css";
import { usePokemonContext } from "../PokemonContext";
import getImageUrl from "../ImageUrl";

const ProductListingPage = () => {
  // destructuring the result from context
  const { pokemonList, fetchPokemonList } = usePokemonContext();

  // fetches the list
  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <div className="product-listing1">
      <h1 className="centered1">Pokemon List</h1>
      <div className="pokemon-grid1">
        {pokemonList.map((pokemon, index) => {
          const imageUrl = getImageUrl(index + 1);
          return (
            <PokemonCard key={index} pokemon={pokemon} imageUrl={imageUrl} />
          );
        })}
      </div>
    </div>
  );
};

export default ProductListingPage;
