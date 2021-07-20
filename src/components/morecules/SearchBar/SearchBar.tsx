import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import SearchIcon from '../../Icons/SearchIcon';

const SearchBar: FC<PropsWithChildren<SearchBarProps>> = (
  props: PropsWithChildren<SearchBarProps>
): ReactElement => {
  const { label, icon, isRoundedBorder, ...restProps } = props;

  return (
    <View style={[isRoundedBorder && { borderRadius: 25 }, styles.container]}>
      <View style={styles.iconPlaceholder}>{icon ? icon : <SearchIcon />}</View>

      <TextInput
        {...restProps}
        style={[styles.titlePlaceholder]}
        placeholder={label ? label : 'Search for stores, people,and groups'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //
  container: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#F5F5FA',
    paddingHorizontal: 14,
  },
  iconPlaceholder: {
    padding: 5,
  },
  titlePlaceholder: {
    width: '90%',
    fontSize: 14,
  },
});

export interface SearchBarProps extends TextInputProps {
  //
  label?: string;

  icon?: ReactElement[] | ReactElement;

  isRoundedBorder: boolean;
}

SearchBar.defaultProps = {
  //
};

SearchBar.propTypes = {
  //
};

export default React.memo(SearchBar);
