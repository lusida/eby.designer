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
            default: "database",
            label: "eby.property.name",
            description: "eby.property.name.desc"
        },
        description: {
            type: "string",
            label: "eby.property.description",
            description: "eby.property.description.desc"
        }
    },
    render(): ReactNode {

        return <></>
    }
};

export default DbTable;