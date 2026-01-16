import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./History.css";

const History = ({ setWord, getPhotoData }) => {
  const [historyList, setHistoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistoryList(savedHistory);
  }, []);

  const handleSearchClick = (keyword) => {
    getPhotoData(null, keyword);
    navigate('/'); 
  };

  // --- 追加：個別削除のハンドラー ---
  const handleDeleteOne = (indexToDelete) => {
    // 指定したインデックス以外の要素で新しい配列を作成
    const updatedHistory = historyList.filter((_, index) => index !== indexToDelete);
    
    // Stateを更新
    setHistoryList(updatedHistory);
    // LocalStorageを更新
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    localStorage.removeItem('searchHistory');
    setHistoryList([]);
  };

  return (
    <div className="history-container">
      <h2 className="history-title">検索履歴</h2>
      
      {historyList.length === 0 ? (
        <p className="no-history-message">検索履歴はありません。</p>
      ) : (
        <>
          <ul className="history-list">
            {historyList.map((keyword, index) => (
              <li key={index} className="history-item">
                <span className="history-keyword">{keyword}</span>
                <div className="history-actions">
                  <button 
                    onClick={() => handleSearchClick(keyword)}
                    className="search-button"
                  >
                    再検索
                  </button>
                  {/* --- 追加：削除ボタン --- */}
                  <button 
                    onClick={() => handleDeleteOne(index)}
                    className="delete-item-button"
                    title="この履歴を削除"
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button 
            onClick={handleClearHistory}
            className="clear-button"
          >
            履歴を全て削除
          </button>
        </>
      )}
    </div>
  );
};

export default History;