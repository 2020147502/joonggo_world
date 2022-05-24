
export async function fetchSignUp(user) {
  return await (await fetch("/api/users/register", {
    method: "post",
    headers: {
      "content-type" : "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      "username": user.username,
      "email": user.email,
      "password": user.password,
    })
  })
  ).text();
}
