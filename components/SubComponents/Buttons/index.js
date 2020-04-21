//Camera Screen Icons
import TakePicture from './TakePicture/TakePicture';
import FlashMode from './FlashMode/FlashMode';
import CameraType from './CameraType/CameraType';
import GalleryIcon from './GalleryIcon/GalleryIcon';
import TextMode from './TextMode/TextMode';
import AspectRatio from './AspectRatio/AspectRatio';

export {TakePicture, FlashMode, CameraType, GalleryIcon, TextMode, AspectRatio};

//Gallery Screen Icons
import ShareIcon from './ShareIcon/ShareIcon';
import FavouriteIcon from './FavouriteIcon/FavouriteIcon';
import DeleteIcon from './DeleteIcon/DeleteIcon';
import EditIcon from './EditIcon/EditIcon';
import MoreIcon from './MoreIcon/MoreIcon';
import BackButton from './BackButton/BackButton';

//Gallery(Grid) view component
import GridViewComponent from '../GridViewComponent/GridViewComponent';

export {GridViewComponent};

export {ShareIcon, FavouriteIcon, DeleteIcon, EditIcon, MoreIcon, BackButton};
//Global constants
const GlobalIconColor = 'white';
const GlobalIconSize = 30;
const GlobalMediumIconSize = 40;
const GlobalLargeIconSize = 80;
const GalleryIconColor = '#444444';

//Flash icons
const flashIconName = [
  //   //"FlashMode": {"off": 0, "on": 1, "torch": 2,"auto": 3, }
  'flash-off',
  'flash',
  'flashlight',
  'flash-auto',
];

export {
  GlobalIconColor,
  GlobalMediumIconSize,
  GlobalIconSize,
  GlobalLargeIconSize,
  flashIconName,
  GalleryIconColor,
};
