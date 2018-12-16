import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import customTooltip from './customTooltip';
import './style.css';

/**
 * @typedef {Object} Source
 * @property {Array} labels Chart's data labels.
 * @property {Array} datasets Chart's Datasets.
 */

class WeatherChart extends Component {

    /**
     * Weather Chart
     * 
     * @param {Object} props the component props.
     * @param {Source} props.source Source of data for the chart
     */
    constructor(props) {
        super(props);

        customTooltip(Chart);
    }

    static defaultProps = {
        source: {
            labels: [],
            datasets: []
        }
    }

    static propTypes = {
        /**
         * Data source for the chart.
         */
        source: PropTypes.object.isRequired
    }

    /**
     * Setup Tooltips Title.
     * 
     * @description
     * Setups the tooltip title to be displayed at chart.
     * 
     * @param {Array} tooltipItems Array of tooltips on the chart.
     * @param {Array} data Datasets for the chart.
     * 
     * @returns {String} Text that will be on the tooltip title.
     */
    setupToolTipsTitle(tooltipItems, data) {
        let [tooltipItem] = tooltipItems;
        let [dataset] = data.datasets;

        let title = data.labels[tooltipItem.index];

        return title !== '_NO_LABEL_' ? `${dataset.data[tooltipItem.index]}º` : '';
    }

    /**
     * Setup Tooltips labels.
     * 
     * @description
     * Setups the tooltip labels to be displayed at chart.
     * 
     * @param {Object} tooltipItem Data for the tooltip.
     * @param {Object} data data for the dataset.
     * 
     * @returns {String} Text that will be on the tooltip label.
     */
    setupToolTipsLabel(tooltipItem, data) {
        let label = data.labels[tooltipItem.index];

        return label !== '_NO_LABEL_' ? label : '';
    }

    /**
     * Setup Tooltips
     * 
     * @description
     * Initialize the data for tooltip options.
     * 
     * @returns {Object} The settings for the Tooltips section.
     */
    setupTooltips() {
        return {
            yAlign: 'bottom',
            callbacks: {
                title: this.setupToolTipsTitle.bind(this),
                label: this.setupToolTipsLabel.bind(this)
            }
        }
    }

    /**
     * Setup Scales
     * 
     * @description
     * Initialize the data for scales options.
     * 
     * @returns {Object} The settings for the Scales section.
     */
    setupScales(min, max) {
        const xAxes = {
            gridLines: {
                display: false
            },
            ticks: {
                display: false
            }
        };

        const yAxes = {
            gridLines: {
                display: false
            },
            ticks: {
                min: (min - 10),
                max: (max + 10),
                display: false,
                scaleBeginAtZero: true
            }
        }

        return {
            xAxes: [xAxes],
            yAxes: [yAxes]
        }
    }

    /**
     * Create Options
     * 
     * @description
     * Initialize the options for the chart.
     * 
     * @param {Number} min Minimum temperature of the chart.
     * @param {NUmber} max Maxmimum temperature of the chart.
     * 
     * @returns {Object} The options for the chart.
     */
    createOptions(min, max) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 0
                }
            },
            legend: {
                display: false
            },
            tooltips: this.setupTooltips(),
            scales: this.setupScales(min, max)
        }
    }

    /**
     * Setup Theme.
     * 
     * @description
     * Setup the color of the given theme name.
     * 
     * @param {String} name Theme name.
     * 
     * @returns {String} the color of the theme.
     */
    setupTheme(name) {
        switch (name) {
            case 'cold':
                return '#fff';

            default:
                return '#585858'
        }
    }

    /**
     * Setup data.
     * 
     * @description
     * Setup the data for Chart.js display on the chart.
     * 
     * @param {Source} source Data Source.
     * 
     * @returns {Object} Chart.js options for the chart.
     */
    setupData(source) {
        const labels = ['_NO_LABEL_', ...source.labels, '_NO_LABEL_'];
        const data = [source.data[0], ...source.data, source.data[source.data.length - 1]];
        const theme = this.setupTheme(Math.min(...source.data) < 12 ? 'cold' : 'warm');

        return {
            labels,
            datasets: [{
                data,
                backgroundColor: ['transparent'],
                borderColor: [theme]
            }]
        }
    }

    /**
     * Component Did Mount.
     * 
     * @description
     * Component lifecycle callback of mounting.
     */
    componentDidMount() {
        this.canvasContext = this.canvas.getContext('2d');

        this.chart = new Chart(this.canvasContext, {
            type: 'line',
            data: this.setupData(this.props.source),
            options: this.createOptions(Math.min(...this.props.source.data), Math.max(...this.props.source.data))
        });
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
            <div className={'canvas-container'}>
                <div className={'canvas-box'}>
                    <canvas ref={canvas => { this.canvas = canvas }} />
                </div>
            </div>
        );
    }
}

export default WeatherChart;