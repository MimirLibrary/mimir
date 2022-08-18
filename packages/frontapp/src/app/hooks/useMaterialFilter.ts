import { RefObject, useEffect } from 'react';
import { GetAllMaterialsQuery } from '@mimir/apollo-client';
import { getStatus } from '../models/helperFunctions/converTime';
type filterObjectType = { [author: string]: number };
const useMaterialFilter = (
  availableMaterial: GetAllMaterialsQuery['getAllMaterials'],
  filterName: string
) => {
  if (filterName === 'availability') {
    return availableMaterial?.reduce((acc: filterObjectType, material: any) => {
      const lastStatus = material.statuses.slice(-1)[0];
      const currentStatus = getStatus(lastStatus?.status, material?.created_at);
      return {
        ...acc,
        [currentStatus as string]: acc[currentStatus as string]
          ? acc[currentStatus as string]! + 1
          : 1,
      };
    }, {});
  }
  const result = availableMaterial?.reduce(
    (acc: filterObjectType, material: any) => ({
      ...acc,
      [material[filterName]]: acc[material[filterName]]
        ? acc[material[filterName]] + 1
        : 1,
    }),
    {}
  );
  return result;
};

export default useMaterialFilter;
