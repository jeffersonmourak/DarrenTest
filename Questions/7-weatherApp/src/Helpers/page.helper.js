import { connect } from "react-redux";
import { get } from 'lodash';

/**
 * Create Page.
 * 
 * @description
 * Connects the page to the Redux.
 * 
 * @param {React.Component} Component React component to be connected
 * @param {String} key Key of the store
 * @param {Object} actions Actions for the store
 * 
 * @returns {React.Component} Connected Component.
 */
function createPage(Component, key = '', actions = {}) {
    const mapStateToProps = state => ({ page: get(state, key) });
    return connect(mapStateToProps, actions)(Component);
}

export {
    createPage
};