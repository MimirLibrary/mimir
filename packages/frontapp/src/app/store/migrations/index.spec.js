import { migrations } from './index';

describe('reduxMigrations', () => {
  const getInitialState = () => ({
    _persist: { version: -1, rehydrated: false },
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
  });

  describe('v0', () => {
    const migrate = migrations[0];

    it('should apply forward migration', () => {
      const newState = migrate(getInitialState());
      // Old field should not exist
      expect(newState.user.location).toBe(undefined);
      // Check migrated data
      expect(Array.isArray(newState.user.locations)).toBe(true);
      expect(newState.user.locations).toStrictEqual([
        { id: '2', value: 'Gomel' },
      ]);
    });

    it('should handle invalid state', () => {
      const oldUserState = getInitialState();
      delete oldUserState.user.location;

      const newState = migrate(oldUserState);
      expect(Array.isArray(newState.user.locations)).toBe(true);
      expect(newState.user.location).toBe(undefined);
      expect(newState.user.locations).toStrictEqual([]);
    });
  });

  describe('v1', () => {
    const migrate = migrations[1];
    const _s = getInitialState();
    it('should apply forward migration', () => {
      const initialState = {
        ..._s,
        user: { ..._s.user, locations: [{ id: '2', value: 'Gomel' }] },
      };
      const newState = migrate(initialState);
      expect(newState.user.locations).toStrictEqual([
        { id: '2', value: 'Gomel' },
      ]);
    });

    it('should handle invalid locations array', () => {
      const initialState = { ..._s, user: { ..._s.user, locations: [null] } };
      const newState = migrate(initialState);
      expect(newState.user.locations).toStrictEqual([]);
    });
  });

  describe('cummulative', () => {
    const migrationsArray = Object.keys(migrations)
      .sort()
      .map((d) => migrations[d]);
    const finalState = getInitialState();
    delete finalState.user.location;
    finalState.user.locations = [{ id: '2', value: 'Gomel' }];

    it('applies all migrations', () => {
      expect(
        migrationsArray.reduce((state, migrate) => {
          return migrate(state);
        }, getInitialState())
      ).toStrictEqual(finalState);
    });
  });
});
