import { PLATFORM_IS_ANDROID, PLATFORM_IS_IOS } from '../config/consts';
import type { ImageSourcePropType } from 'react-native';
import { API_BASE_URL } from '../config/api-consts';
import buildUrl from 'build-url';

export interface LocalImage {
  uri: string;

  type?: string;

  filename?: string;

  timestamp?: number;
}

export function fileURICleaner(uri: string): string {
  let cleanedURI: string = uri;
  if (PLATFORM_IS_IOS) {
    if (uri.startsWith('file://')) {
      cleanedURI = uri.replace('file://', '');
      return cleanedURI;
    }
  }
  if (PLATFORM_IS_ANDROID) {
    if (!cleanedURI.startsWith('file://')) {
      cleanedURI = `file://${cleanedURI}`;
    }
    return cleanedURI;
  }
  return cleanedURI;
}

export function getFileURIForUploading(uri: string): string {
  return uri.replace('file://', '');
}

export function convertPathToUri(path: string): string {
  let uri = path.split('/');
  return uri[uri.length - 1];
}

export function getBase64URL(base64: string, mimeType: string): string {
  return `data:${mimeType};base64,${base64}`;
}

export function getIOSAssetURI(image: LocalImage): LocalImage {
  return image;
}

export function getImageSource(path: string): ImageSourcePropType | undefined {
  if (path) {
    return {
      uri: buildUrl(API_BASE_URL, { path: path }),
    };
  }
  return undefined;
}

export function getImageNameByUri(uri: string): string | undefined {
  if (uri) {
    const result: string[] = uri.split('/');
    return result[result.length - 1];
  }
  return undefined;
}
