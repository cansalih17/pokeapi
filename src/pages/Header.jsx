import React from "react";
import { Link } from "react-router-dom";
import { getFavoriteCharacters } from "../utils/storage";

function Header() {
  const favoriteCharacterCount = getFavoriteCharacters().length;

  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">
          <Link to="/">PokeAPI Uygulaması</Link>
        </h1>
        <nav className="space-x-4">
          <Link to="/" className="text-white hover:underline">
            Anasayfa
          </Link>
          <Link to="/favorites" className="text-white hover:underline">
            Favori Karakterler ({favoriteCharacterCount})
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
