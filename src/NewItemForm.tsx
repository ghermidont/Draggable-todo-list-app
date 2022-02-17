import React, { useState } from "react";
import { NewItemFormContainer } from "./styles";
import { NewItemButton } from "./styles";
import { NewItemInput } from "./styles";
import { useFocus } from "./utils/useFocus";

type NewItemFormProps = {
    onAdd(text: string): void //onAdd is a callback passed through AddNewItemProps
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
    const [text, setText] = useState("");
    const inputRef = useFocus();

    const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onAdd(text);
        }
    };

    return (
        <NewItemFormContainer>
            {/*We pass the reference that we get from the useFocus hook to our input element*/}
            <NewItemInput
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyPress={handleAddText}
            />
            {/*we don’t have to provide any type for the event argument of our onChange*/}
            {/*callback. TypeScript gets the type from React type definitions.*/}
            <NewItemButton onClick={() => onAdd(text)}>
                Create
            </NewItemButton>
        </NewItemFormContainer>
    );
};

