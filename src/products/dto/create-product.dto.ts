import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'The field name cannot be empty' })
  @IsString({ message: 'The field price is not a string' })
  readonly name: string;

  @IsNotEmpty({ message: 'The field price cannot be empty' })
  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsOptional()
  @IsString({ message: 'The field price is not a string' })
  readonly details: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly warranty: number;

  @IsOptional()
  @IsString({ message: 'The field price is not a string' })
  readonly img_url: string;

  @IsNumber()
  readonly idcategory: number;

  @IsNumber()
  readonly idbrand: number;
}
