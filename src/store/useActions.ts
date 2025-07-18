import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { tasksActions } from "./slices/tasksSlice.ts";
import { boardsActions } from "./slices/boardsSlice.ts";

const APPLICATION_ACTIONS = {
  ...tasksActions,
  ...boardsActions,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(APPLICATION_ACTIONS, dispatch);
};
