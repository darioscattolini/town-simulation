class Family {
  public get familyName() { return this.firstSurname + "-" + this.secondSurname; }

  public get firstSurname() { return this._firstSurname; }
  private _firstSurname: string;

  public get secondSurname() { return this._secondSurname; }
  private _secondSurname: string;
  
  public get members() { return [...this.marriage, ...this.children]; }
  private marriage = new ArrayExtended<Person>();
  private children = new ArrayExtended<Person>();

  private constructor(firstSurname: string, secondSurname: string) {
    this._firstSurname = firstSurname;
    this._secondSurname = secondSurname;
  }

  public static createForImmigrant(firstSurname: string, secondSurname: string): 
    Family 
  {
    return new Family(firstSurname, secondSurname);
  }

  public static createFromMarriage(mate1: Person, mate2: Person): Family {
    if (mate1.mate || mate2.mate) throw new Error('Mate already married.');
    mate1.marryWith(mate2);
    mate2.marryWith(mate1);
    const family = new Family(mate1.firstSurname, mate2.firstSurname);
    family.marriage.push(mate1, mate2);
    
    for (const mate of [mate1, mate2]) {
      if (mate.family.marriage.includes(mate)){
        family.children.push(...mate.family.children);
      }
    }
    
    for (const member of family.members) {
      member.family.removeMember(member);
      member.assignNewFamily(family);
    }

    return family;
  }

  public haveChild(date: Date) {
    const child = new Person(this, date, date);
    this.children.push(child);
    return child;
  }

  public addImmigrant(immigrant: Person): void {
    this.children.push(immigrant);
  }

  public removeMember(member: Person): void {
    if (!this.members.includes(member)) throw new Error('Person not in family.');
    
    for (const group of [this.marriage, this.children]) {
      if (group.includes(member)) group.removeItem(member);
    }
  }

  public getLastChild(): Person {
    return this.children[this.children.length - 1];
  }
}
