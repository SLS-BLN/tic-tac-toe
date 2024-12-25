import { ReactNode } from "react";

interface BoardProps {
  children: ReactNode;
}

export default function Board({ children }: BoardProps) {
  return <section className="box">{children}</section>;
}
