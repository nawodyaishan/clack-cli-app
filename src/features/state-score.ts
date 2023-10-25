export class StateStore {
    private static instance: StateStore;
    private state: number;

    private constructor() {
        this.state = 0; // Initialize with a default state (0 in this case).
    }

    static getInstance(): StateStore {
        if (!StateStore.instance) {
            StateStore.instance = new StateStore();
        }
        return StateStore.instance;
    }

    setState(newState: number): void {
        this.state = newState;
    }

    getState(): number {
        return this.state;
    }

    increment(): void {
        this.state++;
    }

    decrement(): void {
        this.state--;
    }
}


