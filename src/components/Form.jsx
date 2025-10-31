import "./Form.css";
import searchIcon from "/Images/search_icon.png";

const Form = ({ setWord, getPhotoData }) => {
  return (
    <form>
      <input type = "text" name = "keyword" placeholder = "キーワードを入力"
      onChange={(e) => setWord(e.target.value)}/>
      <button type = "submit" onClick={getPhotoData}>
        <img src={searchIcon} alt="検索" className="search-icon" />
      
      </button>
    </form>
  );
}

export default Form;