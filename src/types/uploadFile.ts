export enum UploadImage {
  AVATAR = 'avatar',
  LOGO = 'logo',
}

export type ImageType = UploadImage.AVATAR | UploadImage.LOGO;

export interface UploadResponse {
  url: string;
}
