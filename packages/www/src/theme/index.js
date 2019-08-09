import {Box, css, defaultColors} from 'curls'
import {Link, NavLink} from 'react-router-dom'
import * as icons from '../components/icons'


export const box = {
  getBoxShadow (dp) {
    if (dp === void 0 || dp === false || dp === null || dp == 0)
      return css`box-shadow: none;`

    dp = parseInt(dp)
    const ambientY = dp / 16
    let ambientAlpha = (dp + 10) / 100
    ambientAlpha = Math.min(0.06, ambientAlpha)
    const ambientBlur = (dp === 1 ? 3 : dp * 1.618) / 16
    let shadow = `0 ${ambientY}rem ${ambientBlur}rem rgba(0, 0, 0, ${ambientAlpha})`
    const directY = (dp / 3) / 16
    const directBlur = (dp === 1 ? 3 : dp * 1.618) / 16

    return css`
      box-shadow: ${shadow}, 0 ${directY}rem ${directBlur}rem rgba(0, 0, 0, ${ambientAlpha});
    `
  },
  kinds: {
    row: {
      d: 'flex',
      w: '100%'
    },
    form: {
      as: 'form',
      w: '100%',
      maxW: '480',
      bg: 'trueWhite',
      sh: '16',
      br: '2',
      p: '5@tablet 4@phone'
    },
    table: {
      as: 'table',
      w: '100%',
      bg: 'trueWhite',
      sh: '16',
      br: '2'
    },
    tableRow: {
      as: 'tr',
      w: '100%'
    }
  }
}

export const colors = {
  ...defaultColors,
  yellow: '#edf1ad',
  green: '#11bc90',
  primary: '#11bc90',
  trueWhite: '#fff',
  primaryText: defaultColors.darkGrey,
  primaryLink: defaultColors.blue,
  secondaryText: defaultColors.white,
  secondaryLink: defaultColors.white,
}

export const content = {
  width: 1280
}

export const icon = {
  icons
}

export const input = {
  defaultProps: {
    d: 'block',
    br: '2',
    p: '3',
    bg: 'lightestGrey',
    w: '100%',
    color: 'primaryText',
    size: 'md@tablet sm@phone',
    css: css`border-style: none;`
  }
}

export const link = {
  component: Link,
  navComponent: NavLink,
  kinds: {
    sidebar: {
      d: 'block',
      color: 'secondaryLink',
      p: 'x4 y2',
      css: css`border: none;`
    }
  }
}

export const text = {
  scale: {
    xs: 0.875,
    sm: 1.125,
    md: 1.33,
    lg: 2.5,
    xl: 5
  },

  families: {
    brand: 'Brand, "Helvetica Neue", Helvetica, sans-serif'
  },

  kinds: {
    hero: {
      as: 'h1',
      bold: true,
      lh: '0.95',
      center: '@phone',
      left: '@desktop',
      size: 'xl@tablet lg@phone'
    },
    heading: {
      as: 'h1',
      bold: true,
      size: 'lg'
    },
    subheading: {
      as: 'h2',
      light: true,
      size: 'md'
    },
    p: {
      as: 'p',
      lh: '1.4',
      m: 'b4'
    },
    label: {
      as: 'label',
      d: 'block',
      bold: true,
      size: 'md',
      css: css`& > input {margin-top: 0.75rem;}`
    },
    tableHeading: {
      as: 'th',
      p: '[3 b2]@phone [4 b3]@desktop',
      bold: true,
      left: true
    },
    tableCell: {
      as: 'td',
      p: '[b3 x3]@phone [b4 x4]@desktop'
    }
  }
}

export const button = {
  defaultProps: {
    size: 'sm',
    br: '5',
    bw: '1',
    bc: 'currentColor',
    minW: '156',
    css: css`
      color: currentColor;
      font-size: 1em;
      font-weight: 700;
    `
  },
  kinds: {
    submit: {
      bg: 'primary',
      type: 'submit',
      css: css`
        color: ${colors.white};
      `
    },
    solid: {
      bg: 'primary',
      css: css`
        color: ${colors.white};
      `
    },
    tableAction: {
      p: 'y2 x3',
      bg: 'primary',
      minW: 0,
      css: css`
        font-size: ${text.scale.xs}rem;
        color: ${colors.white};
      `
    }
  }
}

export const spinner = {
  defaultProps: {
    color: 'currentColor',
    size: '32'
  }
}