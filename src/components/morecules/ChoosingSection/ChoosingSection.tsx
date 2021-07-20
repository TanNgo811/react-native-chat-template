/**
 * File: ChoosingSection.tsx
 * @created 2021-07-10 23:21:43
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ChoosingSectionProps>>}
 */

import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import nameof from 'ts-nameof.macro';
import ChoosingOption from '../ChoosingOption/ChoosingOption';

export interface ChoosingSectionItem {
  subtitle: string;

  onPress: () => void;

  icon: ReactElement;

  isPrimaryTitle?: boolean;
}

const ChoosingSection: FC<PropsWithChildren<ChoosingSectionProps>> = (
  props: PropsWithChildren<ChoosingSectionProps>
): ReactElement => {
  const { item, title } = props;

  return (
    <View style={styles.section}>
      <Text style={[styles.titleItem]}>{title}</Text>
      {item.map((choice, index) => (
        <ChoosingOption
          key={index}
          icon={choice.icon}
          onPress={choice.onPress}
          title={choice.subtitle}
          isPrimaryTitle={choice.isPrimaryTitle}
        />
      ))}
    </View>
  );
};

export interface ChoosingSectionProps {
  //
  item: ChoosingSectionItem[];

  title: string;
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  titleItem: {
    textTransform: 'uppercase',
    fontSize: 10,
    color: '#848484',
  },
});

ChoosingSection.defaultProps = {
  //
};

ChoosingSection.propTypes = {
  //
};

ChoosingSection.displayName = nameof(ChoosingSection);

export default React.memo(ChoosingSection);
