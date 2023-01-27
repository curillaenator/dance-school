import React, { FC, ChangeEvent, useContext } from 'react';
import { Element } from 'react-scroll';

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
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import CancelIcon from '@mui/icons-material/Cancel';

import { Coach } from '@src/components/coach';
import { Gallery } from '@src/components/photogallery';
import { VideoGallery } from '@src/components/videogallery';
import { Price } from '@src/components/price';
import { LinearProgress } from '@src/components/linearprogress';

import { usePhotoControl } from './hooks/usePhotoControl';
import { useCoachesControl } from './hooks/useCoachesControl';
import { useAboutusControl } from './hooks/useAboutusControl';
import { usePricesControl } from './hooks/usePricesControl';
import { useVideosControl } from './hooks/useVideosControl';
import { useContactsControl } from './hooks/useContactsControl';

import { GALLERY_CONFIG } from '@src/shared/constants';
import { Context } from '@src/context';

import { htmlToInput } from '@src/utils';

export const Settings: FC = () => {
  const { isMobile } = useContext(Context);

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

  const { aboutusStatic, handleAboutusStatic } = useAboutusControl();

  const { prices, newPrice, isNewPriceFilled, handleNewPrice, addPrice, removePrice } = usePricesControl();

  const {
    videos,
    newVideo,
    isVideoReadyToUpload,
    uploadProgress,
    isEdit,
    coverPreview,
    videosStatic,

    handleVideosStatic,
    handleNewVideo,
    addVideo,
    removeVideo,
    editVideo,
    updateVideo,
    cancelEdit,
  } = useVideosControl();

  const { staticContacts, handleContactsStatic } = useContactsControl();

  return (
    <Box width='100%' pt={16} px={4} pb={4} position='relative' minHeight='100vh'>
      <Accordion sx={{ marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography>Фотографии главного экрана (должно быть минимум 2)</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <ImageList sx={{ width: '100%', height: 'auto', marginBottom: 1 }} cols={3} rowHeight={164}>
            {mainSlider.map((img, i) => (
              <ImageListItem key={`photoSlider${i}`} cols={1} rows={1}>
                <img
                  src={`${img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  loading='lazy'
                  style={{ height: '100%' }}
                />
                <ImageListItemBar
                  actionIcon={
                    <>
                      <Tooltip title='Заменить' placement='top'>
                        <IconButton color='primary' component='label'>
                          <ChangeCircleIcon />
                          <input
                            hidden
                            accept='image/*'
                            type='file'
                            onChange={(e) => handleUpload(e, 'mainSlider', img)}
                          />
                        </IconButton>
                      </Tooltip>

                      {mainSlider.length > 2 && (
                        <Tooltip title='Удалить' placement='top'>
                          <IconButton color='error' onClick={() => handleRemove(img, 'mainSlider')}>
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

          <Button startIcon={<AddAPhotoIcon />} variant='contained' component='label'>
            Добавить
            <input hidden accept='image/*' multiple type='file' onChange={(e) => handleUpload(e, 'mainSlider')} />
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2a-content' id='panel2a-header'>
          <Typography>Кто мы</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl variant='outlined' fullWidth>
            <TextField
              id='aboutus-title'
              label='Заголовок секции'
              sx={{ marginBottom: 2 }}
              value={htmlToInput(aboutusStatic.title || '')}
              onChange={(e) => handleAboutusStatic(e as ChangeEvent<HTMLInputElement>, 'title')}
              autoComplete='off'
              required
            />

            <TextField
              id='aboutus-subtitle'
              label={'Описание секции'}
              sx={{ marginBottom: 2 }}
              value={htmlToInput(aboutusStatic.subtitle || '')}
              onChange={(e) => handleAboutusStatic(e as ChangeEvent<HTMLInputElement>, 'subtitle')}
              multiline
              minRows={2}
              maxRows={12}
              required
            />
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel3a-content' id='panel3a-header'>
          <Typography>{`Видео (должно быть минимум 2)`}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl variant='outlined' fullWidth>
            <TextField
              id='programs-title'
              label='Заголовок секции'
              sx={{ marginBottom: 4 }}
              value={htmlToInput(videosStatic.title)}
              onChange={(e) => handleVideosStatic(e as ChangeEvent<HTMLInputElement>, 'title')}
              autoComplete='off'
              required
            />
          </FormControl>

          <VideoGallery
            videos={videos}
            isMobile={isMobile}
            editable
            handleRemove={removeVideo}
            handleEdit={editVideo}
          />

          <Element name='video-edit-form'>
            <Box mb={4} p={2} borderRadius={1} border={(theme) => `1px solid ${theme.palette.secondary.main}`}>
              <FormControl variant='outlined' fullWidth>
                <TextField
                  id='video-title'
                  label='Название видео'
                  sx={{ marginBottom: 1 }}
                  value={newVideo.title}
                  onChange={(e) => handleNewVideo(e as ChangeEvent<HTMLInputElement>, 'title')}
                  autoComplete='off'
                  required
                />

                <TextField
                  id='video-description'
                  label={'Описание видео'}
                  sx={{ marginBottom: 2 }}
                  value={newVideo.description}
                  onChange={(e) => handleNewVideo(e as ChangeEvent<HTMLInputElement>, 'description')}
                  multiline
                  minRows={2}
                  maxRows={8}
                  required
                />
              </FormControl>

              <Stack direction='row' spacing={1} mb={1} alignItems='center'>
                <Button startIcon={<AddAPhotoIcon />} variant='contained' component='label' sx={{ height: '40px' }}>
                  Обложка видео
                  <input
                    hidden
                    accept='image/*'
                    type='file'
                    onChange={(e) => handleNewVideo(e as ChangeEvent<HTMLInputElement>, 'thumbPath')}
                  />
                </Button>

                {!!coverPreview && <Avatar src={coverPreview} />}
              </Stack>

              <Stack direction='row' spacing={1} alignItems='center'>
                <Button
                  startIcon={<VideoFileIcon />}
                  variant='contained'
                  component='label'
                  sx={{ height: '40px' }}
                  // disabled={isEdit}
                >
                  Файл
                  <input
                    hidden
                    accept='video/*'
                    type='file'
                    onChange={(e) => handleNewVideo(e as ChangeEvent<HTMLInputElement>, 'videoPath')}
                  />
                </Button>

                {!!newVideo.videoPath && typeof newVideo.videoPath === 'string' && (
                  <>
                    <Typography>{newVideo.videoPath}</Typography>
                    <CheckIcon color='success' />
                  </>
                )}

                {!!newVideo.videoPath && typeof newVideo.videoPath !== 'string' && (
                  <>
                    <Typography>{newVideo.videoPath.name}</Typography>
                    <CheckIcon color='success' />
                  </>
                )}
              </Stack>
            </Box>
          </Element>

          <ButtonGroup>
            <Button
              onClick={isEdit ? updateVideo : addVideo}
              startIcon={isEdit ? <UpdateIcon /> : <AddIcon />}
              disabled={!isVideoReadyToUpload}
              variant='contained'
              sx={{ height: '56px' }}
            >
              {isEdit ? 'Обновить' : 'Добавить'}
            </Button>

            {isEdit && (
              <Button
                onClick={cancelEdit}
                startIcon={<CancelIcon />}
                // disabled={!isVideoReadyToUpload}
                variant='outlined'
                sx={{ height: '56px' }}
              >
                Отменить
              </Button>
            )}
          </ButtonGroup>

          {uploadProgress !== null && <LinearProgress value={uploadProgress} />}
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel4a-content' id='panel4a-header'>
          <Typography>{`Фотографии галлереи (должно быть минимум ${GALLERY_CONFIG.length})`}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Gallery gallery={gallery} isMobile editable handleRemove={handleRemove} handleUpload={handleUpload} />

          <Button startIcon={<AddAPhotoIcon />} variant='contained' component='label'>
            Добавить
            <input hidden accept='image/*' multiple type='file' onChange={(e) => handleUpload(e, 'gallery')} />
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel5a-content' id='panel5a-header'>
          <Typography>Тренеры</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl variant='outlined' fullWidth>
            <TextField
              id='coaches-title'
              label='Заголовок секции'
              sx={{ marginBottom: 2 }}
              value={htmlToInput(coachesStatic.title || '')}
              onChange={(e) => handleCoachesStatic(e as ChangeEvent<HTMLInputElement>, 'title')}
              autoComplete='off'
              required
            />

            <TextField
              id='coaches-subtitle'
              label={'Описание секции'}
              sx={{ marginBottom: 2 }}
              value={htmlToInput(coachesStatic.subtitle || '')}
              autoComplete='off'
              onChange={(e) => handleCoachesStatic(e as ChangeEvent<HTMLInputElement>, 'subtitle')}
              multiline
              minRows={2}
              maxRows={12}
              required
            />
          </FormControl>

          <Box width='100%' paddingY={8} bgcolor={(theme) => theme.palette.primary.main} mb={2}>
            <Grid container marginX={0} spacing={8} width='100%'>
              {coaches.map((coach) => (
                <Coach key={coach.id} {...coach} isMobile isEditable onDelete={removeCoach} />
              ))}
            </Grid>
          </Box>

          <Box mb={4} p={2} borderRadius={1} border={(theme) => `1px solid ${theme.palette.secondary.main}`}>
            <FormControl variant='outlined' fullWidth>
              <TextField
                id='coach-name'
                label='Имя нового тренера'
                sx={{ marginBottom: 2 }}
                value={newCoach.name}
                onChange={(e) => handleNewCoach(e as ChangeEvent<HTMLInputElement>, 'name')}
                autoComplete='off'
                required
              />

              <TextField
                id='comment'
                label={'Красивое описание тренера'}
                sx={{ marginBottom: 2 }}
                value={newCoach.description}
                autoComplete='off'
                onChange={(e) => handleNewCoach(e as ChangeEvent<HTMLInputElement>, 'description')}
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
              <Button startIcon={<AddAPhotoIcon />} variant='outlined' component='label'>
                Выбрать фото тренера
                <input hidden accept='image/*' type='file' onChange={(e) => handleNewCoach(e, 'photoURL')} />
              </Button>
            </Box>
          </Box>

          <Button
            variant='contained'
            component='label'
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

      <Accordion sx={{ marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel6a-content' id='panel6a-header'>
          <Typography>Цены</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box width='100%' bgcolor={(theme) => theme.palette.error.dark}>
            <Grid
              container
              spacing={8}
              sx={{
                margin: '0 auto 64px',
              }}
            >
              {prices.map((price) => (
                <Price key={price.id} {...price} editable removePrice={removePrice} />
              ))}
            </Grid>
          </Box>

          <Box mb={4} p={2} borderRadius={1} border={(theme) => `1px solid ${theme.palette.secondary.main}`}>
            <FormControl variant='outlined' fullWidth>
              <TextField
                id='price-title'
                label='Название тарифа'
                sx={{ marginBottom: 2 }}
                value={newPrice.name}
                onChange={(e) => handleNewPrice(e as ChangeEvent<HTMLInputElement>, 'name')}
                autoComplete='off'
                required
              />

              <TextField
                id='price-value'
                label='Цена тарифа'
                sx={{ marginBottom: 2 }}
                value={newPrice.price}
                onChange={(e) => handleNewPrice(e as ChangeEvent<HTMLInputElement>, 'price')}
                autoComplete='off'
                required
              />

              <TextField
                id='price-description'
                label={'Описание тарифа'}
                sx={{ marginBottom: 2 }}
                value={newPrice.description}
                onChange={(e) => handleNewPrice(e as ChangeEvent<HTMLInputElement>, 'description')}
                autoComplete='off'
                multiline
                minRows={2}
                maxRows={4}
                required
              />
            </FormControl>
          </Box>

          <Button
            variant='contained'
            component='label'
            onClick={addPrice}
            disabled={!isNewPriceFilled}
            sx={{
              height: '56px',
            }}
          >
            Добавить новый тариф
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel6a-content' id='panel6a-header'>
          <Typography>Контакты</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl variant='outlined' fullWidth>
            <TextField
              id='contacts-phones'
              label='Телефоны'
              sx={{ marginBottom: 2 }}
              value={staticContacts.tels}
              onChange={(e) => handleContactsStatic(e as ChangeEvent<HTMLInputElement>, 'tels')}
              autoComplete='off'
              required
            />

            <TextField
              id='contacts-email'
              label={'Email'}
              sx={{ marginBottom: 2 }}
              value={staticContacts.email}
              onChange={(e) => handleContactsStatic(e as ChangeEvent<HTMLInputElement>, 'email')}
              autoComplete='off'
              required
            />

            <TextField
              id='contacts-telegram'
              label={'Ссылка на Telegram'}
              sx={{ marginBottom: 2 }}
              value={staticContacts.telegram}
              onChange={(e) => handleContactsStatic(e as ChangeEvent<HTMLInputElement>, 'telegram')}
              autoComplete='off'
            />

            <TextField
              id='contacts-whatsapp'
              label={'Ссылка на WhatsApp'}
              sx={{ marginBottom: 2 }}
              value={staticContacts.whatsapp}
              onChange={(e) => handleContactsStatic(e as ChangeEvent<HTMLInputElement>, 'whatsapp')}
              autoComplete='off'
            />

            <TextField
              id='contacts-instagram'
              label={'Ссылка на Instagram'}
              sx={{ marginBottom: 2 }}
              value={staticContacts.instagram}
              onChange={(e) => handleContactsStatic(e as ChangeEvent<HTMLInputElement>, 'instagram')}
              autoComplete='off'
            />

            <TextField
              id='contacts-vk'
              label={'Ссылка на VK'}
              sx={{ marginBottom: 2 }}
              value={staticContacts.vkontakte}
              onChange={(e) => handleContactsStatic(e as ChangeEvent<HTMLInputElement>, 'vkontakte')}
              autoComplete='off'
            />

            <TextField
              id='contacts-youtube'
              label={'Ссылка на Youtube'}
              sx={{ marginBottom: 2 }}
              value={staticContacts.youtube}
              onChange={(e) => handleContactsStatic(e as ChangeEvent<HTMLInputElement>, 'youtube')}
              autoComplete='off'
            />
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
