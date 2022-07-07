import React from 'react';
import BackButton from '../BackButton';
import { useParams } from 'react-router-dom';

const UserCard = () => {
  const { id } = useParams();

  return (
    <div>
      <BackButton />
    </div>
  );
};

export default UserCard;
