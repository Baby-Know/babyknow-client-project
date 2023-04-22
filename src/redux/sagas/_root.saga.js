import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import unitSaga from "./unit.saga";
import newRegistrantsSaga from "./newRegistrants.saga";
import studentsSaga from "./students.saga";
import contentSaga from "./content.saga";
import lessonSaga from "./lesson.saga";
import teachersSaga from "./teachers.saga";
import usersContentSaga from "./usersContent.saga";
import progressSaga from "./progress.saga";
import cohortsSaga from "./cohorts.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    unitSaga(),
    newRegistrantsSaga(),
    studentsSaga(),
    contentSaga(),
    lessonSaga(),
    teachersSaga(),
    usersContentSaga(),
    progressSaga(),
    cohortsSaga(),
  ]);
}
