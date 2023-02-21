import styled from '@emotion/styled';
import { RolesTypes } from '@mimir/global-types';
import { colors, dimensions } from '@mimir/ui-kit';
import { FC } from 'react';
import InlineWrapper from '../ClaimTable/InlineWrapper';

const TabsWrapper = styled(InlineWrapper)`
  margin-top: ${dimensions.xl_2};
`;
interface ISortTextProps {
  isActive?: boolean;
}

const Tab = styled.div<ISortTextProps>`
  cursor: pointer;
  border-bottom: 3px solid;
  font-size: ${dimensions.base};
  font-weight: 400;
  text-align: center;
  width: 135px;
  color: ${({ isActive }) => (isActive ? colors.accent_color : null)};
  border-bottom-color: ${({ isActive }) =>
    isActive ? colors.accent_color : colors.bg_own_claim};
  padding-bottom: ${dimensions.xs};

  :active {
    color: ${colors.accent_color};
    border-bottom: 3px solid;
    border-bottom-color: ${colors.accent_color};
  }

  @media (max-width: ${dimensions.phone_width}) {
    padding: 15px;
    width: 50%;
  } ;
`;

interface ITabsProps {
  tabs: Array<RolesTypes>;
  activeTab: RolesTypes;
  onChange: (tab: RolesTypes) => void;
}

const Tabs: FC<ITabsProps> = ({ tabs, activeTab, onChange, children }) => {
  return (
    <>
      <TabsWrapper>
        {tabs.map((tab) => (
          <Tab
            key={tab}
            isActive={tab === activeTab}
            onClick={() => onChange(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabsWrapper>
      {children}
    </>
  );
};

export default Tabs;
