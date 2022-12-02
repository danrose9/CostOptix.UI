import React from 'react';
import { DashboardCard } from '../index';

import { useNavigate } from 'react-router-dom';

export const DummyCard = () => {
  const navigate = useNavigate();
  const handleRoute = () => {
    var route = '/dashboard';
    navigate(route);
  };

  return (
    <>
      <DashboardCard
        title="Dummy Card"
        icon="lab"
        iconcolor="teal"
        iconsize="big"
        content="$5,687.36"
        description="This is a test dashboard card that shows some high-level info"
        onClick={handleRoute}
      />
    </>
  );
};

export const DummyCard1 = () => {
  const navigate = useNavigate();
  const handleRoute = () => {
    var route = '/dashboard';
    navigate(route);
  };

  return (
    <>
      <DashboardCard
        title="Dummy Card 1"
        icon="recycle"
        iconcolor="blue"
        iconsize="big"
        content="47.81"
        description="This is a test dashboard card that shows some high-level info"
        onClick={handleRoute}
      />
    </>
  );
};

export const DummyCard2 = () => {
  const navigate = useNavigate();
  const handleRoute = () => {
    var route = '/dashboard';
    navigate(route);
  };

  return (
    <>
      <DashboardCard
        title="Dummy Card 2"
        icon="comment"
        iconcolor="red"
        iconsize="big"
        content="27/09/21"
        description="This is a test dashboard card that shows some high-level info"
        onClick={handleRoute}
      />
    </>
  );
};
