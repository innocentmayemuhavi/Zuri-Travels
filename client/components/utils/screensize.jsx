import React, { useState, useEffect } from 'react';

const useScreenSize = () => {
  // Initial screen size
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Update screen size when window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Attach event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      // Remove event listener on cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return screenSize;
};

export default useScreenSize;