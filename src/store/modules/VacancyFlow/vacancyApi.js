import api_config from '@/store/config/api_config.js';

const { server_url } = api_config;

const server = `${server_url}/vacancy`

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
        result = res;
      };
      return result;
    })
    .catch((err) => {
      console.log(err)
      return false;
    });
};

export default {
  async vacancyListGetFiltered({data}) {
    const url = `${server}/jobs-filter`;
    const newData = {}

    if (data.industry ? data.industry.length > 0 : false) newData.industry = data.industry;
    if (data.mapFunction ? data.mapFunction.length > 0 : false) newData.mapFunction = data.mapFunction;
    const result = await requestMake({ url, method: 'POST', data: newData });
    return result ? result : false;
  },
  async vacancyListGetAll() {
    const url = `${server}/all`;
    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result.vacancyList : false;
  },

  async vacancyGetById({ id }) {
    const url = `${server}/${id}`;
    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result.vacancyList : false;
  },

  async makeReply({ vacancyId, data }) {
    const url = `${server}/reply/${vacancyId}`;

    const result = await requestMake({ url, method: 'POST', data});
    return result;
  },

  async getIndustriesByCompany({ data }) {
    const url = `${server}/get-industry`;
    console.log(data)
    const result = await requestMake({ url, method: 'POST', data });
    return result.result.industryList;
  }
}
