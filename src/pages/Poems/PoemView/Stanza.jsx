import css from './styles.module.css';

export default function Stanza(props) {
  const { data, fullHeight, textAlign } = props;

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

  const calcStanzaStyles = {
    color: data.fontColor,
    alignItems: textAlign || undefined
  };

  const stanzaStyles = [css.stanza];
  if (fullHeight) {
    stanzaStyles.push(css.fullHeight);
  }

  return (
    <div className={stanzaStyles.join(' ')} style={calcStanzaStyles}>
      {lineEls}
    </div>
  );
}
