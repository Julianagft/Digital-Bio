import { IconButton, Snackbar } from '@mui/material';
import { X } from 'phosphor-react';

export default function NotificationComponent ({onClose,
                                                open,
                                                message,
                                                action,
                                                onClick,


                                                }) {

    return (
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={message}
        action={
          <IconButton size="small" color="inherit" onClick={onClick}>
            <X />
          </IconButton>
        }
        sx={{
          color: 'white',
          borderRadius: 10,
          padding: 20,
        }}
      />
    )
}