import React from "react";
import { ReactNode } from "react";
import { IconFont } from "eby.d/components";

const DbView: IWidget = {
    id: "dbdv",
    name: "dbd.widget.view",
    description: "dbd.widget.view.desc",
    icon: <IconFont type="icon-db-view" />,
    category: "dbd.widget.category.view",
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

export default DbView;