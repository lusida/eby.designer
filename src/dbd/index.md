# Dbdraw

This is an example component.

```jsx
import { Dbdraw } from 'eby.d';

export default () =>{
    const data={
        id:"db1",
        widget:"dbd",
        version:0,
        props:{
            name:"db1",
            description:"db1 description",
            dbType:"mysql"
        },
        children:[
            {
                id:"table1",
                widget:"dbt",
                props:{
                    name:"table1",
                    description:"table1 description"
                },
                children:[
                    {
                        id:"column1",
                        widget:"dbc",
                        props:{
                            name:"column1",
                            description:"column1 description",
                            type:"varchar"
                        }
                    },
                    {
                        id:"column2",
                        widget:"dbc",
                        props:{
                            name:"column2",
                            description:"column2 description",
                            type:"varchar"
                        }
                    }
                ]
            },
            {
                id:"table2",
                widget:"dbt",
                props:{
                    name:"table2",
                    description:"table2 description",
                    relations:[
                        {
                            name:"fk_table1_table2",
                            refTable:"table1",
                            refColumns:["column1"]
                            columns:["column3"]
                        }
                    ]
                },
                children:[
                    {
                        id:"column3",
                        widget:"dbc",
                        props:{
                            name:"column3",
                            description:"column3 description",
                            type:"varchar"
                        }
                    },
                    {
                        id:"column4",
                        widget:"dbc",
                        props:{
                            name:"column4",
                            description:"column4 description",
                            type:"varchar"
                        }
                    }
                ]
            }
        ]
    };

    return <Dbdraw schema={data} />
}
```
