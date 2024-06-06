import axios from 'axios';
import { URLSearchParams } from 'url';

interface FacebookApiResponse {
  data?: any;
  error?: any;
  id?: any;
  instagram_business_account?: any;
}

export const makeFacebookApiRequest = async (endpoint: string, method: string, queryParams: object): Promise<FacebookApiResponse> => {
  const params = new URLSearchParams(queryParams as any).toString();
  const url = `https://graph.facebook.com/v10.0/${endpoint}?${params}`;
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status !== 200) {
      throw new Error(response.data.error ? response.data.error.message : 'Unknown error');
    }
    return response.data as FacebookApiResponse; // Ensures the response data is treated as the correct type
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // You might want to customize this error further
  }
};

export async function getFacebookPages(accessToken: string): Promise<FacebookApiResponse> {
  return makeFacebookApiRequest('me/accounts', 'GET', { access_token: accessToken });
}

export async function getInstagramBusinessAccount(facebookPageId: string, accessToken: string): Promise<FacebookApiResponse> {
  return makeFacebookApiRequest(`${facebookPageId}`, 'GET', {
    access_token: accessToken,
    fields: 'instagram_business_account'
  });
}

export async function createMediaObject(instagramAccountId: string, videoUrl: string, caption: string, accessToken: string): Promise<FacebookApiResponse> {
  return makeFacebookApiRequest(`${instagramAccountId}/media`, 'POST', {
    access_token: accessToken,
    media_type: 'REELS',
    video_url: videoUrl,
    caption: caption
  });
}

export async function publishMediaObject(instagramAccountId: string, creationId: string, accessToken: string): Promise<FacebookApiResponse> {
  return makeFacebookApiRequest(`${instagramAccountId}/media_publish`, 'POST', {
    access_token: accessToken,
    creation_id: creationId
  });
}
