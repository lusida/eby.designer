import { HtmlNode, HtmlNodeModel } from "@logicflow/core";

class TableNodeModel extends HtmlNodeModel {
    setAttributes(): void {
        this.width = 300;

    }
}

class TableNode extends HtmlNode {

}

export default {
    type: 'table',
    view: TableNode,
    model: TableNodeModel
};