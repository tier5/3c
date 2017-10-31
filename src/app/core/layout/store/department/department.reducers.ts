import * as DepartmentActions from './department.actions';
import * as AgentActions from '../agent/agent.actions';

export interface DepartmentState {
  list: any;
  toEdit: any;
  resetDepartmentForm: boolean;
  newDepartmentId: number;
  newDepartmentName:string;
  preDelete: any;
}

const initialState: DepartmentState = {
  list: [],
  toEdit: {},
  resetDepartmentForm: false,
  newDepartmentId: 0,
  preDelete: [],
    newDepartmentName: ''
};

export function departmentReducer(state = initialState, action: DepartmentActions.DepartmentActions) {
  switch (action.type) {
    case (DepartmentActions.ADD_DEPARTMENT_SUCCESS):
      return {
        ...state,
        list: [ ...state.list, action.payload ],
        newDepartmentId: action.payload.id,
        newDepartmentName: action.payload.department_name,
        resetDepartmentForm: true
      };
    case (DepartmentActions.EDIT_DEPARTMENT_SUCCESS):
      const index = state.list.indexOf(dep => dep.id === action.payload.id);
      const someDep = state.list[index];
      const updatedDep = { ...someDep, ...action.payload };
      const deps = [...state.list];
      deps[index] = updatedDep;
      return {
        ...state,
        list: [ ...state.list, ...deps ],
      };
    case (DepartmentActions.GET_DEPARTMENT_LIST_SUCCESS):
      return {
        ...state,
        list: [ ...action.payload ]
      };
    case (DepartmentActions.RESET_DEPARTMENT_FORM):
      return {
        ...state,
        resetDepartmentForm: false
      };
    case (DepartmentActions.GET_TO_EDIT_DEPARTMENT_SUCCESS):
      // console.log(action.payload);
      return {
        ...state,
        toEdit: { ...action.payload }
      };
      case (DepartmentActions.RESET_EDIT_DEPARTMENT):
        return {
            ...state,
            toEdit : {}
        };
    case (DepartmentActions.PRE_DELETE_SUCCESS):
      return {
        ...state,
        preDelete: action.payload,
      };
    case (DepartmentActions.DEPARTMENT_DELETE_SUCCESS):
      const deleteIndex = state.list.findIndex(department => department.id === action.payload);
      const deleteData = [...state.list];
      deleteData.splice(deleteIndex, 1);
      return {
        ...state,
        list: [...deleteData ]
      };
    default:
      return state;
  }
}
