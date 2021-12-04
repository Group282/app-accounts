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

export function addUser(name_, account_name_, email_, status_, start_date_, expiration_date_) {
  let path = ENDPOINT;
  length_list = getAllUsers().length + 1;
  return fetch(path, {
    method: 'POST',
    body: JSON.stringify({
      id: length_list,
      name: name_,
      account_name: account_name_,
      email: email_,
      status: status_,
      start_date: start_date_,
      expiration_date: expiration_date_
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export function updateUser(id_, name_, account_name_, email_, status_, start_date_, expiration_date_) {
  let path = ENDPOINT + '/' + id_;
  return fetch(path, {
    method: 'PUT',
    body: JSON.stringify({
      id: id_,
      name: name_,
      account_name: account_name_,
      email: email_,
      status: status_,
      start_date: start_date_,
      expiration_date: expiration_date_
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
