import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { PATH } from '@/constants/routes';
import {
  BuildFormContextProvider,
  ElementLayoutProvider,
  OverviewContextProvider,
} from '@/contexts';
import { BuildSection } from '@/organisms/BuildSection';
import { PreviewSection } from '@/organisms/PreviewSection';
import { PublishSection } from '@/organisms/PublishSection';
import { AcceptInvitationPage } from '@/pages/AcceptInvitationPage';
import { AccountPage } from '@/pages/AccountPage';
import { BuildFormPage } from '@/pages/BuildFormPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { LoadingPage } from '@/pages/LoadingPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OverviewPage } from '@/pages/OverviewPage';
import { PublicPage } from '@/pages/PublicPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { SignupPage } from '@/pages/SignupPage';
import { TeamPage } from '@/pages/TeamPage';
import { getAccessTokenFromLS } from '@/utils';

const ResponsesPage = lazy(() => import('@/pages/ResponsesPage'));
const TemplatesPage = lazy(() => import('@/pages/TemplatesPage'));

// route required authentication to navigate
export function ProtectedRoute() {
  const isAuthenticated = Boolean(getAccessTokenFromLS());
  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN_PAGE} />;
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
        {
          path: PATH.FORGOT_PASSWORD_PAGE,
          element: <ForgotPasswordPage />,
        },
        {
          path: PATH.RESET_PASSWORD_PAGE,
          element: <ResetPasswordPage />,
        },
      ],
    },
    {
      path: PATH.ROOT_PAGE,
      element: <ProtectedRoute />,
      children: [
        {
          path: PATH.OVERVIEW_PAGE,
          element: (
            <OverviewContextProvider>
              <OverviewPage />
            </OverviewContextProvider>
          ),
        },
        {
          path: PATH.BUILD_FORM_PAGE,
          element: (
            <BuildFormContextProvider>
              <ElementLayoutProvider>
                <BuildFormPage />
              </ElementLayoutProvider>
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
            {
              path: 'preview',
              element: <PreviewSection />,
            },
            {
              path: 'publish/preview',
              element: <PreviewSection />,
            },
          ],
        },
        {
          path: PATH.EDIT_FORM_PAGE,
          element: (
            <BuildFormContextProvider>
              <ElementLayoutProvider>
                <BuildFormPage />
              </ElementLayoutProvider>
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
            {
              path: 'preview',
              element: <PreviewSection />,
            },
            {
              path: 'publish/preview',
              element: <PreviewSection />,
            },
          ],
        },
        {
          path: PATH.MY_ACCOUNT_PAGE,
          element: <AccountPage />,
        },
        {
          path: PATH.RESPONSE_PAGE,
          element: (
            <Suspense fallback={<LoadingPage />}>
              <ResponsesPage />
            </Suspense>
          ),
        },
        {
          path: PATH.MY_TEAMS_PAGE,
          element: <TeamPage />,
        },
        {
          path: PATH.TEAMS_SETTINGS_PAGE,
          element: <TeamPage />,
        },
        {
          path: PATH.TEMPLATES_PAGE,
          element: (
            <Suspense fallback={<LoadingPage />}>
              <TemplatesPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: PATH.PUBLIC_PAGE,
      element: (
        <ElementLayoutProvider>
          <PublicPage />
        </ElementLayoutProvider>
      ),
    },
    {
      path: PATH.ACCEPT_INVITATION_PAGE,
      element: <AcceptInvitationPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
  return routeElements;
}
