import { useState, useEffect } from 'react';

/**
 * A hook that conditionally renders a component based on the window width.
 * @param {JSX.Element} Component - The component to render.
 * @param {number} maxWidth - The maximum width to display the component.
 * @returns {JSX.Element|null} - The component or null.
 */

export const useMobileDevice = (
  Component: JSX.Element,
  maxWidth: number = 640,
  render: boolean = true
): JSX.Element | null => {
  const [shouldRender, setShouldRender] = useState(
    render ? window.innerWidth <= maxWidth : window.innerWidth > maxWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setShouldRender(render ? window.innerWidth <= maxWidth : window.innerWidth > maxWidth);
    };

    window.addEventListener('resize', handleResize);
    // Set initial state
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [maxWidth, render]);

  return shouldRender ? Component : null;
};
