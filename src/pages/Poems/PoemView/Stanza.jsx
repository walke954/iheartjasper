import css from './styles.module.css';

export default function Stanza(props) {
  const { data } = props;

  const { transformations } = data;

  const lineEls = data.text.map((txt, i) => {
    if (transformations === 'highlight_first_letter') {
      txt = `<span style="color: ${data.highlightColor};">${txt.charAt(0)}</span>${txt.slice(1)}`;
    }

    return (
      <p
        key={i}
        dangerouslySetInnerHTML={{ __html: txt }}
      />
    );
  });

  return (
    <div className={css.stanza} style={{ color: data.fontColor }}>
      {lineEls}
    </div>
  );
}
