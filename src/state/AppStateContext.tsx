import { createContext, useContext, Dispatch, FC } from "react";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { DragItem } from "../DragItem";
const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

type AppStateContextProps = {
    draggedItem: DragItem | null
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

//Inside this hook, we’ll get the value from the AppStateContext using the useContext hook and return the result.
//We don’t need to specify the types, because TypeScript can derive them automatically based on AppStateContext type.
export const useAppState = () => {
    return useContext(AppStateContext)
};

export const AppStateProvider: FC = ({ children }) => {
    // Here we get the state value from the reducer and also we provide the dispatch method through the context.
    const [state, dispatch] = useImmerReducer(appStateReducer, appData);

    const { draggedItem, lists } = state;
    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || [];
    }
    return (
        <AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
};


//Delete the following lines.
const appData: AppState = {
    draggedItem: null,
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
};