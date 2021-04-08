import * as GalleryCore from '../../core';

export interface PhotosState {
    isLoading: boolean;
    error: GalleryCore.Models.GalleryError;
    photos: GalleryCore.Models.PhotosResponse;
}

export const PHOTOS_LOADING: string = 'PHOTOS_LOADING';
export const PHOTOS_FAILURE: string = 'PHOTOS_FAILURE';
export const PHOTOS_SUCCESS: string = 'PHOTOS_SUCCESS';

interface PhotosLoading extends GalleryCore.Models.GalleryAction<undefined, typeof PHOTOS_LOADING> {
    type: typeof PHOTOS_LOADING;
  }
  
  interface PhotosSuccess extends GalleryCore.Models.GalleryAction<GalleryCore.Models.PhotosResponse, typeof PHOTOS_SUCCESS> {
    type: typeof PHOTOS_SUCCESS;
    payload: GalleryCore.Models.PhotosResponse;
  }
  
  interface PhotosFailure extends GalleryCore.Models.GalleryAction<GalleryCore.Models.GalleryError, typeof PHOTOS_FAILURE> {
    type: typeof PHOTOS_FAILURE;
    payload: GalleryCore.Models.GalleryError;
  }

export type PhotosActionTypes =
  | PhotosLoading
  | PhotosSuccess
  | PhotosFailure;