export function getChartDataOptions(labels: string[], transactionType: string) {

  const revenueColors = [
    "#C53030",
    "#2B6CB0",
    "#38A169",
    "#805AD5",
    "#fff900",
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
      chart: {
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: true
      },
      tooltip: {
        enabled: true
      },
      fill: {
        colors: transactionType === 'REVENUE' ? revenueColors : expenseColors
      },
      states: {
        hover: {filter: {type: "lighten", value: 0.5}},
        active: {filter: {type: "none", value: 0}}
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: {show: true},
              total: {
                show: true,
                showAlways: true,
              }
            }
          }
        }
      }
    }
  };

  function translateCategories(categories: string[]): string[] {
    const translations = {
      'HOUSE': 'Casa',
      'EDUCATION': 'Educação',
      'ELECTRONIC': 'Eletrônicos',
      'LEISURE': 'Lazer',
      'RESTAURANT': 'Restaurante',
      'HEALTH': 'Saúde',
      'SERVICE': 'Serviços',
      'SUPERMARKET': 'Supermercado',
      'TRANSPORT': 'Transporte',
      'CLOTHES': 'Vestuário',
      'TRIPS': 'Viagens',
      'OTHERS': 'Outros',
      'AWARD': 'Prêmios',
      'GIFT': 'Presentes',
      'SALARY': 'Salário',
      'REAJUST': 'Reajuste'
    };

    return categories.map(category => translations[category] || category);
  }
}
