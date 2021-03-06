import React, { PureComponent } from 'react';
import { Gauge, Graph, ValueMapping } from '@grafana/ui';

import { Text } from '../Text/Text';

import { LayoutProps } from '../../types';

interface Props extends LayoutProps {}

export class BigGraphLayout extends PureComponent<Props> {
  render() {
    const {
      onInterpolate,
      options,
      timeSeries,
      timeRange,
      width,
      height,
      valueMappings,
      theme,
      thresholds,
    } = this.props;

    const gaugeValue = timeSeries[0].stats[options.valueOptions.stat];
    const prefix = onInterpolate(options.valueOptions.prefix);
    const suffix = onInterpolate(options.valueOptions.suffix);

    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <div style={{ width: '70%' }}>
          <Graph
            timeSeries={timeSeries}
            timeRange={timeRange}
            width={width}
            height={height}
            showBars={options.showBars}
            showLines={options.showLines}
            showPoints={options.showPoints}
          />
        </div>
        <div style={{ width: '30%' }}>
          <Text
            value={gaugeValue}
            thresholds={thresholds}
            valueMappings={valueMappings}
            theme={theme}
            style={{
              height: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '48px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          />
          <div style={{ height: '50%' }}>
            <Gauge
              value={gaugeValue}
              width={width}
              height={height / 2}
              prefix={prefix}
              suffix={suffix}
              unit={options.valueOptions.unit}
              decimals={options.valueOptions.decimals}
              thresholds={options.thresholds}
              valueMappings={[] as ValueMapping[]}
              showThresholdLabels={options.showThresholdLabels}
              showThresholdMarkers={options.showThresholdMarkers}
              minValue={options.minValue}
              maxValue={options.maxValue}
              theme={theme}
            />
          </div>
        </div>
      </div>
    );
  }
}
