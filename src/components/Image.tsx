import { Image as RNImage, type ImageProps as RNImageProps } from 'react-native';

export type ImageProps = RNImageProps;

export function Image(props: ImageProps) {
  return <RNImage {...props} />;
}

Image.getSize = RNImage.getSize;
Image.getSizeWithHeaders = RNImage.getSizeWithHeaders;
Image.prefetch = RNImage.prefetch;
Image.abortPrefetch = RNImage.abortPrefetch;
Image.queryCache = RNImage.queryCache;
Image.resolveAssetSource = RNImage.resolveAssetSource;
