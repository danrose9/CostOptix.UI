import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { incrementLoginCount } from '../../../services/redux/thunks/userProfileThunk';
import { Navigate } from 'react-router-dom';

// interface ITrialModeProps {
//   dismissModal: (value: boolean) => void;
//   trialsLeft: number;
// }

// const TrialMode: React.FC<ITrialModeProps> = (props) => {
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const handleAcceptTrialMode = () => {
//     dispatch<AppDispatch>(incrementLoginCount());
//     props.dismissModal(false);
//     navigate(appRoutes.COST_DASHBOARD);
//   };

//   return (
//     <Grid.Column>
//       <Header icon>
//         <Icon name="paper plane outline" />
//         Continue with your trial
//         <Header.Subheader>Remember, you only have {props.trialsLeft} free login left!</Header.Subheader>
//       </Header>

//       <Button primary onClick={() => handleAcceptTrialMode()}>
//         Continue
//       </Button>
//     </Grid.Column>
//   );
// };

// interface IBetaModeProps {
//   dismissModal: (value: boolean) => void;
//   showExitButton?: boolean;
// }

// const BetaMode: React.FC<IBetaModeProps> = (props) => {
//   const navigate = useNavigate();

//   const handleAcceptBetaMode = () => {
//     props.dismissModal(false);
//     navigate(appRoutes.BETA_PROGRAM_SIGNUP);
//   };

//   const handleLogout = () => {
//     Logout();
//     navigate(appRoutes.HOME);
//   };

//   return (
//     <>
//       <Grid.Column>
//         <Header icon>
//           <Icon name="world" />
//           Join the Beta program
//           <Header.Subheader>We'd love to hear your feedback.</Header.Subheader>
//         </Header>
//         <BtnGroup>
//           <Button
//             primary
//             onClick={() => {
//               handleAcceptBetaMode();
//             }}
//           >
//             Yep, I'm in
//           </Button>
//           {props.showExitButton ? (
//             <Button
//               onClick={() => {
//                 handleLogout();
//               }}
//             >
//               No Thanks
//             </Button>
//           ) : (
//             ''
//           )}
//         </BtnGroup>
//       </Grid.Column>
//     </>
//   );
// };

const LandingPage = () => {
  const dispatch = useDispatch();

  /*
  const remainingLogins = useSelector(
    (state: IRootState) => state[reduxState.USER_PROFILE].organization.remainingLogins
  );
  const { isDemo } = useSelector((state: IRootState) => state[reduxState.USER_PROFILE]);

  */
  useEffect(() => {
    dispatch<AppDispatch>(incrementLoginCount());
  }, [dispatch]);

  return (
    <>
      <Navigate to="/dashboard-cost" />
    </>
  );
};

export default LandingPage;
