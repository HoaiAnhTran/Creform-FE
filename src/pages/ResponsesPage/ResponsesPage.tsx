import { Fragment, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import { BACK_END_URL } from '@/configs';
import { MESSAGES, SOCKET_EVENTS } from '@/constants';
import { ResponseRow, ResponsesTable } from '@/molecules/ResponsesTable';
import { Header } from '@/organisms/Header';
import { SubmissionTopbar } from '@/organisms/SubmissionTopbar';
import {
  useGetResponsesByFormIdQuery,
  useLazyGetStatisticsOfResponsesByFormIdQuery,
} from '@/redux/api/responseApi';
import { ElementType, GetResponsesParams } from '@/types';
import { isEmpty, toastify } from '@/utils';

const socket = io(BACK_END_URL, {
  withCredentials: true,
});

export const ResponsesPage = () => {
  const { formId } = useParams();

  const [selectedRecords, setSelectedRecords] = useState<ResponseRow[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [params, setParams] = useState<GetResponsesParams>();

  const { data: response, refetch: refetchResponses } =
    useGetResponsesByFormIdQuery({
      formId: formId!,
      ...params,
    });

  const [refetchResponsesStatistics] =
    useLazyGetStatisticsOfResponsesByFormIdQuery();

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
                  )
                  .split('\n')
                  .map((str, index) => (
                    <Fragment key={index}>
                      {str}
                      <br />
                    </Fragment>
                  )),
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
            createdAt: record.createdAt,
          },
        );

        return {
          ...answers,
        };
      }),
    [rawRecords],
  );

  const selectedResponseIds = useMemo(
    () => selectedRecords.map((selectedRecord) => selectedRecord.id),
    [selectedRecords],
  );

  useEffect(() => {
    if (isEmpty(formId)) return;

    socket.emit(SOCKET_EVENTS.VIEW_SUBMISSION_PAGE, formId);

    // Listen for new submission
    socket.on(SOCKET_EVENTS.RECEIVE_NEW_SUBMISSION, () => {
      toastify.displayInfo(MESSAGES.NEW_SUBMISSION_HAS_BEEN_RECEIVED);
      refetchResponses();
      refetchResponsesStatistics({ formId: formId! });
    });

    // Clean up on component unmount
    return () => {
      socket.emit(SOCKET_EVENTS.LEAVE_SUBMISSION_PAGE, formId);
      socket.off(SOCKET_EVENTS.RECEIVE_NEW_SUBMISSION);
    };
  }, [formId]);

  if (response === undefined) return <></>;

  return (
    <div className='h-screen'>
      <Header />
      <SubmissionTopbar
        formId={formId!}
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
