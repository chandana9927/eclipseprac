// Main application file
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Stack Manager
    const stackManager = new StackManager();
    
    // Initialize UI Manager
    const uiManager = new UIManager(stackManager);
    
    // Initialize application
    function initializeApp() {
        // Update UI with initial state
        uiManager.updateStackVisualization();
        uiManager.updateStats();
        uiManager.displayIntegerStackCode();
        
        // Log initial message
        uiManager.logOperation('Stack Operations Manager initialized. Ready for operations.', 'info');
        
        // Set focus to push input
        document.getElementById('pushInput').focus();
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+Enter to push
        if (e.ctrlKey && e.key === 'Enter') {
            uiManager.handlePush();
            e.preventDefault();
        }
        
        // Ctrl+Backspace to pop
        if (e.ctrlKey && e.key === 'Backspace') {
            uiManager.handlePop();
            e.preventDefault();
        }
        
        // Ctrl+P to peek
        if (e.ctrlKey && e.key === 'p') {
            uiManager.handlePeek();
            e.preventDefault();
        }
        
        // Ctrl+D to display
        if (e.ctrlKey && e.key === 'd') {
            uiManager.handleDisplay();
            e.preventDefault();
        }
        
        // Number keys 1-3 to switch stacks
        if (e.key >= '1' && e.key <= '3') {
            uiManager.handleSwitchStack(parseInt(e.key));
            e.preventDefault();
        }
    });
    
    // Initialize the app
    initializeApp();
    
    // Make managers available globally for debugging
    window.stackManager = stackManager;
    window.uiManager = uiManager;
    
    console.log('Stack Operations Manager initialized successfully!');
});