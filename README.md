![Repo Size](https://img.shields.io/github/languages/code-size/TheAnimalConnection/star-pet.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/TheAnimalConnection/star-pet.svg?style=for-the-badge)

# Baby Know

# Developers

- [Anniessa Antar](https://github.com/anniessa)
- [CJ Simon](https://github.com/cjsimon250)
- [Cyril Malle-Barlow](https://github.com/cyrilmb)
- [Nolen Lawton](https://github.com/nolenlawton)

## Technical Walkthrough Video

Watch this YouTube video for full presentation of all the app's features:
https://www.youtube.com/watch?v=wC4Ll95pVsM

## Use the Template for This Repository (Don't Clone)

- [Description](#description)
- [Built With](#built-with)
- [Prerequisites](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)

_Duration: 2 weeks_

## Description

Baby Know is a learning management system (LMS) that hosts content for the Baby Know: Bodies, Hearts & Minds program, which provides new parents with a holistic approach to their child’s development. The application is built for three types of users: administrators, students and teachers. The Baby Know program includes information, tools and strategies to create strong parent-child relationships, incorporating developmental milestones and nurturing the emotional well-being of all family members. Parents learn through video lectures, demonstrations, and activities, covering all aspects of development.

## Built With

<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>

## Getting Started

This project should be able to run in your favorite IDE. I used VS code while building it.
<a href="https://code.visualstudio.com/"><img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original-wordmark.svg" height="40px" width="40px" /></a>

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Postico 2](https://eggerapps.at/postico2/)

### Installation

1. Fork the repository
2. Copy the SSH key in your new repository
3. In your terminal type... `git clone {paste SSH link}`
4. Navigate into the repository's folder in your terminal
5. Open VS Code (or editor of your choice) and open the folder
6. In the terminal of VS Code run `npm install` to install all dependencies
7. Create a `.env` file at the root of the project and paste your AWS secret keys into it, along with this line:

```
  SERVER_SESSION_SECRET=superDuperSecret
```

While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep
your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/).
If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

8. Create a database named `baby-know` in PostgresSQL. If you would like to name your database something else, you will need to change `baby-know` to the name of your new database name in `server/modules/pool.js`
9. The queries in the database.sql file are set up to create all the necessary tables that you need, as well as a demo data table to test the app. Copy and paste those queries in the SQL query of the database. If this is going to production, leave out the demo data.
10. Run `npm run server` in your VS Code terminal.
11. Open a second terminal and run `npm run client`

## AWS S3 Bucket Setup

1. To manage your AWS settings online, access the AWS Management Console in the My Account tab on https://aws.amazon.com/
2. Please update this account’s location (us-east-2 for Minnesota).
3. Setting up an account will require you to add payment information prior to being able to create an S3 Bucket to store uploaded files.
4. Once you have added payment information to your AWS account, you can follow the beginning of [this tutorial](https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689) for how to set up an S3 Bucket on your account. Disregard anything after “Back End” — this has been provided for you already.
5. When setting up your account, be sure to record the AWSAccessKeyId AND the AWSSecretKey. This information should be held securely as it is what will allow your app to access your AWS S3 storage bucket. These keys will look like:

- Access key ID example: AKIAIOSFODNN7EXAMPLE
- Secret key example: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

6. You will also need to update permissions on your S3 Bucket. From the same place you accessed your CORS settings in the tutorial above, you will need to select BLOCK PUBLIC ACCESS and turn off any settings that are blocking public access. No boxes on this page should be checked with how your app is currently set up.

## Usage

Once everything is installed and running it should open in your default browser - if not, navigate to http://localhost:3000/#/.

Video walkthrough of application usage: https://www.youtube.com/watch?v=HRonNTkScl0

You can find a deployed version of the app here:

## Acknowledgments

Thank you to Prime Digital Academy who equipped our team with the skills to make this application a reality.
Many thanks to Candi and Wendy Walz of Baby Know for the opportunity to build an impactful app.
❤️ Amethyst Cohort forever ❤️
