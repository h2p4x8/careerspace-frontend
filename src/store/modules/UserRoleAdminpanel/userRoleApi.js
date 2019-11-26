import api_config from '@/store/config/api_config.js';

const { server_url } = api_config;

const server = `${server_url}`

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

const validateData = {
  userRole: ({
    name,
    permissionList
  }) => {
    const newData = {};
    if (name) newData.name = name;
    if (permissionList) newData.permissionList = permissionList;

    return newData;
  },

  permission: ({
    name,
    routes
  }) => {
    const newData = {};
    if (name) newData.name = name;
    if (routes) newData.routes = routes;

    return newData;
  }
};

export default {
  async objectListGetAll({ title }) {
    const url = `${server}/${title}`
    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result[title + 'List'] : false;
  },

  async objectListGetById({ title, id }) {
    const url = `${server}/${title}/${id}`
    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result[title + 'List'] : false;
  },

  async objectCreate({ data, title }) {
    const newData = validateData[title](data);
    const url = `${server}/${title}`
    const result = await requestMake({ url, method: 'POST', data: newData });
    return result ? result.result[title + 'New'] : false;
  },

  async objectUpdate({ id, data, title }) {
    const newData = validateData[title](data);
    const url = `${server}/${title}/${id}`;
    const result = await requestMake({ url, method: 'PUT', data: newData });
    return result ? result.result[title + 'Updated'] : false;
  },

  async objectDelete({ id, title }) {
    const url = `${server}/${title}/${id}`;
    const result = await requestMake({ url, method: 'DELETE' });
    return !!result;
  }

}
