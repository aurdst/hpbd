import { useState, useEffect } from 'react';
import { getRandomQuote } from '../../services/birthdayApiService';

function QuoteComponent(props) {
  const [Quote, setQuote] = useState();

  useEffect(() => {
    getRandomQuote()
      .then((result) => {
        return setQuote(result);
      })
      .catch(() => {
        return setQuote({});
      });
  }, []);

  return (
    <div
      className={`${props.width ? props.width : 'max-w-3xl'} m-auto relative`}
    >
      <div
        className="absolute right-2 top-2 border-2 border-slate-900 w-full h-full rounded-xl"
        style={{ background: `${props.currentColor}` }}
      ></div>
      <div className="relative border-2 border-slate-900 bg-white px-9 py-6 rounded-xl font-bison text-3xl">
        <p>{Quote?.quote}</p>
        <span className="block text-right mt-2">&mdash; {Quote?.author}</span>
      </div>
    </div>
  );
}

export default QuoteComponent;
