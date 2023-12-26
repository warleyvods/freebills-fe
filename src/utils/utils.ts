export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function translateCategories(categories: string[]): string[] {
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

export function getMonthName(month: number) {
  switch (month) {
    case 1:
      return "Janeiro";
    case 2:
      return "Fevereiro";
    case 3:
      return "Março";
    case 4:
      return "Abril";
    case 5:
      return "Maio";
    case 6:
      return "Junho";
    case 7:
      return "Julho";
    case 8:
      return "Agosto";
    case 9:
      return "Setembro";
    case 10:
      return "Outubro";
    case 11:
      return "Novembro";
    case 12:
      return "Dezembro";
  }
}

export const updateMonth = (currentMonth, operation) => {
  let newMonth;
  if (operation === 'increment') {
    newMonth = currentMonth < 12 ? currentMonth + 1 : 1;
  } else if (operation === 'decrement') {
    newMonth = currentMonth > 1 ? currentMonth - 1 : 12;
  }
  return newMonth;
};

export const updateYear = (currentYear, newMonth, operation) => {
  if (operation === 'increment') {
    return newMonth === 1 ? currentYear + 1 : currentYear;
  } else if (operation === 'decrement') {
    return newMonth === 12 ? currentYear - 1 : currentYear;
  }
};

export interface Options {
  value: string;
  label: string;
  active?: boolean
}
