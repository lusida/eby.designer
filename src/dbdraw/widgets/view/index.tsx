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
            default: "view",
            label: "dbd.widget.view.name.label",
            description: "dbd.widget.view.name.desc"
        },
        description: {
            type: "string",
            label: "dbd.widget.view.desc.label",
            description: "dbd.widget.view.desc.desc"
        }
    },
    render(): ReactNode {

        return <></>
    }
};

export default DbView;