class Activity {
  constructor(data, userRepository) {
    this.userID = data.userID;
    this.date = data.date;
    this.steps = data.numSteps;
    this.minutesActive = data.minutesActive;
    this.flightsOfStairs = data.flightsOfStairs;
    this.milesWalked = 0;
    this.reachedStepGoal = null;
    this.doActivity(userRepository);
  }

  doActivity(userRepo) {
    var activity = this;
    userRepo.users.find(user => {
      return user.id === activity.userID;
    }).updateActivities(activity);
  }

  calculateMiles(userRepository) {
    let walkingUser = userRepository.users.find(user => {
      return user.id === this.userID;
    });
    return Math.round(this.steps * walkingUser.strideLength / 5280).toFixed(1);
  }

  compareStepGoal(userRepository) {
    let userStepGoal = userRepository.users.find(user => {
      return user.id === this.userID;
    }).dailyStepGoal;
    this.reachedStepGoal = this.steps >= userStepGoal;
  }
}

export default Activity;
