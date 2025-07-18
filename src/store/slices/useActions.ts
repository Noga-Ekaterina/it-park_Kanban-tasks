import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { tasksActions } from "./tasksSlice.ts";
import { boardsActions } from "./boardsSlice.ts";

const APPLICATION_ACTIONS = {
  ...tasksActions,
  ...boardsActions,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(APPLICATION_ACTIONS, dispatch);
};
