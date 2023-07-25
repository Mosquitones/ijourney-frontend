import userGroupsMethods from './UserGroups'
import userGroupsFeide from './UserGroups.feide'
import userGroupsIdMethods from './UserGroups.id'
import userGroupsIdChangeState from './UserGroups.id.changeState'
import userGroupsPaginated from './UserGroups.paginated'

export const UserGroupServices = {
  ...userGroupsMethods,
  id: {
    ...userGroupsIdMethods,
    changeState: userGroupsIdChangeState,
  },
  ...userGroupsPaginated,
  feide: userGroupsFeide,
}

export * from './UserGroups.types'
