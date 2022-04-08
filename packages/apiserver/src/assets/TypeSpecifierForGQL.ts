export class TypeSpecifierForGQL {
  public static createTypeNameAndErrorMessage(
    typeName: string,
    message: string
  ) {
    return {
      __typename: typeName,
      message,
    };
  }

  public static createTypeNameAndValue<T>(typeName: string, value: T) {
    return {
      __typename: typeName,
      ...value,
    };
  }
}
