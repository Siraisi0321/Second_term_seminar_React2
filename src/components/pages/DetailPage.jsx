// components/pages/DetailPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner.jsx"; // Assuming path

const DetailPage = () => {
  const { id } = useParams(); // URLからIDを取得
  const [photoDetail, setPhotoDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // APIアクセスキーとベースURLを定義 (App.jsxなどから渡す方が望ましいがここでは直接定義)
  const API_KEY = import.meta.env.VITE_ACCESS_KEY;
  console.log("API Key:", API_KEY);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        // Unsplashの単一画像取得エンドポイント
        const url = `https://api.unsplash.com/photos/${id}?client_id=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setPhotoDetail(data);
      } catch (error) {
        console.error("Error fetching photo detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id, API_KEY]); // idが変わるたびに実行

  if (loading) {
    return <div className="text-center p-8"><LoadingSpinner /><p>詳細データを読み込み中です...</p></div>;
  }

  if (!photoDetail) {
    return <div className="text-center p-8">画像が見つかりませんでした。</div>;
  }

  // 取得した詳細データを表示
  return (
    <div className="detail-container p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{photoDetail.alt_description || "画像詳細"}</h2>
      <img
        src={photoDetail.urls.regular}
        alt={photoDetail.alt_description}
        className="w-full h-auto object-cover rounded-lg shadow-lg mb-4"
      />
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">作者:</span> {photoDetail.user.name}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">いいね数:</span> {photoDetail.likes}
      </p>
      {/* ★ お気に入りボタンのプレースホルダー */}
      <button
        onClick={() => toggleFavorite(id)}
        className={`px-4 py-2 rounded transition ${isFavorited
            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
      >
        {isFavorited ? '★ お気に入り解除' : '☆ お気に入りに追加'}
      </button>
    </div>
  );
}

export default DetailPage;