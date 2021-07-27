class Sleep {
  constructor(data, userRepository) {
    this.userID = data.userID;
    this.date = data.date;
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
    this.sleep(userRepository);
  }
  sleep(userRepo) {
    userRepo.users.find(user => {
      return user.id === this.userID;
    }).updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  }
}

export default Sleep;
