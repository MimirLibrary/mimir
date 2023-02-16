import { t } from 'i18next';
import { FC, useEffect } from 'react';
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessge';
import {
  GetMaterialByIdDocument,
  GetAllTakenItemsDocument,
  useRejectItemMutation,
  GetAllMaterialsDocument,
  useAcceptBookMutation,
} from '@mimir/apollo-client';
import { toast } from 'react-toastify';
import { IStatus } from '../../types';

type IDonateProps = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  title: string | undefined;
  statusInfo?: IStatus | null;
  identifier: string;
  method: string;
};
const AcceptRejectModals: FC<IDonateProps> = ({
  active,
  setActive,
  title,
  statusInfo,
  identifier,
  method,
}) => {
  const [acceptBookData, { error: returnError }] = useAcceptBookMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });

  const acceptBook = async () => {
    await acceptBookData({
      variables: {
        person_id: statusInfo!.person_id!,
        identifier,
      },
      refetchQueries: [GetAllMaterialsDocument],
    });
    setActive(false);
  };

  const [rejectItem, { error: rejectError }] = useRejectItemMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });

  const rejectBook = async () => {
    await rejectItem({
      variables: {
        person_id: statusInfo!.person_id!,
        identifier,
      },
      refetchQueries: [GetAllMaterialsDocument],
    });
    setActive(false);
  };

  useEffect(() => {
    if (rejectError || returnError) {
      toast.error(rejectError || returnError);
    }
  }, [returnError, rejectError]);

  return (
    <Modal active={active} setActive={setActive}>
      {method === 'reject' ? (
        <ErrorMessage
          title={t('ManagerDonateModal.Title')}
          message={t('ManagerDonateModal.MessageReject').replace(
            '${title}',
            title as string
          )}
          setActive={setActive}
          titleCancel={t('ManagerDonateModal.Buttons.Reject')}
          titleOption={t('ManagerDonateModal.Buttons.Cancel')}
          onClick={rejectBook}
        />
      ) : (
        <ErrorMessage
          title={t('ManagerDonateModal.Title')}
          message={t('ManagerDonateModal.MessageAccept').replace(
            '${title}',
            title as string
          )}
          setActive={setActive}
          titleCancel={t('ManagerDonateModal.Buttons.Accept')}
          titleOption={t('ManagerDonateModal.Buttons.Cancel')}
          onClick={acceptBook}
        />
      )}
    </Modal>
  );
};

export default AcceptRejectModals;
