import "./Foot.css";

const Foot = () => {
  return (
<footer>
  <small>&copy; {new Date().getFullYear()} Photo Search App   &   Photos provided by <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a></small>
</footer>
  );
}

export default Foot;


