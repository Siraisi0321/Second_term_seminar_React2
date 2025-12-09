import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Title = () => {
  return (
    <header>
      <nav className='title-nav'>
      <h1>画像検索</h1>
        <ul className='nav-links'>
          <li className='nav-link'><Link to ="/">検索</Link></li>
          <li className='nav-link'><Link to ="/Favorites">お気に入り</Link></li>
          <li className='nav-link'><Link to ="/History">履歴</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Title;