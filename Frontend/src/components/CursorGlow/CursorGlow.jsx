import { useEffect, useState } from "react";
import "./CursorGlow.css";

function CursorGlow() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
    visible: false,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
        visible: true,
      });
    };

    const handleMouseLeave = () => {
      setPosition((current) => ({
        ...current,
        visible: false,
      }));
    };

    const handleMouseEnter = () => {
      setPosition((current) => ({
        ...current,
        visible: true,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      className={`cursor-glow${position.visible ? " cursor-glow-visible" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      aria-hidden="true"
    >
      <span className="cursor-glow-core" />
    </div>
  );
}

export default CursorGlow;