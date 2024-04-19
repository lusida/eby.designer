import React from "react";
import { ReactNode } from "react";
import { IconFont } from "eby.d/components";

const DbTable: IWidget = {
    id: "dbdt",
    name: "dbd.widget.table",
    description: "dbd.widget.table.desc",
    icon: <IconFont type="icon-db-table" />,
    category: "dbd.widget.category.table",
    props: {
        name: {
            type: "string",
            default: "table",
            label: "dbd.widget.table.name.label",
            description: "dbd.widget.table.name.desc"
        },
        description: {
            type: "string",
            label: "dbd.widget.table.desc.label",
            description: "dbd.widget.table.desc.desc"
        }
    },
    render(): ReactNode {

        return <></>
    }
};

export default DbTable;