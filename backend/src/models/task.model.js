class Task {
  constructor({ id, title, completed = false, estimatedPomodoros = 1 }) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.estimatedPomodoros = estimatedPomodoros;
  }
}

module.exports = Task;
