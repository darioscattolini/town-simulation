# Pueblo chico
> JS app that simulates the growth of a small town and its most basic social relationships. 

## General info
This is the fourth JavaScript app I developed. It runs a simulation of an initially empty small town, displaying a record of the existing families and a logbook of the events that happen every day.  
The user starts the simulation after specifying its length in town's years. There are four basic events ruling de dynamics of the simulation: immigration, marriage, birth and death. There is a degree of chance in event occurence, but I tried to add realism combining randomness with real statistics.  
This is my second (and deeper) approach to Object Oriented Programming, and my first attempt at fetching data from an API and developing asyncronous code.

## Built with
* Just the minimum HTML and CSS.
* Focus on JavaScript functionality.
* Access to [UINames](https://uinames.com/) API to fetch names for people in the town.

## Status
_in progress_
I like this app because for the time being it's just the core basic functionality, and I can extend it any way I want. These are some of my ideas for further development:
1. Realism
    - Use statistics to regulate the ages in which couples marry and have kids
    - Avoid marriage by people of the same family
    - Keep average family size in line with statistics
2. Optimization and performance
    - Find ways to overcome the slowdown that happens when population reaches 500
    - API supports up to 7 requests per minute, add some error handling for cases when data are not retrieved
3. Projection
    - Allow users to customize some variables of the simulation (language, immigration rate, etc.)
    - Provide more control of the simulation: clear, pause, restart, speed control.

## Try the simulator!
This is the link to the deployed version: [https://darioscattolini.github.io/town-simulator/](https://darioscattolini.github.io/town-simulator/)

## Inspiration
This project started as a solution to an assignment on Object Oriented Programming for the lessons I took during October and November 2019 at Cibernàrium in Barcelona, but my idea of turning it into a simulation transformed it altogether.  
The project was developed in November, but I refactored it completely in February. It's probably not OOP at its best, but now the code is much cleaner, with data and methods encapsulated within four main objects. I also added for the first time API requests and asyncronous code.

## Contact
Created by [Darío Scattolini](https://darioscattolini.github.io). Feel free to contact me!