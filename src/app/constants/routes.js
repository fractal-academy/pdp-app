import { UserAll, UserShow } from 'domains/User/routes'
import { StudentAll } from 'domains/Student/routes'
import { CompanyAll, CompanyShow } from 'domains/Company/routes'
import { ProjectAll, ProjectShow } from 'domains/Project/routes'
import {
  TechnologyAll,
  TechnologyShow,
  TechnologyCreate
} from 'domains/Technology/routes'
import {
  CompetenceAll,
  CompetenceShow,
  CompetenceEdit,
  CompetenceCreate
} from 'domains/Competence/routes'
import { LevelEdit } from 'domains/Level/routes'
import { SkillCreate } from 'domains/Skill/routes'
import { SpecialityCreate } from 'domains/Speciality/routes'
import { PlanShow, PlanEdit, PlanCreate, PlanAll } from 'domains/Plan/routes'
import { MaterialCreate } from 'domains/Material/routes'
import { TodoCreate } from 'domains/Todo/routes'
import {
  InterviewAll,
  InterviewShow,
  InterviewEdit,
  InterviewCreate
} from 'domains/Interview/routes'

import { NotificationAll } from 'domains/Notification/routes'

import ChatModuleRoutes from 'chat-module'

import { NotFoundPath } from '~/components/NotFoundPath'
import { withProtect, withContent } from '~/components/HOC'

import { ROLES } from '~/constants'
import * as ROUTE_PATHS from './routePaths'

const ROUTES = {
  USERS_ALL: {
    component: withContent(withProtect({ roles: [ROLES.ADMIN] })(UserAll)),
    path: ROUTE_PATHS.USERS_ALL,
    exact: true
  },
  USER_SHOW: {
    component: withContent(UserShow),
    path: ROUTE_PATHS.USER_SHOW,
    exact: true
  },
  STUDENTS_ALL: {
    // protect: ['admin', 'mentor'],
    component: withContent(withProtect({ roles: [ROLES.MENTOR] })(StudentAll)),
    path: ROUTE_PATHS.STUDENTS_ALL,
    exact: true
  },
  COMPANIES_ALL: {
    component: withContent(withProtect({ roles: [ROLES.ADMIN] })(CompanyAll)),
    path: ROUTE_PATHS.COMPANIES_ALL,
    exact: true
  },
  COMPANY_SHOW: {
    component: withContent(withProtect({ roles: [ROLES.ADMIN] })(CompanyShow)),
    path: ROUTE_PATHS.COMPANY_SHOW
  },
  PROJECTS_ALL: {
    component: withContent(withProtect({ roles: [ROLES.ADMIN] })(ProjectAll)),
    path: ROUTE_PATHS.PROJECTS_ALL,
    exact: true
  },
  PROJECT_SHOW: {
    component: ProjectShow,
    path: ROUTE_PATHS.PROJECT_SHOW
  },
  TECHNOLOGIES_ALL: {
    component: withContent(
      withProtect({ roles: [ROLES.ADMIN] })(TechnologyAll)
    ),
    path: ROUTE_PATHS.TECHNOLOGIES_ALL,
    exact: true
  },
  TECHNOLOGY_CREATE: {
    component: withContent(
      withProtect({ roles: [ROLES.ADMIN] })(TechnologyCreate)
    ),
    path: ROUTE_PATHS.TECHNOLOGY_CREATE,
    exact: true
  },
  TECHNOLOGY_SHOW: {
    component: TechnologyShow,
    path: ROUTE_PATHS.TECHNOLOGY_SHOW,
    exact: true
  },
  COMPETENCES_ALL: {
    component: withContent(
      withProtect({ roles: [ROLES.ADMIN] })(CompetenceAll)
    ),
    path: ROUTE_PATHS.COMPETENCES_ALL,
    exact: true
  },
  COMPETENCE_SHOW: {
    component: CompetenceShow,
    path: ROUTE_PATHS.COMPETENCE_SHOW,
    exact: true
  },
  COMPETENCE_EDIT: {
    component: withContent(
      withProtect({ roles: [ROLES.ADMIN] })(CompetenceEdit)
    ),
    path: ROUTE_PATHS.COMPETENCE_EDIT
  },
  COMPETENCE_CREATE: {
    component: withContent(
      withProtect({ roles: [ROLES.ADMIN] })(CompetenceCreate)
    ),
    path: ROUTE_PATHS.COMPETENCE_CREATE
  },
  LEVEL_EDIT: {
    component: withContent(withProtect({ roles: [ROLES.ADMIN] })(LevelEdit)),
    path: ROUTE_PATHS.LEVEL_EDIT
  },
  SKILL_CREATE: {
    component: withContent(withProtect({ roles: [ROLES.ADMIN] })(SkillCreate)),
    path: ROUTE_PATHS.SKILL_CREATE
  },
  SPECIALITY_CREATE: {
    component: withContent(
      withProtect({ roles: [ROLES.ADMIN] })(SpecialityCreate)
    ),
    path: ROUTE_PATHS.SPECIALITY_CREATE
  },
  PLAN_ALL: {
    component: withProtect({ roles: [ROLES.STUDENT] })(PlanAll),
    path: ROUTE_PATHS.PLANS_ALL,
    exact: true
  },
  PLAN_CREATE: {
    component: withProtect({ roles: [ROLES.MENTOR] })(PlanCreate),
    path: ROUTE_PATHS.PLAN_CREATE
  },
  PLAN_SHOW: {
    component: withContent(withProtect({ roles: [ROLES.STUDENT] })(PlanShow)),
    path: ROUTE_PATHS.PLAN_SHOW,
    exact: true
  },
  PLAN_EDIT: {
    component: withContent(withProtect({ roles: [ROLES.MENTOR] })(PlanEdit)),
    path: ROUTE_PATHS.PLAN_EDIT
  },
  MATERIAL_CREATE: {
    component: withContent(
      withProtect({ roles: [ROLES.ADMIN] })(MaterialCreate)
    ),
    path: ROUTE_PATHS.MATERIAL_CREATE
  },
  TODO_CREATE: {
    component: withContent(withProtect({ roles: [ROLES.ADMIN] })(TodoCreate)),
    path: ROUTE_PATHS.TODO_CREATE
  },
  INTERVIEWS_ALL: {
    component: withContent(
      withProtect({ roles: [ROLES.MENTOR, ROLES.STUDENT] })(InterviewAll)
    ),
    path: ROUTE_PATHS.INTERVIEWS_ALL,
    exact: true
  },
  INTERVIEW_CREATE: {
    component: withContent(
      withProtect({ roles: [ROLES.ADMIN] })(InterviewCreate)
    ),
    path: ROUTE_PATHS.INTERVIEW_CREATE
  },
  INTERVIEW_EDIT: {
    component: withContent(
      withProtect({ roles: [ROLES.ADMIN, ROLES.MENTOR, ROLES.STUDENT] })(
        InterviewEdit
      )
    ),
    path: ROUTE_PATHS.INTERVIEW_EDIT,
    exact: true
  },

  INTERVIEW_SHOW: {
    component: withContent(
      withProtect({ roles: [ROLES.MENTOR, ROLES.STUDENT] })(InterviewShow)
    ),
    path: ROUTE_PATHS.INTERVIEW_SHOW
  },
  NOTIFICATIONS_ALL: {
    component: NotificationAll,
    path: ROUTE_PATHS.NOTIFICATIONS_ALL
  },
  NOT_FOUND_PATH: {
    component: withContent(NotFoundPath),
    path: ROUTE_PATHS.NOT_FOUND_PATH
  },
  CHAT_MODULE: {
    Component: ChatModuleRoutes
  }
}

const ROUTES_VALUES = Object.values(ROUTES)
const ROUTES_KEYS = Object.keys(ROUTES)

export default ROUTES
export { ROUTES_VALUES, ROUTES_KEYS }
