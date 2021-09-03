export interface InputData {
    keydown?: (event: KeyboardEvent) => void
    keyup?: (event: KeyboardEvent) => void
}

export class InputSystem {
    private registeredInputs: Map<string, InputData>;
    constructor() {
        this.registeredInputs = new Map<string, InputData>();
        this.registerInputs();
    }

    addKeyboardEvent(key: string, functions: InputData) {
        this.registeredInputs.set(key, functions);
    }

    registerInputs() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.logInputs(event);
            this.registeredInputs.get(event.key).keydown != undefined ?
                this.registeredInputs.get(event.key).keydown(event) :
                null;
        });

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            this.logInputs(event);
            this.registeredInputs.get(event.key).keyup != undefined ?
                this.registeredInputs.get(event.key).keyup(event) :
                null;
        });
    }

    logInputs(event: KeyboardEvent) {
        console.log(`Event: ${event}`);
    }
}