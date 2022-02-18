import React, { FC } from 'react'
import { ResponsiveLine } from '@nivo/line'

import './styles.scss'

export type TChart = {
  id: string
  data: Array<{
    x: string | number
    y: string | number
  }>
}

type TChartProps = { data: TChart[]; onClick?: () => void }

export const Chart: FC<TChartProps> = ({ data, ...rest }) => (
  <div className="chart__wrapper">
    <ResponsiveLine
      {...rest}
      data={data}
      margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'price',
        legendOffset: -50,
        legendPosition: 'middle',
      }}
      enableGridX={false}
      colors={['#B58500', '#B58500']}
      enableGridY={false}
      lineWidth={1}
      pointSize={1}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={1}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableSlices="x"
      // useMesh={true}
      enableArea={true}
      legends={[]}
    />
  </div>
)
