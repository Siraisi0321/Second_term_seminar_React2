import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CSSのインポート（仮定）
import "./History.css";

const History = ({ setWord, getPhotoData }) => {
  const [historyList, setHistoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ローカルストレージから履歴を読み込む
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistoryList(savedHistory);
  }, []);

  const handleSearchClick = (keyword) => {
    // 検索ワードをセット
    //setWord(keyword);

    getPhotoData(null, keyword);
    // 検索ページに遷移
    navigate('/'); 
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
                <button 
                  onClick={() => handleSearchClick(keyword)}
                  className="search-button"
                >
                  再検索
                </button>
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