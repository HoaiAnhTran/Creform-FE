import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@mantine/core';
import dayjs from 'dayjs';

import { UnSignedHeader } from '@/atoms/UnsignedHeader';
import { PATH } from '@/constants';
import { ResponseRow, ResponsesTable } from '@/molecules/ResponsesTable';
import { TopBarSubmission } from '@/organisms/ActionToolbar';
import { useGetResponsesByFormIdQuery } from '@/redux/api/responseApi';
import { GetResponsesParams } from '@/types';

export const ResponsesPage = () => {
  const { formId } = useParams();
  const [selectedRecords, setSelectedRecords] = useState<ResponseRow[]>([]);
  const [params, setParams] = useState<GetResponsesParams>();
  const navigate = useNavigate();
  const { data: response, isLoading } = useGetResponsesByFormIdQuery({
    formId: Number(formId),
    ...params,
  });

  const rawRecords = response?.responses;

  const responseRows: ResponseRow[] | undefined = useMemo(
    () =>
      rawRecords?.map((record) => {
        const answers = record.formAnswers.reduce(
          (elementAnswersList, elementAnswers, currentIndex) => {
            const elementAnswer = {
              [`NameElement${currentIndex}`]: elementAnswers.elementName,
              [`ValueElement${currentIndex}`]: elementAnswers.answers
                .map((fieldAnswer) => fieldAnswer.text)
                .join(' '),
            };

            const fieldsAnswers = elementAnswers.answers.reduce(
              (answers, currentFieldAnswer, currentIndex) => ({
                ...answers,
                [`NameField${currentIndex}`]: currentFieldAnswer.fieldName,
                [`ValueField${currentIndex}`]: currentFieldAnswer.text,
              }),
              { ...elementAnswer },
            );
            return { ...elementAnswersList, ...fieldsAnswers };
          },
          {
            id: record.id,
            createdAt: dayjs(record.createdAt).format('MMM DD, YYYY'),
          },
        );

        return {
          ...answers,
        };
      }),
    [rawRecords],
  );
  const selectedResponseIds = useMemo(
    () => selectedRecords.map((selectedRecord) => selectedRecord.id as number),
    [selectedRecords],
  );
  if (response === undefined) return <div></div>;
  if (responseRows?.length == 0) {
    return (
      <Modal
        title='No Records Found'
        size='xs'
        opened={true}
        onClose={() => {
          navigate(PATH.OVERVIEW_PAGE);
        }}
        padding='lg'
      >
        <div className='text-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mx-auto mb-8 h-24 w-24 text-gray-400'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 2a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8zm0 14a6 6 0 0 1-6-6c0-2.823 2.64-6 6-6s6 3.177 6 6a6 6 0 0 1-6 6z'
              clipRule='evenodd'
            />
            <path d='M9 10a1 1 0 0 0 2 0V7a1 1 0 1 0-2 0v3z' />
          </svg>
          <p className='mb-8 text-lg text-gray-600'>Oops! No records found.</p>
        </div>
      </Modal>
    );
  }
  return (
    <div>
      <div className='h-screen bg-gray-200'>
        <div className='h-headerHeight bg-malachite-500 px-4 pt-4'>
          <UnSignedHeader />
        </div>
        <TopBarSubmission
          formId={Number(formId)}
          selectedResponseIds={selectedResponseIds}
          setSelectedRecords={setSelectedRecords}
          showingResponseRows={responseRows || []}
        />
        <div>
          <ResponsesTable
            totalResponses={response.totalResponses}
            pageSize={response.pageSize}
            isLoading={isLoading}
            responseRows={responseRows || []}
            selectedRecords={selectedRecords}
            setSelectedRecords={setSelectedRecords}
            params={params}
            setParams={setParams}
          />
        </div>
      </div>
    </div>
  );
};
