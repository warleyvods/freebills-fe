const Tag = {
  primary: ({ colorScheme = "green"}) => ({
    colorScheme: `${colorScheme}.50`,
  }),
  defaultProps: {
    variant: "primary"
  }
};

export const TagComponent = {
  components: {
    Tag,
  },
};
