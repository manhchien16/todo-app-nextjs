'use client';
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react';

interface AddErrorProps {
    error: {
        statusCode: number;
        message: string;
    };
}

const ErrorPage = ({ error }: AddErrorProps) => {
    const route = useRouter();

    const status = error ? error.statusCode : null;

    useEffect(() => {
        if (status === 401 || status === 403) {
            route.push("/auth/login");
        }
    }, [status, route]);

    if (!error) {
        return <p>An unexpected error occurred.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
            <h1 className="text-4xl font-bold text-red-600">
                {error.statusCode || '500'} - {error.message || 'Internal Server Error'}
            </h1>
            <p className="text-lg mt-4 text-gray-600">
                Something went wrong. Please try again later or go back to the home page.
            </p>
            <div className="flex mt-6 gap-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => window.location.reload()} // Thêm tính năng Retry
                >
                    Retry
                </button>
                <button
                    className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => route.push('/')} // Điều hướng về trang chủ
                >
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
