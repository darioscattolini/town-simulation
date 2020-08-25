class ImmigrationService {

  private static instance: ImmigrationService;
  
  private namesService: NamesService;

  private constructor() {
    this.namesService = NamesService.getService();
  }

  public static getService(): ImmigrationService {
    if (!this.instance) this.instance = new ImmigrationService();
    return this.instance;
  }

  public getNewImmigrant(today: Date): Person {
    const family = this.createFamily();
    const birthday = this.createRandomBirthday(today);
    const immigrant = new Person(family, birthday, today);
    family.addImmigrant(immigrant);
    return immigrant;
  }
  
  private createFamily(): Family {
    const firstSurname = this.namesService.pickRandomSurname();
    const secondSurname = this.namesService.pickRandomSurname();
    const family = Family.createForImmigrant(firstSurname, secondSurname);
    return family;
  }

  private createRandomBirthday(today: Date) {
    let date = new Date(today.getTime());
    date.setFullYear(date.getFullYear() - Math.floor(Math.random() * 32) - 18);
    date.setMonth(Math.floor(Math.random() * 12));
    switch (date.getMonth()) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            date.setDate(Math.ceil(Math.random() * 31));
            break;
        case 3:
        case 5:
        case 8:
        case 10:
            date.setDate(Math.ceil(Math.random() * 30));
            break;
        case 2:
            date.setDate(Math.ceil(Math.random() * 28));
    }
    return date;
  }
}
