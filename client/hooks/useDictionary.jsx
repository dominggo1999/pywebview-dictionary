import React, { useEffect, useState } from 'react';
import useWordStore from '~/store/useWordStore.jsx';

const fetchDictionary = async (type, word) => {
  const api = window.pywebview.api;

  switch (type) {
    case 'hippo':
      return api.get_hippo_sentences(word);
    case 'synonyms':
      return api.get_power_thesaurus_synonyms(word);
    case 'vocab':
      return api.get_vocab_com_definitions(word);
    case 'youdao':
      return api.get_indo_definitions(word);
    case 'audio':
      return api.get_google_tts(word);

    default:
      break;
  }
};

const useDictionary = (type, key) => {
  const word = useWordStore((state) => state.word);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    const getResults = async () => {
      setResults(null);
      setLoading(true);

      try {
        const { [key]: res } = await fetchDictionary(type, word);
        setResults(res);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getResults();
  }, [word]);

  return {
    loading, error, results, word,
  };
};

export default useDictionary;
