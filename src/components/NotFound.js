import { Link } from "react-router-dom";
import "../public/css/NotFound.css"

export const NotFound = () => {
  return (
    <div className="not-found hero">
      <h1>404 Page Not Found</h1>
      <p className="home-page">Go back to <Link to="/">homepage</Link>.</p>
      <p className="subs">Disgrace.</p>
    </div>
  );
};

export default NotFound;