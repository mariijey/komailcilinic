# komeil clinic

<div align="center"><img src="" alt="koeil clinic Logo" width="40%" ></div>

This is an admin panel for komeil clinic that provides powerful management capabilities for various aspects of the system. The admin panel allows you to efficiently manage the following components:

- Property Management: Easily handle properties, their details, and related data.
- Contract Management: Manage contracts and agreements with clients or partners.
- Content Management: Control the content displayed on the website and application.
- User Management: Efficiently manage user accounts, permissions, and access.

## Description

The komeil clinic Admin Panel offers a user-friendly interface to handle critical data related to komeil clinic's website and application. With this panel, you can seamlessly manage and edit various data points, ensuring smooth operation and updates across the entire system.

The admin panel serves as a central hub for making changes to property listings, contracts, and website content. It simplifies the management process and empowers administrators with the necessary tools to keep the platform up-to-date and relevant.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Installation

Clone down this repository. You will need `node` and `npm` and `git` installed globally on your machine.

```bash
$ git clone https://github.com/mariijey/komailcilinic.git komailcilinic.git

$ cd komailcilinic

$ npm install
```

Create a `.env` file and copy `.env.sample` variables into (this variables is different in production).

## Usage

for develope:

```bash
$ npm start
```

for production (this project has docker file and you can run this with docker or docker compose.):

```bash
$ npm run build
```


## Features

- **Property Management**: Add, update, and maintain property listings, including their details, images, and specifications.
- **Contract Management**: Efficiently handle contracts and agreements, ensuring accurate records and smooth operations.
- **Content Management**: Control and update website content, ensuring the latest information is readily available to users.
- **User Management**: Manage user accounts, permissions, and access rights, ensuring a secure and controlled environment.

## Technologies Used

<a href="https://react.dev/" target="_blank"> Reactjs - The web framework used   <img src="https://img.shields.io/badge/Made_with-React-61DAFB?logo=react&logoColor=white&style=for-the-badge" width="100px" alt="Reactjs made" /></a>



<a href="https://www.typescriptlang.org/" target="_blank"> Typescript - Project language  <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white&style=for-the-badge" width="80px" alt="Typescript" /></a>


<a href="https://mui.com/" target="_blank"> Material-UI and Ant Design - UI framework  <img src="https://img.shields.io/badge/Material--UI-0081CB?logo=material-ui&logoColor=white&style=for-the-badge" width="80px" alt="MUI" /></a>

## Contributing

We appreciate your interest in contributing to komeil clinic! As this is a private project, we currently only accept contributions from trusted collaborators and team members. If you are part of our team, please feel free to contribute and follow these guidelines:

### Bug Reports and Feature Requests

If you encounter a bug while using komeil clinic or have a feature request, please feel free to report it to our internal issue tracking system.

### Pull Requests

For collaborators and team members, to submit a pull request, please follow these steps:

1. Clone the repository: 

```bash
$ git clone https://github.com/komeil clinic-LTD/komeil clinic-superadmin-panel.git
```
2. Initialize git flow 

```bash
$ git flow init
```

3. Create new branch with git-flow

```bash
$ git flow feature start ADN-jira_task_number-name_of_branch
```

4. add changes 

```bash
$ git add .
```

5. Commit your changes with number of task 

```bash
$ git commit -m "ADN-jira_task_number:'Add some feature'"
```

6. Push the branch to the remote repository

```bash
$ git push origin feature/your-feature-name
```

7. Open a pull request against the `dev` branch of our internal repository.

### Coding Guidelines

For internal contributors, please follow the existing code style and conventions used in the project. Write descriptive commit messages and provide a clear explanation of your changes. Keep your pull requests focused and limited to one issue or feature at a time. If your changes require updating documentation, please include the necessary updates.

### Code of Conduct

As an internal contributor, you are expected to adhere to the guidelines and code of conduct set forth by our organization.

Thank you for your contributions to komeil clinic! Your help is greatly appreciated.




