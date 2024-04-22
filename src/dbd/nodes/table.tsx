import { HtmlNode, HtmlNodeModel, PointAnchor } from "@logicflow/core";
import ReactDOM from "react-dom";
import React from "react";

class TableNodeModel extends HtmlNodeModel {
    setAttributes(): void {
        this.width = 300;

    }
    getAnchorInfo(anchorId: string): PointAnchor {
        // 这里可以设置锚点的位置和样式
        console.log("getAnchorInfo", anchorId);
        return {
            id: anchorId,
            x: 0,
            y: 0
        };
    }
}

class TableNode extends HtmlNode {
    setHtml(rootEl: HTMLElement): void {
        // const factory = eby.getWidgetFactory("dbd");

        // const widget = factory.getWidget("table");

        // eslint-disable-next-line react/no-deprecated
        ReactDOM.render(<div>AAA</div>, rootEl);
    }
}

export default {
    type: 'table',
    view: TableNode,
    model: TableNodeModel
};