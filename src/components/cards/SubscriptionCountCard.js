import React from 'react';
import { DashboardCard } from '../index';
import { useNavigate } from 'react-router-dom';

const ServiceConnectionCard = () => {
  const navigate = useNavigate();
  const handleRoute = () => {
    var route = '/subscriptions';
    navigate(route);
  };

  return (
    <>
      <DashboardCard
        title="Total Subscriptions"
        icon="id card"
        iconcolor="teal"
        iconsize="big"
        content="5"
        description="Total subscription count across your service connections"
        onClick={handleRoute}
      />
    </>
  );
};

export default ServiceConnectionCard;
