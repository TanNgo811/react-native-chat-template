import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatList from '../screens/ChatList/ChatList';
import ChatDetail from '../screens/ChatDetail/ChatDetail';
import CreateNewConversation from '../screens/CreateNewConversation/CreateNewConversation';
import CreateNewGroupConversation from '../screens/CreateNewGroupConversation/CreateNewGroupConversation';
import GroupChatDetail from '../screens/GroupChatDetail/GroupChatDetail';

const { Navigator, Screen } = createStackNavigator();

const RootNavigator: FC<PropsWithChildren<RootNavigatorProps>> =
  (): ReactElement => {
    return (
      <Navigator
        initialRouteName={'ChatList'}
        headerMode="none"
        screenOptions={{
          gestureEnabled: true,
          animationEnabled: false,
        }}
      >
        <Screen name={'ChatList'} component={ChatList} initialParams={{}} />

        <Screen name={'ChatDetail'} component={ChatDetail} initialParams={{}} />

        <Screen
          name={'CreateNewConversation'}
          component={CreateNewConversation}
          initialParams={{}}
        />

        <Screen
          name={'CreateNewGroupConversation'}
          component={CreateNewGroupConversation}
          initialParams={{}}
        />

        <Screen
          name={'GroupChatDetail'}
          component={GroupChatDetail}
          initialParams={{}}
        />
      </Navigator>
    );
  };

export interface RootNavigatorProps {
  //
}

RootNavigator.defaultProps = {
  //
};

RootNavigator.propTypes = {
  //
};

export default React.memo(RootNavigator);
