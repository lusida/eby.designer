import React from "react";
import { ReactNode } from "react";

class WidgetContext implements IWidgetContext {
    constructor(schema: ISchema) {
        this.design = true;
        this.schema = schema;
        this.props = {};
        this.designProps = {};
    }
    design: boolean;
    schema: ISchema;
    props: { [key: string]: any; };
    designProps: { [key: string]: any; };
    render(s: ISchema): ReactNode {
        console.log("render", s);

        return <></>;
    }
    renderChildren(): ReactNode {
        return <></>
    }
    renderDrop(): ReactNode {
        return <></>
    }
}

export default WidgetContext;