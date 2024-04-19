import { ReactNode } from "react";

declare global {
    /**设计器上下文 */
    interface IEbyContext {
        version: number;
        schema: ILCSchema;
        selected: ISchema;

        refresh();
        setSchema(schema: ILCSchema);
        setSelected(schema: ISchema);
        setSelectedById(id: string);

        getSetter(id: string): IPropSetter;
        getWidgetFactory(): IWidgetFactory;
    }

    /**物料工厂 */
    interface IWidgetFactory {
        getWidget(id: string): IWidget;
        getSchema(id: string): ISchema;
    }

    /**物料渲染上下文 */
    interface IWidgetContext {
        design: boolean;
        schema: ISchema;
        props: { [key: string]: any };
        designProps: { [key: string]: any };
        render: (s: ISchema) => ReactNode;
        renderChildren: () => ReactNode;
        renderDrop: () => ReactNode;
    }

    /**物料属性定义 */
    interface IWidgetProps {
        type: string;
        label: string;
        description?: string;
        group?: string;
        default?: any;
        setter?: string;
        props?: Record<string, any>;
    }

    /**物料定义 */
    interface IWidget {
        id: string;
        name: string;
        description?: string;
        icon?: string | ReactNode;
        category?: string;
        group?: string;
        hidden?: boolean;
        props: Record<string, IWidgetProps>;
        children?: ISchema[];
        refs?: Record<string, string>;
        render(ctx: IWidgetContext): ReactNode;
    }

    /**元数据定义 */
    interface ISchema {
        id: string;
        widget: string;
        version?: number;
        props: Record<string, any>;
        children: ISchema[];
        refs?: Record<string, string>;
    }

    /**根节点元数据定义 */
    interface ILCSchema extends ISchema {
        type: string;
    }

    /**属性渲染上下文 */
    interface IPropContext {
        context: IEbyContext;
        value: any;
        props: Record<string, any>;
    }

    /**属性渲染器 */
    interface IPropSetter {
        id: string;
        custom: boolean;
        render(ctx: IPropContext): ReactNode;
    }
}

export { }