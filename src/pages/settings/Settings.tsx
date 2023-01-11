import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddAPhotoleIcon from '@mui/icons-material/AddAPhoto';

import { usePhotoControl } from './hooks/usePhotoControl';

export const Settings: FC = () => {
  const { mainSlider, gallery, handleUpload, handleRemoveMainSlider, handleRemoveGallery } = usePhotoControl();

  return (
    <Box width="100%" pt={16} px={4} position="relative">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Фотографии главного экрана (должно быть минимум 2)</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <ImageList sx={{ width: '100%', height: 'auto', marginBottom: 1 }} cols={3} rowHeight={164}>
            {mainSlider.map((img, i) => (
              <ImageListItem key={`photoSlider${i}`} cols={1} rows={1}>
                <img
                  src={`${img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  loading="lazy"
                  style={{ height: '100%' }}
                />
                <ImageListItemBar
                  actionIcon={
                    <IconButton color="error" onClick={() => handleRemoveMainSlider(img)}>
                      <DeleteRoundedIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>

          <Button startIcon={<AddAPhotoleIcon />} variant="contained" component="label">
            Добавить
            <input hidden accept="image/*" multiple type="file" onChange={(e) => handleUpload(e, 'mainSlider')} />
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Фотографии галлереи (должно быть минимум 6)</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <ImageList sx={{ width: '100%', height: 'auto', marginBottom: 1 }} cols={3} rowHeight={164}>
            {gallery.map((img, i) => (
              <ImageListItem key={`photoSlider${i}`} cols={1} rows={1}>
                <img
                  src={`${img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  loading="lazy"
                  style={{ height: '100%' }}
                />
                <ImageListItemBar
                  actionIcon={
                    <IconButton color="error" onClick={() => handleRemoveGallery(img)}>
                      <DeleteRoundedIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>

          <Button startIcon={<AddAPhotoleIcon />} variant="contained" component="label">
            Добавить
            <input hidden accept="image/*" multiple type="file" onChange={(e) => handleUpload(e, 'gallery')} />
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
