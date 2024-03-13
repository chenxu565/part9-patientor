import React, { useState } from "react";
import { Box, Rating } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { HealthCheckRating } from "../../types";
import { getColorForRating } from "../../utils";

interface Props  {
  rating: HealthCheckRating;
  setRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const FormHealthCheck = ({
  rating,
  setRating,
}: Props) => {
  const [hover, setHover] = useState<number>(-1); 

  return (
    <Box>
      <Rating
        value={rating}
        max={4}
        onChange={(_event, newRating) => {
          setRating(newRating ?? 0);
        }}
        onChangeActive={(_event, newHover) => {
          setHover(newHover);
        }}
        icon={<Favorite fontSize="inherit" sx={{ color: hover > -1 ? getColorForRating(4-hover) : getColorForRating(4-rating) }} />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" sx={{ color: 'grey' }} />}
      />
        {rating ? <p>{HEALTHBAR_TEXTS[4-rating]}</p> : null}
    </Box>
  );
};

export default FormHealthCheck;
