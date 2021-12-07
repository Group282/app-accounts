const ENDPOINT = "http://localhost:3000/accounts";

let length_list = getAllUsers().length;

export function getAllUsers() {
  let path = ENDPOINT;
  return fetch(path)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(json => json);
}

export function getOneUser(id_) {
  let path = ENDPOINT + '/' + id_;
  return fetch(path)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(json => json);
}

export function addUser(object) {
  let path = ENDPOINT;
  length_list = getAllUsers().length + 1;
  return fetch(path, {
    method: 'POST',
    body: JSON.stringify({
      id: length_list,
      name: object.name,
      account_name: object.accountName,
      email: object.email,
      status: object.status,
      start_date: object.startDate,
      expiration_date: object.expirationDate
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export function updateUser(object) {
  let path = ENDPOINT + '/' + object.id;
  return fetch(path, {
    method: 'PUT',
    body: JSON.stringify({
      id: object.id,
      name: object.name,
      account_name: object.accountName,
      email: object.email,
      status: object.status,
      start_date: object.startDate,
      expiration_date: object.expirationDate
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export function deleteUser(id_) {
  let path = ENDPOINT + '/' + id_;
  return fetch(path, {
    method: 'DELETE'
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
