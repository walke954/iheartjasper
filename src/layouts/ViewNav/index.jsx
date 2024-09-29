import css from './styles.module.css';

export default function ViewNav(props) {
  const { navigation, content } = props;

  return (
    <div className={css.container}>
      <nav className={css.navContainer}>
        {navigation}
      </nav>
      <main className={css.contentContainer}>
        {content}
      </main>
    </div>
  );
}
