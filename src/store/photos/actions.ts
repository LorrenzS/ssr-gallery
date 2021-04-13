import { ThunkAction } from 'redux-thunk';
import { GalleryAction, GalleryError, Photo, PhotosResponse } from '../../core/models';
import { CLEAR_EXPANDED_IMAGE, GET_RANDOM_IMAGE_FAILURE, GET_RANDOM_IMAGE_SUCCESS, PHOTOS_FAILURE, PHOTOS_LOADING, PHOTOS_SUCCESS, SET_EXPANDED_IMAGE } from './types';
import { AppState } from '..';
import { PhotoService } from '../../services/PhotoService';

// action creators
export const loadPhotosAction = () => {
    return {
        type: PHOTOS_LOADING
    }
}

export const photosSuccessAction = (photosResponse: PhotosResponse) => {
    return {
        type: PHOTOS_SUCCESS,
        payload: photosResponse
    }
}

export const photosFailureAction = (error: GalleryError) => {
    return {
        type: PHOTOS_FAILURE,
        payload: error,
        error: true
    }
}

export const setExpandedImageAction = (expandedImage: Photo) => {
    return {
        type: SET_EXPANDED_IMAGE,
        payload: expandedImage
    }
}

export const clearExpandedImageAction = () => {
    return {
        type: CLEAR_EXPANDED_IMAGE
    }
}

export const randomPhotoSuccessAction = (photo: Photo) => {
    return {
        type: GET_RANDOM_IMAGE_SUCCESS,
        payload: photo
    }
}

export const randomPhotoFailureAction = (error: GalleryError) => {
    return {
        type: GET_RANDOM_IMAGE_FAILURE,
        payload: error,
        error: true
    }
}

// thunk actions
export const getDefaultPhotos = (): ThunkAction<
    Promise<void>,
    AppState,
    null,
    GalleryAction
> => async dispatch => {
    dispatch(loadPhotosAction());
    await PhotoService.getDefaultPhotos().then(response => {
        const defaultPhotoResponse: PhotosResponse = {
            total: response.data.length,
            total_pages: 1,
            results: response.data as Photo[],
        }
        dispatch(photosSuccessAction(defaultPhotoResponse))
    }).catch(error => {
        dispatch(photosFailureAction(error));
    });
};

export const searchPhotos = (pageNumber: number, query: string): ThunkAction<
    Promise<void>,
    AppState,
    null,
    GalleryAction
> => async dispatch => {
    dispatch(loadPhotosAction());
    await PhotoService.searchPhotos(pageNumber, query).then(response => {
        const photosResponse = {... response.data, searchQuery: query}
        dispatch(photosSuccessAction(photosResponse))
    }).catch(error => {
        dispatch(photosFailureAction(error));
    });
};

export const getRandomPhoto = (): ThunkAction<
    Promise<void>,
    AppState,
    null,
    GalleryAction
> => async dispatch => {
    await PhotoService.getRandomPhoto().then(response => {
        dispatch(randomPhotoSuccessAction(response.data))
    }).catch(error => {
        dispatch(randomPhotoFailureAction(error));
    });
};


export const setExpandedImage = (expandedImage: Photo): ThunkAction<
    Promise<void>,
    AppState,
    null,
    GalleryAction
> => async dispatch => {
    dispatch(setExpandedImageAction(expandedImage))
};

export const clearExpandedImage = (): ThunkAction<
    Promise<void>,
    AppState,
    null,
    GalleryAction
> => async dispatch => {
    dispatch(clearExpandedImageAction())
};