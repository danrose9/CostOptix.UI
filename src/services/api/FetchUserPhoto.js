import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ACCOUNT_PHOTO } from './apiEndpoints';
import { updateAvatarUrl } from '../../services/redux/reducers/userProfileSlice';
import fetchInstance from '../api/fetchInstance';
import { getDefaultAvatarUrl } from '../../utils/getDefaultAvatarUrl';

export const FetchUserPhoto = async () => {
  const dispatch = useDispatch();

  const fetchAvatarUrl = async () => {
    const response = await fetchInstance(ACCOUNT_PHOTO)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.blob();
      })
      .then((imageBlob) => {
        return URL.createObjectURL(imageBlob);
      })
      .catch(function (error) {
        return getDefaultAvatarUrl();
      });

    return response;
  };

  const setAvatarUrl = async () => {
    const avatarUrl = await fetchAvatarUrl();
    dispatch(updateAvatarUrl(avatarUrl));
  };

  useEffect(() => {
    setAvatarUrl();
  });

  return null;
};
