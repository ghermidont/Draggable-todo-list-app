export type Action =
    | {
    type: "ADD_LIST"
    payload: string
}
    | {
    type: "ADD_TASK"
    payload: { text: string; listId: string }
}

//We could also define define the types in the union using the interface syntax:
// interface AddListAction {
//     type: "ADD_LIST"
//     payload: string
// }
// interface AddTaskAction {
//     type: "ADD_LIST"
//     payload: { text: string; listId: string }
// }
// type Action = AddListAction | AddTaskAction

//It would work same way.