class UiController {
  private ui = {
    date: document.querySelector("#date") as HTMLParagraphElement,
    population: document.querySelector("#population") as HTMLParagraphElement,
    families: document.querySelector("#families") as HTMLDivElement,
    logbook: document.querySelector("#logbook") as HTMLDListElement,
    runButton: document.querySelector("#run") as HTMLButtonElement,
    rangeSelector: document.querySelector("#rangeSelector") as HTMLInputElement
  }

  public displayState(gameState: GameState): void {
    this.ui.date.innerHTML = this.formatDate(gameState.today);
    this.ui.population.innerHTML = `Población total: ${gameState.population}`;
    this.ui.families.innerHTML = this.displayFamilies(gameState.families);
    if (gameState.newEvents) {
      this.ui.logbook.innerHTML += 
        this.displayDailyEvents(gameState.newEvents, gameState.today);
    }
  }

  public configureStartButton(): void {
    this.ui.runButton.addEventListener("click", async () => {
      const selectedRange = parseInt(this.ui.rangeSelector.value);
      const simulation = new Simulation(selectedRange, this);
      await simulation.runSimulation(80);
    });

    this.ui.runButton.removeAttribute("disabled");
  }

  private formatDate(date: Date): string {
    const dateString = date.toLocaleDateString("es", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let formattedDate = "";
    for (let i = 0; i < dateString.length; i++) {
      if (i === 0) {
        formattedDate += dateString[i].toUpperCase();
      } else if (dateString[i] !== ",") {
        formattedDate += dateString[i];
      }
    }

    return formattedDate;
  }

  private displayFamilies(families: Family[]): string {
    let tableContent = "";
    for (let family of families) {
      let members = "";

      for (let member of family.members) {
        members += `${member.fullName} (${member.age}), `;
      }

      tableContent += 
        `<tr> 
          <td>${family.familyName}</td>
          <td>${members}</td>
        </tr>`;
    }

    const table = 
      `<table id="familiesTable">
        <tr> <th>Familia</th> <th>Integrantes</th> </tr>
        ${tableContent}
      </table>`;
    
    return families.length === 0 ? "" : table;
  }

  private displayDailyEvents(newEvents: DailyEvents, date: Date) {
    let entry = `<dt>${date.toLocaleDateString("es-ES")}</dt><dd>`;
      
    if (newEvents.immigrant) {
      entry += `${newEvents.immigrant} se ha mudado al pueblo.<br>`;
    }

    for (const marriage of newEvents.marriages) {
      entry += `${marriage[0]} y ${marriage[1]} se han casado.<br>`;
    }

    for (const birth of newEvents.births) {
      entry += `${birth.parent1} y ${birth.parent2} han dado a luz a 
        ${birth.child}.<br>`;
    }

    for (const dead of newEvents.deaths) {
      entry += `${dead.name} (${dead.age}) ha muerto.`;
    }
      
    entry += "</dd>";
      
    return entry;
  }
}
