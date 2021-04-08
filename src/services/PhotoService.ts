import axios from 'axios';

const defaultCollectionId = process.env.REACT_APP_UNSPLASH_COLLECTION_ID;
const baseUri = 'https://api.unsplash.com/';
const clientId = process.env.REACT_APP_UNSPLASH_CLIENT_ID;

export abstract class PhotoService {

    public static async getDefaultPhotos() {
        return axios.get(`${baseUri}/collections/${defaultCollectionId}/photos`, {
            headers: {
                'Authorization': `Client-ID ${clientId}`
            }
        })
    }

    public static async searchPhotos(query: string) {
        const encodedQuery = encodeURI(query);
        return axios.get(`${baseUri}/search/photos?page=1&query=${encodedQuery}`, {
            headers: {
                'Authorization': `Client-ID ${clientId}`
            }
        })
    }

    public static async getRandomPhoto() {
        return axios.get(`${baseUri}/photos/random${clientId}`)
    }
}