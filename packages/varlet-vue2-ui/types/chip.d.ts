import { VarComponent } from './varComponent'

export interface ChipProps {
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'normal' | 'mini' | 'small' | 'large';
  color?: string;
  textColor?: string;
  iconName?: string;
  plain?: boolean;
  round?: boolean;
  block?: boolean;
  closable?: boolean;
}

export class Chip extends VarComponent {
  $props: ChipProps
}

export class _ChipComponent extends Chip {}
