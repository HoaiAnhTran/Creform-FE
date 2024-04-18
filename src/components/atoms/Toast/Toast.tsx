import { ToastContainer, Zoom } from 'react-toastify';

import { TOAST_DURATION } from '@/configs';

import 'react-toastify/dist/ReactToastify.css';

export const Toast = () => (
  <ToastContainer
    position='top-right'
    autoClose={TOAST_DURATION.DEFAULT}
    newestOnTop
    pauseOnHover
    pauseOnFocusLoss
    closeOnClick={false}
    rtl={false}
    draggable={false}
    transition={Zoom}
  />
);
