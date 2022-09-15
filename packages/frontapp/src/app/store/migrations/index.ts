type Migration = {
  [key: string]: (state: any) => any;
};

export const migrations: Migration = {
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
