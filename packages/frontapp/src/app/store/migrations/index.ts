import {MigrationManifest} from "redux-persist/es/types";

export const migrations: MigrationManifest = {
  0: (state: any) => {
    const { location, ...newState } = state.user;
    return {
      ...state,
      user: {
        ...newState,
        locations: location ? [location] : [],
      },
    };
  },
  1: (state: any) => {
    const { locations, ...newState } = state.user;

    // Check if locations array have any null/undefined values
    const hasBrokenLocations =
      locations.filter(<T>(x: T) => x).length !== locations.length;

    return {
      ...state,
      user: {
        ...newState,
        locations: hasBrokenLocations ? [] : locations,
      },
    };
  },
};
