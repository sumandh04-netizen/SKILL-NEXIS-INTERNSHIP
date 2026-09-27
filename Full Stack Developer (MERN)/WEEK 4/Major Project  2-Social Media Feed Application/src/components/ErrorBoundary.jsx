import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, info) {
    console.error("SocialHub frontend error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-screen">
          <div className="error-screen-card">
            <div className="brand-mark large">S</div>
            <h1>SocialHub could not load</h1>
            <p>
              The application encountered a frontend error. Reload the page and
              check the browser console if the problem continues.
            </p>
            <button className="primary-btn" onClick={this.handleReload}>
              Reload SocialHub
            </button>
            {import.meta.env.DEV && this.state.error?.message ? (
              <pre>{this.state.error.message}</pre>
            ) : null}
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
