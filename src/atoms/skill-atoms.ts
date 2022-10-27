import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import fetchNui from '../utils/fetchNui';
import { ServerPromiseResp } from '../../types/common';
import { ISkill } from '../../types/skills';
import { MockSkills } from '../utils/constants';
import { isEnvBrowser } from '../utils/misc';

export const skillState = {
  skillsList: atom({
    key: 'skillsList',
    default: selector<ISkill[]>({
      key: 'defaultSkillsList',
      get: async () => {
        try {
          const resp = await fetchNui<ServerPromiseResp<ISkill[]>>('npwd_ox_skills:client:getSkills');
          if (!resp.data) {
            console.log('no response data');
            return [];
          }
          return resp.data;
        } catch (e) {
          if (isEnvBrowser()) {
            return MockSkills;
          }
          console.error(e);
          return [];
        }
      },
    }),
  }),
};

export const useSkillsValue = () => useRecoilValue(skillState.skillsList);