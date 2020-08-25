interface DailyEvents {
  immigrant?: string;
  marriages: BidimensionalArray<string>;
  births: {parent1: string, parent2: string, child: string}[];
  deaths: {name: string, age: number}[];
}

interface GameState {
  today: Date;
  population: number;
  families: Family[];
  newEvents: DailyEvents | undefined;
}
