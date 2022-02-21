export function reducerTasksUser(state, action) {
  switch (action.type) {
    case "ADD":
      return state;

    default:
      throw new Error("Type does not exist");
  }
}
