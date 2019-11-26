import api_config from '@/store/config/api_config.js';

const { server_url } = api_config;

const requestMake = async ({ url, method, data }) => {
  const unit = {
    method
  };
  let result;

  if (method === 'POST' || method === 'PUT') {
    unit.headers = { "Content-Type" : 'application/json' };
    if (data) unit.body = JSON.stringify(data);
  }

  unit.credentials = 'include';

  return fetch(url, unit)
    .then((res) => {
      if (res.ok) return res.json()
      throw new Error(`Response failed, status: ${res.status}`)
    })
    .then((res) => {
      console.log(res.success)
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
  register: ({
    email,
    password
  }) => {
    const data = {
      email,
      password
    }
    data.strategy = 'local';
    return data;
  },

  login: ({
    email,
    password
  }) => {
    const data = {
      email,
      password
    }
    data.strategy = 'local';
    return data;
  }

}

export default {
  async userRegister({ data }) {
    const url = `${server_url}/register`;

    const newData = validateData.register(data);

    const result = await requestMake({ url, method: 'POST', data: newData });
    return result ? result.result.user : false;
  },

  async userLogin({ data }) {
    const url = `${server_url}/login`;

    const newData = validateData.login(data);

    const result = await requestMake({ url, method: 'POST', data: newData });
    return result ? result.result.user : false;
  },

  async userLogout() {
    const url = `${server_url}/logout`;

    const result = await requestMake({ url, method: 'POST'});
    return result.success;
  },

  async userRegisterByEmail({ email }) {
    const url = `${server_url}/login-by-email`;

    const data = {
      email
    }

    const result = await requestMake({ url, method: 'POST', data});
    return result.result;
  }
}
