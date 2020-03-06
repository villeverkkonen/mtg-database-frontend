# Working hours monitoring

## Total
= 75h

## Frontend

| Date  | Time | Work done |
|-------|------|-----------|
| 3.8.2018  | 4    | Setting up the app and basic API-functionality |
| 10.8.2018 | 5    | Listing cards by color and showing card image by hovering card title with mouse and showing info page when clicked |
| 15.8.2018 | 1	   | CSS-styling |
| 17.8.2018 | 7    | More styling and mobile optimizing (for example previous hover effect when first clicked title with mobile, second click opens the info page for selected card) |
| 24.8.2018 | 7    | Basic functionality for drafting, still not able to create a deck |
| 31.8.2018 | 7	   | Draftings against 7 AI:s which select cards by random. Your selected cards goes to your deck, and you can see your drafted deck with 45 cards |
| 1.9.2018  | 1    | Info for drafting in UI and some bug fixes |
| 28.9.2018 | 2    | Bug fixing, instructions for use and ability to check your deck while drafting and return back to draft |
| 28.9.2018 | 4    | Ability to list saved decks by name and view the cards, creating frontend builds for backend |
| 5.10.2018 | 3    | Trying to get deck saving working, almost but not yet |
| 12.10.2018| 5    | Saving decks with names works. 15 allowed to be saved at the same time, oldest ones will be removed. |
| 19.10.2018| 5    | Possibility to do other things and continue drafting after that, sorting cards, styling |
| 26.10.2018| 3    | Sorting decks and final settings |
| 1.4.2019  | 3    | New layout stylings and some fixes and new features |
| 5.4.2019  | 2    | Styling loading text and figuring out why API gives only 14 cards per booster |
| 2.12.2019 | 1    | Loading text when getting stuff from MtG API + refactoring |
| 6.3.2020  | 1    | Get all 8 draft boosters all at once, without loop and 8 async API calls |
|       =	| 61   | |

## Backend

| Date  | Time | Work done |
|-------|------|-----------|
| 3.8.2018  | 1    | Setting up the back end |
| 10.8.2018 | 1    | Able to run the server |
| 31.8.2018 | 1    | Dependencies and testing the backend with examples |
| 28.9.2018 | 3    | Routes and database connections so decks can be saved and viewed |
| 5.10.2018 | 2    | Trying to get deck saving working and deleting automatically oldest ones if more than 10 decks exist already |
| 12.10.2018| 1    | Saving decks with name and created_at date, and cards of course |
| 19.10.2018| 1    | Mongoose settings |
| 26.10.2018| 1    | Settings |
| 2.11.2018 | 2    | Deploying to Heroku, the problem was that /build was in .gitignore... |
| 6.3.2020  | 1    | Updated cardService to get the draft boosters all at one time |
|    =	| 14   | |