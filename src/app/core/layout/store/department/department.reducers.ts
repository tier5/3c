import * as DepartmentActions from './department.actions';

export interface DepartmentState {
  list: any,
  toEdit: any,
  resetDepartmentForm: boolean
}

const initialState: DepartmentState = {
  list: [],
  toEdit: {},
  resetDepartmentForm: false
};

export function departmentReducer(state = initialState, action: DepartmentActions.DepartmentActions) {
  switch (action.type) {
    case (DepartmentActions.ADD_DEPARTMENT_SUCCESS):
      return {
        ...state,
        list: [ ...state.list, action.payload ],
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
      return {
        ...state,
        toEdit: { ...action.payload }
      };
    default:
      return state;
  }
}
