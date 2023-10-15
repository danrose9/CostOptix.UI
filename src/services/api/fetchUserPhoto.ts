import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ACCOUNT_PHOTO } from './apiEndpoints';
import { updateAvatarUrl } from '../redux/reducers/userProfileSlice';
import fetchInstance from './fetchInstance';
import { getDefaultAvatarUrl } from '../../utils/getDefaultAvatarUrl';

// Custom hook for fetching the avatar URL
const useFetchAvatarUrl = () => {
  const fetchAvatarUrl = async () => {
    try {
      const response = await fetchInstance(ACCOUNT_PHOTO);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const imageBlob = await response.blob();
      return URL.createObjectURL(imageBlob);
    } catch (error) {
      return getDefaultAvatarUrl();
    }
  };
  return fetchAvatarUrl;
};

const UseFetchUserPhoto = () => {
  const dispatch = useDispatch();
  const fetchAvatarUrl = useFetchAvatarUrl();

  useEffect(() => {
    const setAvatarUrl = async () => {
      const avatarUrl = await fetchAvatarUrl();
      dispatch(updateAvatarUrl(avatarUrl));
    };
    setAvatarUrl();
  }, [dispatch, fetchAvatarUrl]);

  return null;
};

export default UseFetchUserPhoto;
