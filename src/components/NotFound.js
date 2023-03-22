import { Link } from "react-router-dom";
import "../public/css/NotFound.css"

export const NotFound = () => {
  return (
    <div className="not-found hero">
      <h1>404 Page Not Found</h1>
      <p>We're sorry, the page you requested could not be found.</p>
      <p>Go back to <Link to="/">homepage</Link>.</p>
    </div>
  );
};

export default NotFound;