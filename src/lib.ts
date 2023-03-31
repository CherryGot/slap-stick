import SlapStick from './slapstick';

declare global {
  interface Window { SlapStick: typeof SlapStick }
}

window.SlapStick = SlapStick;
