import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { boardsActions } from "./slices/boardsSlice";
import { tasksActions } from "./slices/tasksSlice";

const APPLICATION_ACTIONS = {
  ...tasksActions,
  ...boardsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(APPLICATION_ACTIONS, dispatch);
  }, [dispatch]);
};
