import api_config from '@/store/config/api_config.js';

const { server_url } = api_config;

const server = `${server_url}/map`

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

const checkObjectData = {
  position({
    name,
    shortDescription,
    fullDescription,
    timeStart,
    timeEnd,
    salaryStart,
    salaryEnd,
    level_id,
    subfunction_id
  }) {
    const newData = {};
    if (name) newData.name = name;
    if (shortDescription) newData.shortDescription = shortDescription;
    if (fullDescription) newData.fullDescription = fullDescription;
    if (timeStart) newData.timeStart = timeStart;
    if (timeEnd) newData.timeEnd = timeEnd;
    if (salaryStart) newData.salaryStart = salaryStart;
    if (salaryEnd) newData.salaryEnd = salaryEnd;
    if (level_id) newData.level_id = level_id;
    if (subfunction_id) newData.subfunction_id = subfunction_id;

    return newData;
  },

  level({
    name,
    index
  }) {
    const newData = {};
    if (name) newData.name = name;
    if (index) newData.index = index;

    return newData;
  },

  subfunction({
    name,
    description,
    function_id
  }) {
    const newData = {};
    if (name) newData.name = name;
    if (description) newData.description = description;
    if (function_id) newData.function_id = function_id;

    return newData;
  },

  function({
    name,
    description
  }) {
    const newData = {}
    if (name) newData.name = name;
    if (description) newData.description = description;

    return newData;
  },

  link({
    type,
    position_from,
    position_to
  }) {
    const newData = {};
    if (type) newData.type = type;
    if (position_from) newData.position_from = position_from;
    if (position_to) newData.position_to = position_to;

    return newData;
  },

  listOfLevels({
    list
  }) {
    //console.log()
    const newData = {}
    const newlist = list.map(el => {
      const newData = {};
      if (el.name) newData.name = el.name;
      if (el.index) newData.index = el.index;

      return newData;
    })

    newData.list = newlist;

    console.log(newData)
    return newData;
  },

  industry ({
    name,
    description,
    linkList
  }) {
    const newData = {};
    if (name) newData.name = name;
    if (description) newData.description = description;
    if (linkList) newData.linkList = linkList;

    return newData;
  }
}

export default {
  async objectListGet({ title }) {
    const url = `${server}/${title}`;
    const result = await requestMake({ url, method: 'GET'});
    return result ? result.result[`${title}List`] : false;
  },

  async readAllFunctionAvaible() {
    const url = `${server}/functions-avaibles`;
    const result = await requestMake({ url, method: 'GET'});
    return result ? result.result[`functionList`] : false;
  },

  async objectGetById({ title, id }) {
    const url = `${server}/${title}/${id}`;
    const result = await requestMake({ url, method: 'GET'});
    return result ? result.result[`${title}List`] : false;
  },

  async objectCreateNew({ title, data }) {
    const newData = checkObjectData[title](data);

    const url = `${server}/${title}`;
    const result = await requestMake({ url, method: 'POST', data: newData});
    return result ? result.result : false;
  },

  async objectUpdateById({ title, data, id }) {
    const newData = checkObjectData[title](data);

    const url = `${server}/${title}/${id}`;
    const result = await requestMake({ url, method: 'PUT', data: newData});
    return result ? result.result : false;
  },

  async objectDelete({ title, id }) {
    const url = `${server}/${title}/${id}`;
    const result = await requestMake({ url, method: 'DELETE'});
    return result ? true : false;
  },

  async linkGetByPositionId({ id }) {
    const url = `${server}/link_list/position_from/${id}`;
    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result.linkList : false;
  },

  async listOfLevelsCreate({ list }) {
    const url = `${server}/level_list`;
    const newData = checkObjectData.listOfLevels({ list });

    const result = await requestMake({ url, method: 'POST', data: newData });
    return result ? result.result.levelList : false;
  },

  async objectListGetByFunction({ title, functionName}) {
    const url = `${server}/${title}`;
    const result = await requestMake({ url, method: 'POST', data: { functionName }});
    return result ? result.result[`${title}List`] : false;
  }

}
