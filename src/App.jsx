import React, { useState } from 'react';
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
  function refreshPage() {
    window.location.reload(false);
  }

  const maskedWord = word.split('').map(letter => correctGuesses.includes(letter) ? letter : "_").join(" ");

  const validateCharacter = (alphabet) => {
    setGuessedWords([...GuessedWords, alphabet]);
    if (word.includes(alphabet)) {
      setCorrectGuesses([...correctGuesses, alphabet]);
    }
  }

  const revealAnswer = () => {
    setIsRevealed(true); //
    setCorrectGuesses(word)
  }

  return (
    <>
      <div className={`transition-colors duration-300 w-screen h-screen ${!maskedWord.includes("_") ? "bg-green-900" : "bg-slate-900"} flex flex-col items-center justify-center`}>
        <h1 className='text-white text-5xl p-8'>Guess The Word!</h1>
        <p className='text-white text-2xl'>Type: {wordType}</p>
        <div className='p-8 m-4 bg-slate-500 rounded-lg'>
          <h2 className='text-white text-6xl' ref={answerRef}>{maskedWord}</h2>
        </div>

        <div className="grid grid-cols-12">
          {alphabets.map((alphabet, index) => <button className="text-3xl bg-slate-500 p-3 m-3 text-white rounded-lg" id={alphabet} key={index} onClick={() => { validateCharacter(alphabet); }}>{alphabet}</button>)}
        </div>
        <div className='flex flex-row gap-x-8'>
          {!maskedWord.includes("_") ?
            <p className='p-4 bg-green-500 rounded-lg'>{isRevealed ? "Answer Revealed" : "You Guessed it!"}</p> :
            <div className='flex flex-row gap-x-8'>
              <p className='p-4 bg-red-500 rounded-lg'>Haven't Guessed Yet</p>
              <button className='bg-slate-500 p-4 rounded-lg' onClick={revealAnswer}>Reveal Answer</button>
            </div>}
          <button className="bg-slate-500 p-4 rounded-lg" onClick={refreshPage}>Refresh</button>
        </div>
      </div>
    </>
  );
}