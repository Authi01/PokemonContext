import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDescriptionPage.css";
import { usePokemonContext } from "../PokemonContext";

const ProductDescriptionPage = () => {
  const { name } = useParams();
  const { pokemonDetails, abilities, forms, getPokemonDetails } =
    usePokemonContext();

  useEffect(() => {
    getPokemonDetails(name);
  }, [name, getPokemonDetails]);

  if (!pokemonDetails || !abilities || !forms) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const getImageUrl = (id) => {
    const paddedId = String(id).padStart(3, "0");
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;
  };

  return (
    <div className="page-container">
      <div className="pokemon-card">
        <div className="pokemon-image">
          <img
            src={getImageUrl(pokemonDetails.id)}
            className="img-fluid rounded"
            alt={pokemonDetails.name}
          />
        </div>
        <div className="pokemon-info">
          <h1 className="title">{pokemonDetails.name}</h1>
          <div className="details">
            <strong>Height:</strong> {pokemonDetails.height} decimetres
          </div>
          <div className="details">
            <strong>Weight:</strong> {pokemonDetails.weight} hectograms
          </div>
          <div className="details">
            <strong>Abilities:</strong>
            <ul>
              {abilities.map((ability) => (
                <li key={ability.name} className="list-item">
                  {ability.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="details">
            <strong>Forms:</strong>
            <ul>
              {forms.map((form) => (
                <li key={form.name} className="list-item">
                  {form.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionPage;
