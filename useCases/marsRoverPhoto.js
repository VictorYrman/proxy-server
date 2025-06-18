import { getMarsRoverPhoto } from "../repositories/nasaRepository.js";
import { getDateFromString } from "../utils/date.js";

export const getPhoto = async (API_KEY) => {
  const data = await getMarsRoverPhoto(API_KEY);

  const maxDatePhoto = getMaxDatePhoto(data);

  return {
    image: maxDatePhoto,
    message: "Самый свежий снимок с марсохода!",
  };
};

const getMaxDatePhoto = (data) => {
  let maxDatePhoto = data.photos[0];

  for (let i = 0; i < data.photos.length - 1; i++) {
    if (
      getDateFromString(data.photos[i + 1].earth_date) >
      getDateFromString(maxDatePhoto.earth_date)
    ) {
      maxDatePhoto = data.photo[i + 1];
    }
  }

  return maxDatePhoto.img_src;
};
