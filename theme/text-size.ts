export type TextSize = 'small' | 'standard' | 'large' | 'extra-large';

type Tag =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'paragraph'
  | 'bullet_list'
  | 'ordered_list'
  | 'code_inline'
  | 'th'
  | 'td';

type FontMap = {
  [x in Tag]: { fontSize: number; lineHeight: number };
};

export const textSizes: Record<TextSize, FontMap> = {
  small: {
    heading1: {
      fontSize: 20,
      lineHeight: 30,
    },
    heading2: {
      fontSize: 18,
      lineHeight: 30,
    },
    heading3: {
      fontSize: 16,
      lineHeight: 26,
    },
    paragraph: {
      fontSize: 15,
      lineHeight: 26,
    },
    bullet_list: {
      fontSize: 15,
      lineHeight: 26,
    },
    ordered_list: {
      fontSize: 15,
      lineHeight: 26,
    },
    th: {
      fontSize: 14,
      lineHeight: 24,
    },
    td: {
      fontSize: 14,
      lineHeight: 24,
    },
    code_inline: {
      fontSize: 14,
      lineHeight: 24,
    },
  },
  standard: {
    heading1: {
      fontSize: 22,
      lineHeight: 24,
    },
    heading2: {
      fontSize: 20,
      lineHeight: 24,
    },
    heading3: {
      fontSize: 18,
      lineHeight: 24,
    },
    paragraph: {
      fontSize: 17,
      lineHeight: 24,
    },
    bullet_list: {
      fontSize: 17,
      lineHeight: 24,
    },
    ordered_list: {
      fontSize: 17,
      lineHeight: 24,
    },
    th: {
      fontSize: 15,
      lineHeight: 24,
    },
    td: {
      fontSize: 15,
      lineHeight: 24,
    },
    code_inline: {
      fontSize: 15,
      lineHeight: 24,
    },
  },
  large: {
    heading1: {
      fontSize: 23,
      lineHeight: 30,
    },
    heading2: {
      fontSize: 21,
      lineHeight: 30,
    },
    heading3: {
      fontSize: 19,
      lineHeight: 30,
    },
    paragraph: {
      fontSize: 18,
      lineHeight: 28,
    },
    bullet_list: {
      fontSize: 18,
      lineHeight: 28,
    },
    ordered_list: {
      fontSize: 18,
      lineHeight: 28,
    },
    th: {
      fontSize: 16,
      lineHeight: 26,
    },
    td: {
      fontSize: 16,
      lineHeight: 26,
    },
    code_inline: {
      fontSize: 16,
      lineHeight: 26,
    },
  },
  'extra-large': {
    heading1: {
      fontSize: 24,
      lineHeight: 30,
    },
    heading2: {
      fontSize: 22,
      lineHeight: 30,
    },
    heading3: {
      fontSize: 20,
      lineHeight: 30,
    },
    paragraph: {
      fontSize: 19,
      lineHeight: 30,
    },
    bullet_list: {
      fontSize: 19,
      lineHeight: 30,
    },
    ordered_list: {
      fontSize: 19,
      lineHeight: 30,
    },
    th: {
      fontSize: 17,
      lineHeight: 28,
    },
    td: {
      fontSize: 17,
      lineHeight: 28,
    },
    code_inline: {
      fontSize: 17,
      lineHeight: 28,
    },
  },
};
