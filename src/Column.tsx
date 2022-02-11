import { useRef } from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { FC } from "react";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import { moveList, addTask } from "./state/actions";
import { useItemDrag } from "./utils/useItemDrag";
import { isHidden } from "./utils/isHidden";

//Define props as type:
type ColumnProps = {
    text: string
    // We’ll need this value to find the corresponding tasks.
    id: string
    isPreview?: boolean
};

//The below syntax is a short hand for:
// type ColumnProps = {
//     text: string
//     children?: React.ReactNode;
// }>

export const Column = ({ text, id, isPreview }: ColumnProps) => {
    const { draggedItem, getTasksByListId, dispatch } = useAppState();

    const tasks = getTasksByListId(id);
    const ref = useRef<HTMLDivElement>(null);

    const { drag } = useItemDrag({ type: "COLUMN", id, text });

    const [, drop] = useDrop({
        // The hover callback is triggered whenever you move the dragged item above the drop target
        accept: "COLUMN",
        hover() {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type === "COLUMN") {
                if (draggedItem.id === id) {
                    return
                }
                dispatch(moveList(draggedItem.id, id))
            }
        }
    });

    drag(drop(ref));

    return (
        <ColumnContainer
            isPreview={isPreview}
            ref={ref}
            isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
        >
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map((task) => (
                <Card text={task.text} key={task.id} id={task.id}/>
            ))}
            <AddNewItem
                toggleButtonText="+ Add another card"
                onAdd={(text) => dispatch(addTask(text, id))}
                dark
            />
        </ColumnContainer>
    )
}