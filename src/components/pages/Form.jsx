import "./Form.css";
import searchIcon from "/Images/search_icon.png";
import Results from "./Results";
import LoadingSpinner from "./LoadingSpinner.jsx"

const Form = ({ setWord, getPhotoData, photo, loading }) => {
  return (
    <>
    <form>
      <input type = "text" name = "keyword" placeholder = "キーワードを入力"
      onChange={(e) => setWord(e.target.value)}/>
      <button type = "submit" onClick={getPhotoData}>
        <img src={searchIcon} alt="検索" className="search-icon" />
      
      </button>
    </form>
    {loading && (<div className="loading-area">
      <LoadingSpinner /><p>画像を検索中です…</p>
    </div>)}
    {!loading && <Results photo={photo} />}
    </>
  );
}

export default Form;