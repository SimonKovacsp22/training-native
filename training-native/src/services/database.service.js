import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

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
  const trainingRef = ref(database, "trainings");
  const newPostRef = push(trainingRef);
  set(newPostRef, {
    userId,
    name,
    series,
    date,
  }).then((val) => console.log(val));
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
