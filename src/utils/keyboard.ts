
export interface InputData {
  keydown?: (event: KeyboardEvent) => void;
  keyup?: (event: KeyboardEvent) => void;
}

export class InputSystem {
  private registeredInputs: Map<string, InputData>;

  constructor() {
    this.registeredInputs = new Map<string, InputData>();
    this.registerActions();
  }

  registerKeyboardAction(key: string, functions: InputData) {
    this.registeredInputs.set(key, functions);
  }

  registerKeyboardActions(actions: Array<{ key: string, functions: InputData }>) {
    actions
      .forEach(({ key, functions }) => {
        this.registeredInputs.set(key, functions);
      });
  }

  private handleKeyDown(event: KeyboardEvent) {
    console.log(this.registeredInputs);
    if (this.registeredInputs.has(event.key)) {
      const registeredEvent = this.registeredInputs.get(event.key);
      if (registeredEvent.keydown) registeredEvent.keydown(event)
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    if (this.registeredInputs.has(event.key)) {
      const registeredEvent = this.registeredInputs.get(event.key);
      if (registeredEvent.keyup) registeredEvent.keyup(event)
    }
  }

  private registerActions() {
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
    window.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  clearActions() {
    window.removeEventListener('keydown', (event) => this.handleKeyDown(event));
    window.removeEventListener('keyup', (event) => this.handleKeyUp(event));
  }
}