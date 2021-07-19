import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { ChatDefaultLayout } from 'react-native-chat-bar';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { Subscription } from 'rxjs';
import { accountRepository } from '../../repository/account-repository';
import { globalStateRepository } from '../../repository/global-state-repository';

const LoginScreen: FC<PropsWithChildren<LoginScreenProps>> = (
  props: PropsWithChildren<LoginScreenProps>
): ReactElement => {
  const { navigation, route } = props;

  const handleGoToChatList = React.useCallback(() => {
    navigation.navigate('ChatList');
  }, [navigation]);

  const handleLogin = React.useCallback(() => {
    const subscription: Subscription = accountRepository
      .login({ username: 'ln', password: '123' })
      .subscribe(
        (user) => {
          globalStateRepository.saveCredentials(user);
        },
        (e) => {
          console.log(e);
        },
        () => {
          handleGoToChatList();
        }
      );

    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [handleGoToChatList]);

  return (
    <>
      <ChatDefaultLayout
        title={'Login'}
        navigation={navigation}
        route={route}
        left={'back-button'}
        rightType={'icon'}
        right={<View />}
      >
        <SafeAreaView style={styles.container}>
          <Button onPress={handleLogin} title={'Go Inside'} />
        </SafeAreaView>
      </ChatDefaultLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export interface LoginScreenProps extends StackScreenProps<any> {
  //
}

LoginScreen.defaultProps = {
  //
};

LoginScreen.propTypes = {
  //
};

export default LoginScreen;
