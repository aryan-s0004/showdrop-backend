import { Component } from "react";

/**
 * When something breaks, show a CLEAR error screen (white background) so you never see a black page.
 */
export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const msg = this.state.error?.message || String(this.state.error);
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "#ffffff",
            color: "#111",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <h1 style={{ marginBottom: 16, color: "#b91c1c" }}>Something went wrong</h1>
          <pre
            style={{
              padding: 16,
              background: "#fef2f2",
              borderRadius: 8,
              overflow: "auto",
              maxWidth: "100%",
              fontSize: 14,
              color: "#111",
              textAlign: "left",
            }}
          >
            {msg}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              background: "#8b5cf6",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
