const Results = ({ photo }) => {
  if (!Array.isArray(photo) || photo.length === 0) {
    return <p>No photo found.</p>;
  }

  return (
    <div className="photo-list">
      {photo.map((singleData, index) => (
        <a href={singleData.links.html} key={index}>{" "}
          <img src={singleData.urls.regular} alt={singleData.alt_description} />
        </a>
      ))}
    </div>
  );
};

export default Results;