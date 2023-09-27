import ReplacingBooks from "./ReplacingBooks"
import ResponsiveAppBar from "./ResponsiveAppBar"
import Center from './Center'
import * as React from 'react';
import AlertDialogSlide from "./Alerts/AlertDialogSlide";

export default function ReplacingBooksGame() {
     return (
          <div>
               <AlertDialogSlide />
               <ResponsiveAppBar />
               <Center>
                    <ReplacingBooks />
               </Center>

          </div>
     )
}