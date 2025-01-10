import { ReactNode } from "react";

interface PlayerListProps {
  children: ReactNode;
}

// TODO: test ul instead of ol - why choose which one?
export default function PlayerList({ children }: PlayerListProps) {
  return <ul className="list">{children}</ul>;
}
