'use strict';

import React from 'react';

class CLSelect extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let chooseOther;
        let titleList;
        if (this.props.type === 'service') {
            chooseOther = <li className="calc-lg-select-item">Choose Other</li>;
            titleList = 'Type of Service:';
        }
        else {
            titleList = 'Academic level:';
        }

        let currentList;
        currentList = this.props.currentList.map(
            (item, i) => {
                if (this.props.type === 'service') {
                    while (i < 4) {
                        return <li key={item.id} className="calc-lg-select-item">{item.name}</li>
                    }
                }
                else {
                    return <li key={item.id} className="calc-lg-select-item">{item.name.replace(/Undergraduate /gi, 'Undergrad.')}</li>
                }
            }
        );
        return (
            <div>
                <div className="calc-lg-select-wrap">
                    <div className="calc-lg-select-title">{titleList}</div>
                    <ul className="calc-lg-select-list">
                        {currentList}
                        {chooseOther}
                    </ul>
                </div>
            </div>
        )
    }
}

export default CLSelect;
