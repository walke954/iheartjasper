import { useRef, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import PoemView from './PoemView/index.jsx';
import PoemNav from './PoemNav/index.jsx';

import ViewNav from '../../layouts/ViewNav/index.jsx';

import firstTimeISawYourFace from '../../assets/poems/first-time-i-saw-your-face.json';
import kastinah from '../../assets/poems/kastinah.json';

const poems = [
  firstTimeISawYourFace,
  kastinah
].reverse();

export default function Poems() {
  const { poemId } = useParams();
  const navigate = useNavigate();

  const navRef = useRef();

  const poemData = useMemo(() => {
    return poems.find(p => p.id === poemId) || poems[0];
  }, [poemId]);

  useEffect(() => {
    if (poemData.id !== poemId) {
      navigate(`/${poemData.id}`, { replace: true });
    }
  }, [poemData, poemId])

  const navigation = (
    <PoemNav data={poems} onNavigate={() => navRef.current.collapse()} />
  );

  const content = (
    <PoemView data={poemData} />
  );

  return (
    <ViewNav
      ref={navRef}
      navigation={navigation}
      content={content}
    />
  );
}
