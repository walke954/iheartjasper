import { useState, forwardRef, useImperativeHandle } from 'react';

import menu from '../../assets/menu.png';

import css from './styles.module.css';

const ViewNav = (props, ref) => {
  const { navigation, content } = props;

  const [collapse, setCollapse] = useState(true);

  useImperativeHandle(ref, () => ({
    collapse: () => setCollapse(true),
    expand: () => setCollapse(false)
  }), []);

  const dropdownStyles = [css.dropdown];
  const overlayStyles = [css.contentOverlay];
  if (collapse) {
    dropdownStyles.push(css.hidden);
    overlayStyles.push(css.hidden);
  }

  return (
    <div className={css.container}>
      <div className={css.whitespace} />
      <nav className={css.navTopbar}>
        <div className={css.topbarActions}>
          <button
            className={css.menuBtn}
            onClick={() => setCollapse(!collapse)}
          >
            <img src={menu} alt="show-menu-icon" />
          </button>
        </div>
        <div className={dropdownStyles.join(' ')}>
          {navigation}
        </div>
      </nav>
      <nav className={css.navSidebar}>
        {navigation}
      </nav>
      <main className={css.contentContainer}>
        <div className={overlayStyles} onClick={() => setCollapse(true)} />
        {content}
      </main>
    </div>
  );
}

export default forwardRef(ViewNav);
