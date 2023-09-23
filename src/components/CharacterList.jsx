import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getFavoriteCharacters,
  saveFavoriteCharacter,
  removeFavoriteCharacter,
} from "../utils/storage";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState(getFavoriteCharacters());
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=500`)
      .then((response) => {
        setCharacters(response.data.results);
      });
  }, []);

  const toggleFavorite = (characterId) => {
    if (favorites.includes(characterId)) {
      removeFavoriteCharacter(characterId); // Favoriden kaldır
      setFavorites(favorites.filter((id) => id !== characterId)); // Durumu güncelle
    } else {
      saveFavoriteCharacter(characterId); // Favori olarak ekle
      setFavorites([...favorites, characterId]); // Durumu güncelle
    }
  };

  // Arama işlemi için bir işlev
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrelenmiş karakterleri hesapla
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Şu anki sayfadaki karakterleri al
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);

  // Sayfa değiştirme işlevi
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <input
        type="text"
        placeholder="Karakter ara..."
        className="p-2 border rounded mb-4"
        onChange={handleSearch}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCharacters.map((character, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <Link
              to={`/character/${
                index + 1 + (currentPage - 1) * charactersPerPage
              }`}
              className="text-blue-500 hover:underline"
            >
              <h2 className="text-lg font-semibold">{character.name}</h2>
            </Link>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1 + (currentPage - 1) * charactersPerPage
              }.png`}
              alt={character.name}
              className="mt-2 mx-auto w-32 h-32"
            />
            <button
              onClick={() =>
                toggleFavorite(
                  index + 1 + (currentPage - 1) * charactersPerPage
                )
              }
              className={`mt-4 rounded-full w-8 h-8 flex items-center justify-center ${
                favorites.includes(
                  index + 1 + (currentPage - 1) * charactersPerPage
                )
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {favorites.includes(
                index + 1 + (currentPage - 1) * charactersPerPage
              )
                ? "★"
                : "☆"}
            </button>
          </div>
        ))}
      </div>

      {/* Sayfalama */}
      <div className="mt-10 flex justify-center items-center space-x-3">
        <button
          onClick={() => paginate(currentPage - 1)}
          className={`px-4 py-2 rounded-full ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={currentPage === 1}
        >
          Önceki
        </button>
        <p className="text-lg font-semibold">
          Sayfa {currentPage} / {totalPages}
        </p>
        <button
          onClick={() => paginate(currentPage + 1)}
          className={`px-4 py-2 rounded-full ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={currentPage === totalPages}
        >
          Sonraki
        </button>
      </div>
    </div>
  );
}

export default CharacterList;
