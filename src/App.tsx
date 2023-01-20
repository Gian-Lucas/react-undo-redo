import { MouseEvent, useState } from "react";
import styles from "./App.module.css";
import { Circle } from "./Circle";

interface Circle {
  id: string;
  x: number;
  y: number;
}

export function App() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [secondaryCircles, setSecondaryCircles] = useState<Circle[]>([]);

  function handleClick(event: MouseEvent) {
    const circle: Circle = {
      id: Math.floor(Math.random() * 2 ** 24).toString(16),
      y: event.pageY,
      x: event.pageX,
    };

    setCircles([...circles, circle]);
  }

  function undo() {
    const circle = circles[circles.length - 1];
    const newCircles = circles.filter((c) => c.id !== circle.id);

    setCircles(newCircles);
    setSecondaryCircles([...secondaryCircles, circle]);
  }

  function redo() {
    const circle = secondaryCircles[secondaryCircles.length - 1];
    const newCircles = secondaryCircles.filter((c) => c.id !== circle.id);

    setCircles([...circles, circle]);
    setSecondaryCircles(newCircles);
  }

  return (
    <>
      <div className={styles.buttons}>
        <button disabled={circles.length == 0} onClick={undo}>
          desfazer (undo)
        </button>
        <button disabled={secondaryCircles.length == 0} onClick={redo}>
          refazer (redo)
        </button>
      </div>
      <div className={styles.container} onClick={handleClick}>
        {circles.map((circle) => {
          return <Circle {...circle} key={circle.id} />;
        })}
      </div>
    </>
  );
}
