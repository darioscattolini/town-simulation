/********* FAMILY AND PERSON CLASSES *********/
class Family {
    constructor(firstSurname, secondSurname) {
        this.firstSurname = firstSurname,
        this.secondSurname = secondSurname,
        this.familyName = `${firstSurname}-${secondSurname}`;
        this.members = [];
    }

    removeMember(member) {
        let index = this.members.indexOf(member);
        this.members.splice(index, 1);
    }
}

class Person {
    constructor(origin, family) {
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

    initialize(today) {
        this.family.members.push(this);
        this.setBirthday(today);
        this.updateAge(today);
        this.assignGender();
        this.assignSurname();
        this.assignName();
        this.assignSexualOrientation();
    }

    setBirthday(today) {
        let date = new Date(today.getTime());
        if (this.origin === "migrant") {
            date.setFullYear( date.getFullYear() - Math.floor( Math.random() * 32 ) - 18 );
            date.setMonth( Math.floor( Math.random() * 12 ) );
            switch(date.getMonth()) {
                case 0:
                case 2:
                case 4:
                case 6:
                case 7:
                case 9:
                case 11:
                    date.setDate( Math.ceil( Math.random() * 31 ) );
                    break;
                case 3:
                case 5:
                case 8:
                case 10:
                    date.setDate( Math.ceil( Math.random() * 30 ) );
                    break;
                case 2:
                    date.setDate( Math.ceil( Math.random() * 28 ) );
            }
        }
        this.birthday = date;    
    }

    assignGender() {
        //gender assigned by age according to https://ourworldindata.org/gender-ratio
        //formula calculed with https://mycurvefit.com/

        const maleProbability = 51.75622 - 0.0009850896 * this.age - 0.0005351376 * this.age ** 2;
        this.gender = Math.random() * 100 < maleProbability ? "male" : "female";
    }

    assignSexualOrientation() {
        this.sexualOrientation = Math.random() < 0.05 ? "gay" : "straight";
    }

    assignSurname() {
        this.firstSurname = this.family.firstSurname;
        this.secondSurname = this.family.secondSurname;
    }

    assignName() {
        this.name = NAMES.pickName(this.gender);
    }

    fullName() {
        return `${this.name} ${this.firstSurname} ${this.secondSurname}`;
    }

    updateAge(today) {
        if (this.birthday.getDate() === 28 && this.birthday.getMonth() === 1) {
            if (today.getMonth() >= 2) {
                this.age = today.getFullYear() - this.birthday.getFullYear();
            } else {
                this.age = today.getFullYear() - this.birthday.getFullYear() - 1;
            }
        } else {
            if (
                today.getMonth() > this.birthday.getMonth() ||
                ( today.getMonth() === this.birthday.getMonth() && 
                today.getDate() >= this.birthday.getDate() )
            ) {
                this.age = today.getFullYear() - this.birthday.getFullYear();
            } else {
                this.age = today.getFullYear() - this.birthday.getFullYear() - 1;
            }
        }
    }

    marriesToday() {
        return Math.random() + (Math.abs(this.age - 31) < 10 ? 2 : 1) * (7 / 65 / 365) >= 1;
    }

    hasBabyToday() {
        return (
            (this.gender === "female") &&
            (this.mate.gender === "male") &&
            (this.age < 51) &&
            (this.family.members.length > 2 ? this.family.members[this.family.members.length - 1].age >= 1 : true) &&
            (Math.random() + 0.0003 >= 1)    //3 hijos por mujer / días de fertilidad
        );
    }

    diesToday() {
        let chanceToDiePerYear = (this.gender === "male"
            ? [0.63, 0.04, 0.03, 0.02, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.09, 0.10, 0.12, 0.13, 0.13, 0.13, 0.13, 0.14, 0.14, 0.14, 0.15, 0.15, 0.15, 0.16, 0.16, 0.17, 0.17, 0.18, 0.19, 0.19, 0.20, 0.21, 0.23, 0.24, 0.26, 0.28, 0.31, 0.34, 0.37, 0.41, 0.45, 0.50, 0.55, 0.60, 0.66, 0.72, 0.78, 0.85, 0.92, 0.99, 1.06, 1.14, 1.22, 1.31, 1.39, 1.48, 1.58, 1.70, 1.83, 1.98, 2.14, 2.34, 2.55, 2.79, 3.04, 3.31, 3.63, 3.99, 4.39, 4.83, 5.31, 5.87, 6.51, 7.21, 7.99, 8.85, 9.81, 10.89, 12.09, 13.41, 14.87, 16.45, 18.16, 19.99, 21.93, 23.99, 26.03, 28.01, 29.90, 31.66, 33.24, 34.90, 36.65, 38.48, 40.40, 42.42, 44.55, 46.77, 49.11, 51.57, 54.15, 56.85, 59.70, 62.68, 65.81, 69.10, 72.56, 76.19, 80.00, 84.00, 88.20, 92.40, 96.70, 100]
            : [0.53, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.02, 0.02, 0.02, 0.03, 0.03, 0.03, 0.04, 0.04, 0.04, 0.05, 0.05, 0.05, 0.06, 0.06, 0.06, 0.06, 0.07, 0.07, 0.08, 0.08, 0.09, 0.09, 0.10, 0.11, 0.12, 0.12, 0.13, 0.14, 0.16, 0.17, 0.18, 0.20, 0.22, 0.24, 0.26, 0.29, 0.32, 0.35, 0.38, 0.41, 0.44, 0.48, 0.52, 0.55, 0.59, 0.63, 0.67, 0.72, 0.77, 0.83, 0.90, 0.98, 1.07, 1.18, 1.29, 1.41, 1.56, 1.73, 1.90, 2.09, 2.29, 2.53, 2.80, 3.11, 3.46, 3.85, 4.30, 4.82, 5.38, 5.98, 6.64, 7.38, 8.24, 9.22, 10.33, 11.57, 12.95, 14.44, 16.06, 17.79, 19.62, 21.47, 23.31, 25.11, 26.83, 28.44, 30.15, 31.96, 33.87, 35.91, 38.06, 40.34, 42.76, 45.33, 48.05, 50.93, 53.99, 57.23, 60.66, 64.30, 68.16, 72.25, 76.19, 80.00, 84.00, 88.20, 92.40, 96.70, 100]);
        
        const chanceToDieToday = chanceToDiePerYear[this.age] / (100 * 365);
        return Math.random() + chanceToDieToday >= 1;
    }
}

/* GLOBAL CONSTANTS
**********************************************************************/
const NAMES = {
    female: [],
    male: [],
    surnames: [],

    async fetchPeopleFromAPI(region) {
        const response = await fetch(`https://uinames.com/api/?region=${region}&amount=500`);
        const myJson = await response.json();
        return myJson;
    },

    async retrieveNames() {
        const people = {
            spain: await this.fetchPeopleFromAPI("spain"),
            argentina: await this.fetchPeopleFromAPI("argentina"),
            mexico: await this.fetchPeopleFromAPI("mexico"),
            italia: await this.fetchPeopleFromAPI("italy"),
            colombia: await this.fetchPeopleFromAPI("colombia")
        }
        
        for (let region in people) {
            for (let person of people[region]) {
                if (
                    person.name.length !== 0 && 
                    !person.name.includes(" ") && 
                    !this[person.gender].includes(person.name)
                ) {
                    this[person.gender].push(person.name);
                }
                if (!person.surname.includes(" ") && !this.surnames.includes(person.surname)) {
                    this.surnames.push(person.surname);
                }
            }
        }
    },

    pickName(field) {
        return this[field][Math.floor(this[field].length * Math.random())];
    }
}

const TOWN = {
    population: 0,
    families: [],
    singles: [],
    currentStep: {
        newEvents: false,
        date: null,
        population: null,
        newImmigrant: null,
        deaths: [],             //vaciar cada vuelta
        marriages: [],
        births: []
    },

    updateState(today) {
        this.currentStep.date = today;

        if (Math.random() + (12 / 365) >= 1) {
            this.handleImmigration(today)
        }

        for (let family of this.families) {
            for (let member of family.members) {
                member.updateAge(today);    //cumple años?

                if (member.diesToday()) {   //muere?
                    this.handleDeath(member);
                };

                if (member.mate === null) {
                    if (member.age >= 18) { //se casa?
                        const candidates = this.getSuitableSingles(member);
                        if (candidates.length > 0 && member.marriesToday()) {
                            const mate = candidates[Math.floor(Math.random() * candidates.length)];
                            this.handleMarriage(member, mate);
                        }
                    }
                } else {    //tiene un hijo?
                    if (member.hasBabyToday()) {
                        this.handleBirth(member, today);
                    }
                }
            }
        }
        this.currentStep.population = this.population;
        return this.currentStep;
    },

    clearCurrentStep() {
        this.currentStep = {
            newEvents: false,
            date: null,
            population: null,
            newImmigrant: null,
            deaths: [],
            marriages: [],
            births: []
        }
    },

    handleImmigration(today) {
        const family = new Family(NAMES.pickName("surnames"), NAMES.pickName("surnames"));
        const person = new Person("migrant", family);
        person.initialize(today);
        this.families.push(family);
        this.singles.push(person);
        this.currentStep.newImmigrant = person;
        this.currentStep.newEvents = true;
        this.population++;
    },

    handleMarriage(mate1, mate2) {
        mate1.mate = mate2;
        mate2.mate = mate1;
        this.remove(this.singles, mate1);
        this.remove(this.singles, mate2);
        mate1.family.removeMember(mate1);
        mate2.family.removeMember(mate2);
        if (mate1.family.members.length === 0) {
            this.remove(this.families, mate1.family);
        }
        if (mate2.family.members.length === 0) {
            this.remove(this.families, mate2.family);
        }
        mate1.family = new Family(mate1.firstSurname, mate2.firstSurname);
        mate2.family = mate1.family;
        mate1.family.members.push(mate1);
        mate1.family.members.push(mate2);
        this.families.push(mate1.family);
        this.currentStep.marriages.push(mate1.family);
        this.currentStep.newEvents = true;
    },

    handleBirth(mother, today) {
        const baby = new Person ("native", mother.family);
        baby.initialize(today);
        this.currentStep.births.push(baby);
        this.currentStep.newEvents = true;
        this.population++;
    },

    handleDeath(inhabitant) {
        if (inhabitant.mate !== null) {
            inhabitant.mate.mate = null;
            this.singles.push(inhabitant.mate);
        } else {
            this.remove(this.singles, inhabitant);
        }
        inhabitant.family.removeMember(inhabitant);
        if (inhabitant.family.members.length === 0) {
            this.remove(this.families, inhabitant.family);
        }
        this.currentStep.deaths.push(inhabitant); //tener en cuenta que diesToday lo sacó del array members, ver si se mantiene la referencia
        this.currentStep.newEvents = true;
        this.population--;
    },

    getSuitableSingles(mateSeeker) {
        return (this.singles.filter(single => {
            return single.age >= 18 &&
            single !== mateSeeker &&
            single.sexualOrientation === mateSeeker.sexualOrientation &&
            (mateSeeker.sexualOrientation === "straight" 
                ? single.gender !== mateSeeker.gender 
                : single.gender === mateSeeker.gender)
        }));
    },

    remove(array, element) {
        let index = array.indexOf(element);
        array.splice(index, 1);
    }
}

const UI = {
    date: document.querySelector("#date"),
    populationDisplay: document.querySelector("#population"),
    familiesDisplay: document.querySelector("#families"),
    logbookDisplay: document.querySelector("#logbook"),
    runButton: document.querySelector("#run"),
    rangeSelector: document.querySelector("#rangeSelector"),

    formatDate(date) {
        date = date.toLocaleDateString("es", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let formattedDate = "";
        for (let i = 0; i < date.length; i++) {
            if (i === 0) {
                formattedDate += date[i].toUpperCase();
            } else if (date[i] !== ",") {
                formattedDate += date[i];
            }
        }

        return formattedDate;
    },

    displayState(logEntryData) {
        this.date.innerHTML = this.formatDate(logEntryData.date);
        this.populationDisplay.innerHTML = `Población total: ${logEntryData.population}`;
        this.familiesDisplay.innerHTML = this.displayFamilies(TOWN.families);
        if (logEntryData.newEvents) {
            this.logbookDisplay.innerHTML += this.displayEvents(logEntryData);
        }
    },

    displayFamilies(families) {
        let tableContent = "";
        for (let family of families) {
            let members = "";
            for (let member of family.members) {
                members += `${member.fullName()} (${member.age}), `;
            }
            tableContent += `<tr> <td>${family.familyName}</td>
                <td>${members}</td> </tr>`;
        }

        const table =   `<table id="familiesTable">
                            <tr> <th>Familia</th> <th>Integrantes</th> </tr>
                            ${tableContent}
                        </table>`;
        return `${families.length === 0 ? "" : table}`;
    },

    displayEvents(logEntryData) {
        let entry = `<dt>${logEntryData.date.toLocaleDateString("es-ES")}</dt><dd>`;
        
        if (logEntryData.newImmigrant !== null) {
            entry += `${logEntryData.newImmigrant.fullName()} se ha mudado al pueblo.<br>`;
        }
        for (let marriage of logEntryData.marriages) {
            entry += `${marriage.members[0].fullName()} y ${marriage.members[1].fullName()} se han casado.<br>`;
        }
        for (let baby of logEntryData.births) {
            entry += `${baby.family.members[0].fullName()} y ${baby.family.members[1].fullName()} han dado a luz a ${baby.fullName()}.<br>`;
        }
        for (let dead of logEntryData.deaths) {
            entry += `${dead.fullName()} (${dead.age}) ha muerto.`;
        }
        
        entry += "</dd>";
        
        return entry;
    }
}

const SIMULATION = {
    today: undefined,
    end: undefined,
    simulation: undefined,
    logEntryData: undefined,

    setRange(selectedRange) {
        this.today = new Date();
        this.end   = new Date(this.today.getTime()).setFullYear(this.today.getFullYear() + selectedRange);
    },

    runSimulation() {
        this.simulation = setInterval(() => {
            if (this.today < this.end) {
                this.runStep();
            } else {
                this.clearSimulation();
            }
        }, 10);
    },

    async runStep() {
        this.logEntryData = TOWN.updateState(this.today);
        TOWN.clearCurrentStep();
        await UI.displayState(this.logEntryData);        //esperar para que no se modifiquen los datos de this mientras se ejecuta displayState
        this.incrementDate();
    },

    clearSimulation() {
        clearInterval(this.simulation);
        this.simulation = undefined;        //ver si es necesario este paso
    },

    incrementDate() {
        this.today.setDate(this.today.getDate() + 1);
    }
}

/* SETTING UP
**********************************************************************/
window.onload = async () => {
    await NAMES.retrieveNames();
    UI.runButton.addEventListener("click", () => {
        const selectedRange = parseInt(UI.rangeSelector.value);
        SIMULATION.setRange(selectedRange);
        SIMULATION.runSimulation();
    });
    UI.runButton.removeAttribute("disabled");
}

//REALISMO
//Corregir las edades a la que se casan las parejas y tienen hijos
//La gente se casa demasiado pronto en el transcurso de la simulación
//Chequear que ocurre cuando crecen los niños (puede ser añadiendo atributo de ciudadania: inmigrante o nativo)
//Evitar que gente de la misma familia se case
//Los apellidos son muy largos
//Ver tamaños promedios de las familias (muy pocas de 3 hijos, muchas solteras)


//OPTIMIZACIÓN
//Añadir emigración cuando la población llegue a un número donde el programa se vuelve lento (aprox. 40 años, poblacion de 800 ya es muy lento), reducir la tasa de inmigración en esos casos
//Forma de ganar eficiencia: dividir la gente en distintos arrays y que los métodos se apliquen a los arrays correspondientes en lugar de recorrer toda la población
//Realizar algunas tareas anualmente (recuento de poblacion)
//La API no permite más de 7 llamadas por minuto, pensar que hacer con el error por si llega a ocurrir

//PROYECCION
//Añadir registros familiares a las personas: hijos, fecha de matrimonio, exparejas
//Permitir al usuario modificar variables
//Permitir al usuario cancelar la simulacion, pausarla y reiniciarla, y controlar la velocidad
//Avanzarlo progresivamente en GitHub. Añadir documentación con requisitos ya cumplidos y a cumplir