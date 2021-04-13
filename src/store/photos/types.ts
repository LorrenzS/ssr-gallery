import * as GalleryCore from '../../core';

export interface PhotosState {
    isLoading: boolean;
    error: GalleryCore.Models.GalleryError;
    photos: GalleryCore.Models.PhotosResponse;
    expandedImage: GalleryCore.Models.Photo;
}

export const PHOTOS_LOADING: string = 'PHOTOS_LOADING';
export const PHOTOS_FAILURE: string = 'PHOTOS_FAILURE';
export const PHOTOS_SUCCESS: string = 'PHOTOS_SUCCESS';
export const SET_EXPANDED_IMAGE: string = 'SET_EXPANDED_IMAGE';
export const CLEAR_EXPANDED_IMAGE: string = 'CLEAR_EXPANDED_IMAGE';

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

interface SetExpandedImage extends GalleryCore.Models.GalleryAction<GalleryCore.Models.Photo, typeof SET_EXPANDED_IMAGE> {
  type: typeof SET_EXPANDED_IMAGE;
  payload: GalleryCore.Models.Photo;
}

interface ClearExpandedImage extends GalleryCore.Models.GalleryAction<undefined, typeof CLEAR_EXPANDED_IMAGE> {
  type: typeof CLEAR_EXPANDED_IMAGE;
}



export type PhotosActionTypes =
  | PhotosLoading
  | PhotosSuccess
  | PhotosFailure
  | SetExpandedImage
  | ClearExpandedImage;