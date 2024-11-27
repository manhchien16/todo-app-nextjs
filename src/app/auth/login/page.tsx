import Link from 'next/link';
import React from 'react';

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white border rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="info@site.com"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <button className="btn btn-primary w-full">Login</button>
                </form>

                <p className="mt-4 text-center">
                    <Link href="/auth/register" className="text-blue-500 hover:underline">
                        Forgot password?
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
