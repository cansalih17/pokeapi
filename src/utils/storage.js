// Favori karakterlerin saklanacağı anahtar (key) için bir sabit oluşturun
const FAVORITE_KEY = "favorite_characters";

// Favori karakterleri getiren fonksiyon
export function getFavoriteCharacters() {
  const favorites = localStorage.getItem(FAVORITE_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

// Favori karakter eklemek için fonksiyon
export function saveFavoriteCharacter(characterId) {
  let favorites = getFavoriteCharacters();

  // Eğer karakter zaten favorilerde ise ekleme
  if (!favorites.includes(characterId)) {
    favorites.push(characterId);
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
  }
}

// Favori karakteri kaldırmak için fonksiyon
export function removeFavoriteCharacter(characterId) {
  let favorites = getFavoriteCharacters();

  // Karakter favorilerde ise kaldırma
  if (favorites.includes(characterId)) {
    favorites = favorites.filter((id) => id !== characterId);
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
  }
}
