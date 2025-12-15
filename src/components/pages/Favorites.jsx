// components/pages/Favorite.jsx

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Favorite = ({ favoriteIds, toggleFavorite }) => { // ★ propsとして受け取る
    const [favoritePhotos, setFavoritePhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const API_KEY = import.meta.env.VITE_ACCESS_KEY; 

    useEffect(() => {
        if (favoriteIds.length === 0) {
            setFavoritePhotos([]);
            return;
        }

        const fetchFavorites = async () => {
            setLoading(true);
            const photoPromises = favoriteIds.map(async (id) => {
                // Unsplashの単一画像取得エンドポイントで詳細を取得
                const url = `https://api.unsplash.com/photos/${id}?client_id=${API_KEY}`;
                const response = await fetch(url);
                return response.json();
            });

            try {
                const results = await Promise.all(photoPromises);
                setFavoritePhotos(results.filter(r => !r.errors)); // エラーのある項目を除外
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [favoriteIds, API_KEY]); // お気に入りIDリストが変わるたびに実行

    if (loading) {
        return <div className="text-center p-8">お気に入りを読み込み中です...</div>;
    }
    
    return (
        <div className="favorite-container p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">★ お気に入りリスト</h2>
            
            {favoritePhotos.length === 0 ? (
                <p className="text-gray-500">お気に入りの画像はまだありません。</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favoritePhotos.map((photo) => (
                        <div key={photo.id} className="relative group">
                            <Link to={`/photo/${photo.id}`}>
                                <img 
                                    src={photo.urls.small} 
                                    alt={photo.alt_description} 
                                    className="w-full h-48 object-cover rounded shadow transition duration-300 group-hover:opacity-80"
                                />
                            </Link>
                            <button 
                                onClick={() => toggleFavorite(photo.id)}
                                className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                                title="お気に入り解除"
                            >
                                {/* ハートアイコンなど */}
                                ✖
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorite;