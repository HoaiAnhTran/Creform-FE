import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ResponseRow, ResponsesTable } from '@/molecules/ResponsesTable';
import { Header } from '@/organisms/Header';
import { SubmissionTopbar } from '@/organisms/SubmissionTopbar';
import { useGetResponsesByFormIdQuery } from '@/redux/api/responseApi';
import { ElementType, GetResponsesParams } from '@/types';
import { formatDate } from '@/utils';

export const ResponsesPage = () => {
  const { formId } = useParams();

  const [selectedRecords, setSelectedRecords] = useState<ResponseRow[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [params, setParams] = useState<GetResponsesParams>();

  const { data: response } = useGetResponsesByFormIdQuery({
    formId: Number(formId),
    ...params,
  });

  const rawRecords = response?.responses;

  const responseRows: ResponseRow[] | undefined = useMemo(
    () =>
      rawRecords?.map((record) => {
        const answers = record.formAnswers.reduce(
          (elementAnswersList, elementAnswers) => {
            const elementAnswer = {
              [`NameElement${elementAnswers.elementId}`]:
                elementAnswers.elementName,
              [`ValueElement${elementAnswers.elementId}`]:
                elementAnswers.answers
                  .map((fieldAnswer) => fieldAnswer.text)
                  .join(
                    elementAnswers.elementType === ElementType.FULLNAME
                      ? ' '
                      : ', ',
                  ),
            };

            const fieldsAnswers = elementAnswers.answers.reduce(
              (answers, currentFieldAnswer) => ({
                ...answers,
                [`NameField${currentFieldAnswer.fieldId}`]:
                  currentFieldAnswer.fieldName,
                [`ValueField${currentFieldAnswer.fieldId}`]:
                  currentFieldAnswer.text,
              }),
              { ...elementAnswer },
            );

            return { ...elementAnswersList, ...fieldsAnswers };
          },
          {
            id: record.id,
            createdAt: formatDate(record.createdAt, 'MMM D, YYYY HH:mm:ss A'),
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

  if (response === undefined) return <></>;

  return (
    <div className='h-screen bg-quarter-pearl-lusta-50'>
      <Header />
      <SubmissionTopbar
        formId={Number(formId)}
        selectedResponseIds={selectedResponseIds}
        setSelectedRecords={setSelectedRecords}
        showingResponseRows={responseRows || []}
        params={params}
        setParams={setParams}
        setCurrentPage={setCurrentPage}
      />
      <ResponsesTable
        elementIdAndNameList={response.elementIdAndNameList}
        responseRows={responseRows || []}
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
        params={params}
        setParams={setParams}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
