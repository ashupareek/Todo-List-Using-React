export function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO": {
      const trimmedText = action.payload.trim();

      if (trimmedText === "") return state;

      const newTodo = {
        text: trimmedText,
        completed: false,
      };

      return [newTodo, ...state];
    }

    case "DELETE_TODO": {
      return state.filter((_, index) => index !== action.payload);
    }

    case "EDIT_TODO": {
      const { id, updatedText } = action.payload;
      const trimmedText = updatedText.trim();

      if (trimmedText === "") return state;

      return state.map((todo, index) => {
        if (index === id) {
          return {
            ...todo,
            text: trimmedText,
          };
        }
        return todo;
      });
    }

    case "TOGGLE_TODO": {
      return state.map((todo, index) => {
        if (index === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    }

    default:
      return state;
  }
}