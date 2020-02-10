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
var _this = this;
/* FAMILY AND PERSON CLASSES
**********************************************************************/
var Family = /** @class */ (function () {
    function Family(firstSurname, secondSurname) {
        this.firstSurname = firstSurname,
            this.secondSurname = secondSurname,
            this.familyName = firstSurname + "-" + secondSurname;
        this.members = [];
    }
    Family.prototype.removeMember = function (member) {
        var index = this.members.indexOf(member);
        this.members.splice(index, 1);
    };
    return Family;
}());
var Person = /** @class */ (function () {
    function Person(origin, family) {
        this.origin = origin;
        this.family = family;
        this.firstSurname = null;
        this.secondSurname = null;
        this.birthday = null;
        this.age = null;
        this.gender = null;
        this.name = null;
        this.sexualOrientation = null;
        this.mate = null;
    }
    Person.prototype.initialize = function (today) {
        this.family.members.push(this);
        this.setBirthday(today);
        this.updateAge(today);
        this.assignGender();
        this.assignSurname();
        this.assignName();
        this.assignSexualOrientation();
    };
    Person.prototype.setBirthday = function (today) {
        var date = new Date(today.getTime());
        if (this.origin === "migrant") {
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
        }
        this.birthday = date;
    };
    Person.prototype.assignGender = function () {
        //gender assigned by age according to https://ourworldindata.org/gender-ratio
        //formula calculed with https://mycurvefit.com/
        var maleProbability = 51.75622 - 0.0009850896 * this.age - 0.0005351376 * Math.pow(this.age, 2);
        this.gender = Math.random() * 100 < maleProbability ? "male" : "female";
    };
    Person.prototype.assignSexualOrientation = function () {
        this.sexualOrientation = Math.random() < 0.05 ? "gay" : "straight";
    };
    Person.prototype.assignSurname = function () {
        this.firstSurname = this.family.firstSurname;
        this.secondSurname = this.family.secondSurname;
    };
    Person.prototype.assignName = function () {
        this.name = NAMES.pickName(this.gender);
    };
    Person.prototype.fullName = function () {
        return this.name + " " + this.firstSurname + " " + this.secondSurname;
    };
    Person.prototype.updateAge = function (today) {
        if (this.birthday.getDate() === 28 && this.birthday.getMonth() === 1) {
            if (today.getMonth() >= 2) {
                this.age = today.getFullYear() - this.birthday.getFullYear();
            }
            else {
                this.age = today.getFullYear() - this.birthday.getFullYear() - 1;
            }
        }
        else {
            if (today.getMonth() > this.birthday.getMonth() ||
                (today.getMonth() === this.birthday.getMonth() &&
                    today.getDate() >= this.birthday.getDate())) {
                this.age = today.getFullYear() - this.birthday.getFullYear();
            }
            else {
                this.age = today.getFullYear() - this.birthday.getFullYear() - 1;
            }
        }
    };
    Person.prototype.marriesToday = function () {
        return Math.random() + (Math.abs(this.age - 31) < 10 ? 2 : 1) * (7 / 65 / 365) >= 1;
    };
    Person.prototype.hasBabyToday = function () {
        return ((this.gender === "female") &&
            (this.mate.gender === "male") &&
            (this.age < 51) &&
            (this.family.members.length > 2 ? this.family.members[this.family.members.length - 1].age >= 1 : true) &&
            (Math.random() + 0.0003 >= 1) //3 hijos por mujer / días de fertilidad
        );
    };
    Person.prototype.diesToday = function () {
        var chanceToDiePerYear = (this.gender === "male"
            ? [0.63, 0.04, 0.03, 0.02, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.09, 0.10, 0.12, 0.13, 0.13, 0.13, 0.13, 0.14, 0.14, 0.14, 0.15, 0.15, 0.15, 0.16, 0.16, 0.17, 0.17, 0.18, 0.19, 0.19, 0.20, 0.21, 0.23, 0.24, 0.26, 0.28, 0.31, 0.34, 0.37, 0.41, 0.45, 0.50, 0.55, 0.60, 0.66, 0.72, 0.78, 0.85, 0.92, 0.99, 1.06, 1.14, 1.22, 1.31, 1.39, 1.48, 1.58, 1.70, 1.83, 1.98, 2.14, 2.34, 2.55, 2.79, 3.04, 3.31, 3.63, 3.99, 4.39, 4.83, 5.31, 5.87, 6.51, 7.21, 7.99, 8.85, 9.81, 10.89, 12.09, 13.41, 14.87, 16.45, 18.16, 19.99, 21.93, 23.99, 26.03, 28.01, 29.90, 31.66, 33.24, 34.90, 36.65, 38.48, 40.40, 42.42, 44.55, 46.77, 49.11, 51.57, 54.15, 56.85, 59.70, 62.68, 65.81, 69.10, 72.56, 76.19, 80.00, 84.00, 88.20, 92.40, 96.70, 100]
            : [0.53, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.02, 0.02, 0.02, 0.03, 0.03, 0.03, 0.04, 0.04, 0.04, 0.05, 0.05, 0.05, 0.06, 0.06, 0.06, 0.06, 0.07, 0.07, 0.08, 0.08, 0.09, 0.09, 0.10, 0.11, 0.12, 0.12, 0.13, 0.14, 0.16, 0.17, 0.18, 0.20, 0.22, 0.24, 0.26, 0.29, 0.32, 0.35, 0.38, 0.41, 0.44, 0.48, 0.52, 0.55, 0.59, 0.63, 0.67, 0.72, 0.77, 0.83, 0.90, 0.98, 1.07, 1.18, 1.29, 1.41, 1.56, 1.73, 1.90, 2.09, 2.29, 2.53, 2.80, 3.11, 3.46, 3.85, 4.30, 4.82, 5.38, 5.98, 6.64, 7.38, 8.24, 9.22, 10.33, 11.57, 12.95, 14.44, 16.06, 17.79, 19.62, 21.47, 23.31, 25.11, 26.83, 28.44, 30.15, 31.96, 33.87, 35.91, 38.06, 40.34, 42.76, 45.33, 48.05, 50.93, 53.99, 57.23, 60.66, 64.30, 68.16, 72.25, 76.19, 80.00, 84.00, 88.20, 92.40, 96.70, 100]);
        var chanceToDieToday = chanceToDiePerYear[this.age] / (100 * 365);
        return Math.random() + chanceToDieToday >= 1;
    };
    return Person;
}());
/* GLOBAL CONSTANTS
**********************************************************************/
var NAMES = {
    female: [],
    male: [],
    surnames: [],
    fetchPeopleFromAPI: function (region) {
        return __awaiter(this, void 0, void 0, function () {
            var response, myJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://uinames.com/api/?region=" + region + "&amount=500")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        myJson = _a.sent();
                        return [2 /*return*/, myJson];
                }
            });
        });
    },
    retrieveNames: function () {
        return __awaiter(this, void 0, void 0, function () {
            var people, _a, region, _i, _b, person;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, this.fetchPeopleFromAPI("spain")];
                    case 1:
                        _a.spain = _c.sent();
                        return [4 /*yield*/, this.fetchPeopleFromAPI("argentina")];
                    case 2:
                        _a.argentina = _c.sent();
                        return [4 /*yield*/, this.fetchPeopleFromAPI("mexico")];
                    case 3:
                        _a.mexico = _c.sent();
                        return [4 /*yield*/, this.fetchPeopleFromAPI("italy")];
                    case 4:
                        _a.italia = _c.sent();
                        return [4 /*yield*/, this.fetchPeopleFromAPI("colombia")];
                    case 5:
                        people = (_a.colombia = _c.sent(),
                            _a);
                        for (region in people) {
                            for (_i = 0, _b = people[region]; _i < _b.length; _i++) {
                                person = _b[_i];
                                if (person.name.length !== 0 &&
                                    !person.name.includes(" ") &&
                                    !this[person.gender].includes(person.name)) {
                                    this[person.gender].push(person.name);
                                }
                                if (!person.surname.includes(" ") && !this.surnames.includes(person.surname)) {
                                    this.surnames.push(person.surname);
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    pickName: function (field) {
        return this[field][Math.floor(this[field].length * Math.random())];
    }
};
var TOWN = {
    population: 0,
    families: [],
    singles: [],
    currentStep: {
        newEvents: false,
        date: null,
        population: null,
        newImmigrant: null,
        deaths: [],
        marriages: [],
        births: []
    },
    familyMemberRemovals: new Map(),
    updateState: function (today) {
        this.currentStep.date = today;
        if (Math.random() + (12 / 365) >= 1) {
            this.handleImmigration(today);
        }
        for (var _i = 0, _a = this.families; _i < _a.length; _i++) {
            var family = _a[_i];
            for (var _b = 0, _c = family.members; _b < _c.length; _b++) {
                var member = _c[_b];
                member.updateAge(today);
                if (member.diesToday()) {
                    this.handleDeath(member);
                }
                ;
                if (member.mate === null) {
                    if (member.age >= 18) {
                        var candidates = this.getSuitableSingles(member);
                        if (candidates.length > 0 && member.marriesToday()) {
                            var mate = candidates[Math.floor(Math.random() * candidates.length)];
                            this.handleMarriage(member, mate);
                        }
                    }
                }
                else {
                    if (member.hasBabyToday()) {
                        this.handleBirth(member, today);
                    }
                }
            }
        }
        if (this.familyMemberRemovals.size > 0) {
            this.handleFamilyMemberRemovals();
        }
        this.currentStep.population = this.population;
        return this.currentStep;
    },
    clearCurrentStep: function () {
        this.currentStep = {
            newEvents: false,
            date: null,
            population: null,
            newImmigrant: null,
            deaths: [],
            marriages: [],
            births: []
        };
    },
    handleImmigration: function (today) {
        var family = new Family(NAMES.pickName("surnames"), NAMES.pickName("surnames"));
        var person = new Person("migrant", family);
        person.initialize(today);
        this.families.push(family);
        this.singles.push(person);
        this.currentStep.newImmigrant = person;
        this.currentStep.newEvents = true;
        this.population++;
    },
    handleMarriage: function (mate1, mate2) {
        mate1.mate = mate2;
        mate2.mate = mate1;
        this.remove(this.singles, mate1);
        this.remove(this.singles, mate2);
        this.familyMemberRemovals.set(mate1.family, mate1);
        this.familyMemberRemovals.set(mate2.family, mate2);
        mate1.family = new Family(mate1.firstSurname, mate2.firstSurname);
        mate2.family = mate1.family;
        mate1.family.members.push(mate1);
        mate1.family.members.push(mate2);
        this.families.push(mate1.family);
        this.currentStep.marriages.push(mate1.family);
        this.currentStep.newEvents = true;
    },
    handleBirth: function (mother, today) {
        var baby = new Person("native", mother.family);
        baby.initialize(today);
        this.currentStep.births.push(baby);
        this.currentStep.newEvents = true;
        this.population++;
    },
    handleDeath: function (inhabitant) {
        if (inhabitant.mate !== null) {
            inhabitant.mate.mate = null;
            this.singles.push(inhabitant.mate);
        }
        else {
            this.remove(this.singles, inhabitant);
        }
        this.familyMemberRemovals.set(inhabitant.family, inhabitant);
        this.currentStep.deaths.push(inhabitant);
        this.currentStep.newEvents = true;
        this.population--;
    },
    getSuitableSingles: function (mateSeeker) {
        return (this.singles.filter(function (single) {
            return single.age >= 18 &&
                single !== mateSeeker &&
                single.sexualOrientation === mateSeeker.sexualOrientation &&
                (mateSeeker.sexualOrientation === "straight"
                    ? single.gender !== mateSeeker.gender
                    : single.gender === mateSeeker.gender);
        }));
    },
    /* Remotion of people from arrays must be handled AFTER for loop executes in updateState() */
    handleFamilyMemberRemovals: function () {
        for (var _i = 0, _a = this.familyMemberRemovals; _i < _a.length; _i++) {
            var remotion = _a[_i];
            var family = remotion[0];
            var member = remotion[1];
            family.removeMember(member);
            if (family.members.length === 0) {
                this.remove(this.families, family);
            }
        }
        this.familyMemberRemovals.clear();
    },
    remove: function (array, element) {
        var index = array.indexOf(element);
        array.splice(index, 1);
    }
};
var UI = {
    date: document.querySelector("#date"),
    populationDisplay: document.querySelector("#population"),
    familiesDisplay: document.querySelector("#families"),
    logbookDisplay: document.querySelector("#logbook"),
    runButton: document.querySelector("#run"),
    rangeSelector: document.querySelector("#rangeSelector"),
    formatDate: function (date) {
        date = date.toLocaleDateString("es", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        var formattedDate = "";
        for (var i = 0; i < date.length; i++) {
            if (i === 0) {
                formattedDate += date[i].toUpperCase();
            }
            else if (date[i] !== ",") {
                formattedDate += date[i];
            }
        }
        return formattedDate;
    },
    displayState: function (logEntryData) {
        this.date.innerHTML = this.formatDate(logEntryData.date);
        this.populationDisplay.innerHTML = "Poblaci\u00F3n total: " + logEntryData.population;
        this.familiesDisplay.innerHTML = this.displayFamilies(TOWN.families);
        if (logEntryData.newEvents) {
            this.logbookDisplay.innerHTML += this.displayEvents(logEntryData);
        }
    },
    displayFamilies: function (families) {
        var tableContent = "";
        for (var _i = 0, families_1 = families; _i < families_1.length; _i++) {
            var family = families_1[_i];
            var members = "";
            for (var _a = 0, _b = family.members; _a < _b.length; _a++) {
                var member = _b[_a];
                members += member.fullName() + " (" + member.age + "), ";
            }
            tableContent += "<tr> <td>" + family.familyName + "</td>\n                <td>" + members + "</td> </tr>";
        }
        var table = "<table id=\"familiesTable\">\n                            <tr> <th>Familia</th> <th>Integrantes</th> </tr>\n                            " + tableContent + "\n                        </table>";
        return "" + (families.length === 0 ? "" : table);
    },
    displayEvents: function (logEntryData) {
        var entry = "<dt>" + logEntryData.date.toLocaleDateString("es-ES") + "</dt><dd>";
        if (logEntryData.newImmigrant !== null) {
            entry += logEntryData.newImmigrant.fullName() + " se ha mudado al pueblo.<br>";
        }
        for (var _i = 0, _a = logEntryData.marriages; _i < _a.length; _i++) {
            var marriage = _a[_i];
            entry += marriage.members[0].fullName() + " y " + marriage.members[1].fullName() + " se han casado.<br>";
        }
        for (var _b = 0, _c = logEntryData.births; _b < _c.length; _b++) {
            var baby = _c[_b];
            entry += baby.family.members[0].fullName() + " y " + baby.family.members[1].fullName() + " han dado a luz a " + baby.fullName() + ".<br>";
        }
        for (var _d = 0, _e = logEntryData.deaths; _d < _e.length; _d++) {
            var dead = _e[_d];
            entry += dead.fullName() + " (" + dead.age + ") ha muerto.";
        }
        entry += "</dd>";
        return entry;
    }
};
var SIMULATION = {
    today: undefined,
    end: undefined,
    simulation: undefined,
    logEntryData: undefined,
    setRange: function (selectedRange) {
        this.today = new Date();
        this.end = new Date(this.today.getTime()).setFullYear(this.today.getFullYear() + selectedRange);
    },
    runSimulation: function () {
        var _this = this;
        this.simulation = setInterval(function () {
            if (_this.today < _this.end) {
                _this.runStep();
            }
            else {
                _this.clearSimulation();
            }
        }, 10);
    },
    runStep: function () {
        this.logEntryData = TOWN.updateState(this.today);
        TOWN.clearCurrentStep();
        UI.displayState(this.logEntryData);
        this.incrementDate();
    },
    clearSimulation: function () {
        clearInterval(this.simulation);
        this.simulation = undefined;
    },
    incrementDate: function () {
        this.today.setDate(this.today.getDate() + 1);
    }
};
/* SETTING UP
**********************************************************************/
window.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, NAMES.retrieveNames()];
            case 1:
                _a.sent();
                UI.runButton.addEventListener("click", function () {
                    var selectedRange = parseInt(UI.rangeSelector.value);
                    SIMULATION.setRange(selectedRange);
                    SIMULATION.runSimulation();
                });
                UI.runButton.removeAttribute("disabled");
                return [2 /*return*/];
        }
    });
}); });
