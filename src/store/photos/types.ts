import * as GalleryCore from '../../core';

export interface PhotosState {
    isLoading: boolean;
    error: GalleryCore.Models.GalleryError;
    photos: GalleryCore.Models.PhotosResponse;
    expandedImage: GalleryCore.Models.Photo;
    randomImageError: GalleryCore.Models.GalleryError;
}

export const PHOTOS_LOADING: string = 'PHOTOS_LOADING';
export const PHOTOS_FAILURE: string = 'PHOTOS_FAILURE';
export const PHOTOS_SUCCESS: string = 'PHOTOS_SUCCESS';
export const SET_EXPANDED_IMAGE: string = 'SET_EXPANDED_IMAGE';
export const CLEAR_EXPANDED_IMAGE: string = 'CLEAR_EXPANDED_IMAGE';
export const GET_RANDOM_IMAGE_SUCCESS: string = 'GET_RANDOM_IMAGE_SUCCESS';
export const GET_RANDOM_IMAGE_FAILURE: string = 'GET_RANDOM_IMAGE_FAILURE';

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

interface GetRandomImageSuccess extends GalleryCore.Models.GalleryAction<GalleryCore.Models.Photo, typeof GET_RANDOM_IMAGE_SUCCESS> {
type: typeof GET_RANDOM_IMAGE_SUCCESS;
payload: GalleryCore.Models.Photo;
}

interface GetRandomImageFailure extends GalleryCore.Models.GalleryAction<GalleryCore.Models.GalleryError, typeof GET_RANDOM_IMAGE_FAILURE> {
type: typeof GET_RANDOM_IMAGE_FAILURE;
payload: GalleryCore.Models.GalleryError;
}

export type PhotosActionTypes =
  | PhotosLoading
  | PhotosSuccess
  | PhotosFailure
  | SetExpandedImage
  | ClearExpandedImage
  | GetRandomImageSuccess
  | GetRandomImageFailure;