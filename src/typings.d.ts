import { ReactNode } from "react";

declare global {
    interface IServiceProvider {
        /**
         * 获取服务
         * @param type 服务类型
         */
        getService<T>(type: string): T | undefined;
        /**
         * 获取服务列表
         * @param type 服务类型或条件，如果不传则区全部服务
         */
        getServices<T>(type?: string | ((t: T) => boolean)): T[];
    }
    /**对象容器接口 */
    interface IContainer extends IServiceProvider {
        /**
         * 获取或创建子容器
         * @param name 子容器名称
         */
        scope(name: string): IContainer;
        /**
         * 注册服务
         * @param type 服务类型
         * @param service 服务实例
         */
        register<T>(type: string, service: T | TServiceHandler): void;

        /**
         * 反注册服务
         * @param type 服务类型
         * @param service 服务实例，如果传入则指定移除
         */
        unregister(type: string, service?: any): boolean;
    }

    type TServiceHandler = (container: IContainer) => any;

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
        type: string;
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