// @ts-ignore
import VirtualList from 'react-virtual-list';
import React from "react";

export type ListItem = {
    virtual: {
        style: React.CSSProperties,
        items: {
            id: string
        }[]
    }
    itemHeight: number
}

const MyList = ({
                    virtual, itemHeight,
                }: ListItem) => (
    <ul style={virtual.style}>
        {virtual.items.map(item => (
            <li key={`item_${item.id}`} style={{height: itemHeight}}>
                Lorem ipsum dolor sit amet
            </li>
        ))}
    </ul>
)

export const MyVirtualList = VirtualList()(MyList);
