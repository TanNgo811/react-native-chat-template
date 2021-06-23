import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  ChatDefaultLayout,
  ChoosingUser,
  SearchBar,
} from 'react-native-chat-bar';
import LeftArrow from '../../asserts/LeftArrow';

const CreateNewGroupConversation: FC<
  PropsWithChildren<CreateNewGroupConversationProps>
> = (
  props: PropsWithChildren<CreateNewGroupConversationProps>
): ReactElement => {
  const { navigation, route } = props;

  const handleGoBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleGoToGroupChatDetail = React.useCallback(() => {
    navigation.navigate('GroupChatDetail');
  }, [navigation]);

  return (
    <ChatDefaultLayout
      route={route}
      navigation={navigation}
      title={'New Group Conversation'}
      left={
        <>
          <View />
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleGoBack}
            style={{
              marginLeft: 16,
              position: 'absolute',
              zIndex: 10,
              left: 0,
            }}
          >
            <LeftArrow />
          </TouchableOpacity>
        </>
      }
      rightType={'other'}
      right={
        <TouchableOpacity activeOpacity={1} onPress={handleGoToGroupChatDetail}>
          <Text
            style={{
              color: '#415EB6',
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      }
      headerContainerColor={'white'}
      headerTitleColor={'#200E32'}
    >
      <SearchBar isRoundedBorder={false} />
      <View style={styles.container}>
        <Text style={{ marginVertical: 8 }}>Suggestion</Text>

        <ChoosingUser groupPick={true} userName={'User 1'} />

        <ChoosingUser groupPick={true} userName={'User 2'} />
      </View>
    </ChatDefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  image: {
    width: 36,
    height: 36,
  },
});

export interface CreateNewGroupConversationProps extends StackScreenProps<any> {
  //
}

CreateNewGroupConversation.defaultProps = {
  //
};

CreateNewGroupConversation.propTypes = {
  //
};

export default CreateNewGroupConversation;
