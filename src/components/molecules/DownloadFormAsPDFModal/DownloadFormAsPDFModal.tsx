import { Fragment, ReactNode } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { Box, ModalProps as MantineModalProps } from '@mantine/core';
import {
  Document,
  Image,
  Page,
  PDFViewer,
  Text,
  View,
} from '@react-pdf/renderer';

import { pdfStyles } from '@/constants';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { ElementType } from '@/types';
import { getScaleRatingValues } from '@/utils';

import { INPUT_TABLE_TYPE } from '../InputTablePropertiesConfig';
import { Modal } from '../Modal';

interface DownloadFormAsPDFModalProps extends MantineModalProps {
  formId: string;
}

export const DownloadFormAsPDFModal = ({
  formId,
  ...props
}: DownloadFormAsPDFModalProps) => {
  const { data: formData } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId || !props.opened },
  );

  const sortedElements = formData?.elements
    .slice()
    .sort((element1, element2) => element1.gridSize.y - element2.gridSize.y);

  const FormPDF = () => {
    let questionIndex = 1;
    return (
      <Document>
        <Page style={pdfStyles.page}>
          <Text style={pdfStyles.header} fixed>
            {formData?.title}
          </Text>
          <Text style={pdfStyles.title}>{formData?.title}</Text>
          {sortedElements?.map((element, index) => {
            let content: ReactNode;
            switch (element.type) {
              case ElementType.HEADING:
                return (
                  <>
                    <Text style={pdfStyles.headingText}>
                      {element.config.headingText}
                    </Text>
                    <Text style={pdfStyles.subheadingText}>
                      {element.config.subheadingText}
                    </Text>
                  </>
                );
              case ElementType.EMAIL:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.line} />
                  </>
                );
                break;
              case ElementType.FULLNAME:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.line} />
                  </>
                );
                break;
              case ElementType.ADDRESS:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.line} />
                    <Text style={pdfStyles.line} />
                  </>
                );
                break;
              case ElementType.PHONE:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.line} />
                  </>
                );
                break;
              case ElementType.DATEPICKER:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.line} />
                    <Text style={pdfStyles.subtext}>Example: 9:00 AM</Text>
                  </>
                );
                break;
              case ElementType.SHORT_TEXT:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.line} />
                  </>
                );
                break;
              case ElementType.LONG_TEXT:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.line} />
                    <Text style={pdfStyles.line} />
                    <Text style={pdfStyles.line} />
                    <Text style={pdfStyles.line} />
                    <Text style={pdfStyles.line} />
                  </>
                );
                break;
              case ElementType.DROPDOWN:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.subtext}>
                      You can only choose one option
                    </Text>
                    {element.config.options.map((option, index) => (
                      <View style={pdfStyles.flexContainer} key={index}>
                        <View style={pdfStyles.circle} />
                        <Text style={pdfStyles.label}>{option}</Text>
                      </View>
                    ))}
                  </>
                );
                break;
              case ElementType.SINGLE_CHOICE:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.subtext}>
                      You can only choose one option
                    </Text>
                    {element.config.options.map((option, index) => (
                      <View style={pdfStyles.flexContainer} key={index}>
                        <View style={pdfStyles.circle} />
                        <Text style={pdfStyles.label}>{option}</Text>
                      </View>
                    ))}
                  </>
                );
                break;
              case ElementType.MULTIPLE_CHOICE:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.subtext}>
                      You can choose multiple options
                    </Text>
                    {element.config.options.map((option, index) => (
                      <View style={pdfStyles.flexContainer} key={index}>
                        <View style={pdfStyles.checkbox} />
                        <Text style={pdfStyles.label}>{option}</Text>
                      </View>
                    ))}
                  </>
                );
                break;
              case ElementType.FILE_UPLOAD:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.text}>File submitted: </Text>
                  </>
                );
                break;
              case ElementType.TIME:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>
                    <Text style={pdfStyles.line} />
                    <Text style={pdfStyles.subtext}>
                      Example: January 01, 2024
                    </Text>
                  </>
                );
                break;
              case ElementType.SCALE_RATING:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>

                    <View style={pdfStyles.flexContainer}>
                      {element.config.lowestRatingText && (
                        <Text style={pdfStyles.label}>
                          {element.config.lowestRatingText}
                        </Text>
                      )}
                      {getScaleRatingValues(element).map((number, index) => (
                        <View style={pdfStyles.scaleRatingValue} key={index}>
                          <Text style={pdfStyles.label}>{number}</Text>
                        </View>
                      ))}
                      {element.config.highestRatingText && (
                        <Text style={pdfStyles.label}>
                          {element.config.highestRatingText}
                        </Text>
                      )}
                    </View>
                  </>
                );
                break;
              case ElementType.INPUT_TABLE:
                content = (
                  <>
                    <Text
                      style={pdfStyles.text}
                    >{`${questionIndex}. ${element.config.fieldLabel} ${element.config.required ? '*' : ''}`}</Text>

                    <View style={pdfStyles.table}>
                      <View style={pdfStyles.tableRow}>
                        <View style={pdfStyles.tableCol}></View>
                        {element.config.columns.map((column, colIndex) => (
                          <View key={colIndex} style={pdfStyles.tableCol}>
                            <Text style={pdfStyles.tableCell}>{column}</Text>
                          </View>
                        ))}
                      </View>

                      {element.config.rows.map((row, rowIndex) => (
                        <View key={rowIndex} style={pdfStyles.tableRow}>
                          <View style={pdfStyles.tableCol}>
                            <Text style={pdfStyles.tableCell}>{row}</Text>
                          </View>
                          {element.config.columns.map((_column, colIndex) => (
                            <View
                              key={`${rowIndex}-${colIndex}`}
                              style={pdfStyles.tableCol}
                            >
                              {element.config.inputType ===
                              INPUT_TABLE_TYPE.RADIO ? (
                                <View style={pdfStyles.circle} />
                              ) : (
                                <View style={pdfStyles.checkbox} />
                              )}
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                  </>
                );
                break;
              case ElementType.IMAGE:
                return (
                  <>
                    {element.config.imageTitle && (
                      <Text style={pdfStyles.text}>
                        {element.config.imageTitle}
                      </Text>
                    )}
                    <Image
                      style={pdfStyles.image}
                      src={element.config.imageUrl}
                    />
                  </>
                );
              default:
                return;
            }
            questionIndex++;
            return <Fragment key={index}>{content}</Fragment>;
          })}

          <Text
            style={pdfStyles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    );
  };

  return (
    <Modal
      {...props}
      size='90%'
      headerIcon={<FaFileDownload className='text-white' />}
      headerTitle='Preview PDF'
      body={
        <Box className='h-full px-3 py-5'>
          <PDFViewer className='h-full w-full'>
            <FormPDF />
          </PDFViewer>
        </Box>
      }
      hasFooter={false}
      isLoading={false}
      classNames={{
        content: 'h-full w-full',
        body: 'h-full',
      }}
    />
  );
};
