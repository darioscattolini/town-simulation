class DayInTown {
  public get somethingHappened() { return this._somethingHappened; }
  private _somethingHappened = false;

  public get immigration() { return this._immigration; }
  private _immigration = false;

  public get deaths() { return this._deaths.slice(0); }
  private _deaths: Person[] = [];

  public get marriages() { return this._marriages.slice(0); }
  private _marriages = new BidimensionalArray<Person>();

  public get births() { return this._births.slice(0); }
  private _births: Person[] = [];

  private town: Town;
  private date: Date;

  constructor(town: Town, today: Date) {
    this.town = town;
    this.date = today;
    this.runDay();
  }

  private runDay(): void {
    this.checkImmigration();
    this.checkFamilyEvents();
  }

  private checkImmigration(): void {
    if (Math.random() + 12 / 365 >= 1) {
      this._immigration = true;
      this._somethingHappened = true;
    }
  }

  private checkFamilyEvents(): void {
    for (const family of this.town.families) {
      for (const member of family.members) {
        member.haveAgeUpdated(this.date);

        if (member.diesToday()) {
          this._deaths.push(member);
          this._somethingHappened = true;
          continue;
        }
        
        if (!member.mate && !this._marriages.deepIncludes(member)) {
          if (member.age >= 18 && member.marriesToday()) {
            const candidates = this.getSuitableSingles(member);
            if (candidates.length > 0) {
              const mate =
                candidates[Math.floor(Math.random() * candidates.length)];
              this._marriages.pushCouple(member, mate);
              this._somethingHappened = true;
            }
          }
        } else {
          if (member.givesBirthToday()) {
            this._births.push(member);
            this._somethingHappened = true;
          }
        }
      }
    }
  }

  private getSuitableSingles(mateSeeker: Person): Person[] {
    const isSuitableSingle = (single: Person) => {
      const over18 = single.age >= 18;
      const notSamePerson = single !== mateSeeker;
      const notMarried = !this._marriages.deepIncludes(single);
      const sameOrientation = 
        single.sexualOrientation === mateSeeker.sexualOrientation;
      const suitableGender = mateSeeker.sexualOrientation === "straight" 
        ? single.gender !== mateSeeker.gender 
        : single.gender === mateSeeker.gender;

      return over18 && notSamePerson && notMarried && sameOrientation
        && suitableGender;
    }
    
    return this.town.singles.filter(single => isSuitableSingle(single));
  }
}
