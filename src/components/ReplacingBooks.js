import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { ENDPOINTS, createAPIEndpoint } from '.';
import Button from '@mui/material/Button';

const createQuiz = () => {
     return createAPIEndpoint(ENDPOINTS.replacingBookQuiz)
          .getReplacingBookData()
          .then((res) => {
               console.log(res);
               return res.data;
          });
};

const addLeaderboardEntry = () => {
     return createAPIEndpoint(ENDPOINTS.leaderBoard)
          .addLeaderboardEntry()
          .then((res) => {
               console.log(res);
          });
};

const ReplacingBook = () => {
     const [quizData, setQuizData] = useState([]);
     const [timer, setTimer] = useState(0);
     const [timerRunning, setTimerRunning] = useState(false);
     const [data, setData] = useState([]);
     const [isError, setIsError] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [isRefetching, setIsRefetching] = useState(false);
     const [rowCount, setRowCount] = useState(0);

     const startTimer = () => {
          setTimer(0);
          setTimerRunning(true);
     };

     const stopTimer = () => {
          setTimerRunning(false);
     };
     useEffect(() => {
          const fetchData = async () => {
               if (!data.length) {
                    setIsLoading(true);
               } else {
                    setIsRefetching(true);
               }

               try {
                    const getData = await createQuiz();
                    const quizData = getData.CallNumber;
                    setData(quizData)
                    setQuizData(getData);
                    setRowCount(quizData.length - 1);
               } catch (error) {
                    setIsError(true);
                    console.error(error);
                    return;
               }
               setIsError(false);
               setIsLoading(false);
               setIsRefetching(false);
               startTimer(true);
          };
          fetchData();
     }, []);
     useEffect(() => {
          let timerInterval;
          if (timerRunning && timer < 30) {
               // Start the timer when timerRunning is true and timer is less than 30
               timerInterval = setInterval(() => {
                    setTimer((prevTimer) => prevTimer + 1);
               }, 1000);
          } else if (timer >= 30) {
               // Stop the timer when it reaches 30 seconds
               handleGetDataButtonClick();
          }


          // Clear the timer when the component unmounts to avoid memory leaks
          return () => {
               clearInterval(timerInterval);
          };
     }, [timerRunning]);

     const columns = useMemo(
          () => [
               {
                    accessorFn: (row) => row,
                    accessorKey: 'CallNumber',
                    header: 'Call Number',
               },
          ],
          []
     );
     const handleRowReorder = ({ table, draggingRow, hoveredRow }) => {
          if (hoveredRow && draggingRow) {
               const newData = [...data];
               newData.splice(hoveredRow.index, 0, newData.splice(draggingRow.index, 1)[0]);
               setData(newData);
               setQuizData((prevData) => {
                    return {
                         ...prevData,
                         CallNumber: newData.map((item) => item.CallNumber),
                    };
               });
          }
     };


     const handleGetDataButtonClick = () => {
          createAPIEndpoint(ENDPOINTS.replacingBookQuiz)
               .replacingBookCalPoints(quizData)
               .then((res) => {
                    setQuizData(res.data);
                    addLeaderboardEntry();
               })
               .catch((error) => {
                    console.error(error);
               });
          stopTimer();
     };

     return (
          <div>
               <div>
                    <label>Timer: {timer} seconds</label>
               </div>
               <MaterialReactTable
                    columns={columns}
                    data={data}
                    layoutMode='grid'
                    muiTableBodyRowProps={{
                         sx: {
                              backgroundColor: 'rgba(52, 210, 235, 0.1)',
                              borderRight: '1px solid rgba(224,224,224,1)'
                         }
                    }}
                    muiTableContainerProps={{
                         sx: {
                              minWidth: '700px'
                         }
                    }}
                    disableColumnFilterModes
                    enableColumnActions={false}
                    initialState={{
                         showColumnFilters: false
                    }}
                    muiTableHeadCellProps={{
                         align: 'center'
                    }} muiTableBodyCellProps={{
                         align: 'center'
                    }}
                    autoResetPageIndex={false}
                    enableRowOrdering
                    enableSorting={false}
                    getRowId={(row) => row.CallNumber}
                    muiTableBodyRowDragHandleProps={({ table }) => ({
                         onDragEnd: () => handleRowReorder({ table, ...table.getState() }),
                    })}
                    muiToolbarAlertBannerProps={
                         isError
                              ? {
                                   color: 'error',
                                   children: 'Error loading data',
                              }
                              : undefined
                    }
                    rowCount={rowCount}
                    state={{
                         isLoading,
                         showAlertBanner: isError,
                         showProgressBars: isRefetching,
                    }}
               />
               <Button sx={{
                    m: 2,
                    position: 'fixed',
                    bottom: '20px',
                    right: '30px',
                    minWidth: '150px',
                    minHeight: '60px'
               }} variant="contained" onClick={handleGetDataButtonClick} >Submit</Button>
          </div>

     );
};

export default ReplacingBook;
