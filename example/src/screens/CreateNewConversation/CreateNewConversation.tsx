import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { ChatDefaultLayout, SearchBar } from 'react-native-chat-bar';

const CreateNewConversation: FC<PropsWithChildren<CreateNewConversationProps>> =
  (props: PropsWithChildren<CreateNewConversationProps>): ReactElement => {
    const { navigation, route } = props;

    const handleGoBack = React.useCallback(() => {
      navigation.goBack();
    }, [navigation]);

    return (
      <ChatDefaultLayout
        route={route}
        navigation={navigation}
        title={'New Conversation'}
        left={<View />}
        rightType={'other'}
        right={
          <TouchableOpacity activeOpacity={1} onPress={handleGoBack}>
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
          <View>
            <View>
              <Image
                source={{
                  uri: 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
                }}
                style={styles.image}
              />
              <Text>abc </Text>
            </View>
          </View>
          <Text>Suggestion</Text>
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
