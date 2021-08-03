# Refactor Tractor (Fitlit Version A)

## Contributors

- Eric Sergeant
- Erica Spitz
- Eric Li

## Project Manager

- Nik Seif

## Summary

This project was an exercise in our ability to refactor previously existing code from another developer. Originally, we started with a project that was only displaying information from a hardcoded data file. We connected this project to a local server, the fitlit-api file, and we also implemented POST requests that post to the local server while updating the page. We also refactored naming conventions, event listeners, and some CSS.

## Technologies Used

This project uses vanilla Javascript, HTML, and CSS.

## GIF

![refactor-project](https://user-images.githubusercontent.com/75854628/128050449-0291d669-1e55-4e9c-8274-ba27bb64cda5.gif)

## Instructions for Running/Viewing.

1. First, clone this repository to your local machine.
2. Also, clone the repository containing the API [here](https://github.com/turingschool-examples/fitlit-api).
3. In each repository, run `npm install`, and then `npm start`.
4. Project should now be running at [http://localhost:8080/](http://localhost:8080/).

## User Instructions

1. A user can click on the icons on each of the upper 4 cards to display detailed specifics about a particular category such as Activity, Sleep, and Hydration.
2. There is a user dashboard in the upper right hand corner, denoted by a user icon, that displays information pertinent to the user, such as friends weekly steps and the user's email address.
3. The bottom card, that reads "Add A New Log", has three separate icons for Activity(step icon), Hydration(drop icon), and Sleep(bed icon). Once clicked, a form pops up that a user populates with number values higher than 0. For the Sleep Quality log, a user must input increments of 0.1 and has a maximum of 5.
4. Once a user clicks the "submit" button, the dashboard is updated with the relevant information.
