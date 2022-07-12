//Use this guide to setup: https://create-react-app.dev/docs/adding-custom-environment-variables/
const { REACT_APP_API_ROOT_URL: url } = process.env;
const { REACT_APP_ADMIN_USERNAME: username } = process.env;
const { REACT_APP_ADMIN_USERNAME: password } = process.env;

// placeholder for rest api subject and useful for making crud functions generic reducing the number of things that have to change from component to component.
// This should be whatever your subject is in: http://server:port/context-path/api/v1/<subject>
const subject = "todos";

export const create = async (todo) => {
  try {
    console.log(`Creating ${subject}`);
    let response = await fetch(`${url}/${subject}`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });

    if (response.status !== 200) {
      const msg = `Exception occurred while creating ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    let json = await response.json();
    return json;
  } catch (err) {
    const msg = `Exception occurred while creating ${subject}. Error: ${err}`;
    console.log(msg, err);
    throw new Error(msg, err);
  }
};

export const read = async () => {
  try {
    console.log(`reading ${subject}`);
    let response = await fetch(`${url}/${subject}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });

    if (response.status !== 200) {
      const msg = `Exception occurred while reading ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    let json = await response.json();
    return json;
  } catch (err) {
    const msg = `Exception occurred while reading ${subject}. Error: ${err}`;
    console.log(msg, err);
    throw new Error(msg, err);
  }
};

export const update = async (todo) => {
  try {
    console.log(`updating ${subject}`);
    let response = await fetch(`${url}/${subject}/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.status !== 200) {
      const msg = `Exception occurred while reading ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    let json = await response.json();
    return json;
  } catch (err) {
    const msg = `Exception occurred while updating ${subject}. Error: ${err}`;
    console.log(msg, err);
    throw new Error(msg, err);
  }
};

export const del = async (id) => {
  try {
    console.log(`deleting ${subject} with id: ${id}`);
    let response = await fetch(`${url}/${subject}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });

    if (response.status !== 200) {
      const msg = `Exception occurred while reading ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    let text = await response.text();
    return text;
  } catch (err) {
    const msg = `Exception occurred while deleting ${subject}. Error: ${err}`;
    console.log(msg, err);
    throw new Error(msg, err);
  }
};

export const loadSampleData = async () => {
  try {
    console.log("loading sample data");
    let response = await fetch(
      `http://localhost:7878/todo/admin/load-sample-data`,
      {
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
        },
      }
    );

    if (response.status !== 200) {
      const msg = `Exception occurred while loading sample data for ${subject}. Status: ${response.status}, Error Message: 
              ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const text = await response.text();
    return text;
  } catch (err) {
    const msg = `Exception occurred while loading sample data for ${subject}. Error: ${err}`;
    console.log(msg, err);
    throw new Error(msg, err);
  }
};
