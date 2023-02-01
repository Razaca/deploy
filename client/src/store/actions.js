export const GET_GAMES = "GET_GAMES";
export const FIND_GAMES = "FIND_GAMES";
export const SET_GENRES = "SET_GENRES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const REVERSE_ORDER = "REVERSE_ORDER";
export const SEARCH_BY_GENRE = "SEARCH_BY_GENRE";
export const CLEAN_ERRORS = "CLEAN_ERRORS";
export const ERROR = "ERROR";
export const LOADING = "LOADING";

export const getGames = (url) => {
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          dispatch({
            type: ERROR,
            payload: "Problemas con el servidor. Recarga la pagina",
          });
        } else {
          dispatch({ type: GET_GAMES, payload: data.games });
        }
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: "Problemas con el servidor. Recarga la pagina",
        });
      });
  };
};

export const findGames = (name) => {
  const url = `https://deploy-production-962d.up.railway.app/videogames?name=${name}`;
  return function (dispatch) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log({data});
        if (data.error) {
          dispatch({ type: ERROR, payload: data.err });
        } else {
          dispatch({ type: FIND_GAMES, payload: data.games });
        }
      })
      .catch((error) => {
        console.log({error});
        dispatch({ type: ERROR, payload: error });
      });
  };
};

export const setGenres = () => {
  const url = `https://deploy-production-962d.up.railway.app/genres`;
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          dispatch({ type: ERROR, payload: data.err });
        } else {
          dispatch({ type: SET_GENRES, payload: data.genres });
        }
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: "Problemas con el servidor. Recarga la pagina",
        });
      });
  };
};

export const orderByName = () => {
  return {
    type: ORDER_BY_NAME,
  };
};

export const orderByRating = () => {
  return {
    type: ORDER_BY_RATING,
  };
};

export const searchByGenre = (genre) => {
  return {
    type: SEARCH_BY_GENRE,
    payload: genre,
  };
};

export const cleanErrors = () => {
  return {
    type: CLEAN_ERRORS,
  };
};

export const reverseOrder = () => {
  return {
    type: REVERSE_ORDER,
  };
};

export const setError = (error) => {
  return {
    type: ERROR,
    payload: error
  };
}

export const setLoading = () => {
  return{
    type: LOADING
  }
}