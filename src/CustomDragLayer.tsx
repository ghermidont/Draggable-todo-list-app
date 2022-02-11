import { useDragLayer } from "react-dnd"; //provides us the information about the dragged item.
import { Column } from "./Column"; //it is going to be our dragged element.
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles"; //is our dragging layer, we’ll render the dragging
//preview inside of it.
import { useAppState } from "./state/AppStateContext"; //we will get the draggedItem from it.

export const CustomDragLayer = () => {
    const { draggedItem } = useAppState()
    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset()
    }))
    return draggedItem && currentOffset ? (
        <DragPreviewWrapper position={currentOffset}>
            <Column
                id={draggedItem.id}
                text={draggedItem.text}
                isPreview
            />
        </DragPreviewWrapper>
    ) : null
};



