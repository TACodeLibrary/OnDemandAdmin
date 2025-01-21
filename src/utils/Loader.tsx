import React from 'react';
import { Watch } from 'react-loader-spinner';

const Loader: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#ffffff"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
