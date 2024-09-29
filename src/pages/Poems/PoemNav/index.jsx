import { Link } from 'react-router-dom';

import css from './styles.module.css';

export default function PoemNav(props) {
  const { data } = props;

  const navEls = data.map((poem) => (
    <Link key={poem.id} to={`/${poem.id}`}>
      <div className={css.navItem}>
        <span className={css.label}>{poem.title}</span>
      </div>
    </Link>
  ));

  return (
    <div className={css.container}>
      {navEls}
    </div>
  );
}
