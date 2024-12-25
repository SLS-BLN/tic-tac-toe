interface MessageProps {
  title: string;
  text?: string;
  winnerName: string;
}

export default function Message({ title, text, winnerName }: MessageProps) {
  return (
    <>
      <h2>
        {title}, {winnerName}!
      </h2>
      <p>{text}</p>
    </>
  );
}
