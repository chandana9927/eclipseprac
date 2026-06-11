// Integer Stack Implementation

class Stack {

    private int maxSize;
    private int top;
    private int[] stackArray;

    // Constructor using 'this' keyword
    public Stack(int size) {
        this.maxSize = size;
        this.top = -1;
        this.stackArray = new int[maxSize];
    }

    // Push operation with overflow check
    public void push(int value) throws StackOverflowException {
        if (isFull()) {
            throw new StackOverflowException("Stack overflow! Cannot push " + value);
        }
        stackArray[++top] = value;
        System.out.println("Pushed " + value + " to stack");
    }

    // Pop operation with underflow check
    public int pop() throws StackUnderflowException {
        if (isEmpty()) {
            throw new StackUnderflowException("Stack underflow! Cannot pop");
        }
        return stackArray[top--];
    }

    // Peek operation
    public int peek() throws StackUnderflowException {
        if (isEmpty()) {
            throw new StackUnderflowException("Stack is empty! Cannot peek");
        }
        return stackArray[top];
    }

    // Display stack
    public void display() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return;
        }
        System.out.print("Stack elements (top to bottom): ");
        for (int i = top; i >= 0; i--) {
            System.out.print(stackArray[i] + " ");
        }
        System.out.println();
    }

    // Check if stack is full
    public boolean isFull() {
        return top == maxSize - 1;
    }

    // Check if stack is empty
    public boolean isEmpty() {
        return top == -1;
    }

    // Get current size
    public int getSize() {
        return top + 1;
    }
}

// Custom Exception Classes
class StackOverflowException extends Exception {

    public StackOverflowException(String message) {
        super(message);
    }
}

class StackUnderflowException extends Exception {

    public StackUnderflowException(String message) {
        super(message);
    }
}

// Demonstration class
class StackDemo {

    public static void main(String[] args) {
        try {
            // Create a stack of size 5
            Stack stack = new Stack(5);

            System.out.println("=== Integer Stack Demonstration ===");

            // Push operations
            stack.push(10);
            stack.push(20);
            stack.push(30);
            stack.push(40);
            stack.push(50);

            // Display stack
            stack.display();

            // Try to push when stack is full (will throw exception)
            try {
                stack.push(60);
            } catch (StackOverflowException e) {
                System.out.println("Caught exception: " + e.getMessage());
            }

            // Peek operation
            System.out.println("Top element: " + stack.peek());

            // Pop operations
            System.out.println("Popped: " + stack.pop());
            System.out.println("Popped: " + stack.pop());

            // Display after pops
            stack.display();

            // Check stack status
            System.out.println("Stack is empty: " + stack.isEmpty());
            System.out.println("Stack is full: " + stack.isFull());
            System.out.println("Current size: " + stack.getSize());

        } catch (Exception e) {
            System.out.println("Exception occurred: " + e.getMessage());
        }
    }
}
