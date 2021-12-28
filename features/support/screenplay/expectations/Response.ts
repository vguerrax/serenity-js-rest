import { Expectation } from '@serenity-js/core';

export type ExpectedPropertyValue = {
  property: string,
  value: unknown
}

export const objectHasTheProperties = function (expected: string[]) {
  return Expectation.thatActualShould<any, string[]>('has the properties', expected)
    .soThat((actualObject: any, listOfProperties:string[]) => {
      let hasProperties = true;
      listOfProperties.forEach((property) => {
        let actualValue: any|null = null;
        if (property.match(/\./)) {
          const propertyArray = property.split('.');
          const rootProperty = propertyArray.shift() as string;
          actualValue = actualObject[rootProperty];
          propertyArray.forEach((p) => {
            actualValue = actualValue[p];
          });
        } else actualValue = actualObject[property];
        if (actualValue) hasProperties = true;
        else hasProperties = false;
      });
      return hasProperties;
    });
};

export const listOfObjectsHasProperties = function (expected: string[]) {
  return Expectation.thatActualShould<any, string[]>(' has the properties', expected)
    .soThat((actualObjects: any[], listOfProperties:string[]) => {
      let hasProperties = true;
      actualObjects.forEach((actualObject) => {
        listOfProperties.forEach((property) => {
          let actualValue: any|null = null;
          if (property.match(/\./)) {
            const propertyArray = property.split('.');
            const rootProperty = propertyArray.shift() as string;
            actualValue = actualObject[rootProperty];
            propertyArray.forEach((p) => {
              actualValue = actualValue[p];
            });
          } else actualValue = actualObject[property];
          if (actualValue) hasProperties = true;
          else hasProperties = false;
        });
      });
      return hasProperties;
    });
};

export const objectHasThePropertiesWithTheValues = (expected: ExpectedPropertyValue[]) => Expectation.thatActualShould<any, ExpectedPropertyValue[]>('has the properties with the values', expected)
  .soThat((actualObject: any, listOfPropertiesAndValues: ExpectedPropertyValue[]) => {
    let propertiesHasValues = true;
    listOfPropertiesAndValues.forEach(({ property, value }) => {
      let actualValue: any|null = null;
      if (property.match(/\./)) {
        const propertyArray = property.split('.');
        const rootProperty = propertyArray.shift() as string;
        actualValue = actualObject[rootProperty];
        propertyArray.forEach((p) => {
          actualValue = actualValue[p];
        });
      } else actualValue = actualObject[property];
      propertiesHasValues = actualValue === value;
    });
    return propertiesHasValues;
  });
