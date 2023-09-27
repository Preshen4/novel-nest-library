import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { ENDPOINTS, createAPIEndpoint } from '.';

const createLeaderboard = () => {
     return createAPIEndpoint(ENDPOINTS.leaderBoard)
          .getLeaderboard()
          .then((res) => {
               return res.data;
          });
};

const LeaderboardGrid = () => {
     const [data, setData] = useState([]);
     const [isError, setIsError] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [isRefetching, setIsRefetching] = useState(false);
     const [rowCount, setRowCount] = useState(0);

     useEffect(() => {
          const fetchData = async () => {
               if (!data.length) {
                    setIsLoading(true);
               } else {
                    setIsRefetching(true);
               }

               try {
                    const getData = await createLeaderboard();
                    setData(getData)
                    setRowCount(data.length - 1);
               } catch (error) {
                    setIsError(true);
                    console.error(error);
                    return;
               }
               setIsError(false);
               setIsLoading(false);
               setIsRefetching(false);
          };
          fetchData();
     }, []);

     const columns = useMemo(
          () => [
               {
                    accessorKey: 'UserName',
                    header: 'Username',
               },
               {
                    accessorKey: 'Score',
                    header: 'Score',
               },
          ],
          []
     );
     return (
          <div>
               <h1 >Leaderboard</h1>
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
                    enableColumnActions={true}
                    muiTableHeadCellProps={{
                         align: 'center'
                    }} muiTableBodyCellProps={{
                         align: 'center'
                    }}
                    autoResetPageIndex={false}
                    enableSorting={false}
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
          </div>

     )
}

export default LeaderboardGrid;