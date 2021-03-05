import ROUTE_PATHS from './routePaths'
import { SessionLogin, SessionRegister } from 'domains/Session/routes'
import { UserAll, UserShow } from 'domains/User/routes'
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
  InterviewShow,
  InterviewEdit,
  InterviewCreate
} from 'domains/Interview/routes'
import { NotificationAll } from 'domains/Notification/routes'

const ROUTES = {
  SESSION_LOGIN: {
    component: SessionLogin,
    path: ROUTE_PATHS.SESSION_LOGIN
  },
  SESSION_REGISTRATION: {
    component: SessionRegister,
    path: ROUTE_PATHS.SESSION_REGISTRATION
  },
  USERS_ALL: {
    // protect: ['admin', 'mentor'],
    component: UserAll,
    path: ROUTE_PATHS.USERS_ALL,
    exact: true
  },
  USER_SHOW: {
    component: UserShow,
    path: ROUTE_PATHS.USER_SHOW
  },
  COMPANIES_ALL: {
    //protect: ['admin'],
    component: CompanyAll,
    path: ROUTE_PATHS.COMPANIES_ALL,
    exact: true
  },
  COMPANY_SHOW: {
    //  protect: ['admin'],
    component: CompanyShow,
    path: ROUTE_PATHS.COMPANY_SHOW
  },
  PROJECTS_ALL: {
    //  protect: ['admin'],
    component: ProjectAll,
    path: ROUTE_PATHS.PROJECTS_ALL,
    exact: true
  },
  PROJECT_SHOW: {
    //protect: ['admin', 'mentor'],
    component: ProjectShow,
    path: ROUTE_PATHS.PROJECT_SHOW
  },
  TECHNOLOGIES_ALL: {
    // protect: ['admin'],
    component: TechnologyAll,
    path: ROUTE_PATHS.TECHNOLOGIES_ALL,
    exact: true
  },
  TECHNOLOGY_SHOW: {
    component: TechnologyShow,
    path: ROUTE_PATHS.TECHNOLOGY_SHOW
  },
  TECHNOLOGY_CREATE: {
    //protect: ['admin'],
    component: TechnologyCreate,
    path: ROUTE_PATHS.TECHNOLOGY_CREATE
  },
  COMPETENCES_ALL: {
    component: CompetenceAll,
    path: ROUTE_PATHS.COMPANIES_ALL,
    exact: true
  },
  COMPETENCE_SHOW: {
    component: CompetenceShow,
    path: ROUTE_PATHS.COMPETENCE_SHOW
  },
  COMPETENCE_EDIT: {
    // protect: ['admin'],
    component: CompetenceEdit,
    path: ROUTE_PATHS.COMPETENCE_EDIT
  },
  COMPETENCE_CREATE: {
    // protect: ['admin'],
    component: CompetenceCreate,
    path: ROUTE_PATHS.COMPETENCE_CREATE
  },
  LEVEL_EDIT: {
    // protect: ['admin'],
    component: LevelEdit,
    path: ROUTE_PATHS.LEVEL_EDIT
  },
  SKILL_CREATE: {
    //  protect: ['admin'],
    component: SkillCreate,
    path: ROUTE_PATHS.SKILL_CREATE
  },
  SPECIALITY_CREATE: {
    // protect: ['admin'],
    component: SpecialityCreate,
    path: ROUTE_PATHS.SPECIALITY_CREATE
  },
  PLAN_ALL: {
    component: PlanAll,
    path: ROUTE_PATHS.PLAN_ALL,
    exact: true
  },
  PLAN_SHOW: {
    component: PlanShow,
    path: ROUTE_PATHS.PLAN_SHOW
  },
  PLAN_CREATE: {
    component: PlanCreate,
    path: ROUTE_PATHS.PLAN_CREATE
  },
  PLAN_EDIT: {
    //   protect: ['mentor', 'admin'],
    component: PlanEdit,
    path: ROUTE_PATHS.PLAN_EDIT
  },
  MATERIAL_CREATE: {
    //  protect: ['admin'],
    component: MaterialCreate,
    path: ROUTE_PATHS.MATERIAL_CREATE
  },
  TODO_CREATE: {
    //  protect: ['admin'],
    component: TodoCreate,
    path: ROUTE_PATHS.TODO_CREATE
  },
  INTERVIEW_SHOW: {
    component: InterviewShow,
    path: ROUTE_PATHS.INTERVIEW_SHOW
  },
  INTERVIEW_EDIT: {
    // protect: ['admin', 'mentor'],
    component: InterviewEdit,
    path: ROUTE_PATHS.INTERVIEW_EDIT
  },
  INTERVIEW_CREATE: {
    // protect: ['mentor'],
    component: InterviewCreate,
    path: ROUTE_PATHS.INTERVIEW_CREATE
  },
  NOTIFICATIONS_ALL: {
    component: NotificationAll,
    path: ROUTE_PATHS.NOTIFICATIONS_ALL
  }
}

const ROUTES_VALUES = Object.values(ROUTES)
const ROUTES_KEYS = Object.keys(ROUTES)

export default ROUTES
export { ROUTES_VALUES, ROUTES_KEYS }
