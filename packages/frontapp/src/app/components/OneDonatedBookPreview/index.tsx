import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useGetOnePersonQuery } from '@mimir/apollo-client';
import { useNavigate } from 'react-router-dom';
import { dimensions } from '@mimir/ui-kit';
import AcceptRejectModals from '../AcceptRejectModals';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import CardView from './CardView';
import TableRowView from './TableRowView';
import styled from '@emotion/styled/macro';
import { StyledComponent } from '@emotion/styled';
import { IStatus } from '../../types';
import { StatusTypes } from '@mimir/global-types';

interface OneDonatorProps {
  title: string;
  identifier: string;
  lastStatus?: IStatus | null;
  id: number;
  index: number;
  picture?: string | null;
  description: string;
  search: string;
  setShownId: Dispatch<SetStateAction<number[]>>;
  shownId: Array<number>;
}

const CardListItem: StyledComponent<object, object, object> = styled.div`
  width: 100%;

  & + ${() => CardListItem} {
    margin-top: ${dimensions.base};
  }
`;

const OneDonator = ({
  id,
  identifier,
  picture,
  title,
  description,
  lastStatus,
  search,
  setShownId,
}: OneDonatorProps) => {
  const [acceptRejectMethod, setAcceptRejectMethod] = useState<
    'accept' | 'reject' | null
  >(null);
  const navigate = useNavigate();
  const handleRedirect = (item_id: number) => {
    navigate(`/donate/${item_id}`);
  };

  const { data: personName, error } = useGetOnePersonQuery({
    variables: {
      id: '' + lastStatus?.person_id,
    },
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (
      personName?.getOnePerson.username
        .toLowerCase()
        .includes(search.toLowerCase())
    )
      setShownId((arr) => [...arr, id]);
  }, [search]);
  const isMobile = useMediaQuery({
    query: `(max-width: ${dimensions.phone_width})`,
  });

  return (
    <>
      {isMobile ? (
        <CardListItem>
          <CardView
            picture={picture}
            title={title}
            description={description}
            username={personName?.getOnePerson?.username || 'unknown'}
            userId={lastStatus?.person_id}
            status={lastStatus?.status as StatusTypes}
            accept={() => setAcceptRejectMethod('accept')}
            reject={() => setAcceptRejectMethod('reject')}
            redirect={() => handleRedirect(id)}
          ></CardView>
        </CardListItem>
      ) : (
        <TableRowView
          picture={picture}
          title={title}
          description={description}
          username={personName?.getOnePerson?.username || 'unknown'}
          status={lastStatus?.status as StatusTypes}
          accept={() => setAcceptRejectMethod('accept')}
          reject={() => setAcceptRejectMethod('reject')}
          redirect={() => handleRedirect(id)}
        ></TableRowView>
      )}
      <AcceptRejectModals
        active={!!acceptRejectMethod}
        setActive={(value) => !value && setAcceptRejectMethod(null)}
        title={title}
        statusInfo={lastStatus}
        identifier={identifier}
        method={acceptRejectMethod || 'accept'}
      />
    </>
  );
};

export default OneDonator;
