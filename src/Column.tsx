import { ColumnContainer, ColumnTitle } from "./styles";
import { FC } from "react";

//Define props as type:
type ColumnProps = {
    text: string;
};

export const Column = ( { text }: ColumnProps ) => {
    return (
        <ColumnContainer>
            <ColumnTitle>
                Column Title
            </ColumnTitle>
        </ColumnContainer>
    );
}