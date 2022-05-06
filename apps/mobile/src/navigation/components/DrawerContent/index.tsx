// @ts-ignore
import React, {FC} from 'react';
import {DrawerList} from './options';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {UserCard} from './UserCard';
import {DrawerItem} from './DrawerItem';

export const DrawerContent: FC<DrawerContentComponentProps> = props => {
  const DrawerItemList = DrawerList(props.navigation).map(
    ({key, title, action, getIcon}, index) => {
      const active = props.state.index == index;

      return (
        <DrawerItem
          key={key}
          title={title}
          action={action}
          active={active}
          icon={getIcon}
        />
      );
    },
  );

  return (
    <DrawerContentScrollView {...props}>
      <UserCard />
      {DrawerItemList}
    </DrawerContentScrollView>
  );
};
