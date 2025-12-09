// components/pages/LoadingSpinner.jsx

import React from 'react';
import './LoadingSpinner.css'; // スタイルファイルも作成してください

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      {/* CSSでアニメーションを適用する要素 */}
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;