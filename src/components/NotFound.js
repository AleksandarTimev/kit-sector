import { Link } from "react-router-dom";
import "../public/css/NotFound.css"

export const NotFound = () => {
  return (
    <div className="not-found hero">
      <h1>404 Page Not Found</h1>
      <p className="home-page">Go park the bus at <Link to="/" className="link-home">home</Link>.</p>
      <p className="subs">Is a disgrace.</p>
    </div>
  );
};

export default NotFound;