const containerSizeStyles = {
  ".container": {
    maxWidth: "100%",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    "@screen sm": {
      maxWidth: "655px",
      paddingLeft: "1.25rem",
      paddingRight: "1.25rem",
    },
    "@screen md": {
      maxWidth: "882px",
      paddingLeft: "2rem",
      paddingRight: "2rem",
    },
    "@screen lg": {
      maxWidth: "1144px",
      paddingLeft: "3.125rem",
      paddingRight: "3.125rem",
    },
    "@screen xl": {
      maxWidth: "1348px",
      paddingLeft: "3.75rem",
      paddingRight: "3.75rem",
    },
    "@screen 2xl": {
      maxWidth: "1455px",
      paddingLeft: "3.75rem",
      paddingRight: "3.75rem",
    },
  },
}

const scrollbarDefaultStyles = {
  ".scrollbar::-webkit-scrollbar": {
    width: "4px",
    height: "4px",
    marginRight: "2px",
  },
  ".scrollbar:hover::-webkit-scrollbar-thumb": {
    background: "hsl(var(--color-primary-brand) / 60%)",
    borderRadius: "8px",
  },
  ".scrollbar:hover::-webkit-scrollbar-track": {
    background: "hsl(var(--color-primary-skeleton) / 80%)",
    borderRadius: "8px",
  },
  ".scrollbar-bgWhite::-webkit-scrollbar-track": {
    background: "hsl(0deg 0% 0% / 8.1%)",
  },
  ".scrollbar-bgGray::-webkit-scrollbar-track": {
    background: "hsl(var(--neutral-n200))",
  },

  ".scrollbar-primary-35::-webkit-scrollbar-thumb": {
    background: "hsl(var(--primary) / 35%)",
  },
}

export const extraCSSClasses = {
  ...containerSizeStyles,
  ...scrollbarDefaultStyles,
  ".webkit-box": {
    display: "-webkit-box",
  },
}
