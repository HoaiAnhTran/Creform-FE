import { useMemo } from 'react';
import { FaChartSimple } from 'react-icons/fa6';
import {
  Box,
  ModalProps as MantineModalProps,
  Stack,
  Text,
} from '@mantine/core';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Legend,
  Pie,
  PieChart,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { CHART_COLOR_CODES } from '@/constants';
import { useGetStatisticsOfResponsesByFormIdQuery } from '@/redux/api/responseApi';
import { OptionStatsDataType } from '@/types';

import { Modal } from '../Modal';

interface ViewResponsesStatsModalProps extends MantineModalProps {
  formId: string;
}

const RADIAN = Math.PI / 180;

export const ViewResponsesStatsModal = ({
  formId,
  ...props
}: ViewResponsesStatsModalProps) => {
  const {
    data,
    isLoading: isLoadingStats,
    isSuccess,
  } = useGetStatisticsOfResponsesByFormIdQuery(
    { formId },
    { skip: !formId || !props.opened },
  );

  const singleChoiceResult = useMemo(
    () =>
      data?.singleChoiceResult && data.singleChoiceResult.length > 0
        ? data.singleChoiceResult
        : [],
    [data],
  );

  const multipleChoiceResult = useMemo(
    () =>
      data?.multipleChoiceResult && data.multipleChoiceResult.length > 0
        ? data.multipleChoiceResult
        : [],
    [data],
  );

  const dropdownResult = useMemo(
    () =>
      data?.dropdownResult && data.dropdownResult.length > 0
        ? data.dropdownResult
        : [],
    [data],
  );

  const scaleRatingResult = useMemo(
    () =>
      data?.scaleRatingResult && data.scaleRatingResult.length > 0
        ? data.scaleRatingResult
        : [],
    [data],
  );

  const inputTableResult = useMemo(
    () =>
      data?.inputTableResult && data.inputTableResult.length > 0
        ? data.inputTableResult
        : [],
    [data],
  );

  const hasNoData: boolean = useMemo(() => {
    if (
      isSuccess &&
      singleChoiceResult.length === 0 &&
      multipleChoiceResult.length === 0 &&
      dropdownResult.length === 0 &&
      scaleRatingResult.length === 0 &&
      inputTableResult.length === 0
    ) {
      return true;
    }
    return false;
  }, [
    dropdownResult,
    inputTableResult,
    multipleChoiceResult,
    scaleRatingResult,
    singleChoiceResult,
    isSuccess,
  ]);

  const getTotalCount = (questionStats: OptionStatsDataType[]): number =>
    questionStats.reduce((acc: number, optionStats: OptionStatsDataType) => {
      if (optionStats.count) {
        acc += optionStats.count;
      }
      return acc;
    }, 0);

  return (
    <Modal
      {...props}
      size={'75%'}
      headerIcon={<FaChartSimple className='text-white' />}
      headerTitle='View Statistics'
      body={
        <Box className='flex w-full flex-col items-center gap-8 px-3 py-5'>
          {hasNoData ? (
            <Stack className='justify-center gap-2 py-2.5 text-center'>
              <Text className='text-base font-medium text-slate-800'>
                No Charts Available
              </Text>
              <Text className='text-sm text-slate-600/90'>
                This form has no submissions yet or does not include any
                chartable elements.
              </Text>
            </Stack>
          ) : singleChoiceResult.length > 0 ? (
            singleChoiceResult.map((elementStats) =>
              Object.keys(elementStats).map((elementStatsKey) => (
                <Box className='flex flex-col items-center gap-3'>
                  <Text className='self-start text-base font-medium'>
                    {elementStatsKey}
                  </Text>
                  <PieChart width={750} height={250}>
                    <Pie
                      dataKey='count'
                      isAnimationActive={false}
                      data={elementStats[elementStatsKey]}
                      outerRadius={80}
                      fill='#8884d8'
                      labelLine={false}
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                      }) => {
                        const radius =
                          innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                        return (
                          <text
                            x={x}
                            y={y}
                            fill='white'
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline='central'
                            fontSize={14}
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                      {elementStats[elementStatsKey].map((_entry, index) => (
                        <Cell key={index} fill={CHART_COLOR_CODES[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend iconType='circle' />
                  </PieChart>
                </Box>
              )),
            )
          ) : null}
          {dropdownResult.length > 0
            ? dropdownResult.map((elementStats) =>
                Object.keys(elementStats).map((elementStatsKey) => (
                  <Box className='flex flex-col items-center gap-3'>
                    <Text className='self-start text-base font-medium'>
                      {elementStatsKey}
                    </Text>
                    <PieChart width={750} height={250}>
                      <Pie
                        dataKey='count'
                        isAnimationActive={false}
                        data={elementStats[elementStatsKey]}
                        outerRadius={80}
                        fill='#8884d8'
                        labelLine={false}
                        label={({
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          percent,
                        }) => {
                          const radius =
                            innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);

                          return (
                            <text
                              x={x}
                              y={y}
                              fill='white'
                              textAnchor={x > cx ? 'start' : 'end'}
                              dominantBaseline='central'
                              fontSize={14}
                            >
                              {`${(percent * 100).toFixed(0)}%`}
                            </text>
                          );
                        }}
                      >
                        {elementStats[elementStatsKey].map((_entry, index) => (
                          <Cell key={index} fill={CHART_COLOR_CODES[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend iconType='circle' />
                    </PieChart>
                  </Box>
                )),
              )
            : null}
          {multipleChoiceResult.length > 0
            ? multipleChoiceResult.map((elementStats) =>
                Object.keys(elementStats).map((elementStatsKey) => {
                  const totalCount = getTotalCount(
                    elementStats[elementStatsKey],
                  );
                  return (
                    <Box className='flex flex-col items-center gap-5'>
                      <Text className='self-start text-base font-medium'>
                        {elementStatsKey}
                      </Text>
                      <BarChart
                        width={750}
                        height={300}
                        data={elementStats[elementStatsKey]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey='count'
                          name='Count'
                          maxBarSize={70}
                          fill='#FFBB70'
                          activeBar={<Rectangle fill='#ED9455' />}
                        >
                          <LabelList
                            dataKey='count'
                            content={({ x, y, width, value }) => (
                              <text
                                x={Number(x) + Number(Number(width) / 2)}
                                y={Number(y) + 30}
                                fill='#fff'
                                textAnchor='middle'
                                fontSize={14}
                                dy={-6}
                              >
                                {Number(value) > 0
                                  ? `${((Number(value) / totalCount) * 100).toFixed(1)}%`
                                  : ''}
                              </text>
                            )}
                          />
                        </Bar>
                      </BarChart>
                    </Box>
                  );
                }),
              )
            : null}
          {scaleRatingResult.length > 0
            ? scaleRatingResult.map((elementStats) =>
                Object.keys(elementStats).map((elementStatsKey) => {
                  const totalCount = getTotalCount(
                    elementStats[elementStatsKey],
                  );
                  return (
                    <Box className='flex flex-col items-center gap-5'>
                      <Text className='self-start text-base font-medium'>
                        {elementStatsKey}
                      </Text>
                      <BarChart
                        width={750}
                        height={400}
                        data={elementStats[elementStatsKey]}
                        margin={{
                          top: 5,
                          right: 20,
                          left: 20,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name'>
                          <Label
                            value='Scale rating values'
                            offset={5}
                            position='bottom'
                            fontSize={14}
                          />
                        </XAxis>
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey='count'
                          name='Count'
                          maxBarSize={70}
                          fill='#FF9494'
                          activeBar={<Rectangle fill='#FF5D5D' />}
                        >
                          <LabelList
                            dataKey='count'
                            content={({ x, y, width, value }) => (
                              <text
                                x={Number(x) + Number(Number(width) / 2)}
                                y={Number(y) + 30}
                                fill='#fff'
                                textAnchor='middle'
                                fontSize={14}
                                dy={-6}
                              >
                                {Number(value) > 0
                                  ? `${((Number(value) / totalCount) * 100).toFixed(1)}%`
                                  : ''}
                              </text>
                            )}
                          />
                        </Bar>
                      </BarChart>
                    </Box>
                  );
                }),
              )
            : null}
          {inputTableResult.length > 0
            ? inputTableResult.map((elementStats) =>
                Object.keys(elementStats).map((elementStatsKey) => (
                  <Box className='flex flex-col items-center gap-5'>
                    <Text className='self-start text-base font-medium'>
                      {elementStatsKey}
                    </Text>
                    <BarChart
                      width={750}
                      height={300}
                      data={elementStats[elementStatsKey]}
                      margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='name' />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {Object.keys(elementStats[elementStatsKey][0])
                        .filter((key) => key !== 'name')
                        .map((key, index) => (
                          <Bar
                            dataKey={key}
                            maxBarSize={70}
                            fill={CHART_COLOR_CODES[index]}
                          >
                            <LabelList
                              dataKey={key}
                              content={({ x, y, width, value }) => (
                                <text
                                  x={Number(x) + Number(Number(width) / 2)}
                                  y={Number(y) + 30}
                                  fill='#fff'
                                  textAnchor='middle'
                                  fontSize={14}
                                  dy={-6}
                                >
                                  {Number(value) > 0 ? value : ''}
                                </text>
                              )}
                            />
                          </Bar>
                        ))}
                    </BarChart>
                  </Box>
                )),
              )
            : null}
        </Box>
      }
      hasFooter={false}
      isLoading={isLoadingStats}
      classNames={{
        header: 'shadow-sm',
      }}
    />
  );
};
