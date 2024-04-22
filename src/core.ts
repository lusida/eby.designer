import Container from "./container";

const container = new Container();
const KEY = {
    WIDGET_FACTORY: "widget_factory",
}

export default {
    registerWidgetFactory(factory: IWidgetFactory) {
        const scope = container.scope(KEY.WIDGET_FACTORY);

        scope.register(factory.type, factory);
    },
    getWidgetFactory(type: string): IWidgetFactory {
        const scope = container.scope(KEY.WIDGET_FACTORY);

        return scope.getService<IWidgetFactory>(type)!;
    }
};