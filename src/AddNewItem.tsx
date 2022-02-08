import { useState} from "react";
import { AddItemButton } from "./styles";

type AddNewItemProps = {
    onAdd(text: string): void //this represents a callback function tht will be called when we click the Create item button.
    toggleButtonText: string
    dark?: boolean // this is a flag that we will pass to the styled component.
}

export const AddNewItem = (props: AddNewItemProps) => {
    const [showForm, setShowForm] = useState(false);
    const { onAdd, toggleButtonText, dark } = props;
    if (showForm) {
// We show item creation form here
    }
    return (
        <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    )
}
