import { api } from 'services'

const putUsersFromFeide = () => {
  return api.put('/user-groups/feide/user-group')
}

export default {
  put: putUsersFromFeide,
}
