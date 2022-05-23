
export async function fetchSignUp(user) {
  return await (await fetch("http://localhost:3000/api/users/register", {
    method: "post",
    headers: {
      "content-type" : "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      "username": user.username,
      "email": user.email,
      "password": user.password,
      "confirmPassword": user.confirmPassword
    })
  })
  ).text();
}
