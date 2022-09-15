export const migrations = {
  0: (state: any) => {
    const { location, ...newState } = state;
    return {
      ...newState,
      user: {
        ...newState.user,
        locations: [],
      },
    };
  },
};
