import styles from "./circle.module.css";

interface CircleProps {
  x: number;
  y: number;
}

export function Circle({ x, y }: CircleProps) {
  const left = x - 12.5;
  const top = y - 12.5;

  return (
    <div
      className={styles.circle}
      style={{
        position: "absolute",
        top,
        left,
      }}
    ></div>
  );
}
