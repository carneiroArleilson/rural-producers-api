import { IsString } from 'class-validator';
import { IsCpfCnpj } from '../../utils/validators/is-cpf-cnpj.validator'

export class CreateProducerDto {
  @IsCpfCnpj({ message: 'CPF ou CNPJ inválido' })
  cpfCnpj: string;

  @IsString()
  name: string;
}
