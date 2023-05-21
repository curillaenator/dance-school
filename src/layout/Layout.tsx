import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
