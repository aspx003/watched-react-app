import { Routes, Route } from "react-router";
import HomePage from "@/pages/HomePage";
import Navbar from "@/components/custom/Navbar";
import SearchPage from "./pages/SearchPage";
import CollectionsPage from "./pages/CollectionsPage";
import MediaDetailPage from "./pages/MediaDetailPage";

function App() {
  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route
          path="/media/:mediaType/:simklId"
          element={<MediaDetailPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
