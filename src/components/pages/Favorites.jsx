// components/pages/Favorite.jsx

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Favorites.css";

const Favorite = ({ favoriteIds, toggleFavorite }) => {
    const [favoritePhotos, setFavoritePhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const API_KEY = "8DnDrRE1szXcnCxiOY8ciV-MHmIq_sMe0Az73K4Ntow";

    useEffect(() => {
        if (favoriteIds.length === 0) {
            setFavoritePhotos([]);
            return;
        }

        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const photoPromises = favoriteIds.map(async (id) => {
                    const url = `https://api.unsplash.com/photos/${id}?client_id=${API_KEY}`;
                    const response = await fetch(url);
                    return response.json();
                });

                const results = await Promise.all(photoPromises);
                setFavoritePhotos(results.filter(r => r && !r.errors));
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [favoriteIds]);

    if (loading) return <div className="text-center p-8">読み込み中...</div>;

    return (
        <div className="favorite-container p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">★ お気に入りリスト</h2>

            {favoritePhotos.length === 0 ? (
                <p className="text-gray-500">お気に入りの画像はまだありません。</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favoritePhotos.map((photo) => {
                        // ★ mapの中で判定を行う
                        const isCurrentFavorited = favoriteIds.includes(photo.id);

                        return (
                            <div key={photo.id} className="relative group flex flex-col items-center">
                                <Link to={`/photo/${photo.id}`}>
                                    <img
                                        src={photo.urls.small}
                                        alt={photo.alt_description}
                                        className="w-full h-48 object-cover rounded shadow"
                                    />
                                </Link>
                                {/* ボタンのidをphoto.idに修正 */}
                                <button
                                    onClick={() => toggleFavorite(photo.id)}
                                    className={`fav-button ${isCurrentFavorited ? "active" : ""}`}
                                    style={{ marginTop: '10px' }}
                                >
                                    <span className="icon">{isCurrentFavorited ? "❤️" : "🤍"}</span>
                                    {isCurrentFavorited ? "解除" : "追加"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Favorite;