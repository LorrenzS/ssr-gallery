import { Reducer } from "redux";
import { PhotosActionTypes, PhotosState, PHOTOS_FAILURE, PHOTOS_LOADING, PHOTOS_SUCCESS } from "./types";
import { GalleryError, PhotosResponse } from "../../core/models";

const initialState: PhotosState = {
    isLoading: false,
    error: undefined,
    photos: undefined,
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
                isLoading: false,
                error: undefined,
                photos: action.payload as PhotosResponse
            }
        case PHOTOS_FAILURE:
            return {
                isLoading: false,
                error: action.payload as GalleryError,
                photos: undefined
            }
        default:
            return state;
    }
}

export default photosReducer;