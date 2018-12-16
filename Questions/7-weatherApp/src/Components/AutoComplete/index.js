import React, { Component } from 'react';
import If from '../If';
import { noop } from 'lodash';
import PropTypes from 'prop-types';

import Option from './Option';

import './style.css';

class AutoComplete extends Component {
    static defaultProps = {
        dataSet: [],
        type: 'normal',
        onClear: noop
    }

    static propTypes = {
        /**
         * Gets called when the user change the query text.
         * 
         * @param {String} query The query string.
         */
        onChange: PropTypes.func.isRequired,
        /**
         * Get called when the user select a city from the dropdown.
         * 
         * @param {Object} selection The city data.
         */
        onSelect: PropTypes.func.isRequired,
        /**
         * Gets called when the user clears the query or click outside.
         */
        onClear: PropTypes.func,
        /**
         * The Data for be displayed on dropdown.
         */
        dataSet: PropTypes.array,
        /**
         * The style type of the component.
         */
        type: PropTypes.string
    }

    /**
     * Handle mouse down event.
     * 
     * @description
     * Wrapper function to keep `detectOutsideFocus` on context and provide correct pointer to disable the event listener.
     * 
     * @param {SyntheticEvent} event Mouse down event.
     */
    handleMouseDown = event => this.detectOutsideFocus(event);

    /**
     * Component Did Mount.
     * 
     * @description
     * Component lifecycle callback of mounting.
     */
    componentDidMount() {
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    /**
     * Component Will Unmount.
     * 
     * @description
     * Component lifecycle callback of unmounting.
     */
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMouseDown);
    }

    /**
     * Detect Outside focus.
     * 
     * @description
     * Detect if the user is clicking outside or inside of the element.
     * 
     * @param {SyntheticEvent} event Event from Mouse Down.
     */
    detectOutsideFocus(event) {
        if (!this.node.contains(event.target)) {
            this.props.onClear();
        }
    }

    /**
     * Render Options.
     * 
     * @description
     * Renders the option items on dropdown.
     * 
     * @returns {Option[]} The list of Option components.
     */
    renderOptions() {
        let option = (item, index) => (
            <Option data={item}
                key={index}
                onSelect={this.props.onSelect} />
        );

        return this.props.dataSet.map(option);
    }

    /**
     * Render.
     * 
     * @description
     * Renders the component.
     * 
     * @returns {React.Component} the component.
     */
    render() {
        return (
            <div ref={node => { this.node = node }} className={`auto-complete ${this.props.type}`} >
                <input ref={input => { this.input = input }}
                    value={this.props.value}
                    placeholder={'Search a city'}
                    onChange={() => this.props.onChange(this.input.value)} />

                <If condition={this.props.dataSet.length > 0 && !this.props.loading} >
                    <div className='dropdown'>
                        {this.renderOptions()}
                    </div>
                </If>

                <If condition={this.props.loading}>
                    <div className='dropdown'>
                        <Option readOnly={true} data={'Loading...'} />
                    </div>
                </If>
            </div>
        );
    }
}

export default AutoComplete;