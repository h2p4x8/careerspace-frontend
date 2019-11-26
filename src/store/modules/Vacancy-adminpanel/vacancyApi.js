import api_config from '@/store/config/api_config.js';

const { server_url } = api_config;

const server = `${server_url}/vacancy`

const requestMake = async ({ url, method, data }) => {
  const unit = {
    method
  };
  let result;

  if (method === 'POST' || method === 'PUT') {
    unit.headers = { "Content-Type" : 'application/json' };
    unit.body = JSON.stringify(data);
  }

  unit.credentials = 'include';

  return fetch(url, unit)
    .then((res) => {
      if (res.ok) return res.json()
      throw new Error(`Response failed, status: ${res.status}`)
    })
    .then((res) => {
      if (res.success) {
        result = res;
        console.log('success')
      } else {
        console.log('failed')
        result = false;
      };
      return result;
    })
    .catch((err) => {
      console.log(err)
      return false;
    });
};

const validateVacancyData = ({
  companyName,
  positionName,
  city,
  salaryFrom,
  salaryTo,
  duties,
  commentToDuties,
  requirements,
  commentToRequirements,
  reasons,
  commentToReasons,
  extra,
  commentToExtra,
  outOfReach,
  industry,
  mapPosition,
  mapFunction,
  contact,
  typeofCompany,
}) => {
  const newData = {};
  if (companyName) newData.companyName = companyName.id;
  if (positionName) newData.positionName = positionName;
  if (city) newData.city = city;
  if (salaryFrom) newData.salaryFrom = salaryFrom;
  if (salaryTo) newData.salaryTo = salaryTo;
  if (duties) newData.duties = duties;
  if (commentToDuties) newData.commentToDuties = commentToDuties;
  if (requirements) newData.requirements = requirements;
  if (commentToRequirements) newData.commentToRequirements = commentToRequirements;
  if (reasons) newData.reasons = reasons;
  if (commentToReasons) newData.commentToReasons = commentToReasons;
  if (extra) newData.extra = extra;
  if (commentToExtra) newData.commentToExtra = commentToExtra;
  if (industry) newData.industry = industry;
  if (mapPosition) newData.mapPosition = mapPosition;
  if (mapFunction) newData.mapFunction = mapFunction;
  if (typeof outOfReach != "undefined") newData.outOfReach = outOfReach;
  if (contact)  newData.contact = contact;
  if (typeofCompany)  newData.typeofCompany = typeofCompany;

  return newData;
}

export default {
  async vacancyListGetAll() {
    const url = `${server}`;
    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result.vacancyList : false;
  },

  async vacancyGetById({ id }) {
    const url = `${server}/${id}`;
    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result.vacancyList : false;
  },

  async vacancyCreate({ data }) {
    const newData = validateVacancyData(data);
    const url = `${server}`;
    console.log('new data ', newData)
    const result = await requestMake({ url, method: 'POST', data: newData });
    return result ? result.result.newVacancy : false;
  },

  async vacancyUpdate({ id, data }) {
    const newData = validateVacancyData(data);

    const url = `${server}/${id}`;
    const result = await requestMake({ url, method: 'PUT', data: newData });
    return result ? result.result.updatedVacancy : false;
  },

  async vacancyDelete({ id }) {
    const url = `${server}/${id}`;
    const result = await requestMake({ url, method: 'DELETE' });
    return !!result;
  },

  async vacancyListGetByIdList({ idList }) {
    const url = `${server}/by-position`;

    const result = await requestMake({ url, method: 'POST', data: {idPositionList: idList} });
    return result ? result.result.vacancyList : false;
  }

}
