import { createContext, useContext, FC } from "react";

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

type AppStateContextProps = {
    lists: List[]
    getTasksByListId(id: string): Task[]
}

//Inside this hook, we’ll get the value from the AppStateContext using the useContext hook and return the result.
//We don’t need to specify the types, because TypeScript can derive them automatically based on AppStateContext type.
export const useAppState = () => {
    return useContext(AppStateContext)
};

export const AppStateProvider: FC = ({ children }) => {
    const { lists } = appData;
    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || [];
    }
    return (
        <AppStateContext.Provider value={{ lists, getTasksByListId }}>
            {children}
        </AppStateContext.Provider>
    );
};


//Delete the following lines.
const appData: AppState = {
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
}

type Task = {
    id: string
    text: string
}
type List = {
    id: string
    text: string
    tasks: Task[]
}
export type AppState = {
    lists: List[]
}