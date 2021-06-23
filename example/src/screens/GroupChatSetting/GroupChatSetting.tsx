import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { ChatDefaultLayout, ChoosingOption } from 'react-native-chat-bar';
import AddUserIcon from '../../asserts/AddUserIcon';
import GroupOutlinedIcon from '../../asserts/GroupOutlinedIcon';
import OutGroupIcon from '../../asserts/OutGroupIcon';
import BlockIcon from '../../asserts/BlockIcon';
import FileIcon from '../../asserts/FileIcon';
import PictureIcon from '../../asserts/PictureIcon';

const GroupChatSetting: FC<PropsWithChildren<GroupChatSettingProps>> = (
  props: PropsWithChildren<GroupChatSettingProps>
): ReactElement => {
  const { navigation, route } = props;

  const renderContent = () => (
    <SafeAreaView style={styles.bottomBoxContainer}>
      <View style={styles.backgroundChoice}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.textChoice,
              {
                color: '#5C61F4',
              },
            ]}
          >
            Change Group Image Profile
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.textChoice,
              {
                color: '#5C61F4',
              },
            ]}
          >
            Change Group Name
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.backgroundChoice,
          styles.textContainer,
          {
            marginTop: 8,
          },
        ]}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <Text
            style={[
              styles.textChoice,
              {
                color: '#BC2C3D',
              },
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <>
      <ChatDefaultLayout
        route={route}
        navigation={navigation}
        title={<View />}
        left={'back-button'}
        rightType={'other'}
        right={
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Text
              style={{
                color: '#fff',
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        }
      >
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              alignItems: 'center',
            }}
            onPress={() => {}}
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
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <AddUserIcon style={{ marginTop: 16 }} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleItem}>Group Information</Text>
            <ChoosingOption
              icon={<GroupOutlinedIcon />}
              onPress={() => {}}
              title={'Group Members'}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.titleItem}>Other</Text>
            <ChoosingOption
              icon={<PictureIcon />}
              onPress={() => {}}
              title={'Media Files'}
            />

            <ChoosingOption
              icon={<FileIcon />}
              onPress={() => {}}
              title={'Shared Files'}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.titleItem}>Privacy</Text>
            <ChoosingOption
              icon={<BlockIcon />}
              onPress={() => {}}
              title={'Block Users'}
            />

            <ChoosingOption
              icon={<OutGroupIcon />}
              onPress={() => {}}
              title={'Out Group'}
            />
          </View>
        </View>
      </ChatDefaultLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  image: {
    height: 64,
    width: 64,
  },

  section: {
    marginTop: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    lineHeight: 27,
    color: '#848484',
  },

  titleItem: {
    fontSize: 10,
    textTransform: 'uppercase',
    lineHeight: 18,
    letterSpacing: 0.5,
    color: '#848484',
  },

  bottomBoxContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  backgroundChoice: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    borderRadius: 15,
  },

  textChoice: {
    fontSize: 16,
  },

  textContainer: {
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
});

export interface GroupChatSettingProps extends StackScreenProps<any> {
  //
}

GroupChatSetting.defaultProps = {
  //
};

GroupChatSetting.propTypes = {
  //
};

export default GroupChatSetting;
