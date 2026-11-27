import React from 'react';
import logoImg from '../../assets/logo.png';

export const Logo = ({
  size = 'md',
  className = '',
  rounded = 'rounded-full'
}) => {
  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const selectedSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative shrink-0 overflow-hidden ${selectedSize} ${rounded} ${className} drop-shadow-sm`}>
      <img
        src={logoImg}
        alt="Logo Info UMPTKIN"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
