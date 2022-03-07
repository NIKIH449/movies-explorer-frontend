import { checkResponse } from '.';

export const onSignOut = () => {
  return fetch('https://api.movie-explorer.nomoredomains.work/signout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};
export const onEditProfile = (name, email, token) => {
  return fetch(`https://api.movie-explorer.nomoredomains.work/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((res) => checkResponse(res));
};
export const putLike = (data) => {
  return fetch('https://api.movie-explorer.nomoredomains.work/movies', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `https://api.nomoreparties.co${data.image.url}`,
      trailer: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then((res) => checkResponse(res));
};
export const getUserMovies = (token) => {
  return fetch('https://api.movie-explorer.nomoredomains.work/movies', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};
export const deleteMovie = (id) => {
  return fetch(`https://api.movie-explorer.nomoredomains.work/movies/${id}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};

export const checkToken = (token) => {
  return fetch('https://api.movie-explorer.nomoredomains.work/users/me', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};

export const signUp = (password, email, name) => {
  return fetch('https://api.movie-explorer.nomoredomains.work/signup', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email, name }),
  }).then((res) => checkResponse(res));
};
export const getUserInfo = (token) => {
  return fetch('https://api.movie-explorer.nomoredomains.work/users/me', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};

export const signIn = (password, email) => {
  return fetch('https://api.movie-explorer.nomoredomains.work/signin', {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};
