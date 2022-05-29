import React, { useState } from 'react';
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import chinaJson from '../../libs/china.js';
import jsonp from 'jsonp';

const MapInfo: React.FC = () => {
  const [mapData, setData] = useState();
  const [loading, setLoad] = useState(false);
  const province = {
    安徽: '安徽省',
    北京: '北京市',
    福建: '福建省',
    甘肃: '甘肃省',
    广东: '广东省',
    广西: '广西壮族自治区',
    贵州: '贵州省',
    海南: '海南省',
    河北: '河北省',
    河南: '河南省',
    黑龙江: '黑龙江省',
    湖北: '湖北省',
    湖南: '湖南省',
    吉林: '吉林省',
    江苏: '江苏省',
    江西: '江西省',
    辽宁: '辽宁省',
    内蒙古: '蒙古自治区',
    宁夏: '宁夏回族自治区',
    青海: '青海省',
    山东: '山东省',
    山西: '山西省',
    陕西: '陕西省',
    上海: '上海市',
    四川: '四川省',
    天津: '天津市',
    西藏: '西藏自治区',
    新疆: '新疆维吾尔自治区',
    云南: '云南省',
    浙江: '浙江省',
    重庆: '重庆市',
    香港: '香港特别行政区',
    澳门: '澳门特别行政区',
    台湾: '台湾省',
  };
  if (loading == false)
    jsonp(
      'https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',
      (_, data) => {
        const provinceData = data.data.list.map((item: any) => {
          return {
            name: (province as any)[item.name],
            value: item.econNum,
          };
        });
        // console.log(provinceData);
        setData(provinceData);
        setLoad(true);
      },
    );
  console.log('map', mapData);
  echarts.registerMap('china', { geoJSON: chinaJson as any, specialAreas: {} });
  const getOption = () => {
    const option: echarts.EChartsOption = {
      title: {
        text: '中国疫情地图',
        left: 550,
        top: 50,
        textStyle: {
          color: '#9c0505',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '省份：{b} <br/> 现有确诊 {c}',
      },
      series: [
        {
          type: 'map',
          map: 'china',
          label: {
            show: true,
            color: 'black',
            align: 'center',
          },
          zoom: 1,
          roam: true,
          itemStyle: {
            borderColor: 'blue',
          },
          emphasis: {
            label: {
              color: 'black',
              fontSize: 10,
            },
            itemStyle: {
              areaColor: 'lightyellow',
            },
          },
          data: mapData,
        },
      ],
      visualMap: {
        type: 'piecewise',
        show: true,
        splitNumber: 6,
        pieces: [
          { min: 10000 },
          { min: 1000, max: 9999 },
          { min: 100, max: 999 },
          { min: 10, max: 99 },
          { min: 1, max: 9 },
          { min: 0, max: 0 },
        ],
        inRange: {
          color: [
            '#FFFFFF',
            '#FDEBCA',
            '#E25552',
            '#CA2B2D',
            '#831A26',
            '#500312',
          ],
        },
      },
    };
    return option;
  };
  return (
    <ReactEcharts
      option={getOption()}
      style={{ width: '100%', height: '100%' }}
    ></ReactEcharts>
  );
};

export default MapInfo;
