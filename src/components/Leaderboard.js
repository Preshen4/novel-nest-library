import ResponsiveAppBar from "./ResponsiveAppBar"
import Center from './Center'
import * as React from 'react';
import LeaderboardGrid from "./LeaderboardGrid";

export default function Leaderboard() {
     return (
          <div>
               <ResponsiveAppBar />
               <Center>
                    <LeaderboardGrid />
               </Center>

          </div>
     )
}