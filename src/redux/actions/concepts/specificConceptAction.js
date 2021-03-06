import instance from '../../../config/axiosConfig';

import { isErrored, fetchConcepts, isFetching } from './ConceptActionCreators';

const fetchConceptsActionTypes = (
  owner,
  name,
  query = '',
  limit = 25,
  page = 1,
) => async (dispatch) => {
  dispatch(isFetching(true));
  const url = `orgs/${owner}/sources/${name}/concepts/?q=${query}&limit=${limit}&page=${page}`;
  try {
    const response = await instance.get(url);
    dispatch(fetchConcepts(response.data));
    dispatch(isFetching(false));
  } catch (error) {
    dispatch(isFetching(false));
    if (error.response) {
      dispatch(isErrored(error.response.data));
      dispatch(isFetching(false));
    } else if (error.request) {
      dispatch(isErrored("Request can't be made"));
      dispatch(isFetching(false));
    }
  }
};
export default fetchConceptsActionTypes;
