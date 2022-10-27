import { GetPlayer } from '@overextended/ox_core/server';
import { DeepPartial, ISkill, ResourceConfig } from '../types/skills';
import {ServerPromiseResp, ServerUtils, ServerErrorCodes} from "@project-error/pe-utils";

const Utils = new ServerUtils()

const hotReloadConfig = {
  resourceName: GetCurrentResourceName(),
  files: ['/dist/server.js', '/dist/client.js', '/dist/html/index.js'],
};

exports['hotreload'].add(hotReloadConfig);

const config: DeepPartial<ResourceConfig> = JSON.parse(
  LoadResourceFile(GetCurrentResourceName(), 'config.json'),
);

Utils.onNetPromise<string, number>('npwd_ox_skills:server:getSkillLevel', async (req, res) => {
  const level = getSkillLevel(req.source, req.data)
  if (!level) {
    return res ({
      status: "error",
      errorMsg: ServerErrorCodes.InvalidData
    })
  }
  const resData: ServerPromiseResp<number> = {
    status: "ok",
    data: level
  }
  res(resData)
})

Utils.onNetPromise<undefined, ISkill[]>('npwd_ox_skills:server:getSkills', async (req, res) => {
  const OxPlayer = GetPlayer(req.source)
  let skillList: ISkill[] = []
  config.skills.forEach(skill => {
    let xp: number | undefined | null = OxPlayer.get(skill.name);
    if (!xp) {
      OxPlayer.setdb(skill.name, 0, false);
      xp = 0
    }
    skillList.push({
      name: skill.name,
      description: skill.description,
      xp: xp,
      levels: skill.levels
    })
  })
  const resData: ServerPromiseResp<ISkill[]> = {
    status: "ok",
    data: skillList
  }
  res(resData)
})

const findSkill = (skillName: string) => {
  const skill = config.skills.find((e) => e.name === skillName);
  return skill;
};

const calcLevel = (currXp: number, levels: number[]) => {
  const currLevel = levels.findIndex((e) => e > currXp);
  if (currLevel < 0) return levels.length - 1;
  return currLevel - 1;
};

const addXP = (src: number, skillName: string, amount: number) => {
  const OxPlayer = GetPlayer(src);
  const skill = findSkill(skillName)
  if (!skill) {
    return console.log(skillName, 'Does Not Exist');
  }
  const currentxp: number = OxPlayer.get(skill.name)
  const maxLevel = skill.levels.length
  if(currentxp >= skill.levels[maxLevel-1]) return; //if max level don't add xp
  const newxp = currentxp + amount
  OxPlayer.setdb(skillName, newxp, false)
};

const getSkillLevel = (src: number, skillName: string) => {
  const OxPlayer = GetPlayer(src);
  const skillInfo = findSkill(skillName);
  if (!skillInfo) {
    return console.log(skillName, 'Does Not Exist');
  }
  const xp: number | undefined | null = OxPlayer.get(skillName);
  if (!xp) {
    OxPlayer.setdb(skillName, 0, false);
    return 0;
  }
  const levels = skillInfo.levels;
  return calcLevel(xp, levels);
};

exports('getSkillLevel', getSkillLevel)
exports('addXP', addXP)
