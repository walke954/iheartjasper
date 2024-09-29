import css from './styles.module.css';

export default function Stanza(props) {
  const { data } = props;

  const lineEls = data.text.map((txt, i) => (
    <p key={i} dangerouslySetInnerHTML={{ __html: txt }} />
  ));

  return (
    <div className={css.stanza} style={{ color: data.fontColor }}>
      {lineEls}
    </div>
  );
}
