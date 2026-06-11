// Stack class implementation in JavaScript to simulate Java behavior
class Stack {
    constructor(size, type = 'integer') {
        this.maxSize = size;
        this.top = -1;
        this.stackArray = new Array(size);
        this.type = type;
        this.id = Date.now(); // Unique identifier for each stack
    }
    
    push(value) {
        if (this.isFull()) {
            throw new Error(`Stack overflow! Cannot push ${value}. Stack is full.`);
        }
        
        // Validate type
        if (this.type === 'integer') {
            if (!Number.isInteger(Number(value))) {
                throw new Error(`Invalid value: ${value}. Integer stack expects numeric values.`);
            }
            value = Number(value);
        }
        
        this.top++;
        this.stackArray[this.top] = value;
        return value;
    }
    
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack underflow! Cannot pop from empty stack.");
        }
        const value = this.stackArray[this.top];
        this.stackArray[this.top] = undefined;
        this.top--;
        return value;
    }
    
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty! Cannot peek.");
        }
        return this.stackArray[this.top];
    }
    
    display() {
        const result = [];
        for (let i = this.top; i >= 0; i--) {
            result.push(this.stackArray[i]);
        }
        return result;
    }
    
    isFull() {
        return this.top === this.maxSize - 1;
    }
    
    isEmpty() {
        return this.top === -1;
    }
    
    getSize() {
        return this.maxSize;
    }
    
    getCount() {
        return this.top + 1;
    }
    
    clear() {
        this.top = -1;
        this.stackArray = new Array(this.maxSize);
    }
    
    // Method to resize stack
    resize(newSize) {
        if (newSize < this.getCount()) {
            throw new Error(`Cannot resize to ${newSize}. Current stack has ${this.getCount()} elements.`);
        }
        
        const newArray = new Array(newSize);
        // Copy existing elements
        for (let i = 0; i <= this.top; i++) {
            newArray[i] = this.stackArray[i];
        }
        
        this.maxSize = newSize;
        this.stackArray = newArray;
    }
    
    // Get stack information
    getInfo() {
        return {
            size: this.getSize(),
            count: this.getCount(),
            type: this.type,
            isFull: this.isFull(),
            isEmpty: this.isEmpty(),
            top: this.isEmpty() ? null : this.peek()
        };
    }
    
    // Get stack as array (for visualization)
    toArray() {
        const arr = [];
        for (let i = 0; i <= this.top; i++) {
            arr.push(this.stackArray[i]);
        }
        return arr;
    }
}

// StackManager to handle multiple stacks
class StackManager {
    constructor() {
        this.stacks = {
            1: new Stack(10, 'integer'),
            2: new Stack(10, 'integer'),
            3: new Stack(10, 'integer')
        };
        this.activeStackId = 1;
        this.stackType = 'integer';
    }
    
    getActiveStack() {
        return this.stacks[this.activeStackId];
    }
    
    switchStack(stackId) {
        if (this.stacks[stackId]) {
            this.activeStackId = stackId;
            return this.getActiveStack();
        }
        throw new Error(`Stack ${stackId} does not exist.`);
    }
    
    changeStackType(type) {
        if (this.stackType === type) return;
        
        this.stackType = type;
        
        // Update all stacks to new type
        for (const id in this.stacks) {
            const oldStack = this.stacks[id];
            const newStack = new Stack(oldStack.getSize(), type);
            this.stacks[id] = newStack;
        }
        
        return this.getActiveStack();
    }
    
    resizeAllStacks(newSize) {
        for (const id in this.stacks) {
            try {
                this.stacks[id].resize(newSize);
            } catch (error) {
                // If resize fails for any stack, revert all to original size
                const originalSize = this.stacks[id].getSize();
                for (const revertId in this.stacks) {
                    this.stacks[revertId].resize(originalSize);
                }
                throw error;
            }
        }
    }
    
    getStackInfo(stackId = null) {
        const targetId = stackId || this.activeStackId;
        if (this.stacks[targetId]) {
            return this.stacks[targetId].getInfo();
        }
        return null;
    }
    
    getAllStacksInfo() {
        const info = {};
        for (const id in this.stacks) {
            info[id] = this.stacks[id].getInfo();
        }
        return info;
    }
}