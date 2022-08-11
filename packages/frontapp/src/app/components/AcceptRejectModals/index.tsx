import { Dispatch, FC, SetStateAction } from 'react';
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessge';
import {
  GetMaterialByIdDocument,
  GetAllTakenItemsDocument,
  useReturnBookMutation,
  useRejectItemMutation,
  GetAllMaterialsDocument,
} from '@mimir/apollo-client';
import { IStatus } from '../../types';

type IDonateProps = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  title: string | undefined;
  statusInfo: IStatus;
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
  const [returnBook] = useReturnBookMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });
  const acceptBook = async () => {
    await returnBook({
      variables: {
        person_id: parseInt(statusInfo.person?.id || '0'),
        identifier,
      },
      refetchQueries: [GetAllMaterialsDocument],
    });
    setActive(false);
  };
  const [rejectItem] = useRejectItemMutation({
    refetchQueries: [GetMaterialByIdDocument, GetAllTakenItemsDocument],
  });

  const rejectBook = async () => {
    await rejectItem({
      variables: {
        person_id: parseInt(statusInfo.person?.id || '0'),
        identifier,
      },
      refetchQueries: [GetAllMaterialsDocument],
    });
    setActive(false);
  };
  return (
    <Modal active={active} setActive={setActive}>
      {method === 'reject' ? (
        <ErrorMessage
          title="Warning!"
          message={`Are you sure you want to reject the book "${title}" from the library?`}
          setActive={setActive}
          titleCancel="Yes, reject"
          titleOption="Cancel"
          onClick={rejectBook}
        />
      ) : (
        <ErrorMessage
          title="Warning!"
          message={`Are you sure you want to add the book "${title}" from the library?`}
          setActive={setActive}
          titleCancel="Yes, accept"
          titleOption="Cancel"
          onClick={acceptBook}
        />
      )}
    </Modal>
  );
};

export default AcceptRejectModals;
