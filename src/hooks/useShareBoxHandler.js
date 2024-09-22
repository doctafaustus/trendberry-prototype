import { useEffect } from 'react';

const useShareBoxHandler = (ref, buttonSelector, isVisible, setIsVisible) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, isVisible, setIsVisible]);

  useEffect(() => {
    const handleButtonClick = (event) => {
      if (isVisible && event.target.matches(buttonSelector)) {
        event.stopPropagation();
        setIsVisible(false);
      }
    };

    const button = document.querySelector(buttonSelector);
    if (button) {
      button.addEventListener('click', handleButtonClick);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleButtonClick);
      }
    };
  }, [buttonSelector, isVisible, setIsVisible]);
};

export default useShareBoxHandler;