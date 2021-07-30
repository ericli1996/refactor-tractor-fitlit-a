import './css/base.scss';
import './css/styles.scss';
import { fetchAPIData } from './api-Calls';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

let user;
let users;
let sleep, sleepData;
let hydrationData;
let userRepository = new UserRepository();
let todayDate = "2020/01/22";

let dailyOz = document.querySelectorAll('.daily-oz');
let dropdownEmail = document.querySelector('#dropdown-email');
let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
let dropdownGoal = document.querySelector('#dropdown-goal');
let dropdownName = document.querySelector('#dropdown-name');
let headerName = document.querySelector('#header-name');
let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
let hydrationInfoCard = document.querySelector('#hydration-info-card');
let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
let hydrationMainCard = document.querySelector('#hydration-main-card');
let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
let mainPage = document.querySelector('main');
let profileButton = document.querySelector('#profile-button');
let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
let sleepFriendsCard = document.querySelector('#sleep-friends-card');
let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
let sleepInfoCard = document.querySelector('#sleep-info-card');
let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
let sleepMainCard = document.querySelector('#sleep-main-card');
let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
let stepsMainCard = document.querySelector('#steps-main-card');
let stepsInfoCard = document.querySelector('#steps-info-card');
let stepsFriendsCard = document.querySelector('#steps-friends-card');
let stepsTrendingCard = document.querySelector('#steps-trending-card');
let stepsCalendarCard = document.querySelector('#steps-calendar-card');
let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
let stairsFriendsCard = document.querySelector('#stairs-friends-card');
let stairsInfoCard = document.querySelector('#stairs-info-card');
let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
let stairsMainCard = document.querySelector('#stairs-main-card');
let stairsTrendingButton = document.querySelector('.stairs-trending-button');
let stairsTrendingCard = document.querySelector('#stairs-trending-card');
let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
let stepsTrendingButton = document.querySelector('.steps-trending-button');
let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
let userInfoDropdown = document.querySelector('#user-info-dropdown');

window.addEventListener('load', function() {
  setUpUserRepo();
  // generateHydration();
  // setUpHydrationRepo();
  // generateSleep();
  // setUpSleepData();
})

mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);

const setUpUserRepo = () => {
  fetchAPIData('users')
  .then(data => userRepository.users = data.userData.map(userObj => new User(userObj, userRepository)))
  .then(data => setUpSleepData(userRepository))
  .then(data => generateHydration(userRepository))
  .then(data => generateActivity(userRepository))
}

const setUpSleepData = (userRepository) => {
  fetchAPIData('sleep')
  .then(data => userRepository.sleepData = data.sleepData.map(sleepObj => new Sleep(sleepObj, userRepository)))
}

const generateHydration = (userRepo) => {
  fetchAPIData('hydration')
  .then(data => userRepo.hydrationData = data.hydrationData.map(hydroObj => new Hydration(hydroObj, userRepo)))
}

const generateActivity = (userRepo) => {
  fetchAPIData('activity')
  .then(data => data.activityData.map(activityObj => new Activity(activityObj, userRepo)))
  .then(data => renderUser(userRepository))
}

const renderUser = (userRepo) => {
  let randomUser = userRepo.users[Math.floor(Math.random() * userRepo.users.length)];
  dropdownGoal.innerText = `DAILY STEP GOAL | ${randomUser.dailyStepGoal}`;
  dropdownEmail.innerText = `EMAIL | ${randomUser.email}`;
  dropdownName.innerText = randomUser.name.toUpperCase();
  headerName.innerText = `${randomUser.getFirstName()}'S `;
  renderUserStepsActivity(randomUser, userRepo);
  renderFriendStepActivity(userRepo);
  renderUserStairActivity(randomUser, userRepo);
}

const renderUserStepsActivity = (user, userRepo) => {
  updateTrendingStepDays(user);
  // user.findTrendingStairsDays();
  stepsInfoActiveMinutesToday.innerText = user.activityRecord.find(activity => activity.date === todayDate).minutesActive;
  stepsUserStepsToday.innerText = user.activityRecord[0].steps;
  stepsInfoMilesWalkedToday.innerText = user.activityRecord[0].calculateMiles(userRepo);
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
  stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate)
  stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);
  console.log("USER <>>>", user);
}

const renderFriendStepActivity = (userRepo) => {
  stepsFriendActiveMinutesAverageToday.innerText = userRepo.calculateAverageMinutesActive(todayDate);
  stepsFriendAverageStepGoal.innerText = userRepo.calculateAverageStepGoal();
  stepsFriendStepsAverageToday.innerText = userRepo.calculateAverageSteps(todayDate);
}

const renderUserStairActivity = (user, userRepo) => {
  stairsUserStairsToday.innerText = user.activityRecord.find(activity => activity.date === todayDate).flightsOfStairs * 12;
  stairsInfoFlightsToday.innerText = user.activityRecord.find(activity => activity.date === todayDate).flightsOfStairs;
  stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
  stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
  stairsFriendFlightsAverageToday.innerText = userRepo.calculateAverageStairs(todayDate);
  updateTrendingStairsDays(user);
  updateFriendsWeeklySteps(user, userRepo);
  renderUserSleepToday(user);
}

const updateTrendingStairsDays = (user) => {
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
}

const updateTrendingStepDays = (user) => {
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
}

const updateFriendsWeeklySteps = (user, userRepo) => {
  user.findFriendsTotalStepsForWeek(userRepo.users, todayDate)
  user.friendsActivityRecords.forEach(friend => {
    dropdownFriendsStepsContainer.innerHTML += `
    <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
    `;
    renderUserWeeklyOz(user);
    renderDailyUserOz(user, userRepo);
  })
}

const sortHydrationDataByDate = (user) => {
  const result = user.ouncesRecord.sort((a, b) => {
  if (Object.keys(a)[0] > Object.keys(b)[0]) {
    return -1;
  }
  if (Object.keys(a)[0] < Object.keys(b)[0]) {
    return 1;
  }
  return 0;
});
return result;
}

const renderUserWeeklyOz = (user) => {
  const sortedHydrationArray = sortHydrationDataByDate(user)
  for (let i = 0; i < dailyOz.length; i++) {
    dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationArray[i]))
  }
}

const renderDailyUserOz = (user, userRepo) => {
  hydrationUserOuncesToday.innerText = userRepo.hydrationData.filter(hydro => hydro.userId === user.id).find(hydro => hydro.date === todayDate).ounces;
  renderDailyUserGlasses(user, userRepo);
  renderAllUserDailyOz(userRepo);
}

const renderDailyUserGlasses = (user, userRepo) => {
  hydrationInfoGlassesToday.innerText = (userRepo.hydrationData.filter(hydro => hydro.userId === user.id).find(hydro => hydro.date === todayDate).ounces / 8).toFixed(0);
}

const renderAllUserDailyOz = (userRepo) => {
  hydrationFriendOuncesToday.innerText = userRepo.calculateAverageDailyWater(todayDate);
}

const renderUserSleepToday = (user) => {
  sleepUserHoursToday.innerText = user.sleepHoursRecord.find(sleep => sleep.date === todayDate).hours;
  sleepInfoQualityToday.innerText = user.sleepQualityRecord.find(sleep => sleep.date === todayDate).quality;
  renderUserAvgSleep(user);
}

const renderUserAvgSleep = (user) => {
  sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;
  sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;
  sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);
  sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);
}


//
// sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getLongestSleepers(todayDate)
// }).getFirstName();
//
// sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getWorstSleepers(todayDate)
// }).getFirstName();
//
//

  //






function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function showInfo() {
  if (event.target.classList.contains('steps-info-button')) {
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard);
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}








//
// stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);
//
// stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;
//
// stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);
//
// stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).minutesActive;
//
// stepsUserStepsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).numSteps;
//

// let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
//
// friendsStepsParagraphs.forEach(paragraph => {
//   if (friendsStepsParagraphs[0] === paragraph) {
//     paragraph.classList.add('green-text');
//   }
//   if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
//     paragraph.classList.add('red-text');
//   }
//   if (paragraph.innerText.includes('YOU')) {
//     paragraph.classList.add('yellow-text');
//   }
// });
