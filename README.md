# HobbyClub
## _The HUB for friends to discuss their hobbies_
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

HobbyClub is a virtual hub for friends to discuss their hobbies. The platform is designed to simulate traditional book clubs, where a group chooses a book to read and then comes together to talk about it. However, HobbyClub is not limited to books. Users can create clubs based on any hobby, including games, movies, and more.

The platform enables users to create clubs, choose an activity to discuss on the message board, and have conversations about it. Once the activity ends, the discussion remains available for future reference, and a new hobby is chosen. We are continually working to enhance the platform's features, and a checklist of upcoming features can be found here.

**_The project is still in development and a checklist of upcoming features can be found [here](##Checklist-for-future-features)._**

## Backend

The database was created using MySQL, with the help of Sequelize through migrations and seed, the library was also used for CRUD information.

The _main_ folders on this side of the app are:
- Migration, to create for Database
- Seeds, to populate the database with information to help with the build process
- Models, to explain the specifics of tables and relationships
- Services, to make direct contact with the database and, if necessary, make checks on the information sent
- Controller, to contact the Service folder and, using a try/catch system, handle possible errors
- Routes, to add the access path to the endpoints.

All of these folders are divided into user, club, and hobby to make it easy to add future features to each element.

## Frontend

The user side of the application was made using mainly React, and in some points it was stylized with bootstrap. To make it easier and allow to reuse recurring codes, the project was strutctured with the use of pages and components. Because the resources share the information just between the page and the components, there was no need to add features such as Redux to the project. That option was considered.

The _main_ folders on this side of the app are:
- Pages, where the main resoureces have their body, and from where they'll call the needed components.
- Componentes, where codes that are reused in different pages are stored.
- Styles, although Bootstrap was used in some points, the main part was done with pure CSS.

## Checklist for future features

- [x] Add the message board
- [x] Render the list of club members
- [x] Create API and system to add new hobbies
- [ ] Add search engine
- [ ] Allow direct message between users
- [ ] Create system to add friends
- [ ] Add system to vote for next hobby
- [ ] Create tests for the project
