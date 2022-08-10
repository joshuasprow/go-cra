import { Link } from "react-router-dom";

export default () => (
  <div>
    <Link style={{ display: "block" }} to="/">Home</Link>
    <Link style={{ display: "block" }} to="/about">About</Link>
    <Link style={{ display: "block" }} to="/greet">Greet</Link>
  </div>
);
