import {Bar, getCanvasPattern} from '@ant-design/plots'
import {deepMix} from '@antv/util';

const BarChartComponent = ({xField, yField, seriesField = yField,chartData, patternMap = {}}) => {

    const pattern = ({type}, color) =>
        getCanvasPattern(
            deepMix({}, patternMap[type], {
                cfg: {
                    backgroundColor: color,
                },
            }),
        );

    const config = {
        data: chartData,
        xField,
        yField,
        seriesField,
        legend: {
            marker: (text, index, item) => {
                const color = patternMap[text].cfg.backgroundColor;
                return {
                    style: {
                        fill: pattern(
                            {
                                type: text,
                            },
                            color,
                        ),
                        r: 8,
                    },
                };
            },
        },
        pattern: ({type}) => {
            return (
                patternMap[type] || {
                    type: 'dot',
                }
            );
        },
    };
    return <Bar {...config} />;
}

export default BarChartComponent;