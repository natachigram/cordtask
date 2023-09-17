'use client';
import { useState, ChangeEvent } from 'react';
import { ethers } from 'ethers';
import 'dotenv/config';
require('dotenv').config();
import abi from './abi.json';

export default function Home() {
  const [inputValue1, setInputValue1] = useState<string>('');
  const [inputValue2, setInputValue2] = useState<string>('');
  const [connected, setConnected] = useState<string>('');
  const [currentCell, setCurrentCell] = useState<number>(0);
  const [currentColor, setCurrentColor] = useState<number>(0);

  const contractAddress = '0x318Af3833Ce46302Aad3d6BF1E8628De6017aE47';
  console.log(process.env.SEPOLIARPC);

  //@ts-ignore
  let provider = new ethers.BrowserProvider(window.ethereum);
  //@ts-ignore
  const contract = new ethers.Contract(contractAddress, abi, provider);
  let signer;
  const connect = async () => {
    //@ts-ignore
    if(typeof window !== 'undefined'){
await provider.send('eth_requestAccounts', ['sepolia']);
signer = provider.getSigner();
//@ts-ignore
try {
  const user = (await signer).getAddress();
  console.log(user);
  setConnected('connected');
  //    setuserAddr(user);
} catch (error) {
  console.error('Error fetching cell color:', error);
}
    }
    
  };

  //---------------------------------------------------------

  async function locateCell(e: any) {
    e.preventDefault();

   
    try {
       
       signer = await provider?.getSigner();
       //@ts-ignore
      const tx = await contract.connect(signer).locateCell(inputValue1, inputValue2);
      await tx.wait();
      console.log('Cell located:', tx);
      //@ts-ignore
      const cellNumber = await contract.connect(signer).cellNumber();
      console.log(parseInt(cellNumber));
      setCurrentCell(parseInt(cellNumber));
      //@ts-ignore
      const colorId = await contract.connect(signer).cellColors(cellNumber);
      console.log(parseInt(colorId));
      setCurrentColor(parseInt(colorId));
      
      
      
    } catch (error) {
      console.error('Error locating cell:', error);
      throw error;
    }
  }

  //----------------------------------------------------------

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

  // Function to get color for a cell based on its number
function getColorForCell(cellColor: number): string {
  switch (cellColor) {
    case 1:
      return 'black';
    case 2:
      return 'red';
    case 3:
      return 'yellow';
    default:
      return 'transparent'; // Change this to the default color you want
  }
}

  const divs = [];

  // Loop to create 35 divs
 for (let i = 1; i < 36; i++) {
   const backgroundColor =
     i === currentCell ? getColorForCell(currentColor) : 'transparent';

   divs.push(
     <div
       key={i}
       className='bg-[white]/30 p-2 rounded-md font-semibold text-4xl text-center cursor-pointer'
       style={{ backgroundColor }}
     >
       {i}
     </div>
   );
 }

  return (
    <div>
      {connected == 'connected' ? (
        <main className='flex items-center min-h-screen flex-row  min-w-fit bg-gradient-to-r from-colorRight to-colorLeft'>
          <div className=' basis-2/4 right-section h-full p-12'>
            <h1 className='font-primary font-bold text-9xl'>Board Dapp</h1>
            <p className='text-xl font-light mt-4'>
              Enter Values to locate your box. Row values should not exceed 5
              and column values should exceed 7 👍 🦄
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
                onClick={(e) => locateCell(e)}
              >
                Locate Box
              </button>
            </form>
          </div>

          <div className=' basis-2/4 left-section p-12 '>
            <div className='container h-full border rounded-md border-[white]'>
              {divs}
            </div>
          </div>
        </main>
      ) : (
        <div className='flex items-center justify-center flex-col min-h-screen min-w-fit fconnect-wallet bg-gradient-to-r from-colorRight to-colorLeft'>
          <h1 className='font-primary font-bold text-9xl flex justify-center items-center'>
            Board Dapp
          </h1>
          <button
            className='font-bold cursor-pointer h-14 bg-colorLeft w-2/5 mt-4 rounded-md'
            onClick={connect}
          >
            Connect Wallet To Continue
          </button>
        </div>
      )}
    </div>
  );
}
