const fetchAPIData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .catch(error => console.log('error: ', error))
}

const postNewActivity = (activity) => {
  fetch('http://localhost:3001/api/v1/activity', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(activity)
  })
    .then((res) => checkForError(res))
    .catch((err) => console.log(err))
}

const postNewHydration = (hydro) => {
  fetch('http://localhost:3001/api/v1/hydration', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hydro)
  })
    .then((res) => checkForError(res))
    .catch((err) => console.log(err))
}

const checkForError = (response) => {
  console.log(response)
  if (!response.ok) {
    error.forEach(error => error.innerText = "Please make sure that all fields are filled out.");
    throw new Error("Please make sure that all fields are filled out.");
  } else {
    return response.json()
  }
}

export { fetchAPIData, postNewActivity, postNewHydration };
