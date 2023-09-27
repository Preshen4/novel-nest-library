import axios from "axios";

export const BASE_URL = 'http://localhost:5164/';

export const ENDPOINTS = {
     users: 'Users',
     replacingBookQuiz: 'ReplacingBookQuiz',
     leaderBoard: 'Leaderboard'
}

export const createAPIEndpoint = endpoint => {

     let url = BASE_URL + 'api/' + endpoint + '/';
     return {
          login: newRecord => axios.post(url + 'login', newRecord),
          signup: newRecord => axios.post(url, newRecord),
          getReplacingBookData: () => axios.get(url + 'generateQuiz'),
          replacingBookCalPoints: newRecord => axios.post(url + 'calculatePoints', newRecord),
          replacingBookCorrectOrder: newRecord => axios.post(url + 'generateCorrectOrder', newRecord),
          getLeaderboard: () => axios.get(url),
          addLeaderboardEntry: newRecord => axios.post(url + 'leaderboard', newRecord),
     }

}