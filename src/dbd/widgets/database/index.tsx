import React from "react";
import { ReactNode } from "react";
import { IconFont } from "eby.d/components";

const Db: IWidget = {
    id: "dbd",
    name: "dbd.widget.database",
    description: "dbd.widget.database.desc",
    icon: <IconFont type="icon-database" />,
    category: "dbd.widget.category.database",
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

export default Db;