const toDoForm = document.querySelector(".formOne"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".tdOne"),
  toDoList2 = document.querySelector(".tdTwo");

const form = document.querySelector(".js-form"),
  input = document.querySelector("input"),
  greeting = document.querySelector(".js-greetings");
const PENDING = "pending";
const FINISHED = "finished";

let toDo_PD = [];
let toDo_FN = [];
const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector(".koreaTime");

const body = document.querySelector("body");

const IMG_NUMBER = 3;
const API_KEY = "d2a6476db30f356f581c42d8d24ec420";
const COORDS = "coords";

const weather = document.querySelector(".js-weather");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit2(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit2);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML = `Hello ${text}`;
}
function localName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    //she is
    paintGreeting(currentUser);
  }
}
function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  //body.appendChild(image);
  body.prepend(image);
  //image.addEventListener("loadend", handleImgLoad)
}

//function handleImgLoad() {}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `한국의 현재시간: ${
    hours < 10 ? `0${hours}` : hours
  }:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue, PENDING);
  toDoInput.value = "";
}
function deleteToDo(event) {
  if (event.target.status === "pending") {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDo_PD.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDo_PD = cleanToDos;
    saveToDos(event.target.status);
  } else if (event.target.status === "finished") {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList2.removeChild(li);
    const cleanToDosTwo = toDo_FN.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDo_FN = cleanToDosTwo;
    saveToDos(event.target.status);
  }
}

function sendToDo(event) {
  if (event.target.status === "pending") {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDo_PD.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDo_PD = cleanToDos;
    saveToDos(event.target.status);
    paintToDo(event.target.text, FINISHED, event.target.id);
  } else if (event.target.status === "finished") {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList2.removeChild(li);
    const cleanToDosFn = toDo_FN.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDo_FN = cleanToDosFn;
    saveToDos(event.target.status);
    paintToDo(event.target.text, PENDING, event.target.id);
  }
}
// if- else not required
function saveToDos(status) {
  if (status === "pending") {
    localStorage.setItem(PENDING, JSON.stringify(toDo_PD));
    localStorage.setItem(FINISHED, JSON.stringify(toDo_FN));
  } else if (status === "finished") {
    localStorage.setItem(PENDING, JSON.stringify(toDo_PD));
    localStorage.setItem(FINISHED, JSON.stringify(toDo_FN));
  }
}

function paintToDo(text, status, time) {
  if (status === "pending") {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const FnBtn = document.createElement("button");
    const span = document.createElement("span");
    let newId;
    if (typeof time === "undefined") {
      const new_Id = new Date();
      newId = new_Id.getTime();
    } else {
      newId = parseInt(time);
    }
    console.log(time);
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    delBtn.status = status;
    FnBtn.innerText = "✅";
    FnBtn.addEventListener("click", sendToDo);
    FnBtn.status = status;
    FnBtn.text = text;
    FnBtn.id = newId;
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(FnBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
      text: text,
      id: newId
    };
    toDo_PD.push(toDoObj);
    saveToDos(status);
  } else if (status === "finished") {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const FnBtn = document.createElement("button");
    const span = document.createElement("span");
    let newId;
    if (typeof time === "undefined") {
      const new_Id = new Date();
      newId = new_Id.getTime();
    } else {
      newId = parseInt(time);
    }
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    delBtn.status = status;
    FnBtn.status = status;
    FnBtn.innerText = "⬆️";
    FnBtn.status = status;
    FnBtn.text = text;
    FnBtn.id = newId;
    FnBtn.addEventListener("click", sendToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(FnBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList2.appendChild(li);
    const toDoObj = {
      text: text,
      id: newId
    };
    toDo_FN.push(toDoObj);
    saveToDos(status);
  }
}
function loadList() {
  const loadedPending = localStorage.getItem(PENDING);
  const loadedFinished = localStorage.getItem(FINISHED);
  if (loadedPending !== null) {
    const parsePending = JSON.parse(loadedPending);
    parsePending.forEach(function (toDo) {
      paintToDo(toDo.text, "pending");
    });
  }
  if (loadedFinished !== null) {
    const parseFinished = JSON.parse(loadedFinished);
    parseFinished.forEach(function (toDo) {
      paintToDo(toDo.text, "finished");
    });
  }
}

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}도 /  ${place}`;
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("cant error");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
  const loadCoords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
  getTime();
  setInterval(getTime, 1000);
  const randomNumber = getRandom();
  paintImage(randomNumber);
  localName();
  loadList();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
