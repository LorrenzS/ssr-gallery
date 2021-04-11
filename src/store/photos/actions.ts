import { ThunkAction } from 'redux-thunk';
import { GalleryAction, GalleryError, Photo, PhotosResponse } from '../../core/models';
import { PHOTOS_FAILURE, PHOTOS_LOADING, PHOTOS_SUCCESS } from './types';
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
