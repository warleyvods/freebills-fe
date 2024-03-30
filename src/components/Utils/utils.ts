import * as yup from "yup";

export function phoneMask(v) {
  let r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");

  if (r.length > 11) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (r.length > 7) {
    r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else if (v.trim() !== "") {
    r = r.replace(/^(\d*)/, "($1");
  }
  return r;
}

export function moneyFormat(value: number) {
  const roundedValue = (Math.round(value * 100) / 100).toFixed(2);

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(roundedValue));
}

export function CEPFormat(str){
  var re = /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/;

  if(re.test(str)){
    return str.replace(re,"$1.$2-$3");
  }else{
    alert("CEP inválido!");
  }

  return '';
}

export const phoneTypes = {
  'CELULAR': "Celular",
  'RESIDENCIAL': "Residencial",
  'COMERCIAL': "Comercial",
}

export const profilesTypes = {
  'MASCULINO': "Masculino",
  'FEMININO': "Feminino",
  'SOLTEIRO': "Solteiro",
  'CASADO': 'Casado'
}

export function beforeMaskedStateChange({ nextState }: any) {
  let { value } = nextState;
  if (value.endsWith("/")) {
    value = value.slice(0, -1);
  }

  console.log(nextState)
  console.log(value)
  return {
    ...nextState,
    value
  };
}

export const createEmployeeValidationSchema = yup.object().shape({
  registration: yup.number().required('Matricula obrigatória'),
  employeeName: yup.string().required('Nome obrigatório'),
  rg: yup.string().required('RG obrigatório'),
  cpf: yup.string().required('CPF obrigatório'),
  pis: yup.string().required('Pis/Pasep obrigatórios'),
  sex: yup.string().required('Sexo obrigatório'),
  broadPosition: yup.string().required('Cargo'),
  function: yup.string().required('Função obrigatório'),
  department: yup.string().required('Departamento obrigatório'),
  admissionDate: yup.string().required('Data de admissão obrigatória'),
  unity: yup.string().required('Unidade obrigatório'),
  classification: yup.string().required('Classificação obrigatório'),
  placeOfBirth: yup.string().required('Localidade obrigatório'),
  birthDate: yup.string().required('Data de nascimento obrigatório'),
  email: yup.string().required('Email corporativo obrigatório').email('Email corporativo invalido'),
  status: yup.boolean().required().equals([true])
})

export const accountType = {
  'CHECKING_ACCOUNT': 'Conta Corrente',
  'SAVINGS': 'Poupança',
  'MONEY': 'Dinheiro',
  'INVESTMENTS': 'Investimentos',
  'OUTHERS': 'Outros'
}

function alert(arg0: string) {
    throw new Error("Function not implemented.");
}

