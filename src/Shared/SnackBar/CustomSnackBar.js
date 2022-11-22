import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Slide } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={8} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

const CustomSnackBar = ({msg}) => {
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const handleClick = (Transition) => () => {
        setTransition(() => Transition);
        setOpen(true);
    };

    console.log(transition);

    const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }

        setOpen(false);
    };

    return (
        <>
        <Button onClick={handleClick(TransitionLeft)}>Open success snackbar</Button>
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={5000}
            TransitionComponent={transition}
            // message="I love snacks"
            key={transition ? transition.name : ''}
        >
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
      </>

  );
}

export default CustomSnackBar;