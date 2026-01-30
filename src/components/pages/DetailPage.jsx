// components/pages/DetailPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner.jsx"; // Assuming path
import "./Favorites.css";

const DetailPage = ({ favoriteIds, toggleFavorite }) => {
  const { id } = useParams(); // URLからIDを取得
  const [photoDetail, setPhotoDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  //const API_KEY = "8DnDrRE1szXcnCxiOY8ciV-MHmIq_sMe0Az73K4Ntow";
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
  console.log("API Key:", API_KEY);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        // Unsplashの単一画像取得エンドポイント
        const url = `https://api.unsplash.com/photos/${id}?client_id=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("APIリクエストに失敗しました");

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
  }, [id]); // idが変わるたびに実行

  if (loading) {
    return <div className="text-center p-8"><LoadingSpinner /><p>詳細データを読み込み中です...</p></div>;
  }

  if (!photoDetail || !photoDetail.urls) {
    return <div className="text-center p-8">画像が見つかりませんでした。</div>;
  }

  const isFavorited = favoriteIds.includes(id);

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
        className={`fav-button ${isFavorited ? "active" : ""}`}
        style={{ marginTop: '10px' }}
      >
        <span className="icon">{isFavorited ? "★" : "★"}</span>
        {isFavorited ? "解除" : "追加"}
      </button>
    </div>
  );
}

export default DetailPage;