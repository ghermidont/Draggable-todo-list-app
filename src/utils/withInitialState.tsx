//This is a HOC (Higher Order Component);
import React, { useState, useEffect } from "react";
import { AppState } from "../state/appStateReducer";
import { load } from "../api";

//define a type that will represent the props that we are injecting.
type InjectedProps = {
    initialState: AppState
}

//To help TypeScript to figure out the correct types and define an additional type PropsWithoutInjected.
/*This is a generic type that accepts the TBaseProps type variable that will represent
the original props type of the wrapped component. We use Omit to remove the fields
of the InjectedProps type from it.*/
type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>

//Define a withInitialState function that accepts a WrappedComponent argument.
//The WrappedComponent accepts an intersection type that contains the props from the type variable TProps and the props defined in the InjectedProps.
export function withInitialState<TProps>(WrappedComponent: React.ComponentType<PropsWithoutInjected<TProps> & InjectedProps>) {
    /*
    This component should not accept the prop that we inject using this HOC. We don’t
    want to let the user provide this prop, because our HOC already does it. This is why
    we use a utility type Omit. It allows us to create a new type that won’t have the keys
    of the InjectedProps type.
        The utility type Omit constructs a new type removing the keys that you provide to it:
        type Book = {
            title: string;
            length: number;
            author: string;
            description: string;
        }
    type BookWithoutDescription = Omit<Book, "description">;

     type BookWithoutDescription = {
        title: string
        length: number
        author: string
     }
     */

    //We return a nameless function component.
    return (props: PropsWithoutInjected<TProps>) => {
        const [initialState, setInitialState] = useState<AppState>({
            lists: [],
            draggedItem: null
        });
        /*
        The query keyOf returns a union type that contains the keys of the type that you pass
        to it, for example:
        type Book = {
            title: string;
            length: number;
            author: string;
        }
        type BookKeys = keyof Book; // "title" | "length" | "author"
        */

        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<Error | undefined>();

        useEffect(() => {
            const fetchInitialState = async () => {
                try {
                    const data = await load();
                    setInitialState(data);
                } catch (e: any) {
                    setError(e);
                }
                setIsLoading(false);
            };
            fetchInitialState();
        }, []);

        if (isLoading) {
            return <div>Loading</div>;
        }
        if (error) {
            return <div>{error.message}</div>;
        }

        return (
            <WrappedComponent {...props} initialState={initialState} />
        );
    };
}