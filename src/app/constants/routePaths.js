import { ROLES } from '~/constants'

// Session route path
export const SESSION_LOGIN = '/login'
export const SESSION_REGISTRATION = '/registration'

// User route path
export const USERS_ALL = '/users'
export const USER_SHOW = '/users/:id'

// Companies route path
export const COMPANIES_ALL = '/companies'
export const COMPANY_SHOW = '/companies/:id'

// Project route path
export const PROJECTS_ALL = '/projects'
export const PROJECT_SHOW = '/projects/:id'

// Technology route path
export const TECHNOLOGIES_ALL = '/technologies'
export const TECHNOLOGY_SHOW = '/technologies/:id'
export const TECHNOLOGY_CREATE = '/technologies/create'

// Competence route path
export const COMPETENCES_ALL = '/competences'
export const COMPETENCE_SHOW = '/competences/:id'
export const COMPETENCE_EDIT = '/competences/:id/edit'
export const COMPETENCE_CREATE = '/competences/create'

// Level route path
export const LEVEL_EDIT = '/level/:id/edit'

// Skill route path
export const SKILL_CREATE = '/skill/create'

// Speciality route path
export const SPECIALITY_CREATE = '/speciality/create'

// Plan route path
export const PLANS_ALL = '/plans'
export const PLAN_SHOW = '/plans/:id'
export const PLAN_CREATE = '/plans/create'
export const PLAN_EDIT = '/plans/:id/edit'

// Material route path
export const MATERIAL_CREATE = '/material/create'

// Todo route path
export const TODO_CREATE = '/todo/create'

// Interview route path
export const INTERVIEW_SHOW = '/interview/:id'
export const INTERVIEW_EDIT = '/interview/:id/edit'
export const INTERVIEW_CREATE = '/interview/create'

// Notification route path
export const NOTIFICATIONS_ALL = '/notifications'

// NotFoundPath route path
export const NOT_FOUND_PATH = '/404'

// Start page for roles
export const START_PAGE_MAP = {
  [ROLES.ADMIN]: USERS_ALL,
  [ROLES.MENTOR]: USERS_ALL,
  [ROLES.STUDENT]: PLANS_ALL
}
