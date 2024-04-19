import {
  PlusCircleOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import LogicFlow, { Extension } from '@logicflow/core';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  lf: LogicFlow;
  container: HTMLElement;
  formatMessage: (id: string) => string;
}
const ToolBarView: React.FC<Props> = (props) => {
  const [undoEnabled, setUndoEnabled] = React.useState(false);
  const [redoEnabled, setRedoEnabled] = React.useState(false);

  props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
    setUndoEnabled(undoAble);
    setRedoEnabled(redoAble);
  });

  return (
    <Space size="small" className="lf-control">
      <Tooltip key="new" title={props.formatMessage('widget.label.new')}>
        <Button
          type="text"
          className="lf-control-item"
          icon={<PlusCircleOutlined />}
          onClick={() => props.lf.zoom(false)}
        />
      </Tooltip>
      <Tooltip
        key="zoomout"
        title={props.formatMessage('widget.label.zoomout')}
      >
        <Button
          type="text"
          className="lf-control-item"
          icon={<ZoomOutOutlined />}
          onClick={() => props.lf.zoom(false)}
        />
      </Tooltip>
      <Tooltip key="zoomin" title={props.formatMessage('widget.label.zoomin')}>
        <Button
          type="text"
          className="lf-control-item"
          icon={<ZoomInOutlined />}
          onClick={() => props.lf.zoom(true)}
        />
      </Tooltip>
      <Tooltip key="fit" title={props.formatMessage('widget.label.zoomreset')}>
        <Button
          type="text"
          className="lf-control-item"
          icon={<i className="lf-control-fit"></i>}
          onClick={() => props.lf.resetZoom()}
        />
      </Tooltip>
      <Tooltip key="undo" title={props.formatMessage('widget.label.undo')}>
        <Button
          type="text"
          className={
            undoEnabled ? 'lf-control-item' : 'lf-control-item disabled'
          }
          icon={<i className="lf-control-undo"></i>}
          disabled={!undoEnabled}
          onClick={() => props.lf.undo()}
        />
      </Tooltip>
      <Tooltip key="redo" title={props.formatMessage('widget.label.redo')}>
        <Button
          type="text"
          className={
            redoEnabled ? 'lf-control-item' : 'lf-control-item disabled'
          }
          icon={<i className="lf-control-redo"></i>}
          disabled={!redoEnabled}
          onClick={() => props.lf.redo()}
        />
      </Tooltip>
    </Space>
  );
};

class ToolBar implements Extension {
  pluginName: string;
  lf?: LogicFlow;
  container?: HTMLElement;
  formatMessage: (id: string) => string;
  constructor(props: { formatMessage: (id: string) => string }) {
    this.pluginName = 'toolbar';

    this.formatMessage = props.formatMessage;
  }

  render(lf: LogicFlow, container: HTMLElement) {
    this.lf = lf;

    this.container = container;

    const div = (
      <ToolBarView
        lf={lf}
        container={container}
        formatMessage={this.formatMessage}
      />
    );

    // eslint-disable-next-line react/no-deprecated
    ReactDOM.render(div, container);
  }

  destroy() {
    if (this.container && this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}

export default ToolBar;

export { ToolBar };
