import { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect/dist/core";

// eslint-disable-next-line react/prop-types
const TypeWritter = ({ words ,color}) => {
  const typewriterRef = useRef(null);


  useEffect(() => {
    // Add more Tailwind color classes as needed

    const typewriter = new Typewriter(typewriterRef.current, {
      strings: words,
      autoStart: true,
      loop: true,
    });

    typewriter
      .pauseFor(1000) // Add a pause before starting

      .start();

    return () => {
      typewriter.stop(); // Stop typewriter when component unmounts
    };
  }, [words]);

  

  return <span className={`inline ${color}`} ref={typewriterRef}></span>;
};

export default TypeWritter;
