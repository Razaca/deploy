import {
  GET_GAMES,
  FIND_GAMES,
  SET_GENRES,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  SEARCH_BY_GENRE,
  ERROR,
  CLEAN_ERRORS,
  REVERSE_ORDER,
  LOADING,
} from "./actions";

const initialState = {
  videogames: [],
  search: [],
  genres: [],
  recents: [],
  pages: 0,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      const ofApi = action.payload.filter((game) => {
        return typeof game.id === "number";
      });
      const ofDB = action.payload.filter((game) => {
        return typeof game.id === "string";
      });
      return {
        ...state,
        pages: state.pages + 1,
        videogames: [...state.videogames, ...ofApi],
        recents: [...ofDB],
        loading: false,
      };

    case FIND_GAMES:
      return {
        ...state,
        search: action.payload,
        loading: false,
      };

    case SET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case ORDER_BY_NAME:
      const orderByName = state.videogames.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return {
        ...state,
        videogames: orderByName,
      };

    case ORDER_BY_RATING:
      const orderByRating = state.videogames.sort(
        (a, b) => b.rating - a.rating
      );
      return {
        ...state,
        videogames: orderByRating,
      };

    case SEARCH_BY_GENRE:
      const gamesSomeGenre = state.videogames.filter((game) => {
        if (game.genres)
          return game.genres.some((genre) => genre.name === action.payload);
      });
      return {
        ...state,
        search: gamesSomeGenre,
        loading: false,
      };

    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAN_ERRORS:
      return {
        ...state,
        error: null,
      };

    case REVERSE_ORDER:
      const reverse = state.videogames.reverse();
      return {
        ...state,
        videogames: reverse,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
