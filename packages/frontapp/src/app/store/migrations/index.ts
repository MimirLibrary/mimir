export const migrations = {
  0: (state: any) => {
    const { location, ...newState } = state.user;
    return {
      ...state,
      user: {
        ...newState,
        locations: [location],
      },
    };
  },
};
