class Person {
  public get family() { return this._family; }
  private _family: Family;
  
  public get fullName() {
    return `${this.name} ${this.firstSurname} ${this.secondSurname}`;
  }

  private name: string;

  public get firstSurname() { return this._firstSurname; }
  private _firstSurname: string;

  public get secondSurname() { return this._secondSurname; }
  private _secondSurname: string;
    
  public get age() { return this._age; }
  private _age: number;
  private birthday: Date;

  public get gender() { return this._gender; }
  private _gender: Gender;

  public get sexualOrientation() { return this._sexualOrientation; }
  private _sexualOrientation: string;
  
  public get mate() { return this._mate; }
  private _mate: Person | null;

  constructor(family: Family, birthday: Date, today: Date) {
    this._family = family;
    this._firstSurname = family.firstSurname;
    this._secondSurname = family.secondSurname;
    this.birthday = new Date(birthday);
    this._age = this.haveAgeUpdated(today);
    this._gender = this.haveGenderAssigned();
    this.name = this.haveNameAssigned();
    this._sexualOrientation = Math.random() < 0.05 ? "gay" : "straight";
    this._mate = null;
  }

  public haveAgeUpdated(today: Date) {
    if (this.birthday.getDate() === 28 && this.birthday.getMonth() === 1) {
      if (today.getMonth() >= 2) {
        this._age = today.getFullYear() - this.birthday.getFullYear();
      } else {
        this._age = today.getFullYear() - this.birthday.getFullYear() - 1;
      }
    } else {
      if (
        today.getMonth() > this.birthday.getMonth() ||
        (today.getMonth() === this.birthday.getMonth() &&
          today.getDate() >= this.birthday.getDate())
      ) {
        this._age = today.getFullYear() - this.birthday.getFullYear();
      } else {
        this._age = today.getFullYear() - this.birthday.getFullYear() - 1;
      }
    }
    return this.age;
  }

  public marriesToday() {
    const threshold = (Math.abs(this.age - 31) < 10 ? 2 : 1) * (7 / 65 / 365);
    return Math.random() + threshold >= 1;
  }

  public marryWith(mate: Person) {
    this._mate = mate;
  }

  public becomeWidow() {
    this._mate = null;
  }

  public assignNewFamily(family: Family) {
    this._family = family;
  }

  public givesBirthToday() {
    const iAmFemale = this.gender === "female";
    const iHaveMaleMate = this.mate ? this.mate.gender === "male" : false;
    const iAmUnder51 = this.age < 51;
    const lastChildOld = this._family.members.length > 2
      ? this._family.getLastChild().age >= 1
      : true;

    return iAmFemale && iHaveMaleMate && iAmUnder51 && lastChildOld &&
      Math.random() + 0.0003 >= 1; // 3 hijos por mujer / días de fertilidad
  }

  public diesToday() {
    let chanceToDiePerYear =
      this.gender === "male"
        ? [
          0.63, 0.04, 0.03, 0.02, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 
          0.01, 0.01, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.09, 
          0.1, 0.12, 0.13, 0.13, 0.13, 0.13, 0.14, 0.14, 0.14, 0.15, 
          0.15, 0.15, 0.16, 0.16, 0.17, 0.17, 0.18, 0.19, 0.19, 0.2,
          0.21, 0.23, 0.24, 0.26, 0.28, 0.31, 0.34, 0.37, 0.41, 0.45,
          0.5, 0.55, 0.6, 0.66, 0.72, 0.78, 0.85, 0.92, 0.99, 1.06,
          1.14, 1.22, 1.31, 1.39, 1.48, 1.58, 1.7, 1.83, 1.98, 2.14,
          2.34, 2.55, 2.79, 3.04, 3.31, 3.63, 3.99, 4.39, 4.83, 5.31,
          5.87, 6.51, 7.21, 7.99, 8.85, 9.81, 10.89, 12.09, 13.41, 14.87,
          16.45, 18.16, 19.99, 21.93, 23.99, 26.03, 28.01, 29.9, 31.66, 33.24,
          34.9, 36.65, 38.48, 40.4, 42.42, 44.55, 46.77, 49.11, 51.57, 54.15,
          56.85, 59.7, 62.68, 65.81, 69.1, 72.56, 76.19, 80.0, 84.0, 88.2,
          92.4, 96.7, 100,
        ]
        : [
          0.53, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01,
          0.01, 0.01, 0.01, 0.01, 0.02, 0.02, 0.02, 0.03, 0.03, 0.03,
          0.04, 0.04, 0.04, 0.05, 0.05, 0.05, 0.06, 0.06, 0.06, 0.06,
          0.07, 0.07, 0.08, 0.08, 0.09, 0.09, 0.1, 0.11, 0.12, 0.12,
          0.13, 0.14, 0.16, 0.17, 0.18, 0.2, 0.22, 0.24, 0.26, 0.29,
          0.32, 0.35, 0.38, 0.41, 0.44, 0.48, 0.52, 0.55, 0.59, 0.63,
          0.67, 0.72, 0.77, 0.83, 0.9, 0.98, 1.07, 1.18, 1.29, 1.41,
          1.56, 1.73, 1.9, 2.09, 2.29, 2.53, 2.8, 3.11, 3.46, 3.85,
          4.3, 4.82, 5.38, 5.98, 6.64, 7.38, 8.24, 9.22, 10.33, 11.57,
          12.95, 14.44, 16.06, 17.79, 19.62, 21.47, 23.31, 25.11, 26.83, 28.44,
          30.15, 31.96, 33.87, 35.91, 38.06, 40.34, 42.76, 45.33, 48.05, 50.93,
          53.99, 57.23, 60.66, 64.3, 68.16, 72.25, 76.19, 80.0, 84.0, 88.2,
          92.4, 96.7, 100,
        ];

    const chanceToDieToday = chanceToDiePerYear[this.age] / (100 * 365);
    return Math.random() + chanceToDieToday >= 1;
  }

  private haveGenderAssigned(): Gender {
    // gender assigned by age according to https://ourworldindata.org/gender-ratio
    // formula calculed with https://mycurvefit.com/

    const maleProbability =
      51.75622 - 0.0009850896 * this.age - 0.0005351376 * this.age ** 2;

    return Math.random() * 100 < maleProbability ? "male" : "female";
  }

  private haveNameAssigned(): string {
    const nameProvider = NamesService.getService();
    return this.gender === "male"
      ? nameProvider.pickRandomMaleName()
      : nameProvider.pickRandomFemaleName();
  }
}
