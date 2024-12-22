export default function Message({ title, text = null }) {
  return (
    <>
      <h2>{title}</h2>
      <p>{text}</p>
    </>
  );
}
