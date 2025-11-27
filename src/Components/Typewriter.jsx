import React, { useState, useEffect } from "react";

const Typewriter = ({ words, speed = 150 }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        setText(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words, speed]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 border-r-2 border-cyan-400 animate-blink">
      {text}
    </span>
  );
};

export default Typewriter;
