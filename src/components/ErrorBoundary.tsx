import { Component, ReactNode, ErrorInfo } from "react";
import { Link } from "react-router-dom";
import error from "../assets/img/bug_fixing.svg";

// Define the shape of props this component accepts
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  render(): ReactNode {
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
