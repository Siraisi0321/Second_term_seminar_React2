import { useState } from "react";
import axios from "axios";
import Head from "./components/Header/Header.jsx";
import Form from "./components/pages/Form.jsx";
import Results from "./components/pages/Results.jsx";
import Foot from "./components/Footer/Foot.jsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import History from './components/pages/history.jsx';
import Favorite from './components/pages/favorites.jsx';
import DetailPage from "./components/pages/DetailPage.jsx";


function App() {
  const [word, setWord] = useState("");
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPhotData = (e) => {
    e.preventDefault();

    if (!word.trim()) {
      alert("検索キーワードを入力してください。");
      return;
    }

    setLoading(true);

    axios
      .get(`https://api.unsplash.com/search/photos?query=${word}&client_id=8DnDrRE1szXcnCxiOY8ciV-MHmIq_sMe0Az73K4Ntow`)
      .then((res) => { console.log(res.data.results); setPhoto(res.data.results); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Head />
        </header>

        <main>
          <div>
            <Routes>
              <Route path="/" element={<Form setWord={setWord} getPhotoData={getPhotData} photo={photo} loading={loading} />} />
              <Route path="/Results" element={<Results photo={photo} />} />
              <Route path="/Favorites" element={<Favorite />} />
              <Route path="/History" element={<History />} />
              <Route path="/photo:id" element={<DetailPage />} />
            </Routes>
          </div>
        </main>

        <footer>
          <Foot />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;