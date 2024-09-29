export default function PoemNav(props) {
  const { data, setView } = props;

  const navEls = data.map((poem) => (
    <div key={poem.id} onClick={() => setView(poem.id)}>
      <span>{poem.title}</span>
    </div>
  ));

  return (
    <div>
      {navEls}
    </div>
  );
}
