import { ReactNode } from "react";

interface MessageProps {
  title: string;
  text?: string;
  winner?: string;
  children: ReactNode;
}

export default function Message({
  title,
  text,
  winner = "",
  children,
}: MessageProps) {
  return (
    <dialog open>
      <h2>
        {title}
        {winner && `, ${winner}`}!
      </h2>
      <p>{text}</p>
      {children}
    </dialog>
  );
}
