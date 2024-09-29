import { useRef, useEffect } from 'react';

import Stanza from './Stanza.jsx';

import css from './styles.module.css';

export default function PoemView(props) {
  const { data } = props;

  const containerRef = useRef();

  useEffect(() => {

  }, []);

  const bodyEls = data.body.map((stanza, i) => <Stanza key={i} data={stanza} />);

  return (
    <div ref={containerRef} className={css.container}>
      {bodyEls}
    </div>
  );
}
