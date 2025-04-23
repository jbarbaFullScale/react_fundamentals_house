import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode; // The child components wrapped by the error boundary
}

interface ErrorBoundaryState {
    hasError: boolean; // Tracks whether an error has been caught
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false }; // Initialize state
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        // Update state to indicate an error has occurred
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // Log the error to the console or send it to an error reporting service
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI when an error is caught
            return (
                <div className="error-boundary">
                    <h1>Something went wrong.</h1>
                    <p>We encountered an error while loading this section. Please try again later.</p>
                </div>
            );
        }

        // Render children if no error occurred
        return this.props.children;
    }
}

export default ErrorBoundary;