//Use this guide to setup: https://create-react-app.dev/docs/adding-custom-environment-variables/
const { REACT_APP_API_ROOT_URL: url } = process.env;

// placeholder for rest api subject and useful for making crud functions generic reducing the number of things that have to change from component to component.
// This should be whatever your subject is in: http://server:port/context-path/api/v1/<subject>
const subject = "todos";

export const create = async (todo, credentials) => {
  try {
    console.log(`Creating ${subject}`);
    fetch(`${url}/${subject}`, {
      method: "POST",
      body: JSON.stringify({
        todo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization:
          "Basic " + btoa(credentials.username + ":" + credentials.password),
      },
    }).then((response) => {
      if (response.status !== 200) {
        const msg = `Exception occurred while creating ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
        console.log(msg);
        throw new Error(msg);
      }

      return response.json();
    });
  } catch (err) {
    const msg = `Exception occurred while creating ${subject}. Error: ${err}`;
    console.log(msg, err);
    throw new Error(msg, err);
  }
};

export const read = async (credentials) => {
  try {
    console.log(`reading ${subject}`);
    fetch(`${url}/${subject}`, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(credentials.username + ":" + credentials.password),
      },
    }).then((response) => {
      if (response.status !== 200) {
        const msg = `Exception occurred while reading ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
        console.log(msg);
        throw new Error(msg);
      }
      return response.json();
    });
  } catch (err) {
    const msg = `Exception occurred while reading ${subject}. Error: ${err}`;
    console.log(msg, err);
    throw new Error(msg, err);
  }
};

export const update = async (todo, credentials) => {
  try {
    console.log(`updating ${subject}`);
    fetch(`${url}/${subject}/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        Authorization:
          "Basic " + btoa(credentials.username + ":" + credentials.password),
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status !== 200) {
        const msg = `Exception occurred while reading ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
        console.log(msg);
        throw new Error(msg);
      }
      return response.json();
    });
  } catch (err) {
    const msg = `Exception occurred while updating ${subject}. Error: ${err}`;
    console.log(msg, err);
    throw new Error(msg, err);
  }
};

export const del = async (id, credentials) => {
  try {
    console.log(`deleting ${subject} with id: ${id}`);
    fetch(`${url}/${subject}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Basic " + btoa(credentials.username + ":" + credentials.password),
      },
    }).then((response) => {
      if (response.status !== 200) {
        const msg = `Exception occurred while reading ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
        console.log(msg);
        throw new Error(msg);
      }
      response.text();
    });
  } catch (err) {
    const msg = `Exception occurred while deleting ${subject}. Error: ${err}`;
    console.log(msg, err);
    throw new Error(msg, err);
  }
};
