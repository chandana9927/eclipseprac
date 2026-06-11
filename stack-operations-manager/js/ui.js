// UI Manager for Stack Operations Manager
class UIManager {
    constructor(stackManager) {
        this.stackManager = stackManager;
        this.initializeElements();
        this.attachEventListeners();
    }
    
    initializeElements() {
        // Stack visualization elements
        this.stackItems = document.getElementById('stackItems');
        this.emptyStackMessage = document.getElementById('emptyStackMessage');
        
        // Stat elements
        this.stackSizeElement = document.getElementById('stackSize');
        this.elementsCountElement = document.getElementById('elementsCount');
        this.topElement = document.getElementById('topElement');
        this.stackStatus = document.getElementById('stackStatus');
        this.stackTypeElement = document.getElementById('stackType');
        
        // Operation log
        this.operationLog = document.getElementById('operationLog');
        
        // Control elements
        this.stackSizeInput = document.getElementById('stackSizeInput');
        this.setSizeBtn = document.getElementById('setSizeBtn');
        this.intStackBtn = document.getElementById('intStackBtn');
        this.stringStackBtn = document.getElementById('stringStackBtn');
        this.pushInput = document.getElementById('pushInput');
        this.pushBtn = document.getElementById('pushBtn');
        this.popBtn = document.getElementById('popBtn');
        this.peekBtn = document.getElementById('peekBtn');
        this.displayBtn = document.getElementById('displayBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.stack1Btn = document.getElementById('stack1Btn');
        this.stack2Btn = document.getElementById('stack2Btn');
        this.stack3Btn = document.getElementById('stack3Btn');
        
        // Java code display
        this.javaCode = document.getElementById('javaCode');
        this.showIntegerCode = document.getElementById('showIntegerCode');
        this.showStringCode = document.getElementById('showStringCode');
        this.showGenericCode = document.getElementById('showGenericCode');
    }
    
    attachEventListeners() {
        // Stack size control
        this.setSizeBtn.addEventListener('click', () => this.handleResizeStack());
        
        // Stack type controls
        this.intStackBtn.addEventListener('click', () => this.handleChangeStackType('integer'));
        this.stringStackBtn.addEventListener('click', () => this.handleChangeStackType('string'));
        
        // Stack operations
        this.pushBtn.addEventListener('click', () => this.handlePush());
        this.pushInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handlePush();
        });
        
        this.popBtn.addEventListener('click', () => this.handlePop());
        this.peekBtn.addEventListener('click', () => this.handlePeek());
        this.displayBtn.addEventListener('click', () => this.handleDisplay());
        this.clearBtn.addEventListener('click', () => this.handleClear());
        
        // Multiple stacks
        this.stack1Btn.addEventListener('click', () => this.handleSwitchStack(1));
        this.stack2Btn.addEventListener('click', () => this.handleSwitchStack(2));
        this.stack3Btn.addEventListener('click', () => this.handleSwitchStack(3));
        
        // Java code display
        this.showIntegerCode.addEventListener('click', () => this.displayIntegerStackCode());
        this.showStringCode.addEventListener('click', () => this.displayStringStackCode());
        this.showGenericCode.addEventListener('click', () => this.displayGenericStackCode());
    }
    
    // Update stack visualization
    updateStackVisualization() {
        const stack = this.stackManager.getActiveStack();
        const displayArray = stack.display();
        
        // Clear previous items
        this.stackItems.innerHTML = '';
        
        if (stack.isEmpty()) {
            this.emptyStackMessage.classList.remove('hidden');
            this.stackItems.appendChild(this.emptyStackMessage);
        } else {
            this.emptyStackMessage.classList.add('hidden');
            
            // Display stack elements from top to bottom
            displayArray.forEach((item, index) => {
                const stackItem = this.createStackItem(item, index, displayArray.length);
                this.stackItems.appendChild(stackItem);
            });
        }
        
        // Update status
        this.updateStackStatus();
    }
    
    createStackItem(value, index, total) {
        const stackItem = document.createElement('div');
        const colorClass = `stack-item-${index % 5}`;
        stackItem.className = `stack-item w-11/12 ${colorClass} text-white rounded-lg p-4 mb-2 shadow-md slide-up`;
        stackItem.style.animationDelay = `${index * 0.05}s`;
        
        const itemContent = document.createElement('div');
        itemContent.className = 'flex justify-between items-center';
        
        const itemValue = document.createElement('div');
        itemValue.className = 'text-xl font-bold';
        itemValue.textContent = value;
        
        const itemPosition = document.createElement('div');
        itemPosition.className = 'text-sm bg-white bg-opacity-20 px-2 py-1 rounded';
        
        if (index === 0) {
            itemPosition.innerHTML = '<i class="fas fa-caret-up mr-1"></i> TOP';
        } else {
            itemPosition.textContent = `Pos: ${total - index}`;
        }
        
        itemContent.appendChild(itemValue);
        itemContent.appendChild(itemPosition);
        stackItem.appendChild(itemContent);
        
        return stackItem;
    }
    
    updateStackStatus() {
        const stack = this.stackManager.getActiveStack();
        
        if (stack.isFull()) {
            this.stackStatus.textContent = 'Full';
            this.stackStatus.className = 'px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full';
        } else if (stack.isEmpty()) {
            this.stackStatus.textContent = 'Empty';
            this.stackStatus.className = 'px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full';
        } else {
            this.stackStatus.textContent = 'Ready';
            this.stackStatus.className = 'px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full';
        }
    }
    
    // Update statistics
    updateStats() {
        const stack = this.stackManager.getActiveStack();
        const info = stack.getInfo();
        
        this.stackSizeElement.textContent = info.size;
        this.elementsCountElement.textContent = info.count;
        
        if (info.top !== null) {
            this.topElement.textContent = info.top;
            this.topElement.className = 'text-2xl font-bold text-gray-800';
        } else {
            this.topElement.textContent = 'None';
            this.topElement.className = 'text-2xl font-bold text-gray-400';
        }
        
        // Update stack type display
        this.stackTypeElement.textContent = this.stackManager.stackType === 'integer' ? 'Integer Stack' : 'String Stack';
    }
    
    // Log operation
    logOperation(message, type = 'info') {
        const logEntry = document.createElement('div');
        
        let bgColor, borderColor, textColor;
        switch (type) {
            case 'error':
                bgColor = 'bg-red-50';
                borderColor = 'border-red-500';
                textColor = 'text-red-800';
                break;
            case 'success':
                bgColor = 'bg-green-50';
                borderColor = 'border-green-500';
                textColor = 'text-green-800';
                break;
            case 'warning':
                bgColor = 'bg-yellow-50';
                borderColor = 'border-yellow-500';
                textColor = 'text-yellow-800';
                break;
            default:
                bgColor = 'bg-blue-50';
                borderColor = 'border-blue-500';
                textColor = 'text-blue-800';
        }
        
        logEntry.className = `mb-2 p-3 rounded-lg border-l-4 ${bgColor} ${borderColor}`;
        
        const timestamp = new Date().toLocaleTimeString();
        logEntry.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="font-medium ${textColor}">${message}</span>
                <span class="text-xs text-gray-500">${timestamp}</span>
            </div>
        `;
        
        this.operationLog.prepend(logEntry);
        
        // Keep only last 10 logs
        const logs = this.operationLog.querySelectorAll('div');
        if (logs.length > 10) {
            logs[logs.length - 1].remove();
        }
        
        // Scroll to top
        this.operationLog.scrollTop = 0;
    }
    
    // Event handlers
    handleResizeStack() {
        const newSize = parseInt(this.stackSizeInput.value);
        if (newSize < 1 || newSize > 20) {
            this.logOperation(`Invalid stack size: ${newSize}. Size must be between 1 and 20.`, 'error');
            return;
        }
        
        try {
            this.stackManager.resizeAllStacks(newSize);
            this.updateStackVisualization();
            this.updateStats();
            this.logOperation(`Stack size changed to ${newSize}.`, 'success');
        } catch (error) {
            this.logOperation(error.message, 'error');
        }
    }
    
    handleChangeStackType(type) {
        if (this.stackManager.stackType === type) return;
        
        // Update button styles
        if (type === 'integer') {
            this.intStackBtn.classList.remove('bg-gray-200', 'text-gray-800');
            this.intStackBtn.classList.add('bg-primary-600', 'text-white');
            this.stringStackBtn.classList.remove('bg-primary-600', 'text-white');
            this.stringStackBtn.classList.add('bg-gray-200', 'text-gray-800');
        } else {
            this.stringStackBtn.classList.remove('bg-gray-200', 'text-gray-800');
            this.stringStackBtn.classList.add('bg-primary-600', 'text-white');
            this.intStackBtn.classList.remove('bg-primary-600', 'text-white');
            this.intStackBtn.classList.add('bg-gray-200', 'text-gray-800');
        }
        
        try {
            this.stackManager.changeStackType(type);
            this.updateStackVisualization();
            this.updateStats();
            this.logOperation(`Switched to ${type} stack. All stacks cleared.`, 'info');
            
            // Update Java code display based on type
            if (type === 'integer') {
                this.displayIntegerStackCode();
            } else {
                this.displayStringStackCode();
            }
        } catch (error) {
            this.logOperation(error.message, 'error');
        }
    }
    
    handlePush() {
        const value = this.pushInput.value.trim();
        if (!value) {
            this.logOperation('Please enter a value to push.', 'error');
            return;
        }
        
        try {
            const stack = this.stackManager.getActiveStack();
            const pushedValue = stack.push(value);
            
            // Add animation to new element
            this.updateStackVisualization();
            this.updateStats();
            
            this.logOperation(`Pushed "${pushedValue}" to stack.`, 'success');
            this.pushInput.value = '';
            this.pushInput.focus();
        } catch (error) {
            this.logOperation(error.message, 'error');
        }
    }
    
    handlePop() {
        try {
            const stack = this.stackManager.getActiveStack();
            const poppedValue = stack.pop();
            
            // Add pop animation
            const stackItems = document.querySelectorAll('.stack-item');
            if (stackItems.length > 0) {
                stackItems[0].classList.add('pop-animation');
                setTimeout(() => {
                    this.updateStackVisualization();
                    this.updateStats();
                }, 300);
            } else {
                this.updateStackVisualization();
                this.updateStats();
            }
            
            this.logOperation(`Popped "${poppedValue}" from stack.`, 'success');
        } catch (error) {
            this.logOperation(error.message, 'error');
        }
    }
    
    handlePeek() {
        try {
            const stack = this.stackManager.getActiveStack();
            const topValue = stack.peek();
            this.logOperation(`Top element is "${topValue}".`, 'info');
            
            // Highlight the top element
            const topElements = document.querySelectorAll('.stack-item');
            if (topElements.length > 0) {
                topElements[0].classList.add('ring-4', 'ring-yellow-300');
                setTimeout(() => {
                    topElements[0].classList.remove('ring-4', 'ring-yellow-300');
                }, 1000);
            }
        } catch (error) {
            this.logOperation(error.message, 'error');
        }
    }
    
    handleDisplay() {
        try {
            const stack = this.stackManager.getActiveStack();
            const stackContents = stack.display();
            if (stackContents.length === 0) {
                this.logOperation('Stack is empty.', 'info');
            } else {
                this.logOperation(`Stack contents (top to bottom): ${stackContents.join(', ')}`, 'info');
            }
        } catch (error) {
            this.logOperation(error.message, 'error');
        }
    }
    
    handleClear() {
        const stack = this.stackManager.getActiveStack();
        stack.clear();
        this.updateStackVisualization();
        this.updateStats();
        this.logOperation('Stack cleared.', 'info');
    }
    
    handleSwitchStack(stackId) {
        // Update button styles
        [this.stack1Btn, this.stack2Btn, this.stack3Btn].forEach((btn, index) => {
            if (index + 1 === stackId) {
                btn.classList.remove('bg-gray-200', 'text-gray-800');
                btn.classList.add('bg-primary-600', 'text-white');
            } else {
                btn.classList.remove('bg-primary-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-800');
            }
        });
        
        try {
            this.stackManager.switchStack(stackId);
            this.updateStackVisualization();
            this.updateStats();
            this.logOperation(`Switched to Stack ${stackId}.`, 'info');
        } catch (error) {
            this.logOperation(error.message, 'error');
        }
    }
    
    // Display Java code methods
    displayIntegerStackCode() {
        this.javaCode.textContent = this.getIntegerStackCode();
        this.highlightJavaCode();
        this.updateCodeButtonStyles('integer');
    }
    
    displayStringStackCode() {
        this.javaCode.textContent = this.getStringStackCode();
        this.highlightJavaCode();
        this.updateCodeButtonStyles('string');
    }
    
    displayGenericStackCode() {
        this.javaCode.textContent = this.getGenericStackCode();
        this.highlightJavaCode();
        this.updateCodeButtonStyles('generic');
    }
    
    updateCodeButtonStyles(activeType) {
        const buttons = {
            'integer': this.showIntegerCode,
            'string': this.showStringCode,
            'generic': this.showGenericCode
        };
        
        for (const [type, button] of Object.entries(buttons)) {
            if (type === activeType) {
                button.classList.remove('bg-gray-200', 'text-gray-800');
                button.classList.add('bg-primary-600', 'text-white');
            } else {
                button.classList.remove('bg-primary-600', 'text-white');
                button.classList.add('bg-gray-200', 'text-gray-800');
            }
        }
    }
    
    getIntegerStackCode() {
        return `// Integer Stack Implementation with Exception Handling
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
}`;
    }
    
    getStringStackCode() {
        return `// String Stack Implementation using Inheritance
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
}`;
    }
    
    getGenericStackCode() {
        return `// Generic Stack Implementation using Method Overloading
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
    public void push(T value) throws StackOverflowException {
        if (isFull()) {
            throw new StackOverflowException("Stack overflow! Cannot push " + value);
        }
        stackArray[++top] = value;
        System.out.println("Pushed: " + value);
    }
    
    // Method overloading: push multiple elements
    public void push(T... values) throws StackOverflowException {
        for (T value : values) {
            this.push(value);
        }
    }
    
    // Pop operation
    public T pop() throws StackUnderflowException {
        if (isEmpty()) {
            throw new StackUnderflowException("Stack underflow! Cannot pop");
        }
        T value = stackArray[top];
        stackArray[top--] = null; // Help garbage collection
        System.out.println("Popped: " + value);
        return value;
    }
    
    // Peek operation
    public T peek() throws StackUnderflowException {
        if (isEmpty()) {
            throw new StackUnderflowException("Stack is empty! Cannot peek");
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
    
    // Clear stack
    public void clear() {
        while (!isEmpty()) {
            try {
                pop();
            } catch (StackUnderflowException e) {
                // This shouldn't happen
            }
        }
    }
}

// Multiple Stack Manager
class StackManager {
    private GenericStack<Integer> intStack;
    private GenericStack<String> stringStack;
    private GenericStack<Double> doubleStack;
    
    public StackManager(int size) {
        intStack = new GenericStack<>(size);
        stringStack = new GenericStack<>(size);
        doubleStack = new GenericStack<>(size);
    }
    
    // Demonstrate method overloading and different data types
    public void demonstrateOperations() {
        try {
            // Integer stack operations
            intStack.push(10, 20, 30);
            intStack.display("Integer Stack:");
            
            // String stack operations
            stringStack.push("Hello", "World", "Java");
            stringStack.display("String Stack:");
            
            // Double stack operations
            doubleStack.push(3.14, 2.71, 1.618);
            doubleStack.display("Double Stack:");
            
        } catch (StackOverflowException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`;
    }
    
    highlightJavaCode() {
        let code = this.javaCode.textContent;
        
        // Simple syntax highlighting
        code = code.replace(/\b(class|public|private|protected|void|int|boolean|String|double|float|char|byte|short|long|if|else|for|while|do|try|catch|finally|throw|throws|new|return|this|super|extends|implements|interface|abstract|static|final|volatile|transient|synchronized|native|strictfp)\b/g, 
            '<span class="code-keyword">$1</span>');
        
        code = code.replace(/\b(Stack|IntegerStack|StringStack|GenericStack|StackManager|Exception|StackOverflowException|StackUnderflowException)\b/g, 
            '<span class="code-class">$1</span>');
        
        code = code.replace(/\b(push|pop|peek|display|isFull|isEmpty|getSize|clear|demonstrateOperations)\b(?=\s*\()/g, 
            '<span class="code-method">$1</span>');
        
        code = code.replace(/\/\/.*$/gm, 
            '<span class="code-comment">$&</span>');
        
        code = code.replace(/"([^"]*)"/g, 
            '<span class="code-string">"$1"</span>');
        
        code = code.replace(/\b(\d+\.?\d*)\b/g, 
            '<span class="code-number">$1</span>');
        
        code = code.replace(/\b(Error|Exception|Overflow|Underflow)\b/g, 
            '<span class="code-error">$1</span>');
        
        this.javaCode.innerHTML = code;
    }
}