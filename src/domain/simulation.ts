class Simulation {
  private today: Date;
  private end: Date;
  private simulation: undefined | number;
  private town: Town;
  private uiController: UiController;

  constructor(selectedRange: number, uiController: UiController) {
    this.today = new Date();
    this.end = this.getEndDate(this.today, selectedRange);
    this.town = new Town();
    this.uiController = uiController;
  }

  public async runSimulation(stepDurationMS: number) {
    this.simulation = await setInterval(() => {
      if (this.today < this.end) this.runStep();
      else this.clearSimulation();
    }, stepDurationMS);
  }

  private getEndDate(today: Date, selectedRange: number) {
    const endYear = today.getFullYear() + selectedRange;
    const endDateNumber = new Date(today.getTime()).setFullYear(endYear);
    return new Date(endDateNumber);
  }

  private runStep() {
    const newGameState = this.town.updateState(this.today);
    this.uiController.displayState(newGameState);
    this.incrementDate();
  }

  private clearSimulation() {
    clearInterval(this.simulation);
    this.simulation = undefined;
  }

  private incrementDate() {
    this.today.setDate(this.today.getDate() + 1);
  }
}
