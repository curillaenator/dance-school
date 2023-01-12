import React, { FC, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddAPhotoleIcon from '@mui/icons-material/AddAPhoto';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import { Coach } from '@src/components/coaches';
import { Gallery } from '@src/components/aboutus';

import { usePhotoControl } from './hooks/usePhotoControl';
import { useCoachesControl } from './hooks/useCoachesControl';
import { useAboutusControl } from './hooks/useAboutusControl';

import { GALLERY_CONFIG } from '@src/shared/constants';

export const Settings: FC = () => {
  const { mainSlider, gallery, handleUpload, handleRemove } = usePhotoControl();

  const {
    coachesStatic,
    handleCoachesStatic,

    coaches,
    newCoach,
    isNewCoachFilled,
    handleNewCoach,
    addCoach,
    removeCoach,
  } = useCoachesControl();

  const { aboutusStatic, handleAboutusStatic, addSubtitle, removeSubtitle } = useAboutusControl();

  return (
    <Box width="100%" pt={16} px={4} position="relative">
      <Accordion>
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
                    <>
                      <Tooltip title="Заменить" placement="top">
                        <IconButton color="primary" component="label">
                          <ChangeCircleIcon />
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => handleUpload(e, 'mainSlider', img)}
                          />
                        </IconButton>
                      </Tooltip>

                      {mainSlider.length > 2 && (
                        <Tooltip title="Удалить" placement="top">
                          <IconButton color="error" onClick={() => handleRemove(img, 'mainSlider')}>
                            <DeleteRoundedIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
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
          <Typography>Кто мы</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl variant="outlined" fullWidth>
            <TextField
              id="aboutus-title"
              label="Заголовок секции"
              sx={{ marginBottom: 2 }}
              value={aboutusStatic.title}
              onChange={(e) => handleAboutusStatic(e as ChangeEvent<HTMLInputElement>, 'title')}
              autoComplete="off"
              required
            />

            <TextField
              id="aboutus-subtitle"
              label={'Описание секции'}
              sx={{ marginBottom: 2 }}
              value={aboutusStatic.subtitle}
              onChange={(e) => handleAboutusStatic(e as ChangeEvent<HTMLInputElement>, 'subtitle')}
              multiline
              minRows={2}
              maxRows={4}
              required
            />

            {aboutusStatic.subtitles &&
              Object.entries(aboutusStatic.subtitles).map(([key, subtitle], i) => (
                <Stack key={key} direction="row" spacing={2} alignItems="center" mb={2}>
                  <TextField
                    id={`aboutus-subtitle-${key}`}
                    label={`Описание секции ${i + 2}`}
                    fullWidth
                    value={subtitle}
                    onChange={(e) => handleAboutusStatic(e as ChangeEvent<HTMLInputElement>, 'subtitles', key)}
                    multiline
                    minRows={2}
                    maxRows={4}
                    required
                  />

                  <IconButton color="error" onClick={() => removeSubtitle(key)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                </Stack>
              ))}
          </FormControl>

          <Button variant="contained" onClick={addSubtitle}>
            Добавить параграф
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>{`Фотографии галлереи (должно быть минимум ${GALLERY_CONFIG.length})`}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Gallery gallery={gallery} isMobile editable handleRemove={handleRemove} handleUpload={handleUpload} />

          <Button startIcon={<AddAPhotoleIcon />} variant="contained" component="label">
            Добавить
            <input hidden accept="image/*" multiple type="file" onChange={(e) => handleUpload(e, 'gallery')} />
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Тренеры</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl variant="outlined" fullWidth>
            <TextField
              id="coaches-title"
              label="Заголовок секции"
              sx={{ marginBottom: 2 }}
              value={coachesStatic.title}
              // @ts-expect-error some description
              onChange={(e) => handleCoachesStatic(e, 'title')}
              autoComplete="off"
              required
            />

            <TextField
              id="coaches-subtitle"
              label={'Описание секции'}
              sx={{ marginBottom: 2 }}
              value={coachesStatic.subtitle}
              autoComplete="off"
              // @ts-expect-error some description
              onChange={(e) => handleCoachesStatic(e, 'subtitle')}
              multiline
              minRows={2}
              maxRows={4}
              required
            />
          </FormControl>

          <Box width="100%" paddingY={8} bgcolor={(theme) => theme.palette.primary.main} mb={2}>
            <Grid container marginX={0} spacing={8} width="100%">
              {coaches.map((coach) => (
                <Coach key={coach.id} {...coach} isMobile isEditable onDelete={removeCoach} />
              ))}
            </Grid>
          </Box>

          <Box mb={4} p={2} borderRadius={1} border={(theme) => `1px solid ${theme.palette.secondary.main}`}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                id="coach-name"
                label="Имя нового тренера"
                sx={{ marginBottom: 2 }}
                value={newCoach.name}
                // @ts-expect-error some description
                onChange={(e) => handleNewCoach(e, 'name')}
                autoComplete="off"
                required
              />

              <TextField
                id="comment"
                label={'Красивое описание тренера'}
                sx={{ marginBottom: 2 }}
                value={newCoach.description}
                autoComplete="off"
                // @ts-expect-error some description
                onChange={(e) => handleNewCoach(e, 'description')}
                multiline
                minRows={2}
                maxRows={4}
                required
              />
            </FormControl>

            <Avatar
              src={newCoach.photoURL ? URL.createObjectURL(newCoach.photoURL as File) : undefined}
              sx={{
                width: 236,
                height: 236,
                marginBottom: 2,
              }}
            />

            <Box>
              <Button startIcon={<AddAPhotoleIcon />} variant="outlined" component="label">
                Выбрать фото тренера
                <input hidden accept="image/*" type="file" onChange={(e) => handleNewCoach(e, 'photoURL')} />
              </Button>
            </Box>
          </Box>

          <Button
            variant="contained"
            component="label"
            onClick={addCoach}
            disabled={!isNewCoachFilled}
            sx={{
              height: '56px',
            }}
          >
            Добавить нового тренера
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
