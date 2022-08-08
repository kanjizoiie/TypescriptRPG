import { Target } from "../Target/Target";

export class Spell {
  cost: number = 10;
  name: string = "ARCANA BASICO";
  description: string = "Basic spell.";

  cast(targets?: Array<Target>) {
    if (!targets) return;

    targets.map((target) => {

    });
  }
}