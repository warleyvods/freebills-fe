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
                label: 'Total',
                formatter: function (w) {
                  const total = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);

                  return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                }
              },
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

export function formatDate(date: string): string {
  const parts = date.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
