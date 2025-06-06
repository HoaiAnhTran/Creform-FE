import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
    marginBottom: 35,
    color: 'grey',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  headingText: {
    fontSize: 14,
    fontFamily: 'Times-Roman',
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 12,
  },
  subheadingText: {
    fontSize: 11,
    fontFamily: 'Times-Roman',
    marginBottom: 40,
    marginHorizontal: 12,
  },
  text: {
    margin: 12,
    fontSize: 13,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  subtext: {
    margin: '0px 12px 12px',
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    color: 'grey',
  },
  line: {
    margin: 12,
    borderBottom: '1px dotted gray',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'grey',
    marginRight: 5,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: 'grey',
    marginRight: 5,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
  },
  scaleRatingValue: {
    display: 'flex',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'grey',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #000',
    margin: 12,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableCol: {
    flex: 1,
    border: '1px solid #000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableCell: {
    margin: 5,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
  },
});
