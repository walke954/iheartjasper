import css from './styles.module.css';

export default function Stanza(props) {
  const { data, fullHeight } = props;

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

  const stanzaStyles = {
    color: data.fontColor,
    height: fullHeight ? '100vh' : undefined
  };

  // full-height

  return (
    <div className={css.stanza} style={stanzaStyles}>
      {lineEls}
    </div>
  );
}
