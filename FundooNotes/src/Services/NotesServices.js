import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

//add title , notes ,clour,email,trash to firebase
export const noteData = async (
  title,
  description,
  color,
  trash,
  pin,
  archive,
  addLabelDataArr,
  date,
  time,
  dateTimeChipBoolean,
  randomId,
) => {
  let response;
  var value = await AsyncStorage.getItem('Email');

  let userNoteData = {
    Emial: value,
    Title: title,
    Description: description,
    Colour: color,
    Trash: trash,
    Pin: pin,
    Archive: archive,
    LabelArr: addLabelDataArr,
    Date: date,
    Time: time,
    DateTimeChipBoolean: dateTimeChipBoolean,
    RandomId: randomId,
  };

  await firestore()
    .collection('notes')
    .add(userNoteData)
    .then(data => {
      return (response = 'success');
    })
    .catch(error => {
      return error;
    });
  return response;
};

//getNotes after user authentication
export const getNotes = async () => {
  try {
    var emialdatavalue = await AsyncStorage.getItem('Email');
  } catch (err) {
  }
  var noteList = [];
  await firestore()
    .collection('notes')
    .where('Emial', '==', emialdatavalue)
    .get()
    .then(value => {
      value.forEach(noteData => {
        noteList.push(noteData);
      });
    })
    .catch(error => {
      return error;
    });
  return noteList;
};

//update note data
export const editNoteDataUpdate = (
  key,
  title,
  description,
  color,
  trash,
  pin,
  archive,
  labelArrayfromLabelArr,
) => {
  let userNoteDataUpdate = {
    Title: title,
    Description: description,
    Colour: color,
    Trash: trash,
    Pin: pin,
    Archive: archive,
    LabelArr: labelArrayfromLabelArr,
  };

  firestore().collection('notes').doc(key).update(userNoteDataUpdate);
};

export const deleteBooleanChipUpdate = (key, chipBoolean) => {
  let editChipBoolean = {
    DateTimeChipBoolean: chipBoolean,
  };
  firestore().collection('notes').doc(key).update(editChipBoolean);
};

export const editNoteDataUpdateTimeDate = (
  key,
  date,
  time,
  timeDateBoolean,
) => {
  let timeDateUpdate = {
    Date: date,
    Time: time,
    DateTimeChipBoolean: timeDateBoolean,
  };
  firestore().collection('notes').doc(key).update(timeDateUpdate);
};

//add label,checkBox data into firestore with email
export const addLabel = async (labelText, isSelected) => {
  var asyncEmail = await AsyncStorage.getItem('Email');
  let labelData = {
    Email: asyncEmail,
    Label: labelText,
    CheckBox: isSelected,
  };
  await firestore()
    .collection('Label')
    .add(labelData)
    .then(
      getLabel(),
    )
    .catch(error => {
      return error;
    });
};

//get user data from firestore by email
export const getLabel = async () => {
  var getasyncEmail = await AsyncStorage.getItem('Email');
  var LabelList = [];
  await firestore()
    .collection('Label')
    .where('Email', '==', getasyncEmail)
    .get()
    .then(value => {
      value.forEach(labelData => {
        LabelList.push(labelData);
      });
    })
    .catch(error => {
      return error;
    });
  return LabelList;
};

export const fetchLabelsData = async () => {
  const arr = [];
  var getasyncEmail = await AsyncStorage.getItem('Email');
  return firestore()
    .collection('Label')
    .where('Email', '==', getasyncEmail)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const docData = documentSnapshot.data();
        docData.labelId = documentSnapshot.id;
        arr.push(docData);
      });
      return arr;
    });
};

export const updateCheck = async (key, checkValue) => {
  let label = {
    CheckBox: checkValue,
  };
  await firestore().collection('Label').doc(key).update(label);
};

export const createImagecolleciton = async () => {
  var asyncemail = await AsyncStorage.getItem('Email');
  await firestore()
    .collection('profile')
    .add({
      Email: asyncemail,
      Image: 'https://www.w3schools.com/howto/img_avatar.png' || '',
    })
    .then(() => {
    })
    .catch
    ();
};

export const handleProfileUpdate = (url, profileId) => {
  var asyncemail = AsyncStorage.getItem('Email');
  let ImageData = {Image: url};
  firestore()
    .collection('profile')
    .doc(profileId)
    .update(ImageData)
    .then(() => {
      Alert.alert('Your profile has been updated successfully.');
    })
    .catch(error => console.log(error));
};

export const getNotesDataWithId = async () => {
  try {
    var emialdatavalue = await AsyncStorage.getItem('Email');
  } catch (err) {
    console.log(err);
  }
  var noteList = [];
  await firestore()
    .collection('notes')
    .where('Emial', '==', emialdatavalue)
    .get()
    .then(value => {
      value.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        noteList.push(data);
      });
    })
    .catch(error => {
      return error;
    });
  return noteList;
};

export const setAllCheckBoxValueFalse = () => {
  const ORDER_ITEMS = firestore().collection('Label');
  ORDER_ITEMS.where('CheckBox', '==', true)
    .get()
    .then(snapshots => {
      if (snapshots.size > 0) {
        snapshots.forEach(orderItem => {
          ORDER_ITEMS.doc(orderItem.id).update({CheckBox: false});
        });
      }
    });
};

export const EditLabelForEditeLabelScreen1 = labelArrData2 => {
  labelArrData2.map(labeldata => {
    const ORDER_ITEMS = firestore().collection('Label');
    ORDER_ITEMS.where('Label', '==', labeldata)
      .get()
      .then(snapshots => {
        if (snapshots.size > 0) {
          snapshots.forEach(orderItem => {
            ORDER_ITEMS.doc(orderItem.id).update({CheckBox: true});
          });
        }
      });
  });
};

export const generateRandomIdData = () => {
  let RandomNoteId = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  firestore()
    .collection('notes')
    .where('RandomId', '==', RandomNoteId)
    .get()
    .then(data =>
      data.forEach(data => {
        this.generateRandomId();
      }),
    )
    .catch(error => console.log('cuserror', error));
  return RandomNoteId;
};

export const updateNotificationId = (key, notificationPushId) => {
  let notificationId = {
    RandomId: notificationPushId,
  };
  firestore().collection('notes').doc(key).update(notificationId);
};

export const handleDeleteService = id => {
  firestore()
    .collection('Label')
    .doc(id)
    .delete()
    .then(() => {
    });
};

export const deleteLabel = async labelId => {
  firestore()
    .collection('Label')
    .doc(labelId)
    .delete()
    .then(() => {
    });
};

export const updateLabel = async (labelData, labelId) => {
  firestore()
  .collection('Label')
      .doc(labelId)
      .update(labelData)
      .then(() => {
      })
};