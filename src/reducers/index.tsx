function reducer(state: any, action: any) {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return { ...state, initialText: 'changed in the browser!' };
    default:
      return { ...state };
  }
}

export default reducer;
