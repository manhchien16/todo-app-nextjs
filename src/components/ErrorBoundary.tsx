// components/ErrorBoundary.tsx
import ErrorPage from '@/app/auth/error/page';
import React, { Component, ErrorInfo } from 'react';


interface ErrorBoundaryProps {
    children: React.ReactNode;
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
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Hiển thị trang lỗi nếu có lỗi
            return <ErrorPage error={{ statusCode: 500, message: this.state.error?.message || 'Something went wrong' }} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
