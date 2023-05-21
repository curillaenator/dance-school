import React, { FC, Suspense, type PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header';

const RouteFallback: FC<PropsWithChildren> = ({ children }) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

export const Layout: FC = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Header />
      <Outlet />
    </Suspense>
  );
};
