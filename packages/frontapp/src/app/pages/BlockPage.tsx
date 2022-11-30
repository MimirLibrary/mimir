import React, { useEffect, useState } from 'react';
import { ContentModal, ModalBackground } from '../components/Modal';
import { Description } from '../components/UserCard';
import { t } from 'i18next';
import styled from '@emotion/styled';
import { ReactComponent as SadMimir } from '../../assets/SadMimir.svg';
import { dimensions } from '@mimir/ui-kit';
import { useAppDispatch } from '../hooks/useTypedDispatch';
import { useGetReasonOfBlockQuery } from '@mimir/apollo-client';
import { updateBlocked } from '../store/slices/userSlice';
import { useAppSelector } from '../hooks/useTypedSelector';
import { toast } from 'react-toastify';

const SadMimirImage = styled(SadMimir)`
  width: 128px;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${dimensions.base};
  margin: ${dimensions.base_2};
`;

const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
`;

const BlockPage = () => {
  const { blocked, id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [blockedState, setBlocked] = useState<boolean>(blocked);
  const { data, loading, error } = useGetReasonOfBlockQuery({
    variables: { id: String(id) },
  });
  if (!loading) {
    if (
      blocked !== data?.getReasonOfBlock?.state &&
      data?.getReasonOfBlock?.state !== undefined
    ) {
      dispatch(updateBlocked(!blocked));
      setBlocked(!blocked);
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div>
      <ModalBackground visible={blockedState}>
        <ContentModal>
          <ModalWrapper>
            <Description bold titlee>
              {t('Block.Opps')}
            </Description>
            {data?.getReasonOfBlock?.description ? (
              <InlineWrapper>
                <Description bold>{t('Block.ReasonForBlock')}</Description>
                <Description>{data?.getReasonOfBlock?.description}</Description>
              </InlineWrapper>
            ) : null}
            <SadMimirImage />
          </ModalWrapper>
        </ContentModal>
      </ModalBackground>
    </div>
  );
};

export default BlockPage;
