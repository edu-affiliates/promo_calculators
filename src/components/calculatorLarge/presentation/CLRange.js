'use strict';

import React from 'react';

class CLCounter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calculator__deadline clearfix">
                <p>Deadline:</p>
                <div id="deadlines"/>
                <div className="calculator__type-deadline" id="deadline_select-button">
                    <p className="range clearfix">
                        {/*<span className="range-before">15 days +</span>*/}
                        {/*<span className="range-after">3 hours</span>*/}
                        {/*<span className="range-popup">15 days +</span>*/}
                        {/*<span className="range-popup__triangle-left"/>*/}
                        <input type="range" name="rangeInput" min="1" max="10" step="1" value="1" id="range"/>
                    </p>
                    <div id="steplist" className="range-labels clearfix">
                        <div id="range0" className="range-labels__step"/>
                        <div id="range1" className="range-labels__step"/>
                        <div id="range2" className="range-labels__step"/>
                        <div id="range3" className="range-labels__step"/>
                        <div id="range4" className="range-labels__step"/>
                        <div id="range5" className="range-labels__step"/>
                        <div id="range6" className="range-labels__step"/>
                        <div id="range7" className="range-labels__step"/>
                        <div id="range8" className="range-labels__step"/>
                        <div id="range9" className="range-labels__step"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CLCounter;