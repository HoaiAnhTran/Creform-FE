import { useNavigate } from 'react-router-dom';

import { PATH } from '@/constants/routes';
import { httpClient } from '@/utils';

export const MyFormPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    httpClient.logout();
    navigate(`/${PATH.LOGIN_PAGE}`);
  };

  return (
    <div>
      My Form Page
      <button onClick={handleLogout} className='h-10 w-10 bg-black'></button>
    </div>
  );
};
