import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { ChatDefaultLayout, SearchBar } from 'react-native-chat-bar';
import LeftArrow from '../../asserts/LeftArrow';
import CheckedRound from '../../asserts/CheckedRound';
import NonCheckedRound from '../../asserts/NonCheckedRound';

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

  const [isChecked, setCheck] = React.useState(false);

  const handleToggleCheck = React.useCallback(() => {
    setCheck(!isChecked);
  }, [isChecked, setCheck]);

  const [isChecked2, setChecked2] = React.useState(false);

  const handleToggleCheck2 = React.useCallback(() => {
    setChecked2(!isChecked2);
  }, [isChecked2, setChecked2]);

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

        <TouchableOpacity
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 4,
          }}
          onPress={handleToggleCheck}
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
          {isChecked ? <CheckedRound /> : <NonCheckedRound />}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 4,
          }}
          onPress={handleToggleCheck2}
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
          {isChecked2 ? <CheckedRound /> : <NonCheckedRound />}
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
