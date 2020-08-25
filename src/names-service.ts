interface APIResponse {
  info: {
    page: number,
    results: number,
    seed: string,
    version: string
  },
  results: APIPerson[];
}

interface APIPerson {
  gender: Gender;
  name: {
    title: string,
    first: string,
    last: string
  };
}

class NamesService {
  private static instance: NamesService;

  public get femaleNames() { return this.female.slice(0); }
  private female: string[] = [];

  public get maleNames() { return this.male.slice(0); }
  private male: string[] = [];
  
  public get surnames() { return this._surnames.slice(0); }
  private _surnames: string[] = [];

  public get retrieved() { return this._retrieved; }
  private _retrieved: boolean;

  private constructor() { 
    this._retrieved = false;
  }

  public static getService(): NamesService {
    if (!this.instance) this.instance = new NamesService();
    return this.instance;
  }

  public async retrieveNames(): Promise<void> {
    const people = await this.fetchPeople();
    this.storeNames(people);
  }

  public pickRandomMaleName() {
    return this.pickRandomFrom(this.male);
  }

  public pickRandomFemaleName() {
    return this.pickRandomFrom(this.female);
  }

  public pickRandomSurname() {
    return this.pickRandomFrom(this.surnames);
  }

  private async fetchPeople(): Promise<APIPerson[]> {
    const url = 'https://randomuser.me/api/?results=5000&inc=gender,name&nat=es';
    const response = await fetch(url);
    const body: APIResponse = await response.json();
    if (!response.ok) throw new Error(
      `api: randomuser.me, status: ${response.status} - ${response.statusText}.`
    );
    return body.results;
  }

  private storeNames(people: APIPerson[]): void {
    for (const person of people) {
      const namesStore = this[person.gender];
      const surnamesStore = this._surnames;
      const name = person.name.first;
      const surname = person.name.last;

      if (!namesStore.includes(name)) namesStore.push(name);
      if (!surnamesStore.includes(surname)) surnamesStore.push(surname);
    }
  }

  private pickRandomFrom(array: string[]) {
    return array[Math.floor(array.length * Math.random())]
  }
}
