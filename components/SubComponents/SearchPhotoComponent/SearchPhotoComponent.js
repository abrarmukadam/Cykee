import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {GlobalIconSize} from '../Buttons/index';
import styles from './styles';
import {Icon, Input} from 'react-native-elements';

class SearchPhotoComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {};
  render() {
    console.log('search rendered');
    return (
      <View style={styles.searchContainer}>
        <Icon
          name="ios-search"
          type="ionicon"
          size={GlobalIconSize - 10}
          color={'grey'}
          containerStyle={{marginHorizontal: 4}}
        />
        <TextInput
          style={styles.searchStyle}
          placeholder={'Search Photo...by Caption or #Tag'}
          value={this.props.searchFilter}
          placeholderTextColor={'silver'}
          onChangeText={text => this.props.onChangeSearchFilter(text)}
        />

        {this.props.searchFilter != '' && (
          <TouchableOpacity
            style={{
              paddingVertical: 6,
              paddingHorizontal: 6,
            }}
            onPress={() => {
              console.log('cross pressed');
              this.props.onChangeSearchFilter('');
            }}>
            <Icon
              type="ionicon"
              name="ios-close"
              size={GlobalIconSize}
              color={'grey'}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default SearchPhotoComponent;
