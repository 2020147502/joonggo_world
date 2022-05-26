
export async function fetchSignUp(user) {
  return await (await fetch("/api/users/register", {
    method: "post",
    headers: {
      "content-type" : "application/json"
    },
    body:JSON.stringify({
      "username": user.username,
      "email": user.email,
      "password": user.password
    })
  })).json();
};

export async function fetchLogin(user) {
  return await(await fetch("/api/users/login", {
    method: "post",
    headers: {
      "content-type" : "application/json"
    },
    body:JSON.stringify({
      "email": user.email,
      "password": user.password
    })
  })).json()
};