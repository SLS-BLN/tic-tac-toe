import { ReactNode } from "react";

interface PlayerListProps {
  children: ReactNode;
}

export default function PlayerList({ children }: PlayerListProps) {
  return <ol className="list">{children}</ol>;
}
