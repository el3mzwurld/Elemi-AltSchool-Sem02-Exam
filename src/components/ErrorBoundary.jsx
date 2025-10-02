import { Component } from "react";
import { Link } from "react-router-dom";
import error from "../assets/img/bug_fixing.svg";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-show">
          <header>
            <nav>
              <ul>
                <li>
                  <Link to="/" className="link" target="_blank">
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
              <p>
                <span>Error</span> : {this.state.error?.message}
              </p>

              <img src={error} alt="page not found" />
            </section>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
