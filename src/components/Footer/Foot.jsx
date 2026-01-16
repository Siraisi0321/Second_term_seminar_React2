import "./Foot.css";

const Foot = () => {
  return (
    <small>&copy; {new Date().getFullYear()} Photo Search App   &   Photos provided by <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a></small>
  );
}

export default Foot;


