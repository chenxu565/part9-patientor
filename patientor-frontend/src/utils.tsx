
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled member: ${JSON.stringify(value)}`
  );
};

enum Color {
  Green = "green",
  Yellow = "yellow",
  Orange = "orange",
  Red = "red",
  Grey = "grey"
}

export const getColorForRating = (rating: number): Color => {
  switch (rating) {
    case 0:
      return Color.Green;
    case 1:
      return Color.Yellow;
    case 2:
      return Color.Orange;
    case 3:
      return Color.Red;
    default:
      return Color.Grey;
  }
};
