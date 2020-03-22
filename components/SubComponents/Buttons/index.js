import TakePicture from './TakePicture/TakePicture';
import FlashMode from './FlashMode/FlashMode';
import CameraType from './CameraType/CameraType';
import GalleryIcon from './GalleryIcon/GalleryIcon';
import TextMode from './TextMode/TextMode';

export {TakePicture, FlashMode, CameraType, GalleryIcon, TextMode};

//Global constants
const GlobalIconColor = 'white';
const GlobalIconSize = 40;
const GlobalLargeIconSize = 80;

//Flash icons
const flashIconName = [
  //   //"FlashMode": {"off": 0, "on": 1, "torch": 2,"auto": 3, }
  'flash-off',
  'flash',
  'flashlight',
  'flash-auto',
];

export {GlobalIconColor, GlobalIconSize, GlobalLargeIconSize, flashIconName};
