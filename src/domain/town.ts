class Town {
  private population = 0;
  
  public get families() { return this._families.slice(0); }
  private _families = new ArrayExtended<Family>();
  
  public get singles() { return this._singles.slice(0); }
  private _singles = new ArrayExtended<Person>();

  public updateState(today: Date): GameState {
    const todayEvents = new DayInTown(this, today);
    
    let booklogData: DailyEvents | undefined;

    if (todayEvents.somethingHappened) {
      const { immigration, deaths, marriages, births } = todayEvents;

      booklogData = {
        immigrant: undefined,
        marriages: new BidimensionalArray<string>(),
        births: [],
        deaths: []
      }

      if (immigration) {
        const immigrant = this.handleImmigration(today);
        booklogData.immigrant = immigrant.fullName;
      }

      if (deaths.length > 0) {
        for (const dead of deaths) {
          this.handleDeath(dead);
          booklogData.deaths.push({ 
            name: dead.fullName, 
            age: dead.age 
          })
        }
      }

      if (marriages.length > 0) {
        for (const marriage of marriages) {
          this.handleMarriage(...marriage);
          booklogData.marriages.pushCouple(
            marriage[0].fullName, marriage[1].fullName
          );
        }
      }
      
      if (births.length > 0) {
        for (const mother of births) {
          const baby = this.handleBirth(mother, today);
          booklogData.births.push({
            parent1: mother.fullName,
            parent2: (mother.mate as Person).fullName,
            child: baby.fullName
          });
        }
      }
    }

    const gameState: GameState = {
      today: today,
      population: this.population,
      families: this.families,
      newEvents: booklogData
    };

    return gameState;
  }

  private handleImmigration(date: Date): Person {
    const immigrant = ImmigrationService.getService().getNewImmigrant(date);
    this._families.push(immigrant.family);
    this._singles.push(immigrant);
    this.population++;
    return immigrant;
  }
  
  private handleDeath(dead: Person): void {
    if (dead.mate) {
      dead.mate.becomeWidow();
      this._singles.push(dead.mate);
    } else {
      this._singles.removeItem(dead);
    }
    
    dead.family.removeMember(dead);
    if (dead.family.members.length === 0) this._families.removeItem(dead.family);
    
    this.population--;
  }

  private handleMarriage(mate1: Person, mate2: Person): void {
      this._singles.removeItem(mate1);
      this._singles.removeItem(mate2);

      const oldFamily1 = mate1.family;
      const oldFamily2 = mate2.family;
      const newFamily = Family.createFromMarriage(mate1, mate2);

      this._families.push(newFamily);
      if (oldFamily1.members.length === 0) this._families.removeItem(oldFamily1);
      if (oldFamily2.members.length === 0) this._families.removeItem(oldFamily2);
  }

  private handleBirth(mother: Person, today: Date): Person {
    const baby = mother.family.haveChild(today);
    this._singles.push(baby);
    this.population++;
    return baby;
  }
}
