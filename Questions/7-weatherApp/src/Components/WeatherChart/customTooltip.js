/**
 * Create New Tooltip.
 * 
 * @description
 * Create a new tooltip style for the chart.
 * 
 * @param {Object} ChartContext Chart.js context.
 * @param {Object} chart Current chart data.
 * @param {Object} sector Sector data.
 * 
 * @returns {ChartContext.Tooltip} Tooltip.
 */
function createNewTooltip(ChartContext, chart, sector) {
    const settings = {
        _chart: chart.chart,
        _chartInstance: chart,
        _data: chart.data,
        _options: chart.options.tooltips,
        _active: [sector]
    };

    return new ChartContext.Tooltip(settings, chart);
}

/**
 * Create Tooltip At.
 * 
 * @description
 * Create a tooltip at a given index.
 * 
 * @param {Object} ChartContext Chart.js context.
 * @param {Object} chart Current chart data.
 * @param {Number} index Dataset index.
 */
function createTooltipAt(ChartContext, chart, index) {
    for (let sector of chart.getDatasetMeta(index).data) {
        chart.pluginTooltips.push(createNewTooltip(ChartContext, chart, sector));
    }
}

/**
 * Before Render.
 * 
 * @description
 * Chart.js lifecycle function to setup items before render the chart.
 * It configures the new tooltip, to be aways visible on the chart.
 * 
 * @param {Object} ChartContext Chart.js context.
 * @param {Object} chart Current chart data.
 */
function beforeRender(ChartContext, chart) {
    chart.pluginTooltips = [];

    for (let [index] of chart.config.data.datasets.entries()) {
        createTooltipAt(ChartContext, chart, index);
    }

    chart.options.tooltips.enabled = false;
}

/**
 * Setup Tooltip Style.
 * 
 * @description
 * Set the custom tooltip's style.
 *
 * @param {Object} tooltip Tooltip settings.
 * 
 * @returns {Object} Tooltip settings.
 */
function setupTooltipStyle(tooltip) {
    const fontColor = '#585858';
    const { _options: options } = tooltip;

    let newOptions = {
        ...options,
        backgroundColor: 'rgba(0,0,0,0)',
        bodyFontColor: fontColor,
        titleFontColor: fontColor,
        titleFontFamily: `'Montserrat', sans-serif`,
        displayColors: false,
        bodyFontSize: tooltip._chart.height * 0.06
    }

    return newOptions;
}

/**
 * Update Tooltip.
 * 
 * @description
 * Update the tooltip settings and position.
 * 
 * @param {Number} animation Animation progress.
 * @param {Object} tooltip Tooltip settings.
 */
function updateTooltip(animation, tooltip) {
    tooltip.initialize();
    tooltip._options = setupTooltipStyle(tooltip);
    tooltip.update();
    tooltip.transition(animation).draw();
}

/**
 * After Draw.
 * 
 * @description
 * Chart.js lifecycle function to render things after the draw of the chart.
 * It updates the tooltip state for new frame.
 * 
 * 
 * @param {Object} ChartContext Chart.js context.
 * @param {Object} chart Current chart data.
 * @param {Number} animation Animation progress.
 */
function afterDraw(ChartContext, chart, animation) {
    chart.options.tooltips.enabled = true;
    ChartContext.helpers.each(chart.pluginTooltips, updateTooltip.bind(updateTooltip, animation));
    chart.options.tooltips.enabled = false;
}

/**
 * Custom Tooltip
 * 
 * @description
 * Registrate a new plugin to aways display the tooltip.
 * 
 * @param {Object} ChartContext Chart.js context.
 */
const customTooltip = ChartContext => {
    ChartContext.plugins.register({
        beforeRender: beforeRender.bind(beforeRender, ChartContext),
        afterDraw: afterDraw.bind(afterDraw, ChartContext)
    });
}

export {
    customTooltip as default,
    createNewTooltip,
    createTooltipAt,
    beforeRender,
    setupTooltipStyle,
    afterDraw,
    updateTooltip
}