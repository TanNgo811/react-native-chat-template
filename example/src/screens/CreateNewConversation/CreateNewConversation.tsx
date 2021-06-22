import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { ChatDefaultLayout, SearchBar } from 'react-native-chat-bar';
import RightArrow from '../../asserts/RightArrow';
import GroupIcon from '../../asserts/GroupIcon';

const CreateNewConversation: FC<PropsWithChildren<CreateNewConversationProps>> =
  (props: PropsWithChildren<CreateNewConversationProps>): ReactElement => {
    const { navigation, route } = props;

    const handleGoToChatList = React.useCallback(() => {
      navigation.navigate('ChatList');
    }, [navigation]);

    const handleGoToChatDetail = React.useCallback(() => {
      navigation.navigate('ChatDetail');
    }, [navigation]);

    const handleGoToCreateGroupConversation = React.useCallback(() => {
      navigation.navigate('CreateNewGroupConversation');
    }, [navigation]);

    return (
      <ChatDefaultLayout
        route={route}
        navigation={navigation}
        title={'New Conversation'}
        left={<View />}
        rightType={'other'}
        right={
          <TouchableOpacity activeOpacity={1} onPress={handleGoToChatList}>
            <Text
              style={{
                color: '#BC2C3D',
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        }
        headerContainerColor={'white'}
        headerTitleColor={'#200E32'}
      >
        <SearchBar isRoundedBorder={false} />
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 16,
            }}
            onPress={handleGoToCreateGroupConversation}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <GroupIcon />
              <Text style={{ marginLeft: 12 }}>Create New Group</Text>
            </View>
            <RightArrow />
          </TouchableOpacity>

          <Text style={{ marginVertical: 8 }}>Suggestion</Text>

          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 4,
            }}
            onPress={handleGoToChatDetail}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={{
                  uri: 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
                }}
                style={styles.image}
              />
              <Text style={{ marginLeft: 12 }}>User 1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 4,
            }}
            onPress={handleGoToChatDetail}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={{
                  uri: 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
                }}
                style={styles.image}
              />
              <Text style={{ marginLeft: 12 }}>User 2</Text>
            </View>
          </TouchableOpacity>
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

export interface CreateNewConversationProps extends StackScreenProps<any> {
  //
}

CreateNewConversation.defaultProps = {
  //
};

CreateNewConversation.propTypes = {
  //
};

export default CreateNewConversation;
