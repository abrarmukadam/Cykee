import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

class SearchedTagsComponent extends Component {
  state = {
    searchFilter: this.props.searchFilter,
  };

  filterByProperty = (array, value) => {
    var filtered = [];
    var filtered2 = [];
    let temp = [];
    let check = '';
    if (value.length > 1) check = value.substr(1);
    // if (value.length > 1) check = 'a';
    for (let i = 0; i < array.length; i++) {
      if (array[i].tagsArray)
        temp = array[i].tagsArray.filter(item => {
          return item.toLowerCase().indexOf(check.toLowerCase()) !== -1;
        });
      filtered.push(temp.toString());
    }
    filtered2 = filtered.toString();
    let uniq = [...new Set(filtered)]; // remove copies

    return uniq;
  };
  componentDidUpdate(prevProps, prevState) {
    let filteredList = [];
    if (prevProps.searchFilter != this.props.searchFilter)
      this.setState({
        searchFilter: this.props.searchFilter,
      });

    if (prevState.searchFilter != this.state.searchFilter) {
      filteredList = this.filterByProperty(
        this.props.filteredList,
        this.state.searchFilter,
      );
      this.setState({filteredList});
    }
  }
  render() {
    return (
      <ScrollView
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {this.state.filteredList &&
          this.state.filteredList.map(item => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.tagStyle}
                onPress={() => {
                  this.setState({searchFilter: item});
                  this.props.changeSearchFilter(item);
                  console.log(item);
                }}>
                <Text style={styles.fontStyle}>{item}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // horizontal: true,
    flexDirection: 'row',
  },
  fontStyle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  tagStyle: {
    backgroundColor: 'silver',
    borderRadius: 16,
    marginHorizontal: 2,
    paddingHorizontal: 6,
  },
});

export default SearchedTagsComponent;
