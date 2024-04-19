import React, { useContext } from "react";
import { EbyContext } from "eby.d/context";

import "./index.less";

const PropertyBar: React.FC = () => {
    const ctx = useContext(EbyContext);

    console.log(ctx);
    
    return (
        <div className="eby-property">

        </div>
    );
}

export default PropertyBar;