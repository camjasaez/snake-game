class ScoreManager {
  constructor() {
    this.score = 0;
    this.highScore = this.loadHighScore();
  }

  increaseScore() {
    this.score += 10;
  }

  getScore() {
    return this.score;
  }

  getHighScore() {
    return this.highScore;
  }

  updateHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }
  }

  resetScore() {
    this.score = 0;
  }

  loadHighScore() {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  }

  saveHighScore() {
    localStorage.setItem('snakeHighScore', this.highScore.toString());
  }
}

export default ScoreManager;
