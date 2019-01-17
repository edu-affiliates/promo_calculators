'use strict';

import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {handleInputEmail, handleValidEmail} from '../../../store/actions'
import generalOptions from '../../../config/generalOptions';


//presentation of the counter in calc small
class CLEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyInput: false,
            alert: false
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleBlur(e) {
        const value = e.target.value;
        this.setState({emptyInput: false});
        if (value == '' || !helper.validateGlobalEmail(email)) {
            this.setState({alert: true});
            
        } else {
            this.setState({alert: false});
        }
    }


    handleChange(e) {
        const value = e.target.value;
        this.handleEmptyInput(value);
        this.props.handleInputEmail(value);
        this.props.handleValidEmail(false);
    }

    handleEmptyInput(value) {
        if (value === '') {
            this.setState({emptyInput: true})
        } else {
            if (this.state.emptyInput)
                this.setState({emptyInput: false})
        }
    }

    render() {
        const {email, emailValid} = this.props;
        const alert = (this.state.alert || this.props.emailValid) ? <div className="cl-page-value__alert">
            <span>Email is not valid</span>
            <span onClick={() => {
                this.setState({alert: false});this.props.handleValidEmail(false);
            }} className="cl-page-value__alert--cross">&times;</span>
        </div> : <div/>;
        return(
            <div className={(generalOptions.email) ? 'cl-select-wrap' : 'cl-email-hidden'}>
                <div className="cl-email-wrap cl-select">
                    <input type="text" 
                            className="cl-email" 
                            placeholder="Your email" 
                            onBlur={(e) => this.handleBlur(e)}
                            value={(this.state.emptyInput) ? '' : email}
                            onChange={(e) => this.handleChange(e)} />
                </div>
                {alert}
            </div>
        );
    }

}

CLEmail.propTypes = {
    // email: PropTypes.string.isRequired,

};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        email: state.email,
        emailValid: state.emailValid
    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleInputEmail: (email) => {
            dispatch(handleInputEmail(email, ownProps.calcId));
        },
        handleValidEmail: (emailValid) => {
            dispatch(handleValidEmail(emailValid, ownProps.calcId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CLEmail);