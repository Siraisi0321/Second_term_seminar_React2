import { useState, useEffect } from "react";
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
  // ★ お気に入り state と操作関数の追加
  const [favoriteIds, setFavoriteIds] = useState(() => {
    // ローカルストレージから初期値を読み込む
    const saved = localStorage.getItem('favoriteIds');
    return saved ? JSON.parse(saved) : [];
  });

  // favoriteIdsが変更されたらローカルストレージを更新
  useEffect(() => {
    localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // お気に入りに追加/削除するトグル関数
  const toggleFavorite = (id) => {
    setFavoriteIds(prevIds => {
      if (prevIds.includes(id)) {
        // 既に存在すれば削除
        return prevIds.filter(favId => favId !== id);
      } else {
        // 存在しなければ追加
        return [...prevIds, id];
      }
    });
  };

  // 既存の履歴を取得し、新しいキーワードを追加する関数
  const saveSearchHistory = (keyword) => {
    if (!keyword) return;
    // localStorageから既存の履歴を取得
    const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // 重複を避けつつ、最新のものを配列の先頭に追加
    const newHistory = [
      keyword,
      ...existingHistory.filter(h => h !== keyword)
    ].slice(0, 10); // 最新10件に制限

    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };


  // getPhotoData関数の内部（検索が成功した直後）で実行
  const getPhotoData = (e, searchKeyword = null) => {
    if (e) {
      e.preventDefault();
    }

    const keywordToSearch = searchKeyword || word;

    if (searchKeyword && keywordToSearch !== word) { // <-- searchKeyword であることを確認
      setWord(keywordToSearch);
    }

    if (!keywordToSearch.trim()) {
      alert("検索キーワードを入力してください。");
      return;
    }

    setLoading(true);

    axios
      .get(`https://api.unsplash.com/search/photos?query=${keywordToSearch}&client_id=8DnDrRE1szXcnCxiOY8ciV-MHmIq_sMe0Az73K4Ntow`)
      .then((res) => {
        console.log(res.data.results);
        setPhoto(res.data.results);
        setLoading(false);

        // ★ 検索成功時に履歴を保存
        saveSearchHistory(keywordToSearch);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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
              <Route path="/" element={<Form setWord={setWord} getPhotoData={getPhotoData} photo={photo} loading={loading} />} />
              <Route path="/Favorites" element={<Favorite favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />} />
              <Route path="/History" element={<History setWord={setWord} getPhotoData={getPhotoData} />} />
              <Route path="/photo/:id" element={<DetailPage favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />}
              />
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