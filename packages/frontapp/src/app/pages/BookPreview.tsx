import { Fragment, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookInfo from '../components/BookInfo';
import AllBooksList from '../components/AllBooksList';
import styled from '@emotion/styled';
import { useAppSelector } from '../hooks/useTypedSelector';

import { colors, dimensions } from '@mimir/ui-kit';
import {
  useGetMaterialByIdQuery,
  useGetAllMaterialsQuery,
  useGetStatusesByMaterialLazyQuery,
  GetStatusesByMaterialQuery,
} from '@mimir/apollo-client';
import { ReactComponent as ScrollButtonRight } from '../../assets/ArrowButtonRight.svg';
import { ReactComponent as ScrollButtonLeft } from '../../assets/ArrowButtonLeft.svg';
import DonateInfo from '../components/DonateInfo';
import BackButton from '../components/BackButton';
import { RolesTypes, StatusTypes } from '@mimir/global-types';
import { TextArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import Search from '../components/Search';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../hooks/useDebounce';
import Table from '../globalUI/Table';
import SingleUser from '../components/UserList/SingleUser';
import { IClaimHistory } from '../models/helperFunctions/claimHistory';
import { getDates, isOverdue } from '../models/helperFunctions/converTime';
import { locationIds } from '../store/slices/userSlice';
import { toast } from 'react-toastify';

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${dimensions.base};
  @media (max-width: ${dimensions.phone_width}) {
    display: none;
  }
`;

const Suggestions = styled.div`
  margin: ${dimensions.base_2} 0;
  display: flex;
`;

const SuggestionText = styled.h3`
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  flex: 1;
`;

const ClaimHistoryWrapper = styled.div`
  margin-top: calc(${dimensions.base_2}*2);
`;

const SearchWrapper = styled.div`
  margin: ${dimensions.xl_2} 0 ${dimensions.base};
`;

const RestyleSingleUser = styled(SingleUser)`
  padding: 0;
  height: auto;
  background: none;
  box-shadow: none;
`;

const FieldsText = styled.p<IFieldsTextProps>`
  font-weight: 500;
  font-size: ${dimensions.sm};
  color: ${({ overdue, returned }) =>
    overdue
      ? colors.problem_red
      : returned
      ? colors.free_book
      : colors.accent_color};
  margin-bottom: ${dimensions.xs_2};
`;

interface IFieldsTextProps {
  overdue?: boolean;
  returned?: boolean;
}

type BookPreviewProps = {
  donate?: boolean;
};

const columnTitles = ['User', 'Deadline', 'State'];

const BookPreview = ({ donate }: BookPreviewProps) => {
  const { item_id } = useParams();
  const [search, setSearch] = useState<string>('');
  const [claimHistory, setClaimHistory] =
    useState<GetStatusesByMaterialQuery['getStatusesByMaterial']>();
  const debounceSearch = useDebounce<string>(search, 1000);
  const { t } = useTranslation();
  const { id, userRole } = useAppSelector((state) => state.user);
  const locations = useAppSelector(locationIds);
  const { data, loading, error } = useGetMaterialByIdQuery({
    variables: { id: item_id! },
  });
  const [getStatusesByMaterial, { error: getStatusesError }] =
    useGetStatusesByMaterialLazyQuery({
      variables: {
        material_id: item_id!,
      },
    });
  const { data: getAllMaterials, error: getAllMaterialsError } =
    useGetAllMaterialsQuery({
      variables: { locations },
    });
  const filteredHistory = useMemo(
    () =>
      claimHistory?.filter((item) =>
        item?.person.username.match(new RegExp(debounceSearch, 'i'))
      ),
    [claimHistory, debounceSearch]
  );

  const lastStatusAnotherPerson = data?.getMaterialById.statuses.slice(-1)[0];

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const countReturnDate = (created_at: Date) => {
    const day = `${getDates(created_at).returnDate.getDate()}`.padStart(2, '0');
    const month = `${getDates(created_at).returnDate.getMonth() + 1}`.padStart(
      2,
      '0'
    );
    return `${t('UserCard.Table.ReturnTill')} ${day}.${month}`;
  };

  useEffect(() => {
    getStatusesByMaterial({
      variables: {
        material_id: item_id!,
      },
    }).then(({ data }) => {
      setClaimHistory(data?.getStatusesByMaterial);
    });
  }, []);

  useEffect(() => {
    if (error || getAllMaterialsError || getStatusesError) {
      toast.error(error || getAllMaterialsError || getStatusesError);
    }
  }, [error]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <BackButton />
      {donate ? (
        data?.getMaterialById && (
          <DonateInfo
            person_id={id}
            identifier={data.getMaterialById.identifier}
            src={data?.getMaterialById.picture}
            title={data?.getMaterialById.title}
            author={data?.getMaterialById.author}
            category={data?.getMaterialById.category}
            statusInfo={lastStatusAnotherPerson}
            created_at={lastStatusAnotherPerson?.created_at}
            material_id={parseInt(data.getMaterialById.id)}
            description={data?.getMaterialById.description}
            updated_at={data?.getMaterialById?.updated_at}
            type={data?.getMaterialById?.type}
            location={data?.getMaterialById.location}
          />
        )
      ) : (
        <>
          {data?.getMaterialById && (
            <BookInfo
              person_id={id}
              identifier={data.getMaterialById.identifier}
              src={data?.getMaterialById.picture}
              title={data?.getMaterialById.title}
              author={data?.getMaterialById.author}
              category={data?.getMaterialById.category}
              statusInfo={lastStatusAnotherPerson}
              created_at={lastStatusAnotherPerson?.created_at}
              material_id={parseInt(data.getMaterialById.id)}
              description={data?.getMaterialById.description}
              updated_at={data?.getMaterialById?.updated_at}
              type={data?.getMaterialById?.type}
              location={data.getMaterialById.location}
            />
          )}
          {userRole === RolesTypes.READER ? (
            <>
              <Suggestions>
                <SuggestionText>You may also like</SuggestionText>
                <ButtonGroup>
                  <ScrollButtonLeft />
                  <ScrollButtonRight />
                </ButtonGroup>
              </Suggestions>
              <AllBooksList
                sortingCategory={data?.getMaterialById.category}
                items={getAllMaterials?.getAllMaterials}
              />
            </>
          ) : (
            <ClaimHistoryWrapper>
              <TextArticle>{t('BookClaimHistory.Title')}</TextArticle>
              <TextBase>{t('BookClaimHistory.Desc')}</TextBase>
              <SearchWrapper>
                <Search
                  handleChangeSearch={handleChangeSearch}
                  placeholder={t('Search.UsernamePlaceholder')}
                  search={search}
                />
              </SearchWrapper>
              <Table
                columnTitles={columnTitles}
                rows={
                  filteredHistory &&
                  filteredHistory
                    .map((item) => {
                      if (!item) return <></>;
                      return (
                        <Fragment key={item?.id}>
                          <RestyleSingleUser
                            avatar={item?.person.avatar}
                            id={item?.person.id}
                            name={item?.person.username}
                            statuses={item?.person.statuses as IClaimHistory[]}
                          />
                          <FieldsText>
                            {countReturnDate(item.created_at)}
                          </FieldsText>
                          {item.status === StatusTypes.FREE ? (
                            <FieldsText returned>
                              {t('UserCard.Table.Returned')}
                            </FieldsText>
                          ) : isOverdue(item.created_at) ? (
                            <FieldsText overdue>
                              {t('UserCard.Table.Overdue')}
                            </FieldsText>
                          ) : (
                            <FieldsText>
                              {item.status === StatusTypes.BUSY
                                ? t('UserCard.Table.Claim')
                                : item.status === StatusTypes.PROLONG
                                ? t('UserCard.Table.Prolong')
                                : item.status === StatusTypes.PENDING
                                ? t('Statuses.Pending')
                                : t('Statuses.Rejected')}
                            </FieldsText>
                          )}
                        </Fragment>
                      );
                    })
                    .reverse()
                }
              ></Table>
            </ClaimHistoryWrapper>
          )}
        </>
      )}
    </>
  );
};

export default BookPreview;
