import instance from './../config/axiosConfig';

export default {
  dictionaries: {
    createDictionary: data =>
      instance
        .post(`orgs/${data.owner}/collections/`, data)
        .then(response => response.data)
        /* eslint-disable */
        .then(() => { 
          return instance.post(`orgs/${data.owner}/sources/`, data);
        }),

    createDictionaryUser: data =>
      instance
        .post('user/collections/', data)
        .then(response => response.data)
        .then(() => {
          return instance.post('user/sources/', data);
        }),

    fetchingDictionaries: () =>
      instance
      .get(`collections/?q=${''}&limit=${1000}&page=${1}&verbose=true`)
      .then(payload => payload.data),
      
    searchDictionaries: (searchTerm) =>
      instance
      .get(`collections/?q=${searchTerm}&limit=${1000}&page=${1}&verbose=true`)
      .then(payload => payload.data)
  },
  organizations: {
    fetchOrganizations: () =>
      instance
        .get(`users/${localStorage.username}/orgs/`)
        .then(response => response.data),
  },
};
