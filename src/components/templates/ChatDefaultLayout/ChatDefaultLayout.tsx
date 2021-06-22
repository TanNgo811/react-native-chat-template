import React, { FC, PropsWithChildren, ReactElement } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ScreenHeader from '../../morecules/ScreenHeader/ScreenHeader';
import HeaderBackButton from '../../atoms/HeaderBackButton/HeaderBack';
import HeaderTitle from '../../atoms/HeaderTitle/HeaderTitle';
import HeaderIconPlaceholder from '../../atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';

const ChatDefaultLayout: FC<PropsWithChildren<ChatDefaultLayoutProps>> = (
  props: PropsWithChildren<ChatDefaultLayoutProps>
): ReactElement => {
  const {
    title,
    left,
    right,
    rightType,
    navigation,
    children,
    contentScrollable,
    headerContainerColor,
    headerTitleColor,
    backIconColor,
  } = props;

  const leftChilds = React.Children.toArray(left);

  const rightChilds = React.Children.toArray(right);

  if (leftChilds.length > 2 || rightChilds.length > 2) {
    throw new Error(
      'One header side can not contain more than 2 icon elements'
    );
  }

  const titleIsString: boolean = typeof title === 'string';

  return (
    <>
      <SafeAreaView style={[styles.container]}>
        <ScreenHeader headerColor={headerContainerColor}>
          {typeof left === 'string' && left === 'back-button' ? (
            <HeaderBackButton navigation={navigation} color={backIconColor} />
          ) : (
            leftChilds
          )}
          {titleIsString && leftChilds.length < 1 && <HeaderIconPlaceholder />}
          {titleIsString && leftChilds.length < 2 && <HeaderIconPlaceholder />}
          {titleIsString ? (
            <HeaderTitle titleColor={headerTitleColor}>{title}</HeaderTitle>
          ) : (
            title
          )}
          {titleIsString && rightChilds.length < 2 && <HeaderIconPlaceholder />}
          {titleIsString && rightChilds.length < 1 && <HeaderIconPlaceholder />}
          {rightChilds &&
            (rightType === 'icon' ? (
              <HeaderIconPlaceholder>{rightChilds}</HeaderIconPlaceholder>
            ) : (
              <>
                <View />
                <View style={{ position: 'absolute', right: 10 }}>
                  {rightChilds}
                </View>
              </>
            ))}
        </ScreenHeader>
        {contentScrollable ? (
          children
        ) : (
          <View style={[styles.childrenContainer]}>{children}</View>
        )}
      </SafeAreaView>
      <SafeAreaView style={styles.bottomBar} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#BC2C3D',
    flex: 1,
  },
  childrenContainer: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  bottomBar: {
    flex: 0,
    backgroundColor: 'white',
  },
});

export interface ChatDefaultLayoutProps extends StackScreenProps<any> {
  //
  headerTitleColor?: string;

  backIconColor?: string;

  headerContainerColor?: string;

  contentScrollable?: boolean;

  title: string | ReactElement;

  left?: ReactElement[] | ReactElement | 'back-button';

  right?: ReactElement[] | ReactElement;

  rightType: 'icon' | 'other';
}

ChatDefaultLayout.defaultProps = {
  contentScrollable: false,
};

ChatDefaultLayout.propTypes = {
  contentScrollable: PropTypes.bool,
};

export default ChatDefaultLayout;
