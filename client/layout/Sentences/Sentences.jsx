import React from 'react';
import short from 'short-uuid';
import useDictionary from '~/hooks/useDictionary.jsx';
import { highlightWord } from '~/util/highlightWord.js';
import { SentencesWrapper } from './Sentences.style.jsx';

const Sentences = () => {
  const {
    results: sentences, loading, error, word,
  } = useDictionary('hippo', 'sentences');

  return (
    <SentencesWrapper>
      <ul>
        {
          sentences?.length > 0 && sentences.map((i) => {
            return (
              <li key={short.generate()}>
                {highlightWord(i, word)}
              </li>
            );
          })
        }
      </ul>
    </SentencesWrapper>
  );
};

export default Sentences;
