import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

import {default as GridViewComponent} from '../../SubComponents/GridViewComponent/GridViewComponent.container';

class CameraRollScreen extends Component {
  state = {toBeDisplayed: [], toBeDisplayed2: [], page_info: {}};

  componentDidMount() {
    this.screenLoadListener = this.props.navigation.addListener(
      'tabPress',
      e => {
        console.log('CameraRoll Screen did-Mount');
        this.props.screen_mounted('CameraRollScreen');
      },
    );

    console.log('mounting camera roll screen');
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.screen_mounted('CameraRollScreen');

      console.log('focus');
      this.setState({returnedStatus: true});
      if (this.state.returnedStatus) {
        console.log('returned status true');
        CameraRoll.getPhotos({
          after: this.state.page_info ? this.state.page_info.end_cursor : 0,
          assetType: 'Photos',
          // after: 0,
          Album: 'Camera',
        })
          .then(r => {
            let temp = [];
            r.edges.map((p, i) => {
              p.node.image.source = p.node.image.uri;
              p.node.image.caption = '';
              return (temp = [...temp, p.node.image]);
            });
            this.setState({
              // page_info2: r.page_info,
              toBeDisplayed2: temp,
            });
          })
          .catch(err => {
            //Error Loading Images
          });
      }
      // this.reloadPhotos();
    });

    CameraRoll.getPhotos({
      first: 50,
      assetType: 'Photos',
      // after: 0,
      Album: 'Camera',
    })
      .then(r => {
        let temp = [];
        r.edges.map((p, i) => {
          p.node.image.source = p.node.image.uri;
          p.node.image.caption = '';
          return (temp = [...temp, p.node.image]);
        });
        this.setState({
          page_info: r.page_info,
          toBeDisplayed: temp,
          toBeDisplayed2: temp,
        });
      })
      .catch(err => {
        //Error Loading Images
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.returnedStatus == true) {
      if (this.state.toBeDisplayed2 != this.state.toBeDisplayed) {
        console.log('this.state.toBeDisplayed2 != this.state.toBeDisplayed');
        console.log(this.state.toBeDisplayed);
        console.log(this.state.toBeDisplayed2);
        // this.reloadPhotos();
      }
      this.setState({returnedStatus: false});
    }
  }

  componenDidUnmount() {
    console.log('un-mount');
    this.props.screen_mounted('');

    this.focusListener.remove();
    this.screenLoadListener.remove();
  }
  onPressCard = (index, photoArray) => {
    this.props.navigation.push('GalleryScreen', {
      index: index,
      toBeDisplayed: photoArray,
      navigatingFrom: 'CameraRollScreen',
    });
  };
  onScrollDown = () => {
    this.props.navigation.navigate('Home');
  };
  reloadPhotos = () => {
    this.props.screen_mounted('CameraRollScreen');

    console.log('photos reloaded');
    // this.setState({toBeDisplayed: 0, page_info: {}});

    CameraRoll.getPhotos({
      first: 50,
      assetType: 'Photos',
      // after: 0,
      // groupName: 'Camera',
    })
      .then(r => {
        let temp = [];
        r.edges.map((p, i) => {
          p.node.image.source = p.node.image.uri;
          p.node.image.caption = '';
          return (temp = [...temp, p.node.image]);
        });
        this.setState({
          page_info: r.page_info,
          toBeDisplayed: temp,
          toBeDisplayed2: temp,
        });
      })
      .catch(err => {
        //Error Loading Images
      });
  };
  _handleLoadMore = () => {
    console.log('loading more photos');
    CameraRoll.getPhotos({
      first: 50,
      assetType: 'Photos',
      after: this.state.page_info ? this.state.page_info.end_cursor : 0,
      Album: 'Camera',
    })
      .then(r => {
        let temp = [];
        r.edges.map((p, i) => {
          p.node.image.source = p.node.image.uri;
          p.node.image.caption = '';
          return (temp = [...temp, p.node.image]);
        });
        this.setState({
          page_info: r.page_info,
          toBeDisplayed: this.state.toBeDisplayed.concat(temp),
          toBeDisplayed2: this.state.toBeDisplayed.concat(temp),
        });
      })
      .catch(err => {
        //Error Loading Images
      });

    console.log('end reached-camera roll');
  };

  render() {
    console.log('Render-camera roll');
    return (
      <GridViewComponent
        receivedArray={this.state.toBeDisplayed}
        onPressCard={this.onPressCard}
        gridSize={'CameraRoll'}
        onScrollDown={this.onScrollDown}
        _handleLoadMore={this._handleLoadMore}
        EmptyScreenBackButton={() => this.props.navigation.navigate('Home')}
        reloadPhotos={() => this.reloadPhotos()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CameraRollScreen;
