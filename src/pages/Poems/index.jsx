import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import PoemView from './PoemView/index.jsx';
import PoemNav from './PoemNav/index.jsx';

import ViewNav from '../../layouts/ViewNav/index.jsx';

import firstSight from '../../assets/poems/first-sight.json';
import kastinah from '../../assets/poems/kastinah.json';

const poems = [
  firstSight,
  kastinah
].reverse();

export default function Poems() {
  const { poemId } = useParams();
  const navigate = useNavigate();

  const poemData = useMemo(() => {
    return poems.find(p => p.id === poemId) || poems[0];
  }, [poemId]);

  useEffect(() => {
    if (poemData.id !== poemId) {
      navigate(`/${poemData.id}`, { replace: true });
    }
  }, [poemData, poemId])

  const navigation = (
    <PoemNav data={poems} />
  );

  const content = (
    <PoemView data={poemData} />
  );

  return (
    <ViewNav
      navigation={navigation}
      content={content}
    />
  );
}
