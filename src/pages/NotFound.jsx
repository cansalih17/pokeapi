// NotFound.js
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <h2 className="text-3xl font-semibold text-red-500 mb-2">
        404 - Sayfa Bulunamadı
      </h2>
      <p className="text-lg text-gray-700">
        Üzgünüz, aradığınız sayfa bulunamadı.
      </p>
      <Link to="/" className="text-blue-500 hover:underline mt-4">
        Anasayfaya Dön
      </Link>
    </div>
  );
}

export default NotFound;
