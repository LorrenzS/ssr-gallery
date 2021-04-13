import { Action } from 'redux';
export interface GalleryError extends Error {
    response?: {
        message: string;
        title: string;
        status: number;
      };
}

export interface GalleryAction<TPayload = any, TAction = string> extends Action<TAction> {
    readonly type: TAction;
    readonly payload?: TPayload;
    readonly error?: boolean;
    readonly meta?: any;
  }

export interface PhotoUrls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

export interface PhotoLinks {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

export interface Photo {
    id: string;
    description: string;
    urls: PhotoUrls;
    links: PhotoLinks;
}

export interface PhotosResponse {
    total: number;
    total_pages: number;
    results: Photo[];
    searchQuery?: string;
}