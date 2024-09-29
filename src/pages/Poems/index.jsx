import { useState } from 'react';

import PoemView from './PoemView/index.jsx';
import PoemNav from './PoemNav/index.jsx';

import ViewNav from '../../layouts/ViewNav/index.jsx';

import poem1 from '../../assets/poems/2024-09-26.json';
import poem2 from '../../assets/poems/2024-09-28.json';

const poems = [
  poem1,
  poem2
];

export default function Poems() {
  const [view, setView] = useState(poems[0].id);

  const navigation = (
    <PoemNav data={poems} setView={setView} />
  );

  const content = (
    <PoemView data={poems.find(p => p.id === view)} />
  );

  return (
    <ViewNav
      navigation={navigation}
      content={content}
    />
  );
}
