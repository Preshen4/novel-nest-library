import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { QuestionMark } from '@mui/icons-material';
import Fab from '@mui/material/Fab';

export default function AlertDialogSlide() {
     const [open, setOpen] = React.useState(false);

     const handleClose = () => {
          setOpen(false);
     };

     const handleOpen = () => {
          setOpen(true);
     };

     return (
          <div>
               <Fab
                    color="primary"
                    aria-label="Add"
                    onClick={handleOpen}
                    sx={{
                         position: 'fixed', 
                         bottom: '20px',
                         left: '20px'
                    }}
               >
                    <QuestionMark />
               </Fab>
               <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
               >
                    <DialogTitle id="alert-dialog-title">
                         {"Game Rules"}
                    </DialogTitle>
                    <DialogContent>
                         <DialogContentText id="alert-dialog-description">
                              Order each of the Call Numbers in Ascending order as fast as possible. Have fun! 😃

                              Point System:
                              - You start off with 100 points and will gain or lose points.

                              Time Completed:
                              - 10 Sec = 30 Points
                              - 20 Sec = 20 Points
                              - 30 Sec = 15 Points
                              - 40 Sec = 10 Points
                              - 50 Sec = 5 Points
                              - 60 Sec = 3 Points
                              - 70 Sec = 1 Point
                              - Over 70 Sec = 0 Points

                              Correct Order:
                              - 10 Correct = 25 Points
                              - 9 Correct = 18 Points
                              - 8 Correct = 15 Points
                              - 7 Correct = 12 Points
                              - 6 Correct = 10 Points
                              - 5 Correct = 8 Points
                              - 4 Correct = 6 Points
                              - 3 Correct = 4 Points
                              - 2 Correct = 2 Points
                              - 1 Correct = 1 Point
                              - 0 Correct = -50 Points

                              You get 10 points per answer in the correct position and lose 10 points for every answer in the wrong position.
                         </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleClose} autoFocus>
                              Let's Play
                         </Button>
                    </DialogActions>
               </Dialog>
          </div>
     );
}
