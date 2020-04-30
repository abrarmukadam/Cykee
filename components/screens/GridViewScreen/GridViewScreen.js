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

    // this.props.navigation.setOptions({
    //   // headerTransparent: true,
    //   // headerStyle: {
    //   //   backgroundColor: '#0000',
    //   // },
    //   // headerTintColor: '#fff',
    //   // headerTitleStyle: {
    //   //   fontWeight: 'bold',
    //   // },
    //   headerRight: () => (
    //     <Button
    //       // onPress={() => Alert('This is a button!')}
    //       title="Info"
    //       color="black"
    //     />
    //   ),
    // });
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
  _handleLoadMore = () => {
    console.log('end reached');
  };

  render() {
    console.log(this.state.searchFilter);

    return (
      <GridViewComponent
        receivedArray={this.props.photoArray}
        onPressCard={this.onPressCard}
        gridSize={'Cykee'}
        onScrollDown={this.onScrollDown}
        _handleLoadMore={this._handleLoadMore}
        onPressMenu={() => this.props.navigation.navigate('CameraRollScreen')}
      />
    );
  }
}

export default GridViewScreen;
