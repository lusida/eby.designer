import React from "react";

interface Props {
    schema?: ILCSchema;
}
const Designer: React.FC<Props> = (props) => {

    console.log(props.schema);

    return (
        <div></div>
    );
}

export default Designer;