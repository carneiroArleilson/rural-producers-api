import { IsCpfCnpj } from 'src/utils/validators/is-cpf-cnpj.validator';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProducerDto {
  @IsCpfCnpj({ message: 'CPF ou CNPJ inválido' })
  @IsOptional()
  cpfCnpj?: string;

  @IsString()
  @IsOptional()
  name?: string;
}

