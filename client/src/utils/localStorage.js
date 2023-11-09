export const getSavedPhotoIds = () => {
    const savedPhotoIds = localStorage.getItem('saved_photo')
        ? JSON.parse(localStorage.getItem('saved_photo'))
        : [];

    return savedPhotoIds;
};

export const savePhotoIds = (photoIdArr) => {
    if (photoIdArr.length) {
        localStorage.setItem('saved_photo', JSON.stringify(photoIdArr));
    } else {
        localStorage.removeItem('saved_photo');
    }
};

export const removePhotoId = (photoId) => {
    const savedPhotoIds = localStorage.getItem('saved_photo')
        ? JSON.parse(localStorage.getItem('saved_photo'))
        : null;

    if (!savedPhotoIds) {
        return false;
    }

    const updatedSavedPhotoIds = savedPhotoIds?.filter((savedPhotoId) => savedPhotoId !== photoId);
    localStorage.setItem('saved_photo', JSON.stringify(updatedSavedPhotoIds));

    return true;
};