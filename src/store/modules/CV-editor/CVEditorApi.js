import api_config from '@/store/config/api_config.js';

const { server_url } = api_config;

const server = `${server_url}/cv`

const requestMake = async ({ url, method, data, is_form_data }) => {
  const unit = {
    method
  };
  let result;

  if (method === 'POST' || method === 'PUT') {
    if (is_form_data) unit.body = data;
    else {
      unit.headers = { "Content-Type" : 'application/json' };
      unit.body = JSON.stringify(data);
    }
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

const validateCVData = ({
  name,
  fullName,
  livingPlace,
  age,
  phone,
  email,
  summary,
  careerHistory,
  education,
  extra,
  order,
}) => {
  const newData = {};
  if (name) newData.name = name;
  if (fullName) newData.fullName = fullName;
  if (livingPlace) newData.livingPlace = livingPlace;
  if (age) newData.age = age;
  if (phone) newData.phone = phone;
  if (email) newData.email = email;
  if (summary) newData.summary = summary;
  if (careerHistory.length > 0) newData.careerHistory = careerHistory;
  if (education.length > 0) newData.education = education;
  if (extra) newData.extra = extra;
  if (order) newData.order = order;
  return newData;
}

export default {
  async createNew({ data }) {
    const url = `${server}/create`;
    const newData = validateCVData(data);
    console.log(newData)
    const result = await requestMake({ url, method: 'POST', data: newData });
    return result;
  },
  async updateOne({ data, id }) {
    const url = `${server}/update/${id}`;
    const result = await requestMake({ url, method: 'PUT', data });
    return result;
  },
  async getUserCVbyId({ id }) {
    const url = `${server}/read-by-id/${id}`;
    const result = await requestMake({ url, method: 'GET' });
    return result.result;
  }
}
