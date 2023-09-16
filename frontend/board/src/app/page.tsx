'use client';
import { useState, ChangeEvent } from 'react';
// import '@rainbow-me/rainbowkit/styles.css';

export default function Home() {
  const [inputValue1, setInputValue1] = useState<string>('');
  const [inputValue2, setInputValue2] = useState<string>('');

  const maxLength1 = 5; // Maximum length for the first input
  const maxLength2 = 7; // Maximum length for the second input

  const handleInputChange1 = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue: string = event.target.value;

    // Check if the input value exceeds the maximum length
    if (newValue.length <= maxLength1) {
      setInputValue1(newValue);
    }
  };

  const handleInputChange2 = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue: string = event.target.value;

    // Check if the input value exceeds the maximum length
    if (newValue.length <= maxLength2) {
      setInputValue2(newValue);
    }
  };

  const divs = [];

  // Loop to create 35 divs
  for (let i = 1; i < 36; i++) {
    divs.push(
      <div
        key={i} // Make sure to include a unique key for each div
        className='bg-[white]/30 p-2 rounded-md font-semibold text-4xl text-center cursor-pointer'
      >
        {i}
      </div>
    );
  }

  return (
    <div>
      <main className='flex items-center min-h-screen flex-row  min-w-fit bg-gradient-to-r from-colorRight to-colorLeft'>
        <div className=' basis-2/4 right-section h-full p-12'>
          <h1 className='font-primary font-bold text-9xl'>Board Dapp</h1>
          <p className='text-xl font-light mt-4'>
            Enter Values to locate your box. Row values should not exceed 5 and
            column values should exceed 7 👍 🦄
          </p>
          <form className='flex flex-col mt-14'>
            <div className='inputs flex flex-row items-center gap-4'>
              <input
                placeholder='Row'
                type='number'
                className='cursor-pointer basis-2/4 w-28 h-14 text-2xl text-center border-2 rounded-md text-[white]'
                // max={5}
                // min={1}
                value={inputValue1}
                onChange={handleInputChange1}
                maxLength={maxLength1}
              />
              <input
                // min={1}
                // max={7}
                value={inputValue2}
                onChange={handleInputChange2}
                maxLength={maxLength2}
                placeholder='Column'
                type='number'
                className='cursor-pointer basis-2/4 w-28 h-14 text-2xl text-center border-2 rounded-md text-[white]'
              />
            </div>

            <button
              type='submit'
              className='font-bold cursor-pointer h-14 bg-colorLeft w-full mt-4 rounded-md'
            >
              Locate Box
            </button>
          </form>
        </div>

        <div className=' basis-2/4 left-section p-12 '>
          <div className='container h-full'>{divs}</div>
        </div>
      </main>
      <div className='min-h-screen min-w-fit fconnect-wallet bg-gradient-to-r from-colorRight to-colorLeft'>
        <h1 className='font-primary font-bold text-9xl flex justify-center items-center'>
          Board Dapp
        </h1>
        <form className='flex w-full justify-center items-center'>
          <button
            type='submit'
            className='font-bold cursor-pointer h-14 bg-colorLeft w-2/5 mt-4 rounded-md'
          >
            Connect Wallet To Continue
          </button>
        </form>
      </div>
    </div>
  );
}
