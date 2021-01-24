export enum SizesEnum {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export const SIZES_MATRIX = {
  LARGE: {
    [SizesEnum.small]: false,
    [SizesEnum.medium]: false,
    [SizesEnum.large]: true
  },
  MEDIUM: {
    [SizesEnum.small]: false,
    [SizesEnum.medium]: true,
    [SizesEnum.large]: false
  },
  SMALL: {
    [SizesEnum.small]: true,
    [SizesEnum.medium]: false,
    [SizesEnum.large]: false
  },
  DEFAULT: {
    [SizesEnum.small]: false,
    [SizesEnum.medium]: false,
    [SizesEnum.large]: false
  },
};
