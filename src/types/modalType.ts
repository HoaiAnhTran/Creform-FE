export enum ModalTypes {
  MANAGE_TEAM = 'manageTeam',
  CREATE_FOLDER_IN_TEAM = 'createFolderInTeam',
  CREATE_TEAM = 'createTeam',
  UPDATE_TEAM = 'updateTeam',
  DELETE_TEAM = 'deleteTeam',
  DELETE_FOLDER = 'deleteFolder',
  CREATE_FOLDER = 'createFolder',
  UPDATE_FOLDER = 'updateFolder',
}

export type ModalType =
  | ModalTypes.MANAGE_TEAM
  | ModalTypes.CREATE_FOLDER_IN_TEAM
  | ModalTypes.CREATE_TEAM
  | ModalTypes.UPDATE_TEAM
  | ModalTypes.DELETE_TEAM
  | ModalTypes.DELETE_FOLDER
  | ModalTypes.UPDATE_FOLDER
  | ModalTypes.CREATE_FOLDER;
