import { useSelector } from 'react-redux';
import { IRootState } from '../services/redux/rootReducer';

// Custom hook to get the isCurrencyConflict value
export const useIsCurrencyConflict = () => {
  const isCurrencyConflict = useSelector((state: IRootState) => state.serviceProvider.isCurrencyConflict);
  return isCurrencyConflict;
};
