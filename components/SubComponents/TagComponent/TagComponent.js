import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import TagInput from 'react-native-tags-input';

class TagComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: this.props.tagsArray,
      },
    };
  }

  updateTagState = state => {
    console.log(state.tagsArray);
    console.log(state.tag);
    let temp = {...state};
    if (state.tagsArray.length >= 5)
      ToastAndroid.show('Can add only 4 tags ! !', ToastAndroid.SHORT);
    else {
      if (temp.tag && temp.tag[0] != '#') temp.tag = '#' + temp.tag;
      this.setState({
        tags: temp,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tags != this.state.tags) {
      console.log('this.state.tags.tagsArray->', [
        ...this.state.tags.tagsArray,
        this.state.tags.tag,
      ]);
      this.props.tagsArrayChanged([
        ...this.state.tags.tagsArray,
        this.state.tags.tag,
      ]);
      // this.props.tagsArrayChanged(this.state.tags.tagsArray);
    }
  }
  render() {
    return (
      <View>
        <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder={'Add tag...'}
          label="Press space to add more tags"
          // label="Press comma & space to add more tags"
          labelStyle={{color: '#fff', opacity: 0.5}}
          placeholderTextColor="grey"
          // tagTextStyle={[styles.textInputStyle]}
          inputStyle={styles.textInputStyle}
          padding={10}
          autoCapitalize="none"
          autoFocus
          tagStyle={styles.tag}
          tagTextStyle={styles.tagTextStyle}
          tagsViewStyle={styles.tagsViewStyle}
          keysForTag={' '}
          // autoCorrect={false}
        />
      </View>
    );
  }
}

export default TagComponent;
