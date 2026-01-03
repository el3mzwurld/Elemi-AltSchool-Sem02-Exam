import { Link } from "react-router-dom";
import notFound from "../assets/img/not-found.svg";
import { JSX } from "react";
const NotFound = (): JSX.Element => {
  return (
    <div className="notFound">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/error" className="link">
                Error
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="main_illustration">
          <img src={notFound} alt="page not found" />
          <h2>404 : That page doesn't exist</h2>
        </section>
      </main>
    </div>
  );
};

export default NotFound;
