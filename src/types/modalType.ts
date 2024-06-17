export enum ModalTypes {
  MANAGE_TEAM = 'manageTeam',
  CREATE_TEAM = 'createTeam',
  UPDATE_TEAM = 'updateTeam',
  DELETE_TEAM = 'deleteTeam',
  DELETE_FOLDER = 'deleteFolder',
  CREATE_FOLDER = 'createFolder',
  UPDATE_FOLDER = 'updateFolder',
  DELETE_FORM_PERMANENTLY = 'deleteFormPermanently',
  ADD_TO_FOLDER = 'addToFolder',
  MOVE_TO_TEAM = 'moveToTeam',
  REMOVE_FROM_TEAM = 'removeFromTeam',
  INVITE_MEMBER = 'inviteMember',
  IMPORT_FORM = 'importForm',
  AUTO_GEN_FORM = 'autoGenerateForm',
  CREATE_FORM = 'createForm',
  PREVIEW_TEMPLATE = 'previewTemplate',
  DOWNLOAD_FORM_AS_PDF = 'downloadFormAsPDF',
  VIEW_RESPONSES_STATS = 'viewResponsesStats',
}

export type ModalType =
  | ModalTypes.MANAGE_TEAM
  | ModalTypes.CREATE_TEAM
  | ModalTypes.UPDATE_TEAM
  | ModalTypes.DELETE_TEAM
  | ModalTypes.DELETE_FOLDER
  | ModalTypes.UPDATE_FOLDER
  | ModalTypes.CREATE_FOLDER
  | ModalTypes.DELETE_FORM_PERMANENTLY
  | ModalTypes.ADD_TO_FOLDER
  | ModalTypes.MOVE_TO_TEAM
  | ModalTypes.REMOVE_FROM_TEAM
  | ModalTypes.INVITE_MEMBER
  | ModalTypes.IMPORT_FORM
  | ModalTypes.AUTO_GEN_FORM
  | ModalTypes.CREATE_FORM
  | ModalTypes.PREVIEW_TEMPLATE
  | ModalTypes.DOWNLOAD_FORM_AS_PDF
  | ModalTypes.VIEW_RESPONSES_STATS;
