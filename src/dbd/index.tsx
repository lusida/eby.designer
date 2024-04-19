import React, { useEffect, type FC } from 'react';
import { useIntl } from 'react-intl';
import { initLogicFlow } from './logicflow';

import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css';

interface Props {
    schema?: ILCSchema;
}

const Dbdraw: FC<Props> = (props) => {
    const intl = useIntl();
    const rootRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (rootRef.current) {
            const lf = initLogicFlow(rootRef.current, intl);

            if (props.schema) {
                lf.render(props.schema);
            } else {
                lf.render({});
            }
        }
    }, []);

    return (
        <div ref={rootRef} style={{ height: '100%' }}></div>
    );
};

export default Dbdraw;
