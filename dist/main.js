"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
window.addEventListener("DOMContentLoaded", function () { return __awaiter(void 0, void 0, void 0, function () {
    var uiController, namesService, error_1, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uiController = new UiController();
                namesService = NamesService.getService();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, namesService.retrieveNames()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                message = error_1 + ' Try reloading the page.';
                alert(message);
                return [3 /*break*/, 4];
            case 4:
                uiController.configureStartButton();
                return [2 /*return*/];
        }
    });
}); });
var NamesService = /** @class */ (function () {
    function NamesService() {
        this.female = [];
        this.male = [];
        this._surnames = [];
        this._retrieved = false;
    }
    Object.defineProperty(NamesService.prototype, "femaleNames", {
        get: function () { return this.female.slice(0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NamesService.prototype, "maleNames", {
        get: function () { return this.male.slice(0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NamesService.prototype, "surnames", {
        get: function () { return this._surnames.slice(0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NamesService.prototype, "retrieved", {
        get: function () { return this._retrieved; },
        enumerable: false,
        configurable: true
    });
    NamesService.getService = function () {
        if (!this.instance)
            this.instance = new NamesService();
        return this.instance;
    };
    NamesService.prototype.retrieveNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var people;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchPeople()];
                    case 1:
                        people = _a.sent();
                        this.storeNames(people);
                        return [2 /*return*/];
                }
            });
        });
    };
    NamesService.prototype.pickRandomMaleName = function () {
        return this.pickRandomFrom(this.male);
    };
    NamesService.prototype.pickRandomFemaleName = function () {
        return this.pickRandomFrom(this.female);
    };
    NamesService.prototype.pickRandomSurname = function () {
        return this.pickRandomFrom(this.surnames);
    };
    NamesService.prototype.fetchPeople = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://randomuser.me/api/?results=5000&inc=gender,name&nat=es';
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        body = _a.sent();
                        if (!response.ok)
                            throw new Error("api: randomuser.me, status: " + response.status + " - " + response.statusText + ".");
                        return [2 /*return*/, body.results];
                }
            });
        });
    };
    NamesService.prototype.storeNames = function (people) {
        for (var _i = 0, people_1 = people; _i < people_1.length; _i++) {
            var person = people_1[_i];
            var namesStore = this[person.gender];
            var surnamesStore = this._surnames;
            var name_1 = person.name.first;
            var surname = person.name.last;
            if (!namesStore.includes(name_1))
                namesStore.push(name_1);
            if (!surnamesStore.includes(surname))
                surnamesStore.push(surname);
        }
    };
    NamesService.prototype.pickRandomFrom = function (array) {
        return array[Math.floor(array.length * Math.random())];
    };
    return NamesService;
}());
var UiController = /** @class */ (function () {
    function UiController() {
        this.ui = {
            date: document.querySelector("#date"),
            population: document.querySelector("#population"),
            families: document.querySelector("#families"),
            logbook: document.querySelector("#logbook"),
            runButton: document.querySelector("#run"),
            rangeSelector: document.querySelector("#rangeSelector")
        };
    }
    UiController.prototype.displayState = function (gameState) {
        this.ui.date.innerHTML = this.formatDate(gameState.today);
        this.ui.population.innerHTML = "Poblaci\u00F3n total: " + gameState.population;
        this.ui.families.innerHTML = this.displayFamilies(gameState.families);
        if (gameState.newEvents) {
            this.ui.logbook.innerHTML +=
                this.displayDailyEvents(gameState.newEvents, gameState.today);
        }
    };
    UiController.prototype.configureStartButton = function () {
        var _this = this;
        this.ui.runButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var selectedRange, simulation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedRange = parseInt(this.ui.rangeSelector.value);
                        simulation = new Simulation(selectedRange, this);
                        return [4 /*yield*/, simulation.runSimulation(80)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.ui.runButton.removeAttribute("disabled");
    };
    UiController.prototype.formatDate = function (date) {
        var dateString = date.toLocaleDateString("es", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        var formattedDate = "";
        for (var i = 0; i < dateString.length; i++) {
            if (i === 0) {
                formattedDate += dateString[i].toUpperCase();
            }
            else if (dateString[i] !== ",") {
                formattedDate += dateString[i];
            }
        }
        return formattedDate;
    };
    UiController.prototype.displayFamilies = function (families) {
        var tableContent = "";
        for (var _i = 0, families_1 = families; _i < families_1.length; _i++) {
            var family = families_1[_i];
            var members = "";
            for (var _a = 0, _b = family.members; _a < _b.length; _a++) {
                var member = _b[_a];
                members += member.fullName + " (" + member.age + "), ";
            }
            tableContent +=
                "<tr> \n          <td>" + family.familyName + "</td>\n          <td>" + members + "</td>\n        </tr>";
        }
        var table = "<table id=\"familiesTable\">\n        <tr> <th>Familia</th> <th>Integrantes</th> </tr>\n        " + tableContent + "\n      </table>";
        return families.length === 0 ? "" : table;
    };
    UiController.prototype.displayDailyEvents = function (newEvents, date) {
        var entry = "<dt>" + date.toLocaleDateString("es-ES") + "</dt><dd>";
        if (newEvents.immigrant) {
            entry += newEvents.immigrant + " se ha mudado al pueblo.<br>";
        }
        for (var _i = 0, _a = newEvents.marriages; _i < _a.length; _i++) {
            var marriage = _a[_i];
            entry += marriage[0] + " y " + marriage[1] + " se han casado.<br>";
        }
        for (var _b = 0, _c = newEvents.births; _b < _c.length; _b++) {
            var birth = _c[_b];
            entry += birth.parent1 + " y " + birth.parent2 + " han dado a luz a \n        " + birth.child + ".<br>";
        }
        for (var _d = 0, _e = newEvents.deaths; _d < _e.length; _d++) {
            var dead = _e[_d];
            entry += dead.name + " (" + dead.age + ") ha muerto.";
        }
        entry += "</dd>";
        return entry;
    };
    return UiController;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ArrayExtended = /** @class */ (function (_super) {
    __extends(ArrayExtended, _super);
    function ArrayExtended() {
        var _newTarget = this.constructor;
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    ArrayExtended.prototype.removeItem = function (item) {
        if (!this.includes(item))
            throw new Error('Item not included in array.');
        var index = this.indexOf(item);
        this.splice(index, 1);
    };
    return ArrayExtended;
}(Array));
var BidimensionalArray = /** @class */ (function (_super) {
    __extends(BidimensionalArray, _super);
    function BidimensionalArray() {
        var _newTarget = this.constructor;
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    BidimensionalArray.prototype.deepIncludes = function (item) {
        return this.some(function (array) { return array.includes(item); });
    };
    BidimensionalArray.prototype.pushCouple = function (item1, item2) {
        this.push([item1, item2]);
    };
    return BidimensionalArray;
}(ArrayExtended));
var DayInTown = /** @class */ (function () {
    function DayInTown(town, today) {
        this._somethingHappened = false;
        this._immigration = false;
        this._deaths = [];
        this._marriages = new BidimensionalArray();
        this._births = [];
        this.town = town;
        this.date = today;
        this.runDay();
    }
    Object.defineProperty(DayInTown.prototype, "somethingHappened", {
        get: function () { return this._somethingHappened; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayInTown.prototype, "immigration", {
        get: function () { return this._immigration; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayInTown.prototype, "deaths", {
        get: function () { return this._deaths.slice(0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayInTown.prototype, "marriages", {
        get: function () { return this._marriages.slice(0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayInTown.prototype, "births", {
        get: function () { return this._births.slice(0); },
        enumerable: false,
        configurable: true
    });
    DayInTown.prototype.runDay = function () {
        this.checkImmigration();
        this.checkFamilyEvents();
    };
    DayInTown.prototype.checkImmigration = function () {
        if (Math.random() + 12 / 365 >= 1) {
            this._immigration = true;
            this._somethingHappened = true;
        }
    };
    DayInTown.prototype.checkFamilyEvents = function () {
        for (var _i = 0, _a = this.town.families; _i < _a.length; _i++) {
            var family = _a[_i];
            for (var _b = 0, _c = family.members; _b < _c.length; _b++) {
                var member = _c[_b];
                member.haveAgeUpdated(this.date);
                if (member.diesToday()) {
                    this._deaths.push(member);
                    this._somethingHappened = true;
                    continue;
                }
                if (!member.mate && !this._marriages.deepIncludes(member)) {
                    if (member.age >= 18 && member.marriesToday()) {
                        var candidates = this.getSuitableSingles(member);
                        if (candidates.length > 0) {
                            var mate = candidates[Math.floor(Math.random() * candidates.length)];
                            this._marriages.pushCouple(member, mate);
                            this._somethingHappened = true;
                        }
                    }
                }
                else {
                    if (member.givesBirthToday()) {
                        this._births.push(member);
                        this._somethingHappened = true;
                    }
                }
            }
        }
    };
    DayInTown.prototype.getSuitableSingles = function (mateSeeker) {
        var _this = this;
        var isSuitableSingle = function (single) {
            var over18 = single.age >= 18;
            var notSamePerson = single !== mateSeeker;
            var notMarried = !_this._marriages.deepIncludes(single);
            var sameOrientation = single.sexualOrientation === mateSeeker.sexualOrientation;
            var suitableGender = mateSeeker.sexualOrientation === "straight"
                ? single.gender !== mateSeeker.gender
                : single.gender === mateSeeker.gender;
            return over18 && notSamePerson && notMarried && sameOrientation
                && suitableGender;
        };
        return this.town.singles.filter(function (single) { return isSuitableSingle(single); });
    };
    return DayInTown;
}());
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Family = /** @class */ (function () {
    function Family(firstSurname, secondSurname) {
        this.marriage = new ArrayExtended();
        this.children = new ArrayExtended();
        this._firstSurname = firstSurname;
        this._secondSurname = secondSurname;
    }
    Object.defineProperty(Family.prototype, "familyName", {
        get: function () { return this.firstSurname + "-" + this.secondSurname; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Family.prototype, "firstSurname", {
        get: function () { return this._firstSurname; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Family.prototype, "secondSurname", {
        get: function () { return this._secondSurname; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Family.prototype, "members", {
        get: function () { return __spreadArrays(this.marriage, this.children); },
        enumerable: false,
        configurable: true
    });
    Family.createForImmigrant = function (firstSurname, secondSurname) {
        return new Family(firstSurname, secondSurname);
    };
    Family.createFromMarriage = function (mate1, mate2) {
        var _a;
        if (mate1.mate || mate2.mate)
            throw new Error('Mate already married.');
        mate1.marryWith(mate2);
        mate2.marryWith(mate1);
        var family = new Family(mate1.firstSurname, mate2.firstSurname);
        family.marriage.push(mate1, mate2);
        for (var _i = 0, _b = [mate1, mate2]; _i < _b.length; _i++) {
            var mate = _b[_i];
            if (mate.family.marriage.includes(mate)) {
                (_a = family.children).push.apply(_a, mate.family.children);
            }
        }
        for (var _c = 0, _d = family.members; _c < _d.length; _c++) {
            var member = _d[_c];
            member.family.removeMember(member);
            member.assignNewFamily(family);
        }
        return family;
    };
    Family.prototype.haveChild = function (date) {
        var child = new Person(this, date, date);
        this.children.push(child);
        return child;
    };
    Family.prototype.addImmigrant = function (immigrant) {
        this.children.push(immigrant);
    };
    Family.prototype.removeMember = function (member) {
        if (!this.members.includes(member))
            throw new Error('Person not in family.');
        for (var _i = 0, _a = [this.marriage, this.children]; _i < _a.length; _i++) {
            var group = _a[_i];
            if (group.includes(member))
                group.removeItem(member);
        }
    };
    Family.prototype.getLastChild = function () {
        return this.children[this.children.length - 1];
    };
    return Family;
}());
var ImmigrationService = /** @class */ (function () {
    function ImmigrationService() {
        this.namesService = NamesService.getService();
    }
    ImmigrationService.getService = function () {
        if (!this.instance)
            this.instance = new ImmigrationService();
        return this.instance;
    };
    ImmigrationService.prototype.getNewImmigrant = function (today) {
        var family = this.createFamily();
        var birthday = this.createRandomBirthday(today);
        var immigrant = new Person(family, birthday, today);
        family.addImmigrant(immigrant);
        return immigrant;
    };
    ImmigrationService.prototype.createFamily = function () {
        var firstSurname = this.namesService.pickRandomSurname();
        var secondSurname = this.namesService.pickRandomSurname();
        var family = Family.createForImmigrant(firstSurname, secondSurname);
        return family;
    };
    ImmigrationService.prototype.createRandomBirthday = function (today) {
        var date = new Date(today.getTime());
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
    };
    return ImmigrationService;
}());
var Person = /** @class */ (function () {
    function Person(family, birthday, today) {
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
    Object.defineProperty(Person.prototype, "family", {
        get: function () { return this._family; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "fullName", {
        get: function () {
            return this.name + " " + this.firstSurname + " " + this.secondSurname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "firstSurname", {
        get: function () { return this._firstSurname; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "secondSurname", {
        get: function () { return this._secondSurname; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "age", {
        get: function () { return this._age; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "gender", {
        get: function () { return this._gender; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "sexualOrientation", {
        get: function () { return this._sexualOrientation; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "mate", {
        get: function () { return this._mate; },
        enumerable: false,
        configurable: true
    });
    Person.prototype.haveAgeUpdated = function (today) {
        if (this.birthday.getDate() === 28 && this.birthday.getMonth() === 1) {
            if (today.getMonth() >= 2) {
                this._age = today.getFullYear() - this.birthday.getFullYear();
            }
            else {
                this._age = today.getFullYear() - this.birthday.getFullYear() - 1;
            }
        }
        else {
            if (today.getMonth() > this.birthday.getMonth() ||
                (today.getMonth() === this.birthday.getMonth() &&
                    today.getDate() >= this.birthday.getDate())) {
                this._age = today.getFullYear() - this.birthday.getFullYear();
            }
            else {
                this._age = today.getFullYear() - this.birthday.getFullYear() - 1;
            }
        }
        return this.age;
    };
    Person.prototype.marriesToday = function () {
        var threshold = (Math.abs(this.age - 31) < 10 ? 2 : 1) * (7 / 65 / 365);
        return Math.random() + threshold >= 1;
    };
    Person.prototype.marryWith = function (mate) {
        this._mate = mate;
    };
    Person.prototype.becomeWidow = function () {
        this._mate = null;
    };
    Person.prototype.assignNewFamily = function (family) {
        this._family = family;
    };
    Person.prototype.givesBirthToday = function () {
        var iAmFemale = this.gender === "female";
        var iHaveMaleMate = this.mate ? this.mate.gender === "male" : false;
        var iAmUnder51 = this.age < 51;
        var lastChildOld = this._family.members.length > 2
            ? this._family.getLastChild().age >= 1
            : true;
        return iAmFemale && iHaveMaleMate && iAmUnder51 && lastChildOld &&
            Math.random() + 0.0003 >= 1; // 3 hijos por mujer / días de fertilidad
    };
    Person.prototype.diesToday = function () {
        var chanceToDiePerYear = this.gender === "male"
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
        var chanceToDieToday = chanceToDiePerYear[this.age] / (100 * 365);
        return Math.random() + chanceToDieToday >= 1;
    };
    Person.prototype.haveGenderAssigned = function () {
        // gender assigned by age according to https://ourworldindata.org/gender-ratio
        // formula calculed with https://mycurvefit.com/
        var maleProbability = 51.75622 - 0.0009850896 * this.age - 0.0005351376 * Math.pow(this.age, 2);
        return Math.random() * 100 < maleProbability ? "male" : "female";
    };
    Person.prototype.haveNameAssigned = function () {
        var nameProvider = NamesService.getService();
        return this.gender === "male"
            ? nameProvider.pickRandomMaleName()
            : nameProvider.pickRandomFemaleName();
    };
    return Person;
}());
var Simulation = /** @class */ (function () {
    function Simulation(selectedRange, uiController) {
        this.today = new Date();
        this.end = this.getEndDate(this.today, selectedRange);
        this.town = new Town();
        this.uiController = uiController;
    }
    Simulation.prototype.runSimulation = function (stepDurationMS) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, setInterval(function () {
                                if (_this.today < _this.end)
                                    _this.runStep();
                                else
                                    _this.clearSimulation();
                            }, stepDurationMS)];
                    case 1:
                        _a.simulation = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Simulation.prototype.getEndDate = function (today, selectedRange) {
        var endYear = today.getFullYear() + selectedRange;
        var endDateNumber = new Date(today.getTime()).setFullYear(endYear);
        return new Date(endDateNumber);
    };
    Simulation.prototype.runStep = function () {
        var newGameState = this.town.updateState(this.today);
        this.uiController.displayState(newGameState);
        this.incrementDate();
    };
    Simulation.prototype.clearSimulation = function () {
        clearInterval(this.simulation);
        this.simulation = undefined;
    };
    Simulation.prototype.incrementDate = function () {
        this.today.setDate(this.today.getDate() + 1);
    };
    return Simulation;
}());
var Town = /** @class */ (function () {
    function Town() {
        this.population = 0;
        this._families = new ArrayExtended();
        this._singles = new ArrayExtended();
    }
    Object.defineProperty(Town.prototype, "families", {
        get: function () { return this._families.slice(0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Town.prototype, "singles", {
        get: function () { return this._singles.slice(0); },
        enumerable: false,
        configurable: true
    });
    Town.prototype.updateState = function (today) {
        var todayEvents = new DayInTown(this, today);
        var booklogData;
        if (todayEvents.somethingHappened) {
            var immigration = todayEvents.immigration, deaths = todayEvents.deaths, marriages = todayEvents.marriages, births = todayEvents.births;
            booklogData = {
                immigrant: undefined,
                marriages: new BidimensionalArray(),
                births: [],
                deaths: []
            };
            if (immigration) {
                var immigrant = this.handleImmigration(today);
                booklogData.immigrant = immigrant.fullName;
            }
            if (deaths.length > 0) {
                for (var _i = 0, deaths_1 = deaths; _i < deaths_1.length; _i++) {
                    var dead = deaths_1[_i];
                    this.handleDeath(dead);
                    booklogData.deaths.push({
                        name: dead.fullName,
                        age: dead.age
                    });
                }
            }
            if (marriages.length > 0) {
                for (var _a = 0, marriages_1 = marriages; _a < marriages_1.length; _a++) {
                    var marriage = marriages_1[_a];
                    this.handleMarriage.apply(this, marriage);
                    booklogData.marriages.pushCouple(marriage[0].fullName, marriage[1].fullName);
                }
            }
            if (births.length > 0) {
                for (var _b = 0, births_1 = births; _b < births_1.length; _b++) {
                    var mother = births_1[_b];
                    var baby = this.handleBirth(mother, today);
                    booklogData.births.push({
                        parent1: mother.fullName,
                        parent2: mother.mate.fullName,
                        child: baby.fullName
                    });
                }
            }
        }
        var gameState = {
            today: today,
            population: this.population,
            families: this.families,
            newEvents: booklogData
        };
        return gameState;
    };
    Town.prototype.handleImmigration = function (date) {
        var immigrant = ImmigrationService.getService().getNewImmigrant(date);
        this._families.push(immigrant.family);
        this._singles.push(immigrant);
        this.population++;
        return immigrant;
    };
    Town.prototype.handleDeath = function (dead) {
        if (dead.mate) {
            dead.mate.becomeWidow();
            this._singles.push(dead.mate);
        }
        else {
            this._singles.removeItem(dead);
        }
        dead.family.removeMember(dead);
        if (dead.family.members.length === 0)
            this._families.removeItem(dead.family);
        this.population--;
    };
    Town.prototype.handleMarriage = function (mate1, mate2) {
        this._singles.removeItem(mate1);
        this._singles.removeItem(mate2);
        var oldFamily1 = mate1.family;
        var oldFamily2 = mate2.family;
        var newFamily = Family.createFromMarriage(mate1, mate2);
        this._families.push(newFamily);
        if (oldFamily1.members.length === 0)
            this._families.removeItem(oldFamily1);
        if (oldFamily2.members.length === 0)
            this._families.removeItem(oldFamily2);
    };
    Town.prototype.handleBirth = function (mother, today) {
        var baby = mother.family.haveChild(today);
        this._singles.push(baby);
        this.population++;
        return baby;
    };
    return Town;
}());
