import React, {useMemo} from 'react';
import {ArrowKeyStepper, AutoSizer, Grid, Index} from 'react-virtualized'
import 'react-virtualized/styles.css';
import './App.css';
import {Checkbox, Switch} from "antd";
import 'antd/lib/switch/style/index.css'
import {CheckboxChangeEvent} from "antd/es/checkbox";

const row = ['2', false, '160133', [{
    name: '组合1',
    value: '组合值1'
}, {
    name: '组合2',
    value: '组合值2'
}],
    [{
        name: '全市场',
        value: '全市场'
    }, {
        name: '部分市场',
        value: '部分市场'
    }],
    true,
    false,
    false
]

function App() {
    // 多出来的是checkBox那一列
    const columnCount = row.length + 1;
    const rowCount = 300

    const itemListByTable = useMemo(() => {
        const items = [];
        for (let i = 0; i < rowCount; i++) {
            items.push(row)
        }

        return items;
    }, [])

    const _cellRenderer = (props: {
        columnIndex: number,
        key: string,
        rowIndex: number,
        style: Object,
    }) => {
        const {
            columnIndex,
            key,
            rowIndex,
            style
        } = props;

        // 0 是checkbox
        const cellValue = itemListByTable[rowIndex][columnIndex - 1];
        let cellComponent;

        switch (columnIndex) {
            case 0:
                const handleCheckBoxChanged = (event: CheckboxChangeEvent) => {
                    console.log(`changed ${event.target.checked}`);
                };
                cellComponent = <Checkbox defaultChecked={false} onChange={handleCheckBoxChanged}/>
                break
            case 2:
            case 6:
            case 7:
            case 8:
                const handelSwitchChanged = (checked: boolean) => {
                    console.log(`switch to ${checked}`);
                }
                cellComponent = <Switch defaultChecked={cellValue as boolean} onChange={handelSwitchChanged}/>;
                break;
            default :
                cellComponent = cellValue.toString();
        }

        return (
            <span role={'none'} key={key} style={style}>
                {cellComponent}
            </span>
        );
    };

    const getColumnWidth = ({index}: Index) => {
        return 100
    }

    const tableHeader = useMemo(() => {
        return <div style={{display: 'flex'}}>
            <Checkbox style={{width: getColumnWidth({index: 0})}}></Checkbox>
            <span style={{width: getColumnWidth({index: 1})}}>基金代码</span>
            <span style={{width: getColumnWidth({index: 2})}}>基金代码</span>
            <span style={{width: getColumnWidth({index: 3})}}>基金代码</span>
            <span style={{width: getColumnWidth({index: 4})}}>基金代码</span>
            <span style={{width: getColumnWidth({index: 5})}}>基金代码</span>
            <span style={{width: getColumnWidth({index: 6})}}>基金代码</span>
            <span style={{width: getColumnWidth({index: 7})}}>基金代码</span>
            <span style={{width: getColumnWidth({index: 8})}}>基金代码</span>
        </div>
    }, [])

    return (
        <div>
            {tableHeader}
            {/*// @ts-ignore*/}
            <ArrowKeyStepper columnCount={columnCount} rowCount={rowCount}>
                {({onSectionRendered, scrollToColumn, scrollToRow}) => (
                    // @ts-ignore
                    <AutoSizer disableHeight>
                        {({width}) => (
                            // @ts-ignore
                            <Grid
                                columnCount={columnCount}
                                onSectionRendered={onSectionRendered}
                                rowCount={rowCount}
                                scrollToColumn={scrollToColumn}
                                scrollToRow={scrollToRow}
                                cellRenderer={_cellRenderer}
                                columnWidth={getColumnWidth}
                                height={400}
                                rowHeight={30}
                                width={width}/>)
                        }
                    </AutoSizer>
                )}

            </ArrowKeyStepper>,
        </div>
        // </div>
    );
}

export default App;
