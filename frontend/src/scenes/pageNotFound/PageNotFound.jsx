import React from 'react';
import Lottie from 'lottie-react';
import Error from '../../assets/error.json';
import { wrapper } from './style';

export const PageNotFound = () => {
  const options = {
    loop: true,
    animationData: Error,
    autoplay: true,
  };

  return (
    <div style={wrapper}>
      <Lottie animationData={Error} LottieOptions={options} />
    </div>
  );
};
