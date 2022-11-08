import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { TUserLocation } from '../../store/slices/userSlice';
import LabeledCheckbox from '../LabeledCheckbox';

const Wrapper = styled.div`
  display: flex;
  gap: ${dimensions.xs_1};
  flex-wrap: wrap;
`;

interface ILocationsContainer {
  locations: TUserLocation[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    option: TUserLocation
  ) => void;
}

const LocationsContainer: React.FC<ILocationsContainer> = ({
  locations,
  onChange,
}) => {
  const userLocations = useAppSelector((state) => state.user.locations);

  const isChecked = (id: string): boolean => {
    if (!userLocations.length) return false;
    const currentLocation = userLocations.find((item) => item.id === id);
    return !!currentLocation;
  };

  const isDisabled = (id: string): boolean => {
    if (userLocations.length > 1) return false;
    const currentLoc = userLocations.find((item) => +item.id === +id);
    return !!(userLocations.length === 1 && currentLoc);
  };

  return (
    <Wrapper>
      {locations.map((location) => (
        <LabeledCheckbox
          key={location.id}
          id={location.id}
          value={location.value}
          checked={isChecked(location.id)}
          disabled={isDisabled(location.id)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e, location)
          }
        ></LabeledCheckbox>
      ))}
    </Wrapper>
  );
};

export default LocationsContainer;
