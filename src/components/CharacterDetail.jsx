import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCharacter } from "../utils/api";
import {
  getFavoriteCharacters,
  saveFavoriteCharacter,
  removeFavoriteCharacter,
} from "../utils/storage";

function CharacterDetail() {
  const { id } = useParams();
  const characterId = parseInt(id, 10); // id'yi sayıya dönüştür
  const [character, setCharacter] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState(getFavoriteCharacters());

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCharacter(characterId); // characterId'yi kullan
        setCharacter(data);
        setIsFavorite(favorites.includes(characterId)); // characterId'yi kullan
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    }

    fetchData();
  }, [characterId, favorites]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteCharacter(characterId);
      const updatedFavorites = favorites.filter(
        (characterId) => characterId !== characterId
      );
      setFavorites(updatedFavorites);
    } else {
      saveFavoriteCharacter(characterId);
      setFavorites([...favorites, characterId]);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 border rounded-lg shadow-md">
      {character ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">{character.name}</h2>
          <div className="flex justify-center">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${characterId}.png`}
              alt={character.name}
              className="w-48 h-48"
            />
          </div>
          <p className="mb-2">Height: {character.height}</p>
          <p className="mb-2">Weight: {character.weight}</p>
          <p className="mb-2">Base Experience: {character.base_experience}</p>
          {/* Diğer karakter detayları buraya eklenebilir */}
          <button
            onClick={toggleFavorite}
            className={`bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center ${
              isFavorite ? "bg-yellow-600" : "bg-gray-300"
            }`}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CharacterDetail;
