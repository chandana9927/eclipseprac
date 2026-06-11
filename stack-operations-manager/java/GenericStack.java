// Generic Stack Implementation using Method Overloading and Generics

import java.util.EmptyStackException;

class GenericStack<T> {

    private int maxSize;
    private int top;
    private T[] stackArray;

    // Constructor
    @SuppressWarnings("unchecked")
    public GenericStack(int size) {
        this.maxSize = size;
        this.top = -1;
        this.stackArray = (T[]) new Object[maxSize];
    }

    // Push single element
    public void push(T value) {
        if (isFull()) {
            throw new StackOverflowError("Stack overflow! Cannot push " + value);
        }
        stackArray[++top] = value;
        System.out.println("Pushed: " + value);
    }

    // Method overloading: push multiple elements
    public void push(T... values) {
        for (T value : values) {
            this.push(value);
        }
    }

    // Pop operation
    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        T value = stackArray[top];
        stackArray[top--] = null; // Help garbage collection
        System.out.println("Popped: " + value);
        return value;
    }

    // Peek operation
    public T peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return stackArray[top];
    }

    // Display stack with optional message
    public void display() {
        display("Stack contents:");
    }

    // Method overloading: display with custom message
    public void display(String message) {
        System.out.println(message);
        if (isEmpty()) {
            System.out.println("  [Empty]");
            return;
        }
        for (int i = top; i >= 0; i--) {
            System.out.println("  [" + (top - i) + "] " + stackArray[i]);
        }
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

    // Get maximum capacity
    public int getCapacity() {
        return maxSize;
    }

    // Clear stack
    public void clear() {
        while (!isEmpty()) {
            pop();
        }
    }

    // Search for element
    public int search(T element) {
        for (int i = top; i >= 0; i--) {
            if (stackArray[i].equals(element)) {
                return top - i + 1; // Position from top (1-based)
            }
        }
        return -1; // Not found
    }
}

// Multiple Stack Manager demonstrating different data types
class MultiStackManager {

    private GenericStack<Integer> intStack;
    private GenericStack<String> stringStack;
    private GenericStack<Double> doubleStack;

    public MultiStackManager(int size) {
        intStack = new GenericStack<>(size);
        stringStack = new GenericStack<>(size);
        doubleStack = new GenericStack<>(size);
    }

    // Demonstrate method overloading and different data types
    public void demonstrateOperations() {
        System.out.println("=== Multi-Stack Manager Demonstration ===");

        try {
            // Integer stack operations
            System.out.println("\n1. Integer Stack Operations:");
            intStack.push(10, 20, 30, 40);
            intStack.display("Integer Stack after pushes:");

            System.out.println("Peek: " + intStack.peek());
            System.out.println("Search 20: Position " + intStack.search(20));

            intStack.pop();
            intStack.display("After pop:");

            // String stack operations
            System.out.println("\n2. String Stack Operations:");
            stringStack.push("Alice", "Bob", "Charlie");
            stringStack.display("String Stack:");

            // Double stack operations
            System.out.println("\n3. Double Stack Operations:");
            doubleStack.push(3.14, 2.71, 1.618);
            doubleStack.display("Double Stack:");

            // Demonstrate stack info
            System.out.println("\n4. Stack Information:");
            System.out.println("Integer Stack - Size: " + intStack.getSize()
                    + ", Capacity: " + intStack.getCapacity()
                    + ", Empty: " + intStack.isEmpty()
                    + ", Full: " + intStack.isFull());

        } catch (StackOverflowError e) {
            System.out.println("Stack overflow error: " + e.getMessage());
        } catch (EmptyStackException e) {
            System.out.println("Stack underflow error: " + e.getMessage());
        }
    }

    // Demonstrate exception handling
    public void demonstrateExceptionHandling() {
        System.out.println("\n=== Exception Handling Demonstration ===");

        // Create small stack to easily trigger overflow
        GenericStack<Integer> smallStack = new GenericStack<>(2);

        try {
            smallStack.push(1);
            smallStack.push(2);
            smallStack.push(3); // This will cause overflow
        } catch (StackOverflowError e) {
            System.out.println("Caught StackOverflowError: " + e.getMessage());
        }

        // Demonstrate underflow
        GenericStack<String> emptyStack = new GenericStack<>(3);
        try {
            emptyStack.pop(); // This will cause underflow
        } catch (EmptyStackException e) {
            System.out.println("Caught EmptyStackException: Cannot pop from empty stack");
        }
    }
}

// Main demonstration class
class GenericStackDemo {

    public static void main(String[] args) {
        System.out.println("=== Generic Stack Implementation ===");
        System.out.println("Demonstrating: Classes, Objects, Arrays, Constructors,");
        System.out.println("'this' keyword, Method Overloading, Access Control,");
        System.out.println("Exception Handling, and Generics\n");

        // Create stack manager
        MultiStackManager manager = new MultiStackManager(5);

        // Demonstrate operations
        manager.demonstrateOperations();

        // Demonstrate exception handling
        manager.demonstrateExceptionHandling();

        System.out.println("\n=== Practical Applications ===");
        System.out.println("1. Expression Evaluation");
        System.out.println("2. Function Call Management");
        System.out.println("3. Undo/Redo Operations");
        System.out.println("4. Backtracking Algorithms");
        System.out.println("5. Syntax Parsing");
    }
}
