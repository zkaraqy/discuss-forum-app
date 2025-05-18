import React from 'react';

export default function NotFoundPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-md">
        <div className="card-body flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-red-500">404</h1>
          <p className="text-center mt-4 text-lg font-semibold">
            Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
}