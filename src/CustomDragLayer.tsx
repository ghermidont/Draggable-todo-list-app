import React from "react";
import { useDragLayer } from "react-dnd"; //provides us the information about the dragged item.
import { Column } from "./Column"; //it is going to be our dragged element.
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles"; //is our dragging layer, we’ll render the dragging
//preview inside of it.
import { useAppState } from "./state/AppStateContext"; //we will get the draggedItem from it.
import { Card } from "./Card";

export const CustomDragLayer = () => {
    const { draggedItem } = useAppState();
    const { currentOffset } = useDragLayer(
        (monitor) => ({
                currentOffset: monitor.getSourceClientOffset()
            }));

    return draggedItem && currentOffset ? (
        <CustomDragLayerContainer>
            <DragPreviewWrapper position={currentOffset}>
                {draggedItem.type === "COLUMN" ? (
                    <Column
                        id={draggedItem.id}
                        text={draggedItem.text}
                        isPreview
                    />
                ) : (
                    <Card
                        id={draggedItem.id}
                        columnId={draggedItem.columnId}
                        text={draggedItem.text}
                        isPreview
                    />
                )}
            </DragPreviewWrapper>
        </CustomDragLayerContainer>
    ) : null
};



