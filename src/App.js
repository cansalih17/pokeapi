import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import Header from "./pages/Header";
import FavoriteCharactersPage from "./pages/FavoriteCharactersPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
        <Route path="/favorites" element={<FavoriteCharactersPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
