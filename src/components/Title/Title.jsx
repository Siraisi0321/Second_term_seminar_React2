import "./Title.css";

const Title = () => {
  return (
    <header>
      <h1>画像検索</h1>
      <nav>
        <ul>
          <li><a  href="./Form.jsx">検索</a></li>
          <li><a  href="./history.jsx">履歴</a></li>
          <li><a  href="./favorites.jsx">お気に入り</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Title;