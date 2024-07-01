import { translateCategories } from "./utils";

export function getChartDataOptions(labels: string[], transactionType: string) {

  const revenueColors = [
    "#38A169",
    "#6594cb",
    "#67e19a",
    "#8e72c7",
    "#f5f287",
  ]

  const expenseColors = [
    "#C53030",
    "#2B6CB0",
    "#38A169",
    "#805AD5",
    "#fff900",
    "#b300e3",
    "#689af6",
    "#95ce43",
    "#e36fc6",
    "#c26c34",
    "#91746e",
    "#591313",
  ]

  return {
    options: {
      labels: translateCategories(labels),
      chart: {},
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'right',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '16px',
        fontFamily: 'Inter',
        fontWeight: 500,
        formatter: function (w) {
          return w;
        },
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 0,
        labels: {
          colors: ['#000000'],
          useSeriesColors: false
        },
        markers: {
          width: 25,
          height: 25,
          strokeWidth: 0,
          strokeColor: '#000000',
          fillColors: undefined,
          radius: 20,
          customHTML: function () {
            return `<div style="display: flex; 
                                align-items: center; 
                                justify-content: center; 
                                width: 25px; 
                                height: 25px; 
                                margin-right: 50px; 
                                border-radius: 50%;">
                      <div style="color: white; font-size: 12px;">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
                        </svg>
                      </div>
                    </div>`;
          },
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
        itemMargin: {
          horizontal: 5,
          vertical: 4
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
          return val
        },
        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: false,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 1.0
          }
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 0,
          color: '#000',
          opacity: 1
        }
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          const total = w.globals.seriesTotals.reduce((a, b) => {
            return a + b;
          }, 0);

          const singleValue = series[seriesIndex];
          const percentage = (singleValue / total) * 100;
          const label = w.globals.labels[seriesIndex];
          const color = w.globals.colors[seriesIndex];

          const valueInBrl = singleValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })

          return `<div style="color: black; background: white; padding: 10px; border-radius: 5px;">
            <div style="display: inline-block; width: 10px; height: 10px; background-color: ${color}; margin-right: 5px;"></div>
            <strong>${label}: ${valueInBrl}</strong><br/>
            <small style="font-size: 12px; font-weight: bold">${percentage.toFixed(2)}% do total</small>
          </div>`;
        },
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: false,
        style: {
          fontSize: '14px',
          fontFamily: undefined
        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
        x: {
          show: true,
          format: 'dd MMM',
          formatter: undefined,
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName) => seriesName,
          },
        },
        z: {
          formatter: undefined,
          title: 'Size: '
        },
        marker: {
          show: true,
        },
        fixed: {
          enabled: false,
          position: 'topRight',
          offsetX: 0,
          offsetY: 0,
        },
      },
      fill: {
        colors: undefined
      },
      states: {
        hover: {
          filter: {
            type: "none",
            value: 1
          }
        },
        active: {
          filter: {
            type: "none",
            value: 1
          }
        }
      },
      stroke: {
        show: true,
        curve: ['straight'],
        lineCap: 'butt',
        colors: ['#000000'],
        width: 0,
        dashArray: 0,
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 1
          },
          donut: {
            size: "68%",
            background: '#ffffff',
            labels: {
              show: true,
              name: {
                show: true,
                color: '#000000',
                formatter: function (label: string) {
                  return label;
                }
              },
              value: {
                show: true,
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: 600,
                color: '#000',
                offsetY: 0,
                formatter: function (val: string, opts) {
                  const numericVal = Number(val);
                  return numericVal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).toString();
                }
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                formatter: function (w) {
                  const total = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);

                  return total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  });
                }
              },
            }
          }
        }
      }
    }
  };
}

export function formatDate(date: string): string {
  const parts = date.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

//ICONS
export const HouseIcon = "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
export const PeopleIcon = "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
export const ReportsIcon = "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
export const AlertIcon = "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
