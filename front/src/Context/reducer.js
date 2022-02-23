export const actions = {
  START_ACTION: "START_ACTION",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  FETCH: "FETCH DATA",
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
  /*---------ERRORS---------*/
  FAILURE_ACTION: "FAILURE_ACTION",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  CLEAR_ERRORS: "CLEAR_ERRORS",
};
export function reducerTasksUser(state, action) {
  const copia = [...state.tasks];
  console.log(state, "VER STATE", action, "USE REDUCER");
  switch (action.type) {
    /*------------------ERRORS-----------------*/
    case actions.VALIDATION_ERROR:
      return { ...state, loading: false, error: action.payload };
    case actions.CLEAR_ERRORS:
      return { ...state, loading: false, error: false };
    case actions.FAILURE_ACTION:
      return { ...state, loading: false, error: action.payload };
    /*-------------------------------------------------------*/
    case actions.START_ACTION:
      return { ...state, loading: true, error: false };
    /*--------------------LOGIN------------------*/
    case actions.LOGIN:
      return { ...state, loading: false, user: action.payload };
    /*--------------------LOGOUT------------------*/
    case actions.LOGOUT:
      return { ...state, loading: false, user: null };
    /*----------------------------------------------------*/
    case actions.FETCH:
      return { ...state, loading: false, tasks: action.payload };
    case actions.ADD:
      return {
        ...state,
        loading: false,
        tasks: [...copia, action.payload],
      };
    case actions.UPDATE:
      return {
        ...state,
        loading: false,
        tasks: copia.map((item) =>
          item.id === action.payload.id ? { ...action.payload } : item
        ),
      };
    case actions.REMOVE:
      return {
        ...state,
        loading: false,
        tasks: copia.filter((item) => item.id !== action.payload),
      };

    default:
      throw new Error("Type does not exist");
  }
}
