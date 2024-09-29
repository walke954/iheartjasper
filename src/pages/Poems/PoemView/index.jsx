import { useRef, useEffect, useCallback } from 'react';

import Stanza from './Stanza.jsx';

import interpolate from '../../../utils/interpolate';
import stringColorToRGB from '../../../utils/stringColorToRGB';

import css from './styles.module.css';

export default function PoemView(props) {
  const { data } = props;

  const poemId = data.id;

  const containerRef = useRef();

  const updateBackgroundColor = useCallback((currentStanza, nextStanza, percent) => {
    const currentBackgroundRGB = stringColorToRGB(currentStanza.backgroundColor);
    const nextBackgroundRGB = stringColorToRGB(nextStanza.backgroundColor);

    const interBackgroundRGB = currentBackgroundRGB.map((v, i) => {
      return interpolate(v, nextBackgroundRGB[i], percent);
    });

    const [red, green, blue, alpha] = interBackgroundRGB;

    const backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha || 1})`;

    containerRef.current.style.backgroundColor = backgroundColor;
  }, []);

  const adjustColors = useCallback((percent) => {
    if (!containerRef.current) {
      return;
    }

    percent = Math.max(0, Math.min(0.99999, percent));
    const floatIndex = Math.max(0, (data.body.length * percent) - 0.5);
    const index = Math.floor(floatIndex);

    const currentStanza = data.body[index];
    const nextStanza = data.body[index + 1] || currentStanza;

    updateBackgroundColor(currentStanza, nextStanza, floatIndex - index);
  }, [data, updateBackgroundColor]);

  function onScroll(e) {
    const { scrollTop, scrollHeight, offsetHeight } = e.target;

    const perc = scrollTop / (scrollHeight - offsetHeight);

    if (isNaN(perc)) {
      return;
    }

    adjustColors(perc);
  }

  useEffect(() => {
    containerRef.current?.scrollTo(0, 0);
    adjustColors(0);
  }, [poemId]);

  const bodyEls = data.body.map((stanza, i) => <Stanza key={i} data={stanza} />);

  return (
    <div
      ref={containerRef}
      className={css.container}
      onScroll={onScroll}
    >
      {bodyEls}
    </div>
  );
}
