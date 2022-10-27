import App from './src/App';
import { AppIcon } from './icon';

interface Settings {
  language: 'en';
}

export const path = '/skills';
export default (settings: Settings) => ({
  id: 'SKILLS',
  path,
  nameLocale: "Skills",
  color: '#fff',
  backgroundColor: '#333',
  icon: AppIcon,
  app: App,
});
