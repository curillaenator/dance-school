import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Context } from '@src/context';
import { jsonToHtml } from '@src/utils';
import { LandingSectionCommonProps } from '@src/types';

interface AboutusProps extends LandingSectionCommonProps {
  handleOpen: () => void;
}

export const Aboutus: FC<AboutusProps> = (props) => {
  const {
    maxWidth,
    // handleOpen: handleOpenApplication
  } = props;

  const { isMobile, staticContent } = useContext(Context);

  return (
    <Element name='aboutus'>
      <Box py={16}>
        <Typography
          variant={isMobile ? 'h5' : 'h3'}
          fontWeight={isMobile ? 600 : 500}
          align='center'
          color={(theme) => theme.palette.text.primary}
          paddingX={4}
          marginX='auto'
          mb={4}
          sx={{
            zIndex: 0,
            maxWidth,
          }}
        >
          {jsonToHtml(staticContent.aboutus.title)}
        </Typography>

        <Typography
          variant='subtitle1'
          align='center'
          color={(theme) => theme.palette.text.secondary}
          paddingX={4}
          mb={8}
          marginX='auto'
          sx={{
            zIndex: 0,
            maxWidth,
          }}
        >
          {jsonToHtml(staticContent.aboutus.subtitle || '')}
        </Typography>

        {/* <Box display='flex' justifyContent='center'>
          <Button
            variant='contained'
            size='large'
            // color='error'
            onClick={handleOpenApplication}
            sx={{
              height: 64,
              padding: '0 64px',
              margin: '0 auto',
              // color: '#ffffff',
            }}
          >
            Оставить заявку
          </Button>
        </Box> */}
      </Box>
    </Element>
  );
};
