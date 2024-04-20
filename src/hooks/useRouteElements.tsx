import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { PATH } from '@/constants/routes';
import { BuildFormContextProvider } from '@/contexts';
import { BuildSection } from '@/organisms/BuildSection';
import { PublishSection } from '@/organisms/PublishSection';
import { AccountPage } from '@/pages/AccountPage';
import { BuildFormPage } from '@/pages/BuildFormPage';
import { LoginPage } from '@/pages/LoginPage';
import { OverviewPage } from '@/pages/OverviewPage';
import { SignupPage } from '@/pages/SignupPage';
import { getAccessTokenFromLS } from '@/utils';

// route required authentication to navigate
export function ProtectedRoute() {
  const isAuthenticated = Boolean(getAccessTokenFromLS());

  return isAuthenticated ? <Outlet /> : <Navigate to={`/${PATH.LOGIN_PAGE}`} />;
}

// when not authenticated, it will navigate to this route
export function RejectedRoute() {
  const isAuthenticated = Boolean(getAccessTokenFromLS());

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={PATH.OVERVIEW_PAGE} replace={true} />
  );
}

export function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: PATH.ROOT_PAGE,
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.ROOT_PAGE,
          element: <LoginPage />,
        },
        {
          path: PATH.LOGIN_PAGE,
          element: <LoginPage />,
        },
        {
          path: PATH.SIGNUP_PAGE,
          element: <SignupPage />,
        },
      ],
    },
    {
      path: PATH.ROOT_PAGE,
      element: <ProtectedRoute />,
      children: [
        {
          path: PATH.OVERVIEW_PAGE,
          element: <OverviewPage />,
        },
        {
          path: PATH.BUILD_FORM_PAGE,
          element: (
            <BuildFormContextProvider>
              <BuildFormPage />
            </BuildFormContextProvider>
          ),
          children: [
            {
              path: '',
              element: <BuildSection />,
            },
            {
              path: 'publish',
              element: <PublishSection />,
            },
          ],
        },
        {
          path: PATH.EDIT_FORM_PAGE,
          element: (
            <BuildFormContextProvider>
              <BuildFormPage />
            </BuildFormContextProvider>
          ),
          children: [
            {
              path: '',
              element: <BuildSection />,
            },
            {
              path: 'publish',
              element: <PublishSection />,
            },
          ],
        },
        {
          path: PATH.MY_ACCOUNT_PAGE,
          element: <AccountPage />,
        },
      ],
    },
  ]);
  return routeElements;
}
