import { ThunkAction } from 'redux-thunk';
import { GalleryAction, GalleryError, Photo } from '../../core/models';
import { PHOTOS_FAILURE, PHOTOS_LOADING, PHOTOS_SUCCESS } from './types';
import { AppState } from '..';
import { PhotoService } from '../../services/PhotoService';

// action creators
export const loadPhotosAction = () => {
    return {
        type: PHOTOS_LOADING
    }
}

export const photosSuccessAction = (photos: Photo[]) => {
    return {
        type: PHOTOS_SUCCESS,
        payload: photos
    }
}

export const photosFailureAction = (error: GalleryError) => {
    return {
        type: PHOTOS_FAILURE,
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
        dispatch(photosSuccessAction(response.data))
    }).catch(error => {
        dispatch(photosFailureAction(error));
    });
  };

  export const searchPhotos = (query: string): ThunkAction<
    Promise<void>,
    AppState,
    null,
    GalleryAction
> => async dispatch => {
    dispatch(loadPhotosAction());
    await PhotoService.searchPhotos(query).then(response => {
        dispatch(photosSuccessAction(response.data))
    }).catch(error => {
        dispatch(photosFailureAction(error));
    });
  };
