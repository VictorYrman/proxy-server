import { getCurrentWeekDates } from "../../utils/date.js";
import { getMeteors } from "../../useCases/meteors.js";
import { getPhoto } from "../../useCases/marsRoverPhoto.js";
import {
  meteorsGetSchema,
  meteorsPostSchema,
  validateRequest,
} from "../middlewares/validation.js";

export const setupMeteorsRoutes = (server) => {
  server.get(
    "/meteors",
    validateRequest(meteorsGetSchema),
    async (request, response) => {
      try {
        const { date, count, were_dangerous_meteors } = request.query;

        let start_date, end_date;

        if (!date) {
          start_date = undefined;
          end_date = undefined;
        } else {
          [start_date, end_date] = date?.split("_");
        }

        const filter = {
          date:
            start_date === undefined || end_date === undefined
              ? getCurrentWeekDates()
              : { start_date, end_date },
          count,
          were_dangerous_meteors,
        };

        const data = await getMeteors(filter);

        response.status(200).json(data);
      } catch (error) {
        response.status(500).json({
          error,
          message: `Возникла ошибка: ${error}`,
        });
      }
    }
  );

  server.post(
    "/meteors",
    validateRequest(meteorsPostSchema),
    async (request, response) => {
      try {
        const { id, name, API_KEY } = request.body;
        const data = await getPhoto(API_KEY);

        response
          .status(200)
          .json({ data, message: `Запрос инициализировал ${name}` });
      } catch (error) {
        response.status(500).json({
          error,
          message: `Возникла ошибка: ${error}`,
        });
      }
    }
  );
};
