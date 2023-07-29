import { UserCodeViewDto } from "./userCodeViewDto";
import { UserInfoModel } from "./userInfo";

export interface ShowSavedCodeDto {
    savedCodeId:number,
    userCodeId:number,
    userInfo:UserInfoModel,
    userCode:UserCodeViewDto,
    codeType:number,
    codeText:string,
    addedDate:Date

}