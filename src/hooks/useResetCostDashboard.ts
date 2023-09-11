import { useDispatch } from 'react-redux';
import { resetServiceProviders } from '../services/redux/reducers/serviceProvidersSlice';
import { resetCostDashboard } from '../services/redux/reducers/costDashboardSlice';
import { AppDispatch } from '../services/redux/store';

const useResetCostDashboard = () => {
  const dispatch = useDispatch();

  return () => {
    // Return a function
    dispatch(resetCostDashboard(true));
    dispatch(resetServiceProviders());
  };
};

export default useResetCostDashboard;
