export const GET_BACKLOG_TASKS = "GET_BACKLOG_TASKS"
export const SET_BACKLOG_FILTER = "SET_BACKLOG_FILTER"
export const CLEAR_BACKLOG_FILTER = "CLEAR_BACKLOG_FILTER"

export const SET_BACKLOG_VIEW_TYPE = "SET_BACKLOG_VIEW_TYPE"

export const SET_BACKLOG_OPENED_TASK = "SET_BACKLOG_OPENED_TASK"
export const CLEAR_OPENED_TASK = "CLEAR_OPENED_TASK"
export const SET_OPENED_TASK_NAME = "SET_OPENED_TASK_NAME"
export const SET_OPENED_TASK_TYPE = "SET_OPENED_TASK_TYPE"
export const SET_OPENED_TASK_STATUS = "SET_OPENED_TASK_STATUS"
export const SET_OPENED_TASK_SUMMARY = "SET_OPENED_TASK_SUMMARY"
export const SET_OPENED_TASK_DESCRIPTION = "SET_OPENED_TASK_DESCRIPTION"
export const SET_OPENED_TASK_ASSING_TO = "SET_OPENED_TASK_ASSING_TO"

export const viewTypes = [
    {
        id: "ALL",
        name: "ВСЕ"
    },
    {
        id: "STORY",
        name: "ИСТОРИИ"
    },
    {
        id: "BUG",
        name: "БАГИ"
    },
    {
        id: "RESEARCH",
        name: "АНАЛИЗЫ"
    },
];

export const taskType = [
    {
        id: "STORY",
        name: "ИСТОРИЯ"
    },
    {
        id: "BUG",
        name: "БАГ"
    },
    {
        id: "RESEARCH",
        name: "АНАЛИЗ"
    },
];