import { IntlShape } from "react-intl";
import LogicFlow, { EdgeConfig, GraphConfigData, NodeConfig } from "@logicflow/core";
import { Menu, Snapshot } from '@logicflow/extension';
import ToolBar from "./toolbar";
import { groupBy } from "lodash";

function parseSchema(node: NodeConfig): ISchema | undefined {
    if (node.schema) {
        return node.schema as ISchema;
    }
}
function parseNode(schema: ISchema): { node: NodeConfig, edges: EdgeConfig[] } {
    const node: NodeConfig = {
        id: schema.id,
        type: schema.widget,
        x: schema.props.x,
        y: schema.props.y,
        text: schema.props.name,
        descrption: schema.props.description,
        schema: schema,
    };

    const edges: EdgeConfig[] = [];

    if (schema.props.foreignkeys) {
        const foreignkeys = schema.props.foreignkeys as IDbForeignkey[];

        foreignkeys.forEach(x => {
            for (let i = 0; i < x.columns.length; i++) {
                const column = x.columns[i];

                if (x.refColumns.length > i) {
                    const refColumn = x.refColumns[i];

                    const edge: EdgeConfig = {
                        sourceNodeId: schema.id,
                        targetNodeId: x.refTable,
                        sourceAnchorId: column,
                        targetAnchorId: refColumn,
                    };

                    edges.push(edge);
                }
            }
        });
    }

    return {
        node,
        edges
    };
}

function adapterIn(v: any) {
    const schema = v as ISchema;

    const data: GraphConfigData = {
        nodes: [],
        edges: []
    };

    if (schema) {
        schema.children.forEach(x => {
            const r = parseNode(x);

            data.nodes.push(r.node);

            if (r.edges.length > 0) {
                data.edges.push(...r.edges);
            }
        });
    }

    return data;
}

function adapterOut(data: GraphConfigData) {
    const schema: ISchema = {
        id: "",
        widget: "",
        props: {},
        children: []
    };

    data.nodes.forEach(x => {
        const node = parseSchema(x);

        if (node) {
            const edges = data.edges.filter(y => y.sourceNodeId === x.id);

            const groups = groupBy(edges, "targetNodeId");

            const foreignkeys: IDbForeignkey[] = [];

            const keys = Object.keys(groups);

            keys.forEach(key => {
                const group = groups[key];

                const foreignkey: IDbForeignkey = {
                    name: "",
                    refTable: key,
                    columns: group.map(k => k.sourceAnchorId ?? ""),
                    refColumns: group.map(k => k.targetAnchorId ?? "")
                };

                foreignkeys.push(foreignkey);
            })

            node.props.foreignkeys = foreignkeys;

            schema.children.push(node);
        }
    });

    return schema;
}

export function initLogicFlow(
    container: HTMLElement,
    intl: IntlShape) {
    LogicFlow.use(
        new ToolBar({
            formatMessage: (id: string) => {
                return intl.formatMessage({ id: id });
            },
        }),
    );
    LogicFlow.use(Snapshot);
    LogicFlow.use(Menu);

    const lf = new LogicFlow({
        container: container,
        grid: true,
    });

    lf.adapterIn = adapterIn;
    lf.adapterOut = adapterOut;

    return lf;
}
