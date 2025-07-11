import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { tasksActions } from "./tasksSlice.ts";
const APPLICATION_ACTIONS = {
  ...tasksActions,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(APPLICATION_ACTIONS, dispatch);
};
