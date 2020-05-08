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
    this.props.screen_mounted('GridViewScreen');

    this.screenLoadListener = this.props.navigation.addListener(
      'tabPress',
      e => {
        this.props.screen_mounted('GridViewScreen');
      },
    );

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
      this.props.screen_mounted('GridViewScreen');

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
  componenDidUnmount() {
    console.log('un-mount');
    this.props.screen_mounted('');

    this.screenLoadListener.remove();
    // this.blurListener.remove();
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
        EmptyScreenBackButton={() => this.props.navigation.goBack()}
      />
    );
  }
}

export default GridViewScreen;
