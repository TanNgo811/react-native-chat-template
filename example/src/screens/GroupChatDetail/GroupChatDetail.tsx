import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { ChatBar, ChatDefaultLayout } from 'react-native-chat-bar';
import InformationIcon from '../../asserts/InformationIcon';

const GroupChatDetail: FC<PropsWithChildren<GroupChatDetailProps>> = (
  props: PropsWithChildren<GroupChatDetailProps>
): ReactElement => {
  const { navigation, route } = props;

  const handleGoToGroupChatSetting = React.useCallback(() => {
    navigation.navigate('GroupChatSetting');
  }, [navigation]);

  return (
    <ChatDefaultLayout
      route={route}
      navigation={navigation}
      title={'Group Chat'}
      left={'back-button'}
      rightType={'icon'}
      right={
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleGoToGroupChatSetting}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <InformationIcon />
        </TouchableOpacity>
      }
    >
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Image
              source={{
                uri: 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
              }}
              style={[
                styles.image,
                {
                  position: 'absolute',
                  top: 30,
                  right: -50,
                },
              ]}
            />
            <Image
              source={{
                uri: 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
              }}
              style={[
                styles.image,
                {
                  position: 'absolute',
                  top: 0,
                  right: -10,
                },
              ]}
            />
          </View>

          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Text style={styles.title}>Best Sellers Ever</Text>
            <Text style={styles.subtitle}>User 1, User 2</Text>
          </View>
        </View>
      </View>
      <ChatBar
        setPickedImages={() => {}}
        placeholder={'Lets talk!'}
        onSendImages={() => {}}
      />
    </ChatDefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  image: {
    height: 64,
    width: 64,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    lineHeight: 27,
    color: '#848484',
  },

  subtitle: {
    fontSize: 12,
    color: '#848484',
  },
});

export interface GroupChatDetailProps extends StackScreenProps<any> {
  //
}

GroupChatDetail.defaultProps = {
  //
};

GroupChatDetail.propTypes = {
  //
};

export default GroupChatDetail;
