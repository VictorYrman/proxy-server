export const getCurrentWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  return {
    start_date: monday.toISOString().split("T")[0],
    end_date: friday.toISOString().split("T")[0],
  };
};

export const getDateFromString = (dateString) => {
  const [year, month, day] = dateString.split("-");
};
