import React from "react";

import{ Column } from "./Column";
import{ AppContainer } from "./styles";
import{ AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";

export const App = () => {
    const { lists } = useAppState()
    return (
        <AppContainer>
            {/*/!*We dont have to specify the type of the loop variable list. TypeScript derived it automatically.*/}
            {lists.map((list) => (
                // We will use the id to find the corresponding tasks in the context.
                <Column text={list.text} key={list.id} id={list.id} />
            ))}
            <AddNewItem
                toggleButtonText="+ Add another list"
                onAdd={console.log}
            />
        </AppContainer>
    )
};

export default App;