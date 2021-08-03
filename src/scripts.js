import './css/base.scss';
import './css/styles.scss';
import { fetchAPIData, postNewActivity, postNewHydration, postNewSleep } from './api-Calls';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

let randomUser;
let userRepository = new UserRepository();
let todayDate = "2020/01/22";

let dailyOz = document.querySelectorAll('.daily-oz');
let dropdownEmail = document.getElementById('dropdownEmail');
let dropdownFriendsStepsContainer = document.getElementById('dropdownFriendsStepsContainer');
let dropdownGoal = document.getElementById('dropdownGoal');
let dropdownName = document.getElementById('dropdownName');
let headerName = document.getElementById('headerName');
let hydrationCalendarCard = document.getElementById('hydrationCalendarCard');
let hydrationFriendOuncesToday = document.getElementById('hydrationFriendOuncesToday');
let hydrationFriendsCard = document.getElementById('hydrationFriendsCard');
let hydrationInfoCard = document.getElementById('hydrationInfoCard');
let hydrationInfoGlassesToday = document.getElementById('hydrationInfoGlassesToday');
let hydrationMainCard = document.getElementById('hydrationMainCard');
let hydrationUserOuncesToday = document.getElementById('hydrationUserOuncesToday');
let mainPage = document.querySelector('main');
let profileButton = document.getElementById('profileButton');
let sleepCalendarCard = document.getElementById('sleepCalendarCard');
let sleepCalendarHoursAverageWeekly = document.getElementById('sleepCalendarHoursAverageWeekly');
let sleepCalendarQualityAverageWeekly = document.getElementById('sleepCalendarQualityAverageWeekly');
let sleepFriendLongestSleeper = document.getElementById('sleepFriendLongestSleeper');
let sleepFriendsCard = document.getElementById('sleepFriendsCard');
let sleepFriendWorstSleeper = document.getElementById('sleepFriendWorstSleeper');
let sleepInfoCard = document.getElementById('sleepInfoCard');
let sleepInfoHoursAverageAlltime = document.getElementById('sleepInfoHoursAverageAlltime');
let sleepInfoQualityAverageAlltime = document.getElementById('sleepInfoQualityAverageAlltime');
let sleepInfoQualityToday = document.getElementById('sleepInfoQualityToday');
let sleepMainCard = document.getElementById('sleepMainCard');
let sleepUserHoursToday = document.getElementById('sleepUserHoursToday');
let stairsCalendarCard = document.getElementById('stairsCalendarCard');
let stairsCalendarFlightsAverageWeekly = document.getElementById('stairsCalendarFlightsAverageWeekly');
let stairsCalendarStairsAverageWeekly = document.getElementById('stairsCalendarStairsAverageWeekly');
let stepsMainCard = document.getElementById('stepsMainCard');
let stepsInfoCard = document.getElementById('stepsInfoCard');
let stepsFriendsCard = document.getElementById('stepsFriendsCard');
let stepsTrendingCard = document.getElementById('stepsTrendingCard');
let stepsCalendarCard = document.getElementById('stepsCalendarCard');
let stairsFriendFlightsAverageToday = document.getElementById('stairsFriendFlightsAverageToday');
let stairsFriendsCard = document.getElementById('stairsFriendsCard');
let stairsInfoCard = document.getElementById('stairsInfoCard');
let stairsInfoFlightsToday = document.getElementById('stairsInfoFlightsToday');
let stairsMainCard = document.getElementById('stairsMainCard');
let stairsTrendingCard = document.getElementById('stairsTrendingCard');
let stairsUserStairsToday = document.getElementById('stairsUserStairsToday');
let stepsCalendarTotalActiveMinutesWeekly = document.getElementById('stepsCalendarTotalActiveMinutesWeekly');
let stepsCalendarTotalStepsWeekly = document.getElementById('stepsCalendarTotalStepsWeekly');
let stepsFriendAverageStepGoal = document.getElementById('stepsFriendAverageStepGoal');
let stepsInfoActiveMinutesToday = document.getElementById('stepsInfoActiveMinutesToday');
let stepsInfoMilesWalkedToday = document.getElementById('stepsInfoMilesWalkedToday');
let stepsFriendActiveMinutesAverageToday = document.getElementById('stepsFriendActiveMinutesAverageToday');
let stepsFriendStepsAverageToday = document.getElementById('stepsFriendStepsAverageToday');
let stepsUserStepsToday = document.getElementById('stepsUserStepsToday');
let trendingStepsPhraseContainer = document.getElementById('trendingStepsPhraseContainer');
let trendingStairsPhraseContainer = document.getElementById('trendingStairsPhraseContainer');
let userInfoDropdown = document.getElementById('userInfoDropdown');
let addNewIcons = document.getElementById('inputCardTopRow');
let inputMainCard = document.getElementById('inputMainCard');
let addActivityCard = document.getElementById('addActivityCard');
let addHydrationCard = document.getElementById('addHydrationCard');
let addSleepCard = document.getElementById('addSleepCard');
let inputBackButton = document.querySelectorAll('.fa-undo-alt');
let activityForm = document.getElementById('activityForm');
let hydrationForm = document.getElementById('hydrationForm');
let sleepForm = document.getElementById('sleepForm');
let error = document.querySelectorAll('.error');

window.addEventListener('load', function() {
  start();
});

mainPage.addEventListener('click', function() {
  showInfo(event);
});

profileButton.addEventListener('click', function() {
  showDropdown();
});

addNewIcons.addEventListener('click', function() {
  showForm(event);
});

activityForm.addEventListener('submit', function() {
  getActivityFormData(event);
  displayPostData("activity");
});

hydrationForm.addEventListener('submit', function() {
  getHydrationFormData(event);
  displayPostData("hydration");
});

sleepForm.addEventListener('submit', function() {
  getSleepFormData(event);
  displayPostData("sleep");
});

inputBackButton.forEach(button => button.addEventListener('click', function() {
  returnToNewLog(event);
}));

const start = () => {
  setUpUserRepo();
}

const setUpUserRepo = () => {
  fetchAPIData('users')
    .then(data => userRepository.users = data.userData.map(userObj => new User(userObj, userRepository)))
    .then(data => setUpSleepData(userRepository))
    .then(data => generateHydration(userRepository))
    .then(data => generateActivity(userRepository))
}

const setUpSleepData = () => {
  fetchAPIData('sleep')
    .then(data => userRepository.sleepData = data.sleepData.map(sleepObj => new Sleep(sleepObj, userRepository)))
}

const generateHydration = () => {
  fetchAPIData('hydration')
    .then(data => userRepository.hydrationData = data.hydrationData.map(hydroObj => new Hydration(hydroObj, userRepository)))
}


const generateActivity = () => {
  fetchAPIData('activity')
    .then(data => data.activityData.map(activityObj => new Activity(activityObj, userRepository)))
    .then(data => renderUser(randomUser))
  randomUser = userRepository.users[Math.floor(Math.random() * userRepository.users.length)];
}

const renderUser = (user) => {
  dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
  dropdownEmail.innerText = `EMAIL | ${user.email}`;
  dropdownName.innerText = user.name.toUpperCase();
  headerName.innerText = `${user.getFirstName()}'S `;
  renderUserStepsActivity(user, userRepository);
  renderFriendStepActivity(userRepository);
  renderUserStairActivity(user, userRepository);
}

const renderUserStepsActivity = () => {
  updateTrendingStepDays(randomUser);
  stepsInfoActiveMinutesToday.innerText = randomUser.activityRecord.find(activity => activity.date === todayDate).minutesActive;
  stepsUserStepsToday.innerText = randomUser.activityRecord[0].steps;
  stepsInfoMilesWalkedToday.innerText = randomUser.activityRecord[0].calculateMiles(userRepository);
  stepsCalendarTotalActiveMinutesWeekly.innerText = randomUser.calculateAverageMinutesActiveThisWeek(todayDate)
  stepsCalendarTotalStepsWeekly.innerText = randomUser.calculateAverageStepsThisWeek(todayDate);
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
    <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>`;
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
  })
  return result;
}

const renderUserWeeklyOz = (user) => {
  const sortedHydrationArray = sortHydrationDataByDate(user)
  for (let i = 0; i < dailyOz.length; i++) {
    dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationArray[i]))
  }
}

const renderDailyUserOz = (user) => {
  hydrationUserOuncesToday.innerText = user.ouncesRecord[0][todayDate];
  renderDailyUserGlasses(user);
  renderAllUserDailyOz();
}

const renderDailyUserGlasses = (user) => {
  hydrationInfoGlassesToday.innerText = (user.ouncesRecord[0][todayDate] / 8).toFixed(0);
}

const renderAllUserDailyOz = () => {
  hydrationFriendOuncesToday.innerText = Math.round(userRepository.calculateAverageDailyWater(todayDate));
  renderBestWorstSleep(userRepository);
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

const renderBestWorstSleep = () => {
  sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getLongestSleepers(todayDate)
  }).getFirstName();
  sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getWorstSleepers(todayDate)
  }).getFirstName();
}

const flipCard = (cardToHide, cardToShow) => {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

const showDropdown = () => {
  userInfoDropdown.classList.toggle('hide');
}

const showForm = (event) => {
  if (event.target.classList.contains('fa-shoe-prints')) {
    flipCard(inputMainCard, addActivityCard);
  }
  if (event.target.classList.contains('fa-tint')) {
    flipCard(inputMainCard, addHydrationCard);
  }
  if (event.target.classList.contains('fa-bed')) {
    flipCard(inputMainCard, addSleepCard);
  }
}

const returnToNewLog = (event) => {
  if (event.target.id === 'activityBackButton') {
    flipCard(addActivityCard, inputMainCard);
  }
  if (event.target.id === 'hydrationBackButton') {
    flipCard(addHydrationCard, inputMainCard);
  }
  if (event.target.id === 'sleepBackButton') {
    flipCard(addSleepCard, inputMainCard);
  }
}

const showInfo = (event) => {
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

const getActivityFormData = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newActivity = {
    userID: randomUser.id,
    date: todayDate,
    numSteps: JSON.parse(formData.get('numSteps')),
    minutesActive: JSON.parse(formData.get('minutesActive')),
    flightsOfStairs: JSON.parse(formData.get('flightsOfStairs'))
  }
  postNewActivity(newActivity);
  event.target.reset();
}

const getHydrationFormData = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newHydration = {
    userID: randomUser.id,
    date: todayDate,
    numOunces: JSON.parse(formData.get('numOunces'))
  }
  postNewHydration(newHydration);
  event.target.reset();
}

const getSleepFormData = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newSleep = {
    userID: randomUser.id,
    date: todayDate,
    hoursSlept: JSON.parse(formData.get('hoursSlept')),
    sleepQuality: JSON.parse(formData.get('sleepQuality'))
  }
  postNewSleep(newSleep);
  event.target.reset();
}

const displayPostData = (dataType) => {
  if (dataType === "activity") {
    fetchAPIData("activity")
      .then(data => data.activityData.map(activityObj => new Activity(activityObj, userRepository)))
      .then(data => renderUserStepsActivity(randomUser))
      .then(data => renderUserStairActivity(randomUser, userRepository))
  }
  if (dataType === "hydration") {
    fetchAPIData("hydration")
      .then(data => data.hydrationData.map(hydroObj => new Hydration(hydroObj, userRepository)))
      .then(data => renderUserWeeklyOz(randomUser))
      .then(data => renderDailyUserOz(randomUser))
  }
  if (dataType === "sleep") {
    fetchAPIData("sleep")
      .then(data => data.sleepData.map(sleepObj => new Sleep(sleepObj, userRepository)))
      .then(data => renderUserSleepToday(randomUser))
  }
}
