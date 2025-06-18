import { getMeteorsByDateRange } from "../repositories/nasaRepository.js";

export const getMeteors = async (filter) => {
  const data = await getMeteorsByDateRange(
    filter.date.start_date,
    filter.date.end_date
  );

  if (filter.count && filter.were_dangerous_meteors) {
    return getDangerousMeteorsCount(data);
  } else if (filter.count) {
    return getMeteorsCount(data);
  } else if (filter.were_dangerous_meteors) {
    return areDangerousMeteors(data);
  }

  return filterMeteors(data);
};

const filterMeteors = (data) => {
  const meteors = {};

  for (const date in data.near_earth_objects) {
    meteors[date] = [];

    for (const meteor of data.near_earth_objects[date]) {
      const tempMeteor = {};
      tempMeteor.id = meteor.id;
      tempMeteor.name = meteor.name;
      tempMeteor.diameter = getMeteorDiameter(meteor);
      tempMeteor.is_potentially_hazardous_asteroid =
        meteor.is_potentially_hazardous_asteroid;
      tempMeteor.close_approach_date_full =
        meteor.close_approach_data[0].close_approach_date_full || "";
      tempMeteor.relative_velocity =
        meteor.close_approach_data[0].relative_velocity.kilometers_per_second ||
        "";

      meteors[date].push(tempMeteor);
    }
  }

  return {
    meteors,
    message: "Метеориты, которые были замечены!",
  };
};

const getMeteorsCount = (data) => {
  return {
    count: data.element_count,
    message: `Количество метеоритов, которые были замечены, равняется ${data.element_count}!`,
  };
};

const getDangerousMeteorsCount = (data) => {
  let count = 0;

  for (const date in data.near_earth_objects) {
    for (const meteor of data.near_earth_objects[date]) {
      if (meteor.is_potentially_hazardous_asteroid) {
        count++;
      }
    }
  }

  return {
    count,
    message: `Количество опасных метеоритов, которые были замечены, равняется ${count}!`,
  };
};

const areDangerousMeteors = (data) => {
  for (const date in data.near_earth_objects) {
    for (const meteor of data.near_earth_objects[date]) {
      if (meteor.is_potentially_hazardous_asteroid) {
        return {
          isDangerous: true,
          message:
            "Были замечены среди метеоритов потенциально опасные для земли!",
        };
      }
    }
  }

  return false;
};

const getMeteorDiameter = (meteor) => {
  return (
    (meteor.estimated_diameter.meters.estimated_diameter_min +
      meteor.estimated_diameter.meters.estimated_diameter_max) /
    2
  );
};
