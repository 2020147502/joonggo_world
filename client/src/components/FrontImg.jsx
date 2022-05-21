function FrontImg () {
  const updateMoveMenu = (e) => {
    e.preventDefault();
  };
  return (
    <a href="" onClick={updateMoveMenu}>
      <img src="img/jn_cafe_skin.png" alt="중고나라" style={{ width: "100%" }} />
    </a>
  );
};

export default FrontImg;