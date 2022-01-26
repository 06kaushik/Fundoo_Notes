import { Dimensions } from "react-native";


const {width,height} = Dimensions.get('window');

console.log('height: ', height);
console.log('width: ', width);

export const getNewDimensions = (currentSize) => {
    let newSize = currentSize *height/820;
    console.log('New Size: ', newSize);
    return newSize;
};