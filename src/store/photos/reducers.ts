import { Reducer } from "redux";
import { 
    CLEAR_EXPANDED_IMAGE, 
    GET_RANDOM_IMAGE_FAILURE, 
    GET_RANDOM_IMAGE_SUCCESS, 
    PhotosActionTypes, 
    PhotosState, 
    PHOTOS_FAILURE, 
    PHOTOS_LOADING, 
    PHOTOS_SUCCESS, 
    SET_EXPANDED_IMAGE } from "./types";
import { Photo, GalleryError, PhotosResponse } from "../../core/models";

const initialState: PhotosState = {
    isLoading: false,
    error: undefined,
    photos: undefined,
    randomImageError: undefined,
    expandedImage: undefined
}

const photosReducer: Reducer<PhotosState> = (state = initialState, action: PhotosActionTypes): PhotosState => {
    switch(action.type) {
        case PHOTOS_LOADING:
            return {
                ...state,
                isLoading: true,
                error: undefined
            }
        case PHOTOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: undefined,
                photos: action.payload as PhotosResponse
            }
        case PHOTOS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload as GalleryError,
                photos: undefined
            }
        case SET_EXPANDED_IMAGE:
            return {
                ...state,
                expandedImage: action.payload as Photo
            }
        case CLEAR_EXPANDED_IMAGE:
            return {
                ...state,
                expandedImage: undefined
            }
        case GET_RANDOM_IMAGE_SUCCESS:
            return {
                ...state,
                expandedImage: action.payload as Photo
            }
        case GET_RANDOM_IMAGE_FAILURE:
            return {
                ...state,
                randomImageError: action.payload as GalleryError,
                expandedImage: undefined,
            }
        default:
            return state;
    }
}

export default photosReducer;