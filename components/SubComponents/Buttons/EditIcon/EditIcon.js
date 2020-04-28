import React, {Component} from 'react';
import {GlobalIconSize, GalleryIconColor} from '../index';
// import Icon from 'react-native-vector-icons/Feather';
import {Icon} from 'react-native-elements';
class EditIcon extends Component {
  state = {};
  render() {
    return (
      <Icon
        type={this.props.iconName == 'addToCykee' ? 'feather' : 'font-awesome'}
        name={this.props.iconName == 'addToCykee' ? 'download' : 'edit'}
        size={GlobalIconSize}
        color={GalleryIconColor}
      />
    );
  }
}

export default EditIcon;
