import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  orderByChild,
  query,
  equalTo,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDu7u6BhKzEl2simJoUhMUtvMmHIKidBdM",
  authDomain: "food-to-go-376717.firebaseapp.com",
  projectId: "food-to-go-376717",
  storageBucket: "food-to-go-376717.appspot.com",
  messagingSenderId: "493381787421",
  appId: "1:493381787421:web:c861124155317ffb340bf4",
  databaseURL:
    "https://training-5d785-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export function saveUserInDb(userId, name, email, imageUrl) {
  set(ref(database, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

export function saveNewTraining(userId, name, series, date) {
  const trainingsRef = ref(database, "trainings");
  const newTrainingRef = push(trainingsRef);
  set(newTrainingRef, {
    userId,
    name,
    series,
    date,
  });
  return newTrainingRef.key;
}

export function saveNewExercise(name, type) {
  const exerciseRef = ref(database, "exercises");
  const newPostRef = push(exerciseRef);
  set(newPostRef, {
    name,
    type,
  });
}

export function saveNewSerie(exerciseId, sets) {
  const serieRef = ref(database, "series");
  const newPostRef = push(serieRef);
  set(newPostRef, {
    exerciseId,
    sets,
  });
}

export function getMyWorkouts(userId) {
  const trainingsRef = ref(database, "trainings/");
  const trainings = query(
    trainingsRef,
    orderByChild("userId"),
    equalTo(userId)
  );

  return trainings;
}

export function getSeriesForWorkout(seriesArray) {
  const listOfSeries = [];
  seriesArray.forEach((serieId) => {
    const seriesRef = ref(database, "series/" + serieId);
    onValue(seriesRef, (snapshot) => {
      const data = snapshot.val();
      if (!!data.exerciseId) {
        const exerciseRef = ref(database, "exercises/" + data.exerciseId);
        onValue(exerciseRef, (exerciseSnapShot) => {
          const exercise = exerciseSnapShot.val();
          data.exerciseName = exercise.name;
        });
      }

      listOfSeries.push({ id: serieId, ...data });
    });
  });
  return listOfSeries;
}

export const dataToArray = (data) => {
  const dataArray = Object.entries(data).map(([key, value]) => ({
    id: key,
    ...value,
  }));
  return dataArray;
};
