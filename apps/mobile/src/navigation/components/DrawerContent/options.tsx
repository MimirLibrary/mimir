import {ROUTES} from '../../routes';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {Color} from '../../../config/designTokens';

export const DrawerList = (navigation: DrawerNavigationHelpers) =>
  ROUTES.map(({name, icon}, index) => ({
    key: index.toString(),
    title: name,
    action: () => navigation.navigate(name),
    getIcon: (color: Color) => icon(color),
  }));
