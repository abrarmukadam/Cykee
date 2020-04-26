import React, {PureComponent} from 'react';
import {default as GridViewComponent} from '../../SubComponents/GridViewComponent/GridViewComponent.container';

class GridViewScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      searchFilter: '',
      filteredList: [],
    };
  }
  componentDidMount() {
    this.setState({
      filteredList: this.props.photoArray,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('GridView did update called');

    let filteredList = [];
    if (
      prevState.searchFilter != this.state.searchFilter ||
      prevProps.photoArray != this.props.photoArray
    ) {
      filteredList = this.props.photoArray.filter(List => {
        return (
          List.caption
            .toLowerCase()
            .indexOf(this.state.searchFilter.toLowerCase()) !== -1
        );
      });
      this.setState({
        filteredList: filteredList,
      });
    }
  }

  onPressCard = (index, photoArray) => {
    this.props.navigation.push('GalleryScreen', {
      index: index,
      toBeDisplayed: photoArray,
    });
  };

  onScrollDown = () => {
    this.props.navigation.navigate('Home');
  };
  render() {
    console.log(this.state.searchFilter);

    return (
      <GridViewComponent
        receivedArray={this.props.photoArray}
        onPressCard={this.onPressCard}
        gridSize={'Cykee'}
        onScrollDown={this.onScrollDown}
      />
    );
  }
}

export default GridViewScreen;
