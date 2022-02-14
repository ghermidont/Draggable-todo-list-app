//This is a HOC (Higher Order Component);
import { useState, useEffect, ComponentType } from "react";
import { AppState } from "./state/appStateReducer";

//define a type that will represent the props that we are injecting.
type InjectedProps = {
    initialState: AppState
}

//Define a withInitialState function that accepts a WrappedComponent argument.
//The WrappedComponent accepts an intersection type that contains the props from the type variable TProps and the props defined in the InjectedProps.
export function withInitialState<TProps>(WrappedComponent: ComponentType<TProps & InjectedProps>) {
    //We return a nameless function component.
    return (props: Omit<TProps, keyof InjectedProps>) => {
        const [initialState, setInitialState] = useState<AppState>({
            lists: [],
            draggedItem: null
        })
// ...
        return (
            <WrappedComponent
                {...props as TProps}
                initialState={initialState}
            />
        )
    }
}