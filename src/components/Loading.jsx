import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="" style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <LoadingBar
        style={{
          backgroundColor: '#4CAF50',
          height: '8px',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }} />
    </div>
  );
}

export default Loading;
