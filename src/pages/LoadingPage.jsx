import React from 'react';

export default function LoadingPage() {
  return (
    <div
      data-theme="light"
      className="flex justify-center items-center h-screen bg-base-200"
    >
      <div className="card w-96 bg-base-100 shadow-md">
        <div className="card-body flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
          <p className="text-center mt-4 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    </div>
  );
}
