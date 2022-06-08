import mongoose from "mongoose";

export async function fetchSignUp(user) {
  return await (
    await fetch("/api/users/register", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
    })
  ).json();
}

export async function fetchLogin(user) {
  return await (
    await fetch("/api/users/board", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    })
  ).json();
}

export async function fetchAuth() {
  return await (await fetch("/api/users/auth")).json();
}


export async function fetchLogout() {
  return await fetch("/api/users/logout")
};
export async function fetchBoard(board, user) {
  return await (
    await fetch("/api/users/board", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: board.title,
        body: board.body,
        type: board.type,
        author: user.author,
        views: board.views,
        numId: board.numId,
        images: board.images,
      }),
    })
  ).json();
}
