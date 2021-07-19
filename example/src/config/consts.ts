import { Dimensions, KeyboardTypeOptions, Platform } from 'react-native';
import * as DeviceInfo from 'react-native-device-info';

/**
 * Date time constants
 */

export const DATE_FORMAT: string = 'DD/MM/YYYY';

export const TIME_FORMAT: string = 'HH:mm:ss';

export const DATE_TIME_FORMAT: string = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const TIME_DATE: number = 86400000;

// ------------------------------------------------------------------------

/**
 * Platform constants
 */

export const DEVICE_ID: string = DeviceInfo.getDeviceId();

export const DEVICE_MODEL: string = DeviceInfo.getModel();

export const DEVICE_APP_BUNDLE_ID: string = DeviceInfo.getBundleId();

export const DEVICE_APP_VERSION: string = DeviceInfo.getVersion();

export const DEVICE_APP_BUILD_NUMBER: string = DeviceInfo.getBuildNumber();

export const PLATFORM_IS_ANDROID: boolean = Platform.OS === 'android';

export const PLATFORM_IS_IOS: boolean = Platform.OS === 'ios';

export const PLATFORM_NAME: string = PLATFORM_IS_ANDROID ? 'Android' : 'iOS';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export { SCREEN_WIDTH, SCREEN_HEIGHT };

/**
 * EndReachedThreshold for FlatList
 *
 * @type {number}
 */
export const END_REACHED_THRESHOLD: number = 0.5;

/**
 * Ratio width / height of banner images
 *
 * @type {number}
 */
export const BANNER_RATIO: number = 1;

export const NUMERIC_KEYBOARD_TYPE: KeyboardTypeOptions = PLATFORM_IS_IOS
  ? 'number-pad'
  : 'numeric';

export const THOUSAND_SEPARATOR: string = ',';

export const DECIMAL_SEPARATOR: string = '.';
