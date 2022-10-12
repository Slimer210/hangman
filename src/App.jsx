import React, { useState, useEffect } from 'react';
import { WordList } from './data';

const wordList = JSON.parse(JSON.stringify(WordList));
const quote = wordList[Math.floor(Math.random() * wordList.length)];
console.log(quote);

export default function Hangman() {
  const answerRef = React.createRef();
  const word = quote.word.toUpperCase();
  const wordType = quote.type;
  const alphabets = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const [GuessedWords, setGuessedWords] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  function refreshPage() {
    window.location.reload(false);
  }

  const maskedWord = word.split('').map(letter => correctGuesses.includes(letter) ? letter : "_").join(" ");

  const validateCharacter = (alphabet) => {
    setGuessCount(guessCount+1);
    setGuessedWords([...GuessedWords, alphabet]);
    if (word.includes(alphabet)) {
      setCorrectGuesses([...correctGuesses, alphabet]);
    }
  }

  const handleKeyDown = (event) => { validateCharacter(event.key); }

  useEffect(() => { document.addEventListener('keydown', handleKeyDown) }, []);

  const revealAnswer = () => {
    setIsRevealed(true); //
    setCorrectGuesses(word)
  }

  return (
    <>
      <div className={`py-4 transition-colors duration-300 w-screen min-h-screen max-h-content ${!maskedWord.includes("_") ? "bg-green-900" : "bg-slate-900"} flex flex-col items-center justify-center`}>
        <h1 className='text-white text-center text-5xl p-8'>Guess The Word!</h1>
        <p className='text-white text-center text-2xl'>Type: {wordType}</p>
        <div className='p-8 m-4 bg-slate-500 rounded-lg'>
          <h2 className='text-white text-center text-6xl' ref={answerRef}>{maskedWord}</h2>
        </div>

        <div className="grid sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 grid-cols-4 p-8">
          {alphabets.map((alphabet, index) => <button className={`transition-color duration-300 hover:scale-110 text-3xl ${GuessedWords.some(e => e==alphabet) ? correctGuesses.some(e => e==alphabet) ? "bg-green-400": "bg-slate-800": "bg-slate-500"} p-3 m-3 text-white text-center rounded-lg`} id={alphabet} key={index} onClick={() => { validateCharacter(alphabet); }}>{alphabet}</button>)}
        </div>
        <div className='flex flex-col sm:flex-row gap-8 items-center overflow-auto'>
          {!maskedWord.includes("_") ?
            <p className='p-4 bg-green-500 rounded-lg text-center'>{isRevealed ? "Answer Revealed" : "You Guessed it!"}</p> :
            <div className='flex flex-row'>
              <p className='p-4 bg-red-500 rounded-l-lg text-center'>Haven't Guessed Yet</p>
              <button className='bg-slate-500 text-white p-4 rounded-r-lg' onClick={revealAnswer}>Reveal Answer</button>
            </div>}
          <button className="bg-slate-500 p-4 rounded-lg" onClick={refreshPage}>Refresh</button>
          <h1 className='text-white'>Guess Count: {guessCount}</h1>
        </div>
      </div>
      
      <div className='absolute bottom-0 w-screen text-center text-white py-2'>Made by Slimer</div>
    </>
  );
}