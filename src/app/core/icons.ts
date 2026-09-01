import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

export function registerAppIcons(): void {
    addIcons({ heart, 'heart-outline': heartOutline });
}