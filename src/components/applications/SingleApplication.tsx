import React, { FC, useCallback, useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';

import CloseIcon from '@mui/icons-material/Close';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { ApplicationType } from '@src/types';

interface SingleApplicationProps {
  selected: string | null;
  applications: Record<string, ApplicationType>;
  handleClose: () => void;
  updateCalled: (application: ApplicationType) => void;
  remove: (id: string) => void;
}

export const SingleApplication: FC<SingleApplicationProps> = (props) => {
  const { selected, applications, handleClose, updateCalled, remove } = props;

  const data = applications[selected || 'non-existing-id'];

  const [telString, setTelString] = useState<string>('');

  const copyTel = useCallback((tel: string) => {
    navigator.clipboard.writeText(tel);
    setTelString('Номер скопирован');

    setTimeout(() => setTelString(tel), 1200);
  }, []);

  useEffect(() => {
    if (data?.tel) setTelString(data.tel);
  }, [data]);

  return (
    <Dialog open={!!selected} onClose={handleClose} fullWidth>
      {!!data && (
        <Card>
          <CardContent sx={{ position: 'relative' }}>
            <IconButton
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              color="primary"
              size="large"
              onClick={handleClose}
            >
              <CloseIcon color="inherit" />
            </IconButton>

            <Typography
              variant="h5"
              fontWeight={500}
              color="text.primary"
              mb={2}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              sx={{
                maxWidth: 'calc(100% - 32px)',
              }}
            >
              {data.name}
            </Typography>

            <Button size="large" variant="text" fullWidth sx={{ marginBottom: 2 }} onClick={() => copyTel(data.tel)}>
              {telString}
            </Button>

            {!!data.comment && (
              <Typography color="text.secondary" mb={2}>
                {data.comment}
              </Typography>
            )}

            <CardActions>
              <ButtonGroup fullWidth>
                <Button
                  size="medium"
                  variant="contained"
                  color={data.called ? 'secondary' : 'primary'}
                  onClick={() => updateCalled(data)}
                >
                  {data.called ? 'В активное' : 'В старое'}
                </Button>

                <Button size="medium" variant="outlined" color="error" onClick={() => remove(data.id)}>
                  Удалить
                </Button>
              </ButtonGroup>
            </CardActions>
          </CardContent>
        </Card>
      )}
    </Dialog>
  );
};
