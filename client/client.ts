import {ClientUtils, RegisterNuiCB, ServerPromiseResp} from "@project-error/pe-utils";
import { ISkill } from '../types/skills'
const Utils = new ClientUtils()

RegisterNuiCB('nrp-skills:client:getSkills', async (data, cb) => {
  const resp = await Utils.emitNetPromise<ServerPromiseResp<ISkill[]>>("nrp-skills:server:getSkills", {})

  cb({status: 'ok', data: resp.data})
})

const getSkillLevel = async (skillName: string) => {
  const resp = await Utils.emitNetPromise<ServerPromiseResp<number>>("nrp-skills:server:getSkillLevel", skillName)
  return resp.data
}

exports('getSkillLevel', getSkillLevel)