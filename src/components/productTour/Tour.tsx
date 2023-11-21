import React, { useReducer, useEffect } from 'react';
import JoyRide, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { tourReducer, INITIAL_STATE } from './tourReducer';

interface TourProps {
  shouldStart: boolean;
}

const Tour: React.FC<TourProps> = ({ shouldStart }) => {
  // Tour state is the state which control the JoyRide component
  const [tourState, dispatch] = useReducer(tourReducer, INITIAL_STATE);

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldStart) {
      navigate('/dashboard-cost');
      dispatch({ type: 'START' });
    }
  }, [shouldStart]);

  // Set once tour is viewed, skipped or closed
  const setTourViewed = () => {
    // localStorage.setItem("tour", "1");
  };

  const callback = (data: any) => {
    const { action, index, type, status } = data;

    if (
      // If close button clicked, then close the tour
      action === ACTIONS.CLOSE ||
      // If skipped or end tour, then close the tour
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      setTourViewed();
      dispatch({ type: 'STOP' });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // Check whether next or back button click and update the step.
      dispatch({
        type: 'NEXT_OR_PREV',
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  const startTour = () => {
    // Start the tour manually
    dispatch({ type: 'RESTART' });
  };

  return (
    <>
      <JoyRide
        {...tourState}
        callback={callback}
        showSkipButton={true}
        showProgress={true}
        styles={{
          tooltipContainer: {
            textAlign: 'left',
          },
          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          last: 'End tour',
        }}
      />
    </>
  );
};

export default Tour;
