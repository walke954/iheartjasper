import { useRef, useEffect, useCallback } from 'react';

import Stanza from './Stanza.jsx';
import Title from './Title.jsx';

import interpolate from '../../../utils/interpolate';
import stringColorToRGB from '../../../utils/stringColorToRGB';

import css from './styles.module.css';

export default function PoemView(props) {
  const { data } = props;

  const poemId = data.id;

  const containerRef = useRef();
  const titleRef = useRef();

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

    const halfBodyLength = (1 / data.body.length) / 2;
    percent = Math.max(0, Math.min(0.99999, percent - halfBodyLength));

    const floatIndex = Math.max(0, data.body.length * percent);
    const index = Math.floor(floatIndex);

    const currentStanza = data.body[index];
    const nextStanza = data.body[index + 1] || currentStanza;

    updateBackgroundColor(currentStanza, nextStanza, floatIndex - index);
  }, [data, updateBackgroundColor]);

  function onScroll(e) {
    const { scrollTop, scrollHeight, offsetHeight } = e.target;

    const titleHeight = titleRef.current.offsetHeight;

    const paddingHeight = parseFloat(getComputedStyle(e.target).padding);

    const perc = (scrollTop - titleHeight - paddingHeight) / (scrollHeight - titleHeight - (paddingHeight * 2) - offsetHeight);

    if (isNaN(perc)) {
      return;
    }

    adjustColors(perc);
  }

  useEffect(() => {
    containerRef.current?.scrollTo(0, 0);
    adjustColors(0);
  }, [poemId]);

  const bodyEls = data.body.map((stanza, i) => (
    <Stanza
      key={i}
      data={stanza}
      fullHeight={data.transformations === 'full_height'}
      textAlign={data.textAlign}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={css.container}
      onScroll={onScroll}
    >
      <Title ref={titleRef} data={data} />
      {bodyEls}
    </div>
  );
}
