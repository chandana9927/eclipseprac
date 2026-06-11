// String Stack Implementation using Inheritance

class Stack {

    protected int maxSize;
    protected int top;
    protected Object[] stackArray;

    // Constructor
    public Stack(int size) {
        this.maxSize = size;
        this.top = -1;
        this.stackArray = new Object[maxSize];
    }

    // Generic push method
    public void push(Object value) throws StackOverflowException {
        if (isFull()) {
            throw new StackOverflowException("Stack overflow! Cannot push " + value);
        }
        stackArray[++top] = value;
    }

    // Generic pop method
    public Object pop() throws StackUnderflowException {
        if (isEmpty()) {
            throw new StackUnderflowException("Stack underflow! Cannot pop");
        }
        return stackArray[top--];
    }

    // Generic peek method
    public Object peek() throws StackUnderflowException {
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
        System.out.print("Stack elements: ");
        for (int i = top; i >= 0; i--) {
            System.out.print(stackArray[i] + " ");
        }
        System.out.println();
    }

    public boolean isFull() {
        return top == maxSize - 1;
    }

    public boolean isEmpty() {
        return top == -1;
    }
}

// StringStack class with type safety
class StringStack extends Stack {

    // Constructor
    public StringStack(int size) {
        super(size); // Calling parent constructor
    }

    // Overloaded push method for Strings
    public void push(String value) throws StackOverflowException {
        super.push(value); // Calling parent method
    }

    // Type-safe pop method
    public String pop() throws StackUnderflowException {
        return (String) super.pop();
    }

    // Type-safe peek method
    public String peek() throws StackUnderflowException {
        return (String) super.peek();
    }

    // Method overloading: push multiple values
    public void push(String... values) throws StackOverflowException {
        for (String value : values) {
            this.push(value);
        }
    }

    // Override display to show string-specific info
    @Override
    public void display() {
        System.out.println("=== String Stack ===");
        super.display();
        System.out.println("Total strings: " + (top + 1));
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
class StringStackDemo {

    public static void main(String[] args) {
        try {
            System.out.println("=== String Stack Demonstration ===");

            // Create a string stack
            StringStack stringStack = new StringStack(4);

            // Push single string
            stringStack.push("Hello");

            // Push multiple strings using method overloading
            stringStack.push("World", "Java", "Programming");

            // Display stack
            stringStack.display();

            // Peek operation
            System.out.println("Top element: " + stringStack.peek());

            // Pop operation
            System.out.println("Popped: " + stringStack.pop());

            // Display after pop
            stringStack.display();

            // Demonstrate inheritance
            Stack genericStack = new Stack(3);
            genericStack.push("Can hold any object");
            genericStack.push(123); // Integer
            genericStack.push(45.67); // Double

            System.out.println("\n=== Generic Stack (Parent Class) ===");
            genericStack.display();

        } catch (Exception e) {
            System.out.println("Exception occurred: " + e.getMessage());
        }
    }
}
