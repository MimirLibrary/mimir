import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import LabeledCheckbox from '../LabeledCheckbox';

const Wrapper = styled.div`
  display: flex;
  gap: ${dimensions.xs_1};
`;

const LocationsContainer = ({ locations }: any) => {
  // const isChecked = (id: string): boolean => {
  //   if (!locations.length) return false;
  //   const currentLocation = locations.find((item: any) => item.id === id);
  //   return !!currentLocation;
  // };

  // const isDisabled = (index: number): boolean => {
  //   if (locations.length > 1) return false;
  //   const currentLoc = locations.find((item: any) => +item.id === index + 1);
  //   return !!(locations.length === 1 && currentLoc);
  // };

  return (
    <Wrapper>
      {locations.map((location: any, index: number) => (
        <LabeledCheckbox
          key={location.id}
          id={location.id}
          value={location.location}
          // checked={isChecked(location.id)}
        ></LabeledCheckbox>
      ))}
    </Wrapper>
  );
};

export default LocationsContainer;
