import { ISkill } from "../../types/skills";

export const MockSkills: ISkill[] = [
    {
        name: "Lockpicking",
        xp: 800,
        description: "Slows down lockpick skill check",
        levels: [0, 100, 200, 400, 800]
    },
    {
        name: "Fishing",
        xp: 132,
        description: "Slows down fishing skill check & increases luck",
        levels: [0, 100, 200, 400, 800]
    },
    {
        name: "Hacking",
        xp: 305,
        description: "Slows down hacking skill check",
        levels: [0, 100, 200, 400, 800]
    },
]
