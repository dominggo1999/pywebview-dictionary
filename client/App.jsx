import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Definitions from '~/layout/Definitions/Definitions.jsx';
import useWordStore from '~/store/useWordStore.jsx';
import Sentences from '~/layout/Sentences/Sentences.jsx';
import { AppWrapper, ScrollbarStyle } from './App.style.jsx';

const App = () => {
  const changeWord = useWordStore((state) => state.changeWord);
  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    const targetWord = pathname.replace('/', '');
    if (targetWord) {
      changeWord(targetWord);
      document.title = `Dictionary | ${targetWord.toLowerCase().trim()}`;
    }
  }, [pathname]);

  return (
    <>
      <ScrollbarStyle />
      <AppWrapper>
        <Definitions />
        <Sentences />
      </AppWrapper>
    </>
  );
};

export default App;
