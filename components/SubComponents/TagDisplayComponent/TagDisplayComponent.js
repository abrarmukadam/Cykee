import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class TagDisplayComponent extends Component {
  state = {};

  componentDidMount() {
    console.log('tagsArray', this.props.tagsArray);
  }
  render() {
    if (this.props.tagsArray)
      return (
        <View style={styles.container}>
          {this.props.tagsArray.map(item => {
            return (
              <View>
                <View style={styles.tagStyle}>
                  <Text style={[styles.fontStyle, {color: '#0000'}]}>
                    {item}
                  </Text>
                </View>
                <View
                  style={[
                    styles.tagStyle,
                    {
                      position: 'absolute',
                      opacity: 1,
                      backgroundColor: '#0000',
                    },
                  ]}>
                  <Text style={styles.fontStyle}>{item}</Text>
                </View>
              </View>
            );
          })}
        </View>
      );
    else return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: -4,
  },
  tagStyle: {
    backgroundColor: 'black',
    opacity: 0.4,
    borderRadius: 5,
    paddingHorizontal: 4,
    marginTop: 2,
    marginLeft: 1,
  },
  fontStyle: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
  },
});

export default TagDisplayComponent;
