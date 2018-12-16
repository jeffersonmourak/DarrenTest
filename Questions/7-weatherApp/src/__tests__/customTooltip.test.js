import * as customTooltip from '../Components/WeatherChart/customTooltip';

describe('Setup with context', () => {
    let chartInput, ChartContext, expectedOutput;

    beforeEach(() => {
        chartInput = {
            chart: 'chart',
            data: 'data',
            options: {
                tooltips: {
                    enabled: true
                }
            },
            config: {
                data: {
                    datasets: ['a', 'b']
                }
            },
            getDatasetMeta: () => ({ data: ['data1', 'data2'] })
        };
    
        ChartContext = {
            Tooltip: jest.fn(),
            helpers: {
                each: jest.fn()
            }
        };
    
        expectedOutput = {
            _active: ["sector"],
            _chart: 'chart',
            _chartInstance: {
                chart: 'chart',
                data: 'data',
                options: {
                    tooltips: {
                        enabled: true
                    }
                }
            },
            _data: 'data',
            _options: {
                enabled: true
            }
        };
    });
    
    test('createNewTooltip(ChartContext, chart, sector)', () => {
        customTooltip.createNewTooltip(ChartContext, chartInput, 'sector');
    
        expect(ChartContext.Tooltip.mock.calls.length).toBe(1);
        expect(ChartContext.Tooltip.mock.calls[0][0]).toMatchObject(expectedOutput);
    });

    test('createTooltipAt(ChartContext, chart, index)', () => {
        chartInput.pluginTooltips = {
            push: jest.fn()
        };

        customTooltip.createTooltipAt(ChartContext, chartInput, 0);

        expect(chartInput.pluginTooltips.push.mock.calls.length).toBe(2);
    });

    test('beforeRender(ChartContext, chart)', () => {
        customTooltip.beforeRender(ChartContext, chartInput);
    });

    describe('afterDraw(ChartContext, chart, animation)', () => {
        test('with allTooltipsOnce', () => {
            customTooltip.afterDraw(ChartContext, chartInput, 1);
        });

        test('with allTooltipsOnce', () => {
            customTooltip.afterDraw(ChartContext, chartInput, 1);

            expect(ChartContext.helpers.each.mock.calls.length).toBe(1);
        });
    })
});

test('setupTooltipStyle(tooltip)', () => {
    const input = {
        _chart: {
            height: 1
        }
    };

    const output = {
        backgroundColor: 'rgba(0,0,0,0)',
        bodyFontColor: '#585858',
        bodyFontSize: 0.06,
        displayColors: false,
        titleFontColor: '#585858',
        titleFontFamily: `'Montserrat', sans-serif`,
    }

    expect(customTooltip.setupTooltipStyle(input)).toEqual(output);
});

test('updateTooltip(animation, tooltip)', () => {
    const tooltip = {
        initialize: jest.fn(),
        update: jest.fn(),
        transition: jest.fn( () => ({ draw: () => {} }) ),
        _chart: {
            height: 1
        }
    };

    customTooltip.updateTooltip(0, tooltip);
});