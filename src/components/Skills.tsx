import React, { useState, Fragment } from 'react';
import {
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import styled from 'styled-components';
import { ISkill } from '../../types/skills';
import { useSkillsValue } from '../atoms/skill-atoms';

const StyledProgress = styled(LinearProgress)({
  height: 10,
  borderRadius: 4,
});

const calcLevel = (skill: ISkill) => {
  const currLevel = skill.levels.findIndex((e) => e > skill.xp);
  if (currLevel < 0) return skill.levels.length - 1;
  return currLevel - 1;
}

const calcPercentage = (skill: ISkill) => {
  const currLevel = calcLevel(skill)
  const nextLevelXP = skill.levels[currLevel + 1];
  return (100 * skill.xp) / nextLevelXP;
};

const genTitle = (skill: ISkill) => {
  const currLevel = calcLevel(skill)
  const nextLevelXP = skill.levels[currLevel + 1];
  if (!nextLevelXP) {
    return skill.name + ": Max Level"
  }
  return skill.name + ': Level ' + calcLevel(skill)
}

const Skills = () => {
  const skills = useSkillsValue();

  return (
    <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
      {skills.map((skill, i) => (
        <Fragment key={i}>
          <Stack direction="column" sx={{ mx: 2 }} gap={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 450 }}>
                {genTitle(skill)}
              </Typography>
              <Tooltip title={skill.description}>
                <HelpIcon fontSize="small" />
              </Tooltip>
            </Stack>
            <StyledProgress color="inherit" variant="determinate" value={calcPercentage(skill)} />
          </Stack>
          <Divider />
        </Fragment>
      ))}
    </Box>
  );
};

export default Skills;
