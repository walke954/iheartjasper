import { forwardRef } from 'react';

import css from './styles.module.css';

const Title = (props, ref) => {
	const { data } = props;

	const titleStyles = {
		color: data.titleColor
	};

	const [year, month, day] = data.date.split('-');
	const timestamp = new Date(year, month - 1, day);
	const dateOpts = {
	  year: 'numeric',
	  month: 'long',
	  day: 'numeric'
	};
	const dateStr = timestamp.toLocaleDateString(undefined, dateOpts)

	return (
		<div ref={ref} className={css.title} style={titleStyles}>
			<h1>{data.title}</h1>
			<span>{dateStr}</span>
		</div>
	);
}

export default forwardRef(Title);
