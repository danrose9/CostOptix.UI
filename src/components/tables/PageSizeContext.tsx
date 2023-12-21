import React, { createContext, useState, useContext } from 'react';
import { defaultPageSize } from 'src/app/constants/application';

interface PageSizeContextType {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

const PageSizeContext = createContext<PageSizeContextType>({
  pageSize: defaultPageSize,
  setPageSize: () => {},
});

export const usePageSize = () => useContext(PageSizeContext);

interface IPageSizeProvider {
  children: React.ReactNode;
}

export const PageSizeProvider: React.FC<IPageSizeProvider> = ({ children }) => {
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  return <PageSizeContext.Provider value={{ pageSize, setPageSize }}>{children}</PageSizeContext.Provider>;
};
