import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFavoriteCharacters,
  removeFavoriteCharacter,
} from "../utils/storage";
import axios from "axios";

function FavoriteCharactersPage() {
  const favoriteCharacters = getFavoriteCharacters();
  const [favoriteData, setFavoriteData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const favoriteCharacterData = await Promise.all(
        favoriteCharacters.map(async (characterId) => {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${characterId}`
          );
          return response.data;
        })
      );
      setFavoriteData(favoriteCharacterData);
    }

    fetchData();
  }, [favoriteCharacters]);

  const removeFromFavorites = (characterId) => {
    removeFavoriteCharacter(characterId);
    setFavoriteData(
      favoriteData.filter((character) => character.id !== characterId)
    );
  };

  return (
    <div className="container mx-auto mt-6 p-4">
      <h2 className="text-2xl font-semibold mb-4">Favori Karakterler</h2>
      {favoriteData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteData.map((character, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <Link
                to={`/character/${character.id}`}
                className="text-blue-500 hover:underline"
              >
                <h2 className="text-lg font-semibold">{character.name}</h2>
              </Link>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${character.id}.png`}
                alt={character.name}
                className="mt-2 mx-auto w-32 h-32"
              />
              <button
                onClick={() => removeFromFavorites(character.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full  flex items-center justify-center"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Henüz favori karakteriniz yok.</p>
      )}
    </div>
  );
}

export default FavoriteCharactersPage;
