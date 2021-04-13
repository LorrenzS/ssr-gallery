import axios from 'axios';

const defaultCollectionId = process.env.REACT_APP_UNSPLASH_COLLECTION_ID;
const baseUri = 'https://api.unsplash.com/';
const clientId = process.env.REACT_APP_UNSPLASH_CLIENT_ID;

export const photosPerPage = 9;

export abstract class PhotoService {

    public static async getDefaultPhotos() {
        return axios.get(`${baseUri}/collections/${defaultCollectionId}/photos?per_page=9`, {
            headers: {
                'Authorization': `Client-ID ${clientId}`
            }
        })
    }

    public static async searchPhotos(pageNumber: number, query: string) {
        const encodedQuery = encodeURI(query);
        return axios.get(`${baseUri}/search/photos?page=${pageNumber}&query=${encodedQuery}&orientation=portrait&per_page=${photosPerPage}`, {
            headers: {
                'Authorization': `Client-ID ${clientId}`
            }
        })
    }

    public static async getRandomPhoto() {
        return axios.get(`${baseUri}/photos/random`, {
            headers: {
                'Authorization': `Client-ID ${clientId}`
            }
        })
    }
}