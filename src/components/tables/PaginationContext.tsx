import React, { createContext, useState, useContext } from 'react';
import { defaultPageSize } from 'src/app/constants/application';

interface IPageinationProvider {
  children: React.ReactNode;
}

interface PaginationContextType {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationContext = createContext<PaginationContextType>({
  pageSize: defaultPageSize,
  setPageSize: () => {},
  skip: 0,
  setSkip: () => {},
  activePage: 1,
  setActivePage: () => {},
});

export const usePagination = () => useContext(PaginationContext);

export const PaginationProvider: React.FC<IPageinationProvider> = ({ children }) => {
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [skip, setSkip] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);

  return (
    <PaginationContext.Provider value={{ pageSize, setPageSize, skip, setSkip, activePage, setActivePage }}>
      {children}
    </PaginationContext.Provider>
  );
};
