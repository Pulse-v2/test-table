import {useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {url} from '../const/url';

interface Product {
    "id": number,
    "brand": string,
    "name": string,
    "price": string,
    "price_sign": string | null,
    "currency": string | null,
    "image_link": string,
    "product_link": string,
    "website_link": string,
    "description": string,
    "rating": number,
    "category": string,
    "product_type": string,
    "tag_list": [],
    "created_at": string,
    "updated_at": string,
    "product_api_url": string,
    "api_featured_image": string,
    "product_colors": []
}

interface ErrorResponse {
    message: string;
}

export const useGetProducts = () => {
    const [data, setData] = useState<Product[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getProducts = async (requestUrl: string): Promise<void> => {
        try {
            const response: AxiosResponse<Product[]> = await axios.get(`${url}${requestUrl}`);
            setData(response.data);
            setError(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errResponse = error.response;
                if (errResponse && errResponse.data && errResponse.data.message) {
                    const errorData: ErrorResponse = errResponse.data;
                    setError(errorData.message);
                } else {
                    setError('An unexpected error occurred.');
                }
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return {data, error, getProducts};
};
