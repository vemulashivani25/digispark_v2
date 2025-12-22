/**
 * Custom hook for animated typing placeholder effect
 */

import { useState, useEffect, useCallback } from 'react';

interface UseTypingPlaceholderOptions {
  placeholders: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const useTypingPlaceholder = ({
  placeholders,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: UseTypingPlaceholderOptions): string => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  const typeChar = useCallback(() => {
    const fullText = placeholders[currentIndex];
    if (charIndex < fullText.length) {
      setCurrentPlaceholder(fullText.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
    } else {
      setIsTyping(false);
    }
  }, [charIndex, currentIndex, placeholders]);

  const deleteChar = useCallback(() => {
    if (charIndex > 0) {
      setCurrentPlaceholder((prev) => prev.substring(0, prev.length - 1));
      setCharIndex((prev) => prev - 1);
    } else {
      setIsTyping(true);
      setCurrentIndex((prev) => (prev + 1) % placeholders.length);
    }
  }, [charIndex, placeholders.length]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      const fullText = placeholders[currentIndex];
      if (charIndex < fullText.length) {
        timeout = setTimeout(typeChar, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsTyping(false), pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(deleteChar, deletingSpeed);
      } else {
        setIsTyping(true);
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    isTyping,
    charIndex,
    currentIndex,
    placeholders,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    typeChar,
    deleteChar,
  ]);

  return currentPlaceholder;
};

export default useTypingPlaceholder;
