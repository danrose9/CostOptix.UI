import React, { useReducer, useEffect } from 'react';
import JoyRide, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { tourReducer } from './tourReducer';
import { DEFAULT_TOUR_STEPS } from './defaultTourSteps';
import { NEW_SIGNUP_TOUR_STEPS } from './newSignupTourSteps';
import ReactGA from 'react-ga4';
import { GA_EVENTS } from '../../app/constants/analyticEvents';

interface TourProps {
  shouldStart: boolean;
  tourType: string;
}

const Tour: React.FC<TourProps> = ({ shouldStart, tourType }) => {
  const steps = tourType === 'default' ? DEFAULT_TOUR_STEPS : NEW_SIGNUP_TOUR_STEPS;

  const INITIAL_STATE = {
    key: new Date(),
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: steps,
  };

  // Tour state is the state which control the JoyRide component
  const [tourState, dispatch] = useReducer(tourReducer, INITIAL_STATE);

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldStart) {
      ReactGA.event(GA_EVENTS.TOUR_STARTED, { tourType: tourType });
      dispatch({ type: 'START' });
    }
  }, [shouldStart, navigate, tourType]);

  // Set once tour is viewed, skipped or closed
  const setTourViewed = () => {
    ReactGA.event(GA_EVENTS.TOUR_COMPLETED, { tourType: tourType });
    // localStorage.setItem("tour", "1");
  };

  const callback = (data: any) => {
    const { action, index, type, status, step } = data;

    if (action === ACTIONS.CLOSE || (status === STATUS.SKIPPED && tourState.run) || status === STATUS.FINISHED) {
      setTourViewed();
      dispatch({ type: 'STOP' });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // Check if a redirect is needed before dispatching NEXT_OR_PREV

      const payload = { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) };
      if (step.redirectTo) {
        // delay in ms if redirect is request to allow component to mount
        const delay = 400;

        navigate(step.redirectTo);
        setTimeout(() => {
          dispatch({
            type: 'NEXT_OR_PREV',
            payload: payload,
          });
        }, delay);
      } else {
        dispatch({
          type: 'NEXT_OR_PREV',
          payload: payload,
        });
      }
    }
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
