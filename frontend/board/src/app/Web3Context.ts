import React, { createContext, FC, ReactNode, useContext } from 'react';
import useWeb3Provider, { IWeb3State } from './useWeb3Provider';

export interface IWeb3Context {
  connectWallet: () => Promise<void | undefined>;
  disconnect: () => void;
  state: IWeb3State;
}

const Web3Context = createContext<IWeb3Context | null>(null);

type Web3ContextProviderProps = {
  children: ReactNode;
};

const Web3ContextProvider: FC<Web3ContextProviderProps> = ({ children }) => {
  const { connectWallet, disconnect, state } = useWeb3Provider();

  return (
    <Web3Context.Provider value={{ connectWallet, disconnect, state }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;

export const useWeb3Context = (): IWeb3Context | null =>
  useContext(Web3Context);
