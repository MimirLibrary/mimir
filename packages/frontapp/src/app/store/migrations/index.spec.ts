const updateToVersion0 = (state: any) => {
  const { location, ...newState } = state.user;
  return {
    ...state,
    user: {
      ...newState,
      locations: [location],
    },
  };
};

describe('reduxMigrations', () => {
  const oldUserState = {
    tabs: 0,
    user: {
      id: 13,
      isAuth: true,
      userName: 'Ivan Uglovec',
      avatar:
        'https://lh3.googleusercontent.com/a-/AFdZucoFtzr5GpnDR5QaZsGLNVLUhTnd0L_rsTGfuwDt5w=s96-c',
      email: 'uglovec@gmail.com',
      userRole: 'Manager',
      location: {
        id: '2',
        value: 'Gomel',
      },
    },
  };

  describe('v0', () => {
    it('should be an array location ', () => {
      const newState = updateToVersion0(oldUserState);
      expect(Array.isArray(newState.user.locations)).toBe(true);
      expect(newState.user.locations).toStrictEqual([
        { id: '2', value: 'Gomel' },
      ]);
    });

    it('location field should be undefined', () => {
      const newState = updateToVersion0(oldUserState);
      expect(newState.user.location).toBe(undefined);
    });
  });
});
