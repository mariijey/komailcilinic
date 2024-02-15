// material-ui
import { Theme, TypographyVariantsOptions } from '@mui/material/styles';

// types
import { FontFamily, ThemeMode } from 'types/config';

// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

const Typography = (mode: ThemeMode, fontFamily: FontFamily, theme: Theme): TypographyVariantsOptions => ({
  htmlFontSize: 16,
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 600,
    fontSize: '2.375rem',
    lineHeight: 1.21
  },
  h2: {
    fontWeight: 600,
    fontSize: '1.875rem',
    lineHeight: 1.27
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.33
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4
  },
  h5: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.5
  },
  h6: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.57
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66
  },
  body1: {
    fontSize: '0.875rem',
    lineHeight: 1.57
  },
  body2: {
    fontSize: '0.75rem',
    lineHeight: 1.66
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.57
  },
  subtitle2: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.66
  },
  overline: {
    lineHeight: 1.66
  },
  button: {
    textTransform: 'capitalize'
  }
});

export default Typography;

type FontSizeTypes = {
  maxFont: number;
  minFont?: number;
  stepper?: number;
  complexStepper?: any;
};

export const fontSizeCreator = ({ maxFont, minFont = 14, stepper = 2, complexStepper = null }: FontSizeTypes) => {
  if (!complexStepper) {
    return {
      fontSize: `${maxFont / 16}rem !important`,
      '@media only screen and (max-width: 1440px)': {
        fontSize: `${(maxFont - stepper >= minFont ? maxFont - stepper : minFont) / 16}rem !important`
      },
      '@media only screen and (max-width: 1360px)': {
        fontSize: `${(maxFont - 2 * stepper >= minFont ? maxFont - 2 * stepper : minFont) / 16}rem !important`
      },
      '@media only screen and (max-width: 1024px)': {
        fontSize: `${(maxFont - 3 * stepper >= minFont ? maxFont - 3 * stepper : minFont) / 16}rem !important`
      },
      '@media only screen and (max-width: 960px)': {
        fontSize: `${(maxFont - 4 * stepper >= minFont ? maxFont - 4 * stepper : minFont) / 16}rem !important`
      },
      '@media only screen and (max-width: 768px)': {
        fontSize: `${(maxFont - 5 * stepper >= minFont ? maxFont - 5 * stepper : minFont) / 16}rem !important`
      },
      '@media only screen and (max-width: 425px)': {
        fontSize: `${(maxFont - 6 * stepper >= minFont ? maxFont - 6 * stepper : minFont) / 16}rem !important`
      },
      '@media only screen and (max-width: 320px)': {
        fontSize: `${(maxFont - 7 * stepper >= minFont ? maxFont - 7 * stepper : minFont) / 16}rem !important`
      }
    };
  }
  return {
    fontSize: `${maxFont / 16}rem !important`,
    '@media only screen and (max-width: 1440px)': {
      fontSize: `${(maxFont - complexStepper?.step1 >= minFont ? maxFont - complexStepper?.step1 : minFont) / 16}rem !important`
    },
    '@media only screen and (max-width: 1360px)': {
      fontSize: `${(maxFont - complexStepper?.step2 >= minFont ? maxFont - complexStepper?.step2 : minFont) / 16}rem !important`
    },
    '@media only screen and (max-width: 1024px)': {
      fontSize: `${(maxFont - complexStepper?.step3 >= minFont ? maxFont - complexStepper?.step3 : minFont) / 16}rem !important`
    },
    '@media only screen and (max-width: 960px)': {
      fontSize: `${(maxFont - complexStepper?.step4 >= minFont ? maxFont - complexStepper?.step4 : minFont) / 16}rem !important`
    },
    '@media only screen and (max-width: 768px)': {
      fontSize: `${(maxFont - complexStepper?.step5 >= minFont ? maxFont - complexStepper?.step5 : minFont) / 16}rem !important`
    },
    '@media only screen and (max-width: 425px)': {
      fontSize: `${(maxFont - complexStepper?.step6 >= minFont ? maxFont - complexStepper?.step6 : minFont) / 16}rem !important`
    },
    '@media only screen and (max-width: 320px)': {
      fontSize: `${(maxFont - complexStepper?.step7 >= minFont ? maxFont - complexStepper?.step7 : minFont) / 16}rem !important`
    }
  };
};
