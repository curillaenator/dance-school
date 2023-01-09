import React, { FC } from 'react';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { TITLES } from './constants';

interface HeadingProps {
  isMobile: boolean;
}

export const Heading: FC<HeadingProps> = (props) => {
  const { isMobile } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell>{TITLES.heading.name}</TableCell>

        <TableCell>{TITLES.heading.created}</TableCell>

        {!isMobile && (
          <>
            <TableCell>{TITLES.heading.tel}</TableCell>

            <TableCell align="right">{TITLES.heading.comment}</TableCell>

            <TableCell align="right">{TITLES.heading.called}</TableCell>

            <TableCell align="right">{TITLES.heading.remove}</TableCell>
          </>
        )}
      </TableRow>
    </TableHead>
  );
};
