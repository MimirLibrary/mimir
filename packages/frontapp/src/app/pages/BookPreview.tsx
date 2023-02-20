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
import { isOverdue } from '../models/helperFunctions/converTime';
import { locationIds } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import Loader, { WrapperLoader } from '../components/Loader';
import { useMediaQuery } from 'react-responsive';
import CarouselWrapper from '../components/CarouselWrapper';

const Suggestions = styled.div`
  margin: ${dimensions.base_2} 0;
  display: flex;
  position: relative;
`;

const SuggestionText = styled.h3`
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  flex: 1;
`;

const ClaimHistoryWrapper = styled.div`
  margin-top: calc(${dimensions.base_2});
`;

const SearchWrapper = styled.div`
  margin: ${dimensions.xl_2} 0 ${dimensions.base};
`;

const RestyleSingleUser = styled(SingleUser)`
  padding: 0;
  height: auto;
  background: none;
  box-shadow: none;
  :hover {
    box-shadow: none;
  }

  @media (max-width: ${dimensions.tablet_width}) {
    margin-bottom: ${dimensions.sm};
    :first-of-type {
      width: 100%;
    }
  }
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
  const isMobile = useMediaQuery({ maxWidth: dimensions.phone_width });
  const isTablet = useMediaQuery({ maxWidth: dimensions.tablet_width });
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

  const lastStatusAnotherPerson = data?.getMaterialById.currentStatus;

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const formatReturnDate = (returnDate: string) => {
    const day = `${new Date(returnDate).getDate()}`.padStart(2, '0');
    const month = `${new Date(returnDate).getMonth() + 1}`.padStart(2, '0');
    return `${t('UserCard.Table.ReturnTill')} ${day}.${month}`;
  };

  const sortedByCategoryList = getAllMaterials?.getAllMaterials?.filter(
    (item) => item?.category === data?.getMaterialById.category
  );

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

  if (loading)
    return (
      <WrapperLoader>
        <Loader height={100} width={100} color={`${colors.accent_color}`} />
      </WrapperLoader>
    );

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
            returnDate={lastStatusAnotherPerson?.returnDate}
            material_id={parseInt(data.getMaterialById.id)}
            description={data?.getMaterialById.description}
            updated_at={data?.getMaterialById?.updated_at}
            type={data?.getMaterialById?.type}
            location={data?.getMaterialById.location}
            claimDuration={data?.getMaterialById.claimDuration}
          />
        )
      ) : (
        <>
          {data?.getMaterialById && (
            <BookInfo
              identifier={data.getMaterialById.identifier}
              src={data?.getMaterialById.picture}
              title={data?.getMaterialById.title}
              author={data?.getMaterialById.author}
              category={data?.getMaterialById.category}
              statusInfo={lastStatusAnotherPerson}
              created_at={lastStatusAnotherPerson?.created_at}
              returnDate={lastStatusAnotherPerson?.returnDate}
              material_id={parseInt(data.getMaterialById.id)}
              description={data?.getMaterialById.description}
              updated_at={data?.getMaterialById?.updated_at}
              type={data?.getMaterialById?.type}
              location={data.getMaterialById.location}
              claimDuration={data.getMaterialById.claimDuration}
            />
          )}
          {userRole === RolesTypes.READER ? (
            isTablet ? (
              <>
                <Suggestions>
                  <SuggestionText>{t('BookPreviewMessage')}</SuggestionText>
                </Suggestions>
                <AllBooksList items={sortedByCategoryList} />
              </>
            ) : (
              <CarouselWrapper
                slidesListLength={sortedByCategoryList?.length}
                header={
                  <SuggestionText>{t('BookPreviewMessage')}</SuggestionText>
                }
                slides={<AllBooksList items={sortedByCategoryList} forSlider />}
              />
            )
          ) : (
            <ClaimHistoryWrapper>
              <TextArticle>{t('BookClaimHistory.Title')}</TextArticle>
              <TextBase>{t('BookClaimHistory.Desc')}</TextBase>
              <SearchWrapper>
                <Search
                  isFullWidth={true}
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
                            isUnderlined={isMobile}
                          />
                          <FieldsText>
                            {item.returnDate &&
                              formatReturnDate(item.returnDate)}
                          </FieldsText>
                          {item.status === StatusTypes.FREE ? (
                            <FieldsText returned>
                              {t('UserCard.Table.State') + ': '}
                              {t('UserCard.Table.Returned')}
                            </FieldsText>
                          ) : isOverdue(item.returnDate) ? (
                            <FieldsText overdue>
                              {t('UserCard.Table.State') + ': '}
                              {t('UserCard.Table.Overdue')}
                            </FieldsText>
                          ) : (
                            <FieldsText>
                              {t('UserCard.Table.State') + ': '}
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
