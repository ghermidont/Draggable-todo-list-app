import { ColumnContainer, ColumnTitle } from "./styles";
import { FC } from "react";

//Define props as type:
type ColumnProps = {
    text: string;
};

//The below syntax is a short hand for:
// type ColumnProps = {
//     text: string
//     children?: React.ReactNode;
// }>

export const Column: FC<ColumnProps> = ( { text, children } ) => {
    return (
        <ColumnContainer>
            <ColumnTitle> {text} </ColumnTitle>
            {children}
        </ColumnContainer>
    );
}