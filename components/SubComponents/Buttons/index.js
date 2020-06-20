import CameraRoll from '@react-native-community/cameraroll';
var RNFS = require('react-native-fs');
import moment from 'moment';

//Camera Screen Icons
import TakePicture from './TakePicture/TakePicture';
import TakeVideoButton from './TakeVideoButton/TakeVideoButton';
import FlashMode from './FlashMode/FlashMode';
import CameraType from './CameraType/CameraType';
import GalleryIcon from './GalleryIcon/GalleryIcon';
import TextMode from './TextMode/TextMode';
import FaceDetection from './FaceDetection/FaceDetection';
import AspectRatio from './AspectRatio/AspectRatio';
import NavigationCameraButton from './NavigationCameraButton/NavigationCameraButton';
export {
  TakePicture,
  TakeVideoButton,
  FlashMode,
  CameraType,
  GalleryIcon,
  TextMode,
  AspectRatio,
  NavigationCameraButton,
  FaceDetection,
};

//Gallery Screen Icons
import ShareIcon from './ShareIcon/ShareIcon';
import FavouriteIcon from './FavouriteIcon/FavouriteIcon';
import DeleteIcon from './DeleteIcon/DeleteIcon';
import EditIcon from './EditIcon/EditIcon';
import MoreIcon from './MoreIcon/MoreIcon';
import BackButton from './BackButton/BackButton';
import SelectionIcon from './SelectionIcon/SelectionIcon';
import CheckCircle from './CheckCircle/CheckCircle';
import FontButton from './FontButton/FontButton';
import EditScreenButton from './EditScreenButton/EditScreenButton';
import TimerButton from './TimerButton/TimerButton';
import TagIcon from './TagIcon/TagIcon';
import TagSettingButton from './TagSettingButton/TagSettingButton';
import PlayOverlay from './PlayOverlay/PlayOverlay';
import BlankCaptionModeButton from './BlankCaptionModeButton/BlankCaptionModeButton';
//Gallery(Grid) view component
import GridViewComponent from '../GridViewComponent/GridViewComponent';
import EditIconsComponent from '../EditIconsComponent/EditIconsComponent';
import FontIconsComponent from '../FontIconsComponent/FontIconsComponent';
import TagComponent from '../TagComponent/TagComponent';
import TagDisplayComponent from '../TagDisplayComponent/TagDisplayComponent';
import SearchedTagsComponent from '../SearchedTagsComponent/SearchedTagsComponent';
import SearchPhotoComponent from '../SearchPhotoComponent/SearchPhotoComponent';
import CameraSettingComponent from '../CameraSettingComponent/CameraSettingComponent.container';
import ZoomViewComponent from '../ZoomViewComponent/ZoomViewComponent';
import EmptyGalleryMessage from '../EmptyGalleryMessage/EmptyGalleryMessage';

export {
  GridViewComponent,
  EditIconsComponent,
  FontIconsComponent,
  TagComponent,
  TagDisplayComponent,
  SearchedTagsComponent,
  SearchPhotoComponent,
  CameraSettingComponent,
  ZoomViewComponent,
  EmptyGalleryMessage,
  BlankCaptionModeButton,
};

export {
  ShareIcon,
  FavouriteIcon,
  DeleteIcon,
  EditIcon,
  MoreIcon,
  BackButton,
  SelectionIcon,
  CheckCircle,
  FontButton,
  EditScreenButton,
  TimerButton,
  TagIcon,
  TagSettingButton,
  PlayOverlay,
};

//Global constants
const GlobalIconSize = 30;
const GlobalMediumIconSize = 40;
const GlobalLargeIconSize = 80;
export {GlobalMediumIconSize, GlobalIconSize, GlobalLargeIconSize};
//Colors
// const GalleryIconColor = '#444444';

const GlobalIconColor = 'white';
const GalleryIconColor = 'gray';

const CykeeColor = '#c0ff02';

// const TAB_BAR_COLOR = '#F9F9ED'; //Ivory
const TAB_BAR_COLOR = 'white'; //Ivory
// const BACKGROUND_COLOR = '#FEFEF4'; //Ivory lighter version
// const BACKGROUND_COLOR = '#FEFEF4'; //Ivory lighter version
const BACKGROUND_COLOR = '#FeFeFa'; //Ivory lighter version
const SIDE_ICON_COLOR = '#606060ff';
// const SIDE_ICON_COLOR = '#606060ff';
const EDIT_ICON_COLOR = '#D6ED17FF';
const SEARCH_BAR_COLOR = '#FeFeFa';

const FONT_ICON_COLOR = 'silver';
const FONT_ICON_OPACITY = 0.7;

const TEXT_BUTTON_COLOR = '#AC92A6'; //LILAC LUSTER
const HEADER_TITLE_COLOR = 'black';
export {
  GalleryIconColor,
  GlobalIconColor,
  CykeeColor,
  TAB_BAR_COLOR,
  EDIT_ICON_COLOR,
  FONT_ICON_COLOR,
  FONT_ICON_OPACITY,
  SIDE_ICON_COLOR,
  TEXT_BUTTON_COLOR,
  BACKGROUND_COLOR,
  SEARCH_BAR_COLOR,
  HEADER_TITLE_COLOR,
};

export const CAPTION_SIZE = [18, 25, 35];
export const GRID_CAPTION_SIZE = [10, 12, 14];
export const CAPTION_FONT = [
  'normal',
  'times-roman',
  'caveat-regular',
  'amatic-regular',
];

//Flash icons
export const flashIconName = [
  //   //"FlashMode": {"off": 0, "on": 1, "torch": 2,"auto": 3, }
  'flash-off',
  'flash',
  'flashlight',
  'flash-auto',
];

export const backgroundColorArray = [
  '#e1bee7',
  'steelblue',
  'teal',
  'skyblue',
  'lightgreen',
  'lightslategrey',
  'mediumpurple',
  'rgb(195, 125, 198)',
  'mediumturquoise',
];

export function saveFileFunction({
  data,
  fileType,
  caption,
  captionStyle,
  fav_status,
  tagsArray,
  saveType,
  callingScreen,
  addNewPhoto,
  afterSaveFunction,
}) {
  let newPhoto = {};
  const temp = data.uri.split('/');
  const d = new Date();
  const extension = fileType == 'video' ? '.mp4' : '.jpeg';
  const month_temp = d.getMonth() + 1;
  let month = '';
  if (month_temp < 10) month = '0' + month_temp;
  else month = month_temp;

  let name_tag = '';
  if (tagsArray.length > 0)
    for (let i = 0; i < tagsArray.length; i++)
      name_tag = name_tag + '_' + tagsArray[i].substr(1);
  const newName = `${d.getFullYear()}${month}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}${name_tag}${extension}`;

  let nameToChange = temp[temp.length - 1];
  let renamedURI = data.uri.replace(nameToChange, newName);

  newPhoto.creationDate = [
    moment().format('MMM DD, YYYY'),
    moment().format('hh:mm:ss a'),
  ];

  let currentAlbumName = temp[temp.length - 2];
  // let galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';
  let tempGalleryUri = 'file:///storage/emulated/0/Pictures/' + newName;
  let destinationUri = '';
  newPhoto.height = data.height;
  newPhoto.width = data.width;
  newPhoto.fileName = newName;
  newPhoto.caption = caption;
  newPhoto.fav_status = fav_status;
  newPhoto.tagsArray = tagsArray;
  newPhoto.captionStyle = captionStyle;
  newPhoto.type = fileType;
  // newPhoto.uri = galleryUri + newPhoto.fileName;

  if (currentAlbumName == 'Cykee') {
    console.log('Photo already in Cykee Gallery');
    destinationUri = tempGalleryUri;
  } else {
    console.log('Photo in other gallery');
    destinationUri = renamedURI;
  }
  RNFS.copyFile(data.uri, destinationUri).then(() => {
    CameraRoll.save(destinationUri, {
      type: fileType,
      album: 'Cykee',
    }).then(uri => {
      CameraRoll.getPhotos({
        first: 1,
        // assetType: 'Photos',
        Album: 'Cykee',
      }).then(r => {
        newPhoto.uri = r.edges[0].node.image.uri;

        if (saveType == 'edit') afterSaveFunction();
        else addNewPhoto(newPhoto);
      });
      if (currentAlbumName == 'Cykee') RNFS.unlink(tempGalleryUri);
      if (callingScreen == 'PreviewScreen') afterSaveFunction();
    });
  });
}
