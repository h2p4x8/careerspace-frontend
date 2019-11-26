import api_config from '@/store/config/api_config.js';

const { server_url } = api_config;

const requestMake = async ({ url, method, data, is_file, filename }) => {
  const unit = {
    method
  };
  let result;

  if (method === 'POST' || method === 'PUT') {
    if (is_file) {
      // unit.headers = { 'Content-Type': data.type };
      let formData = new FormData();
      formData.append(filename, data);
      unit.body = formData;
    } else {
      unit.headers = { "Content-Type" : 'application/json' };
      if (data) unit.body = JSON.stringify(data);
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



const validateData = {
  userInfo({
    email,
    fullName,
    position,
    company,
    functions,
    industry,
    url,
  }){
    const newData = {};
    if (email) newData.email = email;
    if (typeof fullName != 'undefined') newData.fullName = fullName;
    if (position) newData.position = position;
    if (company) newData.company = company;
    if (functions ? functions.length > 0 : false) newData.functions = functions;
    if (industry ? industry.length > 0 : false) newData.industry = industry;
    console.log(newData)
    return newData;
  },

  userProfile({
    description,
    url,
    telegram,
    readyToMeeting
  }){
    const newData = {};
    if (typeof description != 'undefined') newData.description = description;
    if (url) newData.url = url;
    if (typeof telegram != 'undefined') newData.telegram = telegram;
    if (typeof readyToMeeting != 'undefined') newData.readyToMeeting = readyToMeeting;

    return newData;
  },

  userJob({
    companyName,
    positionName,
    functions,
    industry,
    order,
    id
  }){
    const newData = {};
    if (positionName) newData.positionName = positionName;
    if (companyName) newData.companyName = companyName;
    if (typeof order != "undefined") newData.order = order;
    if (id) newData.id = id;
    if (functions ? functions.length > 0 : false) newData.functions = functions;
    if (industry ? industry.length > 0 : false) newData.industry = industry;
    return newData;
  },
}

export default {
  async getUserInfo() {
    const url = `${server_url}/user`;

    const result = await requestMake({ url, method: 'GET'});
    return result ? result.result.user : false;
  },
  async getUserVacancyReplyList() {
    const url = `${server_url}/user-replied-vacancies`;

    const result = await requestMake({ url, method: 'GET'});
    return result ? result.result.replyList : false;
  },
  async updateUserInfo({ data }) {
    console.log()
    const url = `${server_url}/user`;

    const newData = validateData.userInfo(data);

    const result = await requestMake({ url, method: 'PUT', data: newData});

    return result ? result.result.user : false;
  },
  async userChangeAvatar({ file }) {
    const url = `${server_url}/user/avatar`;
    const result = requestMake({ url, method: 'POST', data: file, is_file: true, filename: 'avatar'});

    return result;
  },
  async userChangePass({ data }) {
    const url = `${server_url}/user-change-pass`;
    const result = await requestMake({ url, method: 'POST', data});
    return result.success;
  },
  async userGeneratePass({ data }) {
    const url = `${server_url}/user-generate-new-pass`;
    const result = await requestMake({ url, method: 'POST', data});
    return result.success;
  },
  async cancelSubscription() {
    const url = `${server_url}/payment-cancel`;
    const result = await requestMake({ url, method: 'GET'});
    return result.success;
  },
  async getUserCVList() {
    const url = `${server_url}/user-cv-list`;

    const result = await requestMake({ url, method: 'GET'});
    return result ? result.result.cvList : false;
  },
  async checkUrlAvailability({ urlName }){
    const url = `${server_url}/profile/availability/${urlName}`;

    const result = await requestMake({ url, method: 'GET' });
    return result ? true : false;
  },

  async createUserProfile({ data }) {
    const url = `${server_url}/profile/create`;

    const result = await requestMake({ url, method: 'POST', data });
    return result ? true : false;
  },
  async readUserProfile({ urlName }){
    const url = `${server_url}/profile/${urlName}`;
    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result : false;
  },

  async updateUserProfile({ data }){
    const url = `${server_url}/profile/update`;

    const newData  = validateData.userProfile(data);

    const result = await requestMake({ url, method: 'PUT', data: newData });
    return result ? true : false;
  },
  async createNewJob({ data }){
    const url = `${server_url}/profile/user-job/create`;

    const newData  = validateData.userJob(data);

    const result = await requestMake({ url, method: 'POST', data: newData });
    return result ? true : false;
  },

  async readUserJob({ id }){
    const url = `${server_url}/profile/user-job/read/${id}`;

    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result.job : false;

  },

  async updateUserJob({ data, id }){
      const url = `${server_url}/profile/user-job/update/${id}`;
      console.log(data)
      const newData  = validateData.userJob(data);
      console.log(newData)
      const result = await requestMake({ url, method: 'PUT', data: newData });
      return result ? true : false;
  },

  async userChangePersonalImage({ file }) {
    const url = `${server_url}/profile/personal-image`;
    const result = requestMake({ url, method: 'POST', data: file, is_file: true, filename: 'personal-image'});

    return result;
  },

  async updateJobAll({ list }){
    const url = `${server_url}/profile/user-job/update-list`;

    const newData = list.map(el => validateData.userJob(el))

    const result = await requestMake({ url, method: 'PUT', data: { list: newData }});

    return result ? true : false;
  },
  async readAllUserProfile(){
    const url = `${server_url}/profile`;
    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result : false;
  },

  async usersProfileGetFiltered({data}) {
    const url = `${server_url}/profiles-filter`;
    const newData = {}
    if (data.industry ? data.industry.length > 0 : false) newData.industry = data.industry;
    if (data.functions ? data.functions.length > 0 : false) newData.functions = data.functions;
    const result = await requestMake({ url, method: 'POST', data: newData });
    return result ? result : false;
  },

  async deleteUserJob({ id }) {
    const url = `${server_url}/profile/user-job/delete/${id}`;
    const result = await requestMake({ url, method: 'DELETE' });
    return result ? true : false;
  },

  async readAllUserJob(){
    const url = `${server_url}/profile/user-job/read`;
    const result = await requestMake({ url, method: 'GET' });
    return result ? result.result.job : false;
  }
}
