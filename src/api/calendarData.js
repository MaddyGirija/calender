import axios from "axios";

const getMonthDatas = () => {
  return axios.get(
    `http://calapi.inadiutorium.cz/api/v0/en/calendars/default/2023/10`
  );
};

const calenderService = {
  getMonthDatas,
};

export default calenderService;
