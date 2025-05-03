import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakecaseNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(targetName: string, userSpecifiedName?: string): string {
    return userSpecifiedName || snakeCase(targetName);
  }

  columnName(
    propertyName: string,
    customName?: string,
    embeddedPrefixes?: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes?.join('_') || '') +
      (customName || snakeCase(propertyName))
    );
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}
