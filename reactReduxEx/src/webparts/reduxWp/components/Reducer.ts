import { actionTypes, IAction } from './Action';
import {IApplicationState} from './IApplicationState';

const initialState: IApplicationState = {
  count: 0,
};

export default (state: IApplicationState = initialState, action: IAction) => {
  switch(action.type) {
    case actionTypes.INCREMENT:
      return {
        count: state.count + 1
      };
    case actionTypes.DECREMENT:
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
};

